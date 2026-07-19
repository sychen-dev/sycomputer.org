'use client';

import { useEffect, useRef } from 'react';

/**
 * 觀察容器進入視窗後加上 .revealed。
 * 容器需帶 .reveal-group,子項帶 .reveal-item(可用 --rd 自訂延遲)。
 * 隱藏狀態由 CSS 以 html.js 範圍限定,無 JS 時內容完整可見。
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -48px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
