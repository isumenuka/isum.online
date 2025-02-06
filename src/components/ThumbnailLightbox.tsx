import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { VideoItem } from '../types';

interface ThumbnailLightboxProps {
  video: VideoItem;
  onClose: () => void;
}

export function ThumbnailLightbox({ video, onClose }: ThumbnailLightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/50"
      onClick={onClose}
    >
      {/* Reveal animation container */}
      <div 
        className="relative max-w-[90vw] max-h-[90vh] animate-reveal"
        onClick={e => e.stopPropagation()}
      >
        {/* Controls */}
        <div className="absolute -top-12 right-0 flex gap-2 animate-slideDown">
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 glass rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            <ExternalLink size={20} className="text-white" />
          </a>
          <button
            onClick={onClose}
            className="p-2 glass rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Image container with shine effect */}
        <div className="relative overflow-hidden rounded-xl shadow-2xl">
          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 animate-shine">
            <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-45 translate-x-[-100%] animate-shimmerReveal" />
          </div>

          {/* Main image */}
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="max-w-full max-h-[85vh] relative z-10"
          />

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full animate-slideUp">
            <h3 className="text-white text-lg font-medium">{video.title}</h3>
            <p className="text-white/70 text-sm mt-1">{video.playlistTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}