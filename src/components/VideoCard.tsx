import React from 'react';
import { useTilt } from '../hooks/useTilt';
import { VideoItem } from '../types';

interface VideoCardProps {
  video: VideoItem;
  onClick: () => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const tiltRef = useTilt();
  return (
    <button
      ref={tiltRef}
      onClick={onClick}
      className="w-[300px] glass-card rounded-xl overflow-hidden group mx-2"
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