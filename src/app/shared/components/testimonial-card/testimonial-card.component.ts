import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

export interface TestimonialData {
  avatar: string;
  name: string;
  business: string;
  rating: number;
  quote: string;
}

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './testimonial-card.component.html',
  styleUrl: './testimonial-card.component.scss',
})
export class TestimonialCardComponent {
  @Input({ required: true }) data!: TestimonialData;

  get stars(): number[] {
    return Array(this.data.rating).fill(0);
  }
}
