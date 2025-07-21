// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaGift, FaChevronDown, FaChevronUp, FaFire, FaTags, FaArrowUp } from 'react-icons/fa';
// import { formatPrice } from '../../helper/helperFunctions';

// const DiscountProgress = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const location = useLocation();

//   const { 
//     discountProgress, 
//     totalCartItems, 
//     totalCartAmount 
//   } = useSelector(state => state.cart);

//   // Determine page type and component behavior
//   const getPageConfig = () => {
//     const pathname = location.pathname;

//     // Don't show on these pages
//     if (pathname.includes('/checkout') || 
//         pathname.includes('/account') || 
//         pathname.includes('/about') || 
//         pathname.includes('/contact') || 
//         pathname.includes('/login') || 
//         pathname.includes('/register')) {
//       return { show: false };
//     }

//     // Cart page - show expanded by default
//     if (pathname.includes('/cart')) {
//       return {
//         show: true,
//         defaultExpanded: false,
//         position: 'fixed',
//         marginBottom: true
//       };
//     }

//     // Shopping pages - show fixed and compact
//     if (pathname.includes('/') || 
//     pathname.includes('/shop') || 
//         pathname.includes('/products') || 
//         pathname.includes('/product/') || 
//         pathname.includes('/search') || 
//         pathname.includes('/category')) {
//       return {
//         show: true,
//         defaultExpanded: false,
//         position: 'fixed',
//         marginBottom: false
//       };
//     }

//     // Default - don't show
//     return { show: false };
//   };

//   const pageConfig = getPageConfig();

//   // Set expanded state based on page
//   useEffect(() => {
//     if (pageConfig.defaultExpanded !== undefined) {
//       setIsExpanded(pageConfig.defaultExpanded);
//     }
//   }, [location.pathname]);

//   // Don't show if no items in cart or page config says no
//   if (totalCartItems === 0 || !pageConfig.show) return null;

//   const { discountAmount, discountType, eligibleItems, progressInfo, currentDiscount } = discountProgress;

//   if (!progressInfo) return null;

//   const { currentEligibleAmount, currentCartAmount, nextThreshold, nextDiscountType } = progressInfo;
//   // Calculate current progress
//   let progressPercentage = 0;
//   let currentAmount = 0;
//   let targetAmount = 0;
//   let nextDiscount = '';
//   let remainingAmount = 0;
//   let currentTier = '';
//   let potentialSavings = 0;

//   if (currentCartAmount >= 1999) {
//     progressPercentage = 100;
//     currentAmount = currentCartAmount;
//     targetAmount = 1999;
//     nextDiscount = '30% OFF';
//     remainingAmount = 0;
//     currentTier = '30% OFF';
//     potentialSavings = Math.round(currentCartAmount * 0.3);
//   } else if (currentEligibleAmount >= 499) {
//     progressPercentage = Math.min((currentCartAmount / 1999) * 100, 100);
//     currentAmount = currentCartAmount;
//     targetAmount = 1999;
//     nextDiscount = '30% OFF';
//     remainingAmount = 1999 - currentCartAmount;
//     currentTier = '20% OFF';
//     potentialSavings = Math.round(remainingAmount * 0.3);
//   } else if (currentEligibleAmount >= 199) {
//     progressPercentage = Math.min((currentEligibleAmount / 499) * 100, 100);
//     currentAmount = currentEligibleAmount;
//     targetAmount = 499;
//     nextDiscount = '20% OFF';
//     remainingAmount = 499 - currentEligibleAmount;
//     currentTier = '10% OFF';
//     potentialSavings = Math.round(remainingAmount * 0.2);
//   } else {
//     progressPercentage = Math.min((currentEligibleAmount / 199) * 100, 100);
//     currentAmount = currentEligibleAmount;
//     targetAmount = 199;
//     nextDiscount = '10% OFF';
//     remainingAmount = 199 - currentEligibleAmount;
//     currentTier = 'None';
//     potentialSavings = Math.round(remainingAmount * 0.1);
//   }

//   const isDiscountActive = currentDiscount !== '0%';

//   // Dynamic positioning based on page
//   const positionClasses = pageConfig.position === 'fixed' 
//     ? "fixed top-16 left-0 right-0 z-40 mx-2 sm:mx-4 md:mx-6 lg:mx-auto lg:max-w-4xl"
//     : "relative mx-auto max-w-4xl";

