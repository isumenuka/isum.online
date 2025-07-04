import React, { useRef } from 'react';
import { VideoItem } from '../types';

interface VideoCardProps {
  video: VideoItem;
  onClick: () => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * 10;
    const rotateY = ((x - rect.width / 2) / rect.width) * -10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (card) card.style.transform = 'rotateX(0) rotateY(0)';
  };

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onMouseDown={() => cardRef.current?.classList.add('pressed')}
      onMouseUp={() => cardRef.current?.classList.remove('pressed')}
      className="tilt-card w-[300px] glass-card rounded-xl overflow-hidden group mx-2"
    >
      <div className="aspect-video overflow-hidden relative">
        {/* Shine effect overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>
        
        {/* Thumbnail image */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-3 relative z-10">
        <p className="text-sm text-white line-clamp-1 text-left group-hover:text-purple-300 transition-colors duration-300">
          {video.title}
        </p>
        <p className="text-xs text-white/60 mt-1 text-left group-hover:text-white/80 transition-colors duration-300">
          {video.playlistTitle}
        </p>
      </div>
    </button>
  );
}