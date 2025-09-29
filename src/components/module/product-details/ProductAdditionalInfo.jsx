// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { CheckCircle, Leaf, Star } from 'lucide-react';

// const ProductAdditionalInfo = ({ data }) => {
//   const [activeTab, setActiveTab] = useState(0);
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const tabVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { 
//       opacity: 1, 
//       x: 0,
//       transition: { duration: 0.3 }
//     }
//   };

//   const contentVariants = {
//     hidden: { opacity: 0, y: 20, scale: 0.95 },
//     visible: { 
//       opacity: 1, 
//       y: 0, 
//       scale: 1,
//       transition: { duration: 0.4, ease: "easeOut" }
//     },
//     exit: { 
//       opacity: 0, 
//       y: -20, 
//       scale: 0.95,
//       transition: { duration: 0.2 }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -10 },
//     visible: (i) => ({
//       opacity: 1,
//       x: 0,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.3,
//         ease: "easeOut"
//       }
//     })
//   };

//   // Icon mapping for different tab types
//   const getTabIcon = (title) => {
//     const titleLower = title.toLowerCase();
//     if (titleLower.includes('Product Description') || titleLower.includes('benefit')) return CheckCircle;
//     if (titleLower.includes('Features & Benefits') || titleLower.includes('organic')) return Leaf;
//     if (titleLower.includes('usage') || titleLower.includes('rating')) return Star;
//     return Leaf;
//   };

//   return (
//     <motion.div 
//       className="xs:w-[80%] w-[90%] mx-auto rounded-3xl overflow-hidden shadow-2xl mb-12"
//       style={{ backgroundColor: '#FFFFFF' }}
//       // variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(122, 46, 29, 0.1)" }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Tab Headers */}
//       <div className="flex border-b-2" style={{ borderColor: '#DCD2C0', backgroundColor: '#F5EFE6' }}>
//         {data.productInfo.map((tab, index) => {
//           const IconComponent = getTabIcon(tab.title);
//           return (
//             <motion.button
//               key={tab.title}
//               onClick={() => setActiveTab(index)}
//               className={`flex-1 xs:px-6 px-2 py-5 text-sm font-semibold transition-all duration-300 relative flex items-center justify-center space-x-2 group
//                 ${activeTab === index 
//                   ? 'text-white shadow-lg' 
//                   : 'hover:shadow-md'
//                 }`}
//               style={{
//                 backgroundColor: activeTab === index ? '#7A2E1D' : 'transparent',
//                 color: activeTab === index ? '#FFFFFF' : '#7A2E1D'
//               }}
//               variants={tabVariants}
//               whileHover={{ 
//                 scale: 1.02,
//                 backgroundColor: activeTab === index ? '#9B7A2F' : '#DCD2C0',
//                 y: -2
//               }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <IconComponent className={`text-lg transition-all duration-300 ${
//                 activeTab === index ? 'text-white' : 'group-hover:scale-110'
//               }`} />
//               <span>{tab.title}</span>

//               {/* Active Tab Indicator */}
//               {activeTab === index && (
//                 <motion.div
//                   className="absolute bottom-0 -left-2 w-full h-1 rounded-t-full"
//                   style={{ backgroundColor: '#D87C45' }}
//                   layoutId="activeTab"
//                   transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                 />
//               )}
//             </motion.button>
//           );
//         })}
//       </div>

//       {/* Tab Content */}
//       <div className="p-8" style={{ backgroundColor: '#FFFFFF' }}>
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             // variants={contentVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="min-h-[200px]"
//           >
//             {typeof data.productInfo[activeTab].content === "string" ? (
//               <motion.div 
//                 className="prose max-w-none"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <motion.p 
//                   className="text-lg leading-relaxed"
//                   style={{ color: '#3E2C1B' }}
//                   whileHover={{ scale: 1.01 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   {data.productInfo[activeTab].content}
//                 </motion.p>
//               </motion.div>
//             ) : (
//               <motion.div className="space-y-4">
//                 {data.productInfo[activeTab].content.map((item, i) => (
//                   <motion.div
//                     key={i}
//                     className="flex items-start group p-4 rounded-xl transition-all duration-300 cursor-pointer"
//                     style={{ backgroundColor: '#F5EFE6' }}
//                     variants={itemVariants}
//                     initial="hidden"
//                     animate="visible"
//                     custom={i}
//                     whileHover={{
//                       scale: 1.02,
//                       backgroundColor: '#DCD2C0',
//                       x: 8,
//                       boxShadow: "0 8px 25px rgba(122, 46, 29, 0.1)"
//                     }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <motion.div 
//                       className="flex-shrink-0 w-3 h-3 mt-2 rounded-full mr-4 shadow-sm"
//                       style={{ backgroundColor: '#9B7A2F' }}
//                       whileHover={{ 
//                         scale: 1.2,
//                         backgroundColor: '#D87C45',
//                         boxShadow: "0 4px 12px rgba(155, 122, 47, 0.3)"
//                       }}
//                       transition={{ type: "spring", stiffness: 400, damping: 17 }}
//                     />
//                     <motion.span 
//                       className="text-base font-medium leading-relaxed"
//                       style={{ color: '#3E2C1B' }}
//                       whileHover={{ color: '#7A2E1D' }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {item}
//                     </motion.span>
//                   </motion.div>
//                 ))}

//                 {/* Decorative Element */}
//                 <motion.div
//                   className="mt-8 p-4 rounded-xl text-center"
//                   style={{ backgroundColor: '#F5EFE6' }}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.5 }}
//                   whileHover={{ 
//                     scale: 1.02,
//                     backgroundColor: '#DCD2C0'
//                   }}
//                 >
//                   <motion.div
//                     className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold"
//                     style={{ backgroundColor: '#9B7A2F', color: '#FFFFFF' }}
//                     animate={{
//                       scale: [1, 1.05, 1],
//                     }}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       repeatDelay: 3
//                     }}
//                   >
//                     <CheckCircle size={20} />
//                     <span>Premium Quality Assured</span>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Bottom Decorative Border */}
//       <motion.div
//         className="h-2 bg-gradient-to-r"
//         style={{
//           backgroundImage: 'linear-gradient(90deg, #9B7A2F 0%, #D87C45 50%, #7A2E1D 100%)'
//         }}
//         initial={{ scaleX: 0 }}
//         animate={{ scaleX: 1 }}
//         transition={{ delay: 0.8, duration: 0.6 }}
//       />
//     </motion.div>
//   );
// };

// export default ProductAdditionalInfo;


// secon d design 

// import { useState } from 'react';
// import { memo } from 'react';
// import {
//   Shield,
//   Leaf,
//   Clock,
//   MapPin,
//   AlertCircle,
//   ChefHat,
//   Star,
//   Package,
//   Calendar,
//   Building,
//   ChevronDown,
//   ChevronUp,
//   Heart,
//   Utensils
// } from 'lucide-react';

// const ProductAdditionalInfo = memo(({ productInfo }) => {
//   const [activeSection, setActiveSection] = useState('features');
//   const [isExpanded, setIsExpanded] = useState(false);

//   const infoCards = [
//     {
//       icon: Building,
//       label: "Brand",
//       value: productInfo.brand,
//       color: "text-amber-700"
//     },
//     {
//       icon: Package,
//       label: "Manufacturer",
//       value: productInfo.manufacturer,
//       color: "text-emerald-700"
//     },
//     {
//       icon: MapPin,
//       label: "Origin",
//       value: productInfo.countryOfOrigin,
//       color: "text-blue-700"
//     },
//     {
//       icon: Calendar,
//       label: "Shelf Life",
//       value: productInfo.shelfLife,
//       color: "text-purple-700"
//     }
//   ];

//   const truncatedDescription = productInfo.description.slice(0, 200) + "...";

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
//       {/* Header Section */}
//       <div className="bg-white rounded-3xl p-6 sm:p-8 mb-8 shadow-lg border border-orange-100">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-12 h-12 bg-custom-gradient rounded-2xl flex items-center justify-center shadow-lg">
//             <Leaf className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h2 className="text-1xl sm:text-2xl font-bold text-[var(--themeColor)] mb-1">Product Description</h2>
//             <p className="text-sm text-[var(--text-color)]">Traditional • Authentic • Premium Quality</p>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="relative">
//           <p className=" mb-4 text-[#3E2C1B]">
//             {isExpanded ? productInfo.description : truncatedDescription}
//           </p>
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium transition-colors duration-200"
//           >
//             {isExpanded ? 'Show Less' : 'Read More'}
//             {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//           </button>
//         </div>
//       </div>

//       {/* Info Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {infoCards.map((card, index) => (
//           card.value && (
//             <div
//               key={index}
//               className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group"
//             >
//               <div className="flex items-center gap-3 mb-2">
//                 <div className={`w-10 h-10 rounded-xl bg-[var(--background-color)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
//                   <card.icon className={`w-5 h-5 ${card.color}`} />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{card.label}</p>
//                   <p className="text-sm font-bold text-gray-800">{card.value}</p>
//                 </div>
//               </div>
//             </div>
//           )

//         ))}
//       </div>

//       {/* Caution Alert */}
//       {productInfo.caution && (
//         <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 rounded-r-2xl p-4 mb-8 shadow-sm">
//           <div className="flex items-start gap-3">
//             <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
//             <div>
//               {/* <p className="text-sm font-semibold text-red-800 mb-1">Important Notice</p> */}
//               <p className="text-red-500 text-sm leading-relaxed">{productInfo.caution}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Tabbed Content */}
//       <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
//         {/* Tab Navigation */}
//         <div className="flex border-b border-gray-200 bg-gray-50">
//           <button
//             onClick={() => setActiveSection('features')}
//             className={`flex-1 px-4 py-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeSection === 'features'
//                 ? 'text-orange-700 border-b-3 border-orange-600 bg-white'
//                 : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
//               }`}
//           >
//             <Star size={16} />
//             Why Organic Nation ?
//           </button>
//           <button
//             onClick={() => setActiveSection('usage')}
//             className={`flex-1 px-4 py-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeSection === 'usage'
//                 ? 'text-orange-700 border-b-3 border-orange-600 bg-white'
//                 : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
//               }`}
//           >
//             <Utensils size={16} />
//             Usage & Serving
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="p-6 sm:p-8">
//           {activeSection === 'features' && (
//             <div className="space-y-4">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 bg-[var(--background-color)] rounded-2xl flex items-center justify-center">
//                   <Shield className="w-5 h-5 text-[var(--themeColor)]" />
//                 </div>
//                 <h3 className="text-xl italic text-gray-800">Why to choose our products ?</h3>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {productInfo.whyUs.map((feature, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--background-color)] hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group"
//                   >
//                     <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
//                       <Heart className="w-4 h-4 text-[var(--themeColor)]" />
//                     </div>
//                     <p className="text-gray-800 text-sm leading-relaxed font-medium">{feature}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeSection === 'usage' && (
//             <div className="space-y-4">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 bg-[var(--background-color)] rounded-2xl flex items-center justify-center">
//                   <ChefHat className="w-5 h-5 text-[var(--themeColor)]" />
//                 </div>
//                 <h3 className="text-xl italic text-gray-800">How to Enjoy</h3>
//               </div>

//               <div className="space-y-4">
//                 {productInfo.usage.map((use, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--background-color)] hover:from-amber-100 hover:to-orange-100 transition-all duration-300 group"
//                   >
//                     <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-amber-800 font-bold text-sm group-hover:scale-110 transition-transform duration-300">
//                       {index + 1}
//                     </div>
//                     <p className="text-gray-800 text-sm leading-relaxed font-medium">{use}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Quality Badge */}
//       <div className="mt-8 text-center">
//         <div className="inline-flex items-center gap-2 bg-custom-gradient text-white px-6 py-3 rounded-full shadow-lg">
//           <Shield className="w-5 h-5" />
//           <span className="font-semibold text-sm">Premium Quality Guaranteed</span>
//         </div>
//       </div>
//     </div>
//   );
// });


// export default ProductAdditionalInfo;


// third design

// import { useState } from 'react';
// import { memo } from 'react';
// import {
//   Shield,
//   Leaf,
//   Clock,
//   MapPin,
//   AlertCircle,
//   ChefHat,
//   Star,
//   Package,
//   Calendar,
//   Building,
//   ChevronDown,
//   ChevronUp,
//   Heart,
//   Utensils,
//   Plus,
//   Minus
// } from 'lucide-react';

// const ProductAdditionalInfo = memo(({ productInfo }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [openAccordion, setOpenAccordion] = useState(null);

//   const infoCards = [
//     {
//       icon: Building,
//       label: "Brand",
//       value: productInfo.brand,
//       color: "text-amber-700"
//     },
//     {
//       icon: Package,
//       label: "Manufacturer",
//       value: productInfo.manufacturer,
//       color: "text-emerald-700"
//     },
//     {
//       icon: MapPin,
//       label: "Origin",
//       value: productInfo.countryOfOrigin,
//       color: "text-blue-700"
//     },
//     {
//       icon: Calendar,
//       label: "Shelf Life",
//       value: productInfo.shelfLife,
//       color: "text-purple-700"
//     }
//   ];

//   const accordionSections = [
//     {
//       id: 'whyUs',
//       title: 'Why Choose Organic Nation?',
//       subtitle: 'Discover what makes us special',
//       icon: Shield,
//       iconColor: 'text-emerald-600',
//       bgColor: 'bg-gradient-to-br from-emerald-50 to-green-50',
//       borderColor: 'border-emerald-200',
//       items: productInfo.whyUs
//     },
//     {
//       id: 'usage',
//       title: 'Usage & Serving Ideas',
//       subtitle: 'Creative ways to enjoy our products',
//       icon: ChefHat,
//       iconColor: 'text-orange-600',
//       bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
//       borderColor: 'border-orange-200',
//       items: productInfo.usage
//     }
//   ];

//   const truncatedDescription = productInfo.description.slice(0, 200) + "...";

//   const toggleAccordion = (sectionId) => {
//     setOpenAccordion(openAccordion === sectionId ? null : sectionId);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-orange-50/30 to-amber-50/30 min-h-screen">
//       {/* Header Section */}
//       <div className="bg-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl border border-orange-100 relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
//         <div className="flex items-center gap-4 mb-6 relative z-10">
//           <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
//             <Leaf className="w-7 h-7 text-white transform -rotate-3" />
//           </div>
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Product Description</h2>
//             <p className="text-sm text-orange-600 font-medium">Traditional • Authentic • Premium Quality</p>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="relative z-10">
//           <p className="text-gray-700 mb-6 leading-relaxed text-base">
//             {isExpanded ? productInfo.description : truncatedDescription}
//           </p>
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//           >
//             {isExpanded ? 'Show Less' : 'Read More'}
//             {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//           </button>
//         </div>
//       </div>

//       {/* Info Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {infoCards.map((card, index) => (
//           card.value && (
//             <div
//               key={index}
//               className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group hover:-translate-y-1"
//             >
//               <div className="flex flex-col items-center text-center gap-3">
//                 <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
//                   <card.icon className={`w-6 h-6 ${card.color}`} />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{card.label}</p>
//                   <p className="text-sm font-bold text-gray-800">{card.value}</p>
//                 </div>
//               </div>
//             </div>
//           )
//         ))}
//       </div>

//       {/* Caution Alert */}
//       {productInfo.caution && (
//         <div className="bg-gradient-to-r from-red-50 via-pink-50 to-orange-50 border border-red-200 rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-400 to-orange-400"></div>
//           <div className="flex items-start gap-4 pl-4">
//             <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
//               <AlertCircle className="w-5 h-5 text-red-600" />
//             </div>
//             <div>
//               <h4 className="text-sm font-semibold text-red-800 mb-2">Important Notice</h4>
//               <p className="text-red-700 text-sm leading-relaxed">{productInfo.caution}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Accordion Sections */}
//       <div className="space-y-6 mb-8">
//         {accordionSections.map((section) => (
//           <div
//             key={section.id}
//             className={`rounded-3xl overflow-hidden shadow-xl border-2 ${section.borderColor} transition-all duration-300 hover:shadow-2xl`}
//           >
//             {/* Accordion Header */}
//             <button
//               onClick={() => toggleAccordion(section.id)}
//               className={`w-full ${section.bgColor} p-6 sm:p-8 text-left transition-all duration-300 hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-orange-200`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transform ${openAccordion === section.id ? 'rotate-12 scale-110' : 'rotate-0 scale-100'} transition-all duration-300`}>
//                     <section.icon className={`w-7 h-7 ${section.iconColor}`} />
//                   </div>
//                   <div>
//                     <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{section.title}</h3>
//                     <p className="text-sm text-gray-600">{section.subtitle}</p>
//                   </div>
//                 </div>
//                 <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transform ${openAccordion === section.id ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}>
//                   {openAccordion === section.id ? 
//                     <Minus className="w-5 h-5 text-gray-600" /> : 
//                     <Plus className="w-5 h-5 text-gray-600" />
//                   }
//                 </div>
//               </div>
//             </button>

//             {/* Accordion Content */}
//             <div className={`transition-all duration-500 ease-in-out ${openAccordion === section.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
//               <div className="bg-white p-6 sm:p-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {section.items.map((item, index) => (
//                     <div
//                       key={index}
//                       className={`group p-4 rounded-2xl ${section.bgColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:${section.borderColor}`}
//                       style={{
//                         animationDelay: `${index * 100}ms`
//                       }}
//                     >
//                       <div className="flex items-start gap-4">
//                         <div className={`w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
//                           {section.id === 'whyUs' ? (
//                             <Heart className={`w-4 h-4 ${section.iconColor}`} />
//                           ) : (
//                             <span className={`text-xs font-bold ${section.iconColor}`}>{index + 1}</span>
//                           )}
//                         </div>
//                         <p className="text-gray-800 text-sm leading-relaxed font-medium flex-1">{item}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quality Badge */}
//       <div className="text-center">
//         <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//           <Shield className="w-6 h-6" />
//           <span className="font-bold text-base">Premium Quality Guaranteed</span>
//           <Star className="w-5 h-5" />
//         </div>
//       </div>
//     </div>
//   );
// });


// export default ProductAdditionalInfo



import { useState } from 'react';
import { memo } from 'react';
import {
  Shield,
  Leaf,
  Clock,
  MapPin,
  AlertCircle,
  ChefHat,
  Star,
  Package,
  Calendar,
  Building,
  ChevronDown,
  ChevronUp,
  Heart,
  Utensils,
  Plus,
  Minus
} from 'lucide-react';

const ProductAdditionalInfo = memo(({ productInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  const infoCards = [
    {
      icon: Building,
      label: "Brand",
      value: productInfo.brand,
      color: "text-amber-700"
    },
    {
      icon: Package,
      label: "Manufacturer",
      value: productInfo.manufacturer,
      color: "text-emerald-700"
    },
    {
      icon: MapPin,
      label: "Origin",
      value: productInfo.countryOfOrigin,
      color: "text-blue-700"
    },
    {
      icon: Calendar,
      label: "Shelf Life",
      value: productInfo.shelfLife,
      color: "text-purple-700"
    }
  ];

  const accordionSections = [
    {
      id: 'whyUs',
      title: 'Why Choose Organic Nation?',
      subtitle: 'Discover what makes us special',
      icon: Shield,
      iconColor: 'var(--secondary-color)',
      bgColor: 'var(--background-color)',
      borderColor: 'var(--secondary-color)',
      items: productInfo.whyUs
    },
    {
      id: 'usage',
      title: 'Usage & Serving',
      subtitle: 'Creative ways to enjoy our products',
      icon: ChefHat,
      iconColor: 'var(--accent-color)',
      bgColor: 'var(--background-color)',
      borderColor: 'var(--accent-color)',
      items: productInfo.usage
    }
  ];

  const truncatedDescription = productInfo.description.slice(0, 200) + "...";

  const toggleAccordion = (sectionId) => {
    setOpenAccordion(openAccordion === sectionId ? null : sectionId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* Header Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden" style={{ borderColor: 'var(--neutral-color)', borderWidth: '1px' }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16 opacity-20" style={{ background: 'linear-gradient(135deg, var(--accent-color), transparent)' }}></div>
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 bg-custom-gradient" >
            <Leaf className="w-7 h-7 transform -rotate-3" style={{ color: 'var(--text-light-color)' }} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-color)' }}>Product Description</h2>
            <p className="text-xs xs:text-sm font-medium" style={{ color: 'var(--themeColor)' }}>Traditional • Authentic • Premium Quality</p>
          </div>
        </div>

        {/* Description */}
        <div className="relative z-10">
          <p className="mb-2 leading-relaxed text-base" style={{ color: 'var(--text-color)' }}>
            {isExpanded ? productInfo.description : truncatedDescription}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 italic  font-medium  text-[var(--themeColor)]"

          >
            {isExpanded ? 'Show Less' : 'Read More'}
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} className='mt-1' />}
          </button>
        </div>
      </div>

      {/* Info Cards Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {infoCards.map((card, index) => (
          card.value && (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-xl bg-[var(--background-color)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{card.label}</p>
                  <p className="text-sm font-bold text-gray-800">{card.value}</p>
                </div>
              </div>
            </div>
          )

        ))}
      </div>


      {/* Caution Alert */}
      {productInfo.caution && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 rounded-r-2xl p-4 mb-8 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              {/* <p className="text-sm font-semibold text-red-800 mb-1">Important Notice</p> */}
              <p className="text-red-500 text-sm leading-relaxed">{productInfo.caution}</p>
            </div>
          </div>
        </div>
      )}


      {/* Accordion Sections */}
      <div className="space-y-6 mb-8">
        {accordionSections.map((section) => (
          <div
            key={section.id}
            className="rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl border-[var(--themeColor)] border"
            // style={{ borderColor: section.borderColor, borderWidth: '2px' }}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(section.id)}
              className="w-full p-4 sm:p-8 text-left transition-all duration-300 hover:brightness-105 focus:outline-none focus:ring-4"
              style={{
                backgroundColor: section.bgColor,
                focusRingColor: 'var(--themeColor)'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transform ${openAccordion === section.id ? 'rotate-12 scale-110' : 'rotate-0 scale-100'} transition-all duration-300`}>
                    <section.icon className="w-7 h-7" style={{ color: section.iconColor }} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-color)' }}>{section.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--text-color)', opacity: 0.7 }}>{section.subtitle}</p>
                  </div>
                </div>
                <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transform ${openAccordion === section.id ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}>
                  {openAccordion === section.id ?
                    <Minus className="w-5 h-5" style={{ color: 'var(--text-color)' }} /> :
                    <Plus className="w-5 h-5" style={{ color: 'var(--text-color)' }} />
                  }
                </div>
              </div>
            </button>

            {/* Accordion Content */}
            <div className={`transition-all duration-500 ease-in-out ${openAccordion === section.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <div className="bg-white p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className={`group p-2 rounded-2xl ${section.bgColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:${section.borderColor}`}
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                          {section.id === 'whyUs' ? (
                            <Heart className={`w-4 h-4 ${section.iconColor}`} />
                          ) : (
                            <span className={`text-xs font-bold ${section.iconColor}`}>{index + 1}</span>
                          )}
                        </div>
                        <p className="text-gray-800 text-sm leading-relaxed font-medium flex-1">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quality Badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-custom-gradient text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <Shield className="w-6 h-6" />
          <span className="font-bold text-base">Premium Quality Guaranteed</span>
          <Star className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
});


export default ProductAdditionalInfo