// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { setCurrentPage } from "../../features/pagination/pagination";
// import { fetchCategoryWiseData, setCategoryBtnValue } from "../../features/filter/filterSlice";

// const Banner = () => {
//   const navigate = useNavigate();
//   const [mainBanners, setMainBanners] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const intervalRef = useRef(null);
//   const touchStartX = useRef(0);
//   const dispatch = useDispatch();
//   const apiUrl = import.meta.env.VITE_BACKEND_URL;

//   const fetchBanners = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`${apiUrl}/api/main/banners`);
//       if (response.data) {
//         const sortedBanners = response.data.mainBanners.sort((a, b) => a.order - b.order);
//         setMainBanners(sortedBanners);
//       }
//     } catch (error) {
//       console.error('Failed to fetch banners:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [apiUrl]);

//   useEffect(() => {
//     fetchBanners();
//   }, [fetchBanners]);

//   // Autoplay
//   useEffect(() => {
//     if (mainBanners.length > 1) {
//       intervalRef.current = setInterval(() => {
//         setCurrentIndex(prev => (prev + 1) % mainBanners.length);
//       }, 5000);
//     }
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [mainBanners.length]);

//   // Touch handlers for swipe
//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = (e) => {
//     const touchEndX = e.changedTouches[0].clientX;
//     const diff = touchStartX.current - touchEndX;

//     if (Math.abs(diff) > 50) { // Minimum swipe distance
//       if (diff > 0) {
//         // Swipe left - next
//         setCurrentIndex(prev => (prev + 1) % mainBanners.length);
//       } else {
//         // Swipe right - previous  
//         setCurrentIndex(prev => prev === 0 ? mainBanners.length - 1 : prev - 1);
//       }
//     }
//   };

//   const handleBannerClick = (banner) => {
//     const redirectUrl = `/shop/${banner.redirectionUrl.toLowerCase()}`;
//     dispatch(setCurrentPage(1));
//     dispatch(setCategoryBtnValue(banner.redirectionUrl));
//     dispatch(fetchCategoryWiseData(banner.redirectionUrl.toLowerCase()));
//     navigate(redirectUrl);
//   };

//   if (isLoading) {
//     return (
//       <div className="w-full bg-gray-200 animate-pulse h-[40vw] max-h-[500px] min-h-[250px] flex items-center justify-center">
//         <span className="text-gray-500">Loading Banners...</span>
//       </div>
//     );
//   }

//   if (mainBanners.length === 0) {
//     return (
//       <div className="w-full bg-gray-100 h-[40vw] max-h-[500px] min-h-[250px] flex items-center justify-center">
//         <span className="text-gray-500">No banners available</span>
//       </div>
//     );
//   }

//   return (
//     <section 
//       className="relative w-full aspect-[16/7] max-h-[800px]"
//       onTouchStart={handleTouchStart}
//       onTouchEnd={handleTouchEnd}
//     >
//       {mainBanners.map((banner, index) => (
//         <div
//           key={banner._id}
//           className={`
//             absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out cursor-pointer
//             ${index === currentIndex
//               ? 'opacity-100 visible scale-100'
//               : 'opacity-0 invisible scale-95'}
//           `}
//           onClick={() => handleBannerClick(banner)}
//         >
//           <img
//             src={banner.image.blur}
//             alt={`${banner.redirectionUrl} blur`}
//             className="absolute inset-0 w-full h-full object-cover opacity-50"
//           />

//           <picture className="absolute inset-0 w-full h-full">
//             <source
//               media="(max-width: 640px)"
//               srcSet={banner.image.lg}
//               type="image/webp"
//             />
//             <source
//               media="(max-width: 1024px)"
//               srcSet={banner.image.lg}
//               type="image/webp"
//             />
//             <img
//               src={banner.image.lg}
//               alt={banner.redirectionUrl}
//               className="w-full h-full object-cover"
//               loading={index === 0 ? 'eager' : 'lazy'}
//             />
//           </picture>
//         </div>
//       ))}

