import { Injectable } from '@angular/core';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Observable, from, map, throwError } from 'rxjs';
import { firestoreDb } from '../firebase/firebase-app';
import { FirebaseStatusService } from '../firebase/firebase-status.service';
import { ContactEnquiry } from '../models/contact-enquiry.model';

/**
 * Writes contact-form submissions to the `contactEnquiries` Firestore
 * collection: { name, phone, altPhone?, email?, subject, message, createdAt }.
 * Email and altPhone are optional -- the admin calls the customer back on
 * `phone` (or `altPhone` if given), so email isn't required to follow up.
 * `NotificationService` listens to this collection in real time for
 * the future admin dashboard.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private firebaseStatus: FirebaseStatusService) {}

  submitEnquiry(payload: ContactEnquiry): Observable<{ id: string }> {
    if (!this.firebaseStatus.isConfigured) {
      return throwError(
        () => new Error('Firebase isn\u2019t configured yet — add your project keys to environment.ts.')
      );
    }

    const { createdAt, ...rest } = payload;
    return from(
      addDoc(collection(firestoreDb, 'contactEnquiries'), {
        ...rest,
        createdAt: serverTimestamp(),
      })
    ).pipe(map((docRef) => ({ id: docRef.id })));
  }
}
