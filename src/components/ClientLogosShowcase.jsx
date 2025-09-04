// import React, {  useEffect,  useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';


// const ClientLogosShowcase = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   // Food vendor/retailer clients data
//   const vendors = [
//     {
//       id: 1,
//       name: "Big Basket",
//       logo: "/big_basket.png",
//       testimonial: "Premium quality preserves that our customers absolutely love! Best pickles in the region.",
//       rating: 5,
//       category: "Supermarket Chain",
//       products: ["Pickles", "Honey", "Jams"],
//       locations: "50+ Stores",
//       partnership: "3 Years"
//     },
//     {
//       id: 2,
//       name: "Organic Foods Co.",
//       logo: "/Country_Delight_logo.png",
//       testimonial: "Natural honey and organic jams that align perfectly with our brand values.",
//       rating: 5,
//       category: "Organic Retailer",
//       products: ["Honey", "Organic Jams"],
//       locations: "25+ Outlets",
//       partnership: "2 Years"
//     },
//     {
//       id: 3,
//       name: "Gourmet Delights",
//       logo: "https://via.placeholder.com/220x110/9B7A2F/FFFFFF?text=Gourmet+Delights",
//       testimonial: "Artisanal quality that elevates our premium food section. Customers keep coming back!",
//       rating: 5,
//       category: "Specialty Store",
//       products: ["Premium Jams", "Honey"],
//       locations: "15+ Stores",
//       partnership: "4 Years"
//     },
//     {
//       id: 4,
//       name: "Metro Hypermart",
//       logo: "https://via.placeholder.com/220x110/D87C45/FFFFFF?text=Metro+Hypermart",
//       testimonial: "Reliable supply chain and consistent quality. Our top-selling preserve brand.",
//       rating: 5,
//       category: "Hypermarket",
//       products: ["Pickles", "Honey", "Jams"],
//       locations: "100+ Locations",
//       partnership: "5 Years"
//     },
//     {
//       id: 5,
//       name: "Corner Store Network",
//       logo: "https://via.placeholder.com/220x110/3E2C1B/FFFFFF?text=Corner+Store",
//       testimonial: "Perfect portion sizes and pricing for neighborhood stores. Great profit margins!",
//       rating: 5,
//       category: "Convenience Stores",
//       products: ["Small Jars", "Honey Sachets"],
//       locations: "200+ Stores",
//       partnership: "3 Years"
//     },
//     {
//       id: 6,
//       name: "Farm Fresh Outlets",
//       logo: "https://via.placeholder.com/220x110/7A2E1D/FFFFFF?text=Farm+Fresh",
//       testimonial: "Authentic taste that reminds customers of homemade goodness. Excellent partnership!",
//       rating: 5,
//       category: "Farm Store Chain",
//       products: ["Traditional Pickles", "Raw Honey"],
//       locations: "30+ Outlets",
//       partnership: "6 Years"
//     }
//   ];

//   const productIcons = {
//     "Pickles": <GiPickle className="w-5 h-5" />,
//     "Honey": <GiHoneyJar className="w-5 h-5" />,
//     // "Jams": <GiJam className="w-5 h-5" />
//   };

//   // Auto-rotate slides
//   useEffect(() => {
//     if (!isHovered) {
//       const interval = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % Math.ceil(vendors.length / 3));
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [isHovered, vendors.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % Math.ceil(vendors.length / 3));
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + Math.ceil(vendors.length / 3)) % Math.ceil(vendors.length / 3));
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         staggerChildren: 0.15
//       }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, scale: 0.9, rotateY: -15 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       rotateY: 0,
//       transition: {
//         duration: 0.7,
//         ease: "easeOut"
//       }
//     },
//     hover: {
//       scale: 1.03,
//       y: -8,
//       rotateY: 5,
//       transition: {
//         duration: 0.4,
//         ease: "easeInOut"
//       }
//     }
//   };

