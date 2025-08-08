const CACHE_NAME = 'agent-naden-v1.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/scripts/main.js',
    '/images/background-main.jpg',
    '/sections/header.html',
    '/sections/hero.html',
    '/sections/services.html',
    '/sections/contacts.html'
];

// Установка Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Активация Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Перехват запросов
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Возвращаем кэшированную версию, если есть
                if (response) {
                    return response;
                }
                
                // Иначе делаем запрос к сети
                return fetch(event.request).then(response => {
                    // Проверяем, что ответ валидный
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Клонируем ответ
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
            .catch(() => {
                // Fallback для офлайн-режима
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Обработка push-уведомлений (для будущего использования)
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'Новое сообщение от агента',
        icon: '/images/background-main.jpg',
        badge: '/images/background-main.jpg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Открыть сайт',
                icon: '/images/background-main.jpg'
            },
            {
                action: 'close',
                title: 'Закрыть',
                icon: '/images/background-main.jpg'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Агент на сделку СПб', options)
    );
});
