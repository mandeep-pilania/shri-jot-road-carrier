import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { FleetCardComponent, FleetCardData } from '../../../shared/components/fleet-card/fleet-card.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

const AUTOPLAY_MS = 4500;

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, FleetCardComponent, RevealDirective],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.scss',
})
export class FleetComponent implements OnInit, OnDestroy {
  // Pickup Truck (the Bolero-type vehicle used most for local house shifting
  // and small loads) is listed first since it's the vehicle most in demand.
  readonly fleet: FleetCardData[] = [
    { image: 'https://images.unsplash.com/photo-1687226675098-82bfca59e5ba?auto=format&fit=crop&w=900&q=80', name: 'Pickup Truck', description: 'Our most-used vehicle for house shifting and small loads — quick, versatile and easy to load.', capacity: 'Up to 1.5 Tons' },
    { image: 'https://images.unsplash.com/photo-1635774152029-17bf0a3e1cb4?auto=format&fit=crop&w=900&q=80', name: 'Container Truck', description: 'Secure, sealed transport for palletized goods.', capacity: 'Up to 25 Tons' },
    { image: 'https://images.unsplash.com/photo-1626446644149-92e5039b74f0?auto=format&fit=crop&w=900&q=80', name: 'Open Truck', description: 'Versatile transport for general and bulk cargo.', capacity: 'Up to 18 Tons' },
    { image: 'https://images.unsplash.com/photo-1686966933735-305bd8fe0a77?auto=format&fit=crop&w=900&q=80', name: 'Car Carrier', description: 'Safe, damage-free loading for car and vehicle transport.', capacity: 'Up to 4 Vehicles' },
    { image: 'https://images.unsplash.com/photo-1639418494369-ffcdcb8fd3e3?auto=format&fit=crop&w=900&q=80', name: 'Reefer Truck', description: 'Temperature-controlled transport for perishables.', capacity: 'Up to 12 Tons' },
    { image: 'https://images.unsplash.com/photo-1605705658744-45f0fe8f9663?auto=format&fit=crop&w=900&q=80', name: 'Trailer', description: 'High-capacity hauling for long-distance freight.', capacity: 'Up to 35 Tons' },
    { image: 'https://images.unsplash.com/photo-1681004478577-cb7f8421f78c?auto=format&fit=crop&w=900&q=80', name: 'Multi-Axle Truck', description: 'Built for heavy, high-volume shipments.', capacity: 'Up to 30 Tons' },
    { image: 'https://images.unsplash.com/photo-1618906460527-05607b30f84b?auto=format&fit=crop&w=900&q=80', name: 'Flatbed Truck', description: 'Suited for oversized and irregular cargo.', capacity: 'Up to 20 Tons' },
    { image: 'https://images.unsplash.com/photo-1742106848698-2c33cc3ce66e?auto=format&fit=crop&w=900&q=80', name: 'Tanker', description: 'Safe transport of liquid and bulk materials.', capacity: 'Up to 20,000 L' },
  ];

  readonly activeIndex = signal(0);
  private autoplayTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startAutoplay();
  }

  next(): void {
    this.activeIndex.update((i) => (i + 1) % this.fleet.length);
    this.restartAutoplay();
  }

  prev(): void {
    this.activeIndex.update((i) => (i - 1 + this.fleet.length) % this.fleet.length);
    this.restartAutoplay();
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
    this.restartAutoplay();
  }

  pauseAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  }

  resumeAutoplay(): void {
    if (!this.autoplayTimer) {
      this.startAutoplay();
    }
  }

  private startAutoplay(): void {
    this.autoplayTimer = setInterval(() => {
      this.activeIndex.update((i) => (i + 1) % this.fleet.length);
    }, AUTOPLAY_MS);
  }

  private restartAutoplay(): void {
    this.pauseAutoplay();
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.pauseAutoplay();
  }
}
