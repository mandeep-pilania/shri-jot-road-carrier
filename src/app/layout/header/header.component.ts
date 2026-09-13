import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { filter } from 'rxjs';
import { LogoMarkComponent } from '../../shared/components/logo-mark/logo-mark.component';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule, LogoMarkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly scrolled = signal(false);
  readonly mobileMenuOpen = signal(false);
  // The hero on '/' is the only page dark enough for a transparent
  // header; every other route needs it solid from the start, or the
  // white text/icons disappear against a light page background.
  readonly isHomePage = signal(true);

  readonly navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Our Fleet', path: '/fleet' },
    { label: 'Coverage Area', path: '/coverage' },
    { label: 'Contact', path: '/contact' },
  ];

  constructor(router: Router) {
    this.isHomePage.set(router.url === '/' || router.url === '');
    router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe((e) => {
      this.isHomePage.set(e.urlAfterRedirects === '/' || e.urlAfterRedirects === '');
      this.closeMobileMenu();
    });
  }

  get solid(): boolean {
    return this.scrolled() || !this.isHomePage();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
