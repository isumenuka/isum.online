import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { VideoGallery } from './components/VideoGallery';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { ThumbnailLightbox } from './components/ThumbnailLightbox';
import { DesignToolsGrid } from './components/DesignToolsGrid';
import { FeedbackSection } from './components/FeedbackSection';
import { ContactForm } from './components/ContactForm';
import { AIProductsSection } from './components/AIProductsSection';
import { useMousePosition } from './hooks/useMousePosition';
import { useVideos } from './hooks/useVideos';
import { LightboxState } from './types';

export default function App() {
  const mousePos = useMousePosition();
  const { videos, loading, error } = useVideos();
  const [lightbox, setLightbox] = useState<LightboxState>({ isOpen: false, videoId: null });

  // Enable custom cursor for desktop devices
  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (isDesktop) {
      document.body.classList.add('custom-cursor-enabled');
    }
    return () => {
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <div 
        className={`custom-cursor ${mousePos.isHovering ? 'hovering' : ''} ${mousePos.isClicking ? 'clicking' : ''}`}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
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

      <AIProductsSection />

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