//   const floatingAnimation = {
//     y: [-5, 5, -5],
//     transition: {
//       duration: 3,
//       repeat: Infinity,
//       ease: "easeInOut"
//     }
//   };

//   return (
//     <div 
//       className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
//       style={{ 
//         background: `linear-gradient(135deg, #F5EFE6 0%, #DCD2C0 30%, #F5EFE6 70%, #DCD2C0 100%)`,
//         minHeight: '90vh'
//       }}
//     >
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Floating Food Icons */}
//         <motion.div
//           className="absolute top-20 left-10 opacity-5"
//           animate={floatingAnimation}
//           transition={{ delay: 0 }}
//         >
//           <GiHoneyJar className="w-24 h-24" style={{ color: '#9B7A2F' }} />
//         </motion.div>
        
//         <motion.div
//           className="absolute top-40 right-20 opacity-5"
//           animate={floatingAnimation}
//           transition={{ delay: 1 }}
//         >
//           <GiPickle className="w-20 h-20" style={{ color: '#6B8E23' }} />
//         </motion.div>
        
//         <motion.div
//           className="absolute bottom-32 left-20 opacity-5"
//           animate={floatingAnimation}
//           transition={{ delay: 2 }}
//         >
//           {/* <GiJam className="w-22 h-22" style={{ color: '#D87C45' }} /> */}
//         </motion.div>

//         {/* Gradient Orbs */}
//         <motion.div
//           className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-8"
//           style={{ 
//             background: `radial-gradient(circle, #7A2E1D20 0%, transparent 70%)`
//           }}
//           animate={{
//             scale: [1, 1.3, 1],
//             opacity: [0.08, 0.15, 0.08]
//           }}
//           transition={{
//             duration: 8,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
        
//         <motion.div
//           className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-8"
//           style={{ 
//             background: `radial-gradient(circle, #9B7A2F20 0%, transparent 70%)`
//           }}
//           animate={{
//             scale: [1.3, 1, 1.3],
//             opacity: [0.15, 0.08, 0.15]
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//       </div>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Enhanced Header Section */}
//         <motion.div
//           className="text-center mb-20"
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={containerVariants}
//         >
//           {/* Badge with Icons */}
//           <motion.div
//             className="inline-flex items-center mb-6 px-6 py-3 rounded-full shadow-lg"
//             style={{ 
//               backgroundColor: '#7A2E1D',
//               color: '#FFFFFF'
//             }}
//             whileHover={{ scale: 1.05 }}
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <FaStore className="mr-2" />
//             <span className="font-semibold tracking-wider uppercase text-sm">Trusted Retail Partners</span>
//             <motion.div
//               className="ml-2"
//               animate={{ rotate: [0, 10, -10, 0] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               <FaAward />
//             </motion.div>
//           </motion.div>
          
//           <motion.h1
//             className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
//             style={{ color: '#3E2C1B' }}
//             variants={cardVariants}
//           >
//             Our <span style={{ color: '#7A2E1D' }}>Premium</span><br />
//             <span style={{ color: '#9B7A2F' }}>Vendor Network</span>
//           </motion.h1>
          
//           <motion.p
//             className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8"
//             style={{ color: '#3E2C1B' }}
//             variants={cardVariants}
//           >
//             From neighborhood stores to major supermarket chains, our artisanal pickles, 
//             pure honey, and premium jams are loved by customers across the region.
//           </motion.p>

