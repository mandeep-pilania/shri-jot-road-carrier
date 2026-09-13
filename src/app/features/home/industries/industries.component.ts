import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface Industry {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RevealDirective],
  templateUrl: './industries.component.html',
  styleUrl: './industries.component.scss',
})
export class IndustriesComponent {
  readonly industries: Industry[] = [
    { icon: 'factory', name: 'Manufacturing' },
    { icon: 'shopping-cart', name: 'E-Commerce' },
    { icon: 'shopping-basket', name: 'FMCG' },
    { icon: 'store', name: 'Retail' },
    { icon: 'wheat', name: 'Agriculture' },
    { icon: 'car', name: 'Automotive' },
    { icon: 'hard-hat', name: 'Construction' },
    { icon: 'pill', name: 'Pharmaceuticals' },
    { icon: 'cpu', name: 'Electronics' },
    { icon: 'settings', name: 'Industrial Equipment' },
  ];
}