//   const containerClasses = pageConfig.marginBottom 
//     ? "mb-6" 
//     : "";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`${positionClasses} ${containerClasses}`}
//       style={{ 
//         '--theme-color': '#7A2E1D',
//         '--accent-color': '#9B7A2F',
//         '--background-color': '#F5EFE6',
//         '--text-color': '#3E2C1B',
//         '--text-light-color': '#FFFFFF',
//         '--secondary-color': '#6B8E23',
//         '--neutral-color': '#DCD2C0',
//         '--alert-color': '#D87C45'
//       }}
//     >
//       <div className="bg-white border-2 rounded-lg shadow-lg overflow-hidden" style={{ borderColor: 'var(--accent-color)' }}>
//         {/* Main Progress Bar */}
//         <div className="p-3 sm:p-4" style={{ background: 'linear-gradient(135deg, var(--theme-color), var(--accent-color))' }}>
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center gap-2">
//               <FaGift className="text-white text-lg" />
//               <div className="text-white font-bold text-sm sm:text-base">
//                 {isDiscountActive ? (
//                   <span className="flex items-center gap-1">
//                     <FaFire className="text-orange-300" />
//                    You saved ₹{discountAmount}
//                   </span>
//                 ) : (
//                   <span>Special Discount Available!</span>
//                 )}
//               </div>
//             </div>

//             <button
//               onClick={() => setIsExpanded(!isExpanded)}
//               className="flex items-center gap-2 text-white p-1 hover:bg-white/20 rounded transition-colors"
//             >
//             Eligible Items  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
//             </button>
//           </div>

//           {/* Progress Bar */}
//           <div className="w-full bg-white/30 rounded-full h-3 mb-2">
//             <motion.div
//               className="h-full rounded-full"
//               style={{ background: 'linear-gradient(90deg, var(--secondary-color), var(--alert-color))' }}
//               initial={{ width: 0 }}
//               animate={{ width: `${progressPercentage}%` }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//             />
//           </div>

//           {/* Progress Info */}
//           <div className="flex justify-between items-center text-white text-sm">
//             <span>₹{Math.round(currentAmount)} / ₹{targetAmount}</span>
//             <span className="font-bold">
//               {isDiscountActive ? `Discount Applied (${discountType}) ` : `${Math.round(progressPercentage)}% to ${nextDiscount}`}
//             </span>
//           </div>
//         </div>

//         {/* Encouraging Message Bar */}
//         <div className="px-3 sm:px-4 py-2" style={{ backgroundColor: 'var(--background-color)' }}>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaTags style={{ color: 'var(--accent-color)' }} />
//               <span className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>
//                 {remainingAmount > 0 ? (
//                   <>Add ₹{Math.round(remainingAmount)} more & get {nextDiscountType} discount</>
//                 ) : (
//                   <>Maximum discount achieved! 🎉</>
//                 )}
//               </span>
//             </div>
//             {remainingAmount > 0 && (
//               <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--alert-color)', color: 'var(--text-light-color)' }}>
//                 <FaArrowUp />
//                 <span className="font-bold">SAVE MORE</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Expanded Details */}
//         <AnimatePresence>
//           {isExpanded && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: 'auto', opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               className="border-t"
//               style={{ borderColor: 'var(--neutral-color)', backgroundColor: 'var(--background-color)' }}
//             >
//               <div className="p-3 sm:p-4 space-y-4">
//                 {/* Current Status */}
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <div className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Current Status</div>
//                     <div className="text-xs" style={{ color: 'var(--text-color)' }}>
//                       {totalCartItems} items • ₹{formatPrice(totalCartAmount)} total
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-sm font-bold" style={{ color: 'var(--theme-color)' }}>
//                       {isDiscountActive ? `${discountType} Active` : 'No Discount Yet'}
//                     </div>
//                     {isDiscountActive && (
//                       <div className="text-xs" style={{ color: 'var(--secondary-color)' }}>
//                         You saved ₹{discountAmount}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Discount Tiers */}
//                 <div>
//                   <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>Discount Tiers</div>
//                   <div className="grid grid-cols-3 gap-2 text-xs">
//                     <div className={`text-center p-2 rounded border transition-all ${
//                       currentEligibleAmount >= 199 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
//                     }`}>
//                       <div className="font-bold" style={{ color: currentEligibleAmount >= 199 ? 'var(--secondary-color)' : 'var(--text-color)' }}>
//                         10% OFF
//                       </div>
//                       <div className="text-gray-600">₹199+</div>
//                       {currentEligibleAmount >= 199 && <div className="text-green-600 mt-1">✓ Unlocked</div>}
//                     </div>
//                     <div className={`text-center p-2 rounded border transition-all ${
//                       currentEligibleAmount >= 499 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
//                     }`}>
//                       <div className="font-bold" style={{ color: currentEligibleAmount >= 499 ? 'var(--secondary-color)' : 'var(--text-color)' }}>
//                         20% OFF
//                       </div>
//                       <div className="text-gray-600">₹499+</div>
//                       {currentEligibleAmount >= 499 && <div className="text-green-600 mt-1">✓ Unlocked</div>}
//                     </div>
//                     <div className={`text-center p-2 rounded border transition-all ${
//                       currentCartAmount >= 1999 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
//                     }`}>
//                       <div className="font-bold" style={{ color: currentCartAmount >= 1999 ? 'var(--secondary-color)' : 'var(--text-color)' }}>
//                         30% OFF
//                       </div>
//                       <div className="text-gray-600">₹1999+ (Any item)</div>
//                       {currentCartAmount >= 1999 && <div className="text-green-600 mt-1">✓ Unlocked</div>}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Motivation Message */}
//                 <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--neutral-color)' }}>
//                   <div className="text-sm font-medium" style={{ color: 'var(--theme-color)' }}>
//                     {remainingAmount > 0 ? (
//                       <>🎯 Just ₹{formatPrice(remainingAmount)} away from {nextDiscount}!</>
//                     ) : (
//                       <>🏆 You've unlocked the maximum discount!</>
//                     )}
//                   </div>
//                   <div className="text-xs mt-1" style={{ color: 'var(--text-color)' }}>
//                     {remainingAmount > 0 ? 
//                       `Add eligible items to save more` : 
//                       'Keep shopping to maximize your savings!'
//                     }
//                   </div>
//                 </div>