//       {/* Pagination */}
//       {mainBanners.length > 1 && (
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-2 z-20 xs:flex hidden">
//           {mainBanners.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`
//                 w-3 h-3 rounded-full transition-all duration-300
//                 ${index === currentIndex
//                   ? 'bg-[var(--themeColor)] w-4'
//                   : 'bg-gray-400 hover:bg-white/70'}
//               `}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default Banner;



// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// // import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
// import axios from 'axios';
// import { setCurrentPage } from "../../features/pagination/pagination";
// import { fetchCategoryWiseData, setCategoryBtnValue } from "../../features/filter/filterSlice";
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// const apiUrl = import.meta.env.VITE_BACKEND_URL;


// const BannerSlider = ({
//   banners = [],
//   autoSlideInterval = 5000,
//   onBannerClick = () => { },
//   isLoading = false
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   // Auto slide functionality
//   const nextSlide = useCallback(() => {
//     if (banners.length === 0) return;
//     setCurrentIndex((prevIndex) =>
//       prevIndex === banners.length - 1 ? 0 : prevIndex + 1
//     );
//   }, [banners.length]);

//   // const prevSlide = useCallback(() => {
//   //   if (banners.length === 0) return;
//   //   setCurrentIndex((prevIndex) =>
//   //     prevIndex === 0 ? banners.length - 1 : prevIndex - 1
//   //   );
//   // }, [banners.length]);

//   // Auto slide effect
//   useEffect(() => {
//     if (!isPaused && banners.length > 1 && !isLoading) {
//       const interval = setInterval(nextSlide, autoSlideInterval);
//       return () => clearInterval(interval);
//     }
//   }, [nextSlide, autoSlideInterval, isPaused, banners.length, isLoading]);

//   // Go to specific slide
//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   // Handle banner click
//   const handleBannerClick = (banner, index) => {
//     onBannerClick(banner, index);
//   };

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <div className="relative w-full bg-gray-200 animate-pulse overflow-hidden rounded-lg">
//         {/* Maintain aspect ratio: 1519:600 ≈ 2.53:1 */}
//         <div
//           className="w-full bg-gray-300"
//           style={{ aspectRatio: '1519/600' }}
//         >
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
//           </div>
//         </div>

//         {/* Loading navigation buttons */}
//         {/* <div className="absolute inset-y-0 left-4 flex items-center">
//           <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
//         </div>
//         <div className="absolute inset-y-0 right-4 flex items-center">
//           <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
//         </div> */}

//         {/* Loading dots */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="w-3 h-3 bg-gray-300 rounded-full"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Don't render if no banners
//   if (!banners || banners.length === 0) {
//     return (
//       <div
//         className="w-full bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg"
//         style={{ aspectRatio: '1519/600' }}
//       >
//         No banners available
//       </div>
//     );
//   }

//   return (
//     <div
//       className="relative w-full overflow-hidden rounded-lg group"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       style={{ aspectRatio: '1519/600' }}
//     >
//       {/* Main slider container */}
//       <div className="relative w-full h-full">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentIndex}
//             initial={{ opacity: 0, x: 300 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -300 }}
//             transition={{
//               duration: 0.5,
//               ease: [0.4, 0.0, 0.2, 1]
//             }}
//             className="absolute inset-0 cursor-pointer"
//             onClick={() => handleBannerClick(banners[currentIndex], currentIndex)}
//           >
//             <img
//               src={banners[currentIndex].image || banners[currentIndex].src || banners[currentIndex]}
//               alt={banners[currentIndex].alt || `Banner ${currentIndex + 1}`}
//               className="w-full h-full object-cover"
//               draggable={false}
//             />

