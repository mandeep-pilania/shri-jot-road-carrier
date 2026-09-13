// Replace every value below with your own Firebase project's config —
// Firebase Console → Project settings → General → "Your apps" → SDK
// setup and configuration → Config.
//
// These values are safe to ship to the browser (they identify your
// Firebase project, they are not secrets); access control is enforced
// by your Firestore/Auth security rules, not by hiding this file.
export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },
};
