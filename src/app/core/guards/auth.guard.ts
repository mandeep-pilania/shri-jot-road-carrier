import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../firebase/auth.service';

/**
 * Protects future Admin Dashboard routes. Not applied to any route yet
 * (no admin dashboard exists in this build) — add it to a route's
 * `canActivate: [authGuard]` once that page is built. Redirects signed-out
 * visitors to /login.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    map((user) => (user ? true : router.parseUrl('/login')))
  );
};
