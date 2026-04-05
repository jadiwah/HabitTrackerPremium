const CACHE_NAME = 'jalur-langit-v1';
const assets = ['index.html', 'manifest.json'];

// Install Service Worker
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assets);
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
