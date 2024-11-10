// src/serviceWorker.ts

// Este arquivo pode ser configurado conforme necessário para registrar um service worker.
// Para simplicidade, deixaremos a função `unregister` como está.

export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => {
          registration.unregister();
        })
        .catch(error => {
          console.error(error.message);
        });
    }
  }
  