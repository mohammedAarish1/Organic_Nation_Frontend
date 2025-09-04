// // import React  from 'react'

// // const SingleReview = ({ reviews }) => {

// //     return (
// //         <div className='w-full shadow-lg px-5 py-4 rounded-lg  flex flex-col gap-3' >
// //             <div className='flex justify-between'>
// //                 <div className='flex justify-start items-center xs:gap-2'>
// //                     {[...Array(5)].map((_, index) => {
// //                         const ratingValue = index + 1;
// //                         return (
// //                             <label key={index}>
// //                                 <input
// //                                     type="radio"
// //                                     name="rating"
// //                                     // value={ratingValue}
// //                                     // onClick={() => setFieldValue('rating', ratingValue)}
// //                                     className='hidden'
// //                                 />
// //                                 <FaStar
// //                                     color={ratingValue <= reviews.rating ? "#FB923C" : "#e4e5e9"}
// //                                     className='cursor-pointer text-[15px]'
// //                                 />
// //                             </label>
// //                         );
// //                     })}
// //                 </div>
// //                 {/* <div><span className='text-[14px] font-mono text-gray-500'>{new Date(reviews?.createdAt).toDateString()}</span></div> */}
// //             </div>

// //             <div className='text-sm text-gray-600 font-sans tracking-widest'>
// //                 <p>{reviews.review}</p>
// //             </div>

// //             <div className='flex justify-start items-center gap-2'>
// //                 <p className='  bg-[var(--bgColorPrimary)] p-[8px] py-[1px] rounded-full text-white'>{reviews?.userName[0]}</p>
// //                 <p className='tracking-wider font-sans xs:text-sm text-xs '>{reviews?.userName}</p>
// //             </div>

// //         </div>
// //     )
// // }

// // export default SingleReview;



// import React, { memo, useMemo } from 'react';


// // Star Rating Component
// const StarRating = memo(({ rating }) => {
//   // Pre-calculate stars to avoid unnecessary re-renders
//   const stars = useMemo(() => {
//     return [...Array(5)].map((_, index) => {
//       const ratingValue = index + 1;
//       return (
//         <FaStar
//           key={index}
//           className={`text-xl transition-transform duration-300 ${index === 0 ? 'hover:scale-110' : ''}`}
//           style={{
//             color: ratingValue <= rating ? "#f59e0b" : "#d1d5db",
//             filter: ratingValue <= rating ? "drop-shadow(0 0 2px rgba(245, 158, 11, 0.5))" : "none",
//             transform: `scale(${1 - (index * 0.04)})` // Slightly scale down each star
//           }}
//         />
//       );
//     });
//   }, [rating]);

//   return <div className="flex gap-1">{stars}</div>;
// });

// StarRating.displayName = 'StarRating';

// // User Avatar Component with more flair
// const UserAvatar = memo(({ userName, isVerified = Math.random() > 0.5 }) => {
//   const initials = userName?.charAt(0)?.toUpperCase() || '?';
  
//   // Generate a unique but consistent color based on userName
//   const getAvatarColor = (name) => {
//     const colors = [
//       'from-purple-500 to-indigo-600',
//       'from-blue-500 to-cyan-500',
//       'from-emerald-500 to-teal-600',
//       'from-orange-500 to-amber-500',
//       'from-pink-500 to-rose-500'
//     ];
    
//     let hash = 0;
//     for (let i = 0; i < name.length; i++) {
//       hash = name.charCodeAt(i) + ((hash << 5) - hash);
//     }
    
//     return colors[Math.abs(hash) % colors.length];
//   };
  
//   const colorClass = getAvatarColor(userName);
  
//   return (
//     <div className="flex items-center gap-3">
//       <div className={`relative flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br ${colorClass} text-white font-bold shadow-md`}>
//         {initials}
//         {isVerified && (
//           <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
//             <FaCheck className="text-green-500 text-xs" />
//           </div>
//         )}
//       </div>
//       <div>
//         <p className="font-semibold text-gray-800">{userName}</p>
//         {isVerified && <p className="text-xs text-green-600 font-medium">Verified Buyer</p>}
//       </div>
//     </div>
//   );
// });