//                 {/* Eligible Items */}
//                 <div className="text-center">
//                   <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-color)' }}>Eligible Items</div>
//                   <div className="text-xs" style={{ color: 'var(--text-color)' }}>
//                     Pickle • Honey • Chutney • Jam • Oats • Chaap
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pulse animation for encouragement */}
//         {!isDiscountActive && remainingAmount > 0 && (
//           <motion.div
//             animate={{ 
//               boxShadow: [
//                 '0 0 0 0 rgba(122, 46, 29, 0.4)',
//                 '0 0 0 8px rgba(122, 46, 29, 0)',
//               ]
//             }}
//             transition={{ 
//               duration: 2, 
//               repeat: Infinity,
//               repeatType: "loop"
//             }}
//             className="absolute inset-0 rounded-lg pointer-events-none"
//           />
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default DiscountProgress;


// import React, { useState, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaGift, FaChevronDown, FaChevronUp, FaFire, FaTags, FaArrowUp, FaTimes, FaGripVertical } from 'react-icons/fa';
// import { formatPrice } from '../../helper/helperFunctions';
// import confetti from 'canvas-confetti';

// const DiscountProgress = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [lastDiscountAmount, setLastDiscountAmount] = useState(0);
//   const componentRef = useRef(null);
//   const location = useLocation();

//   const {
//     discountProgress,
//     totalCartItems,
//     totalCartAmount
//   } = useSelector(state => state.cart);

//   // Celebration effect when discount increases
//   useEffect(() => {
//     if (discountProgress?.discountAmount > lastDiscountAmount && lastDiscountAmount > 0) {
//       triggerCelebration();
//     }
//     setLastDiscountAmount(discountProgress?.discountAmount || 0);
//   }, [discountProgress?.discountAmount, lastDiscountAmount]);

//   // Show component again when user adds products after closing
//   useEffect(() => {
//     if (totalCartItems > 0 && !isVisible) {
//       setIsVisible(true);
//     }
//   }, [totalCartItems]);

//   // Trigger celebration animation
//   const triggerCelebration = () => {
//     const duration = 3000;
//     const animationEnd = Date.now() + duration;

//     const randomInRange = (min, max) => Math.random() * (max - min) + min;

//     const interval = setInterval(() => {
//       const timeLeft = animationEnd - Date.now();

//       if (timeLeft <= 0) {
//         clearInterval(interval);
//         return;
//       }

//       const particleCount = 50 * (timeLeft / duration);

//       confetti({
//         particleCount,
//         startVelocity: 30,
//         spread: 360,
//         ticks: 60,
//         origin: {
//           x: randomInRange(0.1, 0.3),
//           y: Math.random() - 0.2
//         },
//         colors: ['#7A2E1D', '#9B7A2F', '#6B8E23', '#D87C45']
//       });

//       confetti({
//         particleCount,
//         startVelocity: 30,
//         spread: 360,
//         ticks: 60,
//         origin: {
//           x: randomInRange(0.7, 0.9),
//           y: Math.random() - 0.2
//         },
//         colors: ['#7A2E1D', '#9B7A2F', '#6B8E23', '#D87C45']
//       });
//     }, 250);
//   };

//   // Handle mouse down for dragging
//   const handleMouseDown = (e) => {
//     if (e.target.closest('.drag-handle')) {
//       setIsDragging(true);
//       const rect = componentRef.current.getBoundingClientRect();
//       setDragOffset({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top
//       });
//     }
//   };

//   // Handle mouse move for dragging
//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const newX = e.clientX - dragOffset.x;
//       const newY = e.clientY - dragOffset.y;

//       // Ensure component stays within viewport
//       const maxX = window.innerWidth - (componentRef.current?.offsetWidth || 0);
//       const maxY = window.innerHeight - (componentRef.current?.offsetHeight || 0);

//       setPosition({
//         x: Math.max(0, Math.min(newX, maxX)),
//         y: Math.max(0, Math.min(newY, maxY))
//       });
//     }
//   };

