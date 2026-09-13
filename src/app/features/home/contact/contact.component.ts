import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

import { ContactService } from '../../../core/services/contact.service';
import { SubmissionState } from '../../../core/models/quote-request.model';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

const PHONE_PATTERN = /^[6-9]\d{9}$/;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private fb = new FormBuilder();

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    altPhone: ['', [Validators.pattern(PHONE_PATTERN)]],
    email: ['', [Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  state: SubmissionState = 'idle';

  constructor(private contactService: ContactService) {}

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.state = 'loading';
    const raw = this.form.getRawValue();
    const payload = {
      name: raw.name,
      phone: raw.phone,
      subject: raw.subject,
      message: raw.message,
      // Optional fields are only included when actually filled in, so
      // Firestore documents don't collect empty-string clutter.
      ...(raw.altPhone ? { altPhone: raw.altPhone } : {}),
      ...(raw.email ? { email: raw.email } : {}),
      createdAt: new Date().toISOString(),
    };

    this.contactService.submitEnquiry(payload).subscribe({
      next: () => {
        this.state = 'success';
        this.form.reset();
      },
      error: () => {
        this.state = 'error';
      },
    });
  }
}
