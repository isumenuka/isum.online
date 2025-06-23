import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { VideoItem } from '../types';
import { VideoCard } from './VideoCard';

interface VideoGalleryProps {
  videos: VideoItem[];
  onVideoClick: (videoId: string) => void;
  selectedVideoId?: string | null;
}

export function VideoGallery({ videos, onVideoClick, selectedVideoId }: VideoGalleryProps) {
  const sectionRef = useScrollAnimation('animate-fadeIn');
  // Take only the first 36 videos (6 rows × 6 videos per row)
  const limitedVideos = videos.slice(0, 36);
  
  // Split videos into 6 rows
  const chunkedVideos = limitedVideos.reduce((acc, video, i) => {
    const chunkIndex = Math.floor(i / 6);
    if (!acc[chunkIndex]) acc[chunkIndex] = [];
    acc[chunkIndex].push(video);
    return acc;
  }, [] as VideoItem[][]);

  return (
    <main ref={sectionRef} className="flex-grow w-full py-24">
      {chunkedVideos.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`marquee-row row-wave row-rock ${rowIndex % 2 === 0 ? 'marquee-left' : 'marquee-right'}`}
        >
          <div className="marquee-track">
            <div className="marquee-content">
              {Array(2).fill(row).flat().map((video, index) => (
                <VideoCard
                  key={`${video.id}-${index}`}
                  video={video}
                  onClick={() => onVideoClick(video.id)}
                  selected={selectedVideoId === video.id}
                />
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {Array(2).fill(row).flat().map((video, index) => (
                <VideoCard
                  key={`${video.id}-${index}-duplicate`}
                  video={video}
                  onClick={() => onVideoClick(video.id)}
                  selected={selectedVideoId === video.id}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}