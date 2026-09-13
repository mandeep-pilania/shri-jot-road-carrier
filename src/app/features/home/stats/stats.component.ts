import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CountUpDirective } from '../../../shared/directives/count-up.directive';

interface StatItem {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
}

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, CountUpDirective],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent {
  readonly stats: StatItem[] = [
    { value: 1000, suffix: '+', label: 'Happy Clients' },
    { value: 5000, suffix: '+', label: 'Successful Deliveries' },
    { value: 4, suffix: '+', label: 'States + NCR Covered' },
    { value: 24, suffix: '/7', label: 'Service Availability' },
    { value: 4.8, suffix: '/5', decimals: 1, label: '84 Google Reviews' },
  ];
}
