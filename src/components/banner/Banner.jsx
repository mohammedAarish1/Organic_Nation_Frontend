// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCurrentPage } from "../../features/pagination/pagination";
// import { fetchCategoryWiseData, setCategoryBtnValue } from "../../features/filter/filterSlice";
// // swiper 
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

// // import required modules
// import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
// import axios from "axios";
// import BannerImage from "../image/BannerImage";




// // const images = [

// //   {
// //     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/8.png',
// //     categoryUrl: `all`,
// //   },

// //   {
// //     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/additionalDiscount.png',
// //     categoryUrl: `all`,
// //   },
// //   {
// //     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/pickle_offer.png',
// //     categoryUrl: `authentic-pickles`,
// //   },
// //   {
// //     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/1.png',
// //     categoryUrl: `authentic-pickles`,
// //   },
// //   {
// //     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/2.png',
// //     categoryUrl: `organic-honey`,
// //   },
// //   {
// //     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/4.png',
// //     categoryUrl: `about-us`,
// //   },
// //   {
// //     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/5.png',
// //     categoryUrl: `organic-oils`,
// //   },
// //   {
// //     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/6.png',
// //     categoryUrl: `breakfast-cereals`,
// //   },
// //   {
// //     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/7.png',
// //     categoryUrl: `seasonings-&-herbs`,
// //   },

// // ];

// const apiUrl = import.meta.env.VITE_BACKEND_URL;


// const Banner = () => {

//   const dispatch = useDispatch();
//   const [mainBanners, setMainBanners] = useState([]);

//   // const getMainBanners = async () => {
//   //   try {
//   //     const response = await axios.get(`${apiUrl}/api/main/banners`)
//   //     if (response.data) {
//   //       setMainBanners(response.data.mainBanners)
//   //     }
//   //   } catch (error) {
//   //     throw error
//   //   }
//   // }
//   // useEffect(() => {
//   //   getMainBanners();
//   // }, [])

//   useEffect(() => {
//     const getMainBanners = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/main/banners`);
//         if (response.data?.mainBanners) {
//           setMainBanners(response.data.mainBanners);
//         }
//       } catch (error) {
//         throw error;
//       }
//     };

//     getMainBanners();
//   }, []);

//   return (
//     <section className="w-full">
//       <Swiper
//         effect={'fade'}
//         speed={1000}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[EffectFade, Autoplay, Pagination]}
//         className="mySwiper bannerCustomCss">

//         {mainBanners.map((banner,index) => (
//           <SwiperSlide key={banner._id} >
//             <Link
//               to={banner.redirectionUrl === 'about-us' ? `/about-us` : `/shop/${banner.redirectionUrl.toLowerCase()}`}
//               // onClick={() => {
//               //   dispatch(setCurrentPage(1))
//               //   dispatch(setCategoryBtnValue(banner.redirectionUrl))
//               //   dispatch(fetchCategoryWiseData(banner.redirectionUrl.toLowerCase()))

//               // }}
//               onClick={() => {
//                 // Batch dispatch calls
//                 dispatch((dispatch) => {
//                   dispatch(setCurrentPage(1));
//                   dispatch(setCategoryBtnValue(banner.redirectionUrl));
//                   dispatch(fetchCategoryWiseData(banner.redirectionUrl.toLowerCase()));
//                 });
//               }}
//             >
//               {/* <img
//                 src={banner.image}
//                 alt={banner.redirectionUrl}
//                 className="bg-[var(--bgColorSecondary)]"
//                 onClick={() => {
//                   dispatch(setCurrentPage(1))
//                   dispatch(setCategoryBtnValue(banner.redirectionUrl))
//                   dispatch(fetchCategoryWiseData(banner.redirectionUrl.toLowerCase()))

//                 }}
//               /> */}
//               <div
//                 // className="w-full"

//               >
//                 <BannerImage
//                   src={{
//                     sm: banner.image.sm,
//                     md: banner.image.md,
//                     lg: banner.image.lg
//                   }}
//                   blurSrc={banner.image.blur}
//                   alt={banner.redirectionUrl}
//                   // className="bg-[var(--bgColorSecondary)]"
//                   className="w-full"
//                   isFirst={index === 0} // Only first image is eagerly loaded
//                 />
//               </div>

//             </Link>
//           </SwiperSlide>
//         ))}

//       </Swiper>
//     </section>
//   );
// };

// export default Banner;






import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      throw error
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  // Autoplay logic
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

  const handleBannerClick = (banner) => {
    const redirectUrl = banner.redirectionUrl === 'about-us'
      ? '/about-us'
      : `/shop/${banner.redirectionUrl.toLowerCase()}`;

    // Dispatch actions for category selection
    dispatch(setCurrentPage(1));
    dispatch(setCategoryBtnValue(banner.redirectionUrl));
    dispatch(fetchCategoryWiseData(banner.redirectionUrl.toLowerCase()));
    navigate(redirectUrl)
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
    <section className="relative w-full aspect-[16/7] max-h-[800px]">
      {mainBanners.map((banner, index) => (
        <div
          key={banner._id}
          className={`
            absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out
            ${index === currentIndex
              ? 'opacity-100 visible scale-100'
              : 'opacity-0 invisible scale-95'}
          `}
          onClick={() => handleBannerClick(banner)}
        >
          {/* Blur Placeholder */}
          <img
            src={banner.image.blur}
            alt={`${banner.redirectionUrl} blur`}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />

          {/* Responsive Image */}
          <picture className="absolute inset-0 w-full h-full">
            <source
              media="(max-width: 640px)"
              srcSet={banner.image.sm}
              type="image/webp"
            />
            <source
              media="(max-width: 1024px)"
              srcSet={banner.image.md}
              type="image/webp"
            />
            <img
              src={banner.image.lg}
              alt={banner.redirectionUrl}
              className="w-full h-full object-cover cursor-pointer"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </picture>
        </div>
      ))}

      {/* Pagination */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2  space-x-2 z-20 xs:flex hidden">
        {mainBanners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${index === currentIndex
                ? 'bg-[var(--themeColor)]  w-4'
                : 'bg-gray-400 hover:bg-white/70'}
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;