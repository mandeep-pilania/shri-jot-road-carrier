import { Component } from '@angular/core';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';
import { ServicesComponent } from '../home/services/services.component';
import { ProcessComponent } from '../home/process/process.component';
import { IndustriesComponent } from '../home/industries/industries.component';
import { FaqComponent } from '../home/faq/faq.component';
import { FinalCtaComponent } from '../home/final-cta/final-cta.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [PageBannerComponent, ServicesComponent, ProcessComponent, IndustriesComponent, FaqComponent, FinalCtaComponent],
  template: `
    <app-page-banner
      eyebrow="Our Services"
      title="Complete Transport Solutions for Every Business"
      description="From full truck loads and house shifting to vehicle transport, we offer reliable transportation solutions across Punjab, Haryana, Rajasthan, Himachal Pradesh and NCR."
    ></app-page-banner>
    <app-services></app-services>
    <app-process></app-process>
    <app-industries></app-industries>
    <app-faq></app-faq>
    <app-final-cta></app-final-cta>
  `,
})
export class ServicesPageComponent {}
