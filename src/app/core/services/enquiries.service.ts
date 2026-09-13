import { Injectable } from '@angular/core';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { firestoreDb } from '../firebase/firebase-app';
import { ContactEnquiry } from '../models/contact-enquiry.model';
import { QuoteRequest } from '../models/quote-request.model';

/**
 * Admin-only realtime read access to the `contactEnquiries` and
 * `quoteRequests` collections that the public quote card and contact
 * form write to. Only used from AdminDashboardComponent, which sits
 * behind `authGuard` -- see the Firestore security rules in the
 * README, which only allow reading these collections when signed in.
 */
@Injectable({ providedIn: 'root' })
export class EnquiriesService {
  contactEnquiries(): Observable<(ContactEnquiry & { id: string })[]> {
    return new Observable((subscriber) => {
      const q = query(collection(firestoreDb, 'contactEnquiries'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snap) => {
          subscriber.next(snap.docs.map((d) => ({ id: d.id, ...(d.data() as ContactEnquiry) })));
        },
        (error) => subscriber.error(error)
      );
      return unsubscribe;
    });
  }

  quoteRequests(): Observable<(QuoteRequest & { id: string })[]> {
    return new Observable((subscriber) => {
      const q = query(collection(firestoreDb, 'quoteRequests'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snap) => {
          subscriber.next(snap.docs.map((d) => ({ id: d.id, ...(d.data() as QuoteRequest) })));
        },
        (error) => subscriber.error(error)
      );
      return unsubscribe;
    });
  }
}
