// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//     FaShoppingBag,
//     FaMapMarkerAlt,
//     FaRegClock,
//     FaCheck,
//     FaTruck,
//     FaBoxOpen
// } from 'react-icons/fa';
// import { BsArrowRight } from 'react-icons/bs';
// import confetti from 'canvas-confetti';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';


// function formatAddress({ address, city, state, pinCode }) {
//     return `${address}, ${city}, ${state} - ${pinCode}`;
//   }


// const OrderSuccessMessage = ({ isOpen = true, onClose, orderDetails = {}, onContinueShopping, onTrackOrder }) => {
//     const [showConfetti, setShowConfetti] = useState(true);
//     const { orderId } = useParams();
//     const [singleOrder, setSingleOrder] = useState(null);
//     const apiUrl = import.meta.env.VITE_BACKEND_URL;
// console.log('singleOrder',singleOrder)

//     const getSingleOrder = async (orderId) => {
//         try {
//             const response = await axios.get(`${apiUrl}/api/orders/${orderId}`)
//             if (response.data) {
//                 setSingleOrder(response.data)
//             }
//         } catch (error) {
//             throw error
//         }
//     }


//     useEffect(() => {

//         getSingleOrder(orderId)
//     }, [orderId])


//     // Default order details with fallbacks
//     const {
//         id = "ORD12345678",
//         date = new Date().toLocaleDateString('en-IN'),
//         deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
//         address = "123 Main St, Bangalore, Karnataka",
//         items = [],
//         totalAmount = 1299,
//         paymentMethod = "Online Payment"
//     } = orderDetails;

//     useEffect(() => {
//         if (singleOrder && showConfetti) {
//             // Trigger confetti effect when modal opens
//             const duration = 3 * 1000;
//             const end = Date.now() + duration;

//             const runConfetti = () => {
//                 confetti({
//                     particleCount: 2,
//                     angle: 60,
//                     spread: 55,
//                     origin: { x: 0 },
//                     colors: ['#5B21B6', '#2563EB', '#10B981']
//                 });

//                 confetti({
//                     particleCount: 2,
//                     angle: 120,
//                     spread: 55,
//                     origin: { x: 1 },
//                     colors: ['#5B21B6', '#2563EB', '#10B981']
//                 });

//                 if (Date.now() < end) {
//                     requestAnimationFrame(runConfetti);
//                 }
//             };

//             runConfetti();

//             // Stop confetti after duration
//             setTimeout(() => {
//                 setShowConfetti(false);
//             }, duration);
//         }
//     }, [singleOrder, showConfetti]);

//     //   if (!isOpen) return null;

//     if (!singleOrder) return <div>loading...</div>



//     // Animation variants
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 when: "beforeChildren",
//                 staggerChildren: 0.2,
//                 duration: 0.3
//             }
//         },
//         exit: {
//             opacity: 0,
//             transition: { duration: 0.2 }
//         }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { type: "spring", stiffness: 300, damping: 24 }
//         }
//     };

//     // Order timeline stages
//     const stages = [
//         { name: "Order Placed", icon: FaCheck, complete: true },
//         { name: "Processing", icon: FaBoxOpen, complete: true },
//         { name: "Shipped", icon: FaTruck, complete: false },
//         { name: "Delivered", icon: FaShoppingBag, complete: false }
//     ];

//     return (
//         <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//         >
//             {/* Backdrop */}
//             <motion.div
//                 className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={onClose}
//             />

//             {/* Modal content */}
//             <motion.div
//                 className="bg-white rounded-xl shadow-2xl w-full max-w-md md:max-w-lg relative z-10 overflow-hidden"
//                 initial={{ scale: 0.8, y: 50, opacity: 0 }}
//                 animate={{ scale: 1, y: 0, opacity: 1 }}
//                 exit={{ scale: 0.8, y: 30, opacity: 0 }}
//                 transition={{
//                     type: "spring",
//                     stiffness: 400,
//                     damping: 30
//                 }}
//             >
//                 {/* Success header with gradient background */}
//                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-6 relative overflow-hidden">
//                     <motion.div
//                         className="absolute top-0 left-0 w-full h-full"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: [0, 0.5, 0] }}
//                         transition={{ duration: 2, repeat: Infinity }}
//                     >
//                         <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//                             <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#wave-pattern)" />
//                             <defs>
//                                 <pattern id="wave-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
//                                     <path d="M0,50 C20,30 40,70 60,50 C80,30 100,70 100,50 L100,100 L0,100 Z" fill="rgba(255,255,255,0.1)" />
//                                 </pattern>
//                             </defs>
//                         </svg>
//                     </motion.div>

