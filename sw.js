const CACHE_NAME = 'habit-tracker-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Aktivasi & Hapus Cache Lama
self.addEventListener('activate', (e) => {
  e.waitUntil(
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
});

// Strategi Fetch (Network First, Fallback to Cache)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});

// Trigger Notifikasi dari Background
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.text() : 'Waktunya Habit Jalur Langit!';
    const options = {
        body: data,
        icon: 'https://i.postimg.cc/Wzn8GV6g/trac.png',
        badge: 'https://i.postimg.cc/Wzn8GV6g/trac.png',
        vibrate: [200, 100, 200],
        data: { dateOfArrival: Date.now() },
        actions: [
            { action: 'explore', title: 'Buka Aplikasi' }
        ]
    };
    event.waitUntil(
        self.registration.showNotification('Jalur Langit Reminders', options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Tutup notifikasi saat diklik
    event.waitUntil(
        clients.openWindow('/') // Buka aplikasi Jalur Langit saat notif diklik
    );
});
