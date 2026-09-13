export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  fromLocation: string;
  toLocation: string;
  goodsType: string;
  approxWeight: string;
  vehicleType: string;
  pickupDate: string;
  message?: string;
  createdAt?: string;
}

export type SubmissionState = 'idle' | 'loading' | 'success' | 'error';
