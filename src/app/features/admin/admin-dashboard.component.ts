import { CommonModule } from "@angular/common";

import { Component, OnDestroy, OnInit, WritableSignal, inject, signal } from "@angular/core";

import { toSignal } from "@angular/core/rxjs-interop";

import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

import { Router, RouterLink } from "@angular/router";

import { LucideAngularModule } from "lucide-angular";

import { Subscription, map } from "rxjs";

import { AuthService } from "../../core/firebase/auth.service";

import { EnquiriesService } from "../../core/services/enquiries.service";

import { FleetService } from "../../core/services/fleet.service";

import { TestimonialsService } from "../../core/services/testimonials.service";

import { ContactEnquiry } from "../../core/models/contact-enquiry.model";

import { FleetVehicle } from "../../core/models/fleet-vehicle.model";

import { Testimonial } from "../../core/models/testimonial.model";

import { LogoMarkComponent } from "../../shared/components/logo-mark/logo-mark.component";

type AdminTab = "enquiries" | "fleet" | "testimonials";

const PAGE_SIZE = 5;

/**
 * Admin dashboard behind /admin (see authGuard on that route). Three
 * tabs:
 * - Enquiries: read-only realtime view of contactEnquiries
 * - Fleet: add / edit / delete the vehicles shown in the public Fleet
 *   carousel (FleetService, Firestore collection `fleet`)
 * - Testimonials: add / edit / delete the testimonials shown on the
 *   home page (TestimonialsService, Firestore collection `testimonials`)
 *
 * Both Fleet and Testimonials use one reactive form per tab that's
 * reused for both "add new" and "edit existing" -- calling
 * `editFleetVehicle(v)` / `editTestimonialItem(t)` populates the form
 * and switches it into edit mode; `resetFleetForm()` /
 * `resetTestimonialForm()` clears it back to "add new".
 */
