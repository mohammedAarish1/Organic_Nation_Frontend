// import React, { useState } from 'react';

// const ProductAdditionalInfo = ({data}) => {
//   const [activeTab, setActiveTab] = useState(0);

//   return (
//     <div className="xs:w-[80%] w-[90%] mx-auto bg-gradient-to-br from-white to-gray-50 rounded-xl overflow-hidden border-gray-100">

//       {/* Tab Headers */}
//       <div className="flex border-b bg-white">
//         {data.productInfo.map((tab, index) => (
//           <button
//             key={tab.title}
//             onClick={() => setActiveTab(index)}
//             className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-300 relative
//               ${activeTab === index 
//                 ? 'text-black '
//                 : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
//               }`}
//           >
//             {tab.title}
//             {activeTab === index && (
//               <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--themeColor)]" />
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="p-8 bg-white ">
//         {data.productInfo.map((tab, index) => (
//           <div
//             key={tab.title}
//             className={`transition-all duration-300 transform
//               ${activeTab === index 
//                 ? 'opacity-100 translate-y-0' 
//                 : 'opacity-0 translate-y-4 hidden'
//               }`}
//           >
//             {typeof tab.content === "string" ? (
//               <div className="prose max-w-none">
//                 <p className="text-gray-700 leading-relaxed">{tab.content}</p>
//               </div>
//             ) : (
//               <ul className="space-y-4">
//                 {tab.content.map((item, i) => (
//                   <li key={i} className="flex items-start group">
//                     <span className="flex-shrink-0 w-2 h-2 mt-2.5 rounded-full bg-[var(--themeColor)] mr-4 
//                       group-hover:bg-amber-500 transition-colors duration-200" />
//                     <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
//                       {item}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };


// export default ProductAdditionalInfo




import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaInfoCircle, FaLeaf, FaStar } from 'react-icons/fa';

const ProductAdditionalInfo = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  // Icon mapping for different tab types
  const getTabIcon = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('feature') || titleLower.includes('benefit')) return FaCheckCircle;
    if (titleLower.includes('ingredient') || titleLower.includes('organic')) return FaLeaf;
    if (titleLower.includes('review') || titleLower.includes('rating')) return FaStar;
    return FaInfoCircle;
  };

  return (
    <motion.div 
      className="xs:w-[80%] w-[90%] mx-auto rounded-3xl overflow-hidden shadow-2xl mb-12"
      style={{ backgroundColor: '#FFFFFF' }}
      // variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(122, 46, 29, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Tab Headers */}
      <div className="flex border-b-2" style={{ borderColor: '#DCD2C0', backgroundColor: '#F5EFE6' }}>
        {data.productInfo.map((tab, index) => {
          const IconComponent = getTabIcon(tab.title);
          return (
            <motion.button
              key={tab.title}
              onClick={() => setActiveTab(index)}
              className={`flex-1 xs:px-6 px-2 py-5 text-sm font-semibold transition-all duration-300 relative flex items-center justify-center space-x-2 group
                ${activeTab === index 
                  ? 'text-white shadow-lg' 
                  : 'hover:shadow-md'
                }`}
              style={{
                backgroundColor: activeTab === index ? '#7A2E1D' : 'transparent',
                color: activeTab === index ? '#FFFFFF' : '#7A2E1D'
              }}
              variants={tabVariants}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: activeTab === index ? '#9B7A2F' : '#DCD2C0',
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
            >
              <IconComponent className={`text-lg transition-all duration-300 ${
                activeTab === index ? 'text-white' : 'group-hover:scale-110'
              }`} />
              <span>{tab.title}</span>
              
              {/* Active Tab Indicator */}
              {activeTab === index && (
                <motion.div
                  className="absolute bottom-0 -left-2 w-full h-1 rounded-t-full"
                  style={{ backgroundColor: '#D87C45' }}
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-8" style={{ backgroundColor: '#FFFFFF' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            // variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-[200px]"
          >
            {typeof data.productInfo[activeTab].content === "string" ? (
              <motion.div 
                className="prose max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.p 
                  className="text-lg leading-relaxed"
                  style={{ color: '#3E2C1B' }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  {data.productInfo[activeTab].content}
                </motion.p>
              </motion.div>
            ) : (
              <motion.div className="space-y-4">
                {data.productInfo[activeTab].content.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start group p-4 rounded-xl transition-all duration-300 cursor-pointer"
                    style={{ backgroundColor: '#F5EFE6' }}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: '#DCD2C0',
                      x: 8,
                      boxShadow: "0 8px 25px rgba(122, 46, 29, 0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="flex-shrink-0 w-3 h-3 mt-2 rounded-full mr-4 shadow-sm"
                      style={{ backgroundColor: '#9B7A2F' }}
                      whileHover={{ 
                        scale: 1.2,
                        backgroundColor: '#D87C45',
                        boxShadow: "0 4px 12px rgba(155, 122, 47, 0.3)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    />
                    <motion.span 
                      className="text-base font-medium leading-relaxed"
                      style={{ color: '#3E2C1B' }}
                      whileHover={{ color: '#7A2E1D' }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.span>
                  </motion.div>
                ))}
                
                {/* Decorative Element */}
                <motion.div
                  className="mt-8 p-4 rounded-xl text-center"
                  style={{ backgroundColor: '#F5EFE6' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: '#DCD2C0'
                  }}
                >
                  <motion.div
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold"
                    style={{ backgroundColor: '#9B7A2F', color: '#FFFFFF' }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <FaCheckCircle />
                    <span>Premium Quality Assured</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Decorative Border */}
      <motion.div
        className="h-2 bg-gradient-to-r"
        style={{
          backgroundImage: 'linear-gradient(90deg, #9B7A2F 0%, #D87C45 50%, #7A2E1D 100%)'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
    </motion.div>
  );
};

export default ProductAdditionalInfo;