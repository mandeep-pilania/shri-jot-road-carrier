export interface Testimonial {
  id?: string;
  name: string;
  business: string;
  quote: string;
  rating: number;
  avatar: string;
  order: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

/** Shape used when creating/editing a testimonial in the admin form, before an id exists. */
export type TestimonialInput = Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>;
