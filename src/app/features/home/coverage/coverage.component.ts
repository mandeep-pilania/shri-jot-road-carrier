import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface RouteStop {
  name: string;
  isEndpoint: boolean;
}

@Component({
  selector: 'app-coverage',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, RevealDirective],
  templateUrl: './coverage.component.html',
  styleUrl: './coverage.component.scss',
})
export class CoverageComponent {
  // Regions exactly as listed on the business's service card, with
  // Ludhiana (Transport Nagar) as the base they operate from.
  readonly stops: RouteStop[] = [
    { name: 'Ludhiana (Base)', isEndpoint: true },
    { name: 'Haryana', isEndpoint: false },
    { name: 'Rajasthan', isEndpoint: false },
    { name: 'Punjab', isEndpoint: false },
    { name: 'Himachal Pradesh', isEndpoint: false },
    { name: 'All NCR', isEndpoint: true },
  ];
}
