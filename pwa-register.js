if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swUrl = new URL("service-worker.js", window.location.href).toString();
    navigator.serviceWorker.register(swUrl).catch((error) => {
      console.error("Service worker registration failed:", error);
    });
  });
}
