import { useState, useEffect, useCallback, useRef } from 'react';
import { VideoItem } from '../types';
import { YOUTUBE_API_KEY, CHANNEL_ID } from '../config';

const SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutes
const CACHE_KEY = 'youtube_videos_cache';
const CACHE_TIMESTAMP_KEY = 'youtube_cache_timestamp';

export function useVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const syncIntervalRef = useRef<number>();

  const fetchWithTimeout = useCallback(async (url: string, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }, []);

  const saveToCache = useCallback((videos: VideoItem[]) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(videos));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, new Date().toISOString());
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }, []);

  const loadFromCache = useCallback(() => {
    try {
      const cachedVideos = localStorage.getItem(CACHE_KEY);
      const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (cachedVideos && timestamp) {
        setVideos(JSON.parse(cachedVideos));
        setLastSynced(new Date(timestamp));
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Error loading from cache:', error);
    }
    return false;
  }, []);

  const fetchVideos = useCallback(async (force = false) => {
    // If not forced, try to load from cache first
    if (!force && loadFromCache()) {
      return;
    }

    try {
      setLoading(true);
      const playlistsResponse = await fetchWithTimeout(
        `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&key=${YOUTUBE_API_KEY}`
      );

      const allVideos: VideoItem[] = [];
      const processedVideos = new Set<string>();

      for (const playlist of playlistsResponse.items) {
        try {
          const playlistItemsResponse = await fetchWithTimeout(
            `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlist.id}&key=${YOUTUBE_API_KEY}`
          );
          
          const playlistVideos = playlistItemsResponse.items
            .filter((item: any) => {
              if (processedVideos.has(item.snippet.resourceId.videoId)) {
                return false;
              }
              processedVideos.add(item.snippet.resourceId.videoId);
              return true;
            })
            .map((item: any) => ({
              id: item.snippet.resourceId.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              thumbnailUrl: item.snippet.thumbnails.maxres?.url || 
                          item.snippet.thumbnails.high?.url || 
                          item.snippet.thumbnails.default?.url,
              publishedAt: item.snippet.publishedAt,
              videoUrl: `https://youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
              playlistTitle: playlist.snippet.title
            }));

          allVideos.push(...playlistVideos);
        } catch (error) {
          console.error(`Error fetching playlist ${playlist.id}:`, error);
          continue;
        }
      }

      // Sort videos by publish date (newest first)
      allVideos.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      setVideos(allVideos);
      saveToCache(allVideos);
      setLastSynced(new Date());
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch videos');
      setLoading(false);
      
      // Load from cache as fallback if available
      loadFromCache();
    }
  }, [fetchWithTimeout, loadFromCache, saveToCache]);

  // Initial fetch and setup periodic sync
  useEffect(() => {
    fetchVideos();

    // Set up periodic sync
    syncIntervalRef.current = window.setInterval(() => {
      fetchVideos(true); // Force refresh from API
    }, SYNC_INTERVAL);

    // Cleanup
    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [fetchVideos]);

  // Add visibility change handler to sync when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const lastSync = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        if (lastSync) {
          const timeSinceLastSync = Date.now() - new Date(lastSync).getTime();
          if (timeSinceLastSync > SYNC_INTERVAL) {
            fetchVideos(true);
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchVideos]);

  return { 
    videos, 
    loading, 
    error,
    lastSynced,
    refresh: () => fetchVideos(true) // Expose manual refresh function
  };
}