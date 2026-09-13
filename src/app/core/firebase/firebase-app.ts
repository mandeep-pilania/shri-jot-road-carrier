import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../../../environments/environment';

/**
 * Single shared Firebase app instance for the whole site. Import
 * `firebaseAuth` / `firestoreDb` from here rather than calling
 * initializeApp() again elsewhere.
 */
export const firebaseApp = initializeApp(environment.firebase);
export const firebaseAuth = getAuth(firebaseApp);
export const firestoreDb = getFirestore(firebaseApp);
