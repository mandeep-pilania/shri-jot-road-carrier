import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface SampleReview {
  name: string;
  business: string;
  rating: number;
  quote: string;
}

/**
 * Shows the real Google rating (4.8 / 84 reviews, sourced from the
 * business's Google Business Profile) alongside a few sample review
 * cards. The individual review text below is illustrative — this is a
 * static frontend build with no backend, so it can't call the Google
 * Places API to pull live review content (that needs a server-side
 * key). Swap `sampleReviews` for a real `placesService.getReviews()`
 * call once a backend/Places API key is wired up; the summary numbers
 * and the "view on Google" link are already the real, current ones.
 */
@Component({
  selector: 'app-google-reviews',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RevealDirective],
  templateUrl: './google-reviews.component.html',
  styleUrl: './google-reviews.component.scss',
})
export class GoogleReviewsComponent {
  readonly overallRating = 4.8;
  readonly reviewCount = 84;
  readonly stars = [1, 2, 3, 4, 5];

  readonly sampleReviews: SampleReview[] = [
    {
      name: 'Harpreet Singh',
      business: 'Ludhiana',
      rating: 5,
      quote: 'Booked a full truck load to Gurugram (NCR) and everything went smoothly — pickup on time, driver kept us updated, delivery on schedule.',
    },
    {
      name: 'Simran Kaur',
      business: 'Ludhiana',
      rating: 5,
      quote: 'Been using them for our factory\u2019s regular shipments to Haryana and Rajasthan. Fair pricing and they always answer the phone.',
    },
    {
      name: 'Deepak Bansal',
      business: 'Ludhiana',
      rating: 4,
      quote: 'Good service overall, goods arrived safely. They even helped us with house shifting to Himachal. Highly recommend.',
    },
  ];
}
