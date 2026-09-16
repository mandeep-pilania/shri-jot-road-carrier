import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map, switchMap, take } from 'rxjs';
import { AuthService } from '../firebase/auth.service';

/**
 * Protects the Admin Dashboard route (`canActivate: [authGuard]` on
 * `/admin` in app.routes.ts). Redirects signed-out visitors to /login.
 *
 * Waits for `ready$` before reading `user$` -- onAuthStateChanged resolves
 * the persisted session asynchronously, so reading user$ immediately (e.g.
 * on a hard refresh of /admin) could see the initial `null` before the
 * real signed-in state has loaded, bouncing a signed-in admin to /login.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.ready$.pipe(
    filter(Boolean),
    take(1),
    switchMap(() => auth.user$.pipe(take(1))),
    map((user) => (user ? true : router.parseUrl('/login')))
  );
};
