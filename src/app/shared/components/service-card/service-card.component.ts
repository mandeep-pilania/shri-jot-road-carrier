import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

export interface ServiceCardData {
  icon: string; // lucide icon name
  title: string;
  description: string;
  link?: string;
}

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss',
})
export class ServiceCardComponent {
  @Input({ required: true }) data!: ServiceCardData;
}
