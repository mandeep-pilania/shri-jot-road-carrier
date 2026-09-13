import { Component, Input } from '@angular/core';

/**
 * Custom logo mark for Shri Jot Road Carrier: a truck
 * silhouette on an orange rounded square, used in the header, footer,
 * login page, and as the source for the generated favicon.
 */
@Component({
  selector: 'app-logo-mark',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Shri Jot Road Carrier logo"
    >
      <rect width="64" height="64" rx="16" fill="#FF6B22" />
      <path
        d="M8 40V22a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v18"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="3.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M36 28h9.5L52 34.5V40"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="3.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 40h2"
        stroke="#FFFFFF"
        stroke-width="3.4"
        stroke-linecap="round"
      />
      <circle cx="21" cy="42" r="5" fill="#082B4C" stroke="#FFFFFF" stroke-width="2.2" />
      <circle cx="44" cy="42" r="5" fill="#082B4C" stroke="#FFFFFF" stroke-width="2.2" />
      <path d="M14 40h3M48 40h4" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round" />
    </svg>
  `,
})
export class LogoMarkComponent {
  @Input() size = 40;
}
