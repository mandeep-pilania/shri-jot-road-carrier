import { Injectable } from '@angular/core';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { firebaseAuth } from './firebase-app';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  /** Emits the current signed-in user, or null when signed out. */
  readonly user$: Observable<User | null> = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(firebaseAuth, (user) => this.userSubject.next(user));
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  signIn(email: string, password: string): Observable<User> {
    return from(
      signInWithEmailAndPassword(firebaseAuth, email, password).then((cred) => cred.user)
    );
  }

  signOut(): Observable<void> {
    return from(signOut(firebaseAuth));
  }
}
