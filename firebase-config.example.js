window.RAIDERAID_FIREBASE_CONFIG = Object.freeze({
  apiKey: "REPLACE_WITH_YOUR_FIREBASE_WEB_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_PROJECT.firebaseapp.com",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "REPLACE_WITH_SENDER_ID",
  appId: "REPLACE_WITH_WEB_APP_ID"
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
