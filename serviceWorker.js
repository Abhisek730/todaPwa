const cacheName = "todo-pwa";
const filesToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/cricket.png",
  "/ame.png",
  "/serviceWorker.js",
];

// install the service worker
self.addEventListener("install", (event) => {
  console.log("service worker is installing.......");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// actiovate the service worker
self.addEventListener("activate", (event) => {
  console.log("Service worker is activating.....");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name.startsWith("todo") && name !== cacheName;
          })
          .map((name) => {
            return caches.delete(name);
          })
      );
    })
  );
});

// fetch from cache
self.addEventListener("fetch", (event) => {
  console.log("request send");
  console.log(event.request);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
