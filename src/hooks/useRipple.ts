import { useRef, useEffect } from 'react';

export function useRipple() {
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const button = ref.current;
    if (!button) return;

    const createRipple = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      const circle = document.createElement('span');
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.className = 'ripple-effect';
      const ripple = button.getElementsByClassName('ripple-effect')[0];
      if (ripple) ripple.remove();
      button.appendChild(circle);
    };

    button.addEventListener('click', createRipple);
    return () => button.removeEventListener('click', createRipple);
  }, []);

  return ref;
}
