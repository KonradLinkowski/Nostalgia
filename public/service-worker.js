const cacheName = 'nostalgia-' + Date.now();
const filesToCache = [
  './',
  'manifest.json',
  'index.html',
  'global.css',
  'build/bundle.css',
  'build/bundle.js',
  'favicon.png',
  'https://fonts.googleapis.com/css?family=Sacramento&display=swap',
  'https://fonts.googleapis.com/css?family=Parisienne&display=swap',
  'https://fonts.googleapis.com/css?family=Lato&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(thisCacheName => {
          if (thisCacheName !== cacheName) {
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    (async function() {
      const response = await caches.match(e.request);
      return response || fetch(e.request);
    })()
  );
});