@Component({
  selector: "app-admin-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule,
    LogoMarkComponent,
  ],
  templateUrl: "./admin-dashboard.component.html",
  styleUrl: "./admin-dashboard.component.scss",
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private readonly fb = new FormBuilder();

  private readonly auth = inject(AuthService);

  private readonly router = inject(Router);

  private readonly enquiriesService = inject(EnquiriesService);

  private readonly fleetService = inject(FleetService);

  private readonly testimonialsService = inject(TestimonialsService);

  readonly tab = signal<AdminTab>("enquiries");

  readonly adminEmail = toSignal(
    this.auth.user$.pipe(map((u) => u?.email ?? "")),
    { initialValue: "" },
  );

  // ----- Enquiries (read-only) -----

  readonly contactEnquiries = signal<(ContactEnquiry & { id: string })[]>([]);

  readonly enquiriesError = signal("");

  readonly enquiriesPage = signal(1);

  // ----- Fleet -----

  readonly fleet = signal<FleetVehicle[]>([]);

  readonly fleetPage = signal(1);

  editingFleetId: string | null = null;

  fleetSaving = false;

  fleetError = "";

  fleetForm = this.fb.nonNullable.group({
    name: ["", Validators.required],

    image: ["", [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],

    description: ["", Validators.required],

    capacity: ["", Validators.required],

    order: [0, [Validators.required, Validators.min(0)]],
  });

  // ----- Testimonials -----

  readonly testimonials = signal<Testimonial[]>([]);

  readonly testimonialsPage = signal(1);

  editingTestimonialId: string | null = null;

  testimonialSaving = false;

  testimonialError = "";

  testimonialForm = this.fb.nonNullable.group({
    name: ["", Validators.required],

    business: ["", Validators.required],

    quote: ["", Validators.required],

    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],

    avatar: ["", [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],

    order: [0, [Validators.required, Validators.min(0)]],
  });

  private subs: Subscription[] = [];

  private enquiriesSub?: Subscription;

  ngOnInit(): void {
    this.loadEnquiries();

    this.subs.push(
      this.fleetService.list().subscribe((list) => this.fleet.set(list)),
    );

    this.subs.push(
      this.testimonialsService
        .list()
        .subscribe((list) => this.testimonials.set(list)),
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
    this.enquiriesSub?.unsubscribe();
  }

  private loadEnquiries(): void {
    this.enquiriesError.set("");
    this.enquiriesSub = this.enquiriesService.contactEnquiries().subscribe({
      next: (list) => this.contactEnquiries.set(list),
      error: () =>
        this.enquiriesError.set(
          "Couldn't load enquiries. Please check your connection and try again.",
        ),
    });
  }

  retryEnquiries(): void {
    this.enquiriesSub?.unsubscribe();
    this.loadEnquiries();
  }

  deleteEnquiryItem(id: string | undefined): void {
    if (!id) return;

    if (!confirm("Delete this enquiry? This can't be undone.")) return;

    this.enquiriesService.deleteEnquiry(id).subscribe();
  }

  // ----- Pagination (shared by Enquiries, Fleet, Testimonials) -----

  totalPages(length: number): number {
    return Math.max(1, Math.ceil(length / PAGE_SIZE));
  }

  /** Clamped so a page that no longer exists (e.g. after a delete) falls
   * back to the last valid page, without writing back to the signal
   * during a template read. */
  displayPage(page: number, length: number): number {
    return Math.min(Math.max(1, page), this.totalPages(length));
  }

  paged<T>(list: T[], page: number): T[] {
    const start = (this.displayPage(page, list.length) - 1) * PAGE_SIZE;
    return list.slice(start, start + PAGE_SIZE);
  }

  goToPage(pageSignal: WritableSignal<number>, page: number, length: number): void {
    pageSignal.set(Math.min(Math.max(1, page), this.totalPages(length)));
  }

  setTab(tab: AdminTab): void {
    this.tab.set(tab);
  }

  logout(): void {
    this.auth.signOut().subscribe(() => this.router.navigateByUrl("/login"));
  }

  // ----- Fleet actions -----

  submitFleet(): void {
    if (this.fleetForm.invalid) {
      this.fleetForm.markAllAsTouched();

      return;
    }

    this.fleetSaving = true;

    this.fleetError = "";

    const value = this.fleetForm.getRawValue();

    if (this.editingFleetId) {
      this.fleetService.update(this.editingFleetId, value).subscribe({
        next: () => {
          this.fleetSaving = false;

          this.resetFleetForm();
        },

        error: (err: unknown) => {
          this.fleetSaving = false;

          this.fleetError =
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again.";
        },
      });
    } else {
      this.fleetService.add(value).subscribe({
        next: () => {
          this.fleetSaving = false;

          this.resetFleetForm();
        },

        error: (err: unknown) => {
          this.fleetSaving = false;

          this.fleetError =
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again.";
        },
      });
    }
  }

  editFleetVehicle(vehicle: FleetVehicle): void {
    this.editingFleetId = vehicle.id ?? null;

    this.fleetForm.setValue({
      name: vehicle.name,

      image: vehicle.image,

      description: vehicle.description,

      capacity: vehicle.capacity,

      order: vehicle.order,
    });
  }

  deleteFleetVehicle(id: string | undefined): void {
    if (!id) return;

    if (!confirm("Remove this vehicle from the public Fleet section?")) return;

    this.fleetService.remove(id).subscribe();
  }

  resetFleetForm(): void {
    this.editingFleetId = null;

    this.fleetForm.reset({
      name: "",
      image: "",
      description: "",
      capacity: "",
      order: this.fleet().length,
    });
  }

  // ----- Testimonial actions -----

  submitTestimonial(): void {
    if (this.testimonialForm.invalid) {
      this.testimonialForm.markAllAsTouched();

      return;
    }

    this.testimonialSaving = true;

    this.testimonialError = "";

    const value = this.testimonialForm.getRawValue();

    if (this.editingTestimonialId) {
      this.testimonialsService
        .update(this.editingTestimonialId, value)
        .subscribe({
          next: () => {
            this.testimonialSaving = false;

            this.resetTestimonialForm();
          },

          error: (err: unknown) => {
            this.testimonialSaving = false;

            this.testimonialError =
              err instanceof Error
                ? err.message
                : "Something went wrong. Please try again.";
          },
        });
    } else {
      this.testimonialsService.add(value).subscribe({
        next: () => {
          this.testimonialSaving = false;

          this.resetTestimonialForm();
        },

        error: (err: unknown) => {
          this.testimonialSaving = false;

          this.testimonialError =
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again.";
        },
      });
    }
  }

  editTestimonialItem(testimonial: Testimonial): void {
    this.editingTestimonialId = testimonial.id ?? null;

    this.testimonialForm.setValue({
      name: testimonial.name,

      business: testimonial.business,

      quote: testimonial.quote,

      rating: testimonial.rating,

      avatar: testimonial.avatar,

      order: testimonial.order,
    });
  }

  deleteTestimonialItem(id: string | undefined): void {
    if (!id) return;

    if (!confirm("Remove this testimonial from the public site?")) return;

    this.testimonialsService.remove(id).subscribe();
  }

  resetTestimonialForm(): void {
    this.editingTestimonialId = null;

    this.testimonialForm.reset({
      name: "",

      business: "",

      quote: "",

      rating: 5,

      avatar: "",

      order: this.testimonials().length,
    });
  }

  trackById(_index: number, item: { id?: string }): string {
    return item.id ?? String(_index);
  }
}
