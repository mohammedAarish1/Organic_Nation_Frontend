// import React, { useState } from 'react';
// import { useInView } from 'react-intersection-observer';

// const Image = ({ src, blurSrc, alt, className, onLoad, isHovered }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//     rootMargin: '50px'
//   });

//   const handleLoad = () => {
//     setIsLoaded(true);
//     onLoad?.();
//   };

//   return (
//     <div ref={ref} className="relative w-full h-full">
//       {/* Blur placeholder */}
//       {blurSrc && (
//         <img
//           src={blurSrc}
//           alt={`${alt} placeholder`}
//           className={`
//             absolute inset-0 
//             transition-opacity duration-200
//             ${className}
//             ${isLoaded ? 'opacity-0' : 'opacity-100'}
//           `}
//         />
//       )}
      
//       {/* Main image */}
//       {inView && (
//         <picture>
//           {src.sm && (
//             <source
//               srcSet={src.sm}
//               type="image/webp"
//             />
//           )}
//           {src.md && (
//             <source
//               srcSet={src.md}
//               type="image/webp"
//             />
//           )}
//           {src.lg && (
//             <source
//               srcSet={src.lg}
//               type="image/webp"
//             />
//           )}
//           <img
//             src={src.md || src.lg || src.sm}
//             alt={alt}
//             className={`
//               transition-opacity duration-500
//               ${className}
//               ${isLoaded ? 'opacity-100' : 'opacity-0'}
//               ${isHovered !== undefined ? (isHovered ? 'opacity-100' : 'opacity-0') : ''}
//             `}
//             onLoad={handleLoad}
//             loading="lazy"
//           />
//         </picture>
//       )}
//     </div>
//   );
// };

// export default Image;



import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Image = ({ src, blurSrc, alt, className, onLoad, isHovered }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '100px' // Increased for earlier loading
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
          className={`
            absolute inset-0 
            transition-opacity duration-300
            ${className}
            ${isLoaded ? 'opacity-0' : 'opacity-100'}
          `}
          loading="eager" // Load placeholder immediately
        />
      )}
      
      {/* Main image */}
      {inView && (
        <picture>
          {/* Mobile devices */}
          {src.sm && (
            <source
              // media="(max-width: 640px)"
              srcSet={src.sm}
              type="image/webp"
            />
          )}
          {/* Tablets */}
          {src.md && (
            <source
              // media="(max-width: 1024px)"
              srcSet={src.md}
              type="image/webp"
            />
          )}
          {/* Desktop */}
          {src.lg && (
            <source
              // media="(min-width: 1025px)"
              srcSet={src.lg}
              type="image/webp"
            />
          )}
          <img
            src={src.md || src.lg || src.sm}
            alt={alt}
            className={`
              transition-opacity duration-300
              ${className}
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
              ${isHovered !== undefined ? (isHovered ? 'opacity-100' : 'opacity-0') : ''}
            `}
            onLoad={handleLoad}
            loading="lazy"
            decoding="async"
          />
        </picture>
      )}
    </div>
  );
};

export default Image;


// import React, { useState, useEffect } from 'react';
// import { useInView } from 'react-intersection-observer';

// const Image = ({ 
//   src, 
//   blurSrc, 
//   alt, 
//   className,
//   onLoad,
//   isHovered,
//   sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
// }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     threshold: 0,
//     rootMargin: '200px 0px' // Increased rootMargin for earlier loading
//   });

//   const handleLoad = (e) => {
//     if (e.target.src !== blurSrc) {
//       setIsLoaded(true);
//       onLoad?.();
//     }
//   };

//   // Preload the next larger image size when the current one loads
//   useEffect(() => {
//     if (isLoaded && src.md) {
//       const preloadLink = document.createElement('link');
//       preloadLink.rel = 'preload';
//       preloadLink.as = 'image';
//       preloadLink.href = src.md;
//       document.head.appendChild(preloadLink);
//       return () => document.head.removeChild(preloadLink);
//     }
//   }, [isLoaded, src.md]);

//   return (
//     <div ref={ref} className="relative w-full h-full overflow-hidden">
//       {/* Blur placeholder with reduced quality */}
//       {blurSrc && (
//         <img
//           src={blurSrc}
//           alt={`${alt} placeholder`}
//           className={`
//             absolute inset-0 w-full h-full object-cover
//             transition-opacity duration-500 ease-out
//             ${className}
//             ${isLoaded ? 'opacity-0' : 'opacity-100'}
//           `}
//           loading="eager"
//           fetchPriority="high"
//         />
//       )}
      
//       {/* Main image */}
//       {inView && (
//         <picture>
//           {/* Mobile - smallest size */}
//           <source
//             media="(max-width: 640px)"
//             srcSet={`${src.sm} 640w`}
//             sizes={sizes}
//             type="image/webp"
//           />
          
//           {/* Tablet - medium size */}
//           <source
//             media="(max-width: 1024px)"
//             srcSet={`${src.md} 1024w`}
//             sizes={sizes}
//             type="image/webp"
//           />
          
//           {/* Desktop - largest size */}
//           <source
//             media="(min-width: 1025px)"
//             srcSet={`${src.lg} 1920w`}
//             sizes={sizes}
//             type="image/webp"
//           />
          
//           <img
//             src={src.md || src.lg || src.sm}
//             alt={alt}
//             className={`
//               w-full h-full object-cover
//               transition-opacity duration-500 ease-out
//               ${className}
//               ${isLoaded ? 'opacity-100' : 'opacity-0'}
//               ${isHovered !== undefined ? (isHovered ? 'opacity-100' : 'opacity-0') : ''}
//             `}
//             onLoad={handleLoad}
//             loading="lazy"
//             decoding="async"
//             sizes={sizes}
//           />
//         </picture>
//       )}
//     </div>
//   );
// };

// export default Image;