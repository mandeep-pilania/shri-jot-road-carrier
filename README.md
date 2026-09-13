# Shri Jot Road Carrier — Website (Angular)

Multi-page site for Shri Jot Road Carrier, built with Angular
standalone components. Firebase/Firestore power every dynamic
feature — quote form, contact form, newsletter sign-up, and admin
login — see "Firebase setup" below to connect your own project. The
Admin Dashboard itself isn't built yet; `core/guards/auth.guard.ts`
is a ready-to-use placeholder for when it is.

## Getting started

This project's source was generated without network access, so
dependencies have not been installed or build-verified here. To run
it locally:

```bash
npm install
npm start        # ng serve, http://localhost:4200
```

If `@angular/cli` is not installed globally, `npx ng serve` works too.
Because installation and `ng build` could not be run in this
environment, do a build pass yourself (`ng build`) and fix any
straggling type or template errors before shipping — the code
follows standard Angular 18 standalone conventions throughout, but a
full compiler pass hasn't confirmed it end-to-end.

## Pages

- `/` — Home: hero, floating Quick Quote card (full Reactive Forms
  validation + loading/success/error states), and an overview of
  every section below, all on one scrollable landing page
- `/about` — About Shri Jot Road Carrier, stats, safety, industries served
- `/services` — Full service list (including House Shifting and Car &
  Vehicle Transport), process, industries, FAQ
- `/fleet` — Fleet carousel, safety, gallery
- `/coverage` — Coverage area (Haryana, Rajasthan, Punjab, Himachal
  Pradesh and All NCR) + stats
- `/contact` — Contact form (name, phone, optional alternate mobile,
  optional email, subject, message) + FAQ
- `/login` — Admin sign-in backed by real Firebase Authentication
  (email/password) — no admin dashboard to land on yet, so it signs
  in and redirects home

## Header navigation

Top-level links are Home, About, Services, Our Fleet, Coverage Area,
Contact — all flat, no dropdown. The header is solid navy/white on
every page except the home hero (where it starts transparent and
turns solid on scroll).

## What's implemented

- Sticky header (transparent → solid on scroll on Home; solid
  everywhere else) with mobile menu, phone number, Login and Get a
  Quote CTAs
- Hero, Services, About / Why Choose Us, animated Stats counters,
  a Fleet carousel (bigger showcase cards, prev/next arrows, dot
  navigation, autoplay that pauses on hover), Coverage Area (styled
  base-and-regions list, not a literal map), How It Works, Safety,
  Industries We Serve, Gallery with a lightbox, Testimonials, Google
  Reviews, FAQ accordion, Final CTA
- Footer with quick links, services, contact info, and a newsletter
  input, all pointing at the real routes above
- Fade-up-on-scroll (`RevealDirective`) and animated number counters
  (`CountUpDirective`), both with reduced-motion and no-IntersectionObserver
  fallbacks so content is never stuck invisible or stuck at "0"
- Service cards, fleet cards and testimonial cards all use a fixed,
  consistent height so the grid/carousel looks uniform regardless of
  how long each item's text happens to be

## Firebase setup (required for live data)

Every dynamic feature on the site — the quote form, contact form,
newsletter sign-up, and admin login — is wired to Firebase already.
Nothing works live until you add your own project's keys to
`src/environments/environment.ts` (and `environment.prod.ts` for
production builds):

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },
};
```

Get these from the Firebase Console → Project settings → General →
"Your apps" → SDK setup and configuration. `FirebaseStatusService`
checks whether `apiKey` is still the placeholder `'YOUR_API_KEY'` and
lets each feature fall back to a harmless demo/error state until it
isn't.

### Firestore collections this app writes

| Collection | Written by | Purpose |
|---|---|---|
| `quoteRequests` | Home quote card | One document per "Get an Instant Quote" submission |
| `contactEnquiries` | Contact page form | One document per contact form submission: `{ name, phone, altPhone?, email?, subject, message, createdAt }` |
| `newsletterSubscribers` | Footer sign-up | One document per newsletter email |

The app never reads back its own submissions from any of these — an
admin reviews them directly in the Firebase Console (or a future
admin dashboard) and calls the customer back on `phone` (or `altPhone`
if given); email is optional on the contact form for exactly that
reason.

### Firestore security rules

A reasonable starting rule set, since the app only ever *writes* to
these three collections and never reads them back:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quoteRequests/{doc}         { allow create: if true; allow read, update, delete: if false; }
    match /contactEnquiries/{doc}      { allow create: if true; allow read, update, delete: if false; }
    match /newsletterSubscribers/{doc} { allow create: if true; allow read, update, delete: if false; }
  }
}
```

This lets any visitor submit a form, but nobody can read, edit or
delete a submitted document from the client — only from the Firebase
Console (or a future signed-in admin dashboard using the Admin SDK,
which bypasses these rules).

## What's stubbed for later

`core/guards/auth.guard.ts` is a pass-through placeholder for the
future Firebase Auth guard on admin routes — it isn't applied to any
route yet because no admin dashboard exists in this build.

## Images, logo & favicon

Every photo (hero, about, safety, final CTA, all 9 fleet vehicles, all
12 gallery shots — including a house-shifting and a vehicle-transport
shot — and the 4 testimonial avatars) is a real, freely licensed
photo sourced from Unsplash (Unsplash License — free for commercial
use, no attribution required), not a generic stock placeholder. Swap
any of them for your own licensed photography whenever you like — the
URLs live in `hero.component.scss`, `about.component.html`,
`safety.component.html`, `final-cta.component.scss`,
`fleet.component.ts`, `gallery.component.ts`, and
`testimonials.component.ts`.

The Coverage section renders a styled base-and-regions list (Ludhiana
as the base, then each state/region served, exactly as listed on the
business's service card) rather than a literal map image, so it can't
misrepresent geography.

The logo is a custom SVG truck mark (`shared/components/logo-mark`)
used in the header, footer, and login page. `favicon.ico`,
`favicon.svg`, `apple-touch-icon.png`, and `icon-512.png` are all
generated from that same mark and already wired into `index.html`
and `angular.json`.

## Google Reviews

The Home page's Google Reviews section shows the business's real
4.8★ / 84-review rating pulled from its Google Business Profile, with
a "View Live Reviews on Google" link straight to a Google Maps search
for the business. The individual sample review cards are clearly
labeled as illustrative — actually embedding live review text requires
the Google Places API with a server-side key, which isn't something a
static frontend build can do on its own. `google-reviews.component.ts`
has a comment marking exactly where to swap in a real API call later.

## Structure

```
src/app/
  core/        # models, services (real Firestore reads/writes), guards, icon registry
  shared/      # ServiceCard, FleetCard, TestimonialCard, reveal & count-up directives
  layout/      # header, footer
  features/
    home/      # hero, quote, services, about, stats, fleet, coverage,
                 process, safety, industries, gallery, testimonials,
                 google-reviews, faq, final-cta, contact
    login/     # admin sign-in page
```
