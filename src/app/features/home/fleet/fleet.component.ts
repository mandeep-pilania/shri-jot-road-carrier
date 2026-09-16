import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { FleetCardComponent } from '../../../shared/components/fleet-card/fleet-card.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { FleetService } from '../../../core/services/fleet.service';
import { FleetVehicle } from '../../../core/models/fleet-vehicle.model';

const AUTOPLAY_MS = 4500;

// Shown until Firebase is configured, or if the admin hasn't added any
// vehicles to Firestore yet -- the public Fleet section is never empty.
// Pickup Truck (the vehicle used most for house shifting and small
// loads) is listed first since it's the vehicle most in demand.
const DEFAULT_FLEET: FleetVehicle[] = [
  { name: 'Pickup Truck', image: '/assets/images/fleet/pickup-mahindra.jpg', description: 'Our most-used vehicle for house shifting and small loads — quick, versatile and easy to load.', capacity: 'Up to 1.5 Tons', order: 0 },
  { name: 'Container Truck', image: 'https://images.unsplash.com/photo-1635774152029-17bf0a3e1cb4?auto=format&fit=crop&w=900&q=80', description: 'Secure, sealed transport for palletized goods.', capacity: 'Up to 25 Tons', order: 1 },
  { name: 'Open Truck', image: 'https://images.unsplash.com/photo-1716512060259-d114cfba13e8?auto=format&fit=crop&w=900&q=80', description: 'Versatile transport for general and bulk cargo.', capacity: 'Up to 18 Tons', order: 2 },
  { name: 'Car Carrier', image: '/assets/images/fleet/car-carrier.jpg', description: 'Safe, damage-free loading for car and vehicle transport.', capacity: 'Up to 4 Vehicles', order: 3 },
  { name: 'Reefer Truck', image: 'https://images.unsplash.com/photo-1639418494369-ffcdcb8fd3e3?auto=format&fit=crop&w=900&q=80', description: 'Temperature-controlled transport for perishables.', capacity: 'Up to 12 Tons', order: 4 },
  { name: 'Trailer', image: 'https://images.unsplash.com/photo-1605705658744-45f0fe8f9663?auto=format&fit=crop&w=900&q=80', description: 'High-capacity hauling for long-distance freight.', capacity: 'Up to 35 Tons', order: 5 },
  { name: 'Multi-Axle Truck', image: 'https://images.unsplash.com/photo-1681004478577-cb7f8421f78c?auto=format&fit=crop&w=900&q=80', description: 'Built for heavy, high-volume shipments.', capacity: 'Up to 30 Tons', order: 6 },
  { name: 'Flatbed Truck', image: 'https://images.unsplash.com/photo-1624898115402-eddff44b6491?auto=format&fit=crop&w=900&q=80', description: 'Suited for oversized and irregular cargo.', capacity: 'Up to 20 Tons', order: 7 },
  { name: 'Tanker', image: 'https://images.unsplash.com/photo-1742106848698-2c33cc3ce66e?auto=format&fit=crop&w=900&q=80', description: 'Safe transport of liquid and bulk materials.', capacity: 'Up to 20,000 L', order: 8 },
];

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, FleetCardComponent, RevealDirective],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.scss',
})
export class FleetComponent implements OnInit, OnDestroy {
  private readonly fleetService = inject(FleetService);

  // Populated from Firestore once the subscription below resolves;
  // starts with the bundled defaults so the section never renders empty.
  readonly fleet = signal<FleetVehicle[]>(DEFAULT_FLEET);
  readonly activeIndex = signal(0);

  private autoplayTimer?: ReturnType<typeof setInterval>;
  private fleetSub?: Subscription;

  ngOnInit(): void {
    this.fleetSub = this.fleetService.list().subscribe((vehicles) => {
      this.fleet.set(vehicles.length > 0 ? vehicles : DEFAULT_FLEET);
      this.activeIndex.set(0);
    });
    this.startAutoplay();
  }

  next(): void {
    const total = this.fleet().length;
    if (total === 0) return;
    this.activeIndex.update((i) => (i + 1) % total);
    this.restartAutoplay();
  }

  prev(): void {
    const total = this.fleet().length;
    if (total === 0) return;
    this.activeIndex.update((i) => (i - 1 + total) % total);
    this.restartAutoplay();
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
    this.restartAutoplay();
  }

  trackByIndex(index: number): number {
    return index;
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
      const total = this.fleet().length;
      if (total === 0) return;
      this.activeIndex.update((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
  }

  private restartAutoplay(): void {
    this.pauseAutoplay();
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.pauseAutoplay();
    this.fleetSub?.unsubscribe();
  }
}
