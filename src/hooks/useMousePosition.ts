import { useState, useEffect } from 'react';

interface MouseState {
  x: number;
  y: number;
  isClicking: boolean;
  isHovering: boolean;
}

export function useMousePosition() {
  const [mousePos, setMousePos] = useState<MouseState>({
    x: 0,
    y: 0,
    isClicking: false,
    isHovering: false
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY
      }));
    };

    const handleMouseDown = () => {
      setMousePos(prev => ({ ...prev, isClicking: true }));
    };

    const handleMouseUp = () => {
      setMousePos(prev => ({ ...prev, isClicking: false }));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.tagName === 'A' || 
                         target.tagName === 'BUTTON' ||
                         target.closest('a') ||
                         target.closest('button');
      
      setMousePos(prev => ({ ...prev, isHovering: isClickable }));
    };

    const handleMouseOut = () => {
      setMousePos(prev => ({ ...prev, isHovering: false }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return mousePos;
}