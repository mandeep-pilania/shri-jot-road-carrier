import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { finalize } from 'rxjs';

import { QuoteService } from '../../../core/services/quote.service';
import { SubmissionState } from '../../../core/models/quote-request.model';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { FirebaseStatusService } from '../../../core/firebase/firebase-status.service';

const PHONE_PATTERN = /^[6-9]\d{9}$/;

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, RevealDirective],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
})
export class QuoteComponent {
  private fb = new FormBuilder();
  private quoteService: QuoteService;

  readonly vehicleTypes = [
    'Mini Truck',
    'Open Truck',
    'Container Truck',
    'Reefer Truck',
    'Trailer',
    'Multi-Axle Truck',
    'Flatbed Truck',
    'Tanker',
  ];

  readonly goodsTypes = [
    'General Goods',
    'Industrial Machinery',
    'FMCG / Retail',
    'Perishable Goods',
    'Electronics',
    'Construction Material',
    'Other',
  ];

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    email: ['', [Validators.required, Validators.email]],
    fromLocation: ['', Validators.required],
    toLocation: ['', Validators.required],
    goodsType: ['', Validators.required],
    approxWeight: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/)]],
    vehicleType: ['', Validators.required],
    pickupDate: ['', [Validators.required, this.futureDateValidator]],
    message: [''],
  });

  state: SubmissionState = 'idle';
  errorMessage = '';

  constructor(quoteService: QuoteService, readonly firebaseStatus: FirebaseStatusService) {
    this.quoteService = quoteService;
  }

  private futureDateValidator(control: { value: string }) {
    if (!control.value) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const picked = new Date(control.value);
    return picked < today ? { pastDate: true } : null;
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.state = 'loading';
    const payload = { ...this.form.getRawValue(), createdAt: new Date().toISOString() };

    this.quoteService
      .submitQuoteRequest(payload)
      .pipe(finalize(() => {}))
      .subscribe({
        next: () => {
          this.state = 'success';
          this.form.reset();
        },
        error: () => {
          this.state = 'error';
        },
      });
  }

  resetState(): void {
    this.state = 'idle';
  }
}
