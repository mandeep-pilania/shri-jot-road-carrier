import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header *ngIf="!isAdminRoute()"></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer *ngIf="!isAdminRoute()"></app-footer>
  `,
})
export class AppComponent {
  // The Admin Dashboard is a self-contained shell with its own top bar
  // (logo, "View Site", Logout) -- layering the public site's header and
  // footer around it too produced two stacked headers (one navy, one
  // white) on /admin.
  readonly isAdminRoute = signal(false);

  constructor(router: Router, seo: SeoService) {
    seo.init();
    this.isAdminRoute.set(router.url.startsWith('/admin'));
    router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe((e) => {
      this.isAdminRoute.set(e.urlAfterRedirects.startsWith('/admin'));
    });
  }
}
