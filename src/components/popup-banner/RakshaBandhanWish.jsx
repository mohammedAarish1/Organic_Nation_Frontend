// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaTimes, FaHeart, FaGift } from 'react-icons/fa';
// import { GiFlowerPot, GiWheat } from 'react-icons/gi';
// import { BiLeaf } from 'react-icons/bi';
// import confetti from 'canvas-confetti';

// const RakshaBandhanWish = ({ isOpen=true, onClose }) => {
//   const [showContent, setShowContent] = useState(true);

//   useEffect(() => {

//       const timer = setTimeout(() => {
//         setShowContent(true);
//         // Trigger confetti
//         confetti({
//           particleCount: 100,
//           spread: 70,
//           origin: { y: 0.6 },
//           colors: ['#7A2E1D', '#9B7A2F', '#6B8E23', '#D87C45']
//         });
//       }, 2000);
//       return () => clearTimeout(timer);

//   }, []);

//   const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1 }
//   };

//   const modalVariants = {
//     hidden: { 
//       opacity: 0, 
//       scale: 0.8,
//       y: 50
//     },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 25,
//         stiffness: 500
//       }
//     }
//   };

//   const floatingAnimation = {
//     y: [-10, 10, -10],
//     transition: {
//       duration: 3,
//       repeat: Infinity,
//       ease: "easeInOut"
//     }
//   };

//   const sparkleAnimation = {
//     scale: [0.8, 1.2, 0.8],
//     rotate: [0, 180, 360],
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       ease: "easeInOut"
//     }
//   };

//   const pulseAnimation = {
//     scale: [1, 1.05, 1],
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       ease: "easeInOut"
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           variants={overlayVariants}
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           onClick={onClose}
//         >
//           <motion.div
//             className="relative max-w-md w-full bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl shadow-2xl overflow-hidden"
//             variants={modalVariants}
//             initial="hidden"
//             animate="visible"
//             exit="hidden"
//             onClick={(e) => e.stopPropagation()}
//             style={{ 
//               background: 'linear-gradient(135deg, #F5EFE6 0%, #DCD2C0 100%)',
//               boxShadow: '0 25px 50px -12px rgba(122, 46, 29, 0.25)'
//             }}
//           >
//             {/* Close Button */}
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 group"
//               style={{ color: '#7A2E1D' }}
//             >
//               <FaTimes className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
//             </button>

//             {/* Decorative Elements */}
//             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//               <motion.div
//                 animate={floatingAnimation}
//                 className="absolute top-6 left-6 text-2xl"
//                 style={{ color: '#9B7A2F' }}
//               >
//                 <GiFlowerPot />
//               </motion.div>
//               <motion.div
//                 animate={sparkleAnimation}
//                 className="absolute top-8 right-16 text-lg"
//                 style={{ color: '#6B8E23' }}
//               >
//                 <BiLeaf />
//               </motion.div>
//               <motion.div
//                 animate={floatingAnimation}
//                 className="absolute bottom-20 left-8 text-xl"
//                 style={{ color: '#D87C45' }}
//               >
//                 <GiWheat />
//               </motion.div>
//               <motion.div
//                 animate={sparkleAnimation}
//                 className="absolute bottom-16 right-6 text-lg"
//                 style={{ color: '#9B7A2F' }}
//               >
//                 <BiLeaf />
//               </motion.div>
//             </div>

//             {/* Main Content */}
//             <div className="relative px-8 py-12 text-center">
//               {/* Rakhi Illustration */}
//               <motion.div
//                 animate={pulseAnimation}
//                 className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center relative"
//                 style={{ backgroundColor: '#7A2E1D' }}
//               >
//                 <motion.div
//                   animate={sparkleAnimation}
//                   className="text-3xl text-white"
//                 >
//                   <FaHeart />
//                 </motion.div>
//                 <div className="absolute inset-0 rounded-full border-4 border-dashed opacity-30" style={{ borderColor: '#9B7A2F' }}></div>
//               </motion.div>