//   // Handle mouse up to stop dragging
//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Add event listeners for dragging
//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       return () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//       };
//     }
//   }, [isDragging, dragOffset]);

//   // Determine page type and component behavior
//   const getPageConfig = () => {
//     const pathname = location.pathname;

//     // Don't show on these pages
//     if (pathname.includes('/checkout') ||
//       pathname.includes('/account') ||
//       pathname.includes('/about') ||
//       pathname.includes('/contact') ||
//       pathname.includes('/login') ||
//       pathname.includes('/register')) {
//       return { show: false };
//     }

//     // Cart page - show expanded by default
//     if (pathname.includes('/cart')) {
//       return {
//         show: true,
//         defaultExpanded: false,
//         position: 'fixed',
//         marginBottom: true
//       };
//     }

//     // Shopping pages - show fixed and compact
//     if (pathname.includes('/') ||
//       pathname.includes('/shop') ||
//       pathname.includes('/products') ||
//       pathname.includes('/product/') ||
//       pathname.includes('/search') ||
//       pathname.includes('/category')) {
//       return {
//         show: true,
//         defaultExpanded: false,
//         position: 'fixed',
//         marginBottom: false
//       };
//     }

//     // Default - don't show
//     return { show: false };
//   };

//   const pageConfig = getPageConfig();

//   // Set expanded state based on page
//   useEffect(() => {
//     if (pageConfig.defaultExpanded !== undefined) {
//       setIsExpanded(pageConfig.defaultExpanded);
//     }
//   }, [location.pathname]);

//   // Don't show if no items in cart, page config says no, or user closed it
//   if (totalCartItems === 0 || !pageConfig.show || !isVisible) return null;

//   const { discountAmount, discountType, eligibleItems, progressInfo, currentDiscount } = discountProgress;

//   if (!progressInfo) return null;

//   const { currentEligibleAmount, currentCartAmount, nextThreshold, nextDiscountType } = progressInfo;

//   // Calculate current progress
//   let progressPercentage = 0;
//   let currentAmount = 0;
//   let targetAmount = 0;
//   let nextDiscount = '';
//   let remainingAmount = 0;
//   let currentTier = '';
//   let potentialSavings = 0;

//   if (currentCartAmount >= 1999) {
//     progressPercentage = 100;
//     currentAmount = currentCartAmount;
//     targetAmount = 1999;
//     nextDiscount = '30% OFF';
//     remainingAmount = 0;
//     currentTier = '30% OFF';
//     potentialSavings = Math.round(currentCartAmount * 0.3);
//   } else if (currentEligibleAmount >= 499) {
//     progressPercentage = Math.min((currentCartAmount / 1999) * 100, 100);
//     currentAmount = currentCartAmount;
//     targetAmount = 1999;
//     nextDiscount = '30% OFF';
//     remainingAmount = 1999 - currentCartAmount;
//     currentTier = '20% OFF';
//     potentialSavings = Math.round(remainingAmount * 0.3);
//   } else if (currentEligibleAmount >= 199) {
//     progressPercentage = Math.min((currentEligibleAmount / 499) * 100, 100);
//     currentAmount = currentEligibleAmount;
//     targetAmount = 499;
//     nextDiscount = '20% OFF';
//     remainingAmount = 499 - currentEligibleAmount;
//     currentTier = '10% OFF';
//     potentialSavings = Math.round(remainingAmount * 0.2);
//   } else {
//     progressPercentage = Math.min((currentEligibleAmount / 199) * 100, 100);
//     currentAmount = currentEligibleAmount;
//     targetAmount = 199;
//     nextDiscount = '10% OFF';
//     remainingAmount = 199 - currentEligibleAmount;
//     currentTier = 'None';
//     potentialSavings = Math.round(remainingAmount * 0.1);
//   }

//   const isDiscountActive = currentDiscount !== '0%';

//   // Dynamic positioning based on page and drag state
//   const getPositionStyles = () => {
//     if (isDragging || position.x !== 0 || position.y !== 0) {
//       return {
//         position: 'fixed',
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         zIndex: 9999
//       };
//     }

//     if (pageConfig.position === 'fixed') {
//       return {
//         position: 'fixed',
//         top: '64px',
//         left: '8px',
//         right: '8px',
//         zIndex: 40,
//         margin: '0 auto',
//         maxWidth: '1024px'
//       };
//     }

//     return {
//       position: 'relative',
//       margin: '0 auto',
//       maxWidth: '1024px'
//     };
//   };

//   const containerClasses = pageConfig.marginBottom ? "mb-6" : "";

