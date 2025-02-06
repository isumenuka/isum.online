import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoLightboxProps {
  videoId: string;
  onClose: () => void;
}

export function VideoLightbox({ videoId, onClose }: VideoLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
    >
      <div className="relative w-full max-w-5xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 glassmorphism p-2 rounded-full text-white hover:text-red-500 hover:scale-110 transition-all duration-300"
          aria-label="Close video"
        >
          <X size={24} />
        </button>
        <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden neumorphic">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}