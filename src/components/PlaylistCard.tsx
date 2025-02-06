import React from 'react';
import { ExternalLink, PlaySquare } from 'lucide-react';
import { PlaylistItem } from '../types';

interface PlaylistCardProps {
  playlist: PlaylistItem;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative aspect-video">
        <img
          src={playlist.thumbnailUrl}
          alt={playlist.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm flex items-center gap-1">
          <PlaySquare size={16} />
          {playlist.videoCount} videos
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{playlist.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{playlist.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(playlist.publishedAt).toLocaleDateString()}
          </span>
          <a
            href={playlist.playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          >
            Watch <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}