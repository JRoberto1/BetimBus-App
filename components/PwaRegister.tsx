'use client';
import { useEffect } from 'react';

export default function PwaRegister() {
  useEffect(() => {
    // Registra o Service Worker APENAS em Produção para não travar Next.js HMR no dev
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('SW registrado com sucesso com scope: ', registration.scope);
          },
          (err) => {
            console.log('Falha ao registrar SW: ', err);
          }
        );
      });
    }
  }, []);

  return null;
}
