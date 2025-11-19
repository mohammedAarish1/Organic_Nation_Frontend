import { lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SEO from '../../helper/SEO/SEO';
import Loader from '../../components/common/Loader'
import ProductShare from '../../components/module/product-details/ProductShare';
import ProductDetailsPage from './ProductDetailsPage';

const YouMayAlsoLike = lazy(() => import('../../components/module/product-details/YouMayAlsoLike'));
// const SingleReview = lazy(() => import('../../components/reviews/SingleReview'));
const ReviewsAndRatings = lazy(() => import('../../helper/ReviewsAndRatings'));
const ReviewSection = lazy(() => import('./ReviewSection'));
const ProductAdditionalInfo = lazy(() => import('../../components/module/product-details/ProductAdditionalInfo'));

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const ProductDetails = () => {
  const { nameUrl } = useParams();
  const [product, setProduct] = useState(null);
  const [curProductSeoData, setProductSeoData] = useState({});

  const getProductDetail = async (nameUrl) => {

    try {
      const response = await axios.get(`${apiUrl}/products/product/details/${nameUrl}`);
      if (response.status === 200) {
        setProductSeoData(response.data.seoData)
        setProduct(response.data);
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getProductDetail(nameUrl)

  }, [nameUrl]);

  if (!product) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <div className='loader'></div>
      </div>
    )
  }
  return (
    <div>
      <SEO
        title={curProductSeoData?.title || ''}
        description={curProductSeoData?.description || ''}
        keywords={curProductSeoData?.keywords || ''}
        canonicalUrl={curProductSeoData?.canonicalUrl || ''}
        ogTitle={curProductSeoData?.title || ''}
        ogDescription={curProductSeoData?.description || ''}
        ogUrl={curProductSeoData?.canonicalUrl || ''}
        ogImage={curProductSeoData?.image || ''}
        ogImageWidth="478"
        ogImageHeight="446"
        twitterTitle={curProductSeoData?.title || ''}
        twitterDescription={curProductSeoData?.description || ''}
        twitterImage={curProductSeoData?.image || ''}
        twitterSite="Organic Nation"
        twitterCreator="organicnation_"
      />

      {/* <div>
        <OfferBanner />
      </div> */}
      <div style={{ backgroundColor: '#F5EFE6' }}>
        <section className='xs:py-5 py-5 '>
          <ProductDetailsPage product={product} />
        </section>

        <section className='xs:w-[80%] w-[100%] mx-auto'>
          <ProductShare
            url={window.location.href}
            title={`Hey I have found this amazing "${product.details?.name}". Check it out!`}
            description={product.details?.description}
          />
        </section>

        {/* ============== product general info=============  */}
        {product?.productInfo && (
          <Suspense fallback={<Loader height='300px' />}>
            <section className='pt-20'>
              <ProductAdditionalInfo productInfo={product?.productInfo} />
            </section>
          </Suspense>
        )}
        {/* <ProductAdditionalInfo productInfo={product?.productInfo} /> */}

        {/* =============== you may also like section ========== */}
        <Suspense fallback={<Loader height='300px' />}>
          <YouMayAlsoLike categoryUrl={product.details['category-url'].toLowerCase()} />
        </Suspense>

        {/* =============== product reviews and ratings ========== */}

        <section>
          <Suspense fallback={<Loader height='100px' />} >
            <ReviewSection product={product} />
          </Suspense>

          <div className=' xs:w-[80%] w-[90%] mt-10 mx-auto '>
            {/* ============add reviews =========== */}
            <Suspense fallback={<Loader height='200px' />}>
              <ReviewsAndRatings productName={nameUrl} insideProductDetails={true} />
            </Suspense>
          </div>
        </section>

      </div>
    </div>
  )
}

export default ProductDetails;

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   X,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   Star,
//   StarHalf,
//   Truck,
//   Shield,
//   RotateCcw,
//   Package,
//   CreditCard,
//   Smartphone,
//   Wallet,
//   Heart,
//   Share2,
//   Play,
//   CheckCircle,
//   Award,
//   Zap,
//   Plus,
//   Minus,
// } from "lucide-react";

// // Mock product data
// const mockProduct = {
//   details: {
//     name: "Premium Organic Coffee Beans - Dark Roast",
//     img: [
//       { lg: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800" },
//       {
//         lg: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
//       },
//       {
//         lg: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800",
//       },
//     ],
//     price: 599,
//     discount: 25,
//     weight: "500g",
//     category: "Beverages > Coffee > Beans",
//     availability: 50,
//     "category-url": "coffee",
//   },
//   productInfo: {
//     features: [
//       "100% Organic",
//       "Fair Trade Certified",
//       "Single Origin",
//       "Freshly Roasted",
//       "Eco-Friendly Packaging",
//       "Rich Aroma",
//     ],
//     description:
//       "Experience the rich, bold flavor of our premium organic coffee beans. Carefully sourced from sustainable farms and roasted to perfection, each bean delivers an exceptional coffee experience. Perfect for espresso, French press, or drip brewing.",
//     video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     additionalInfo: {
//       manufacturer: "Organic Nation Pvt Ltd",
//       shelfLife: "12 months from roasting date",
//       brand: "Organic Nation",
//       origin: "India (Coorg Region)",
//       fssaiLicense: "12345678901234",
//     },
//   },
//   averageRating: 4.5,
//   reviews: { length: 127 },
//   usps: [
//     "Farm Fresh & Hand-Picked",
//     "No Artificial Additives",
//     "Supports Local Farmers",
//   ],
// };

