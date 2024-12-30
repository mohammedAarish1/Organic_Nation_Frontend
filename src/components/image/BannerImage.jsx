import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const BannerImage = ({ src, blurSrc, alt, className, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px', // Preload images slightly before they come into view
  });

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={ref} className="relative w-full h-full">
      {/* Blur placeholder */}
      {blurSrc && (
        <img
          src={blurSrc}
          alt={`${alt} placeholder`}
          className={`${className} ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          } absolute inset-0 transition-opacity duration-200`}
        />
      )}

      {/* Main image */}
      {inView && (
        <picture>
          {/* Small image for mobile */}
          {src.sm && (
            <source
              srcSet={src.sm}
              type="image/webp"
              media="(max-width: 640px)" // For small screen sizes
            />
          )}

          {/* Medium image for tablets */}
          {src.md && (
            <source
              srcSet={src.md}
              type="image/webp"
              media="(max-width: 1024px)" // For medium screen sizes
            />
          )}

          {/* Large image for desktops */}
          {src.lg && (
            <source
              srcSet={src.lg}
              type="image/webp"
              media="(min-width: 1025px)" // For large screen sizes
            />
          )}

          {/* Fallback to the highest quality image */}
          <img
            src={src.md || src.lg || src.sm} // Fallback order: md > lg > sm
            alt={alt}
            className={`${className} ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-500`}
            onLoad={handleLoad}
            loading="lazy"
          />
        </picture>
      )}
    </div>
  );
};

export default BannerImage;
