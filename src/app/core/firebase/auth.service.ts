import { Injectable } from '@angular/core';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { BehaviorSubject, Observable, catchError, from, throwError, timeout } from 'rxjs';
import { firebaseAuth } from './firebase-app';

// Same reasoning as ContactService: without a client-side cap, a
// blocked/slow network leaves the sign-in button stuck on "Signing
// in..." forever, with no error ever shown.
const SIGN_IN_TIMEOUT_MS = 15000;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  /** Emits the current signed-in user, or null when signed out. */
  readonly user$: Observable<User | null> = this.userSubject.asObservable();

  // onAuthStateChanged only resolves the *persisted* session asynchronously
  // (it has to check IndexedDB first), so user$ starts out at its initial
  // `null` value even when the visitor is actually signed in. authGuard
  // waits on this flag before trusting user$, so a refresh on /admin (or a
  // guard check that races the initial listener callback) doesn't bounce a
  // signed-in admin back to /login.
  private readonly readySubject = new BehaviorSubject<boolean>(false);
  readonly ready$: Observable<boolean> = this.readySubject.asObservable();

  constructor() {
    onAuthStateChanged(firebaseAuth, (user) => this.setUser(user));
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  private setUser(user: User | null): void {
    this.userSubject.next(user);
    if (!this.readySubject.value) this.readySubject.next(true);
  }

  signIn(email: string, password: string): Observable<User> {
    return from(
      signInWithEmailAndPassword(firebaseAuth, email, password).then((cred) => {
        // Update user$ synchronously with the result we already have,
        // rather than waiting for the separate onAuthStateChanged
        // callback to fire -- LoginComponent navigates to /admin as soon
        // as this resolves, and authGuard reads user$ on arrival. Without
        // this, the guard could read the still-stale `null` and redirect
        // straight back to /login even though sign-in just succeeded.
        this.setUser(cred.user);
        return cred.user;
      })
    ).pipe(
      timeout(SIGN_IN_TIMEOUT_MS),
      catchError((err) => {
        if (err?.name === 'TimeoutError') {
          return throwError(() => ({
            code: 'auth/timeout',
            message: 'This is taking longer than expected. Please check your internet connection and try again.',
          }));
        }
        return throwError(() => err);
      })
    );
  }

  signOut(): Observable<void> {
    return from(signOut(firebaseAuth));
  }
}