//   return (
//     <motion.div
//       ref={componentRef}
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       className={`${containerClasses} ${isDragging ? 'cursor-grabbing' : ''}`}
//       style={{
//         ...getPositionStyles(),
//         '--theme-color': '#7A2E1D',
//         '--accent-color': '#9B7A2F',
//         '--background-color': '#F5EFE6',
//         '--text-color': '#3E2C1B',
//         '--text-light-color': '#FFFFFF',
//         '--secondary-color': '#6B8E23',
//         '--neutral-color': '#DCD2C0',
//         '--alert-color': '#D87C45'
//       }}
//       onMouseDown={handleMouseDown}
//     >
//       <div className="bg-white border-2 rounded-lg shadow-lg overflow-hidden relative" style={{ borderColor: 'var(--accent-color)' }}>

//         {/* Header with drag handle and close button */}
//         <div className="flex items-center justify-between p-1 bg-[var(--themeColor)] text-white border-b">
//           <div className="flex items-center gap-2">
//             <div className="drag-handle cursor-grab hover:cursor-grabbing p-1 rounded hover:bg-gray-200 transition-colors">
//               <FaGripVertical className="" />
//             </div>
//             <span className="text-xs font-medium">Discount Progress</span>
//           </div>
//           <button
//             onClick={() => setIsVisible(false)}
//             className="p-1 hover:bg-gray-200 rounded transition-colors"
//             title="Close"
//           >
//             <FaTimes className=" text-sm" />
//           </button>
//         </div>

//         {/* Main Progress Bar */}
//         <div className="px-3 py-1 sm:p-4 text-[var(--text-color)]"
//           // style={{ background: 'linear-gradient(135deg, var(--theme-color), var(--accent-color))' }}
//         >
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center gap-2">
//               <FaGift className=" text-lg" />
//               <div className=" font-bold text-sm sm:text-base">
//                 {isDiscountActive ? (
//                   <span className="flex items-center gap-1">
//                     <FaFire className="text-orange-300" />
//                     You saved ₹{discountAmount}
//                   </span>
//                 ) : (
//                   <span>Special Discount Available!</span>
//                 )}
//               </div>
//             </div>

//             <button
//               onClick={() => setIsExpanded(!isExpanded)}
//               className="flex items-center gap-2  p-1 hover:bg-white/20 rounded transition-colors"
//             >
//               Eligible Items  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
//             </button>
//           </div>

//           {/* Progress Bar */}
//           <div className="w-full bg-black/30 rounded-full h-3 mb-2">
//             <motion.div
//               className="h-full rounded-full"
//               style={{ background: 'linear-gradient(90deg, var(--secondary-color), var(--alert-color))' }}
//               initial={{ width: 0 }}
//               animate={{ width: `${progressPercentage}%` }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//             />
//           </div>

//           {/* Progress Info */}
//           <div className="flex justify-between items-center text-sm">
//             <span>₹{Math.round(currentAmount)} / ₹{targetAmount}</span>
//             <span className="">
//               {isDiscountActive ? `Discount Applied (${discountType}) ` : `${Math.round(progressPercentage)}% to ${nextDiscount}`}
//             </span>
//           </div>
//         </div>

