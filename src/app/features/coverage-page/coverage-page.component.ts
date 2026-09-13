import { Component } from '@angular/core';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';
import { CoverageComponent } from '../home/coverage/coverage.component';
import { StatsComponent } from '../home/stats/stats.component';
import { FinalCtaComponent } from '../home/final-cta/final-cta.component';

@Component({
  selector: 'app-coverage-page',
  standalone: true,
  imports: [PageBannerComponent, CoverageComponent, StatsComponent, FinalCtaComponent],
  template: `
    <app-page-banner
      eyebrow="Coverage Area"
      title="Serving Punjab, Haryana, Rajasthan, Himachal &amp; All NCR"
      description="Daily full load and part load transport, house shifting and vehicle transport across Haryana, Rajasthan, Punjab, Himachal Pradesh and All NCR."
    ></app-page-banner>
    <app-coverage></app-coverage>
    <app-stats></app-stats>
    <app-final-cta></app-final-cta>
  `,
})
export class CoveragePageComponent {}
