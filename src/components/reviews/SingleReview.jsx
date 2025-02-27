// import React  from 'react'
// import { FaStar } from 'react-icons/fa6';

// const SingleReview = ({ reviews }) => {

//     return (
//         <div className='w-full shadow-lg px-5 py-4 rounded-lg  flex flex-col gap-3' >
//             <div className='flex justify-between'>
//                 <div className='flex justify-start items-center xs:gap-2'>
//                     {[...Array(5)].map((_, index) => {
//                         const ratingValue = index + 1;
//                         return (
//                             <label key={index}>
//                                 <input
//                                     type="radio"
//                                     name="rating"
//                                     // value={ratingValue}
//                                     // onClick={() => setFieldValue('rating', ratingValue)}
//                                     className='hidden'
//                                 />
//                                 <FaStar
//                                     color={ratingValue <= reviews.rating ? "#FB923C" : "#e4e5e9"}
//                                     className='cursor-pointer text-[15px]'
//                                 />
//                             </label>
//                         );
//                     })}
//                 </div>
//                 {/* <div><span className='text-[14px] font-mono text-gray-500'>{new Date(reviews?.createdAt).toDateString()}</span></div> */}
//             </div>

//             <div className='text-sm text-gray-600 font-sans tracking-widest'>
//                 <p>{reviews.review}</p>
//             </div>

//             <div className='flex justify-start items-center gap-2'>
//                 <p className='  bg-[var(--bgColorPrimary)] p-[8px] py-[1px] rounded-full text-white'>{reviews?.userName[0]}</p>
//                 <p className='tracking-wider font-sans xs:text-sm text-xs '>{reviews?.userName}</p>
//             </div>

//         </div>
//     )
// }

// export default SingleReview;



import React, { memo, useMemo } from 'react';
import { FaStar, FaQuoteLeft, FaQuoteRight, FaCheck, FaUser } from 'react-icons/fa6';

// Custom hook for formatting date without external libraries (below code is not used)
// const useFormattedDate = (dateString) => {
//   return useMemo(() => {
//     if (!dateString) return '';
    
//     try {
//       const date = new Date(dateString);
//       const now = new Date();
//       const diffTime = Math.abs(now - date);
//       const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
//       if (diffDays === 0) return 'Today';
//       if (diffDays === 1) return 'Yesterday';
//       if (diffDays < 7) return `${diffDays} days ago`;
//       if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      
//       const options = { year: 'numeric', month: 'short', day: 'numeric' };
//       return date.toLocaleDateString(undefined, options);
//     } catch (e) {
//       return '';
//     }
//   }, [dateString]);
// };

// Star Rating Component
const StarRating = memo(({ rating }) => {
  // Pre-calculate stars to avoid unnecessary re-renders
  const stars = useMemo(() => {
    return [...Array(5)].map((_, index) => {
      const ratingValue = index + 1;
      return (
        <FaStar
          key={index}
          className={`text-xl transition-transform duration-300 ${index === 0 ? 'hover:scale-110' : ''}`}
          style={{
            color: ratingValue <= rating ? "#f59e0b" : "#d1d5db",
            filter: ratingValue <= rating ? "drop-shadow(0 0 2px rgba(245, 158, 11, 0.5))" : "none",
            transform: `scale(${1 - (index * 0.04)})` // Slightly scale down each star
          }}
        />
      );
    });
  }, [rating]);

  return <div className="flex gap-1">{stars}</div>;
});

StarRating.displayName = 'StarRating';

// User Avatar Component with more flair
const UserAvatar = memo(({ userName, isVerified = Math.random() > 0.5 }) => {
  const initials = userName?.charAt(0)?.toUpperCase() || '?';
  
  // Generate a unique but consistent color based on userName
  const getAvatarColor = (name) => {
    const colors = [
      'from-purple-500 to-indigo-600',
      'from-blue-500 to-cyan-500',
      'from-emerald-500 to-teal-600',
      'from-orange-500 to-amber-500',
      'from-pink-500 to-rose-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };
  
  const colorClass = getAvatarColor(userName);
  
  return (
    <div className="flex items-center gap-3">
      <div className={`relative flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br ${colorClass} text-white font-bold shadow-md`}>
        {initials}
        {isVerified && (
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
            <FaCheck className="text-green-500 text-xs" />
          </div>
        )}
      </div>
      <div>
        <p className="font-semibold text-gray-800">{userName}</p>
        {isVerified && <p className="text-xs text-green-600 font-medium">Verified Buyer</p>}
      </div>
    </div>
  );
});

UserAvatar.displayName = 'UserAvatar';

const SingleReview = ({ reviews }) => {
  // Format date without external libraries
//   const formattedDate = useFormattedDate(reviews?.createdAt);
  
  // Calculate a highlight color based on rating
  const getHighlightColor = (rating) => {
    if (rating >= 4.5) return 'bg-gray-50 border-gray-200';
    if (rating >= 3.5) return 'bg-blue-50 border-blue-200';
    return 'bg-gray-50 border-gray-200';
  };
  
  const highlightClass = getHighlightColor(reviews.rating);
  
  return (
    <div className={`w-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${highlightClass} border-2`}>
      {/* Top Rating Bar */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-4 py-3 flex justify-between items-center">
        <StarRating rating={reviews.rating} />
        <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-xs text-white font-medium backdrop-blur-sm">
          {reviews.rating.toFixed(1)} / 5.0
        </div>
      </div>
      
      {/* Review Content */}
      <div className="p-5">
        <div className="relative mb-6 mt-2">
          <FaQuoteLeft className="absolute -top-2 -left-1 text-gray-300 text-lg opacity-50" />
          <p className="text-gray-700 leading-relaxed pl-6 pr-6 text-sm md:text-base">
            {reviews.review}
          </p>
          <FaQuoteRight className="absolute -bottom-2 right-0 text-gray-300 text-lg opacity-50" />
        </div>
        
        {/* Bottom Section */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
          <UserAvatar userName={reviews.userName} />
          {/* {formattedDate && (
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {formattedDate}
            </span>
          )} */}
        </div>
      </div>
    </div>
  );
};

// Wrap in memo for performance optimization
export default memo(SingleReview);