import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { filter, map } from 'rxjs';
import { LogoMarkComponent } from '../../shared/components/logo-mark/logo-mark.component';
import { AuthService } from '../../core/firebase/auth.service';

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
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

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

  // Drives Login vs Logout in the header actions -- true once Firebase
  // Auth confirms a signed-in admin, false once signed out or never
  // signed in.
  readonly isSignedIn = toSignal(this.auth.user$.pipe(map((user) => !!user)), {
    initialValue: false,
  });

  constructor() {
    const router = this.router;
    this.isHomePage.set(router.url === '/' || router.url === '');
    router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe((e) => {
      this.isHomePage.set(e.urlAfterRedirects === '/' || e.urlAfterRedirects === '');
      this.closeMobileMenu();
    });
  }

  logout(): void {
    this.closeMobileMenu();
    this.auth.signOut().subscribe(() => this.router.navigateByUrl('/'));
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