//         {/* Encouraging Message Bar */}
//         <div className="px-2 sm:px-4 py-1 bg-[var(--themeColor)] text-white" 
//         // style={{ backgroundColor: 'var(--background-color)' }}
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaTags style={{ color: 'var(--accent-color)' }} />
//               <span className="text-sm font-medium" 
//               // style={{ color: 'var(--text-color)' }}
//               >
//                 {remainingAmount > 0 ? (
//                   <>Add ₹{Math.round(remainingAmount)} more & get {nextDiscountType} discount</>
//                 ) : (
//                   <>Maximum discount achieved! 🎉</>
//                 )}
//               </span>
//             </div>
//             {remainingAmount > 0 && (
//               <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ backgroundColor: 'var(--alert-color)', color: 'var(--text-light-color)' }}>
//                 <FaArrowUp />
//                 <span className="font-bold">SAVE MORE</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Expanded Details */}
//         <AnimatePresence>
//           {isExpanded && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: 'auto', opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               className="border-t"
//               style={{ borderColor: 'var(--neutral-color)', backgroundColor: 'var(--background-color)' }}
//             >
//               <div className="p-3 sm:p-4 space-y-4">
//                 {/* Current Status */}
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <div className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>Current Status</div>
//                     <div className="text-xs" style={{ color: 'var(--text-color)' }}>
//                       {totalCartItems} items • ₹{formatPrice(totalCartAmount)} total
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-sm font-bold" style={{ color: 'var(--theme-color)' }}>
//                       {isDiscountActive ? `${discountType} Active` : 'No Discount Yet'}
//                     </div>
//                     {isDiscountActive && (
//                       <div className="text-xs" style={{ color: 'var(--secondary-color)' }}>
//                         You saved ₹{discountAmount}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Discount Tiers */}
//                 <div>
//                   <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>Discount Tiers</div>
//                   <div className="grid grid-cols-3 gap-2 text-xs">
//                     <div className={`text-center p-2 rounded border transition-all ${currentEligibleAmount >= 199 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
//                       }`}>
//                       <div className="font-bold" style={{ color: currentEligibleAmount >= 199 ? 'var(--secondary-color)' : 'var(--text-color)' }}>
//                         10% OFF
//                       </div>
//                       <div className="text-gray-600">₹199+</div>
//                       {currentEligibleAmount >= 199 && <div className="text-green-600 mt-1">✓ Unlocked</div>}
//                     </div>
//                     <div className={`text-center p-2 rounded border transition-all ${currentEligibleAmount >= 499 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
//                       }`}>
//                       <div className="font-bold" style={{ color: currentEligibleAmount >= 499 ? 'var(--secondary-color)' : 'var(--text-color)' }}>
//                         20% OFF
//                       </div>
//                       <div className="text-gray-600">₹499+</div>
//                       {currentEligibleAmount >= 499 && <div className="text-green-600 mt-1">✓ Unlocked</div>}
//                     </div>
//                     <div className={`text-center p-2 rounded border transition-all ${currentCartAmount >= 1999 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
//                       }`}>
//                       <div className="font-bold" style={{ color: currentCartAmount >= 1999 ? 'var(--secondary-color)' : 'var(--text-color)' }}>
//                         30% OFF
//                       </div>
//                       <div className="text-gray-600">₹1999+ (Any item)</div>
//                       {currentCartAmount >= 1999 && <div className="text-green-600 mt-1">✓ Unlocked</div>}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Motivation Message */}
//                 <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--neutral-color)' }}>
//                   <div className="text-sm font-medium" style={{ color: 'var(--theme-color)' }}>
//                     {remainingAmount > 0 ? (
//                       <>🎯 Just ₹{formatPrice(remainingAmount)} away from {nextDiscount}!</>
//                     ) : (
//                       <>🏆 You've unlocked the maximum discount!</>
//                     )}
//                   </div>
//                   <div className="text-xs mt-1" style={{ color: 'var(--text-color)' }}>
//                     {remainingAmount > 0 ?
//                       `Add eligible items to save more` :
//                       'Keep shopping to maximize your savings!'
//                     }
//                   </div>
//                 </div>

//                 {/* Eligible Items */}
//                 <div className="text-center">
//                   <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-color)' }}>Eligible Items</div>
//                   <div className="text-xs" style={{ color: 'var(--text-color)' }}>
//                     Pickle • Honey • Chutney • Jam • Oats • Chaap
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pulse animation for encouragement */}
//         {!isDiscountActive && remainingAmount > 0 && (
//           <motion.div
//             animate={{
//               boxShadow: [
//                 '0 0 0 0 rgba(122, 46, 29, 0.4)',
//                 '0 0 0 8px rgba(122, 46, 29, 0)',
//               ]
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               repeatType: "loop"
//             }}
//             className="absolute inset-0 rounded-lg pointer-events-none"
//           />
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default DiscountProgress;


import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGift, FaChevronDown, FaChevronUp, FaFire, FaTags, FaArrowUp, FaTimes, FaGripVertical } from 'react-icons/fa';
import { formatPrice } from '../../helper/helperFunctions';
import confetti from 'canvas-confetti';

