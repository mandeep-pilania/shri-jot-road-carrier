import { Component } from '@angular/core';

import { HeroComponent } from './hero/hero.component';
import { QuoteComponent } from './quote/quote.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { StatsComponent } from './stats/stats.component';
import { FleetComponent } from './fleet/fleet.component';
import { CoverageComponent } from './coverage/coverage.component';
import { ProcessComponent } from './process/process.component';
import { SafetyComponent } from './safety/safety.component';
import { IndustriesComponent } from './industries/industries.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { GoogleReviewsComponent } from './google-reviews/google-reviews.component';
import { FaqComponent } from './faq/faq.component';
import { FinalCtaComponent } from './final-cta/final-cta.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    QuoteComponent,
    ServicesComponent,
    AboutComponent,
    StatsComponent,
    FleetComponent,
    CoverageComponent,
    ProcessComponent,
    SafetyComponent,
    IndustriesComponent,
    GalleryComponent,
    TestimonialsComponent,
    GoogleReviewsComponent,
    FaqComponent,
    FinalCtaComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