// // Reusable Components
// const StarRating = ({ rating, size = 20 }) => {
//   return (
//     <div className="flex items-center gap-1">
//       {[...Array(5)].map((_, i) => {
//         const filled = i < Math.floor(rating);
//         const half = i === Math.floor(rating) && rating % 1 !== 0;
//         return (
//           <div key={i}>
//             {filled ? (
//               <Star size={size} fill="#F59E0B" color="#F59E0B" />
//             ) : half ? (
//               <StarHalf size={size} fill="#F59E0B" color="#F59E0B" />
//             ) : (
//               <Star size={size} color="#D1D5DB" />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const FeatureIcon = ({ icon: Icon, title, color = "#7A2E1D" }) => (
//   <motion.div
//     className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm"
//     whileHover={{ y: -4, shadow: "0 8px 16px rgba(0,0,0,0.1)" }}
//   >
//     <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
//       <Icon size={24} style={{ color }} />
//     </div>
//     <span className="text-xs font-medium text-gray-700 text-center">
//       {title}
//     </span>
//   </motion.div>
// );

// const FAQItem = ({ question, answer, isOpen, onClick }) => (
//   <motion.div
//     className="border border-gray-200 rounded-xl overflow-hidden"
//     initial={false}
//   >
//     <button
//       onClick={onClick}
//       className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
//     >
//       <span className="font-semibold text-left text-gray-800">{question}</span>
//       {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//     </button>
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: "auto", opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="bg-gray-50"
//         >
//           <p className="px-6 py-4 text-gray-600">{answer}</p>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   </motion.div>
// );

// // Main Component
// const ProductDetails = () => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [qty, setQty] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [openFAQ, setOpenFAQ] = useState(0);
//   const [showAllFAQs, setShowAllFAQs] = useState(false);
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [isSticky, setIsSticky] = useState(false);
//   const stickyRef = useRef(null);



//   const [selectedRatingFilter, setSelectedRatingFilter] = useState('all');
// const [selectedTagFilter, setSelectedTagFilter] = useState('all');


//   const product = mockProduct;
//   const finalPrice = Math.round(
//     product.details.price -
//       (product.details.price * product.details.discount) / 100
//   );

//   const faqs = [
//     {
//       question: "Is this product 100% organic?",
//       answer:
//         "Yes, our coffee beans are certified organic and grown without synthetic pesticides or fertilizers.",
//     },
//     {
//       question: "What is the best way to store coffee beans?",
//       answer:
//         "Store in an airtight container in a cool, dark place. Avoid refrigeration as it can introduce moisture.",
//     },
//     {
//       question: "How long does shipping take?",
//       answer:
//         "We typically ship within 24 hours. Delivery takes 3-5 business days depending on your location.",
//     },
//     {
//       question: "Can I return if I'm not satisfied?",
//       answer:
//         "Yes, we have a 7-day return policy. The product must be unopened and in original packaging.",
//     },
//     {
//       question: "Do you offer bulk discounts?",
//       answer:
//         "Yes! Contact our customer service for bulk order pricing and customization options.",
//     },
//   ];

//   const reviews = [
//     { platform: "Our Website", count: 127, rating: 4.5 },
//     { platform: "Amazon", count: 543, rating: 4.3 },
//     { platform: "Flipkart", count: 289, rating: 4.6 },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       if (stickyRef.current) {
//         const rect = stickyRef.current.getBoundingClientRect();
//         setIsSticky(rect.top <= 0);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const nextImage = () =>
//     setSelectedImage((prev) => (prev + 1) % product.details.img.length);
//   const prevImage = () =>
//     setSelectedImage(
//       (prev) =>
//         (prev - 1 + product.details.img.length) % product.details.img.length
//     );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Section - Product Overview */}
//       <div className="bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//             {/* Left - Image Gallery */}
//             <div className="space-y-4">
//               <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={selectedImage}
//                     src={product.details.img[selectedImage].lg}
//                     alt={product.details.name}
//                     className="w-full h-full object-cover cursor-pointer"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     onClick={() => setIsFullScreen(true)}
//                   />
//                 </AnimatePresence>

//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg"
//                 >
//                   <ChevronLeft size={24} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg"
//                 >
//                   <ChevronRight size={24} />
//                 </button>

//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 text-white text-sm font-medium">
//                   {selectedImage + 1} / {product.details.img.length}
//                 </div>
//               </div>

//               <div className="flex gap-3 overflow-x-auto pb-2">
//                 {product.details.img.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
//                       selectedImage === index
//                         ? "border-orange-500 ring-2 ring-orange-200"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     <img
//                       src={image.lg}
//                       alt=""
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Right - Product Info */}
//             <div className="flex flex-col h-full">
//               <div className="flex-1 overflow-y-auto">
//                 {/* Title */}
//                 <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//                   {product.details.name}
//                 </h1>

