const CACHE_NAME = 'techwear-cache-v1';

// Базовые файлы App Shell для кэширования при установке
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.svg'
];

/**
 * Установка Service Worker: создаем кэш и сохраняем App Shell
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('⚙️ [Service Worker] Pre-caching App Shell assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Форсируем активацию новой версии SW без ожидания закрытия вкладок
});

/**
 * Активация Service Worker: удаляем старый кэш предыдущих версий
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('⚙️ [Service Worker] Removing deprecated cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim(); // Немедленно берем под контроль все открытые вкладки
});

/**
 * Перехват сетевых запросов
 */
self.addEventListener('fetch', (event) => {
  // Обрабатываем только запросы к нашему собственному домену (CORS/Origin check)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  const isHtmlRequest = event.request.headers.get('accept')?.includes('text/html');

  if (isHtmlRequest) {
    // Стратегия: Network-First для HTML
    // Важно для интернет-магазинов, чтобы всегда подгружать свежую структуру при наличии сети.
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          // Если сети нет — отдаем из кэша
          return caches.match(event.request);
        })
    );
  } else {
    // Стратегия: Stale-While-Revalidate для ассетов (JS, CSS, Картинки)
    // Дает мгновенную загрузку из кэша + фоновое обновление ресурса из сети.
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Игнорируем сетевые ошибки, так как у нас есть кэшированная копия
          });

        return cachedResponse || fetchPromise;
      })
    );
  }
});
