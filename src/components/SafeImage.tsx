import React, { useState, useEffect } from 'react';
import { ARCHITECTURAL_FALLBACK_IMAGES, sanitizeImageUrl } from '../utils/imageCompressor';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  fallbackType?: keyof typeof ARCHITECTURAL_FALLBACK_IMAGES;
  customFallback?: string;
  className?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
}

/**
 * Automatically optimizes Unsplash image URLs to request WebP format, optimal size and quality
 */
function optimizeCdnUrl(url: string, width = 800): string {
  if (!url) return '';
  if (url.includes('images.unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=${width}&q=75`;
  }
  return url;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackType = 'modern',
  customFallback,
  className = '',
  alt = 'Kaabsan Real Estate',
  width,
  height,
  priority = false,
  loading,
  ...rest
}) => {
  const defaultFallback = customFallback || ARCHITECTURAL_FALLBACK_IMAGES[fallbackType] || ARCHITECTURAL_FALLBACK_IMAGES.modern;
  const initialSanitized = optimizeCdnUrl(sanitizeImageUrl(src) || defaultFallback);
  
  const [imgSrc, setImgSrc] = useState<string>(initialSanitized);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const sanitized = sanitizeImageUrl(src);
    const targetUrl = optimizeCdnUrl(sanitized || defaultFallback);
    if (targetUrl !== imgSrc) {
      setImgSrc(targetUrl);
      setHasError(false);
    }
  }, [src, defaultFallback, imgSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(optimizeCdnUrl(defaultFallback));
    }
  };

  return (
    <img
      {...rest}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      onLoad={() => setIsLoaded(true)}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-90'} ${className}`}
      loading={loading || (priority ? 'eager' : 'lazy')}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
};
