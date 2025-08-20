//   import React, { useEffect, useState, useRef } from 'react';
//   import { motion, AnimatePresence } from 'framer-motion';
//   import { FaInstagram, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

//   const InstagramEmbed = ({ postUrl, className = "" }) => {
//     const [isLoaded, setIsLoaded] = useState(false);

//     useEffect(() => {
//       const loadInstagramScript = () => {
//         if (window.instgrm) {
//           window.instgrm.Embeds.process();
//           setIsLoaded(true);
//         } else {
//           const script = document.createElement('script');
//           script.src = '//www.instagram.com/embed.js';
//           script.async = true;
//           script.onload = () => setIsLoaded(true);
//           document.body.appendChild(script);
//         }
//       };

//       const timer = setTimeout(loadInstagramScript, 100);
//       return () => clearTimeout(timer);
//     }, []);

//     return (
//       <div className={`relative overflow-hidden rounded-2xl shadow-lg bg-white ${className}`}>
//         {!isLoaded && (
//           <div className="flex items-center justify-center h-96 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
//             <div className="text-center text-white">
//               <FaInstagram className="mx-auto mb-2 text-4xl animate-pulse" />
//               <p className="text-sm font-medium">Loading Instagram post...</p>
//             </div>
//           </div>
//         )}

//         <blockquote
//           className="instagram-media"
//           data-instgrm-permalink={postUrl}
//           data-instgrm-version="14"
//           style={{
//             background: '#FFF',
//             border: 0,
//             borderRadius: '16px',
//             margin: 0,
//             padding: 0,
//             width: '100%'
//           }}
//         >
//           <a
//             href={postUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center justify-center h-96 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white rounded-2xl hover:shadow-xl transition-shadow duration-300"
//           >
//             <div className="text-center">
//               <FaInstagram className="mx-auto mb-2 text-4xl" />
//               <p className="text-sm font-medium">View this post on Instagram</p>
//               <FaExternalLinkAlt className="mx-auto mt-2 text-sm opacity-75" />
//             </div>
//           </a>
//         </blockquote>
//       </div>
//     );
//   };

//   const InstagramShowcase = () => {
//     // Replace these with your actual Instagram post URLs (20+ posts example)
//     const instagramPosts = [
//       "https://www.instagram.com/p/DKUVzQSI_mB/", // honey reel
//       "https://www.instagram.com/p/DLZtMUkzs5K/", // trail reel post
//       "https://www.instagram.com/p/DK9ZUNhz2jY/", // viralon reel
//       "https://www.instagram.com/p/DMXt3OVTnC-/",
//       "https://www.instagram.com/p/DLpYEoOP48I/",
//       "https://www.instagram.com/p/DKPhI_yMAkR/",
//       "https://www.instagram.com/p/DJ_A3RIvJBT/", 
//       "https://www.instagram.com/p/DLr19YETG1t/",
//       // "https://www.instagram.com/p/C987654321/",
//     ];
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//     const autoPlayRef = useRef();

//     // Responsive slides per view
//     const getSlidesPerView = () => {
//       if (typeof window !== 'undefined') {
//         if (window.innerWidth < 768) return 1; // Mobile: 1 slide
//         if (window.innerWidth < 1024) return 2; // Tablet: 2 slides
//         if (window.innerWidth < 1280) return 3; // Desktop: 3 slides
//         return 4; // Large: 4 slides
//       }
//       return 1;
//     };

//     const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

//     useEffect(() => {
//       const handleResize = () => setSlidesPerView(getSlidesPerView());
//       window.addEventListener('resize', handleResize);
//       return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const maxIndex = Math.max(0, instagramPosts.length - slidesPerView);

//     const nextSlide = () => {
//       setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
//     };

//     const prevSlide = () => {
//       setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
//     };

//     // Auto-play functionality
//     useEffect(() => {
//       if (isAutoPlaying) {
//         autoPlayRef.current = setInterval(nextSlide, 2000);
//       }
//       return () => clearInterval(autoPlayRef.current);
//     }, [isAutoPlaying, maxIndex]);

