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
//     }, 250);
//   };

//   // Enhanced touch and mouse event handlers
//   const handleStart = (e) => {
//     const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
//     const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
//     if (e.target.closest('.drag-handle')) {
//       setIsDragging(true);
//       const rect = componentRef.current.getBoundingClientRect();
//       setDragOffset({
//         x: clientX - rect.left,
//         y: clientY - rect.top
//       });
      
//       // Prevent scrolling on mobile
//       e.preventDefault();
//     }
//   };

//   const handleMove = (e) => {
//     if (isDragging) {
//       const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
//       const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
      
//       const newX = clientX - dragOffset.x;
//       const newY = clientY - dragOffset.y;

//       // Ensure component stays within viewport
//       const maxX = window.innerWidth - (componentRef.current?.offsetWidth || 0);
//       const maxY = window.innerHeight - (componentRef.current?.offsetHeight || 0);

//       setPosition({
//         x: Math.max(0, Math.min(newX, maxX)),
//         y: Math.max(0, Math.min(newY, maxY))
//       });
      
//       // Prevent scrolling on mobile
//       e.preventDefault();
//     }
//   };

//   const handleEnd = () => {
//     setIsDragging(false);
//   };

//   // Add event listeners for both touch and mouse events
//   useEffect(() => {
//     if (isDragging) {
//       const handleMouseMove = (e) => handleMove(e);
//       const handleMouseUp = () => handleEnd();
//       const handleTouchMove = (e) => handleMove(e);
//       const handleTouchEnd = () => handleEnd();

//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       document.addEventListener('touchmove', handleTouchMove, { passive: false });
//       document.addEventListener('touchend', handleTouchEnd);

//       return () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//         document.removeEventListener('touchmove', handleTouchMove);
//         document.removeEventListener('touchend', handleTouchEnd);
//       };
//     }
//   }, [isDragging, dragOffset]);

//   // Determine page type and component behavior
//   const getPageConfig = () => {
//     const pathname = location.pathname;

//     if (pathname.includes('/checkout') ||
//       pathname.includes('/blogs') ||
//       pathname.includes('/about') ||
//       pathname.includes('/contact') ||
//       pathname.includes('/login') ||
//       pathname.includes('/register')) {
//       return { show: false };
//     }

//     if (pathname.includes('/') ||
//       pathname.includes('/shop') ||
//       pathname.includes('/cart') ||
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

//     return { show: false };
//   };

//   const pageConfig = getPageConfig();

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

//   if (currentCartAmount >= 1999) {
//     progressPercentage = 100;
//     currentAmount = currentCartAmount;
//     targetAmount = 1999;
//     nextDiscount = '30% OFF';
//     remainingAmount = 0;
//     currentTier = '30% OFF';
//   } else if (currentEligibleAmount >= 499) {
//     progressPercentage = Math.min((currentCartAmount / 1999) * 100, 100);
//     currentAmount = currentCartAmount;
//     targetAmount = 1999;
//     nextDiscount = '30% OFF';
//     remainingAmount = 1999 - currentCartAmount;
//     currentTier = '20% OFF';
//   } else if (currentEligibleAmount >= 199) {
//     progressPercentage = Math.min((currentEligibleAmount / 499) * 100, 100);
//     currentAmount = currentEligibleAmount;
//     targetAmount = 499;
//     nextDiscount = '20% OFF';
//     remainingAmount = 499 - currentEligibleAmount;
//     currentTier = '10% OFF';
//   } else {
//     progressPercentage = Math.min((currentEligibleAmount / 199) * 100, 100);
//     currentAmount = currentEligibleAmount;
//     targetAmount = 199;
//     nextDiscount = '10% OFF';
//     remainingAmount = 199 - currentEligibleAmount;
//     currentTier = 'None';
//   }

//   const isDiscountActive = currentDiscount !== '0%';

//   // Dynamic positioning based on page and drag state
//   const getPositionStyles = () => {
//     if (isDragging || position.x !== 0 || position.y !== 0) {
//       return {
//         position: 'fixed',
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         zIndex: 9999,
//         maxWidth: '320px',
//         width: '90vw'
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
//         maxWidth: '400px'
//       };
//     }

//     return {
//       position: 'relative',
//       margin: '0 auto',
//       maxWidth: '400px'
//     };
//   };

