'use client';

import { useEffect } from 'react';

export function Animacoes() {
  useEffect(() => {
    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>('[data-revelar]')
    );
    if (alvos.length === 0) return;

    const revelar = (el: HTMLElement) => el.classList.add('revelado');

    const semMovimento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (semMovimento || !('IntersectionObserver' in window)) {
      alvos.forEach(revelar);
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          revelar(entrada.target as HTMLElement);
          observador.unobserve(entrada.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );

    alvos.forEach((el) => observador.observe(el));

    const prazo = window.setTimeout(() => alvos.forEach(revelar), 3000);

    return () => {
      observador.disconnect();
      window.clearTimeout(prazo);
    };
  }, []);

  return null;
}
