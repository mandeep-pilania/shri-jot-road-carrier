// Same Firebase config as environment.ts — Angular swaps this file in
// for production builds via the fileReplacements setting. Most small
// sites can safely use the same Firebase project for both; point this
// at a separate prod project instead if you want dev/prod data kept apart.
export const environment = {
  production: true,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID',
  },
};
