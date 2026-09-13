import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LogoMarkComponent } from '../../shared/components/logo-mark/logo-mark.component';
import { NewsletterService } from '../../core/services/newsletter.service';
import { FirebaseStatusService } from '../../core/firebase/firebase-status.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule, LogoMarkComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  newsletterEmail = '';
  subscribed = false;
  submitting = false;
  errorMessage = '';

  constructor(
    private newsletterService: NewsletterService,
    readonly firebaseStatus: FirebaseStatusService
  ) {}

  subscribe(): void {
    if (!this.newsletterEmail) return;

    this.submitting = true;
    this.errorMessage = '';

    this.newsletterService.subscribe(this.newsletterEmail).subscribe({
      next: () => {
        this.submitting = false;
        this.subscribed = true;
        this.newsletterEmail = '';
      },
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err?.message || 'Something went wrong. Please try again.';
      },
    });
  }
}