//                 {/* USPs */}
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {product.usps.map((usp, idx) => (
//                     <span
//                       key={idx}
//                       className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium flex items-center gap-1"
//                     >
//                       <CheckCircle size={16} />
//                       {usp}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Ratings */}
//                 <div className="flex items-center gap-4 mb-6 pb-6 border-b">
//                   <StarRating rating={product.averageRating} size={24} />
//                   <span className="text-xl font-semibold text-gray-900">
//                     {product.averageRating}
//                   </span>
//                   <span className="text-gray-600">
//                     ({product.reviews.length} reviews)
//                   </span>
//                 </div>

//                 {/* Net Content */}

//                 {/* Net Content & Price per Gram */}
//                 <div className="flex items-center gap-6 mb-6 pb-6 border-b">
//                   <div>
//                     <span className="text-sm text-gray-600 font-medium block">
//                       Net Content
//                     </span>
//                     <span className="text-lg font-semibold text-gray-900">
//                       {product.details.weight}
//                     </span>
//                   </div>
//                   <div className="h-10 w-px bg-gray-300"></div>
//                   <div>
//                     <span className="text-sm text-gray-600 font-medium block">
//                       Price per Gram
//                     </span>
//                     <span className="text-lg font-semibold text-gray-900">
//                       ₹
//                       {(finalPrice / parseInt(product.details.weight)).toFixed(
//                         2
//                       )}
//                       /g
//                     </span>
//                   </div>
//                 </div>

//                 {/* <div className="mb-6">
//                   <span className="text-sm text-gray-600 font-medium">
//                     Net Content:
//                   </span>
//                   <span className="ml-2 text-lg font-semibold text-gray-900">
//                     {product.details.weight}
//                   </span>
//                 </div> */}

//                 {/* Pricing */}

//                 {/* Pricing */}
//                 <div className="bg-orange-50 rounded-xl p-6 mb-6">
//                   <div className="flex items-center gap-4 mb-2">
//                     <span className="text-3xl font-bold text-gray-900">
//                       ₹{finalPrice}
//                     </span>
//                     <span className="text-xl text-gray-500 line-through">
//                       ₹{product.details.price}
//                     </span>
//                     <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-bold">
//                       {product.details.discount}% OFF
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600 mb-4">
//                     Inclusive of all taxes
//                   </p>

//                   {/* Shipping & COD Info */}
//                   <div className="flex flex-wrap gap-3 mb-4">
//                     <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">
//                       <Truck size={16} />
//                       <span className="font-medium">
//                         Free shipping on orders above ₹199
//                       </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">
//                       <Package size={16} />
//                       <span className="font-medium">COD available</span>
//                     </div>
//                   </div>

//                   {/* Trust Badges */}
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-orange-200">
//                     <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg">
//                       <Shield size={20} className="text-green-600" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         FSSAI
//                       </span>
//                       <span className="text-xs text-gray-500">Lic: 12345</span>
//                     </div>
//                     <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg">
//                       <CheckCircle size={20} className="text-green-600" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         Lab Tested
//                       </span>
//                       <span className="text-xs text-gray-500">Certified</span>
//                     </div>
//                     <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg">
//                       <Award size={20} className="text-green-600" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         100% Pure
//                       </span>
//                       <span className="text-xs text-gray-500">Verified</span>
//                     </div>
//                     <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg">
//                       <CreditCard size={20} className="text-blue-600" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         Secure
//                       </span>
//                       <span className="text-xs text-gray-500">Payment</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* <div className=" bg-gradient-to-b from-[#F5EFE6] via-white to-[#F5EFE6] rounded-xl p-4 mb-6">
//                   <div className="flex items-center gap-4 mb-2">
//                     <span className="text-3xl font-bold text-gray-900">
//                       ₹{finalPrice}
//                     </span>
//                     <span className="text-xl text-gray-500 line-through">
//                       ₹{product.details.price}
//                     </span>
//                     <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-bold">
//                       {product.details.discount}% OFF
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600">
//                     Inclusive of all taxes
//                   </p>
//                 </div> */}

//                 {/* Features with Icons */}
//                 <div className="mb-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                     Key Features
//                   </h3>
//                   <div className="grid grid-cols-3 gap-3">
//                     <FeatureIcon icon={Award} title="Certified Organic" />
//                     <FeatureIcon icon={Zap} title="Fresh Roasted" />
//                     <FeatureIcon icon={Shield} title="Quality Assured" />
//                   </div>
//                 </div>
//               </div>

//               {/* Sticky Add to Cart Section */}
//               {/* <div
//                 ref={stickyRef}
//                 className={`bg-white border-t pt-4 transition-all ${
//                   isSticky
//                     ? "fixed bottom-0 left-0 right-0 shadow-2xl z-40 px-4 py-4"
//                     : ""
//                 }`}
//               >
//                 <div className={isSticky ? "max-w-7xl mx-auto" : ""}>
//                   <div className="flex items-center gap-4 mb-4">
//                     <span className="font-semibold text-gray-700">
//                       Quantity:
//                     </span>
//                     <div className="flex items-center border border-gray-300 rounded-lg">
//                       <button
//                         onClick={() => setQty(Math.max(1, qty - 1))}
//                         className="px-4 py-2 hover:bg-gray-100 transition-colors"
//                       >
//                         <Minus size={18} />
//                       </button>
//                       <span className="px-6 py-2 font-semibold border-x">
//                         {qty}
//                       </span>
//                       <button
//                         onClick={() => setQty(qty + 1)}
//                         className="px-4 py-2 hover:bg-gray-100 transition-colors"
//                       >
//                         <Plus size={18} />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl shadow-lg transition-colors"
//                     >
//                       Add to Cart
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setIsWishlisted(!isWishlisted)}
//                       className="p-4 border-2 border-gray-300 rounded-xl hover:border-orange-500 transition-colors"
//                     >
//                       <Heart
//                         size={24}
//                         fill={isWishlisted ? "#EF4444" : "none"}
//                         color={isWishlisted ? "#EF4444" : "#6B7280"}
//                       />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="p-4 border-2 border-gray-300 rounded-xl hover:border-orange-500 transition-colors"
//                     >
//                       <Share2 size={24} color="#6B7280" />
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//                */}
//               {/* Sticky Add to Cart Section */}

//               {/* Sticky Add to Cart Section */}
//               <div>
//                 {/* Placeholder to maintain space when sticky */}
//                 <div
//                   ref={stickyRef}
//                   style={{ height: isSticky ? "180px" : "0px" }}
//                 />

//                 {/* Actual sticky content */}
//                 <div
//                   className={`bg-white border-t pt-4 transition-all duration-300 ${
//                     isSticky
//                       ? "fixed bottom-0 left-0 right-0 shadow-2xl z-40 px-4 py-4"
//                       : ""
//                   }`}
//                 >
//                   <div className={isSticky ? "max-w-7xl mx-auto" : ""}>
//                     <div className="flex items-center gap-4 mb-3">
//                       <span className="font-semibold text-gray-700">
//                         Quantity:
//                       </span>
//                       <div className="flex items-center border border-gray-300 rounded-lg">
//                         <button
//                           onClick={() => setQty(Math.max(1, qty - 1))}
//                           className="px-4 py-2 hover:bg-gray-100 transition-colors"
//                         >
//                           <Minus size={18} />
//                         </button>
//                         <span className="px-6 py-2 font-semibold border-x">
//                           {qty}
//                         </span>
//                         <button
//                           onClick={() => setQty(qty + 1)}
//                           className="px-4 py-2 hover:bg-gray-100 transition-colors"
//                         >
//                           <Plus size={18} />
//                         </button>
//                       </div>
//                     </div>

//                     <div className="flex gap-3 mb-3">
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-colors"
//                       >
//                         Add to Cart
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-colors"
//                       >
//                         Buy Now
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setIsWishlisted(!isWishlisted)}
//                         className="p-3.5 border-2 border-gray-300 rounded-xl hover:border-orange-500 transition-colors"
//                       >
//                         <Heart
//                           size={24}
//                           fill={isWishlisted ? "#EF4444" : "none"}
//                           color={isWishlisted ? "#EF4444" : "#6B7280"}
//                         />
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="p-3.5 border-2 border-gray-300 rounded-xl hover:border-orange-500 transition-colors"
//                       >
//                         <Share2 size={24} color="#6B7280" />
//                       </motion.button>
//                     </div>

//                     {/* Trust Line & Guarantee */}
//                     <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
//                       <div className="flex items-center gap-4 text-gray-600">
//                         <span className="flex items-center gap-1">
//                           <Shield size={16} className="text-green-600" />
//                           Secure payment
//                         </span>
//                         <span>·</span>
//                         <span className="flex items-center gap-1">
//                           <Truck size={16} className="text-blue-600" />
//                           Fast delivery
//                         </span>
//                         <span>·</span>
//                         <span className="flex items-center gap-1">
//                           <RotateCcw size={16} className="text-purple-600" />
//                           Easy returns
//                         </span>
//                       </div>
//                       <button className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
//                         <CheckCircle size={16} />
//                         7-Day Return Policy
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

// {/* Pincode Checker */}
// <div className="mb-6 mt-10">
//   <h3 className="text-sm font-semibold text-gray-900 mb-3">Check Delivery</h3>
//   <div className="flex gap-2">
//     <input
//       type="text"
//       placeholder="Enter pincode"
//       maxLength="6"
//       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//     />
//     <button className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
//       Check
//     </button>
//   </div>
// </div>

//               {/* <div>
//   <div ref={stickyRef} style={{ height: isSticky ? '120px' : '0px' }} />
  
//   <div 
//     className={`bg-white border-t pt-4 transition-all duration-300 ${
//       isSticky ? 'fixed bottom-0 left-0 right-0 shadow-2xl z-40 px-4 py-4' : ''
//     }`}
//   >
//     <div className={isSticky ? 'max-w-7xl mx-auto' : ''}>
//       <div className="flex items-center gap-4 mb-4">
//         <span className="font-semibold text-gray-700">Quantity:</span>
//         <div className="flex items-center border border-gray-300 rounded-lg">
//           <button
//             onClick={() => setQty(Math.max(1, qty - 1))}
//             className="px-4 py-2 hover:bg-gray-100 transition-colors"
//           >
//             <Minus size={18} />
//           </button>
//           <span className="px-6 py-2 font-semibold border-x">{qty}</span>
//           <button
//             onClick={() => setQty(qty + 1)}
//             className="px-4 py-2 hover:bg-gray-100 transition-colors"
//           >
//             <Plus size={18} />
//           </button>
//         </div>
//       </div>

//       <div className="flex gap-3">
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           className="flex-1 bg-[var(--themeColor)] hover:bg-orange-600 text-white font-semibold py-4 rounded-xl shadow-lg transition-colors"
//         >
//           Add to Cart
//         </motion.button>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setIsWishlisted(!isWishlisted)}
//           className="p-4 border-2 border-gray-300 rounded-xl hover:border-orange-500 transition-colors"
//         >
//           <Heart 
//             size={24} 
//             fill={isWishlisted ? "#EF4444" : "none"}
//             color={isWishlisted ? "#EF4444" : "#6B7280"}
//           />
//         </motion.button>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="p-4 border-2 border-gray-300 rounded-xl hover:border-orange-500 transition-colors"
//         >
//           <Share2 size={24} color="#6B7280" />
//         </motion.button>
//       </div>
//     </div>
//   </div>
// </div> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Video Section */}
//       <div className="bg-white mt-8 py-12 scroll-smooth">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
//             See It In Action
//           </h2>
//           <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
//             <div className="w-full h-full flex items-center justify-center">
//               <button className="p-6 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
//                 <Play size={48} color="white" fill="white" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product Description */}
//       <div className=" bg-gradient-to-b from-[#F5EFE6] via-white to-[#F5EFE6] py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-6">
//             Product Description
//           </h2>
//           <div className="bg-white rounded-2xl p-8 shadow-sm">
//             <p className="text-gray-700 leading-relaxed text-lg">
//               {product.productInfo.description}
//             </p>
//           </div>
//         </div>
//       </div>




// {/* Detailed Product Information */}
// <div className="bg-white py-12">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
//       {/* Health Benefits */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm"
//       >
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//             <Heart size={24} className="text-green-600" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900">Health Benefits</h3>
//         </div>
//         <ul className="space-y-3">
//           <li className="flex items-start gap-2">
//             <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
//             <span className="text-gray-700">Rich in antioxidants for cellular protection</span>
//           </li>
//           <li className="flex items-start gap-2">
//             <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
//             <span className="text-gray-700">Boosts immunity and overall wellness</span>
//           </li>
//           <li className="flex items-start gap-2">
//             <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
//             <span className="text-gray-700">100% chemical-free and natural</span>
//           </li>
//         </ul>
//       </motion.div>

//       {/* Taste & Texture */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay: 0.1 }}
//         className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-sm"
//       >
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
//             <Zap size={24} className="text-amber-600" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900">Taste & Texture</h3>
//         </div>
//         <ul className="space-y-3">
//           <li className="flex items-start gap-2">
//             <span className="text-amber-600 font-bold">•</span>
//             <span className="text-gray-700"><strong>Aroma:</strong> Rich, bold coffee fragrance</span>
//           </li>
//           <li className="flex items-start gap-2">
//             <span className="text-amber-600 font-bold">•</span>
//             <span className="text-gray-700"><strong>Color:</strong> Deep brown with natural oils</span>
//           </li>
//           <li className="flex items-start gap-2">
//             <span className="text-amber-600 font-bold">•</span>
//             <span className="text-gray-700"><strong>Texture:</strong> Smooth, full-bodied finish</span>
//           </li>
//         </ul>
//       </motion.div>

//       {/* Usage Instructions */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay: 0.2 }}
//         className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-sm"
//       >
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
//               <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
//               <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
//               <line x1="6" y1="1" x2="6" y2="4"></line>
//               <line x1="10" y1="1" x2="10" y2="4"></line>
//               <line x1="14" y1="1" x2="14" y2="4"></line>
//             </svg>
//           </div>
//           <h3 className="text-xl font-bold text-gray-900">How to Use</h3>
//         </div>
//         <ol className="space-y-3">
//           <li className="flex items-start gap-3">
//             <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
//             <span className="text-gray-700">Grind 2 tablespoons of beans per cup</span>
//           </li>
//           <li className="flex items-start gap-3">
//             <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
//             <span className="text-gray-700">Use hot water (90-96°C) for brewing</span>
//           </li>
//           <li className="flex items-start gap-3">
//             <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
//             <span className="text-gray-700">Steep for 3-4 minutes for best flavor</span>
//           </li>
//         </ol>
//       </motion.div>

//       {/* Storage Guidelines */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ delay: 0.3 }}
//         className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm"
//       >
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//             <Package size={24} className="text-purple-600" />
//           </div>
//           <h3 className="text-xl font-bold text-gray-900">Storage Guidelines</h3>
//         </div>
//         <ul className="space-y-3">
//           <li className="flex items-start gap-2">
//             <CheckCircle size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
//             <span className="text-gray-700">Store in airtight container</span>
//           </li>
//           <li className="flex items-start gap-2">
//             <CheckCircle size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
//             <span className="text-gray-700">Keep in cool, dry place away from sunlight</span>
//           </li>
//           <li className="flex items-start gap-2">
//             <CheckCircle size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
//             <span className="text-gray-700">Avoid refrigeration to prevent moisture</span>
//           </li>
//           <li className="flex items-start gap-2">
//             <CheckCircle size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
//             <span className="text-gray-700">Best consumed within 3 months of opening</span>
//           </li>
//         </ul>
//       </motion.div>

//     </div>

//     {/* Lab Details */}
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: 0.4 }}
//       className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 shadow-sm border border-gray-200"
//     >
//       <div className="flex items-start justify-between gap-4">
//         <div className="flex items-start gap-4">
//           <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
//             <Shield size={24} className="text-gray-700" />
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">Lab Tested & Certified</h3>
//             <p className="text-gray-700 mb-3">
//               Our products undergo rigorous third-party laboratory testing to ensure purity, quality, and safety. 
//               Each batch is tested for contaminants, pesticides, and heavy metals.
//             </p>
//             <div className="flex flex-wrap gap-2">
//               <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Pesticide Free</span>
//               <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Heavy Metal Tested</span>
//               <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Microbiological Safe</span>
//             </div>
//           </div>
//         </div>
//         <button className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
//           View Report
//         </button>
//       </div>
//     </motion.div>
//   </div>
// </div>





