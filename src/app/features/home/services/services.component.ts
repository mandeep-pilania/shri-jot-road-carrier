import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceCardComponent, ServiceCardData } from '../../../shared/components/service-card/service-card.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, RevealDirective],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  readonly services: ServiceCardData[] = [
    { icon: 'truck', title: 'Full Truck Load (FTL)', description: 'Dedicated vehicles for large shipments across Punjab, Haryana, Rajasthan, Himachal Pradesh and NCR.' },
    { icon: 'package', title: 'Part Truck Load (PTL)', description: 'Cost-effective shared-load transportation for smaller shipments on the same daily routes.' },
    { icon: 'home', title: 'House Shifting', description: 'Complete home relocation with careful packing, loading and safe delivery to your new address.' },
    { icon: 'car', title: 'Car & Vehicle Transport', description: 'Safe, damage-free transport for cars and other vehicles anywhere in our service network.' },
    { icon: 'boxes', title: 'Goods Transportation', description: 'Safe and reliable movement of commercial goods, big or small.' },
    { icon: 'snowflake', title: 'Reefer Transport', description: 'Temperature-controlled transportation for sensitive goods.' },
    { icon: 'factory', title: 'Industrial Cargo', description: 'Heavy and oversized cargo transportation with proper handling equipment.' },
    { icon: 'warehouse', title: 'Warehouse & Storage', description: 'Safe and secure storage solutions for goods in transit.' },
    { icon: 'container', title: 'Heavy Machinery Transportation', description: 'Specialized transportation for large industrial machinery.' },
    { icon: 'zap', title: 'Express Delivery', description: 'Fast transportation for urgent shipments across all covered states.' },
  ];
}
