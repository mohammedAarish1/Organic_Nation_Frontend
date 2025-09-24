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
  Utensils
} from 'lucide-react';

const ProductAdditionalInfo = memo(({ productInfo }) => {
  const [activeSection, setActiveSection] = useState('features');
  const [isExpanded, setIsExpanded] = useState(false);

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

  const truncatedDescription = productInfo.description.slice(0, 200) + "...";

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 mb-8 shadow-lg border border-orange-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-custom-gradient rounded-2xl flex items-center justify-center shadow-lg">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-1xl sm:text-2xl font-bold text-[var(--themeColor)] mb-1">Product Description</h2>
            <p className="text-sm text-[var(--text-color)]">Traditional • Authentic • Premium Quality</p>
          </div>
        </div>

        {/* Description */}
        <div className="relative">
          <p className=" mb-4 text-[#3E2C1B]">
            {isExpanded ? productInfo.description : truncatedDescription}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium transition-colors duration-200"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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

      {/* Tabbed Content */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveSection('features')}
            className={`flex-1 px-4 py-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeSection === 'features'
                ? 'text-orange-700 border-b-3 border-orange-600 bg-white'
                : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
          >
            <Star size={16} />
            Why Organic Nation ?
          </button>
          <button
            onClick={() => setActiveSection('usage')}
            className={`flex-1 px-4 py-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeSection === 'usage'
                ? 'text-orange-700 border-b-3 border-orange-600 bg-white'
                : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
          >
            <Utensils size={16} />
            Usage & Serving
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {activeSection === 'features' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[var(--background-color)] rounded-2xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[var(--themeColor)]" />
                </div>
                <h3 className="text-xl italic text-gray-800">Why to choose our products ?</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productInfo.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--background-color)] hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-4 h-4 text-[var(--themeColor)]" />
                    </div>
                    <p className="text-gray-800 text-sm leading-relaxed font-medium">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'usage' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[var(--background-color)] rounded-2xl flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-[var(--themeColor)]" />
                </div>
                <h3 className="text-xl italic text-gray-800">How to Enjoy</h3>
              </div>

              <div className="space-y-4">
                {productInfo.usage.map((use, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--background-color)] hover:from-amber-100 hover:to-orange-100 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-amber-800 font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>
                    <p className="text-gray-800 text-sm leading-relaxed font-medium">{use}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quality Badge */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-custom-gradient text-white px-6 py-3 rounded-full shadow-lg">
          <Shield className="w-5 h-5" />
          <span className="font-semibold text-sm">Premium Quality Guaranteed</span>
        </div>
      </div>
    </div>
  );
});


export default ProductAdditionalInfo;