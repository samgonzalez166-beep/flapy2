const CACHE_NAME = "mi-juego-cache-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/main.js",
  "/inicio.js",
  "/juego.js",
  "/gameover.js",
  "/manifest.json",
  "/bird2.png",
  "/fondo2.jpg",
  "/pipe.png",  
  "/play.jpg",
  "/reiniciar.jpg",
  "/icono1.png",
  "/icono2.png", 
  "https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {

      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });

    })
  );
});