//                     <div className="relative z-10">
//                         <motion.div
//                             className="flex justify-center mb-4"
//                             initial={{ scale: 0, rotate: -45 }}
//                             animate={{ scale: 1, rotate: 0 }}
//                             transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
//                         >
//                             <div className="bg-white bg-opacity-30 rounded-full p-4 backdrop-blur-sm">
//                                 <FaCheck className="text-white text-3xl" />
//                             </div>
//                         </motion.div>

//                         <motion.h2
//                             className="text-2xl font-bold text-center mb-1"
//                             initial={{ y: 20, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             transition={{ delay: 0.4 }}
//                         >
//                             Order Placed Successfully!
//                         </motion.h2>

//                         <motion.p
//                             className="text-center text-white text-opacity-90"
//                             initial={{ y: 20, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             transition={{ delay: 0.5 }}
//                         >
//                             Thank you for your purchase
//                         </motion.p>
//                     </div>
//                 </div>

//                 {/* Order details */}
//                 <div className="px-6 py-5 max-h-[60vh] overflow-y-auto">
//                     <motion.div
//                         variants={containerVariants}
//                         initial="hidden"
//                         animate="visible"
//                         className="space-y-6"
//                     >
//                         {/* Order ID and Date */}
//                         <motion.div variants={itemVariants} className="flex justify-between items-center">
//                             <div>
//                                 <p className="text-gray-500">Order ID</p>
//                                 <p className="font-medium">{singleOrder.orderNo}</p>
//                             </div>
//                             <div className="text-right">
//                                 <p className="text-gray-500">Order Date</p>
//                                 <p className="font-medium">{new Date(singleOrder.createdAt).toLocaleDateString()}</p>
//                             </div>
//                         </motion.div>

//                         {/* Delivery timeline */}
//                         <motion.div variants={itemVariants} className="bg-blue-50 rounded-lg p-4">
//                             <div className="flex items-center mb-3">
//                                 <FaRegClock className="text-blue-600 mr-2" />
//                                 <h3 className="font-medium">Estimated Delivery</h3>
//                             </div>

//                             <p className="font-bold text-blue-600 mb-3">{new Date(new Date(singleOrder.createdAt).setDate(new Date(singleOrder.createdAt).getDate() + 4)).toDateString()}</p>

//                             {/* Timeline */}
//                             <div className="flex justify-between items-center">
//                                 {stages.map((stage, index) => (
//                                     <div key={index} className="flex flex-col items-center">
//                                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stage.complete ? 'bg-green-500' : 'bg-gray-200'}`}>
//                                             <stage.icon className={stage.complete ? 'text-white' : 'text-gray-500'} />
//                                         </div>
//                                         <p className={`text-xs mt-1 ${stage.complete ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
//                                             {stage.name}
//                                         </p>
//                                         {index < stages.length - 1 && (
//                                             <div className={`w-12 h-0.5 absolute ${stage.complete ? 'bg-green-500' : 'bg-gray-200'}`}
//                                                 style={{ transform: `translateX(${(index + 0.5) * 25}%)` }}>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ))}
//                             </div>
//                         </motion.div>

//                         {/* Delivery Address */}
//                         <motion.div variants={itemVariants} className="flex items-start">
//                             <div className="mt-1">
//                                 <FaMapMarkerAlt className="text-red-500" />
//                             </div>
//                             <div className="ml-3">
//                                 <h3 className="font-medium">Delivery Address</h3>
//                                 <p className="text-gray-600 text-sm">{formatAddress(singleOrder.shippingAddress)}</p>
//                             </div>
//                         </motion.div>

//                         {/* Payment Method */}
//                         <motion.div variants={itemVariants} className="flex justify-between py-3 border-t border-b">
//                             <span className="text-gray-600">Payment Method</span>
//                             <span className="font-medium">{singleOrder.paymentMethod.replaceAll("_"," ")}</span>
//                         </motion.div>


