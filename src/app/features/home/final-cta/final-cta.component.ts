import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-final-cta',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, RevealDirective],
  templateUrl: './final-cta.component.html',
  styleUrl: './final-cta.component.scss',
})
export class FinalCtaComponent {}
