import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule } from 'lucide-angular';

import { routes } from './app.routes';
import { APP_ICONS } from './core/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // withViewTransitions() was removed: Chrome's View Transitions API
    // throws "InvalidStateError: Transition was aborted because of
    // invalid state" and silently drops the navigation whenever a click
    // lands while a previous transition is still settling (e.g. a quick
    // second click, or a click right after page load). That made nav
    // links intermittently do nothing with no visible error -- not worth
    // the subtle cross-fade it bought us.
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })
    ),
    provideAnimations(),
    importProvidersFrom(LucideAngularModule.pick(APP_ICONS)),
  ],
};
