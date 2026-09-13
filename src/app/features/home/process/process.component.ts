import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface ProcessStep {
  number: string;
  icon: string;
  title: string;
}

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RevealDirective],
  templateUrl: './process.component.html',
  styleUrl: './process.component.scss',
})
export class ProcessComponent {
  readonly steps: ProcessStep[] = [
    { number: '01', icon: 'clipboard-list', title: 'Book Your Shipment' },
    { number: '02', icon: 'clipboard-check', title: 'Pickup & Verification' },
    { number: '03', icon: 'truck', title: 'Safe Transportation' },
    { number: '04', icon: 'package-check', title: 'On-Time Delivery' },
  ];
}
