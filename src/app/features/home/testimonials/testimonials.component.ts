import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { TestimonialCardComponent } from '../../../shared/components/testimonial-card/testimonial-card.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { TestimonialsService } from '../../../core/services/testimonials.service';
import { Testimonial } from '../../../core/models/testimonial.model';

// Shown until Firebase is configured, or if the admin hasn't added any
// testimonials to Firestore yet -- the section is never empty.
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    avatar: 'https://images.unsplash.com/photo-1656221008961-51a790bc2502?auto=format&fit=crop&w=150&h=150&q=80',
    name: 'Rakesh Sharma',
    business: 'Textile Business, Ludhiana',
    rating: 5,
    quote: 'Shri Jot Road Carrier has been our logistics partner for over 2 years. Their service is reliable, timely and professional. Highly recommended!',
    order: 0,
  },
  {
    avatar: 'https://images.unsplash.com/photo-1630001603446-585f8a8d5527?auto=format&fit=crop&w=150&h=150&q=80',
    name: 'Priya Mehta',
    business: 'Retail Business, Gurugram (NCR)',
    rating: 5,
    quote: 'Great support and clear communication. Our goods always reach NCR on time without any issues. Truly a trusted partner.',
    order: 1,
  },
  {
    avatar: 'https://images.unsplash.com/photo-1656221010175-bcfeadcb6017?auto=format&fit=crop&w=150&h=150&q=80',
    name: 'Manoj Verma',
    business: 'Auto Parts Business, Ludhiana',
    rating: 5,
    quote: 'Competitive pricing and excellent customer service. They handle our regular shipments to Haryana and Rajasthan very efficiently.',
    order: 2,
  },
  {
    avatar: 'https://images.unsplash.com/photo-1518131296958-df44106fd0ae?auto=format&fit=crop&w=150&h=150&q=80',
    name: 'Anita Desai',
    business: 'Homeowner, Himachal Pradesh',
    rating: 5,
    quote: 'Used their house shifting service for our move to Himachal — careful packing, no damage, and they even transported our car safely.',
    order: 3,
  },
];

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TestimonialCardComponent, RevealDirective],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  private readonly testimonialsService = inject(TestimonialsService);

  readonly testimonials = signal<Testimonial[]>(DEFAULT_TESTIMONIALS);
  private sub?: Subscription;

  ngOnInit(): void {
    this.sub = this.testimonialsService.list().subscribe((items) => {
      this.testimonials.set(items.length > 0 ? items : DEFAULT_TESTIMONIALS);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
