import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { environment } from '../../../environments/environment';

/**
 * Single shared Firebase app instance for the whole site. Import
 * `firebaseAuth` / `firestoreDb` from here rather than calling
 * initializeApp() again elsewhere.
 */
export const firebaseApp = initializeApp(environment.firebase);
export const firebaseAuth = getAuth(firebaseApp);

// Firestore's default transport (WebChannel, backed by HTTP/2 streaming)
// gets silently blocked or stalled on some corporate networks, proxies
// and ISPs -- writes and reads never error out, they just hang, which is
// exactly what showed up as "This is taking longer than expected" on the
// contact form even though the write had actually gone through. Long
// polling is slower per-request but far more reliable on those networks;
// auto-detect keeps the faster WebChannel transport everywhere else.
export const firestoreDb = initializeFirestore(firebaseApp, {
  experimentalAutoDetectLongPolling: true,
});
