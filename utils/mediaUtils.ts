/**
 * Senior Architectural Media & YouTube Video Resolver Utility
 * 
 * Supports:
 * - YouTube standard links (https://www.youtube.com/watch?v=...)
 * - YouTube short links (https://youtu.be/...)
 * - YouTube shorts (https://www.youtube.com/shorts/...)
 * - YouTube embed links (https://www.youtube.com/embed/...)
 * - Auto-extraction of High-Resolution YouTube Thumbnails
 * - Safe Responsive Embed URL Generator
 */

export function extractYouTubeId(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  
  // Handles all common YouTube formats:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtube.com/watch?v=VIDEO_ID&feature=share
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://www.youtube.com/shorts/VIDEO_ID
  // - https://m.youtube.com/watch?v=VIDEO_ID
  const regExp = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regExp);
  return match ? match[1] : null;
}

export function isYouTubeUrl(url?: string): boolean {
  return !!extractYouTubeId(url);
}

export function isVideoUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  if (isYouTubeUrl(trimmed)) return true;
  return trimmed.endsWith('.mp4') || trimmed.endsWith('.webm') || trimmed.endsWith('.mov') || trimmed.includes('vimeo.com');
}

/**
 * Returns high-definition YouTube thumbnail
 */
export function getYouTubeThumbnail(url?: string, preferredQuality: 'max' | 'hq' | 'mq' = 'hq'): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;

  if (preferredQuality === 'max') {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  } else if (preferredQuality === 'mq') {
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }
  // hqdefault is 100% guaranteed to exist for all YouTube videos
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/**
 * Generates privacy-enhanced YouTube embed player URL
 */
export function getYouTubeEmbedUrl(
  url?: string, 
  options: { autoplay?: boolean; mute?: boolean; rel?: boolean } = {}
): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;

  const { autoplay = false, mute = false, rel = false } = options;
  const params = new URLSearchParams();
  if (autoplay) params.set('autoplay', '1');
  if (mute) params.set('mute', '1');
  if (!rel) params.set('rel', '0');
  params.set('modestbranding', '1');
  params.set('enablejsapi', '1');

  const queryString = params.toString();
  return `https://www.youtube-nocookie.com/embed/${id}${queryString ? `?${queryString}` : ''}`;
}

export interface MediaResolution {
  originalUrl: string;
  isVideo: boolean;
  isYouTube: boolean;
  videoId?: string;
  thumbnailUrl: string;
  embedUrl?: string;
}

export function resolveMedia(url?: string, defaultImage?: string): MediaResolution {
  const cleanUrl = (url || '').trim();
  const ytId = extractYouTubeId(cleanUrl);

  if (ytId) {
    return {
      originalUrl: cleanUrl,
      isVideo: true,
      isYouTube: true,
      videoId: ytId,
      thumbnailUrl: `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?rel=0`
    };
  }

  const isOtherVideo = cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.webm') || cleanUrl.includes('vimeo.com');

  return {
    originalUrl: cleanUrl,
    isVideo: isOtherVideo,
    isYouTube: false,
    thumbnailUrl: cleanUrl || defaultImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    embedUrl: isOtherVideo ? cleanUrl : undefined
  };
}