//                         {/* Order Amount */}
//                         <motion.div variants={itemVariants} className="flex justify-between items-center">
//                             <span className="text-gray-600">Order Amount</span>
//                             <span className="font-bold text-xl">₹ {singleOrder.subTotal+singleOrder.shippingFee}</span>
//                         </motion.div>
//                     </motion.div>
//                 </div>

//                 {/* Action buttons */}
//                 <motion.div
//                     className="p-4 border-t flex gap-3"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.8 }}
//                 >
//                     <motion.button
//                         className="flex-1 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium flex items-center justify-center gap-2"
//                         whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={onContinueShopping}
//                     >
//                         Continue Shopping
//                     </motion.button>

//                     <motion.button
//                         className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2"
//                         whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={onTrackOrder}
//                     >
//                         Track Order <BsArrowRight />
//                     </motion.button>
//                 </motion.div>
//             </motion.div>
//         </motion.div>
//     );
// };

// export default OrderSuccessMessage;







// import React, { useEffect, useState, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FaShoppingBag,
//   FaMapMarkerAlt,
//   FaRegClock,
//   FaCheck,
//   FaTruck,
//   FaBoxOpen
// } from 'react-icons/fa';
// import { BsArrowRight } from 'react-icons/bs';
// import confetti from 'canvas-confetti';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// // Animation variants defined once outside component
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       when: "beforeChildren",
//       staggerChildren: 0.2,
//       duration: 0.3
//     }
//   },
//   exit: {
//     opacity: 0,
//     transition: { duration: 0.2 }
//   }
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 300, damping: 24 }
//   }
// };

// // Helper functions moved outside component
// const formatAddress = ({ address, city, state, pinCode }) => {
//   return `${address}, ${city}, ${state} - ${pinCode}`;
// };

// const formatDate = (dateString) => {
//   return new Date(dateString).toLocaleDateString();
// };

// const getEstimatedDeliveryDate = (createdAt) => {
//   const date = new Date(createdAt);
//   date.setDate(date.getDate() + 4);
//   return date.toDateString();
// };

// // Constants
// const CONFETTI_DURATION = 3000;
// const CONFETTI_COLORS = ['#5B21B6', '#2563EB', '#10B981'];

// const OrderSuccessMessage = () => {
//   const [showConfetti, setShowConfetti] = useState(true);
//   const [singleOrder, setSingleOrder] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const { orderId } = useParams();
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_BACKEND_URL;

