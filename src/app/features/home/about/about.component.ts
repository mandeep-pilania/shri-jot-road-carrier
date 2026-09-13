import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly features: string[] = [
    'Punjab, Haryana, Rajasthan & Himachal Specialist',
    'Careful Packing & Handling',
    'Experienced & Trained Drivers',
    'Well-Maintained Fleet',
    'Competitive Pricing',
    'Safe & Secure Handling',
    'Transparent Communication',
    '24/7 Customer Support',
  ];
}
