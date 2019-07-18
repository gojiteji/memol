// Cache name
const CACHE_NAME = 'pwa-sample-caches-v1';
// Cache targets
const urlsToCache = [
  './',
  './index.html',
  './src/index.css',
  './src/index.js',
  './img/icon-256.png',
  './img/icon-192.png',
  'https://cdnjs.cloudflare.com/ajax/libs/pressure/2.1.2/pressure.min.js',
  './img/android-icon-36x36.png',
  './img/android-icon-48x48.png',
  './img/android-icon-72x72.png',
  './img/android-icon-96x96.png',
  './img/android-icon-144x144.png',
  './img/android-icon-192x192.png',
  './img/android-icon-256x256.png'

];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response ? response : fetch(event.request);
      })
  );
});