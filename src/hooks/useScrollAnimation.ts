import { useEffect, useRef } from 'react';

export function useScrollAnimation(animationClass: string, options: IntersectionObserverInit = { threshold: 0.1 }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          element.classList.add(animationClass);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animationClass, options]);

  return ref;
}
