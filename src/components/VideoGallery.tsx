import React from 'react';
import { VideoItem } from '../types';
import { VideoCard } from './VideoCard';

interface VideoGalleryProps {
  videos: VideoItem[];
  onVideoClick: (videoId: string) => void;
}

export function VideoGallery({ videos, onVideoClick }: VideoGalleryProps) {
  const chunkedVideos = videos.reduce((acc, video, i) => {
    const chunkIndex = Math.floor(i / 6);
    if (!acc[chunkIndex]) acc[chunkIndex] = [];
    acc[chunkIndex].push(video);
    return acc;
  }, [] as VideoItem[][]);

  return (
    <main className="flex-grow w-full py-24">
      {chunkedVideos.map((row, rowIndex) => (
        <div key={rowIndex} className={`marquee-row ${rowIndex % 2 === 0 ? 'marquee-left' : 'marquee-right'}`}>
          <div className="marquee-track">
            <div className="marquee-content">
              {Array(4).fill(row).flat().map((video, index) => (
                <VideoCard
                  key={`${video.id}-${index}`}
                  video={video}
                  onClick={() => onVideoClick(video.id)}
                />
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {Array(4).fill(row).flat().map((video, index) => (
                <VideoCard
                  key={`${video.id}-${index}-duplicate`}
                  video={video}
                  onClick={() => onVideoClick(video.id)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}