var cacheName = 'cache-v1';

var appShellFiles = ['index.html','./assets/js/app.js','./assets/css/styles.css','./sources/cdn.datatables.net/1.10.23/css/dataTables.bootstrap4.min.css','./sources/cdn.datatables.net/1.10.23/js/dataTables.bootstrap4.min.js','./sources/cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js','./sources/cdn.jsdelivr.net/jsbarcode/3.3.20/JsBarcode.all.min.js','./sources/cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js','./sources/cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js','./sources/code.jquery.com/jquery-3.3.1.slim.min.js','./sources/stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css','./sources/stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(appShellFiles);
      })
    );
});
self.addEventListener('fetch', (e) => {
    console.log('[Service Worker] Fetched resource '+e.request.url);
    e.respondWith(
      caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
        return r || fetch(e.request).then((response) => {
                  return caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });

  self.addEventListener('activate', (e) => {
      console.log('[Service Worker] self->activate');
    e.waitUntil(
      caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
          if(key !== cacheName) {
            return caches.delete(key);
          }
        }));
      })
    );
  });