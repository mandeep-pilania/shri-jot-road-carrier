import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../firebase/auth.service';

/**
 * Protects the Admin Dashboard route (`canActivate: [authGuard]` on
 * `/admin` in app.routes.ts). Redirects signed-out visitors to /login.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    map((user) => (user ? true : router.parseUrl('/login')))
  );
};
