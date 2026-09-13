import { Component } from '@angular/core';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';
import { ContactComponent } from '../home/contact/contact.component';
import { FaqComponent } from '../home/faq/faq.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [PageBannerComponent, ContactComponent, FaqComponent],
  template: `
    <app-page-banner
      eyebrow="Contact Us"
      title="Let's Move Forward Together"
      description="Get in touch with us for reliable transportation solutions tailored to your business."
    ></app-page-banner>
    <app-contact></app-contact>
    <app-faq></app-faq>
  `,
})
export class ContactPageComponent {}
