import { Injectable } from '@angular/core';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Observable, from, map, throwError } from 'rxjs';
import { firestoreDb } from '../firebase/firebase-app';
import { FirebaseStatusService } from '../firebase/firebase-status.service';

/**
 * Writes footer newsletter sign-ups to the `newsletterSubscribers`
 * Firestore collection: { email, createdAt }. Same pattern as
 * ContactService.
 */
@Injectable({ providedIn: 'root' })
export class NewsletterService {
  constructor(private firebaseStatus: FirebaseStatusService) {}

  subscribe(email: string): Observable<{ id: string }> {
    if (!this.firebaseStatus.isConfigured) {
      return throwError(
        () => new Error('Firebase isn\u2019t configured yet \u2014 add your project keys to environment.ts.')
      );
    }

    return from(
      addDoc(collection(firestoreDb, 'newsletterSubscribers'), {
        email,
        createdAt: serverTimestamp(),
      })
    ).pipe(map((docRef) => ({ id: docRef.id })));
  }
}