//   // Fetch order data
//   useEffect(() => {
//     const getSingleOrder = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`${apiUrl}/api/orders/${orderId}`);
//         if (response.data) {
//           setSingleOrder(response.data);
//         }
//       } catch (err) {
//         setError('Failed to load order details');
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (orderId) {
//       getSingleOrder();
//     }
//   }, [orderId, apiUrl]);

//   // Handle confetti effect
//   useEffect(() => {
//     if (!singleOrder || !showConfetti) return;

//     const end = Date.now() + CONFETTI_DURATION;

//     const runConfetti = () => {
//       // Left side confetti
//       confetti({
//         particleCount: 2,
//         angle: 60,
//         spread: 55,
//         origin: { x: 0 },
//         colors: CONFETTI_COLORS
//       });

//       // Right side confetti
//       confetti({
//         particleCount: 2,
//         angle: 120,
//         spread: 55,
//         origin: { x: 1 },
//         colors: CONFETTI_COLORS
//       });

//       if (Date.now() < end) {
//         requestAnimationFrame(runConfetti);
//       }
//     };

//     runConfetti();

//     // Cleanup timer
//     const timer = setTimeout(() => setShowConfetti(false), CONFETTI_DURATION);
//     return () => clearTimeout(timer);
//   }, [singleOrder, showConfetti]);

//   // Create order stages based on current status
//   const orderStages = useMemo(() => {
//     if (!singleOrder) return [];

//     const status = singleOrder.orderStatus || 'active';

//     return [
//       { 
//         name: "Order Placed", 
//         icon: FaCheck, 
//         complete: true 
//       },
//       { 
//         name: "Processing", 
//         icon: FaBoxOpen, 
//         complete: true 
//       },
//       { 
//         name: "Dispatched", 
//         icon: FaTruck, 
//         complete: status === 'dispatched' || status === 'completed'
//       },
//       { 
//         name: "Delivered", 
//         icon: FaShoppingBag, 
//         complete: status === 'completed'
//       }
//     ];
//   }, [singleOrder]);

//   // Navigation handlers
//   const handleContinueShopping = () => {
//     navigate('/');
//   };

//   const handleTrackOrder = () => {
//     navigate(`/orders/${orderId}/track`);
//   };

//   // Loading and error states
//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading order details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !singleOrder) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90">
//         <div className="text-center p-6 max-w-md">
//           <div className="text-red-500 text-5xl mb-4">⚠️</div>
//           <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
//           <p className="text-gray-600 mb-6">{error || "We couldn't find the order details you're looking for."}</p>
//           <button 
//             onClick={() => navigate('/')}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Return Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-0"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         {/* Backdrop */}
//         <motion.div
//           className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         />

//         {/* Modal content */}
//         <motion.div
//           className="bg-white rounded-xl shadow-2xl w-full max-w-md md:max-w-lg relative z-10 overflow-hidden"
//           initial={{ scale: 0.8, y: 50, opacity: 0 }}
//           animate={{ scale: 1, y: 0, opacity: 1 }}
//           exit={{ scale: 0.8, y: 30, opacity: 0 }}
//           transition={{
//             type: "spring",
//             stiffness: 400,
//             damping: 30
//           }}
//         >
//           {/* Success header with gradient background */}
//           <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 sm:py-8 px-4 sm:px-6 relative overflow-hidden">
//             <motion.div
//               className="absolute top-0 left-0 w-full h-full"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: [0, 0.5, 0] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
//                 <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#wave-pattern)" />
//                 <defs>
//                   <pattern id="wave-pattern" patternUnits="userSpaceOnUse" width="100" height="100">
//                     <path d="M0,50 C20,30 40,70 60,50 C80,30 100,70 100,50 L100,100 L0,100 Z" fill="rgba(255,255,255,0.1)" />
//                   </pattern>
//                 </defs>
//               </svg>
//             </motion.div>

//             <div className="relative z-10">
//               <motion.div
//                 className="flex justify-center mb-3 sm:mb-4"
//                 initial={{ scale: 0, rotate: -45 }}
//                 animate={{ scale: 1, rotate: 0 }}
//                 transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
//               >
//                 <div className="bg-white bg-opacity-30 rounded-full p-3 sm:p-4 backdrop-blur-sm">
//                   <FaCheck className="text-white text-2xl sm:text-3xl" />
//                 </div>
//               </motion.div>

//               <motion.h2
//                 className="text-xl sm:text-2xl font-bold text-center mb-1"
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 Order Placed Successfully!
//               </motion.h2>

//               <motion.p
//                 className="text-center text-white text-opacity-90 text-sm sm:text-base"
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 Thank you for your purchase
//               </motion.p>
//             </div>
//           </div>

//           {/* Order details */}
//           <div className="px-4 sm:px-6 py-4 sm:py-5 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="space-y-4 sm:space-y-6"
//             >
//               {/* Order ID and Date */}
//               <motion.div variants={itemVariants} className="flex justify-between items-center">
//                 <div>
//                   <p className="text-gray-500 text-sm">Order ID</p>
//                   <p className="font-medium text-sm sm:text-base">{singleOrder.orderNo}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-gray-500 text-sm">Order Date</p>
//                   <p className="font-medium text-sm sm:text-base">{formatDate(singleOrder.createdAt)}</p>
//                 </div>
//               </motion.div>

//               {/* Delivery timeline */}
//               <motion.div variants={itemVariants} className="bg-blue-50 rounded-lg p-3 sm:p-4">
//                 <div className="flex items-center mb-2 sm:mb-3">
//                   <FaRegClock className="text-blue-600 mr-2" />
//                   <h3 className="font-medium text-sm sm:text-base">Estimated Delivery</h3>
//                 </div>

//                 <p className="font-bold text-blue-600 mb-3 text-sm sm:text-base">
//                   {getEstimatedDeliveryDate(singleOrder.createdAt)}
//                 </p>

//                 {/* Timeline */}
//                 <div className="flex justify-between items-center relative">
//                   {orderStages.map((stage, index) => (
//                     <div key={index} className="flex flex-col items-center z-10">
//                       <div 
//                         className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
//                           stage.complete ? 'bg-green-500' : 'bg-gray-200'
//                         }`}
//                       >
//                         <stage.icon className={`text-xs sm:text-sm ${stage.complete ? 'text-white' : 'text-gray-500'}`} />
//                       </div>
//                       <p className={`text-xs mt-1 text-center max-w-[60px] ${
//                           stage.complete ? 'text-green-600 font-medium' : 'text-gray-500'
//                         }`}
//                       >
//                         {stage.name}
//                       </p>
//                     </div>
//                   ))}

//                   {/* Timeline connector lines */}
//                   <div className="absolute left-0 right-0 top-3 sm:top-4 h-0.5 bg-gray-200 -z-0"></div>
//                   <div 
//                     className="absolute left-0 h-0.5 bg-green-500 -z-0" 
//                     style={{ 
//                       width: `${orderStages.filter(stage => stage.complete).length / orderStages.length * 100}%`,
//                       top: '0.75rem',
//                       transition: 'width 1s ease-in-out'
//                     }}
//                   ></div>
//                 </div>
//               </motion.div>

//               {/* Delivery Address */}
//               <motion.div variants={itemVariants} className="flex items-start">
//                 <div className="mt-1">
//                   <FaMapMarkerAlt className="text-red-500" />
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="font-medium text-sm sm:text-base">Delivery Address</h3>
//                   <p className="text-gray-600 text-xs sm:text-sm">{formatAddress(singleOrder.shippingAddress)}</p>
//                 </div>
//               </motion.div>

//               {/* Payment Method */}
//               <motion.div variants={itemVariants} className="flex justify-between py-2 sm:py-3 border-t border-b">
//                 <span className="text-gray-600 text-sm sm:text-base">Payment Method</span>
//                 <span className="font-medium text-sm sm:text-base capitalize">
//                   {singleOrder.paymentMethod.replaceAll("_", " ")}
//                 </span>
//               </motion.div>

//               {/* Order Amount */}
//               <motion.div variants={itemVariants} className="flex justify-between items-center">
//                 <span className="text-gray-600 text-sm sm:text-base">Order Amount</span>
//                 <span className="font-bold text-lg sm:text-xl">
//                   ₹ {singleOrder.subTotal + singleOrder.shippingFee}
//                 </span>
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Action buttons */}
//           <motion.div
//             className="p-3 sm:p-4 border-t flex flex-col sm:flex-row gap-2 sm:gap-3"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8 }}
//           >
//             <motion.button
//               className="py-2 sm:py-3 border border-blue-600 text-blue-600 rounded-lg font-medium flex items-center justify-center gap-2 w-full"
//               whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleContinueShopping}
//             >
//               Continue Shopping
//             </motion.button>

