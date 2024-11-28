// import React, { useState, useEffect } from 'react';
// import { useInView } from 'react-intersection-observer';
// // import { useInView } from 'react-intersection-observer';

// const Image = ({ src, blurSrc, alt, className, onLoad }) => {


//     const [isLoaded, setIsLoaded] = useState(false);
//     const { ref, inView } = useInView({
//       triggerOnce: true,
//       threshold: 0.1
//     });
  

//     return (
//       <div ref={ref} className="relative">
//         {/* Blur placeholder */}
//         <img
//           src={blurSrc}
//           alt={alt}
//           className={`${className} ${isLoaded ? 'opacity-0' : 'opacity-100'} absolute inset-0 transition-opacity duration-200`}
//         />
        
//         {/* Main image */}
//         {inView && (
//           <picture>
//             <source
//               type="image/webp"
//               media="(max-width: 640px)"
//               srcSet={`${src.sm}`}
//             />
//             <source
//               type="image/webp"
//               media="(max-width: 1024px)"
//               srcSet={`${src.md}`}
//             />
//             <source
//               type="image/webp"
//               srcSet={`${src.lg}`}
//             />
//             <img
//               src={src.md}
//               alt={alt}
//               className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
//               onLoad={() => {
//                 setIsLoaded(true);
//                 onLoad?.();
//               }}
//               loading="lazy"
//             />
//           </picture>
//         )}
//       </div>
//     );
//   };
  

//   export default Image;


import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Image = ({ src, blurSrc, alt, className, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px'  // Preload images slightly before they come into view
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
          {src.sm && (
            <source
              media="(max-width: 640px)"
              srcSet={src.sm}
              type="image/webp"
            />
          )}
          {src.md && (
            <source
              media="(max-width: 1024px)"
              srcSet={src.md}
              type="image/webp"
            />
          )}
          {src.lg && (
            <source
              srcSet={src.lg}
              type="image/webp"
            />
          )}
          <img
            src={src.md || src.lg || src.sm} // Fallback order
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



export default Image;
