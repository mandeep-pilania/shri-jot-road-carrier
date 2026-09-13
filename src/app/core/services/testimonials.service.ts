import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { firestoreDb } from '../firebase/firebase-app';
import { FirebaseStatusService } from '../firebase/firebase-status.service';
import { Testimonial, TestimonialInput } from '../models/testimonial.model';

const COLLECTION = 'testimonials';

/**
 * Testimonials shown on the public site are stored in Firestore
 * (`testimonials` collection) so the admin dashboard can add, edit and
 * remove them without a code change or redeploy. `list()` is a live
 * listener, same pattern as FleetService.
 *
 * Until Firebase is configured, `list()` emits an empty array so the
 * caller can fall back to a bundled default list.
 */
@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  constructor(private firebaseStatus: FirebaseStatusService) {}

  list(): Observable<Testimonial[]> {
    if (!this.firebaseStatus.isConfigured) {
      return new Observable<Testimonial[]>((subscriber) => {
        subscriber.next([]);
      });
    }

    return new Observable<Testimonial[]>((subscriber) => {
      const q = query(collection(firestoreDb, COLLECTION), orderBy('order', 'asc'));
      const unsubscribe = onSnapshot(
        q,
        (snap) => {
          const items: Testimonial[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Testimonial, 'id'>) }));
          subscriber.next(items);
        },
        (error) => subscriber.error(error)
      );
      return unsubscribe;
    });
  }

  add(testimonial: TestimonialInput): Observable<{ id: string }> {
    return from(
      addDoc(collection(firestoreDb, COLLECTION), {
        ...testimonial,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }).then((docRef) => ({ id: docRef.id }))
    );
  }

  update(id: string, testimonial: TestimonialInput): Observable<void> {
    return from(
      updateDoc(doc(firestoreDb, COLLECTION, id), {
        ...testimonial,
        updatedAt: serverTimestamp(),
      })
    );
  }

  remove(id: string): Observable<void> {
    return from(deleteDoc(doc(firestoreDb, COLLECTION, id)));
  }
}
