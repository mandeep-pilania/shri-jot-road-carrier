import { Component } from '@angular/core';
import { PageBannerComponent } from '../../shared/components/page-banner/page-banner.component';
import { FleetComponent } from '../home/fleet/fleet.component';
import { SafetyComponent } from '../home/safety/safety.component';
import { GalleryComponent } from '../home/gallery/gallery.component';
import { FinalCtaComponent } from '../home/final-cta/final-cta.component';

@Component({
  selector: 'app-fleet-page',
  standalone: true,
  imports: [PageBannerComponent, FleetComponent, SafetyComponent, GalleryComponent, FinalCtaComponent],
  template: `
    <app-page-banner
      eyebrow="Our Fleet"
      title="The Right Vehicle for Every Journey"
      description="A modern, well-maintained fleet covering every cargo type — from small parcels to oversized industrial loads."
    ></app-page-banner>
    <app-fleet></app-fleet>
    <app-safety></app-safety>
    <app-gallery></app-gallery>
    <app-final-cta></app-final-cta>
  `,
})
export class FleetPageComponent {}
