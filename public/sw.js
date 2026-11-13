// Service Worker para PWA - Imobiliária Prime CRM
// Suporte a Push Notifications para Android e iOS (iOS 16.4+)

const CACHE_NAME = 'prime-crm-v1';
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/manifest.webmanifest',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Erro ao pré-armazenar assets:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Suporte a Evento Push do Servidor (Web Push API)
self.addEventListener('push', (event) => {
  let data = {
    title: 'Imobiliária Prime CRM',
    body: 'Você tem uma nova atualização importante no sistema.',
    url: '/dashboard',
    icon: '/icons/icon-192.svg',
    badge: '/icons/icon-192.svg'
  };

  try {
    if (event.data) {
      const parsed = event.data.json();
      data = { ...data, ...parsed };
    }
  } catch (e) {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icons/icon-192.svg',
    badge: data.badge || '/icons/icon-192.svg',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/dashboard',
      dateOfArrival: Date.now()
    },
    actions: [
      { action: 'open', title: 'Abrir no App' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Suporte a mensagem direta da janela (para disparos de teste e alertas locais)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body, url } = event.data;
    self.registration.showNotification(title || 'Prime CRM', {
      body: body || 'Nova notificação de lead ou agendamento.',
      icon: '/icons/icon-192.svg',
      badge: '/icons/icon-192.svg',
      vibrate: [150, 50, 150],
      data: { url: url || '/dashboard' }
    });
  }
});

// Ao clicar na notificação, abre ou foca a janela do app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/dashboard';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
