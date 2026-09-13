// Same Firebase config as environment.ts — Angular swaps this file in
// for production builds via the fileReplacements setting. Most small
// sites can safely use the same Firebase project for both; point this
// at a separate prod project instead if you want dev/prod data kept apart.
export const environment = {
  production: true,
  firebase: {
  apiKey: "AIzaSyDLbR-zYySZzViUbOBOJI8y4hTE6rg6qYU",
  authDomain: "shri-jot-road-carrier.firebaseapp.com",
  databaseURL: "https://shri-jot-road-carrier-default-rtdb.firebaseio.com",
  projectId: "shri-jot-road-carrier",
  storageBucket: "shri-jot-road-carrier.firebasestorage.app",
  messagingSenderId: "805982376770",
  appId: "1:805982376770:web:efe1a5ee41951faad66edb",
  measurementId: "G-5NRDPZ1YYQ"
}
};
