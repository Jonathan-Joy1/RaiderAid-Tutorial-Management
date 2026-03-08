const CACHE_NAME = "raideraid-cache-v5";
const BASE_URL = self.registration.scope;
const HOME_URL = new URL("home.html", BASE_URL).toString();
const APP_SHELL = [
  "",
  "index.html",
  "home.html",
  "signup-login.html",
  "learner-list.html",
  "sender.html",
  "confirm-attendance.html",
  "Visual_Layout.css",
  "firebase-config.js",
  "manifest.webmanifest",
  "pwa-register.js",
  "icons/icon-192.png",
  "icons/icon-512.png"
].map((path) => new URL(path, BASE_URL).toString());

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match(HOME_URL))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request)
          .then((response) => {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            return response;
          })
          .catch(() => caches.match(HOME_URL))
    )
  );
});