//       {/* Product Image Gallery */}
//       <div className="bg-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//             Product Gallery
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {product.details.img.map((image, idx) => (
//               <motion.div
//                 key={idx}
//                 whileHover={{ scale: 1.05 }}
//                 className="aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer"
//               >
//                 <img
//                   src={image.lg}
//                   alt={`Gallery ${idx + 1}`}
//                   className="w-full h-full object-cover"
//                   onClick={() => {
//                     setSelectedImage(idx);
//                     setIsFullScreen(true);
//                   }}
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* FAQs */}
//       <div className="bg-white py-12">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//             Frequently Asked Questions
//           </h2>
//           <div className="space-y-4">
//             {faqs.slice(0, showAllFAQs ? faqs.length : 4).map((faq, idx) => (
//               <FAQItem
//                 key={idx}
//                 question={faq.question}
//                 answer={faq.answer}
//                 isOpen={openFAQ === idx}
//                 onClick={() => setOpenFAQ(openFAQ === idx ? -1 : idx)}
//               />
//             ))}
//           </div>
//           {!showAllFAQs && faqs.length > 4 && (
//             <div className="text-center mt-6">
//               <button
//                 onClick={() => setShowAllFAQs(true)}
//                 className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
//               >
//                 View All FAQs
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Why Us Section */}
//       {/* <div className="bg-gradient-to-br from-orange-50 to-amber-50 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Us?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { icon: Award, title: "Premium Quality", desc: "Hand-picked and quality tested" },
//               { icon: Truck, title: "Fast Delivery", desc: "Quick shipping across India" },
//               { icon: Shield, title: "100% Authentic", desc: "Genuine organic products" }
//             ].map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 whileHover={{ y: -8 }}
//                 className="bg-white rounded-2xl p-8 text-center shadow-lg"
//               >
//                 <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <item.icon size={32} color="#F97316" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div> */}

//       {/* Why Us Section */}
//       <div className=" py-12  bg-gradient-to-b from-[#F5EFE6] via-white to-[#F5EFE6]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//             Why Choose Organic Nation?
//           </h2>

//           {/* Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//             {[
//               {
//                 icon: Award,
//                 title: "Premium Quality",
//                 desc: "Hand-picked and quality tested",
//                 color: "#F97316",
//               },
//               {
//                 icon: Truck,
//                 title: "Fast Delivery",
//                 desc: "Quick shipping across India",
//                 color: "#3B82F6",
//               },
//               {
//                 icon: Shield,
//                 title: "100% Authentic",
//                 desc: "Genuine organic products",
//                 color: "#10B981",
//               },
//             ].map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
//                 className="bg-white rounded-2xl p-8 text-center shadow-lg"
//               >
//                 <div
//                   className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
//                   style={{ backgroundColor: `${item.color}15` }}
//                 >
//                   <item.icon size={32} style={{ color: item.color }} />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>

//           {/* Additional Points */}
//           <div className="bg-white rounded-2xl p-8 shadow-lg">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {[
//                 "Direct from farmers - Supporting local communities",
//                 "Certified organic by trusted authorities",
//                 "Eco-friendly and sustainable packaging",
//                 "No harmful chemicals or pesticides",
//                 "Fresh roasting ensures maximum flavor",
//                 "Rigorous quality checks at every step",
//               ].map((point, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors"
//                 >
//                   <CheckCircle
//                     size={20}
//                     className="text-green-600 flex-shrink-0 mt-0.5"
//                   />
//                   <span className="text-gray-700 font-medium">{point}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Ratings & Reviews */}
//       {/* <div className="bg-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">Ratings & Reviews</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             {reviews.map((review, idx) => (
//               <div key={idx} className="bg-gray-50 rounded-xl p-6 text-center">
//                 <h3 className="font-semibold text-gray-900 mb-2">{review.platform}</h3>
//                 <StarRating rating={review.rating} size={20} />
//                 <p className="text-2xl font-bold text-gray-900 mt-2">{review.rating}</p>
//                 <p className="text-sm text-gray-600">{review.count} reviews</p>
//               </div>
//             ))}
//           </div>

//           <div className="flex gap-4 justify-center">
//             <button
//               onClick={() => setShowReviewModal(true)}
//               className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
//             >
//               Write a Review
//             </button>
//             <button className="px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-colors">
//               View All Reviews
//             </button>
//           </div>
//         </div>
//       </div> */}

//       {/* Ratings & Reviews */}
//       <div className="bg-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-8">
//             Customer Reviews
//           </h2>

//           {/* Review Stats */}
//           <div className=" bg-gradient-to-b from-[#F5EFE6] via-white to-[#F5EFE6] rounded-2xl p-8 mb-8">
//             <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//               <div className="text-center">
//                 <div className="text-5xl font-bold text-gray-900 mb-2">
//                   {product.averageRating}
//                 </div>
//                 <StarRating rating={product.averageRating} size={24} />
//                 <p className="text-gray-600 mt-2">
//                   Based on {product.reviews.length} reviews
//                 </p>
//               </div>
//               <div className="flex gap-4">
//                 <button
//                   onClick={() => setShowReviewModal(true)}
//                   className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
//                 >
//                   Write a Review
//                 </button>
//               </div>
//             </div>
//           </div>


// {/* Individual Reviews with Filters */}
// <div className="mb-8">
//   {/* Filters */}
//   <div className="bg-gray-50 rounded-xl p-4 mb-6">
//     <div className="flex flex-col sm:flex-row gap-4">
//       {/* Rating Filter */}
//       <div className="flex-1">
//         <label className="text-sm font-semibold text-gray-700 mb-2 block">Filter by Rating</label>
//         <div className="flex flex-wrap gap-2">
//           {['all', '5', '4', '3', '2', '1'].map((rating) => (
//             <button
//               key={rating}
//               onClick={() => setSelectedRatingFilter(rating)}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 selectedRatingFilter === rating
//                   ? 'bg-orange-500 text-white'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
//               }`}
//             >
//               {rating === 'all' ? 'All' : `${rating} ★`}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Tag Filter */}
//       <div className="flex-1">
//         <label className="text-sm font-semibold text-gray-700 mb-2 block">Filter by Tags</label>
//         <div className="flex flex-wrap gap-2">
//           {['all', 'Taste', 'Packaging', 'Texture', 'Purity'].map((tag) => (
//             <button
//               key={tag}
//               onClick={() => setSelectedTagFilter(tag)}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 selectedTagFilter === tag
//                   ? 'bg-orange-500 text-white'
//                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
//               }`}
//             >
//               {tag}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Reviews List */}
//   <div className="space-y-6">
//     {[
//       {
//         name: "Priya Sharma",
//         rating: 5,
//         date: "2 weeks ago",
//         title: "Absolutely Amazing Quality!",
//         review: "This coffee is exceptional! The aroma is incredible and the taste is so rich and smooth. I've tried many brands but this one stands out. Highly recommend for coffee lovers!",
//         verified: true,
//         tags: ["Taste", "Purity"],
//         images: ["https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400", "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400"],
//         hasVideo: false
//       },
//       {
//         name: "Rahul Verma",
//         rating: 4,
//         date: "1 month ago",
//         title: "Great Product, Fast Delivery",
//         review: "Very happy with my purchase. The packaging was excellent and delivery was quick. The coffee beans are fresh and flavorful. Will definitely buy again.",
//         verified: true,
//         tags: ["Packaging", "Texture"],
//         images: [],
//         hasVideo: true
//       },
//       {
//         name: "Anita Desai",
//         rating: 5,
//         date: "3 weeks ago",
//         title: "Best Organic Coffee",
//         review: "I'm very particular about organic products and this exceeded my expectations. The taste is authentic and you can tell it's genuinely organic. Worth every penny!",
//         verified: true,
//         tags: ["Taste", "Purity"],
//         images: ["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400"],
//         hasVideo: false
//       }
//     ].map((review, idx) => (
//       <motion.div
//         key={idx}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: idx * 0.1 }}
//         className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
//       >
//         <div className="flex items-start justify-between mb-3">
//           <div className="flex-1">
//             <div className="flex items-center gap-2 mb-1">
//               <h4 className="font-semibold text-gray-900">{review.name}</h4>
//               {review.verified && (
//                 <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
//                   <CheckCircle size={12} />
//                   Verified
//                 </span>
//               )}
//             </div>
//             <div className="flex items-center gap-3 mb-2">
//               <StarRating rating={review.rating} size={16} />
//               <span className="text-sm text-gray-500">{review.date}</span>
//             </div>
//             {/* Tags */}
//             <div className="flex flex-wrap gap-2 mb-3">
//               {review.tags.map((tag, tagIdx) => (
//                 <span key={tagIdx} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//         <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
//         <p className="text-gray-700 leading-relaxed mb-4">{review.review}</p>
        
//         {/* Images & Videos */}
//         {(review.images.length > 0 || review.hasVideo) && (
//           <div className="flex gap-3 flex-wrap">
//             {review.images.map((img, imgIdx) => (
//               <div key={imgIdx} className="w-24 h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
//                 <img src={img} alt="Review" className="w-full h-full object-cover" />
//               </div>
//             ))}
//             {review.hasVideo && (
//               <div className="w-24 h-24 rounded-lg overflow-hidden bg-black cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center">
//                 <Play size={32} color="white" fill="white" />
//               </div>
//             )}
//           </div>
//         )}
//       </motion.div>
//     ))}
//   </div>
// </div>



//           {/* Individual Reviews */}
//           <div className="space-y-6 mb-8">
//             {[
//               {
//                 name: "Priya Sharma",
//                 rating: 5,
//                 date: "2 weeks ago",
//                 title: "Absolutely Amazing Quality!",
//                 review:
//                   "This coffee is exceptional! The aroma is incredible and the taste is so rich and smooth. I've tried many brands but this one stands out. Highly recommend for coffee lovers!",
//                 verified: true,
//               },
//               {
//                 name: "Rahul Verma",
//                 rating: 4,
//                 date: "1 month ago",
//                 title: "Great Product, Fast Delivery",
//                 review:
//                   "Very happy with my purchase. The packaging was excellent and delivery was quick. The coffee beans are fresh and flavorful. Will definitely buy again.",
//                 verified: true,
//               },
//               {
//                 name: "Anita Desai",
//                 rating: 5,
//                 date: "3 weeks ago",
//                 title: "Best Organic Coffee",
//                 review:
//                   "I'm very particular about organic products and this exceeded my expectations. The taste is authentic and you can tell it's genuinely organic. Worth every penny!",
//                 verified: true,
//               },
//             ].map((review, idx) => (
//               <motion.div
//                 key={idx}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-start justify-between mb-3">
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <h4 className="font-semibold text-gray-900">
//                         {review.name}
//                       </h4>
//                       {review.verified && (
//                         <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
//                           <CheckCircle size={12} />
//                           Verified
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <StarRating rating={review.rating} size={16} />
//                       <span className="text-sm text-gray-500">
//                         {review.date}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <h5 className="font-semibold text-gray-900 mb-2">
//                   {review.title}
//                 </h5>
//                 <p className="text-gray-700 leading-relaxed">{review.review}</p>
//               </motion.div>
//             ))}
//           </div>

//           {/* View All Reviews Button */}
//           <div className="text-center">
//             <button className="px-8 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-colors">
//               View All {product.reviews.length} Reviews
//             </button>
//           </div>

//           {/* Other Platform Reviews */}
//           <div className="mt-12 pt-8 border-t">
//             <h3 className="text-xl font-bold text-gray-900 mb-6">
//               Reviews from Other Platforms
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {reviews.map((review, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-gray-50 rounded-xl p-6 text-center"
//                 >
//                   <h4 className="font-semibold text-gray-900 mb-2">
//                     {review.platform}
//                   </h4>
//                   <StarRating rating={review.rating} size={18} />
//                   <p className="text-2xl font-bold text-gray-900 mt-2">
//                     {review.rating}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {review.count} reviews
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Additional Info */}
//       <div className=" bg-gradient-to-b from-[#F5EFE6] via-white to-[#F5EFE6] py-12">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-6">
//             Additional Information
//           </h2>
//           <div className="bg-white rounded-2xl p-8 shadow-sm">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {Object.entries(product.productInfo.additionalInfo).map(
//                 ([key, value]) => (
//                   <div
//                     key={key}
//                     className="flex justify-between items-center border-b pb-4"
//                   >
//                     <span className="font-semibold text-gray-700 capitalize">
//                       {key.replace(/([A-Z])/g, " $1").trim()}:
//                     </span>
//                     <span className="text-gray-900">{value}</span>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Service Highlights */}
//       <div className="bg-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
//               <Truck size={48} className="mx-auto mb-4 text-blue-600" />
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 Free Shipping
//               </h3>
//               <p className="text-gray-600">On orders above ₹500</p>
//             </div>
//             <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
//               <Package size={48} className="mx-auto mb-4 text-green-600" />
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 COD Available
//               </h3>
//               <p className="text-gray-600">Pay on delivery option</p>
//             </div>
//             <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
//               <RotateCcw size={48} className="mx-auto mb-4 text-purple-600" />
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 Easy Returns
//               </h3>
//               <p className="text-gray-600">7-day return policy</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Payment Options */}
//       {/* <div className="bg-gray-50 py-12">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Accepted Payment Methods</h2>
//           <div className="bg-white rounded-2xl p-8 shadow-sm">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {[
//                 { icon: CreditCard, label: "Credit Card" },
//                 { icon: CreditCard, label: "Debit Card" },
//                 { icon: Smartphone, label: "UPI" },
//                 { icon: Wallet, label: "Wallets" }
//               ].map((payment, idx) => (
//                 <div key={idx} className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl">
//                   <payment.icon size={32} color="#6B7280" />
//                   <span className="text-sm font-medium text-gray-700">{payment.label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div> */}

//       {/* Payment Options */}
//       <div className="bg-gray-50 py-8">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
//             We Accept
//           </h3>
//           <div className="bg-white rounded-xl p-4 shadow-sm">
//             <div className="flex flex-wrap justify-center items-center gap-4">
//               {[
//                 { icon: CreditCard, label: "Cards" },
//                 { icon: Smartphone, label: "UPI" },
//                 { icon: Wallet, label: "Wallets" },
//                 { icon: Package, label: "COD" },
//               ].map((payment, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg"
//                 >
//                   <payment.icon size={20} color="#6B7280" />
//                   <span className="text-sm font-medium text-gray-700">
//                     {payment.label}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Review Modal */}
//       <AnimatePresence>
//         {showReviewModal && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//             onClick={() => setShowReviewModal(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-2xl font-bold text-gray-900">
//                   Write a Review
//                 </h3>
//                 <button
//                   onClick={() => setShowReviewModal(false)}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Your Rating
//                   </label>
//                   <div className="flex gap-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         className="hover:scale-110 transition-transform"
//                       >
//                         <Star size={32} color="#F59E0B" />
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Your Name
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     placeholder="Enter your name"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Review Title
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     placeholder="Summarize your experience"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Your Review
//                   </label>
//                   <textarea
//                     rows={5}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     placeholder="Share your thoughts about the product..."
//                   />
//                 </div>

//                 <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-xl transition-colors">
//                   Submit Review
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Fullscreen Image Modal */}
//       <AnimatePresence>
//         {isFullScreen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
//             onClick={() => setIsFullScreen(false)}
//           >
//             <button
//               onClick={() => setIsFullScreen(false)}
//               className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full"
//             >
//               <X size={24} color="white" />
//             </button>
//             <img
//               src={product.details.img[selectedImage].lg}
//               alt={product.details.name}
//               className="max-w-full max-h-full object-contain rounded-xl"
//               onClick={(e) => e.stopPropagation()}
//             />
//             <button
//               onClick={prevImage}
//               className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full"
//             >
//               <ChevronLeft size={24} color="white" />
//             </button>
//             <button
//               onClick={nextImage}
//               className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full"
//             >
//               <ChevronRight size={24} color="white" />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ProductDetails;
