import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { firestoreDb } from '../firebase/firebase-app';
import { ContactEnquiry } from '../models/contact-enquiry.model';

// Firebase Auth confirming sign-in (which authGuard waits on) can fire a
// beat before Firestore's own connection has propagated that credential
// to its security-rule checks. Without this, the very first listener
// attempt right after a fresh page load on /admin can get a transient
// permission-denied and just die -- silently leaving the list empty, as
// if the data had vanished. One short retry papers over that gap; a
// second consecutive failure is treated as a real, reportable error.
const RETRY_DELAY_MS = 1200;

/**
 * Admin-only realtime read access to the `contactEnquiries` collection
 * that the public contact form writes to. Only used from
 * AdminDashboardComponent, which sits behind `authGuard` -- see the
 * Firestore security rules in the README, which only allow reading
 * this collection when signed in.
 */
@Injectable({ providedIn: 'root' })
export class EnquiriesService {
  contactEnquiries(): Observable<(ContactEnquiry & { id: string })[]> {
    return new Observable((subscriber) => {
      let retried = false;
      let unsubscribe: (() => void) | undefined;
      let retryTimer: ReturnType<typeof setTimeout> | undefined;

      const start = () => {
        const q = query(collection(firestoreDb, 'contactEnquiries'), orderBy('createdAt', 'desc'));
        unsubscribe = onSnapshot(
          q,
          (snap) => {
            retried = true; // a good snapshot means the connection is fine now
            subscriber.next(snap.docs.map((d) => ({ id: d.id, ...(d.data() as ContactEnquiry) })));
          },
          (error) => {
            if (!retried) {
              retried = true;
              retryTimer = setTimeout(start, RETRY_DELAY_MS);
              return;
            }
            subscriber.error(error);
          }
        );
      };
      start();

      return () => {
        unsubscribe?.();
        if (retryTimer) clearTimeout(retryTimer);
      };
    });
  }

  // Requires the Firestore rule on contactEnquiries to allow delete for
  // signed-in users (see README) -- the original "deny all" rule was
  // deliberately locked down before delete was a feature admins needed.
  deleteEnquiry(id: string): Observable<void> {
    return from(deleteDoc(doc(firestoreDb, 'contactEnquiries', id)));
  }
}
