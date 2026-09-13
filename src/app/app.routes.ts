import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

// Home is imported eagerly (not loadComponent) since it's the route
// almost every visitor lands on first -- lazy-loading it would mean a
// visible blank gap (header/footer only) while its chunk downloads,
// which is far more noticeable on slower mobile connections. Every
// other route stays lazy since those only load once a visitor
// actively navigates there.
import { HomeComponent } from './features/home/home.component';

// Every route below carries a unique, keyword-rich `title` (used by
// Angular's built-in TitleStrategy to set document.title automatically)
// and a `data.description` (read by SeoService to update the meta
// description / Open Graph / Twitter tags on every navigation). Keep
// both in sync whenever a page's focus changes -- this is the main
// lever for on-page SEO in a client-rendered Angular app.
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Shri Jot Road Carrier | Transport, House Shifting & Vehicle Carrier in Punjab, Haryana, Rajasthan, Himachal & NCR',
    data: {
      description:
        'Shri Jot Road Carrier offers daily full load & part load goods transport, house shifting and car/vehicle transport across Punjab, Haryana, Rajasthan, Himachal Pradesh and all of NCR. Based in Transport Nagar, Ludhiana. Call +91 90234 24923.',
    },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about-page/about-page.component').then((m) => m.AboutPageComponent),
    title: 'About Us | Shri Jot Road Carrier, Ludhiana',
    data: {
      description:
        'Learn about Shri Jot Road Carrier -- a Ludhiana-based transport company providing safe, reliable full load, part load, house shifting and vehicle transport services across North India.',
    },
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./features/services-page/services-page.component').then((m) => m.ServicesPageComponent),
    title: 'Transport, House Shifting & Vehicle Transport Services | Shri Jot Road Carrier',
    data: {
      description:
        'Explore our services: Full Truck Load, Part Load, House Shifting, Car & Vehicle Transport, Industrial Cargo, Warehouse & Storage and more -- serving Punjab, Haryana, Rajasthan, Himachal Pradesh and NCR.',
    },
  },
  {
    path: 'fleet',
    loadComponent: () =>
      import('./features/fleet-page/fleet-page.component').then((m) => m.FleetPageComponent),
    title: 'Our Fleet | Shri Jot Road Carrier',
    data: {
      description:
        'A modern, well-maintained fleet of container trucks, open trucks, trailers, mini trucks and more -- the right vehicle for every load, from small parcels to full house shifting.',
    },
  },
  {
    path: 'coverage',
    loadComponent: () =>
      import('./features/coverage-page/coverage-page.component').then((m) => m.CoveragePageComponent),
    title: 'Coverage Area: Punjab, Haryana, Rajasthan, Himachal & NCR | Shri Jot Road Carrier',
    data: {
      description:
        'Daily full load & part load transport, house shifting and vehicle transport from our Ludhiana hub across Punjab, Haryana, Rajasthan, Himachal Pradesh and all of NCR.',
    },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact-page/contact-page.component').then((m) => m.ContactPageComponent),
    title: 'Contact Us | Shri Jot Road Carrier, Transport Nagar, Ludhiana',
    data: {
      description:
        'Contact Shri Jot Road Carrier for a transport quote -- call Sonu Choudhary at +91 90234 24923 or Parmod at +91 87108 00029, or visit us at Transport Nagar, Ludhiana.',
    },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
    title: 'Login | Shri Jot Road Carrier',
    data: { description: 'Admin sign-in for Shri Jot Road Carrier staff.', noIndex: true },
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/admin-dashboard.component').then((m) => m.AdminDashboardComponent),
    title: 'Admin Dashboard | Shri Jot Road Carrier',
    data: { description: 'Admin dashboard for Shri Jot Road Carrier staff.', noIndex: true },
  },
  { path: '**', redirectTo: '' },
];
