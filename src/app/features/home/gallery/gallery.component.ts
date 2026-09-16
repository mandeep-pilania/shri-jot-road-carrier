import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface GalleryImage {
  src: string;
  // Accessible, literal description of the photo -- read by screen readers
  // and used as the lightbox image's alt text.
  alt: string;
  // Business-focused caption shown on the card and in the lightbox --
  // deliberately NOT a description of the photo (see caption copy below).
  caption: string;
}

const AUTOPLAY_MS = 4000;

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RevealDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit, OnDestroy {
  // Real photos from our own Google Business Profile -- our actual fleet
  // and jobs, not stock photography. Cropped locally (see scripts used at
  // the time) to keep each vehicle's registration plate in frame.
  readonly images: GalleryImage[] = [
    {
      src: '/assets/images/gallery/01-car-carrier-close.jpg',
      alt: 'Sedan secured inside our enclosed car-carrier trailer, Punjab registration plate visible',
      caption: 'Every vehicle we transport is secured and handled with the same care we’d want for our own -- loaded, latched and locked in for the journey ahead.',
    },
    {
      src: '/assets/images/gallery/02-pickup-front.jpg',
      alt: 'Front view of our Mahindra Bolero pickup, Punjab registration plate visible',
      caption: 'Our fleet is inspected and road-ready before every trip, so breakdowns and delays stay someone else’s problem.',
    },
    {
      src: '/assets/images/gallery/03-packing-indoor.jpg',
      alt: 'Furniture wrapped and packed inside a customer’s home ahead of a house-shifting move',
      caption: 'Careful packing at the source is where a damage-free delivery really begins -- wrapped, padded and labelled before it ever leaves your doorstep.',
    },
    {
      src: '/assets/images/gallery/04-pickup-grille.jpg',
      alt: 'Close-up of a second Mahindra Bolero pickup in our fleet, Punjab registration plate visible',
      caption: 'From Ludhiana outward, our Punjab-registered fleet keeps daily routes running across Haryana and Delhi NCR.',
    },
    {
      src: '/assets/images/gallery/05-packing-service.jpg',
      alt: 'Crew member packing wrapped furniture inside a customer’s home',
      caption: 'Our crews are trained to pack, load and move efficiently -- because a smooth relocation starts with the people doing the lifting.',
    },
    {
      src: '/assets/images/gallery/06-car-carrier-interior.jpg',
      alt: 'Second vehicle being loaded inside our multi-level car-carrier trailer',
      caption: 'Multi-level loading lets us move several vehicles in a single trip, cutting cost and turnaround time for every customer on the route.',
    },
    {
      src: '/assets/images/gallery/07-boxes-stacked.jpg',
      alt: 'Household goods wrapped and staged for dispatch',
      caption: 'Every parcel is wrapped, labelled and staged before dispatch, so nothing about your shipment is left to chance.',
    },
    {
      src: '/assets/images/gallery/08-pickup-doortodoor.jpg',
      alt: 'Our pickup truck parked outside a customer’s home during a door-to-door delivery',
      caption: 'Door-to-door pickup and delivery means your goods are handled by our own crew from the first box to the last.',
    },
    {
      src: '/assets/images/gallery/09-pickup-hillroute.jpg',
      alt: 'Our pickup truck stopped along a regional highway route',
      caption: 'Whether it’s a short intercity hop or a longer regional route, the same fleet and the same standard of care make the trip.',
    },
  ];

  // Carousel state -- activeIndex is both "which slide is showing" and
  // (when lightboxOpen is true) "which image the lightbox displays".
  readonly activeIndex = signal(0);
  readonly lightboxOpen = signal(false);
  private autoplayTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.pauseAutoplay();
  }

  nextSlide(): void {
    this.activeIndex.update((i) => (i + 1) % this.images.length);
    this.restartAutoplay();
  }

  prevSlide(): void {
    this.activeIndex.update((i) => (i - 1 + this.images.length) % this.images.length);
    this.restartAutoplay();
  }

  goToSlide(index: number): void {
    this.activeIndex.set(index);
    this.restartAutoplay();
  }

  open(): void {
    this.lightboxOpen.set(true);
    this.pauseAutoplay();
  }

  close(): void {
    this.lightboxOpen.set(false);
    this.resumeAutoplay();
  }

  lightboxNext(event: Event): void {
    event.stopPropagation();
    this.activeIndex.update((i) => (i + 1) % this.images.length);
  }

  lightboxPrev(event: Event): void {
    event.stopPropagation();
    this.activeIndex.update((i) => (i - 1 + this.images.length) % this.images.length);
  }

  pauseAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  }

  resumeAutoplay(): void {
    if (!this.autoplayTimer && !this.lightboxOpen()) {
      this.startAutoplay();
    }
  }

  private startAutoplay(): void {
    this.autoplayTimer = setInterval(() => {
      this.activeIndex.update((i) => (i + 1) % this.images.length);
    }, AUTOPLAY_MS);
  }

  private restartAutoplay(): void {
    this.pauseAutoplay();
    this.startAutoplay();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