//               {/* Main Heading */}
//               <AnimatePresence>
//                 {showContent && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     <h1 
//                       className="text-3xl sm:text-4xl font-bold mb-3 leading-tight"
//                       style={{ color: '#7A2E1D' }}
//                     >
//                       Happy Raksha Bandhan
//                     </h1>
//                     <motion.div
//                       animate={{ scaleX: [0, 1] }}
//                       transition={{ delay: 0.4, duration: 0.8 }}
//                       className="w-24 h-1 mx-auto mb-4 rounded-full"
//                       style={{ backgroundColor: '#9B7A2F' }}
//                     ></motion.div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Brand Message */}
//               <AnimatePresence>
//                 {showContent && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                   >
//                     <p 
//                       className="text-lg sm:text-xl font-semibold mb-2"
//                       style={{ color: '#9B7A2F' }}
//                     >
//                       From Organic Nation
//                     </p>
//                     <p 
//                       className="text-sm sm:text-base mb-6 leading-relaxed"
//                       style={{ color: '#3E2C1B' }}
//                     >
//                       Celebrating the pure bond of love with nature's finest gifts. 
//                       May this festival bring organic joy and natural blessings to your family.
//                     </p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* CTA Section */}
//               <AnimatePresence>
//                 {showContent && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.6 }}
//                     className="space-y-4"
//                   >
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="w-full py-3 px-6 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
//                       style={{ backgroundColor: '#7A2E1D' }}
//                     >
//                       <FaGift className="text-lg" />
//                       Explore Organic Gifts
//                     </motion.button>

//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.8 }}
//                       className="text-xs"
//                       style={{ color: '#9B7A2F' }}
//                     >
//                       🌿 Special festive discounts available
//                     </motion.div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Bottom Decorative Border */}
//             <motion.div
//               animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
//               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//               className="h-2 w-full"
//               style={{
//                 background: `linear-gradient(90deg, #7A2E1D 0%, #9B7A2F 25%, #6B8E23 50%, #D87C45 75%, #7A2E1D 100%)`,
//                 backgroundSize: '200% 100%'
//               }}
//             ></motion.div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };



import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGift } from 'react-icons/fa';
import { GiFlowerPot, GiWheat, GiJewelCrown } from 'react-icons/gi';
import { BiLeaf } from 'react-icons/bi';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';

