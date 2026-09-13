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
import { FleetVehicle, FleetVehicleInput } from '../models/fleet-vehicle.model';

const COLLECTION = 'fleet';

/**
 * Fleet vehicles shown on the public site are stored in Firestore
 * (`fleet` collection) so the admin dashboard can add, edit and remove
 * them without a code change or redeploy. `list()` is a live listener:
 * the public Fleet section updates automatically the moment an admin
 * saves a change, the same way shipment tracking used to.
 *
 * Until Firebase is configured, `list()` emits an empty array so the
 * caller can fall back to a bundled default list (see
 * fleet.component.ts) rather than showing nothing.
 */
@Injectable({ providedIn: 'root' })
export class FleetService {
  constructor(private firebaseStatus: FirebaseStatusService) {}

  list(): Observable<FleetVehicle[]> {
    if (!this.firebaseStatus.isConfigured) {
      return new Observable<FleetVehicle[]>((subscriber) => {
        subscriber.next([]);
      });
    }

    return new Observable<FleetVehicle[]>((subscriber) => {
      const q = query(collection(firestoreDb, COLLECTION), orderBy('order', 'asc'));
      const unsubscribe = onSnapshot(
        q,
        (snap) => {
          const items: FleetVehicle[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<FleetVehicle, 'id'>) }));
          subscriber.next(items);
        },
        (error) => subscriber.error(error)
      );
      return unsubscribe;
    });
  }

  add(vehicle: FleetVehicleInput): Observable<{ id: string }> {
    return from(
      addDoc(collection(firestoreDb, COLLECTION), {
        ...vehicle,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }).then((docRef) => ({ id: docRef.id }))
    );
  }

  update(id: string, vehicle: FleetVehicleInput): Observable<void> {
    return from(
      updateDoc(doc(firestoreDb, COLLECTION, id), {
        ...vehicle,
        updatedAt: serverTimestamp(),
      })
    );
  }

  remove(id: string): Observable<void> {
    return from(deleteDoc(doc(firestoreDb, COLLECTION, id)));
  }
}
