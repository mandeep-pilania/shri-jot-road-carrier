import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface SafetyFeature {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-safety',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RevealDirective],
  templateUrl: './safety.component.html',
  styleUrl: './safety.component.scss',
})
export class SafetyComponent {
  readonly features: SafetyFeature[] = [
    { icon: 'package-check', label: 'Careful packing & wrapping' },
    { icon: 'user-check', label: 'Trained drivers' },
    { icon: 'clipboard-check', label: 'Vehicle inspection' },
    { icon: 'lock', label: 'Secure loading' },
    { icon: 'radar', label: 'Transit monitoring' },
    { icon: 'shield', label: 'Insurance support' },
    { icon: 'file-check-2', label: 'Verified documentation' },
    { icon: 'headset', label: '24/7 assistance' },
  ];
}
