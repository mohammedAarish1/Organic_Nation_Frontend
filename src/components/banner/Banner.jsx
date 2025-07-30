// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
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
//       throw error
//     } finally {
//       setIsLoading(false);
//     }
//   }, [apiUrl]);

//   useEffect(() => {
//     fetchBanners();
//   }, [fetchBanners]);
//   // Autoplay logic
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

//   const handleBannerClick = (banner) => {
//     const redirectUrl = `/shop/${banner.redirectionUrl.toLowerCase()}`;

//     // Dispatch actions for category selection
//     dispatch(setCurrentPage(1));
//     dispatch(setCategoryBtnValue(banner.redirectionUrl));
//     dispatch(fetchCategoryWiseData(banner.redirectionUrl.toLowerCase()));
//     navigate(redirectUrl)
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
//     <section className="relative w-full aspect-[16/7] max-h-[800px]">
//       {mainBanners.map((banner, index) => (
//         <div
//           key={banner._id}
//           className={`
//             absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out
//             ${index === currentIndex
//               ? 'opacity-100 visible scale-100'
//               : 'opacity-0 invisible scale-95'}
//           `}
//           onClick={() => handleBannerClick(banner)}
//         >
//           {/* Blur Placeholder */}
//           <img
//             src={banner.image.blur}
//             alt={`${banner.redirectionUrl} blur`}
//             className="absolute inset-0 w-full h-full object-cover opacity-50"
//           />

//           {/* Responsive Image */}
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
//               className="w-full h-full object-cover cursor-pointer"
//               loading={index === 0 ? 'eager' : 'lazy'}
//             />
//           </picture>
//         </div>
//       ))}

//       {/* Pagination */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2  space-x-2 z-20 xs:flex hidden">
//         {mainBanners.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`
//               w-3 h-3 rounded-full transition-all duration-300
//               ${index === currentIndex
//                 ? 'bg-[var(--themeColor)]  w-4'
//                 : 'bg-gray-400 hover:bg-white/70'}
//             `}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Banner;



import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCurrentPage } from "../../features/pagination/pagination";
import { fetchCategoryWiseData, setCategoryBtnValue } from "../../features/filter/filterSlice";

const Banner = () => {
  const navigate = useNavigate();
  const [mainBanners, setMainBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchBanners = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiUrl}/api/main/banners`);
      if (response.data) {
        const sortedBanners = response.data.mainBanners.sort((a, b) => a.order - b.order);
        setMainBanners(sortedBanners);
      }
    } catch (error) {
      console.error('Failed to fetch banners:', error);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // Autoplay
  useEffect(() => {
    if (mainBanners.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % mainBanners.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mainBanners.length]);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        // Swipe left - next
        setCurrentIndex(prev => (prev + 1) % mainBanners.length);
      } else {
        // Swipe right - previous  
        setCurrentIndex(prev => prev === 0 ? mainBanners.length - 1 : prev - 1);
      }
    }
  };

  const handleBannerClick = (banner) => {
    const redirectUrl = `/shop/${banner.redirectionUrl.toLowerCase()}`;
    dispatch(setCurrentPage(1));
    dispatch(setCategoryBtnValue(banner.redirectionUrl));
    dispatch(fetchCategoryWiseData(banner.redirectionUrl.toLowerCase()));
    navigate(redirectUrl);
  };

  if (isLoading) {
    return (
      <div className="w-full bg-gray-200 animate-pulse h-[40vw] max-h-[500px] min-h-[250px] flex items-center justify-center">
        <span className="text-gray-500">Loading Banners...</span>
      </div>
    );
  }

  if (mainBanners.length === 0) {
    return (
      <div className="w-full bg-gray-100 h-[40vw] max-h-[500px] min-h-[250px] flex items-center justify-center">
        <span className="text-gray-500">No banners available</span>
      </div>
    );
  }

  return (
    <section 
      className="relative w-full aspect-[16/7] max-h-[800px]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {mainBanners.map((banner, index) => (
        <div
          key={banner._id}
          className={`
            absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out cursor-pointer
            ${index === currentIndex
              ? 'opacity-100 visible scale-100'
              : 'opacity-0 invisible scale-95'}
          `}
          onClick={() => handleBannerClick(banner)}
        >
          <img
            src={banner.image.blur}
            alt={`${banner.redirectionUrl} blur`}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />

          <picture className="absolute inset-0 w-full h-full">
            <source
              media="(max-width: 640px)"
              srcSet={banner.image.lg}
              type="image/webp"
            />
            <source
              media="(max-width: 1024px)"
              srcSet={banner.image.lg}
              type="image/webp"
            />
            <img
              src={banner.image.lg}
              alt={banner.redirectionUrl}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </picture>
        </div>
      ))}

      {/* Pagination */}
      {mainBanners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-2 z-20 xs:flex hidden">
          {mainBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${index === currentIndex
                  ? 'bg-[var(--themeColor)] w-4'
                  : 'bg-gray-400 hover:bg-white/70'}
              `}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Banner;