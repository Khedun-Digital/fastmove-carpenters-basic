// Service Worker for FastMove Carpenters
// Provides offline functionality and performance improvements

const CACHE_NAME = 'fastmove-carpenters-v1';
const OFFLINE_URL = '/index.html';

// Files to cache for offline functionality
const CACHE_FILES = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/config.js',
  '/assets/js/utils.js',
  '/assets/js/contact.js',
  '/assets/js/navigation.js',
  '/assets/js/forms.js',
  '/assets/js/testimonials.js',
  '/assets/js/analytics.js',
  '/assets/js/performance.js',
  '/assets/js/main.js',
  '/assets/images/icons/favicon.svg',
  '/assets/images/og/og-cover.svg',
  '/assets/images/hero/workshop-placeholder.svg',
  '/assets/images/portfolio/kitchen-placeholder.svg',
  '/assets/images/portfolio/decking-placeholder.svg',
  '/assets/images/portfolio/wardrobe-placeholder.svg'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching essential files');
        return cache.addAll(CACHE_FILES);
      })
      .then(() => {
        console.log('[SW] All files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version
          return cachedResponse;
        }
        
        // Try to fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Add to cache for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Network failed, try to return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            
            // For other requests, you could return a default offline resource
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Handle background sync (if supported)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered');
    // Handle background sync tasks here
  }
});

// Handle push notifications (if needed in future)
self.addEventListener('push', (event) => {
  console.log('[SW] Push message received');
  // Handle push notifications here
});

// Message event - communicate with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
