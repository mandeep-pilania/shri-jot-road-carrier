import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

interface TrustIndicator {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly trustIndicators: TrustIndicator[] = [
    { icon: 'shield-check', label: '100% Safe Delivery' },
    { icon: 'clock', label: 'On Time Every Time' },
    { icon: 'headset', label: '24/7 Support' },
    { icon: 'star', label: '4.8★ (84 Google Reviews)' },
  ];
}
