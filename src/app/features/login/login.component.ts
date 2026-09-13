import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { LogoMarkComponent } from '../../shared/components/logo-mark/logo-mark.component';
import { AuthService } from '../../core/firebase/auth.service';
import { FirebaseStatusService } from '../../core/firebase/firebase-status.service';
import { SubmissionState } from '../../core/models/quote-request.model';

/**
 * Admin login page for the future Admin Dashboard, backed by Firebase
 * Authentication (email/password). Create the admin user in the
 * Firebase Console → Authentication → Users, or via the Admin SDK —
 * there's no public sign-up form here on purpose.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule, LogoMarkComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = new FormBuilder();

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submitted = false;
  state: SubmissionState = 'idle';
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    readonly firebaseStatus: FirebaseStatusService
  ) {}

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    if (this.form.invalid) return;

    if (!this.firebaseStatus.isConfigured) {
      this.state = 'error';
      this.errorMessage = 'Firebase isn\u2019t configured yet — add your project keys to environment.ts.';
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.state = 'loading';

    this.auth.signIn(email, password).subscribe({
      next: () => {
        this.state = 'success';
        // No admin dashboard route exists yet in this build — swap this
        // for router.navigateByUrl('/admin') once one is added.
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.state = 'error';
        this.errorMessage =
          err?.code === 'auth/invalid-credential' || err?.code === 'auth/wrong-password'
            ? 'Incorrect email or password.'
            : 'Sign-in failed. Please try again.';
      },
    });
  }
}