//             <motion.button
//               className="py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 w-full"
//               whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleTrackOrder}
//             >
//               Track Order <BsArrowRight />
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default OrderSuccessMessage;







import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaShoppingBag,
    FaMapMarkerAlt,
    FaRegClock,
    FaCheck,
    FaTruck,
    FaBoxOpen
} from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import confetti from 'canvas-confetti';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Animation variants defined once outside component
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.2,
            duration: 0.3
        }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
};

// Helper functions moved outside component
const formatAddress = ({ address, city, state, pinCode }) => {
    return `${address}, ${city}, ${state} - ${pinCode}`;
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
};

const getEstimatedDeliveryDate = (createdAt) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + 4);
    return date.toDateString();
};

// Constants
const CONFETTI_DURATION = 3000;
const CONFETTI_COLORS = ['#5B21B6', '#2563EB', '#10B981'];

const OrderSuccessMessage = () => {
    const [showConfetti, setShowConfetti] = useState(true);
    const [singleOrder, setSingleOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { orderId } = useParams();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    // Fetch order data
    useEffect(() => {
        const getSingleOrder = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${apiUrl}/api/orders/${orderId}`);
                if (response.data) {
                    setSingleOrder(response.data);
                }
            } catch (err) {
                setError('Failed to load order details');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (orderId) {
            getSingleOrder();
        }
    }, [orderId, apiUrl]);

    // Handle confetti effect
    useEffect(() => {
        if (!singleOrder || !showConfetti) return;

        const end = Date.now() + CONFETTI_DURATION;

        // More dramatic confetti effect
        const runConfetti = () => {
            // Multiple confetti bursts
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 70,
                origin: { x: 0.2, y: 0.6 },
                colors: CONFETTI_COLORS
            });

            confetti({
                particleCount: 3,
                angle: 120,
                spread: 70,
                origin: { x: 0.8, y: 0.6 },
                colors: CONFETTI_COLORS
            });

            // Add middle burst for mobile
            confetti({
                particleCount: 2,
                startVelocity: 30,
                angle: 90,
                spread: 45,
                origin: { x: 0.5, y: 0.5 },
                colors: CONFETTI_COLORS
            });

            if (Date.now() < end) {
                requestAnimationFrame(runConfetti);
            }
        };

        runConfetti();

        // Cleanup timer
        const timer = setTimeout(() => setShowConfetti(false), CONFETTI_DURATION);
        return () => clearTimeout(timer);
    }, [singleOrder, showConfetti]);

    // Create order stages based on current status
    const orderStages = useMemo(() => {
        if (!singleOrder) return [];

        const status = singleOrder.orderStatus || 'active';

        return [
            {
                name: "Order Placed",
                icon: FaCheck,
                complete: true
            },
            {
                name: "Processing",
                icon: FaBoxOpen,
                complete: true
            },
            {
                name: "Dispatched",
                icon: FaTruck,
                complete: status === 'dispatched' || status === 'completed'
            },
            {
                name: "Delivered",
                icon: FaShoppingBag,
                complete: status === 'completed'
            }
        ];
    }, [singleOrder]);

    // Calculate progress percentage for timeline
    const progressPercentage = useMemo(() => {
        if (!orderStages.length) return 0;
        const completedStages = orderStages.filter(stage => stage.complete).length;
        return (completedStages - 0.5) / (orderStages.length - 1) * 100;
    }, [orderStages]);

    // Navigation handlers
    const handleContinueShopping = () => {
        navigate('/');
    };

    const handleTrackOrder = () => {
        navigate(`/orders/${orderId}/track`);
    };

    // Loading state with animation
    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading order details...</p>
                </div>
            </div>
        );
    }

    // Error state with better UI
    if (error || !singleOrder) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 p-4">
                <div className="text-center p-6 max-w-md bg-white rounded-xl shadow-lg">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || "We couldn't find the order details you're looking for."}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {/* Enhanced backdrop with subtle blur */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-black/60 to-blue-900/40 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />

                {/* Modal content with improved responsive design */}
                <motion.div
                    className="bg-white rounded-xl shadow-2xl w-full max-w-md md:max-w-lg relative z-10 overflow-hidden my-6 sm:my-8 flex flex-col max-h-[90vh]"
                    initial={{ scale: 0.8, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: 30, opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                    }}
                >
                    {/* Success header with gradient background */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 sm:py-8 px-4 sm:px-6 relative overflow-hidden flex-shrink-0">
                        {/* Animated wave pattern */}
                        {/* <motion.div
                            className="absolute top-0 left-0 w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 0.2, 0],
                                x: [0, -10, 0]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0,30 C20,50 40,10 60,30 C80,50 100,10 100,30 L100,100 L0,100 Z" fill="rgba(255,255,255,0.1)" />
                            </svg>
                        </motion.div>
                        <motion.div
                            className="absolute top-10 left-0 w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 0.3, 0],
                                x: [0, 10, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                        >
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0,60 C30,40 60,80 100,60 L100,100 L0,100 Z" fill="rgba(255,255,255,0.08)" />
                            </svg>
                        </motion.div> */}

                        {/* Success content with improved animations */}
                        <div className="relative z-10">
                            <motion.div
                                className="flex justify-center mb-4"
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    delay: 0.3
                                }}
                            >
                                <div className="bg-white bg-opacity-30 rounded-full p-3 sm:p-4 backdrop-blur-sm shadow-lg">
                                    <FaCheck className="text-white text-2xl sm:text-3xl" />
                                </div>
                            </motion.div>

                            <motion.h2
                                className="text-xl sm:text-2xl font-bold text-center mb-1"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Order Placed Successfully!
                            </motion.h2>

                            <motion.p
                                className="text-center text-white text-opacity-90 text-sm sm:text-base"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Thank you for your purchase
                            </motion.p>
                        </div>
                    </div>

                    {/* Order details with improved spacing for mobile */}
                    <div className="px-4 sm:px-6 py-4 sm:py-5 overflow-y-auto flex-1">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-4 sm:space-y-6"
                        >
                            {/* Order ID and Date */}
                            <motion.div variants={itemVariants} className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-500 text-xs sm:text-sm">Order ID</p>
                                    <p className="font-medium text-sm sm:text-base">{singleOrder.orderNo}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 text-xs sm:text-sm">Order Date</p>
                                    <p className="font-medium text-sm sm:text-base">{formatDate(singleOrder.createdAt)}</p>
                                </div>
                            </motion.div>

                            {/* Enhanced delivery timeline with better mobile view */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-blue-50 rounded-lg p-3 sm:p-4"
                                whileHover={{ boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)" }}
                                // transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center mb-3">
                                    <FaRegClock className="text-blue-600 mr-2" />
                                    <h3 className="font-medium text-sm sm:text-base">Estimated Delivery</h3>
                                </div>

                                <p className="font-bold text-blue-600 mb-4 text-sm sm:text-base">
                                    {getEstimatedDeliveryDate(singleOrder.createdAt)}
                                </p>

                                {/* IMPROVED TIMELINE FOR MOBILE - Major fix here */}
                                <div className="relative pt-6 pb-8">
                                    {/* Timeline connector line - Background */}
                                    <div className="absolute left-0 right-0 top-10 h-1 bg-gray-200 rounded-full"></div>

                                    {/* Timeline connector line - Progress */}
                                    <motion.div
                                        className="absolute left-0 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                                        style={{
                                            top: '2.5rem',
                                            width: '0%'
                                        }}
                                        animate={{ width: `${progressPercentage}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    ></motion.div>

                                    {/* Timeline items with improved positioning */}
                                    <div className="flex justify-between relative">
                                        {orderStages.map((stage, index) => (
                                            <div key={index} className="flex flex-col items-center">
                                                <motion.div
                                                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md z-10 ${stage.complete ? 'bg-green-500' : 'bg-gray-200'
                                                        }`}
                                                    initial={{ scale: 0.8 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.2 + index * 0.1 }}
                                                >
                                                    <stage.icon className={`text-sm ${stage.complete ? 'text-white' : 'text-gray-500'}`} />
                                                </motion.div>

                                                {/* Label - positioned below the dot */}
                                                <p className={`text-xs mt-2 text-center w-16 sm:w-20 ${stage.complete ? 'text-green-600 font-medium' : 'text-gray-500'
                                                    }`}
                                                >
                                                    {stage.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Delivery Address with better mobile formatting */}
                            <motion.div
                                variants={itemVariants}
                                className="flex items-start p-3 sm:p-4 bg-gray-50 rounded-lg"
                                whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
                            >
                                <div className="mt-0.5 text-lg text-red-500">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="ml-3 flex-1">
                                    <h3 className="font-medium text-sm sm:text-base">Delivery Address</h3>
                                    <p className="text-gray-600 text-xs sm:text-sm mt-1 break-words">
                                        {formatAddress(singleOrder.shippingAddress)}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Payment Method */}
                            <motion.div
                                variants={itemVariants}
                                className="flex justify-between py-3 px-1 border-t border-b items-center"
                            >
                                <span className="text-gray-600 text-sm">Payment Method</span>
                                <span className="font-medium text-sm bg-blue-50 px-3 py-1 rounded-full capitalize">
                                    {singleOrder.paymentMethod.replaceAll("_", " ")}
                                </span>
                            </motion.div>

                            {/* Order Amount with emphasis */}
                            <motion.div
                                variants={itemVariants}
                                className="flex justify-between items-center"
                            >
                                <span className="text-gray-600 text-sm">Order Amount</span>
                                <motion.span
                                    className="font-bold text-lg sm:text-xl text-blue-700"
                                    initial={{ scale: 1 }}
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                >
                                    ₹ {singleOrder.subTotal + singleOrder.shippingFee}
                                </motion.span>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Action buttons with improved mobile layout */}
                    <motion.div
                        className="p-4 border-t flex flex-col sm:flex-row gap-3 flex-shrink-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Link to='/shop/all'>
                        <motion.button
                            className="py-3 border border-blue-600 text-blue-600 rounded-lg font-medium flex items-center justify-center gap-2 w-full"
                            whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            // onClick={handleContinueShopping}
                        >
                            Continue Shopping
                        </motion.button>
                        </Link>
                        <Link to='/manage-orders'>
                        <motion.button
                            className="py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 w-full shadow-md"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.2)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleTrackOrder}
                        >
                            Track Order <BsArrowRight />
                        </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default OrderSuccessMessage;