const DiscountProgress = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [lastDiscountAmount, setLastDiscountAmount] = useState(0);
  const componentRef = useRef(null);
  const location = useLocation();

  const {
    discountProgress,
    totalCartItems,
    totalCartAmount
  } = useSelector(state => state.cart);

  // Celebration effect when discount increases
  useEffect(() => {
    if (discountProgress?.discountAmount > lastDiscountAmount && lastDiscountAmount > 0) {
      triggerCelebration();
    }
    setLastDiscountAmount(discountProgress?.discountAmount || 0);
  }, [discountProgress?.discountAmount, lastDiscountAmount]);

  // Show component again when user adds products after closing
  useEffect(() => {
    if (totalCartItems > 0 && !isVisible) {
      setIsVisible(true);
    }
  }, [totalCartItems]);

  // Trigger celebration animation
  const triggerCelebration = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        },
        colors: ['#7A2E1D', '#9B7A2F', '#6B8E23', '#D87C45']
      });
    }, 250);
  };

  // Enhanced touch and mouse event handlers
  const handleStart = (e) => {
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    if (e.target.closest('.drag-handle')) {
      setIsDragging(true);
      const rect = componentRef.current.getBoundingClientRect();
      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top
      });
      
      // Prevent scrolling on mobile
      e.preventDefault();
    }
  };

  const handleMove = (e) => {
    if (isDragging) {
      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
      
      const newX = clientX - dragOffset.x;
      const newY = clientY - dragOffset.y;

      // Ensure component stays within viewport
      const maxX = window.innerWidth - (componentRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (componentRef.current?.offsetHeight || 0);

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
      
      // Prevent scrolling on mobile
      e.preventDefault();
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Add event listeners for both touch and mouse events
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleMove(e);
      const handleMouseUp = () => handleEnd();
      const handleTouchMove = (e) => handleMove(e);
      const handleTouchEnd = () => handleEnd();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);

  // Determine page type and component behavior
  const getPageConfig = () => {
    const pathname = location.pathname;

    if (pathname.includes('/checkout') ||
      pathname.includes('/blogs') ||
      pathname.includes('/about') ||
      pathname.includes('/contact') ||
      pathname.includes('/login') ||
      pathname.includes('/register')) {
      return { show: false };
    }

    if (pathname.includes('/') ||
      pathname.includes('/shop') ||
      pathname.includes('/cart') ||
      pathname.includes('/products') ||
      pathname.includes('/product/') ||
      pathname.includes('/search') ||
      pathname.includes('/category')) {
      return {
        show: true,
        defaultExpanded: false,
        position: 'fixed',
        marginBottom: false
      };
    }

    return { show: false };
  };

  const pageConfig = getPageConfig();

  useEffect(() => {
    if (pageConfig.defaultExpanded !== undefined) {
      setIsExpanded(pageConfig.defaultExpanded);
    }
  }, [location.pathname]);

  // Don't show if no items in cart, page config says no, or user closed it
  if (totalCartItems === 0 || !pageConfig.show || !isVisible) return null;

  const { discountAmount, discountType, eligibleItems, progressInfo, currentDiscount } = discountProgress;

  if (!progressInfo) return null;

  const { currentEligibleAmount, currentCartAmount, nextThreshold, nextDiscountType } = progressInfo;

  // Calculate current progress
  let progressPercentage = 0;
  let currentAmount = 0;
  let targetAmount = 0;
  let nextDiscount = '';
  let remainingAmount = 0;
  let currentTier = '';

  if (currentCartAmount >= 1999) {
    progressPercentage = 100;
    currentAmount = currentCartAmount;
    targetAmount = 1999;
    nextDiscount = '30% OFF';
    remainingAmount = 0;
    currentTier = '30% OFF';
  } else if (currentEligibleAmount >= 499) {
    progressPercentage = Math.min((currentCartAmount / 1999) * 100, 100);
    currentAmount = currentCartAmount;
    targetAmount = 1999;
    nextDiscount = '30% OFF';
    remainingAmount = 1999 - currentCartAmount;
    currentTier = '20% OFF';
  } else if (currentEligibleAmount >= 199) {
    progressPercentage = Math.min((currentEligibleAmount / 499) * 100, 100);
    currentAmount = currentEligibleAmount;
    targetAmount = 499;
    nextDiscount = '20% OFF';
    remainingAmount = 499 - currentEligibleAmount;
    currentTier = '10% OFF';
  } else {
    progressPercentage = Math.min((currentEligibleAmount / 199) * 100, 100);
    currentAmount = currentEligibleAmount;
    targetAmount = 199;
    nextDiscount = '10% OFF';
    remainingAmount = 199 - currentEligibleAmount;
    currentTier = 'None';
  }

  const isDiscountActive = currentDiscount !== '0%';

  // Dynamic positioning based on page and drag state
  const getPositionStyles = () => {
    if (isDragging || position.x !== 0 || position.y !== 0) {
      return {
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        maxWidth: '320px',
        width: '90vw'
      };
    }

    if (pageConfig.position === 'fixed') {
      return {
        position: 'fixed',
        top: '64px',
        left: '8px',
        right: '8px',
        zIndex: 40,
        margin: '0 auto',
        maxWidth: '400px'
      };
    }

    return {
      position: 'relative',
      margin: '0 auto',
      maxWidth: '400px'
    };
  };

  const containerClasses = pageConfig.marginBottom ? "mb-6" : "";

  return (
    <motion.div
      ref={componentRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${containerClasses} ${isDragging ? 'cursor-grabbing' : ''} touch-none`}
      style={{
        ...getPositionStyles(),
        '--theme-color': '#7A2E1D',
        '--accent-color': '#9B7A2F',
        '--background-color': '#F5EFE6',
        '--text-color': '#3E2C1B',
        '--text-light-color': '#FFFFFF',
        '--secondary-color': '#6B8E23',
        '--neutral-color': '#DCD2C0',
        '--alert-color': '#D87C45'
      }}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      <div className="bg-white border-2 rounded-lg shadow-lg overflow-hidden relative" style={{ borderColor: 'var(--accent-color)' }}>
        
        {/* Compact Header with drag handle */}
        <div className="flex items-center justify-between p-2 bg-gradient-to-r from-[var(--theme-color)] to-[var(--accent-color)] text-white">
          <div className="flex items-center gap-2 flex-1">
            <div className="drag-handle cursor-grab hover:cursor-grabbing p-1 rounded hover:bg-white/20 transition-colors">
              <FaGripVertical className="text-sm" />
            </div>
            <FaGift className="text-base" />
            <div className="font-semibold text-sm flex-1 min-w-0">
              {isDiscountActive ? (
                <span className="flex items-center gap-1">
                  <FaFire className="text-orange-300 text-xs" />
                  <span className="truncate">Saved ₹{discountAmount}</span>
                </span>
              ) : (
                <span className="truncate">Discount Available!</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs px-2 py-1 hover:bg-white/20 rounded transition-colors"
            >
          Eligible Items {isExpanded ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title="Close"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>
        </div>

        {/* Progress Bar - Always Visible */}
        <div className="px-3 py-2 bg-white">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--secondary-color), var(--alert-color))' }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-gray-600">
            <span>₹{Math.round(currentAmount)} / ₹{targetAmount}</span>
            <span className="font-medium">
              {isDiscountActive ? `${discountType} Applied` : `${Math.round(progressPercentage)}% to ${nextDiscount}`}
            </span>
          </div>
        </div>

        {/* Encouraging Message Bar - Always Visible */}
        <div className="px-3 py-2 bg-gradient-to-r from-[var(--theme-color)] to-[var(--accent-color)] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FaTags className="text-xs flex-shrink-0" />
              <span className="text-[14px] font-medium truncate">
                {remainingAmount > 0 ? (
                  <>You are Just ₹{Math.round(remainingAmount)} away from <span className='font-bold'>FLAT {nextDiscountType}</span> discount</>
                ) : (
                  <>FLAT 30% Discount Applied! 🎉</>
                )}
              </span>
            </div>
            {/* {remainingAmount > 0 && (
              <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[var(--alert-color)] ml-2 flex-shrink-0">
                <FaArrowUp className="text-xs" />
                <span className="font-bold">SAVE</span>
              </div>
            )} */}
          </div>
        </div>

        {/* Expanded Details - Only when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="border-t"
              style={{ borderColor: 'var(--neutral-color)', backgroundColor: 'var(--background-color)' }}
            >
              <div className="p-3 space-y-3">
                {/* Current Status */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-[var(--text-color)]">Current Status</div>
                    <div className="text-xs text-gray-600">
                      {totalCartItems} items • ₹{formatPrice(totalCartAmount)} total
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-[var(--theme-color)]">
                      {isDiscountActive ? `${discountType} Active` : 'No Discount Yet'}
                    </div>
                    {isDiscountActive && (
                      <div className="text-xs text-[var(--secondary-color)]">
                        You saved ₹{discountAmount}
                      </div>
                    )}
                  </div>
                </div>

                {/* Discount Tiers */}
                <div>
                  <div className="text-sm font-medium mb-2 text-[var(--text-color)]">Discount Tiers</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { threshold: 199, discount: '10% OFF', amount: currentEligibleAmount },
                      { threshold: 499, discount: '20% OFF', amount: currentEligibleAmount },
                      { threshold: 1999, discount: '30% OFF', amount: currentCartAmount }
                    ].map((tier, index) => (
                      <div key={index} className={`text-center p-2 rounded border transition-all ${
                        tier.amount >= tier.threshold ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
                      }`}>
                        <div className="font-bold" style={{ 
                          color: tier.amount >= tier.threshold ? 'var(--secondary-color)' : 'var(--text-color)' 
                        }}>
                          {tier.discount}
                        </div>
                        <div className="text-gray-600">
                          ₹{tier.threshold}+{tier.threshold === 1999 ? ' (Any Item)' : ''}
                        </div>
                        {tier.amount >= tier.threshold && (
                          <div className="text-green-600 mt-1">✓ Unlocked</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Motivation Message */}
                <div className="text-center p-3 rounded-lg bg-[var(--neutral-color)]">
                  <div className="text-sm font-medium text-[var(--theme-color)]">
                    {remainingAmount > 0 ? (
                      <>🎯 Just ₹{formatPrice(remainingAmount)} away from {nextDiscount}!</>
                    ) : (
                      <>🏆 You've unlocked the maximum discount!</>
                    )}
                  </div>
                  <div className="text-xs mt-1 text-[var(--text-color)]">
                    {remainingAmount > 0 ?
                      `Add eligible items to save more` :
                      'Keep shopping to maximize your savings!'
                    }
                  </div>
                </div>

                {/* Eligible Items */}
                <div className="text-center">
                  <div className="text-xs font-medium mb-1 text-[var(--text-color)]">Eligible Items</div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    Pickle • Honey • Chutney • Jam • Oats • Chaap
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse animation for encouragement */}
        {!isDiscountActive && remainingAmount > 0 && !isExpanded && (
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(122, 46, 29, 0.4)',
                '0 0 0 8px rgba(122, 46, 29, 0)',
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="absolute inset-0 rounded-lg pointer-events-none"
          />
        )}
      </div>
    </motion.div>
  );
};

export default DiscountProgress;