import { useEffect, useRef } from 'react';

export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.willChange = 'transform';

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const translate = rect.top * speed;
      requestAnimationFrame(() => {
        el.style.transform = `translateY(${translate}px)`;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}