const RakshaBandhanWish = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Check if popup has been shown before
        const hasSeenPopup = localStorage.getItem('rakshaBandhanPopupSeen');

        if (!hasSeenPopup) {
            // Show popup after 2 seconds of page load
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setShowContent(true);
                // Trigger confetti
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#7A2E1D', '#9B7A2F', '#6B8E23', '#D87C45']
                });
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setShowContent(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        // Mark popup as seen so it won't show again
        localStorage.setItem('rakshaBandhanPopupSeen', 'true');
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 500
            }
        }
    };

    const floatingAnimation = {
        y: [-10, 10, -10],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const sparkleAnimation = {
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 180, 360],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={handleOverlayClick}
                >
                    <motion.div
                        className="relative max-w-md w-full bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl shadow-2xl overflow-hidden"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'linear-gradient(135deg, #F5EFE6 0%, #DCD2C0 100%)',
                            boxShadow: '0 25px 50px -12px rgba(122, 46, 29, 0.25)'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 group"
                            style={{ color: '#7A2E1D' }}
                        >
                            <FaTimes className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                        </button>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <motion.div
                                animate={floatingAnimation}
                                className="absolute top-6 left-6 text-2xl"
                                style={{ color: '#9B7A2F' }}
                            >
                                <GiFlowerPot />
                            </motion.div>
                            <motion.div
                                animate={sparkleAnimation}
                                className="absolute top-8 right-16 text-lg"
                                style={{ color: '#6B8E23' }}
                            >
                                <BiLeaf />
                            </motion.div>
                            <motion.div
                                animate={floatingAnimation}
                                className="absolute bottom-20 left-8 text-xl"
                                style={{ color: '#D87C45' }}
                            >
                                <GiWheat />
                            </motion.div>
                            <motion.div
                                animate={sparkleAnimation}
                                className="absolute bottom-16 right-6 text-lg"
                                style={{ color: '#9B7A2F' }}
                            >
                                <BiLeaf />
                            </motion.div>
                        </div>

                        {/* Main Content */}
                        <div className="relative px-8 py-12 text-center">
                            {/* Rakhi Illustration */}
                            <motion.div
                                animate={pulseAnimation}
                                className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center relative"
                                style={{ backgroundColor: '#7A2E1D' }}
                            >
                                <motion.div
                                    animate={sparkleAnimation}
                                    className="text-3xl text-white"
                                >
                                    <GiJewelCrown />
                                </motion.div>
                                <div className="absolute inset-0 rounded-full border-4 border-dashed opacity-30" style={{ borderColor: '#9B7A2F' }}></div>
                            </motion.div>

                            {/* Main Heading */}
                            <AnimatePresence>
                                {showContent && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h1
                                            className="text-3xl sm:text-4xl font-bold mb-3 leading-tight"
                                            style={{ color: '#7A2E1D' }}
                                        >
                                            Happy Raksha Bandhan
                                        </h1>
                                        <motion.div
                                            animate={{ scaleX: [0, 1] }}
                                            transition={{ delay: 0.4, duration: 0.8 }}
                                            className="w-24 h-1 mx-auto mb-4 rounded-full"
                                            style={{ backgroundColor: '#9B7A2F' }}
                                        ></motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Brand Message */}
                            <AnimatePresence>
                                {showContent && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <p
                                            className="text-lg sm:text-xl font-semibold mb-2"
                                            style={{ color: '#9B7A2F' }}
                                        >
                                            From Organic Nation
                                        </p>
                                        <p
                                            className="text-sm sm:text-base mb-6 leading-relaxed"
                                            style={{ color: '#3E2C1B' }}
                                        >
                                            Celebrating the pure bond of love with nature's finest gifts.
                                            May this festival bring organic joy and natural blessings to your family.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* CTA Section */}
                            <AnimatePresence>
                                {showContent && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="space-y-4"
                                    >
                                        <Link
                                            to='/shop/gifts-&-combos'
                                            className="bg-[var(--themeColor)] w-full py-3 px-6 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"

                                        >
                                            <FaGift className="text-lg" />
                                            Explore Organic Gifts
                                        </Link>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.8 }}
                                            className="text-xs"
                                            style={{ color: '#9B7A2F' }}
                                        >
                                            🌿 Special festive discounts available
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bottom Decorative Border */}
                        <motion.div
                            animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="h-2 w-full"
                            style={{
                                background: `linear-gradient(90deg, #7A2E1D 0%, #9B7A2F 25%, #6B8E23 50%, #D87C45 75%, #7A2E1D 100%)`,
                                backgroundSize: '200% 100%'
                            }}
                        ></motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// // Usage Example Component - How to use in your homepage
// const App = () => {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Your existing homepage content */}
//       <div className="flex items-center justify-center pt-20">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold mb-4" style={{ color: '#7A2E1D' }}>
//             Welcome to Organic Nation
//           </h1>
//           <p className="text-lg" style={{ color: '#3E2C1B' }}>
//             Your trusted source for organic products
//           </p>

//           {/* Test button to reset popup (for development only - remove in production) */}
//           <button
//             onClick={() => {
//               localStorage.removeItem('rakshaBandhanPopupSeen');
//               window.location.reload();
//             }}
//             className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
//           >
//             Reset Popup (Dev Only)
//           </button>
//         </div>
//       </div>

//       {/* Raksha Bandhan Popup - No props needed, it manages itself */}
//       <RakshaBandhanPopup />
//     </div>
//   );
// };



export default RakshaBandhanWish;
