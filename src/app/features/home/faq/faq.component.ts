import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  readonly faqs: FaqItem[] = [
    { question: 'What areas do you cover?', answer: 'We run daily transport service across Punjab, Haryana, Rajasthan, Himachal Pradesh and all of NCR, operating out of our Transport Nagar, Ludhiana hub.' },
    { question: 'How can I get a transport quote?', answer: 'Call our support team directly, or fill out the contact form with your pickup and delivery details and we’ll get back to you with pricing.' },
    { question: 'What types of goods do you transport?', answer: 'We transport general goods, industrial machinery, FMCG, perishables, electronics, construction material and more.' },
    { question: 'Do you provide full truck load services?', answer: 'Yes, our Full Truck Load (FTL) service offers dedicated vehicles for large shipments.' },
    { question: 'Do you provide part load services?', answer: 'Yes, our Part Truck Load (PTL) service is a cost-effective option for smaller shipments.' },
    { question: 'Do you help with house shifting?', answer: 'Yes, we offer complete house shifting and home relocation service, including packing, loading, transport and safe delivery to your new home.' },
    { question: 'Can you transport my car or bike?', answer: 'Yes, we provide safe, damage-free car and vehicle transport anywhere within Punjab, Haryana, Rajasthan, Himachal Pradesh and NCR.' },
    { question: 'Can you transport heavy machinery?', answer: 'Yes, we specialize in transporting heavy and oversized industrial machinery with proper handling equipment.' },
    { question: 'Do you provide warehouse services?', answer: 'Yes, we offer safe and secure warehousing and storage solutions alongside our transport services.' },
    { question: 'How long does delivery take?', answer: 'Delivery times vary based on distance and route, but we always aim for on-time delivery with clear ETAs.' },
    { question: 'How can I contact customer support?', answer: 'You can call us at +91 90234 24923 anytime or use the contact form below — our team is available 24/7.' },
  ];

  readonly openIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }
}
