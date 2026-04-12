const CACHE_NAME = 'betim-bus-cache-v1';
const API_URL = '/api/'; // Anything matching this goes Network First

const ASSETS_TO_CACHE = [
  '/',
  '/linhas',
  '/favoritos',
  '/planejar',
  '/mapa',
  '/data/pontos.json',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache core routes
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Exclude non-GET requests or browser-sync/hot-reload
  if (event.request.method !== 'GET') return;
  if (url.pathname.startsWith('/_next/webpack-hmr')) return;

  // Network First for APIs
  if (url.pathname.includes(API_URL)) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            // Only cache valid responses
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        })
        .catch(() => {
          // Offline fallback
          return caches.match(event.request);
        })
    );
    return;
  }

  // Stale-While-Revalidate for everything else (Next.js pages, CSS, JS, etc.)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch(() => {
        // Offline: Do nothing, just return whatever is in cache
      });

      return cachedResponse || fetchPromise;
    })
  );
});
