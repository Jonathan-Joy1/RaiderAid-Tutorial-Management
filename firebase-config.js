window.RAIDERAID_FIREBASE_CONFIG = Object.freeze({ /*Note: DO NOT COMMIT/PUSH this file*/
  apiKey: "AIzaSyCYBv_97L6WBglEarKByfC0tOWgYu3Yvq8",
  authDomain: "raideraid-374c7.firebaseapp.com",
  projectId: "raideraid-374c7",
  storageBucket: "raideraid-374c7.firebasestorage.app",
  messagingSenderId: "87161799131",
  appId: "1:87161799131:web:e2efe81532490595bfe7fe"
});

window.initRaiderAidFirebase = function initRaiderAidFirebase() {
  if (typeof firebase === "undefined") {
    throw new Error("Firebase SDK is not loaded.");
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(window.RAIDERAID_FIREBASE_CONFIG);
  }
  return firebase.app();
};
