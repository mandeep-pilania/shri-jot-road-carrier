import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-banner">
      <div class="container">
        <p class="page-banner__eyebrow" *ngIf="eyebrow">{{ eyebrow }}</p>
        <h1 class="page-banner__title">{{ title }}</h1>
        <p class="page-banner__desc" *ngIf="description">{{ description }}</p>
      </div>
    </section>
  `,
  styles: [`
    .page-banner {
      background: var(--navy-dark);
      padding: 160px 0 56px;
      text-align: center;

      @media (max-width: 768px) {
        padding: 130px 0 40px;
      }
    }
    .page-banner__eyebrow {
      color: var(--orange);
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .page-banner__title {
      font-family: var(--font-heading);
      color: var(--white);
      font-size: 38px;
      font-weight: 800;
      margin-bottom: 12px;

      @media (max-width: 768px) { font-size: 28px; }
    }
    .page-banner__desc {
      color: rgba(255, 255, 255, 0.75);
      font-size: 16px;
      max-width: 620px;
      margin: 0 auto;
    }
  `],
})
export class PageBannerComponent {
  @Input() eyebrow = '';
  @Input({ required: true }) title!: string;
  @Input() description = '';
}