//             {/* Optional overlay for better text readability */}
//             {banners[currentIndex].title && (
//               <div className="absolute inset-0 bg-black bg-opacity-20">
//                 <div className="absolute bottom-8 left-8 text-white">
//                   <h2 className="text-2xl md:text-4xl font-bold mb-2">
//                     {banners[currentIndex].title}
//                   </h2>
//                   {banners[currentIndex].subtitle && (
//                     <p className="text-lg md:text-xl opacity-90">
//                       {banners[currentIndex].subtitle}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Navigation buttons */}
//       {banners.length > 1 && (
//         <>
//           {/* Previous button */}
//           {/* <button
//             onClick={prevSlide}
//             className="absolute inset-y-0 left-2 md:left-4 flex items-center justify-center
//                      w-10 h-10 md:w-12 md:h-12 bg-white bg-opacity-80 hover:bg-opacity-100
//                      rounded-full shadow-lg transition-all duration-200
//                      opacity-0 group-hover:opacity-100 hover:scale-110"
//             aria-label="Previous banner"
//           >
//             <BiChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
//           </button> */}

//           {/* Next button */}
//           {/* <button
//             onClick={nextSlide}
//             className="absolute inset-y-0 right-2 md:right-4 flex items-center justify-center
//                      w-10 h-10 md:w-12 md:h-12 bg-white bg-opacity-80 hover:bg-opacity-100
//                      rounded-full shadow-lg transition-all duration-200
//                      opacity-0 group-hover:opacity-100 hover:scale-110"
//             aria-label="Next banner"
//           >
//             <BiChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
//           </button> */}
//         </>
//       )}

//       {/* Dots indicator */}
//       {banners.length > 1 && (
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//           {banners.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${index === currentIndex
//                 ? 'bg-white scale-110'
//                 : 'bg-white bg-opacity-50 hover:bg-opacity-75'
//                 }`}
//               aria-label={`Go to banner ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}

//       {/* Progress bar */}
//       {banners.length > 1 && !isPaused && (
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-20">
//           <motion.div
//             className="h-full bg-white"
//             initial={{ width: '0%' }}
//             animate={{ width: '100%' }}
//             transition={{
//               duration: autoSlideInterval / 1000,
//               ease: 'linear'
//             }}
//             key={currentIndex}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// // Example usage component
// const Banner = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [banners, setBanners] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchBanners = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`${apiUrl}/api/main/banners`);
//       if (response.data) {
//         setBanners(response.data.mainBanners);
//       }
//     } catch (error) {
//       console.error('Failed to fetch banners:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [apiUrl]);

//   useEffect(() => {
//     fetchBanners();
//   }, [fetchBanners]);


//   const handleBannerClick = (banner) => {
//     const redirectUrl = `/shop/${banner.redirectionUrl.toLowerCase()}`;
//     dispatch(setCurrentPage(1));
//     dispatch(setCategoryBtnValue(banner.redirectionUrl));
//     dispatch(fetchCategoryWiseData(banner.redirectionUrl.toLowerCase()));
//     navigate(redirectUrl);
//   };

//   return (
//     <div>
//       <BannerSlider
//         banners={banners}
//         isLoading={isLoading}
//         onBannerClick={handleBannerClick}
//         autoSlideInterval={4000}
//       />
//     </div>
//   );
// };

// export default Banner;


import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { setCurrentPage } from "../../features/pagination/pagination";
import { fetchCategoryWiseData, setCategoryBtnValue } from "../../features/filter/filterSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// Memoized loading skeleton component
const LoadingSkeleton = React.memo(() => (
  <div className="relative w-full bg-gray-200 animate-pulse overflow-hidden rounded-lg">
    <div className="w-full bg-gray-300" style={{ aspectRatio: '1519/600' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500" />
      </div>
    </div>
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="w-3 h-3 bg-gray-300 rounded-full" />
      ))}
    </div>
  </div>
));

