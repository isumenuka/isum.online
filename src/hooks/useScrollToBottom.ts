import { useState, useEffect } from 'react';

export function useScrollToBottom() {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Consider bottom reached when within 50px of the bottom
      const buffer = 50;
      const bottom = scrollTop + windowHeight >= documentHeight - buffer;
      
      setIsBottom(bottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isBottom;
}