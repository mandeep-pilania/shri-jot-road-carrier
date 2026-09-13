import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface GalleryImage {
  src: string;
  alt: string;
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
  readonly images: GalleryImage[] = [
    { src: 'https://images.unsplash.com/photo-1485575301924-6891ef935dcd?auto=format&fit=crop&w=1100&q=80', alt: 'Truck driving on an Indian highway' },
    { src: 'https://images.unsplash.com/photo-1716512060259-d114cfba13e8?auto=format&fit=crop&w=1100&q=80', alt: 'Driver inspecting a truck before departure' },
    { src: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1100&q=80', alt: 'Truck on a highway near the hills' },
    { src: 'https://images.unsplash.com/photo-1687690496785-80a0fe10097c?auto=format&fit=crop&w=1100&q=80', alt: 'Crew riding on the back of a goods truck' },
    { src: 'https://images.unsplash.com/photo-1635774152029-17bf0a3e1cb4?auto=format&fit=crop&w=1100&q=80', alt: 'Container truck on the road' },
    { src: 'https://images.unsplash.com/photo-1723358049513-61cd7ab52fa8?auto=format&fit=crop&w=1100&q=80', alt: 'Driver standing on top of a truck during loading' },
    { src: 'https://images.unsplash.com/photo-1626446644149-92e5039b74f0?auto=format&fit=crop&w=1100&q=80', alt: 'Open truck on the road near the coast' },
    { src: 'https://images.unsplash.com/photo-1653106587625-e27944832833?auto=format&fit=crop&w=1100&q=80', alt: 'Truck driving down the road at dusk' },
    { src: 'https://images.unsplash.com/photo-1639418494369-ffcdcb8fd3e3?auto=format&fit=crop&w=1100&q=80', alt: 'Truck parked on the side of the road' },
    { src: 'https://images.unsplash.com/photo-1681004478577-cb7f8421f78c?auto=format&fit=crop&w=1100&q=80', alt: 'Truck driving down a rural road' },
    { src: 'https://images.unsplash.com/photo-1715645948484-da40dd56bc93?auto=format&fit=crop&w=1100&q=80', alt: 'Worker loading boxes into the back of a truck during a house shifting job' },
    { src: 'https://images.unsplash.com/photo-1686966933735-305bd8fe0a77?auto=format&fit=crop&w=1100&q=80', alt: 'Car being loaded onto a carrier for vehicle transport' },
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
