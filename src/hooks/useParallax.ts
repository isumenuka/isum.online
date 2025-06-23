import { useEffect, useRef } from 'react';

export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      el.style.transform = `translateY(${rect.top * speed}px)`;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}
