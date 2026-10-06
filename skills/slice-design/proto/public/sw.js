// Image cache (cal:2026-10-06, user: "the images should be cached and preloaded").
// Stale-while-revalidate for the proto's own images: a repeat visit (or the
// home-screen app) paints them from this cache at once, and the network
// refreshes the copy for next time. Registered by main.jsx in production only.
const CACHE = 'slice-proto-images-v1';
const IMAGE = /\.(png|jpe?g|webp|gif|svg)$/i;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !IMAGE.test(url.pathname)) return;
  const cached = caches.open(CACHE).then((cache) => cache.match(request).then((hit) => ({ cache, hit })));
  const fresh = cached.then(({ cache }) =>
    fetch(request).then((res) => {
      if (res.ok) cache.put(request, res.clone());
      return res;
    }),
  );
  event.respondWith(cached.then(({ hit }) => hit || fresh));
  event.waitUntil(fresh.catch(() => {}));
});
