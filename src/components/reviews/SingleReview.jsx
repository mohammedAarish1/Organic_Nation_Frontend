// import React, { memo, useMemo } from 'react';
// import { motion } from 'framer-motion';
// import { Check, Star } from 'lucide-react';
// import { LeftQuote, RightQuote } from '../../icons/SvgIcons';

// // Optimized StarRating Component with half-star support
// const StarRating = memo(({ rating }) => {
//   const stars = useMemo(() => {  
//     return [...Array(5)].map((_, i) => {
//       const filled = Math.min(Math.max(rating - i, 0), 1);

//       return (
//         <motion.div
//           key={i}
//           initial={{ scale: 0, rotate: 180 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{ delay: 0.1 * i, type: "spring" }}
//           className="relative"
//         >

//           <Star className=" text-[#DCD2C0]" />
//           <Star
//             className="text-[#9B7A2F] absolute top-0 left-0 overflow-hidden transition-all duration-300"
//             style={{
//               clipPath: `inset(0 ${100 - filled * 100}% 0 0)`,
//               filter: filled > 0 ? "drop-shadow(0 1px 2px rgba(155, 122, 47, 0.3))" : "none"
//             }}
//           />
//         </motion.div>
//       );
//     });
//   }, [rating]);

//   return <div className="flex gap-1 items-center">{stars}</div>;
// });


// // User Avatar Component matching your design system
// const UserAvatar = memo(({ userName, isVerified = Math.random() > 0.7 }) => {
//   const initials = userName?.charAt(0)?.toUpperCase() || '?';

//   // Generate consistent avatar colors matching your palette
//   const getAvatarColor = (name) => {
//     const colors = [
//       '#7A2E1D', // Primary brown
//       '#9B7A2F', // Gold
//       '#D87C45', // Orange
//       '#6B8E23', // Green
//       '#3E2C1B'  // Dark brown
//     ];

//     let hash = 0;
//     for (let i = 0; i < name.length; i++) {
//       hash = name.charCodeAt(i) + ((hash << 5) - hash);
//     }

//     return colors[Math.abs(hash) % colors.length];
//   };

//   const avatarColor = getAvatarColor(userName);

//   return (
//     <motion.div
//       className="flex items-center gap-3"
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ delay: 0.3 }}
//     >
//       <div
//         className="relative flex items-center justify-center h-12 w-12 rounded-full text-white font-bold shadow-lg"
//         style={{ backgroundColor: avatarColor }}
//       >
//         {initials}
//         {isVerified && (
//           <motion.div
//             className="absolute -bottom-1 -right-1 rounded-full p-1 shadow-md"
//             style={{ backgroundColor: '#FFFFFF' }}
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.5, type: "spring" }}
//           >
//             <Check size={16} style={{ color: '#6B8E23' }} />
//           </motion.div>
//         )}
//       </div>
//       <div>
//         <p className="font-semibold" style={{ color: '#3E2C1B' }}>
//           {userName}
//         </p>
//         {isVerified && (
//           <p className="text-xs font-medium" style={{ color: '#6B8E23' }}>
//             Verified Buyer
//           </p>
//         )}
//       </div>
//     </motion.div>
//   );
// });

// // UserAvatar.displayName = 'UserAvatar';

// const SingleReview = memo(({ reviews }) => {
//   // Determine review quality styling based on rating
//   const getReviewStyling = (rating) => {
//     if (rating >= 4.5) return {
//       borderColor: '#9B7A2F',
//       backgroundColor: '#FFFFFF',
//       accentColor: '#9B7A2F'
//     };
//     if (rating >= 3.5) return {
//       borderColor: '#D87C45',
//       backgroundColor: '#FFFFFF',
//       accentColor: '#D87C45'
//     };
//     return {
//       borderColor: '#DCD2C0',
//       backgroundColor: '#FFFFFF',
//       accentColor: '#7A2E1D'
//     };
//   };

//   const styling = getReviewStyling(reviews.rating);

//   // Animation variants for smooth entrance
//   const cardVariants = {
//     hidden: {
//       opacity: 0,
//       y: 30,
//       scale: 0.95
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.5,
//         type: "spring",
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   };

//   return (
//     <motion.div
//       variants={cardVariants}
//       initial="hidden"
//       animate="visible"
//       whileHover={{
//         y: -4,
//         scale: 1.02,
//         boxShadow: "0 10px 30px rgba(122, 46, 29, 0.15)"
//       }}
//       className="w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 border-2"
//       style={{
//         backgroundColor: styling.backgroundColor,
//         borderColor: styling.borderColor
//       }}
//     >
//       {/* Rating Header */}
//       <motion.div
//         className="px-6 py-4 flex justify-between items-center"
//         style={{ backgroundColor: '#F5EFE6' }}
//         variants={itemVariants}
//       >
//         <StarRating rating={reviews.rating} />
//         <motion.div
//           className="rounded-full px-4 py-2 text-sm font-bold text-white shadow-md"
//           style={{ backgroundColor: styling.accentColor }}
//           whileHover={{ scale: 1.05 }}
//         >
//           {reviews.rating.toFixed(1)} / 5.0
//         </motion.div>
//       </motion.div>

//       {/* Review Content */}
//       <div className="p-6">
//         <motion.div
//           className="relative mb-6"
//           variants={itemVariants}
//         >

//           <LeftQuote
//             color={styling.accentColor}
//             className={"absolute -top-4 -left-3 text-2xl opacity-30"}
//           />
//           {/* <FaQuoteLeft 
//             className="absolute -top-2 -left-1 text-2xl opacity-30"
//             style={{ color: styling.accentColor }}
//           /> */}
//           <p
//             className="leading-relaxed pl-8 pr-8 text-base"
//             style={{ color: '#3E2C1B' }}
//           >
//             {reviews.review}
//           </p>
//           <RightQuote
//             color={styling.accentColor}
//             className={"absolute -bottom-4 right-1 text-2xl opacity-30"}
//           />
//         </motion.div>

//         {/* Bottom Section */}
//         <motion.div
//           className="flex justify-between items-center pt-4 border-t-2"
//           style={{ borderColor: '#DCD2C0' }}
//           variants={itemVariants}
//         >
//           <UserAvatar userName={reviews.userName} />

//           {/* Optional: Add review date if available */}
//           {reviews.createdAt && (
//             <motion.span
//               className="text-sm px-3 py-1 rounded-full font-medium"
//               style={{
//                 backgroundColor: '#F5EFE6',
//                 color: '#7A2E1D'
//               }}
//               whileHover={{ scale: 1.05 }}
//             >
//               {new Date(reviews.createdAt).toLocaleDateString('en-US', {
//                 month: 'short',
//                 day: 'numeric',
//                 year: 'numeric'
//               })}
//             </motion.span>
//           )}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// });


// export default SingleReview;