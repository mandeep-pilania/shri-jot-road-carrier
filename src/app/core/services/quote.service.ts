import { Injectable } from '@angular/core';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Observable, from, map, throwError } from 'rxjs';
import { firestoreDb } from '../firebase/firebase-app';
import { FirebaseStatusService } from '../firebase/firebase-status.service';
import { QuoteRequest } from '../models/quote-request.model';

/**
 * Handles submission of quote requests from the homepage quick-quote
 * card, writing to the `quoteRequests` Firestore collection. Each
 * document: { name, phone, email, fromLocation, toLocation, goodsType,
 * approxWeight, vehicleType, pickupDate, message, createdAt }.
 * `NotificationService` listens to this collection in real time for
 * the future admin dashboard.
 */
@Injectable({ providedIn: 'root' })
export class QuoteService {
  constructor(private firebaseStatus: FirebaseStatusService) {}

  submitQuoteRequest(payload: QuoteRequest): Observable<{ id: string }> {
    if (!this.firebaseStatus.isConfigured) {
      return throwError(
        () => new Error('Firebase isn\u2019t configured yet — add your project keys to environment.ts.')
      );
    }

    const { createdAt, ...rest } = payload;
    return from(
      addDoc(collection(firestoreDb, 'quoteRequests'), {
        ...rest,
        createdAt: serverTimestamp(),
      })
    ).pipe(map((docRef) => ({ id: docRef.id })));
  }
}
