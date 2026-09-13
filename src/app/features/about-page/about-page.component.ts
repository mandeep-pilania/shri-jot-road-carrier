import { Component } from '@angular/core';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';
import { AboutComponent } from '../home/about/about.component';
import { StatsComponent } from '../home/stats/stats.component';
import { SafetyComponent } from '../home/safety/safety.component';
import { IndustriesComponent } from '../home/industries/industries.component';
import { FinalCtaComponent } from '../home/final-cta/final-cta.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [PageBannerComponent, AboutComponent, StatsComponent, SafetyComponent, IndustriesComponent, FinalCtaComponent],
  template: `
    <app-page-banner
      eyebrow="About Us"
      title="More Than Transport. A Promise You Can Trust."
      description="Shri Jot Road Carrier is your dedicated transporter for Punjab, Haryana, Rajasthan, Himachal Pradesh and all of NCR, founded on safety, reliability and transparency on every trip."
    ></app-page-banner>
    <app-about></app-about>
    <app-stats></app-stats>
    <app-safety></app-safety>
    <app-industries></app-industries>
    <app-final-cta></app-final-cta>
  `,
})
export class AboutPageComponent {}
