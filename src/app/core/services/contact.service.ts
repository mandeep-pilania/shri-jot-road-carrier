import { Injectable } from '@angular/core';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Observable, catchError, from, map, throwError, timeout } from 'rxjs';
import { firestoreDb } from '../firebase/firebase-app';
import { FirebaseStatusService } from '../firebase/firebase-status.service';
import { ContactEnquiry } from '../models/contact-enquiry.model';

// Firestore's write promise only settles once the backend acknowledges
// it, and its SDK retries silently on flaky connections -- without a
// client-side cap, a blocked/slow network leaves the caller waiting
// indefinitely with no feedback. 15s is generous for a normal write
// but short enough that the user isn't stuck staring at a spinner.
const SUBMIT_TIMEOUT_MS = 15000;

/**
 * Writes contact-form submissions to the `contactEnquiries` Firestore
 * collection: { name, phone, altPhone?, email?, subject, message, createdAt }.
 * Email and altPhone are optional -- the admin calls the customer back on
 * `phone` (or `altPhone` if given), so email isn't required to follow up.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private firebaseStatus: FirebaseStatusService) {}

  submitEnquiry(payload: ContactEnquiry): Observable<{ id: string }> {
    if (!this.firebaseStatus.isConfigured) {
      return throwError(
        () => new Error('Firebase isn’t configured yet — add your project keys to environment.ts.')
      );
    }

    const { createdAt, ...rest } = payload;
    return from(
      addDoc(collection(firestoreDb, 'contactEnquiries'), {
        ...rest,
        createdAt: serverTimestamp(),
      })
    ).pipe(
      map((docRef) => ({ id: docRef.id })),
      timeout(SUBMIT_TIMEOUT_MS),
      catchError((err) => {
        if (err?.name === 'TimeoutError') {
          // A slow visitor connection is one possible cause, but so is a
          // server-side misconfiguration (e.g. Firestore not provisioned
          // for this project) -- don't tell the visitor it's their fault
          // when we can't actually tell which one it is. The phone number
          // gives them a working fallback either way.
          return throwError(
            () => new Error('This is taking longer than expected. Please try again in a moment, or call us at +91 90234 24923 if the problem continues.')
          );
        }
        return throwError(
          () => new Error('Something went wrong while sending your message. Please try again, or call us at +91 90234 24923.')
        );
      })
    );
  }
}
