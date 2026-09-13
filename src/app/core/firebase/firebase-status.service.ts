import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Lets components tell the difference between "Firebase call failed"
 * and "Firebase was never configured" (still has the placeholder
 * `YOUR_API_KEY` from environment.ts), so they can show a helpful
 * setup message instead of a confusing generic error.
 */
@Injectable({ providedIn: 'root' })
export class FirebaseStatusService {
  readonly isConfigured: boolean =
    !!environment.firebase.apiKey && environment.firebase.apiKey !== 'YOUR_API_KEY';
}
