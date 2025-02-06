export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  videoUrl: string;
  playlistTitle: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  videos: VideoItem[];
}

export interface PlaylistResponse {
  items: PlaylistItem[];
  nextPageToken?: string;
}

export interface LightboxState {
  isOpen: boolean;
  videoId: string | null;
}