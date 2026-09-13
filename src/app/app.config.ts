import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule } from 'lucide-angular';

import { routes } from './app.routes';
import { APP_ICONS } from './core/icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
      withViewTransitions()
    ),
    provideAnimations(),
    importProvidersFrom(LucideAngularModule.pick(APP_ICONS)),
  ],
};