// UserAvatar.displayName = 'UserAvatar';

// const SingleReview = ({ reviews }) => {
//   // Format date without external libraries
// //   const formattedDate = useFormattedDate(reviews?.createdAt);
  
//   // Calculate a highlight color based on rating
//   const getHighlightColor = (rating) => {
//     if (rating >= 4.5) return 'bg-gray-50 border-gray-200';
//     if (rating >= 3.5) return 'bg-blue-50 border-blue-200';
//     return 'bg-gray-50 border-gray-200';
//   };
  
//   const highlightClass = getHighlightColor(reviews.rating);
  
//   return (
//     <div className={`w-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${highlightClass} border-2`}>
//       {/* Top Rating Bar */}
//       <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-4 py-3 flex justify-between items-center">
//         <StarRating rating={reviews.rating} />
//         <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-xs text-white font-medium backdrop-blur-sm">
//           {reviews.rating.toFixed(1)} / 5.0
//         </div>
//       </div>
      
//       {/* Review Content */}
//       <div className="p-5">
//         <div className="relative mb-6 mt-2">
//           <FaQuoteLeft className="absolute -top-2 -left-1 text-gray-300 text-lg opacity-50" />
//           <p className="text-gray-700 leading-relaxed pl-6 pr-6 text-sm md:text-base">
//             {reviews.review}
//           </p>
//           <FaQuoteRight className="absolute -bottom-2 right-0 text-gray-300 text-lg opacity-50" />
//         </div>
        
//         {/* Bottom Section */}
//         <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
//           <UserAvatar userName={reviews.userName} />
//           {/* {formattedDate && (
//             <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//               {formattedDate}
//             </span>
//           )} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Wrap in memo for performance optimization
// export default memo(SingleReview);



import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion'; 
import { FaStar, FaQuoteLeft, FaQuoteRight, FaCheck } from 'react-icons/fa';

// Optimized Star Rating Component with consistent styling
// const StarRating = memo(({ rating }) => {
//   const stars = useMemo(() => {
//     return [...Array(5)].map((_, index) => {
//       const ratingValue = index + 1;
//       return (
//         <motion.div
//           key={index}
//           initial={{ scale: 0, rotate: 180 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{ delay: 0.1 * index, type: "spring" }}
//         >
//           <FaStar
//             className="text-lg transition-all duration-300"
//             style={{
//               color: ratingValue <= rating ? '#9B7A2F' : '#DCD2C0',
//               filter: ratingValue <= rating ? "drop-shadow(0 1px 2px rgba(155, 122, 47, 0.3))" : "none"
//             }}
//           />
//         </motion.div>
//       );
//     });
//   }, [rating]);

//   return <div className="flex gap-1 items-center">{stars}</div>;
// });


// Optimized StarRating Component with half-star support
const StarRating = memo(({ rating }) => {
  const stars = useMemo(() => {
    return [...Array(5)].map((_, i) => {
      const filled = Math.min(Math.max(rating - i, 0), 1);
      
      return (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1 * i, type: "spring" }}
          className="relative"
        >
          <FaStar className="text-lg text-[#DCD2C0]" />
          <FaStar
            className="text-lg text-[#9B7A2F] absolute top-0 left-0 overflow-hidden transition-all duration-300"
            style={{
              clipPath: `inset(0 ${100 - filled * 100}% 0 0)`,
              filter: filled > 0 ? "drop-shadow(0 1px 2px rgba(155, 122, 47, 0.3))" : "none"
            }}
          />
        </motion.div>
      );
    });
  }, [rating]);

  return <div className="flex gap-1 items-center">{stars}</div>;
});


