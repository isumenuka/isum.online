import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VideoGallery } from './components/VideoGallery';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { ThumbnailLightbox } from './components/ThumbnailLightbox';
import { useMousePosition } from './hooks/useMousePosition';
import { useVideos } from './hooks/useVideos';
import { useImagesLoaded } from './hooks/useImagesLoaded';
import { LightboxState } from './types';

export default function App() {
  const mousePos = useMousePosition();
  const { videos, loading, error, lastSynced, refresh } = useVideos();
  const imagesLoaded = useImagesLoaded();
  const [lightbox, setLightbox] = useState<LightboxState>({ isOpen: false, videoId: null });

  if (loading || !imagesLoaded) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen flex flex-col overflow-hidden animate-fadeIn">
      <div 
        className={`custom-cursor ${mousePos.isHovering ? 'hovering' : ''} ${mousePos.isClicking ? 'clicking' : ''}`}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      >
        <div className="cursor-dot"></div>
        <div className="cursor-ring"></div>
      </div>

      <Header onRefresh={refresh} lastSynced={lastSynced} />
      
      <VideoGallery 
        videos={videos}
        onVideoClick={(videoId) => setLightbox({ isOpen: true, videoId })}
      />

      <Footer />

      {lightbox.isOpen && (
        <ThumbnailLightbox
          video={videos.find(v => v.id === lightbox.videoId)!}
          onClose={() => setLightbox({ isOpen: false, videoId: null })}
        />
      )}
    </div>
  );
}