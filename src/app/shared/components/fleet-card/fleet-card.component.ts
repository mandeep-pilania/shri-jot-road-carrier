import { Component, Input } from '@angular/core';

export interface FleetCardData {
  image: string;
  name: string;
  description: string;
  capacity: string;
}

@Component({
  selector: 'app-fleet-card',
  standalone: true,
  templateUrl: './fleet-card.component.html',
  styleUrl: './fleet-card.component.scss',
})
export class FleetCardComponent {
  @Input({ required: true }) data!: FleetCardData;
}