// User Avatar Component matching your design system
const UserAvatar = memo(({ userName, isVerified = Math.random() > 0.7 }) => {
  const initials = userName?.charAt(0)?.toUpperCase() || '?';
  
  // Generate consistent avatar colors matching your palette
  const getAvatarColor = (name) => {
    const colors = [
      '#7A2E1D', // Primary brown
      '#9B7A2F', // Gold
      '#D87C45', // Orange
      '#6B8E23', // Green
      '#3E2C1B'  // Dark brown
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  const avatarColor = getAvatarColor(userName);
  
  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div 
        className="relative flex items-center justify-center h-12 w-12 rounded-full text-white font-bold shadow-lg"
        style={{ backgroundColor: avatarColor }}
      >
        {initials}
        {isVerified && (
          <motion.div 
            className="absolute -bottom-1 -right-1 rounded-full p-1 shadow-md"
            style={{ backgroundColor: '#FFFFFF' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <FaCheck className="text-xs" style={{ color: '#6B8E23' }} />
          </motion.div>
        )}
      </div>
      <div>
        <p className="font-semibold" style={{ color: '#3E2C1B' }}>
          {userName}
        </p>
        {isVerified && (
          <p className="text-xs font-medium" style={{ color: '#6B8E23' }}>
            Verified Buyer
          </p>
        )}
      </div>
    </motion.div>
  );
});

// UserAvatar.displayName = 'UserAvatar';

// Main SingleReview Component
const SingleReview = memo(({ reviews }) => {
  // Determine review quality styling based on rating
  const getReviewStyling = (rating) => {
    if (rating >= 4.5) return {
      borderColor: '#9B7A2F',
      backgroundColor: '#FFFFFF',
      accentColor: '#9B7A2F'
    };
    if (rating >= 3.5) return {
      borderColor: '#D87C45',
      backgroundColor: '#FFFFFF',
      accentColor: '#D87C45'
    };
    return {
      borderColor: '#DCD2C0',
      backgroundColor: '#FFFFFF',
      accentColor: '#7A2E1D'
    };
  };
  
  const styling = getReviewStyling(reviews.rating);
  
  // Animation variants for smooth entrance
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        y: -4, 
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(122, 46, 29, 0.15)"
      }}
      className="w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 border-2"
      style={{ 
        backgroundColor: styling.backgroundColor,
        borderColor: styling.borderColor
      }}
    >
      {/* Rating Header */}
      <motion.div 
        className="px-6 py-4 flex justify-between items-center"
        style={{ backgroundColor: '#F5EFE6' }}
        variants={itemVariants}
      >
        <StarRating rating={reviews.rating} />
        <motion.div 
          className="rounded-full px-4 py-2 text-sm font-bold text-white shadow-md"
          style={{ backgroundColor: styling.accentColor }}
          whileHover={{ scale: 1.05 }}
        >
          {reviews.rating.toFixed(1)} / 5.0
        </motion.div>
      </motion.div>
      
      {/* Review Content */}
      <div className="p-6">
        <motion.div 
          className="relative mb-6"
          variants={itemVariants}
        >
          <FaQuoteLeft 
            className="absolute -top-2 -left-1 text-2xl opacity-30"
            style={{ color: styling.accentColor }}
          />
          <p 
            className="leading-relaxed pl-8 pr-8 text-base"
            style={{ color: '#3E2C1B' }}
          >
            {reviews.review}
          </p>
          <FaQuoteRight 
            className="absolute -bottom-2 right-2 text-2xl opacity-30"
            style={{ color: styling.accentColor }}
          />
        </motion.div>
        
        {/* Bottom Section */}
        <motion.div 
          className="flex justify-between items-center pt-4 border-t-2"
          style={{ borderColor: '#DCD2C0' }}
          variants={itemVariants}
        >
          <UserAvatar userName={reviews.userName} />
          
          {/* Optional: Add review date if available */}
          {reviews.createdAt && (
            <motion.span 
              className="text-sm px-3 py-1 rounded-full font-medium"
              style={{ 
                backgroundColor: '#F5EFE6',
                color: '#7A2E1D'
              }}
              whileHover={{ scale: 1.05 }}
            >
              {new Date(reviews.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </motion.span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
});


export default SingleReview;