//   const containerClasses = pageConfig.marginBottom ? "mb-6" : "";

//   return (
//     <motion.div
//       ref={componentRef}
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       className={`${containerClasses} ${isDragging ? 'cursor-grabbing' : ''} touch-none`}
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
//       onMouseDown={handleStart}
//       onTouchStart={handleStart}
//     >
//       <div className="bg-white border-2 rounded-lg shadow-lg overflow-hidden relative" style={{ borderColor: 'var(--accent-color)' }}>
        
//         {/* Compact Header with drag handle */}
//         <div className="flex items-center justify-between p-2 bg-gradient-to-r from-[var(--theme-color)] to-[var(--accent-color)] text-white">
//           <div className="flex items-center gap-2 flex-1">
//             <div className="drag-handle cursor-grab hover:cursor-grabbing p-1 rounded hover:bg-white/20 transition-colors">
//               <FaGripVertical className="text-sm" />
//             </div>
//             <FaGift className="text-base" />
//             <div className="font-semibold text-sm flex-1 min-w-0">
//               {isDiscountActive ? (
//                 <span className="flex items-center gap-1">
//                   <FaFire className="text-orange-300 text-xs" />
//                   <span className="truncate">Saved ₹{discountAmount}</span>
//                 </span>
//               ) : (
//                 <span className="truncate">Discount Available!</span>
//               )}
//             </div>
//           </div>
          
//           <div className="flex items-center gap-1">
//             <button
//               onClick={() => setIsExpanded(!isExpanded)}
//               className="flex items-center gap-1 text-xs px-2 py-1 hover:bg-white/20 rounded transition-colors"
//             >
//           Eligible Items {isExpanded ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
//             </button>
//             <button
//               onClick={() => setIsVisible(false)}
//               className="p-1 hover:bg-white/20 rounded transition-colors"
//               title="Close"
//             >
//               <FaTimes className="text-xs" />
//             </button>
//           </div>
//         </div>

//         {/* Progress Bar - Always Visible */}
//         <div className="px-3 py-2 bg-white">
//           <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
//             <motion.div
//               className="h-full rounded-full"
//               style={{ background: 'linear-gradient(90deg, var(--secondary-color), var(--alert-color))' }}
//               initial={{ width: 0 }}
//               animate={{ width: `${progressPercentage}%` }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//             />
//           </div>
//           <div className="flex justify-between items-center text-xs text-gray-600">
//             <span>₹{Math.round(currentAmount)} / ₹{targetAmount}</span>
//             <span className="font-medium">
//               {isDiscountActive ? `${discountType} Applied` : `${Math.round(progressPercentage)}% to ${nextDiscount}`}
//             </span>
//           </div>
//         </div>

//         {/* Encouraging Message Bar - Always Visible */}
//         <div className="px-3 py-2 bg-gradient-to-r from-[var(--theme-color)] to-[var(--accent-color)] text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2 flex-1 min-w-0">
//               <FaTags className="text-xs flex-shrink-0" />
//               <span className="text-[14px] font-medium truncate">
//                 {remainingAmount > 0 ? (
//                   <>You are Just ₹{Math.round(remainingAmount)} away from <span className='font-bold'>FLAT {nextDiscountType}</span> discount</>
//                 ) : (
//                   <>FLAT 30% Discount Applied! 🎉</>
//                 )}
//               </span>
//             </div>
//             {/* {remainingAmount > 0 && (
//               <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[var(--alert-color)] ml-2 flex-shrink-0">
//                 <FaArrowUp className="text-xs" />
//                 <span className="font-bold">SAVE</span>
//               </div>
//             )} */}
//           </div>
//         </div>

