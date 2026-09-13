import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

const SITE_NAME = 'Shri Jot Road Carrier';
const SITE_URL = 'https://www.shrijotroadcarrier.in';
const DEFAULT_DESCRIPTION =
  'Shri Jot Road Carrier offers daily full load & part load goods transport, house shifting and car/vehicle transport across Punjab, Haryana, Rajasthan, Himachal Pradesh and all of NCR.';

/**
 * Keeps the meta description, Open Graph / Twitter tags and the
 * canonical link in sync with the active route on every navigation.
 *
 * Angular's router already updates `document.title` automatically from
 * each route's static `title` (see app.routes.ts) via its built-in
 * TitleStrategy -- this service reads that same route's `snapshot.title`
 * plus its `data.description` and mirrors both into the tags search
 * engines and social previews actually look at.
 *
 * Call `init()` once, from AppComponent's constructor.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  init(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot;
        })
      )
      .subscribe((snapshot) => {
        const pageTitle = snapshot.title ?? SITE_NAME;
        const description = (snapshot.data?.['description'] as string) ?? DEFAULT_DESCRIPTION;
        const path = this.router.url.split('?')[0].split('#')[0];
        const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;

        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ property: 'og:title', content: pageTitle });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
        this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
        this.meta.updateTag({ name: 'twitter:description', content: description });

        this.updateCanonicalLink(canonicalUrl);
      });
  }

  private updateCanonicalLink(url: string): void {
    if (typeof document === 'undefined') return;

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