// Memoized banner image component
const BannerImage = React.memo(({ banner, index, onClick }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: 300 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -300 }}
    transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
    className="absolute inset-0 cursor-pointer"
    onClick={() => onClick(banner, index)}
  >
    <img
      src={banner.image || banner.src || banner}
      alt={banner.alt || `Banner ${index + 1}`}
      className="w-full h-full object-cover"
      draggable={false}
      loading="lazy"
    />
    {banner.title && (
      <div className="absolute inset-0 bg-black bg-opacity-20">
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">
            {banner.title}
          </h2>
          {banner.subtitle && (
            <p className="text-lg md:text-xl opacity-90">
              {banner.subtitle}
            </p>
          )}
        </div>
      </div>
    )}
  </motion.div>
));

// Memoized dots indicator component
const DotsIndicator = React.memo(({ banners, currentIndex, onDotClick }) => (
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {banners.map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
          index === currentIndex
            ? 'bg-white scale-110'
            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
        }`}
        aria-label={`Go to banner ${index + 1}`}
      />
    ))}
  </div>
));

// Memoized progress bar component
const ProgressBar = React.memo(({ currentIndex, autoSlideInterval, isPaused }) => {
  if (isPaused) return null;
  
  return (
    <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-20">
      <motion.div
        className="h-full bg-white"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{
          duration: autoSlideInterval / 1000,
          ease: 'linear'
        }}
        key={currentIndex}
      />
    </div>
  );
});

const BannerSlider = ({
  banners = [],
  autoSlideInterval = 5000,
  onBannerClick = () => {},
  isLoading = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Memoize next slide function
  const nextSlide = useCallback(() => {
    if (banners.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  }, [banners.length]);

  // Auto slide effect - only when needed
  useEffect(() => {
    if (isPaused || banners.length <= 1 || isLoading) return;
    
    const interval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoSlideInterval, isPaused, banners.length, isLoading]);

  // Memoized handlers
  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const handleBannerClick = useCallback((banner, index) => {
    onBannerClick(banner, index);
  }, [onBannerClick]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  // Early returns for edge cases
  if (isLoading) return <LoadingSkeleton />;
  
  if (!banners?.length) {
    return (
      <div
        className="w-full bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg"
        style={{ aspectRatio: '1519/600' }}
      >
        No banners available
      </div>
    );
  }

  const showMultipleControls = banners.length > 1;
  const currentBanner = banners[currentIndex];

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ aspectRatio: '1519/600' }}
    >
      {/* Main slider container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <BannerImage
            banner={currentBanner}
            index={currentIndex}
            onClick={handleBannerClick}
          />
        </AnimatePresence>
      </div>

      {/* Controls - only render when needed */}
      {showMultipleControls && (
        <>
          <DotsIndicator
            banners={banners}
            currentIndex={currentIndex}
            onDotClick={goToSlide}
          />
          <ProgressBar
            currentIndex={currentIndex}
            autoSlideInterval={autoSlideInterval}
            isPaused={isPaused}
          />
        </>
      )}
    </div>
  );
};

const Banner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Memoized fetch function
  const fetchBanners = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiUrl}/api/main/banners`);
      setBanners(response.data?.mainBanners || []);
    } catch (error) {
      console.error('Failed to fetch banners:', error);
      setBanners([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  }, []); // Remove apiUrl dependency as it's from env

  // Fetch banners on mount
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // Memoized banner click handler
  const handleBannerClick = useCallback((banner) => {
    if (!banner?.redirectionUrl) return;
    
    const redirectUrl = `/shop/${banner.redirectionUrl.toLowerCase()}`;
    const categoryValue = banner.redirectionUrl;
    
    // Batch dispatch calls
    dispatch(setCurrentPage(1));
    dispatch(setCategoryBtnValue(categoryValue));
    dispatch(fetchCategoryWiseData(categoryValue.toLowerCase()));
    navigate(redirectUrl);
  }, [dispatch, navigate]);

  // Memoized props
  const bannerProps = useMemo(() => ({
    banners,
    isLoading,
    onBannerClick: handleBannerClick,
    autoSlideInterval: 4000
  }), [banners, isLoading, handleBannerClick]);

  return <BannerSlider {...bannerProps} />;
};

export default Banner;