//           {/* Stats Row */}
//           <motion.div
//             className="flex flex-wrap justify-center gap-8 mt-12"
//             variants={containerVariants}
//           >
//             {[
//               { icon: <FaStore />, number: "10+", label: "Retail Partners" },
//               { icon: <FaTruck />, number: "15+", label: "Cities Covered" },
//               { icon: <GiHoneyJar />, number: "14+", label: "Product Varieties" },
//               { icon: <FaAward />, number: "13+", label: "Years Experience" }
//             ].map((stat, index) => (
//               <motion.div
//                 key={index}
//                 className="text-center p-4 rounded-xl shadow-md"
//                 style={{ backgroundColor: '#FFFFFF' }}
//                 variants={cardVariants}
//                 whileHover={{ y: -5 }}
//               >
//                 <div 
//                   className="text-2xl mb-2 flex justify-center"
//                   style={{ color: '#7A2E1D' }}
//                 >
//                   {stat.icon}
//                 </div>
//                 <div 
//                   className="text-2xl font-bold"
//                   style={{ color: '#3E2C1B' }}
//                 >
//                   {stat.number}
//                 </div>
//                 <div 
//                   className="text-sm font-medium"
//                   style={{ color: '#3E2C1B' }}
//                 >
//                   {stat.label}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Enhanced Main Showcase */}
//         <motion.div
//           className="relative"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={containerVariants}
//         >
//           {/* Stylish Navigation Arrows */}
//           <motion.button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full shadow-xl backdrop-blur-sm"
//             style={{ 
//               background: `linear-gradient(135deg, #7A2E1D, #9B7A2F)`,
//               color: '#FFFFFF'
//             }}
//             whileHover={{ scale: 1.1, x: -5 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <FaChevronLeft className="w-6 h-6" />
//           </motion.button>
          
//           <motion.button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full shadow-xl backdrop-blur-sm"
//             style={{ 
//               background: `linear-gradient(135deg, #7A2E1D, #9B7A2F)`,
//               color: '#FFFFFF'
//             }}
//             whileHover={{ scale: 1.1, x: 5 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <FaChevronRight className="w-6 h-6" />
//           </motion.button>

//           {/* Enhanced Slides Container */}
//           <div className="overflow-hidden mx-16">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentSlide}
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//                 initial={{ opacity: 0, x: 300, rotateY: 15 }}
//                 animate={{ opacity: 1, x: 0, rotateY: 0 }}
//                 exit={{ opacity: 0, x: -300, rotateY: -15 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 {vendors.slice(currentSlide * 3, currentSlide * 3 + 3).map((vendor, index) => (
//                   <motion.div
//                     key={vendor.id}
//                     className="group relative perspective-1000"
//                     variants={cardVariants}
//                     whileHover="hover"
//                     initial="hidden"
//                     animate="visible"
//                     transition={{ delay: index * 0.15 }}
//                   >
//                     {/* Enhanced Vendor Card */}
//                     <div 
//                       className="relative p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border-2 border-opacity-20"
//                       style={{ 
//                         backgroundColor: '#FFFFFF',
//                         borderColor: '#7A2E1D'
//                       }}
//                     >
//                       {/* Animated Gradient Overlay */}
//                       <motion.div 
//                         className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
//                         style={{
//                           background: `linear-gradient(135deg, #7A2E1D, #9B7A2F, #6B8E23)`
//                         }}
//                         animate={{
//                           backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
//                         }}
//                         transition={{
//                           duration: 3,
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                       />
                      
//                       {/* Category Badge */}
//                       <div 
//                         className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold"
//                         style={{ 
//                           backgroundColor: '#9B7A2F',
//                           color: '#FFFFFF'
//                         }}
//                       >
//                         {vendor.category}
//                       </div>

//                       {/* Logo Section with Enhanced Styling */}
//                       <motion.div
//                         className="relative z-10 mb-6 flex items-center justify-center"
//                         whileHover={{ 
//                           scale: 1.1,
//                           rotateY: 5
//                         }}
//                         transition={{ duration: 0.4 }}
//                       >
//                         <div 
//                           className="w-52 h-26 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg border-2"
//                           style={{ borderColor: '#DCD2C0' }}
//                         >
//                           <img
//                             src={vendor.logo}
//                             alt={`${vendor.name} logo`}
//                             className="max-w-full max-h-full object-contain"
//                           />
//                         </div>
//                       </motion.div>