//     const handleMouseEnter = () => setIsAutoPlaying(false);
//     const handleMouseLeave = () => setIsAutoPlaying(true);

//     return (
//       <section className="py-24">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-12"
//           >
//             <div className="inline-flex items-center gap-2 mb-4">
//               <FaInstagram className="text-3xl text-pink-500" />
//               <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7A2E1D] to-[#9B7A2F] bg-clip-text text-transparent">
//                 Follow Our Journey
//               </h2>
//             </div>
//             <p className="text-[#3E2C1B] max-w-2xl mx-auto">
//               Stay connected with our latest updates, behind-the-scenes moments, and exclusive content on Instagram.
//             </p>
//           </motion.div>

//           {/* Carousel Container */}
//           <div
//             className="relative"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             {/* Navigation Buttons */}
//             <button
//               onClick={prevSlide}
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-[#F5EFE6]/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#DCD2C0] hover:scale-110 transition-all duration-300 group border border-[#9B7A2F]/20"
//               disabled={currentIndex === 0}
//             >
//               <FaChevronLeft className="text-[#7A2E1D] group-hover:text-[#9B7A2F] transition-colors" />
//             </button>

//             <button
//               onClick={nextSlide}
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-[#F5EFE6]/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#DCD2C0] hover:scale-110 transition-all duration-300 group border border-[#9B7A2F]/20"
//               disabled={currentIndex === maxIndex}
//             >
//               <FaChevronRight className="text-[#7A2E1D] group-hover:text-[#9B7A2F] transition-colors" />
//             </button>

//             {/* Carousel Wrapper */}
//             <div className="overflow-x-auto scrollbar-hide rounded-3xl">
//               <motion.div
//                 className="flex"
//                 animate={{ x: `${-currentIndex * (100 / slidesPerView)}%` }}
//                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               >
//                 {instagramPosts.map((postUrl, index) => (
//                   <motion.div
//                     key={index}
//                     className="flex-shrink-0 px-3"
//                     style={{ width: `${100 / slidesPerView}%` }}
//                     whileHover={{ y: -8 }}
//                   >
//                     <InstagramEmbed
//                       postUrl={postUrl}
//                       className="h-full hover:shadow-2xl transition-shadow duration-300"
//                     />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>

//             {/* Dots Indicator */}
//             <div className="flex justify-center mt-8 gap-2">
//               {Array.from({ length: maxIndex + 1 }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
//                       ? 'bg-gradient-to-r from-[#7A2E1D] to-[#9B7A2F] scale-125'
//                       : 'bg-[#DCD2C0] hover:bg-[#9B7A2F]/50'
//                     }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* CTA Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mt-12"
//           >
//             <motion.a
//               href="https://instagram.com/organicnation.co.in"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <FaInstagram className="text-xl text-pink-300" />
//               Visit Our Instagram Profile
//               <FaExternalLinkAlt className="text-sm" />
//             </motion.a>
//           </motion.div>

//           {/* Post Counter */}
//           {/* <div className="text-center mt-6">
//             <p className="text-sm text-[#3E2C1B]/70">
//               Showing {currentIndex * slidesPerView + 1} - {Math.min((currentIndex + 1) * slidesPerView, instagramPosts.length)} of {instagramPosts.length} posts
//             </p>
//           </div> */}
//         </div>
//       </section>
//     );
//   };

//   export default InstagramShowcase;


import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const InstagramEmbed = React.memo(({ postUrl, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const embedRef = useRef(null);

  useEffect(() => {
    // Single script load check
    if (!window.instgrm && !document.querySelector('script[src*="instagram.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
          setIsLoaded(true);
        }
      };
      document.body.appendChild(script);
    } else if (window.instgrm) {
      // Process existing embeds and mark as loaded
      window.instgrm.Embeds.process();
      setIsLoaded(true);
    }

    // Observer to detect when embed is actually rendered
    const observer = new MutationObserver(() => {
      if (embedRef.current?.querySelector('iframe')) {
        setIsLoaded(true);
        observer.disconnect();
      }
    });

    if (embedRef.current) {
      observer.observe(embedRef.current, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-lg bg-white ${className}`} ref={embedRef}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 z-10">
          <div className="text-center text-white">
            <FaInstagram className="mx-auto mb-2 text-4xl animate-pulse" />
            <p className="text-sm font-medium">Loading...</p>
          </div>
        </div>
      )}

      <blockquote
        className="instagram-media"
        data-instgrm-permalink={postUrl}
        data-instgrm-version="14"
        style={{ background: '#FFF', border: 0, borderRadius: '16px', margin: 0, padding: 0, width: '100%' }}
      >
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center h-96 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white rounded-2xl"
        >
          <div className="text-center">
            <FaInstagram className="mx-auto mb-2 text-4xl" />
            <p className="text-sm font-medium">View on Instagram</p>
          </div>
        </a>
      </blockquote>
    </div>
  );
});

const InstagramShowcase = () => {
  const instagramPosts = [
    "https://www.instagram.com/p/DKUVzQSI_mB/",
    "https://www.instagram.com/p/DLZtMUkzs5K/",
    "https://www.instagram.com/p/DK9ZUNhz2jY/",
    "https://www.instagram.com/p/DMXt3OVTnC-/",
    "https://www.instagram.com/p/DLpYEoOP48I/",
    "https://www.instagram.com/p/DKPhI_yMAkR/",
    "https://www.instagram.com/p/DJ_A3RIvJBT/",
    "https://www.instagram.com/p/DLr19YETG1t/",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      if (window.innerWidth < 1280) return 3;
      return 4;
    }
    return 1;
  });

  const autoPlayRef = useRef();
  const maxIndex = instagramPosts.length - slidesPerView;

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const newSlides = window.innerWidth < 768 ? 1 : 
                       window.innerWidth < 1024 ? 2 : 
                       window.innerWidth < 1280 ? 3 : 4;
      if (newSlides !== slidesPerView) {
        setSlidesPerView(newSlides);
        setCurrentIndex(prev => Math.min(prev, instagramPosts.length - newSlides));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesPerView, instagramPosts.length]);

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 2000);

    return () => clearInterval(autoPlayRef.current);
  }, [maxIndex]);

  const handlePrev = () => setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  const handleNext = () => setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  const stopAutoPlay = () => clearInterval(autoPlayRef.current);
  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    }, 2000);
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <FaInstagram className="text-3xl text-pink-500" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#7A2E1D] to-[#9B7A2F] bg-clip-text text-transparent">
              Follow Our Journey
            </h2>
          </div>
          <p className="text-[#3E2C1B] max-w-2xl mx-auto">
            Stay connected with our latest updates and exclusive content on Instagram.
          </p>
        </motion.div>

        <div className="relative" onMouseEnter={stopAutoPlay} onMouseLeave={startAutoPlay}>
          {/* Navigation */}
          {/* <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-[#F5EFE6]/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#DCD2C0] transition-all border border-[#9B7A2F]/20"
          >
            <FaChevronLeft className="text-[#7A2E1D]" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-[#F5EFE6]/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#DCD2C0] transition-all border border-[#9B7A2F]/20"
          >
            <FaChevronRight className="text-[#7A2E1D]" />
          </button> */}

          {/* Carousel */}
          <div className="overflow-x-auto scrollbar-hide rounded-3xl">
            <motion.div
              className="flex"
              animate={{ x: `${-currentIndex * (100 / slidesPerView)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {instagramPosts.map((postUrl, index) => (
                <div
                  key={postUrl}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <InstagramEmbed postUrl={postUrl} className="h-full" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-[#7A2E1D] to-[#9B7A2F] scale-125'
                    : 'bg-[#DCD2C0] hover:bg-[#9B7A2F]/50'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://www.instagram.com/organicnationofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaInstagram className="text-xl text-pink-300" />
            Visit Our Instagram Profile
            <FaExternalLinkAlt className="text-sm" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramShowcase;