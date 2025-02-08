import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VideoGallery } from './components/VideoGallery';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { ThumbnailLightbox } from './components/ThumbnailLightbox';
import { DesignToolsGrid } from './components/DesignToolsGrid';
import { FeedbackSection } from './components/FeedbackSection';
import { ContactForm } from './components/ContactForm';
import { useMousePosition } from './hooks/useMousePosition';
import { useVideos } from './hooks/useVideos';
import { LightboxState } from './types';

export default function App() {
  const { x, y, isClicking, isHovering } = useMousePosition();
  const { videos, loading, error } = useVideos();
  const [lightbox, setLightbox] = useState<LightboxState>({ isOpen: false, videoId: null });

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <div 
        className={`custom-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ left: `${x}px`, top: `${y}px` }}
      >
        <div className="cursor-dot" />
        <div className="cursor-ring" />
      </div>

      <Header />
      
      <VideoGallery 
        videos={videos}
        onVideoClick={(videoId) => setLightbox({ isOpen: true, videoId })}
      />

      <div className="mt-4">
        <DesignToolsGrid />
      </div>

      <FeedbackSection />

      <ContactForm />

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