//                       {/* Enhanced Vendor Info */}
//                       <div className="relative z-10">
//                         <h3 
//                           className="text-2xl font-bold mb-3 text-center"
//                           style={{ color: '#3E2C1B' }}
//                         >
//                           {vendor.name}
//                         </h3>

//                         {/* Products Icons Row */}
//                         <div className="flex justify-center mb-4 space-x-3">
//                           {vendor.products.slice(0, 3).map((product, idx) => (
//                             <motion.div
//                               key={idx}
//                               className="p-2 rounded-full"
//                               style={{ backgroundColor: '#F5EFE6' }}
//                               whileHover={{ scale: 1.2, rotate: 10 }}
//                               title={product}
//                             >
//                               <div style={{ color: '#7A2E1D' }}>
//                                 {productIcons[product.split(' ')[0]] || <FaLeaf className="w-5 h-5" />}
//                               </div>
//                             </motion.div>
//                           ))}
//                         </div>

//                         {/* Enhanced Rating */}
//                         <div className="flex justify-center mb-4">
//                           {[...Array(vendor.rating)].map((_, i) => (
//                             <motion.div
//                               key={i}
//                               initial={{ opacity: 0, scale: 0, rotate: -180 }}
//                               animate={{ opacity: 1, scale: 1, rotate: 0 }}
//                               transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
//                             >
//                               <FaStar 
//                                 className="w-5 h-5 mx-1"
//                                 style={{ color: '#9B7A2F' }}
//                               />
//                             </motion.div>
//                           ))}
//                         </div>

//                         {/* Business Details */}
//                         <div className="mb-4 space-y-2 text-center">
//                           <div 
//                             className="text-sm font-medium"
//                             style={{ color: '#3E2C1B' }}
//                           >
//                             📍 {vendor.locations} • 🤝 {vendor.partnership}
//                           </div>
//                         </div>

//                         {/* Enhanced Testimonial */}
//                         <div className="relative">
//                           <motion.div
//                             className="absolute -top-3 -left-3"
//                             animate={{ scale: [1, 1.2, 1] }}
//                             transition={{ duration: 2, repeat: Infinity }}
//                           >
//                             <FaQuoteLeft 
//                               className="w-6 h-6 opacity-30"
//                               style={{ color: '#7A2E1D' }}
//                             />
//                           </motion.div>
//                           <p 
//                             className="italic leading-relaxed pl-6 text-center"
//                             style={{ color: '#3E2C1B' }}
//                           >
//                             "{vendor.testimonial}"
//                           </p>
//                         </div>
//                       </div>

//                       {/* Animated Border Effect */}
//                       <motion.div 
//                         className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                         style={{
//                           background: `linear-gradient(45deg, #7A2E1D, #9B7A2F, #6B8E23, #7A2E1D)`,
//                           backgroundSize: '300% 300%',
//                           padding: '3px'
//                         }}
//                         animate={{
//                           backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           ease: "linear"
//                         }}
//                       >
//                         <div 
//                           className="w-full h-full rounded-3xl"
//                           style={{ backgroundColor: '#FFFFFF' }}
//                         />
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Enhanced Slide Indicators */}
//           <div className="flex justify-center mt-12 space-x-4">
//             {Array.from({ length: Math.ceil(vendors.length / 3) }).map((_, index) => (
//               <motion.button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`h-3 rounded-full transition-all duration-500 ${
//                   currentSlide === index ? 'w-12' : 'w-3'
//                 }`}
//                 style={{
//                   backgroundColor: currentSlide === index ? '#7A2E1D' : '#DCD2C0'
//                 }}
//                 whileHover={{ scale: 1.2 }}
//                 whileTap={{ scale: 0.9 }}
//               />
//             ))}
//           </div>
//         </motion.div>

       
//       </div>
//     </div>
//   );
// };

// export default ClientLogosShowcase;