// import React, { useEffect, useRef, useState } from 'react';

// const PopupBanner = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isAnimated, setIsAnimated] = useState(false);
//   const bannerRef = useRef(null);
//   const imageLoadedRef = useRef(false);

//   // Image URLs
//   const desktopImage = "https://organicnationmages.s3.ap-south-1.amazonaws.com/pickles_clearanceSale_desktop.webp";
//   const mobileImage = "https://organicnationmages.s3.ap-south-1.amazonaws.com/pickles_clearanceSale_mobile.webp";

//   const handleClosePopup = () => {
//     setIsAnimated(false);
//     // Wait for fade-out animation before hiding
//     setTimeout(() => {
//       setIsVisible(false);
//       sessionStorage.setItem('popupShown', 'true');
//     }, 300);
//   };

//   useEffect(() => {
//     // Only show popup if it hasn't been shown before
//     if (sessionStorage.getItem('popupShown') !== 'true') {
//       // Preload images before showing popup
//       const preloadImages = async () => {
//         try {
//           await Promise.all([
//             new Promise((resolve) => {
//               const img = new Image();
//               img.onload = resolve;
//               img.src = desktopImage;
//             }),
//             new Promise((resolve) => {
//               const img = new Image();
//               img.onload = resolve;
//               img.src = mobileImage;
//             })
//           ]);
          
//           imageLoadedRef.current = true;
//           setIsVisible(true);
//           // Add slight delay for entrance animation
//           setTimeout(() => setIsAnimated(true), 100);
//         } catch (error) {
//           throw error
//         }
//       };

//       preloadImages();
//     }

//     return () => {
//       imageLoadedRef.current = false;
//     };
//   }, []);

//   useEffect(() => {
//     if (!isVisible) return;

//     const handleClickOutside = (event) => {
//       if (bannerRef.current && !bannerRef.current.contains(event.target)) {
//         handleClosePopup();
//       }
//     };

//     const handleEscape = (event) => {
//       if (event.key === 'Escape') {
//         handleClosePopup();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('keydown', handleEscape);
    
//     // Cleanup
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('keydown', handleEscape);
//     };
//   }, [isVisible]);

//   if (!isVisible) return null;

//   return (
//     <div
//       role="dialog"
//       aria-modal="true"
//       aria-label="Special Offer"
//       className={`fixed inset-0 z-50 bg-black/80 flex justify-center items-center transition-opacity duration-300 ${
//         isAnimated ? 'opacity-100' : 'opacity-0'
//       }`}
//     >
//       <div
//         ref={bannerRef}
//         className={`relative rounded-lg shadow-lg max-w-[80%] mx-auto transition-transform duration-300 ${
//           isAnimated ? 'scale-100' : 'scale-75'
//         }`}
//       >
//         <button
//           type="button"
//           onClick={handleClosePopup}
//           className="absolute right-4 top-4 shadow-md rounded-full shadow-green-700 hover:scale-110 text-[var(--bgColorPrimary)] bg-[var(--bgColorSecondary)] transition-transform focus:outline-none focus:ring-2 focus:ring-green-700"
//           aria-label="Close popup"
//         >
//           <IoCloseSharp className="text-4xl" />
//         </button>

//         <picture>
//           {/* Mobile image */}
//           <source
//             srcSet={mobileImage}
//             media="(max-width: 767px)"
//             type="image/png"
//           />
//           {/* Desktop image */}
//           <source
//             srcSet={desktopImage}
//             media="(min-width: 768px)"
//             type="image/png"
//           />
//           {/* Fallback image */}
//           <img
//             src={desktopImage}
//             alt="Special offer banner"
//             className="w-full h-auto rounded-lg"
//             loading="eager"
//           />
//         </picture>
//       </div>
//     </div>
//   );
// };

// export default PopupBanner;