//         {/* Expanded Details - Only when expanded */}
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
//               <div className="p-3 space-y-3">
//                 {/* Current Status */}
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <div className="text-sm font-medium text-[var(--text-color)]">Current Status</div>
//                     <div className="text-xs text-gray-600">
//                       {totalCartItems} items • ₹{formatPrice(totalCartAmount)} total
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-sm font-bold text-[var(--theme-color)]">
//                       {isDiscountActive ? `${discountType} Active` : 'No Discount Yet'}
//                     </div>
//                     {isDiscountActive && (
//                       <div className="text-xs text-[var(--secondary-color)]">
//                         You saved ₹{discountAmount}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Discount Tiers */}
//                 <div>
//                   <div className="text-sm font-medium mb-2 text-[var(--text-color)]">Discount Tiers</div>
//                   <div className="grid grid-cols-3 gap-2 text-xs">
//                     {[
//                       { threshold: 199, discount: '10% OFF', amount: currentEligibleAmount },
//                       { threshold: 499, discount: '20% OFF', amount: currentEligibleAmount },
//                       { threshold: 1999, discount: '30% OFF', amount: currentCartAmount }
//                     ].map((tier, index) => (
//                       <div key={index} className={`text-center p-2 rounded border transition-all ${
//                         tier.amount >= tier.threshold ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
//                       }`}>
//                         <div className="font-bold" style={{ 
//                           color: tier.amount >= tier.threshold ? 'var(--secondary-color)' : 'var(--text-color)' 
//                         }}>
//                           {tier.discount}
//                         </div>
//                         <div className="text-gray-600">
//                           ₹{tier.threshold}+{tier.threshold === 1999 ? ' (Any Item)' : ''}
//                         </div>
//                         {tier.amount >= tier.threshold && (
//                           <div className="text-green-600 mt-1">✓ Unlocked</div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Motivation Message */}
//                 <div className="text-center p-3 rounded-lg bg-[var(--neutral-color)]">
//                   <div className="text-sm font-medium text-[var(--theme-color)]">
//                     {remainingAmount > 0 ? (
//                       <>🎯 Just ₹{formatPrice(remainingAmount)} away from {nextDiscount}!</>
//                     ) : (
//                       <>🏆 You've unlocked the maximum discount!</>
//                     )}
//                   </div>
//                   <div className="text-xs mt-1 text-[var(--text-color)]">
//                     {remainingAmount > 0 ?
//                       `Add eligible items to save more` :
//                       'Keep shopping to maximize your savings!'
//                     }
//                   </div>
//                 </div>

//                 {/* Eligible Items */}
//                 <div className="text-center">
//                   <div className="text-xs font-medium mb-1 text-[var(--text-color)]">Eligible Items</div>
//                   <div className="text-xs text-gray-600 leading-relaxed">
//                     Pickle • Honey • Chutney • Jam • Oats • Chaap
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Pulse animation for encouragement */}
//         {!isDiscountActive && remainingAmount > 0 && !isExpanded && (
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



import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGift, 
  FaChevronDown, 
  FaChevronUp, 
  FaFire, 
  FaTags, 
  FaTimes, 
  FaGripVertical,
  FaPercentage,
  FaTrophy,
  FaStar
} from 'react-icons/fa';
import { formatPrice } from '../../helper/helperFunctions';
import confetti from 'canvas-confetti';

// Constants
const DISCOUNT_TIERS = [
  { threshold: 199, discount: '10% OFF', type: '10%' },
  { threshold: 499, discount: '20% OFF', type: '20%' },
  { threshold: 1999, discount: '30% OFF', type: '30%' }
];

const HIDDEN_PAGES = ['/checkout', '/blogs', '/about', '/contact', '/login', '/register'];
const ELIGIBLE_ITEMS = ['Pickles', 'Honey', 'Chutney', 'Jam', 'Oats', 'Chaap'];

