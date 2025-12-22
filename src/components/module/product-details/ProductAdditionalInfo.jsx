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
//       iconColor: 'var(--secondary-color)',
//       bgColor: 'var(--background-color)',
//       borderColor: 'var(--secondary-color)',
//       items: productInfo.whyUs
//     },
//     {
//       id: 'usage',
//       title: 'Usage & Serving',
//       subtitle: 'Creative ways to enjoy our products',
//       icon: ChefHat,
//       iconColor: 'var(--accent-color)',
//       bgColor: 'var(--background-color)',
//       borderColor: 'var(--accent-color)',
//       items: productInfo.usage
//     }
//   ];

//   const truncatedDescription = productInfo.description.slice(0, 200) + "...";

//   const toggleAccordion = (sectionId) => {
//     setOpenAccordion(openAccordion === sectionId ? null : sectionId);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8" style={{ backgroundColor: 'var(--background-color)' }}>
//       {/* Header Section */}
//       <div className="bg-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden" style={{ borderColor: 'var(--neutral-color)', borderWidth: '1px' }}>
//         <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16 opacity-20" style={{ background: 'linear-gradient(135deg, var(--accent-color), transparent)' }}></div>
//         <div className="flex items-center gap-4 mb-6 relative z-10">
//           <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 bg-custom-gradient" >
//             <Leaf className="w-7 h-7 transform -rotate-3" style={{ color: 'var(--text-light-color)' }} />
//           </div>
//           <div>
//             <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-color)' }}>Product Description</h2>
//             <p className="text-xs xs:text-sm font-medium" style={{ color: 'var(--themeColor)' }}>Traditional • Authentic • Premium Quality</p>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="relative z-10">
//           <p className="mb-2 leading-relaxed text-base" style={{ color: 'var(--text-color)' }}>
//             {isExpanded ? productInfo.description : truncatedDescription}
//           </p>
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="inline-flex items-center gap-1 italic  font-medium  text-[var(--themeColor)]"

//           >
//             {isExpanded ? 'Show Less' : 'Read More'}
//             {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} className='mt-1' />}
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

//       {/* Accordion Sections */}
//       <div className="space-y-6 mb-8">
//         {accordionSections.map((section) => (
//           <div
//             key={section.id}
//             className="rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl border-[var(--themeColor)] border"
//             // style={{ borderColor: section.borderColor, borderWidth: '2px' }}
//           >
//             {/* Accordion Header */}
//             <button
//               onClick={() => toggleAccordion(section.id)}
//               className="w-full p-4 sm:p-8 text-left transition-all duration-300 hover:brightness-105 focus:outline-none focus:ring-4"
//               style={{
//                 backgroundColor: section.bgColor,
//                 focusRingColor: 'var(--themeColor)'
//               }}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transform ${openAccordion === section.id ? 'rotate-12 scale-110' : 'rotate-0 scale-100'} transition-all duration-300`}>
//                     <section.icon className="w-7 h-7" style={{ color: section.iconColor }} />
//                   </div>
//                   <div>
//                     <h3 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-color)' }}>{section.title}</h3>
//                     <p className="text-sm" style={{ color: 'var(--text-color)', opacity: 0.7 }}>{section.subtitle}</p>
//                   </div>
//                 </div>
//                 <div className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transform ${openAccordion === section.id ? 'rotate-180' : 'rotate-0'} transition-all duration-300`}>
//                   {openAccordion === section.id ?
//                     <Minus className="w-5 h-5" style={{ color: 'var(--text-color)' }} /> :
//                     <Plus className="w-5 h-5" style={{ color: 'var(--text-color)' }} />
//                   }
//                 </div>
//               </div>
//             </button>

//             {/* Accordion Content */}
//             <div className={`transition-all duration-500 ease-in-out ${openAccordion === section.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
//               <div className="bg-white p-6 sm:p-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
//                   {section.items.map((item, index) => (
//                     <div
//                       key={index}
//                       className={`group p-2 rounded-2xl ${section.bgColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-transparent hover:${section.borderColor}`}
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
//         <div className="inline-flex items-center gap-3 bg-custom-gradient text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
//           <Shield className="w-6 h-6" />
//           <span className="font-bold text-base">Premium Quality Guaranteed</span>
//           <Star className="w-5 h-5" />
//         </div>
//       </div>
//     </div>
//   );
// });

// export default ProductAdditionalInfo

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";

const AccordionListItem = ({ title, content, isOpen, onClick }) => (
  <motion.div
    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
    initial={false}
  >
    <button
      onClick={onClick}
      className="w-full px-5 py-3.5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
    >
      <span className="font-semibold text-left text-gray-800 text-lg">
        {title}
      </span>
      {isOpen ? (
        <ChevronUp size={20} className="text-orange-500" />
      ) : (
        <ChevronDown size={20} className="text-gray-500" />
      )}
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white"
        >
          <div className="px-5 py-4 text-gray-700 leading-relaxed">
            {Array.isArray(content)
              ? content.map((item, index) => (
                  <p key={index} className="mb-2 last:mb-0 italic">
                   -- {item}
                  </p>
                ))
              : content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const ProductAdditionalInfo = ({ productInfo }) => {
  const [openAccordion, setOpenAccordion] = useState(0); // For dropdowns

  const productDescriptionSections = useMemo(() => {
    const sections = [
      {
        id: 1,
        title: "Product Description",
        content: productInfo?.description,
      },
      {
        id: 2,
        title: "Health Benefits",
        content: productInfo?.healthBenefits,
      },
      {
        id: 3,
        title: "Taste & Texture",
        content: productInfo?.tasteTexture,
      },
      {
        id: 4,
        title: "How to Use",
        content: productInfo?.howToUse,
      },
      {
        id: 5,
        title: "Storage Guidelines",
        content: productInfo?.storageGuidelines,
      },
    ];

    // Filter out sections where content is empty, null, or undefined
    return sections.filter((section) => section.content);
  }, [productInfo]);

  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
        Product Information
      </h2>
      <div className="space-y-4">
        {productDescriptionSections.map((section, index) => {
          if (section.content !== "")
            return (
              <AccordionListItem
                key={section.id}
                title={section.title}
                content={section.content}
                isOpen={openAccordion === section.id}
                onClick={() =>
                  setOpenAccordion(
                    openAccordion === section.id ? null : section.id
                  )
                }
              />
            );
        })}
      </div>
      {/* Caution Alert */}
      {productInfo.caution && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 rounded-r-2xl p-4 mt-4 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-500 text-sm leading-relaxed">
                {productInfo.caution}
              </p>
            </div>
          </div>
        </div>
      )}

          {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mb-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start flex-wrap sm:flex-nowrap justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Lab Tested & Certified
                      </h3>
                      <p className="text-gray-700 mb-3 sm:text-base text-sm">
                        Our products undergo rigorous third-party laboratory testing
                        to ensure purity, quality, and safety. Each batch is tested
                        for contaminants, pesticides, and heavy metals.
                      </p>
                      <div className="flex flex-wrap gap-2 sm:text-sm text-xs">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full  font-medium">
                          Pesticide Free
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full  font-medium">
                          Heavy Metal Tested
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full  font-medium">
                          Microbiological Safe
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-max">
                    <button className="px-4 py-2 w-full bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
                      View Report
                    </button>
                  </div>
                </div>
              </motion.div> */}
    </section>
  );
};

export default ProductAdditionalInfo;