const DiscountProgress = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [lastDiscountAmount, setLastDiscountAmount] = useState(0);
  
  const componentRef = useRef(null);
  const location = useLocation();

  const { discountProgress, totalCartItems, totalCartAmount } = useSelector(state => state.cart);

  // Memoized calculations
  const progressData = useMemo(() => {
    if (!discountProgress?.progressInfo) return null;

    const { currentEligibleAmount, currentCartAmount } = discountProgress.progressInfo;
    const { discountAmount, discountType, currentDiscount } = discountProgress;

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

    return {
      progressPercentage,
      currentAmount,
      targetAmount,
      nextDiscount,
      remainingAmount,
      currentTier,
      discountAmount,
      discountType,
      isDiscountActive: currentDiscount !== '0%',
      currentEligibleAmount,
      currentCartAmount
    };
  }, [discountProgress]);

  // Check if should show component
  const shouldShow = useMemo(() => {
    const pathname = location.pathname;
    const isHiddenPage = HIDDEN_PAGES.some(page => pathname.includes(page));
    return totalCartItems > 0 && !isHiddenPage && isVisible;
  }, [totalCartItems, location.pathname, isVisible]);

  // Celebration effect
  const triggerCelebration = useCallback(() => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 30 * (timeLeft / duration),
        startVelocity: 25,
        spread: 360,
        ticks: 50,
        origin: { x: Math.random() * 0.4 + 0.3, y: Math.random() - 0.2 },
        colors: ['#7A2E1D', '#9B7A2F', '#6B8E23', '#D87C45']
      });
    }, 200);
  }, []);

  // Effects
  useEffect(() => {
    if (progressData?.discountAmount > lastDiscountAmount && lastDiscountAmount > 0) {
      triggerCelebration();
    }
    setLastDiscountAmount(progressData?.discountAmount || 0);
  }, [progressData?.discountAmount, lastDiscountAmount, triggerCelebration]);

  useEffect(() => {
    if (totalCartItems > 0 && !isVisible) {
      setIsVisible(true);
    }
  }, [totalCartItems]);

  // Drag handlers
  const handleDragStart = useCallback((e) => {
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    if (e.target.closest('.drag-handle')) {
      setIsDragging(true);
      const rect = componentRef.current.getBoundingClientRect();
      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top
      });
      e.preventDefault();
    }
  }, []);

  const handleDragMove = useCallback((e) => {
    if (!isDragging) return;
    
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    
    const newX = clientX - dragOffset.x;
    const newY = clientY - dragOffset.y;

    const maxX = window.innerWidth - (componentRef.current?.offsetWidth || 0);
    const maxY = window.innerHeight - (componentRef.current?.offsetHeight || 0);

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
    
    e.preventDefault();
  }, [isDragging, dragOffset]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const events = [
      ['mousemove', handleDragMove],
      ['mouseup', handleDragEnd],
      ['touchmove', handleDragMove, { passive: false }],
      ['touchend', handleDragEnd]
    ];

    events.forEach(([event, handler, options]) => {
      document.addEventListener(event, handler, options);
    });

    return () => {
      events.forEach(([event, handler]) => {
        document.removeEventListener(event, handler);
      });
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  if (!shouldShow || !progressData) return null;

  const {
    progressPercentage,
    currentAmount,
    targetAmount,
    nextDiscount,
    remainingAmount,
    discountAmount,
    discountType,
    isDiscountActive,
    currentEligibleAmount,
    currentCartAmount
  } = progressData;

  const positionStyles = isDragging || position.x !== 0 || position.y !== 0
    ? {
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        maxWidth: '320px',
        width: '90vw'
      }
    : {
        position: 'fixed',
        top: '64px',
        left: '8px',
        right: '8px',
        zIndex: 40,
        margin: '0 auto',
        maxWidth: '400px'
      };
  return (
    <motion.div
      ref={componentRef}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`${isDragging ? 'cursor-grabbing' : ''} touch-none`}
      style={positionStyles}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative backdrop-blur-sm border border-white/20">
        
        {/* Compact Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-amber-600 via-amber-700 to-orange-600 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.3)_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(255,255,255,0.2)_0%,_transparent_50%)]" />
          </div>
          
          <div className="flex items-center gap-3 flex-1 relative z-10">
            <div className="drag-handle cursor-grab hover:cursor-grabbing p-2 rounded-lg hover:bg-white/20 transition-all duration-200 active:scale-95">
              <FaGripVertical className="text-sm opacity-70" />
            </div>
            
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <FaGift className="text- text-amber-100" />
            </div>
            
            <div className="font-bold text-ssm flex-1 min-w-0">
              {isDiscountActive ? (
                <motion.span 
                  className="flex items-center gap-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <FaFire className="text-orange-300 animate-pulse" />
                  <span className="truncate">₹{discountAmount} Saved!</span>
                </motion.span>
              ) : (
                <span className="truncate flex items-center gap-2">
                  <FaStar className="text-yellow-300" />
                  Unlock Discounts
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 relative z-10">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 backdrop-blur-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPercentage className="text-xs" />
              Details
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaChevronDown className="text-xs" />
              </motion.div>
            </motion.button>
            
            <motion.button
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Close"
            >
              <FaTimes className="text-sm" />
            </motion.button>
          </div>
        </div>

        {/* Encouraging Message Bar */}
        <div className="px-4 py-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] animate-pulse" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="bg-white/20 p-2 rounded-lg">
                <FaTags className="text-sm" />
              </div>
              
              <div className="flex-1 min-w-0">
                <motion.div 
                  className="text-sm  truncate"
                  key={remainingAmount}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {remainingAmount > 0 ? (
                    <>
                    You are Just <span className="text-[var(--themeColor)] text-lg font-bold">₹{Math.round(remainingAmount)}</span> away from FLAT{' '}
                      <span className=" text-[var(--themeColor)] font-bold py-1 text-lg rounded-md">
                        {nextDiscount}
                      </span>
                    </>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FaTrophy className="text-yellow-300" />
                      Maximum Discount Applied! 🎉
                    </span>
                  )}
                </motion.div>
                
                {/* <div className="text-xs opacity-90 mt-1">
                  {totalCartItems} items • ₹{formatPrice(totalCartAmount)} total
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="border-t border-gray-100"
            >
              <div className="p-4 bg-gradient-to-br from-gray-50 to-white space-y-4">
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Progress</span>
                    <span className="text-amber-600 font-bold">{Math.round(progressPercentage)}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
                    </motion.div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>₹{Math.round(currentAmount)}</span>
                    <span>₹{targetAmount}</span>
                  </div>
                </div>

                {/* Current Status */}
                <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Current Status</h3>
                      <p className="text-sm text-gray-600">
                        {totalCartItems} items • ₹{formatPrice(totalCartAmount)} total
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${
                        isDiscountActive ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {isDiscountActive ? `${discountType} Applied` : 'No Discount Yet'}
                      </div>
                      {isDiscountActive && (
                        <div className="text-xs text-green-500 mt-1">
                          You saved ₹{discountAmount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Discount Tiers */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Discount Tiers</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {DISCOUNT_TIERS.map((tier, index) => {
                      const isUnlocked = (tier.threshold === 1999 ? currentCartAmount : currentEligibleAmount) >= tier.threshold;
                      
                      return (
                        <motion.div
                          key={index}
                          className={`text-center p-1 rounded-xl border-2 transition-all duration-200 ${
                            isUnlocked 
                              ? 'border-green-400 bg-green-50 shadow-md' 
                              : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          animate={isUnlocked ? { scale: [1, 1.05, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`font-bold text-sm ${
                            isUnlocked ? 'text-green-700' : 'text-gray-600'
                          }`}>
                            {tier.discount}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            ₹{tier.threshold}+
                            {tier.threshold === 1999 && (
                              <div className="text-[10px] text-gray-400">(Any Item)</div>
                            )}
                          </div>
                          {isUnlocked && (
                            <motion.div 
                              className="text-green-600 text-xs mt-2 flex items-center justify-center gap-1"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <FaTrophy className="text-[10px]" />
                              Unlocked
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Motivation Message */}
                {/* <motion.div 
                  className="text-center p-4 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200"
                  animate={{ 
                    boxShadow: remainingAmount > 0 ? [
                      '0 0 0 0 rgba(245, 158, 11, 0.4)',
                      '0 0 0 8px rgba(245, 158, 11, 0)',
                    ] : '0 0 0 0 rgba(245, 158, 11, 0)'
                  }}
                  transition={{
                    duration: 2,
                    repeat: remainingAmount > 0 ? Infinity : 0,
                    repeatType: "loop"
                  }}
                >
                  <div className="text-base font-bold text-amber-800 mb-2">
                    {remainingAmount > 0 ? (
                      <>🎯 Just ₹{formatPrice(remainingAmount)} away from {nextDiscount}!</>
                    ) : (
                      <>🏆 You've unlocked the maximum discount!</>
                    )}
                  </div>
                  <div className="text-sm text-amber-700">
                    {remainingAmount > 0 
                      ? 'Add eligible items to save more' 
                      : 'Keep shopping to maximize your savings!'
                    }
                  </div>
                </motion.div> */}

                {/* Eligible Items */}
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 text-center">
                    Eligible Items for Discount
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {ELIGIBLE_ITEMS.map((item, index) => (
                      <motion.span
                        key={item}
                        className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-xs font-medium border border-amber-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DiscountProgress;