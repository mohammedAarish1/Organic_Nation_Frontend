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

// 2nd

// import  { useState, useRef, useEffect } from "react";
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
//       manufacturer: "Foodsbay India",
//       shelfLife: "12 months from roasting date",
//       brand: "Organic Nation",
//       origin: "India",
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

//   const [selectedRatingFilter, setSelectedRatingFilter] = useState("all");
//   const [selectedTagFilter, setSelectedTagFilter] = useState("all");

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
//                         Pure & Original
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

//                 {/* Sticky Add to Cart Section */}
//                 {/* <div
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

//                 {/* Available Offers */}
//                 <div className="mb-6">
//                   <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                     <motion.div
//                       animate={{ rotate: [0, -10, 10, -10, 0] }}
//                       transition={{
//                         duration: 1,
//                         repeat: Infinity,
//                         repeatDelay: 3,
//                       }}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="18"
//                         height="18"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="text-orange-500"
//                       >
//                         <path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5" />
//                         <path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.8 1.1z" />
//                       </svg>
//                     </motion.div>
//                     Available Offers
//                     <motion.span
//                       animate={{ scale: [1, 1.1, 1] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                       className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full"
//                     >
//                       HOT
//                     </motion.span>
//                   </h3>
//                   <div className="space-y-2">
//                     {[
//                       {
//                         tag: "BUNDLE",
//                         text: "FLAT 40% OFF on buying 2 or more items",
//                         code: null,
//                         highlight: true,
//                       },
//                       {
//                         tag: "BANK",
//                         text: "10% Instant Discount on HDFC Bank Cards",
//                         code: null,
//                         highlight: false,
//                       },
//                       {
//                         tag: "COUPON",
//                         text: "Use code ORGANIC15 for extra 15% off",
//                         code: "ORGANIC15",
//                         highlight: false,
//                       },
//                       {
//                         tag: "FREEBIE",
//                         text: "Free sample pack on orders above ₹999",
//                         code: null,
//                         highlight: false,
//                       },
//                     ].map((offer, idx) => (
//                       <motion.div
//                         key={idx}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: idx * 0.1 }}
//                         whileHover={{ scale: 1.02, x: 5 }}
//                         className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
//                           offer.highlight
//                             ? "bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-300 shadow-md"
//                             : "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
//                         }`}
//                       >
//                         <motion.span
//                           animate={
//                             offer.highlight ? { scale: [1, 1.1, 1] } : {}
//                           }
//                           transition={{
//                             duration: 1,
//                             repeat: Infinity,
//                             repeatDelay: 2,
//                           }}
//                           className={`px-2 py-0.5 text-white text-xs font-bold rounded flex-shrink-0 ${
//                             offer.highlight ? "bg-orange-500" : "bg-green-600"
//                           }`}
//                         >
//                           {offer.tag}
//                         </motion.span>
//                         <div className="flex-1">
//                           <p
//                             className={`text-sm font-medium ${
//                               offer.highlight
//                                 ? "text-orange-800"
//                                 : "text-gray-800"
//                             }`}
//                           >
//                             {offer.text}
//                             {offer.highlight && (
//                               <motion.span
//                                 animate={{ opacity: [1, 0.5, 1] }}
//                                 transition={{ duration: 1.5, repeat: Infinity }}
//                                 className="ml-2 text-xs text-red-600 font-bold"
//                               >
//                                 🔥 Most Popular
//                               </motion.span>
//                             )}
//                           </p>
//                           {offer.code && (
//                             <div className="flex items-center gap-2 mt-1">
//                               <span className="text-xs text-gray-600">
//                                 Code:
//                               </span>
//                               <motion.span
//                                 animate={{
//                                   boxShadow: [
//                                     "0 0 0 0 rgba(34, 197, 94, 0)",
//                                     "0 0 0 4px rgba(34, 197, 94, 0.3)",
//                                     "0 0 0 0 rgba(34, 197, 94, 0)",
//                                   ],
//                                 }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                                 className="px-2 py-0.5 bg-white border border-dashed border-green-500 text-green-700 text-xs font-bold rounded"
//                               >
//                                 {offer.code}
//                               </motion.span>
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="text-xs text-orange-600 font-semibold hover:text-orange-700"
//                               >
//                                 Copy
//                               </motion.button>
//                             </div>
//                           )}
//                         </div>
//                         {offer.highlight && (
//                           <motion.div
//                             animate={{ rotate: [0, 15, -15, 0] }}
//                             transition={{
//                               duration: 0.5,
//                               repeat: Infinity,
//                               repeatDelay: 3,
//                             }}
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="20"
//                               height="20"
//                               viewBox="0 0 24 24"
//                               fill="#F97316"
//                               stroke="#F97316"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                             >
//                               <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//                             </svg>
//                           </motion.div>
//                         )}
//                       </motion.div>
//                     ))}
//                   </div>

//                   {/* Limited Time Banner */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     className="mt-3 p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg overflow-hidden relative"
//                   >
//                     <motion.div
//                       animate={{ x: ["100%", "-100%"] }}
//                       transition={{
//                         duration: 15,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                       className="whitespace-nowrap text-white text-sm font-semibold"
//                     >
//                       ⏰ Limited Time Offer! • Sale ends in 24 hours • Don't
//                       miss out! • ⏰ Limited Time Offer! • Sale ends in 24 hours
//                       • Don't miss out!
//                     </motion.div>
//                   </motion.div>
//                 </div>

//                 {/* Sticky Add to Cart Section */}
//                 <div>
//                   {/* Placeholder to maintain space when sticky */}
//                   <div
//                     ref={stickyRef}
//                     style={{ height: isSticky ? "180px" : "0px" }}
//                   />

//                   {/* Actual sticky content */}
//                   <div
//                     className={`bg-white border-t pt-4 transition-all duration-300 ${
//                       isSticky
//                         ? "fixed bottom-0 left-0 right-0 shadow-2xl z-40 px-4 py-4"
//                         : ""
//                     }`}
//                   >
//                     <div className={isSticky ? "max-w-7xl mx-auto" : ""}>
//                       <div className="flex items-center gap-4 mb-3">
//                         <span className="font-semibold text-gray-700">
//                           Quantity:
//                         </span>
//                         <div className="flex items-center border border-gray-300 rounded-lg">
//                           <button
//                             onClick={() => setQty(Math.max(1, qty - 1))}
//                             className="px-4 py-2 hover:bg-gray-100 transition-colors"
//                           >
//                             <Minus size={18} />
//                           </button>
//                           <span className="px-6 py-2 font-semibold border-x">
//                             {qty}
//                           </span>
//                           <button
//                             onClick={() => setQty(qty + 1)}
//                             className="px-4 py-2 hover:bg-gray-100 transition-colors"
//                           >
//                             <Plus size={18} />
//                           </button>
//                         </div>
//                       </div>

//                       <div className="flex gap-3 mb-3 p-1">
//                         <motion.button
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="flex-1 bg-[var(--themeColor)] hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-colors"
//                         >
//                           Add to Cart
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-colors"
//                         >
//                           Buy Now
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => setIsWishlisted(!isWishlisted)}
//                           className="p-3.5 border-2 border-gray-300 rounded-xl hover:border-orange-500 transition-colors"
//                         >
//                           <Heart
//                             size={24}
//                             fill={isWishlisted ? "#EF4444" : "none"}
//                             color={isWishlisted ? "#EF4444" : "#6B7280"}
//                           />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className="p-3.5 border-2 border-gray-300 rounded-xl hover:border-orange-500 transition-colors"
//                         >
//                           <Share2 size={24} color="#6B7280" />
//                         </motion.button>
//                       </div>

//                       {/* Trust Line & Guarantee */}
//                       <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
//                         <div className="flex items-center gap-4 text-gray-600">
//                           <span className="flex items-center gap-1">
//                             <Shield size={16} className="text-green-600" />
//                             Secure payment
//                           </span>
//                           <span>·</span>
//                           <span className="flex items-center gap-1">
//                             <Truck size={16} className="text-blue-600" />
//                             Fast delivery
//                           </span>
//                           <span>·</span>
//                           <span className="flex items-center gap-1">
//                             <RotateCcw size={16} className="text-purple-600" />
//                             Easy returns
//                           </span>
//                         </div>
//                         <button className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
//                           <CheckCircle size={16} />
//                           7-Day Return Policy
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Features with Icons */}
//                 <div className="mt-6 p-1">
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

//               {/* Pincode Checker */}
//               <div className="mb-6 mt-10">
//                 <h3 className="text-sm font-semibold text-gray-900 mb-3">
//                   Check Delivery
//                 </h3>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     placeholder="Enter pincode"
//                     maxLength="6"
//                     className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                   />
//                   <button className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
//                     Check
//                   </button>
//                 </div>
//               </div>

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

//       {/* Detailed Product Information */}
//       <div className="bg-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Health Benefits */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                   <Heart size={24} className="text-green-600" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Health Benefits
//                 </h3>
//               </div>
//               <ul className="space-y-3">
//                 <li className="flex items-start gap-2">
//                   <CheckCircle
//                     size={18}
//                     className="text-green-600 flex-shrink-0 mt-0.5"
//                   />
//                   <span className="text-gray-700">
//                     Rich in antioxidants for cellular protection
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckCircle
//                     size={18}
//                     className="text-green-600 flex-shrink-0 mt-0.5"
//                   />
//                   <span className="text-gray-700">
//                     Boosts immunity and overall wellness
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckCircle
//                     size={18}
//                     className="text-green-600 flex-shrink-0 mt-0.5"
//                   />
//                   <span className="text-gray-700">
//                     100% chemical-free and natural
//                   </span>
//                 </li>
//               </ul>
//             </motion.div>

//             {/* Taste & Texture */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//               className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-sm"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
//                   <Zap size={24} className="text-amber-600" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Taste & Texture
//                 </h3>
//               </div>
//               <ul className="space-y-3">
//                 <li className="flex items-start gap-2">
//                   <span className="text-amber-600 font-bold">•</span>
//                   <span className="text-gray-700">
//                     <strong>Aroma:</strong> Rich, bold coffee fragrance
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-amber-600 font-bold">•</span>
//                   <span className="text-gray-700">
//                     <strong>Color:</strong> Deep brown with natural oils
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="text-amber-600 font-bold">•</span>
//                   <span className="text-gray-700">
//                     <strong>Texture:</strong> Smooth, full-bodied finish
//                   </span>
//                 </li>
//               </ul>
//             </motion.div>

//             {/* Usage Instructions */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//               className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 shadow-sm"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-blue-600"
//                   >
//                     <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
//                     <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
//                     <line x1="6" y1="1" x2="6" y2="4"></line>
//                     <line x1="10" y1="1" x2="10" y2="4"></line>
//                     <line x1="14" y1="1" x2="14" y2="4"></line>
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900">How to Use</h3>
//               </div>
//               <ol className="space-y-3">
//                 <li className="flex items-start gap-3">
//                   <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
//                     1
//                   </span>
//                   <span className="text-gray-700">
//                     Grind 2 tablespoons of beans per cup
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
//                     2
//                   </span>
//                   <span className="text-gray-700">
//                     Use hot water (90-96°C) for brewing
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
//                     3
//                   </span>
//                   <span className="text-gray-700">
//                     Steep for 3-4 minutes for best flavor
//                   </span>
//                 </li>
//               </ol>
//             </motion.div>

//             {/* Storage Guidelines */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.3 }}
//               className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-sm"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                   <Package size={24} className="text-purple-600" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900">
//                   Storage Guidelines
//                 </h3>
//               </div>
//               <ul className="space-y-3">
//                 <li className="flex items-start gap-2">
//                   <CheckCircle
//                     size={18}
//                     className="text-purple-600 flex-shrink-0 mt-0.5"
//                   />
//                   <span className="text-gray-700">
//                     Store in airtight container
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckCircle
//                     size={18}
//                     className="text-purple-600 flex-shrink-0 mt-0.5"
//                   />
//                   <span className="text-gray-700">
//                     Keep in cool, dry place away from sunlight
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckCircle
//                     size={18}
//                     className="text-purple-600 flex-shrink-0 mt-0.5"
//                   />
//                   <span className="text-gray-700">
//                     Avoid refrigeration to prevent moisture
//                   </span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <CheckCircle
//                     size={18}
//                     className="text-purple-600 flex-shrink-0 mt-0.5"
//                   />
//                   <span className="text-gray-700">
//                     Best consumed within 3 months of opening
//                   </span>
//                 </li>
//               </ul>
//             </motion.div>
//           </div>

//           {/* Lab Details */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4 }}
//             className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 shadow-sm border border-gray-200"
//           >
//             <div className="flex items-start flex-wrap sm:flex-nowrap justify-between gap-4">
//               <div className="flex items-start gap-4">
//                 <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
//                   <Shield size={24} className="text-gray-700" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-2">
//                     Lab Tested & Certified
//                   </h3>
//                   <p className="text-gray-700 mb-3">
//                     Our products undergo rigorous third-party laboratory testing
//                     to ensure purity, quality, and safety. Each batch is tested
//                     for contaminants, pesticides, and heavy metals.
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
//                       Pesticide Free
//                     </span>
//                     <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
//                       Heavy Metal Tested
//                     </span>
//                     <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
//                       Microbiological Safe
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full sm:w-max">
//                 <button className="px-4 py-2 w-full bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
//                   View Report
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

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
//                 className="px-6 py-3 bg-[var(--themeColor)] text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
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

//       {/* People Also Bought */}
//       <div className="bg-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-3xl font-bold text-gray-900">
//               People Also Bought
//             </h2>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1"
//             >
//               View All
//               <ChevronRight size={20} />
//             </motion.button>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//             {[
//               {
//                 id: 1,
//                 name: "Organic Green Tea",
//                 image:
//                   "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
//                 price: 399,
//                 originalPrice: 499,
//                 discount: 20,
//                 rating: 4.3,
//                 reviews: 89,
//                 tag: "Bestseller",
//               },
//               {
//                 id: 2,
//                 name: "Raw Honey - Pure & Natural",
//                 image:
//                   "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400",
//                 price: 549,
//                 originalPrice: 699,
//                 discount: 21,
//                 rating: 4.7,
//                 reviews: 156,
//                 tag: "New",
//               },
//               {
//                 id: 3,
//                 name: "Organic Turmeric Powder",
//                 image:
//                   "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400",
//                 price: 199,
//                 originalPrice: 299,
//                 discount: 33,
//                 rating: 4.5,
//                 reviews: 203,
//                 tag: "Hot Deal",
//               },
//               {
//                 id: 4,
//                 name: "Cold Pressed Coconut Oil",
//                 image:
//                   "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400",
//                 price: 449,
//                 originalPrice: 599,
//                 discount: 25,
//                 rating: 4.6,
//                 reviews: 178,
//                 tag: null,
//               },
//               {
//                 id: 5,
//                 name: "Organic Almond Butter",
//                 image:
//                   "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400",

//                 price: 699,
//                 originalPrice: 899,
//                 discount: 22,
//                 rating: 4.4,
//                 reviews: 92,
//                 tag: "Popular",
//               },
//               {
//                 id: 6,
//                 name: "Herbal Chamomile Tea",
//                 image:
//                   "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400",
//                 price: 349,
//                 originalPrice: 449,
//                 discount: 22,
//                 rating: 4.2,
//                 reviews: 67,
//                 tag: null,
//               },
//               {
//                 id: 7,
//                 name: "Organic Chia Seeds",
//                 image:
//                   "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400",
//                 price: 299,
//                 originalPrice: 399,
//                 discount: 25,
//                 rating: 4.8,
//                 reviews: 245,
//                 tag: "Top Rated",
//               },
//               {
//                 id: 8,
//                 name: "Pure Jaggery Powder",
//                 image:
//                   "https://images.unsplash.com/photo-1604431696980-07e518647bec?w=400",
//                 price: 179,
//                 originalPrice: 249,
//                 discount: 28,
//                 rating: 4.1,
//                 reviews: 134,
//                 tag: null,
//               },
//             ].map((item, idx) => (
//               <motion.div
//                 key={item.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.05 }}
//                 whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
//                 className="bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer group"
//               >
//                 {/* Image Container */}
//                 <div className="relative aspect-square bg-gray-100 overflow-hidden">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                   />

//                   {/* Tag Badge */}
//                   {item.tag && (
//                     <motion.span
//                       initial={{ x: -100 }}
//                       animate={{ x: 0 }}
//                       className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded-full text-white ${
//                         item.tag === "Bestseller"
//                           ? "bg-purple-500"
//                           : item.tag === "New"
//                           ? "bg-blue-500"
//                           : item.tag === "Hot Deal"
//                           ? "bg-red-500"
//                           : item.tag === "Top Rated"
//                           ? "bg-green-500"
//                           : "bg-orange-500"
//                       }`}
//                     >
//                       {item.tag}
//                     </motion.span>
//                   )}

//                   {/* Discount Badge */}
//                   <span className="absolute top-3 right-3 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
//                     {item.discount}% OFF
//                   </span>

//                   {/* Quick Actions */}
//                   <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
//                     >
//                       Add to Cart
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
//                     >
//                       <Heart size={18} className="text-gray-600" />
//                     </motion.button>
//                   </div>
//                 </div>

//                 {/* Product Info */}
//                 <div className="p-4">
//                   {/* Rating */}
//                   <div className="flex items-center gap-2 mb-2">
//                     <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded">
//                       <Star size={12} fill="#22C55E" color="#22C55E" />
//                       <span className="text-xs font-semibold text-green-700">
//                         {item.rating}
//                       </span>
//                     </div>
//                     <span className="text-xs text-gray-500">
//                       ({item.reviews})
//                     </span>
//                   </div>

//                   {/* Name */}
//                   <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
//                     {item.name}
//                   </h3>

//                   {/* Price */}
//                   <div className="flex items-center gap-2">
//                     <span className="text-lg font-bold text-gray-900">
//                       ₹{item.price}
//                     </span>
//                     <span className="text-sm text-gray-500 line-through">
//                       ₹{item.originalPrice}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Frequently Bought Together */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="mt-12 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 md:p-8"
//           >
//             <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Zap size={24} className="text-orange-500" />
//               Frequently Bought Together
//             </h3>

//             <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
//               {/* Current Product */}
//               <div className="flex items-center gap-4 bg-white rounded-xl p-4 flex-shrink-0">
//                 <img
//                   src={product.details.img[0].lg}
//                   alt={product.details.name}
//                   className="w-20 h-20 object-cover rounded-lg"
//                 />
//                 <div>
//                   <p className="font-semibold text-gray-900 text-sm line-clamp-2">
//                     {product.details.name}
//                   </p>
//                   <p className="text-orange-600 font-bold">₹{finalPrice}</p>
//                 </div>
//               </div>

//               <div className="text-2xl font-bold text-gray-400">+</div>

//               {/* Combo Product 1 */}
//               <div className="flex items-center gap-4 bg-white rounded-xl p-4 flex-shrink-0">
//                 <img
//                   src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400"
//                   alt="Raw Honey"
//                   className="w-20 h-20 object-cover rounded-lg"
//                 />
//                 <div>
//                   <p className="font-semibold text-gray-900 text-sm line-clamp-2">
//                     Raw Honey - Pure
//                   </p>
//                   <p className="text-orange-600 font-bold">₹549</p>
//                 </div>
//               </div>

//               <div className="text-2xl font-bold text-gray-400">+</div>

//               {/* Combo Product 2 */}
//               <div className="flex items-center gap-4 bg-white rounded-xl p-4 flex-shrink-0">
//                 <img
//                   src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400"
//                   alt="Green Tea"
//                   className="w-20 h-20 object-cover rounded-lg"
//                 />
//                 <div>
//                   <p className="font-semibold text-gray-900 text-sm line-clamp-2">
//                     Organic Green Tea
//                   </p>
//                   <p className="text-orange-600 font-bold">₹399</p>
//                 </div>
//               </div>

//               {/* Total & Add */}
//               <div className="flex flex-col items-center gap-3 bg-white rounded-xl p-4 md:ml-auto">
//                 <div className="text-center">
//                   <p className="text-sm text-gray-600">Bundle Price</p>
//                   <div className="flex items-center gap-2">
//                     <span className="text-2xl font-bold text-gray-900">
//                       ₹{finalPrice + 549 + 399 - 200}
//                     </span>
//                     <span className="text-sm text-gray-500 line-through">
//                       ₹{finalPrice + 549 + 399}
//                     </span>
//                   </div>
//                   <motion.span
//                     animate={{ scale: [1, 1.05, 1] }}
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                     className="text-green-600 text-sm font-semibold"
//                   >
//                     Save ₹200!
//                   </motion.span>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="w-full bg-[var(--themeColor)] hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
//                 >
//                   Add All to Cart
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
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
//                   className="px-6 py-3 bg-[var(--themeColor)] text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
//                 >
//                   Write a Review
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Individual Reviews with Filters */}
//           <div className="mb-8">
//             {/* Filters */}
//             <div className="bg-gray-50 rounded-xl p-4 mb-6">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 {/* Rating Filter */}
//                 <div className="flex-1">
//                   <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                     Filter by Rating
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {["all", "5", "4", "3", "2", "1"].map((rating) => (
//                       <button
//                         key={rating}
//                         onClick={() => setSelectedRatingFilter(rating)}
//                         className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                           selectedRatingFilter === rating
//                             ? "bg-orange-500 text-white"
//                             : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
//                         }`}
//                       >
//                         {rating === "all" ? "All" : `${rating} ★`}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Tag Filter */}
//                 <div className="flex-1">
//                   <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                     Filter by Tags
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {["all", "Taste", "Packaging", "Texture", "Purity"].map(
//                       (tag) => (
//                         <button
//                           key={tag}
//                           onClick={() => setSelectedTagFilter(tag)}
//                           className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                             selectedTagFilter === tag
//                               ? "bg-orange-500 text-white"
//                               : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
//                           }`}
//                         >
//                           {tag}
//                         </button>
//                       )
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Reviews List */}
//             <div className="space-y-6">
//               {[
//                 {
//                   name: "Priya Sharma",
//                   rating: 5,
//                   date: "2 weeks ago",
//                   title: "Absolutely Amazing Quality!",
//                   review:
//                     "This coffee is exceptional! The aroma is incredible and the taste is so rich and smooth. I've tried many brands but this one stands out. Highly recommend for coffee lovers!",
//                   verified: true,
//                   tags: ["Taste", "Purity"],
//                   images: [
//                     "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400",
//                     "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
//                   ],
//                   hasVideo: false,
//                 },
//                 {
//                   name: "Rahul Verma",
//                   rating: 4,
//                   date: "1 month ago",
//                   title: "Great Product, Fast Delivery",
//                   review:
//                     "Very happy with my purchase. The packaging was excellent and delivery was quick. The coffee beans are fresh and flavorful. Will definitely buy again.",
//                   verified: true,
//                   tags: ["Packaging", "Texture"],
//                   images: [],
//                   hasVideo: true,
//                 },
//                 {
//                   name: "Anita Desai",
//                   rating: 5,
//                   date: "3 weeks ago",
//                   title: "Best Organic Coffee",
//                   review:
//                     "I'm very particular about organic products and this exceeded my expectations. The taste is authentic and you can tell it's genuinely organic. Worth every penny!",
//                   verified: true,
//                   tags: ["Taste", "Purity"],
//                   images: [
//                     "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
//                   ],
//                   hasVideo: false,
//                 },
//               ].map((review, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex items-start justify-between mb-3">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <h4 className="font-semibold text-gray-900">
//                           {review.name}
//                         </h4>
//                         {review.verified && (
//                           <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
//                             <CheckCircle size={12} />
//                             Verified
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-3 mb-2">
//                         <StarRating rating={review.rating} size={16} />
//                         <span className="text-sm text-gray-500">
//                           {review.date}
//                         </span>
//                       </div>
//                       {/* Tags */}
//                       <div className="flex flex-wrap gap-2 mb-3">
//                         {review.tags.map((tag, tagIdx) => (
//                           <span
//                             key={tagIdx}
//                             className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                   <h5 className="font-semibold text-gray-900 mb-2">
//                     {review.title}
//                   </h5>
//                   <p className="text-gray-700 leading-relaxed mb-4">
//                     {review.review}
//                   </p>

//                   {/* Images & Videos */}
//                   {(review.images.length > 0 || review.hasVideo) && (
//                     <div className="flex gap-3 flex-wrap">
//                       {review.images.map((img, imgIdx) => (
//                         <div
//                           key={imgIdx}
//                           className="w-24 h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
//                         >
//                           <img
//                             src={img}
//                             alt="Review"
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       ))}
//                       {review.hasVideo && (
//                         <div className="w-24 h-24 rounded-lg overflow-hidden bg-black cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center">
//                           <Play size={32} color="white" fill="white" />
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           </div>

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

// 3rd

// import { useState, useRef, useEffect, useMemo, useCallback } from "react";
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
//   Package,
//   CreditCard,
//   Heart,
//   Share2,
//   CheckCircle,
//   Award,
//   Plus,
//   Minus,
//   MessageSquare, // For Reviews/FAQ
//   Info,
//   Wallet,
//   Play,
//   ZapIcon,
//   RotateCcw,
//   Zap,
//   Smartphone, // For Additional Info/Why Us
// } from "lucide-react";

// const reviewss = [
//   {
//     name: "Priya Sharma",
//     rating: 5,
//     date: "2 weeks ago",
//     title: "Absolutely Amazing Quality!",
//     review:
//       "This coffee is exceptional! The aroma is incredible and the taste is so rich and smooth. I've tried many brands but this one stands out. Highly recommend for coffee lovers!",
//     verified: true,
//     tags: ["Taste", "Purity"],
//     images: [
//       "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400",
//       "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400",
//     ],
//     hasVideo: false,
//   },
//   {
//     name: "Rahul Verma",
//     rating: 4,
//     date: "1 month ago",
//     title: "Great Product, Fast Delivery",
//     review:
//       "Very happy with my purchase. The packaging was excellent and delivery was quick. The coffee beans are fresh and flavorful. Will definitely buy again.",
//     verified: true,
//     tags: ["Packaging", "Texture"],
//     images: ["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800"],
//     hasVideo: true,
//   },
//   {
//     name: "Anita Desai",
//     rating: 5,
//     date: "3 weeks ago",
//     title: "Best Organic Coffee on the Market!",
//     review:
//       "I was skeptical at first, but this is truly pure organic coffee. The freshness is noticeable and the dark roast is perfect. Five stars!",
//     verified: true,
//     tags: ["Purity", "Taste"],
//     images: [],
//     hasVideo: false,
//   },
// ];

// // Mock product data (kept original)
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
//     healthBenefits:
//       "Boosts energy, rich in antioxidants, improves physical performance, and may lower the risk of several diseases. Enjoy a guilt-free, invigorating start to your day.",
//     tasteTexture:
//       "A bold, dark roast with notes of cocoa and a smoky finish. Full-bodied with a smooth, velvety texture and a low acidity. Intense and satisfying.",
//     howToUse:
//       "Grind beans just before brewing. Use 2 tablespoons of grounds per 6 ounces of water. Ideal for French Press (4 min steep), pour-over (2-3 min brew), or espresso.",
//     storageGuidelines:
//       "Store in an airtight container away from heat, light, and moisture. Do not refrigerate. Best consumed within 4 weeks of opening.",
//     additionalInfo: {
//       manufacturer: "Foodsbay India",
//       shelfLife: "12 months",
//       brand: "Organic Nation",
//       origin: "India",
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

// // --- Reusable Components (Keep these outside the main component for performance) ---

// const StarRating = ({ rating, size = 20 }) => {
//   // ... (Original StarRating component)
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
//     className="flex flex-col items-center gap-2 xs:p-4 bg-white rounded-xl shadow-sm"
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
// const AccordionItem = ({ title, content, isOpen, onClick }) => (
//   <motion.div
//     className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
//     initial={false}
//   >
//     <button
//       onClick={onClick}
//       className="w-full px-5 py-3.5 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
//     >
//       <span className="font-semibold text-left text-gray-800 text-lg">
//         {title}
//       </span>
//       {isOpen ? (
//         <ChevronUp size={20} className="text-orange-500" />
//       ) : (
//         <ChevronDown size={20} className="text-gray-500" />
//       )}
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
//           <p className="px-5 py-4 text-gray-700 leading-relaxed">{content}</p>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   </motion.div>
// );

// // --- Main Component ---

// // Custom hook to detect when an element is out of view
// const useStickyDetector = (ref, actionButtonRef) => {
//   const [isSticky, setIsSticky] = useState(false);
//   const [showMobileTabs, setShowMobileTabs] = useState(false);

//   useEffect(() => {
//     const checkSticky = () => {
//       if (actionButtonRef.current) {
//         // Check if the Buy Now/Add to Cart section is above the viewport top (i.e., scrolled past)
//         const rect = actionButtonRef.current.getBoundingClientRect();
//         setIsSticky(rect.top < -50); // Be sticky if scrolled 50px past the button section

//         // Mobile Tabs logic: Check if the whole main body (ref) is above the viewport top.
//         // We'll use a simplified check for this, checking if the scroll position has passed a certain threshold.
//         // A more robust implementation would use IntersectionObserver.
//         if (window.innerWidth < 768) {
//           // Only for mobile (sm breakpoint)
//           const bodyRect = ref.current?.getBoundingClientRect();
//           if (bodyRect) {
//             // Show tabs when the main image/info section is scrolled past the top
//             setShowMobileTabs(bodyRect.top < -300);
//           }
//         } else {
//           setShowMobileTabs(false);
//         }
//       }
//     };

//     window.addEventListener("scroll", checkSticky);
//     return () => window.removeEventListener("scroll", checkSticky);
//   }, [actionButtonRef, ref]);

//   return { isSticky, showMobileTabs };
// };

// const ProductDetails = () => {
//   const product = mockProduct;
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [qty, setQty] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [openAccordion, setOpenAccordion] = useState(0); // For dropdowns
//   const [activeMobileTab, setActiveMobileTab] = useState("description");
//   const [imageLoading, setImageLoading] = useState(false);

//   const actionButtonRef = useRef(null); // Ref for action buttons section (to check visibility)
//   const productDetailsRef = useRef(null); // Ref for the main page body (for scroll detection)

//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [openFAQ, setOpenFAQ] = useState(0);
//   const [showAllFAQs, setShowAllFAQs] = useState(false);
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   // const [isSticky, setIsSticky] = useState(false);
//   const stickyRef = useRef(null);

//   const [selectedRatingFilter, setSelectedRatingFilter] = useState("all");
//   const [selectedTagFilter, setSelectedTagFilter] = useState("all");

//   // const finalPrice = Math.round(
//   //   product.details.price -
//   //     (product.details.price * product.details.discount) / 100
//   // );

//   // const faqs = [
//   //   {
//   //     question: "Is this product 100% organic?",
//   //     answer:
//   //       "Yes, our coffee beans are certified organic and grown without synthetic pesticides or fertilizers.",
//   //   },
//   //   {
//   //     question: "What is the best way to store coffee beans?",
//   //     answer:
//   //       "Store in an airtight container in a cool, dark place. Avoid refrigeration as it can introduce moisture.",
//   //   },
//   //   {
//   //     question: "How long does shipping take?",
//   //     answer:
//   //       "We typically ship within 24 hours. Delivery takes 3-5 business days depending on your location.",
//   //   },
//   //   {
//   //     question: "Can I return if I'm not satisfied?",
//   //     answer:
//   //       "Yes, we have a 7-day return policy. The product must be unopened and in original packaging.",
//   //   },
//   //   {
//   //     question: "Do you offer bulk discounts?",
//   //     answer:
//   //       "Yes! Contact our customer service for bulk order pricing and customization options.",
//   //   },
//   // ];

//   const reviews = [
//     { platform: "Our Website", count: 127, rating: 4.5 },
//     { platform: "Amazon", count: 543, rating: 4.3 },
//     { platform: "Flipkart", count: 289, rating: 4.6 },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       if (stickyRef.current) {
//         const rect = stickyRef.current.getBoundingClientRect();
//         // Adjust this value based on your header height if any
//         setIsSticky(rect.top <= 0);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // const nextImage = () =>
//   //   setSelectedImage((prev) => (prev + 1) % product.details.img.length);
//   // const prevImage = () =>
//   //   setSelectedImage(
//   //     (prev) =>
//   //       (prev - 1 + product.details.img.length) % product.details.img.length
//   //   );

//   // Refs for jump links
//   const sectionsRefs = {
//     description: useRef(null),
//     faqs: useRef(null),
//     reviews: useRef(null),
//     whyus: useRef(null),
//     additionalinfo: useRef(null),
//   };

//   const { isSticky, showMobileTabs } = useStickyDetector(
//     productDetailsRef,
//     actionButtonRef
//   );

//   const finalPrice = useMemo(
//     () =>
//       Math.round(
//         product.details.price -
//           (product.details.price * product.details.discount) / 100
//       ),
//     [product.details.price, product.details.discount]
//   );

//   const pricePerGram = useMemo(() => {
//     const weightMatch = product.details.weight.match(/(\d+)/);
//     const weightInGrams = weightMatch ? parseInt(weightMatch[1]) : 1;
//     return (finalPrice / weightInGrams).toFixed(2);
//   }, [finalPrice, product.details.weight]);

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const faqs = useMemo(
//     () => [
//       {
//         id: "q1",
//         question: "Is this product 100% organic?",
//         answer:
//           "Yes, our coffee beans are certified organic and grown without synthetic pesticides or fertilizers.",
//       },
//       {
//         id: "q2",
//         question: "What is the best way to store coffee beans?",
//         answer:
//           "Store in an airtight container in a cool, dark place. Avoid refrigeration as it can introduce moisture.",
//       },
//       {
//         id: "q3",
//         question: "How long does shipping take?",
//         answer:
//           "We typically ship within 24 hours. Delivery takes 3-5 business days depending on your location.",
//       },
//     ],
//     []
//   );

//   const productDescriptionSections = useMemo(
//     () => [
//       {
//         id: 1,
//         title: "Product Description",
//         content: product.productInfo.description,
//       },
//       {
//         id: 2,
//         title: "Health Benefits",
//         content: product.productInfo.healthBenefits,
//       },
//       {
//         id: 3,
//         title: "Taste & Texture",
//         content: product.productInfo.tasteTexture,
//       },
//       { id: 4, title: "How to Use", content: product.productInfo.howToUse },
//       {
//         id: 5,
//         title: "Storage Guidelines",
//         content: product.productInfo.storageGuidelines,
//       },
//     ],
//     [product.productInfo]
//   );

//   const mobileTabs = useMemo(
//     () => [
//       {
//         id: "description",
//         label: "Description",
//         icon: Info,
//         ref: sectionsRefs.description,
//       },
//        {
//         id: "reviews",
//         label: "Reviews",
//         icon: Star,
//         ref: sectionsRefs.reviews,
//       },
//       {
//         id: "faqs",
//         label: `FAQ's`,
//         icon: MessageSquare,
//         ref: sectionsRefs.faqs,
//       },
     
//       { id: "whyus", label: "Why Us", icon: Award, ref: sectionsRefs.whyus },
//       {
//         id: "additionalinfo",
//         label: "Info",
//         icon: Package,
//         ref: sectionsRefs.additionalinfo,
//       },
//     ],
//     [sectionsRefs]
//   );

//   const scrollToSection = useCallback(
//     (id) => {
//       const element = sectionsRefs[id].current;
//       if (element) {
//         // Scroll to element with an offset for the sticky mobile tab bar
//         const offset = window.innerWidth < 768 && showMobileTabs ? 60 : 0;
//         const bodyRect = document.body.getBoundingClientRect().top;
//         const elementRect = element.getBoundingClientRect().top;
//         const elementPosition = elementRect - bodyRect;
//         const offsetPosition = elementPosition - offset;

//         window.scrollTo({
//           top: offsetPosition,
//           behavior: "smooth",
//         });
//         setActiveMobileTab(id);
//       }
//     },
//     [showMobileTabs, sectionsRefs]
//   );

//   const nextImage = useCallback(
//     () => setSelectedImage((prev) => (prev + 1) % product.details.img.length),
//     [product.details.img.length]
//   );

//   const prevImage = useCallback(
//     () =>
//       setSelectedImage(
//         (prev) =>
//           (prev - 1 + product.details.img.length) % product.details.img.length
//       ),
//     [product.details.img.length]
//   );

//   // Set the theme color as a CSS variable for buttons
//   // useEffect(() => {
//   //   document.documentElement.style.setProperty("--themeColor", "#F97316"); // Orange-500
//   // }, []);

//   return (
//     <div className="min-h-screen bg-gray-50" ref={productDetailsRef}>
//       {/* Mobile Sticky Tabs */}
//       <AnimatePresence>
//         {showMobileTabs && (
//           <motion.div
//             initial={{ y: "-100%", opacity: 0 }}
//             animate={{ y: "0%", opacity: 1 }}
//             exit={{ y: "-100%", opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 overflow-x-auto"
//           >
//             <div className="flex justify-between py-2 px-4 gap-2">
//               {mobileTabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => scrollToSection(tab.id)}
//                   className={`flex-1 flex flex-col items-center p-2 rounded-lg text-sm font-medium transition-colors ${
//                     activeMobileTab === tab.id
//                       ? "text-orange-600 bg-orange-50 border-b-2 border-orange-500"
//                       : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
//                   }`}
//                 >
//                   <tab.icon size={16} />
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Content Area */}
//       <div className="bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//             {/* Left - Image Gallery */}

//             <motion.div variants={itemVariants} className="space-y-6">
//               {/* Main Image */}
//               <div className="relative">
//                 <motion.div
//                   className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
//                   style={{ backgroundColor: "#FFFFFF" }}
//                   whileHover={{ scale: 1.02, rotateY: 2 }}
//                   transition={{ duration: 0.4, type: "spring" }}
//                   onClick={() => setIsFullScreen(true)}
//                 >
//                   <AnimatePresence mode="wait">
//                     <motion.img
//                       key={selectedImage}
//                       src={product.details.img[selectedImage].lg}
//                       alt={product.details.name}
//                       className="w-full h-full object-cover"
//                       initial={{ opacity: 0, scale: 1.1 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.9 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   </AnimatePresence>

//                   {/* Gradient Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

//                   {/* View Full Size Badge */}
//                   {/* <motion.div
//                   className="absolute top-4 right-4 px-4 py-2 rounded-full text-white text-sm font-semibold flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
//                   style={{ backgroundColor: '#7A2E1D' }}
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <FaEye />
//                   <span>Full View</span>
//                 </motion.div> */}

//                   {/* Trending Badge */}
//                   {/* {product.details.trending && (
//                   <motion.div
//                     className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold flex items-center space-x-1"
//                     style={{ backgroundColor: '#D87C45' }}
//                     animate={{
//                       scale: [1, 1.1, 1],
//                       rotate: [0, 5, -5, 0]
//                     }}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       repeatDelay: 3
//                     }}
//                   >
//                     <FaFire />
//                     <span>TRENDING</span>
//                   </motion.div>
//                 )} */}

//                   {/* Navigation Arrows */}
//                   <motion.button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       prevImage();
//                     }}
//                     className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
//                     style={{ backgroundColor: "#F5EFE6", color: "#7A2E1D" }}
//                   >
//                     <ChevronLeft />
//                   </motion.button>
//                   <motion.button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       nextImage();
//                     }}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
//                     style={{ backgroundColor: "#F5EFE6", color: "#7A2E1D" }}
//                   >
//                     <ChevronRight />
//                   </motion.button>

//                   {/* Image Counter */}
//                   <div
//                     className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm font-semibold"
//                     style={{ backgroundColor: "rgba(122, 46, 29, 0.8)" }}
//                   >
//                     {selectedImage + 1} / {product.details.img.length}
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Thumbnail Gallery */}
//               <div className="flex space-x-4 overflow-x-auto p-2 scrollbar-hide">
//                 {product.details.img.map((image, index) => (
//                   <motion.button
//                     key={index}
//                     onClick={() => {
//                       setImageLoading(true);
//                       setSelectedImage(index);
//                       setTimeout(() => setImageLoading(false), 300);
//                     }}
//                     className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-3 transition-all duration-300 ${
//                       selectedImage === index
//                         ? "ring-4 shadow-xl transform scale-105"
//                         : "hover:scale-110 shadow-md"
//                     }`}
//                     style={{
//                       borderColor:
//                         selectedImage === index ? "#9B7A2F" : "#DCD2C0",
//                       ringColor:
//                         selectedImage === index ? "#9B7A2F" : "transparent",
//                     }}
//                   >
//                     <img
//                       src={image.lg}
//                       alt={`${product.details.name} view ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </motion.button>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Right - Product Info (Optimized for ATF on desktop) */}
//             <div className="flex flex-col">
//               <div className="flex-1">
//                 {/* Title and Ratings */}
//                 <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1">
//                   {product.details.name}
//                 </h1>
//                 {/* USPs */}
//                 <div className="flex flex-wrap gap-2 mb-2">
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
//                 <div className="flex items-center gap-4 mb-1 pb-2 border-b border-gray-100">
//                   <StarRating rating={product.averageRating} size={16} />
//                   <span className="font-semibold text-gray-900">
//                     {product.averageRating}
//                   </span>
//                   <a
//                     href="#reviews"
//                     onClick={() => scrollToSection("reviews")}
//                     className="text-orange-600 hover:text-orange-700 font-medium underline-offset-4 hover:underline transition-colors"
//                   >
//                     ({product.reviews.length} reviews)
//                   </a>
//                 </div>

//                 {/* Net Content & Price per Gram */}

//                 <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
//                   <p className="text-center">
//                     <span className=" text-xs font-medium">Net Content</span>{" "}
//                     <span className="font-semibold text-gray-900">
//                       ({product.details.weight})
//                     </span>
//                   </p>
//                   <div className="h-6 w-px bg-gray-300"></div>
//                   <div className="text-center">
//                     <span className=" text-xs font-medium">Price per Gram</span>{" "}
//                     <span className="font-semibold text-gray-900">
//                       (₹{pricePerGram}/g)
//                     </span>
//                   </div>
//                 </div>

//                 {/* Pricing Block */}
//                 <div className="bg-orange-50 rounded-xl px-4 py-2 mb-4 shadow-inner">
//                   <div className="flex items-center gap-3 mb-2">
//                     <span className="text-3xl font-extrabold text-gray-900">
//                       ₹{finalPrice}
//                     </span>
//                     <span className="text-xl text-gray-500 line-through">
//                       ₹{product.details.price}
//                     </span>
//                     <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold shadow-md">
//                       {product.details.discount}% OFF
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-600 mb-3">
//                     Inclusive of all taxes
//                   </p>

//                   {/* Shipping & COD Info */}
//                   <div className="flex flex-wrap gap-2 mb-1">
//                     <div className="flex items-center gap-2 text-xs text-green-700 bg-green-100 px-2 py-1 rounded-lg font-semibold">
//                       <Truck size={14} />
//                       Free Shipping (Above ₹199)
//                     </div>
//                     <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-lg font-semibold">
//                       <Wallet size={14} />
//                       COD Available
//                     </div>
//                   </div>

//                   {/* Trust Badges - Optimized Layout */}
//                   {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-orange-200">
//                     <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-sm">
//                       <Shield size={18} className="text-green-600" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         FSSAI
//                       </span>
//                       <span className="text-xs text-gray-500">Lic: 12345</span>
//                     </div>
//                     <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-sm">
//                       <CheckCircle size={18} className="text-green-600" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         Lab Tested
//                       </span>
//                       <span className="text-xs text-gray-500">Certified</span>
//                     </div>
//                     <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-sm">
//                       <Award size={18} className="text-green-600" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         Pure
//                       </span>
//                       <span className="text-xs text-gray-500">Verified</span>
//                     </div>
//                     <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-sm">
//                       <CreditCard size={18} className="text-blue-600" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         Secure
//                       </span>
//                       <span className="text-xs text-gray-500">Payment</span>
//                     </div>
//                   </div> */}
//                 </div>

//                 {/* Available Offers */}

//                 <div className="mb-2">
//                   <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                     <motion.div
//                       animate={{ rotate: [0, -10, 10, -10, 0] }}
//                       transition={{
//                         duration: 1,
//                         repeat: Infinity,
//                         repeatDelay: 3,
//                       }}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="18"
//                         height="18"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="text-orange-500"
//                       >
//                         <path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5" />
//                         <path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.8 1.1z" />
//                       </svg>
//                     </motion.div>
//                     Available Offers
//                     <motion.span
//                       animate={{ scale: [1, 1.1, 1] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                       className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full"
//                     >
//                       HOT
//                     </motion.span>
//                   </h3>

//                   <div className="flex gap-4 overflow-x-auto scrollbar-hide  py-1">
//                     {[
//                       {
//                         tag: "BUNDLE",
//                         text: "FLAT 40% OFF on buying 2 or more items",
//                         code: null,
//                         highlight: true,
//                       },
//                       {
//                         tag: "BANK",
//                         text: "10% Instant Discount on HDFC Bank Cards",
//                         code: null,
//                         highlight: false,
//                       },
//                       {
//                         tag: "COUPON",
//                         text: "Use code ORGANIC15 for extra 15% off",
//                         code: "ORGANIC15",
//                         highlight: false,
//                       },
//                       {
//                         tag: "FREEBIE",
//                         text: "Free sample pack on orders above ₹999",
//                         code: null,
//                         highlight: false,
//                       },
//                     ].map((offer, idx) => (
//                       <motion.div
//                         key={idx}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: idx * 0.1 }}
//                         whileHover={{ scale: 1.05 }}
//                         className={`flex flex-col items-center p-1 min-w-32 w-32 h-24 rounded-lg cursor-pointer transition-all ${
//                           offer.highlight
//                             ? "bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-300 shadow-md"
//                             : "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
//                         }`}
//                       >
//                         <motion.span
//                           animate={
//                             offer.highlight ? { scale: [1, 1.1, 1] } : {}
//                           }
//                           transition={{
//                             duration: 1,
//                             repeat: Infinity,
//                             repeatDelay: 2,
//                           }}
//                           className={`px-2 py-0.5 text-white text-xs font-bold rounded-full flex-shrink-0 ${
//                             offer.highlight ? "bg-orange-500" : "bg-green-600"
//                           }`}
//                         >
//                           {offer.tag}
//                         </motion.span>

//                         <div className="mt-2 flex-1 text-center">
//                           <p
//                             className={`text-xs font-medium ${
//                               offer.highlight
//                                 ? "text-orange-800"
//                                 : "text-gray-800"
//                             }`}
//                           >
//                             {offer.text}
//                             {offer.highlight && (
//                               <motion.span
//                                 animate={{ opacity: [1, 0.5, 1] }}
//                                 transition={{ duration: 1.5, repeat: Infinity }}
//                                 className="ml-2 text-xs text-red-600 font-bold"
//                               >
//                                 🔥 Most Popular
//                               </motion.span>
//                             )}
//                           </p>
//                           {offer.code && (
//                             <div className="mt-1">
//                               <span className="text-xs text-gray-600">
//                                 Code:
//                               </span>
//                               <motion.span
//                                 animate={{
//                                   boxShadow: [
//                                     "0 0 0 0 rgba(34, 197, 94, 0)",
//                                     "0 0 0 4px rgba(34, 197, 94, 0.3)",
//                                     "0 0 0 0 rgba(34, 197, 94, 0)",
//                                   ],
//                                 }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                                 className="px-2 py-0.5 bg-white border border-dashed border-green-500 text-green-700 text-xs font-bold rounded"
//                               >
//                                 {offer.code}
//                               </motion.span>
//                             </div>
//                           )}
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                   {/* Trust Badges - Optimized Layout */}
//                   {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-orange-200">
//                     <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-sm">
//                       <Shield size={18} className="text-green-600" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         FSSAI
//                       </span>
//                       <span className="text-xs text-gray-500">Lic: 12345</span>
//                     </div>
//                     <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-sm">
//                       <CheckCircle size={18} className="text-green-600" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         Lab Tested
//                       </span>
//                       <span className="text-xs text-gray-500">Certified</span>
//                     </div>
//                     <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-sm">
//                       <Award size={18} className="text-green-600" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         Pure
//                       </span>
//                       <span className="text-xs text-gray-500">Verified</span>
//                     </div>
//                     <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-sm">
//                       <CreditCard size={18} className="text-blue-600" />
//                       <span className="text-xs font-semibold text-gray-700">
//                         Secure
//                       </span>
//                       <span className="text-xs text-gray-500">Payment</span>
//                     </div>
//                   </div> */}

//                   {/* Limited Time Banner */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     className="mt-3 p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg overflow-hidden relative"
//                   >
//                     <motion.div
//                       animate={{ x: ["100%", "-100%"] }}
//                       transition={{
//                         duration: 15,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                       className="whitespace-nowrap text-white text-xs font-semibold"
//                     >
//                       ⏰ Limited Time Offer! • Sale ends in 24 hours • Don't
//                       miss out! • ⏰ Limited Time Offer! • Sale ends in 24 hours
//                       • Don't miss out!
//                     </motion.div>
//                   </motion.div>
//                 </div>

//                 {/* Action Buttons & Quantity (non-sticky desktop view) */}
//                 <div
//                   ref={actionButtonRef}
//                   className="pb-6 border-b lg:border-none lg:pb-0"
//                 >
//                   <div className="flex items-center gap-4 mb-4">
//                     <span className="font-semibold text-gray-700">
//                       Quantity:
//                     </span>
//                     <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
//                       <motion.button
//                         onClick={() => setQty(Math.max(1, qty - 1))}
//                         className="px-4 py-2 hover:bg-gray-100 transition-colors"
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Minus size={18} />
//                       </motion.button>
//                       <span className="px-6 py-2 font-bold border-x border-gray-300 w-16 text-center">
//                         {qty}
//                       </span>
//                       <motion.button
//                         onClick={() => setQty(qty + 1)}
//                         className="px-4 py-2 hover:bg-gray-100 transition-colors"
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Plus size={18} />
//                       </motion.button>
//                     </div>
//                   </div>

//                   {/* <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="flex-1 min-w-[calc(50%-0.25rem)] sm:min-w-0 bg-[var(--themeColor)] hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base lg:text-lg py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg transition-colors"
//                     >
//                       Add to Cart
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="flex-1 min-w-[calc(50%-0.25rem)] sm:min-w-0 bg-gray-900 hover:bg-gray-800 text-white font-extrabold text-sm sm:text-base lg:text-lg py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg transition-colors"
//                     >
//                       Buy Now
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => setIsWishlisted(!isWishlisted)}
//                       className="p-3 sm:p-4 border-2 border-gray-300 rounded-lg sm:rounded-xl min-w-max hover:border-red-500 transition-colors flex items-center justify-center"
//                     >
//                       <Heart
//                         size={20}
//                         className="sm:w-6 sm:h-6"
//                         fill={isWishlisted ? "#EF4444" : "none"}
//                         color={isWishlisted ? "#EF4444" : "#6B7280"}
//                       />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="p-3 sm:p-3.5 border-2 border-gray-300 rounded-lg sm:rounded-xl hover:border-orange-500 transition-colors"
//                     >
//                       <Share2
//                         size={20}
//                         className="sm:w-6 sm:h-6"
//                         color="#6B7280"
//                       />
//                     </motion.button>
//                   </div> */}

                

//                   <div className="w-full space-y-3 sm:space-y-0">
//   {/* Mobile: Stacked layout */}
//   <div className="flex flex-col gap-3 sm:hidden">
//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className="w-full bg-[var(--themeColor)] hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base py-4 rounded-xl shadow-lg transition-all touch-manipulation"
//     >
//       Add to Cart
//     </motion.button>
//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className="w-full bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white font-bold text-base py-4 rounded-xl shadow-lg transition-all touch-manipulation"
//     >
//       Buy Now
//     </motion.button>
//     <div className="flex gap-3">
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => setIsWishlisted(!isWishlisted)}
//         className="flex-1 p-4 sm:h-full max-h-10 border-2 border-gray-300 rounded-xl hover:border-red-500 active:border-red-600 transition-all flex items-center justify-center gap-2 touch-manipulation"
//         // className="flex items-center justify-center border-2 max-h-min"
//         aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//       >
//         <Heart
//           size={22}
//           className="flex-shrink-0"
//           fill={isWishlisted ? "#EF4444" : "none"}
//           color={isWishlisted ? "#EF4444" : "#6B7280"}
//         />
//         <span className="text-sm font-medium text-gray-700">Wishlist</span>
//       </motion.button>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="flex-1 p-4 border-2 sm:h-full max-h-10 border-gray-300 rounded-xl hover:border-orange-500 active:border-orange-600 transition-all flex items-center justify-center gap-2 touch-manipulation"
//         aria-label="Share product"
//       >
//         <Share2 
//           size={22} 
//           className="flex-shrink-0" 
//           color="#6B7280" 
//         />
//         <span className="text-sm font-medium text-gray-700">Share</span>
//       </motion.button>
//     </div>
//   </div>

//   {/* Tablet+: All in one line */}
//   <div className="hidden sm:flex gap-3">
//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className="flex-1 bg-[var(--themeColor)] hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all touch-manipulation"
//     >
//       Add to Cart
//     </motion.button>
//     <motion.button
//       whileHover={{ scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className="flex-1 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all touch-manipulation"
//     >
//       Buy Now
//     </motion.button>
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       onClick={() => setIsWishlisted(!isWishlisted)}
//       className="p-4 border-2 border-gray-300 rounded-xl hover:border-red-500 active:border-red-600 transition-all flex items-center justify-center touch-manipulation"
//       aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//     >
//       <Heart
//         size={24}
//         fill={isWishlisted ? "#EF4444" : "none"}
//         color={isWishlisted ? "#EF4444" : "#6B7280"}
//       />
//     </motion.button>
//     <motion.button
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       className="p-4 border-2 border-gray-300 rounded-xl hover:border-orange-500 active:border-orange-600 transition-all flex items-center justify-center touch-manipulation"
//       aria-label="Share product"
//     >
//       <Share2 size={24} color="#6B7280" />
//     </motion.button>
//   </div>
// </div>

//                   {/* Trust Line & Guarantee */}
//                   <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-1 text-xs sm:text-sm">
//                     <div className="flex items-center sm:gap-4 gap-2 text-gray-600">
//                       <span className="flex items-center gap-1">
//                         <Shield size={16} className="text-green-600" />
//                         Secure payment
//                       </span>
//                       <span>·</span>
//                       <span className="flex items-center gap-1">
//                         <Truck size={16} className="text-blue-600" />
//                         Fast delivery
//                       </span>
//                       <span>·</span>
//                       <span className="flex items-center gap-1">
//                         <RotateCcw size={16} className="text-purple-600" />
//                         Easy returns
//                       </span>
//                     </div>
//                     <button className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
//                       <CheckCircle size={16} />
//                       7-Day Return Policy
//                     </button>
//                   </div>
//                 </div>

//                 {/* Pincode Checker */}
//                 <div className="mb-6 mt-10">
//                   <h3 className="text-sm font-semibold text-gray-900 mb-3">
//                     Check Delivery
//                   </h3>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Enter pincode"
//                       maxLength="6"
//                       className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                     />
//                     <button className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
//                       Check
//                     </button>
//                   </div>
//                 </div>

//                 {/* Trust Badges - Optimized Layout */}
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 ">
//                   <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-md">
//                     <Shield size={18} className="text-green-600" />
//                     <span className="text-xs font-semibold text-gray-700">
//                       FSSAI
//                     </span>
//                     <span className="text-xs text-gray-500">Lic: 12345</span>
//                   </div>
//                   <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-md">
//                     <CheckCircle size={18} className="text-green-600" />
//                     <span className="text-xs font-semibold text-gray-700">
//                       Lab Tested
//                     </span>
//                     <span className="text-xs text-gray-500">Certified</span>
//                   </div>
//                   <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-md">
//                     <Award size={18} className="text-green-600" />
//                     <span className="text-xs font-semibold text-gray-700">
//                       Pure
//                     </span>
//                     <span className="text-xs text-gray-500">Verified</span>
//                   </div>
//                   <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-md">
//                     <CreditCard size={18} className="text-blue-600" />
//                     <span className="text-xs font-semibold text-gray-700">
//                       Secure
//                     </span>
//                     <span className="text-xs text-gray-500">Payment</span>
//                   </div>
//                 </div>

//                 {/* Features with Icons (Moved for better flow) */}
//                 {/* <div className="mt-6 p-1">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                     Key Features
//                   </h3>
//                   <div className="grid grid-cols-3 gap-3">
//                     <FeatureIcon icon={Award} title="Certified Organic" />
//                     <FeatureIcon icon={ZapIcon} title="Fresh Roasted" />
//                     <FeatureIcon icon={Shield} title="Quality Assured" />
//                   </div>
//                 </div> */}
//               </div>
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
//               {/* In a real app, this would be an actual video player */}
//               <button className="p-6 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
//                 <Play size={48} color="white" fill="white" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <hr className="border-t border-gray-200" />

//       {/* Product Description, FAQs, Reviews, etc. Sections */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {/* Product Description, Health Benefits, etc. */}
//         <section
//           className="mb-10"
//           id="description"
//           ref={sectionsRefs.description}
//         >
//           <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
//             Product Information
//           </h2>
//           <div className="space-y-4">
//             {productDescriptionSections.map((section, index) => (
//               <AccordionItem
//                 key={section.id}
//                 title={section.title}
//                 content={section.content}
//                 isOpen={openAccordion === section.id}
//                 onClick={() =>
//                   setOpenAccordion(
//                     openAccordion === section.id ? null : section.id
//                   )
//                 }
//               />
//             ))}
//           </div>
//         </section>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.4 }}
//           className="mb-10 bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
//         >
//           <div className="flex items-start flex-wrap sm:flex-nowrap justify-between gap-4">
//             <div className="flex items-start gap-4">
//               <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
//                 <Shield size={24} className="text-green-600" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   Lab Tested & Certified
//                 </h3>
//                 <p className="text-gray-700 mb-3 sm:text-base text-sm">
//                   Our products undergo rigorous third-party laboratory testing
//                   to ensure purity, quality, and safety. Each batch is tested
//                   for contaminants, pesticides, and heavy metals.
//                 </p>
//                 <div className="flex flex-wrap gap-2 sm:text-sm text-xs">
//                   <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full  font-medium">
//                     Pesticide Free
//                   </span>
//                   <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full  font-medium">
//                     Heavy Metal Tested
//                   </span>
//                   <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full  font-medium">
//                     Microbiological Safe
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full sm:w-max">
//               <button className="px-4 py-2 w-full bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
//                 View Report
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* Product Gallery (Re-added Section) */}
//         <div className="py-10">
//           <h2 className="text-3xl font-bold border-b text-gray-900 mb-6 pb-3 text-center">
//             Product Gallery
//           </h2>

//           <div className="bg-white py-12 rounded-lg">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {product.details.img.map((image, idx) => (
//                   <motion.div
//                     key={idx}
//                     whileHover={{ scale: 1.05 }}
//                     className="aspect-square rounded-xl overflow-hidden shadow-lg cursor-pointer"
//                   >
//                     <img
//                       src={image.lg}
//                       alt={`Gallery ${idx + 1}`}
//                       className="w-full h-full object-cover"
//                       onClick={() => {
//                         setSelectedImage(idx);
//                         setIsFullScreen(true);
//                       }}
//                     />
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Reviews & Ratings */}
//         {/* <section className="mb-10" id="reviews" ref={sectionsRefs.reviews}>
//           <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
//             Customer Reviews ({product.reviews.length})
//           </h2>
//           <div className="flex items-center gap-6 mb-4">
//             <span className="text-6xl font-extrabold text-orange-500">
//               {product.averageRating}
//             </span>
//             <div className="flex flex-col">
//               <StarRating rating={product.averageRating} size={30} />
//               <span className="text-lg text-gray-600">
//                 Based on {product.reviews.length} reviews
//               </span>
//             </div>
//           </div>
//           <p className="text-gray-700 mt-4">
//             Review content and filters will be displayed here.
//           </p>
//         </section> */}

//         {/* Reviews Section */}
//         <div className="bg-gray-50 py-12">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-3">
//               Customer Reviews ({product.reviews.length})
//             </h2>
//             {/* Review Stats */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
//               {/* Overall Rating */}
//               <div className="bg-white rounded-2xl p-6 shadow-xl text-center flex flex-col items-center justify-center border-t-4 border-orange-500">
//                 <p className="text-4xl font-extrabold text-gray-900">
//                   {product.averageRating}
//                 </p>
//                 <StarRating rating={product.averageRating} size={28} />
//                 <p className="text-sm text-gray-600 mt-2">
//                   Based on {product.reviews.length} ratings
//                 </p>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setShowReviewModal(true)}
//                   className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors text-sm"
//                 >
//                   Write a Review
//                 </motion.button>
//               </div>

//               {/* Rating Breakdown */}
//               <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl space-y-3">
//                 {[5, 4, 3, 2, 1].map((rating) => (
//                   <div key={rating} className="flex items-center gap-3">
//                     <span className="text-sm font-medium text-gray-700 w-4">
//                       {rating} ★
//                     </span>
//                     <div className="flex-1 bg-gray-200 rounded-full h-2">
//                       <div
//                         className="bg-orange-500 h-2 rounded-full"
//                         style={{
//                           width: `${(
//                             (Math.random() * (rating / 5) * 100) /
//                             1.5
//                           ).toFixed(0)}%`,
//                         }}
//                       ></div>
//                     </div>
//                     <span className="text-sm text-gray-600 w-8 text-right">
//                       {Math.round(
//                         (Math.random() *
//                           (rating / 5) *
//                           product.reviews.length) /
//                           1.5
//                       )}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Filters */}
//             <div className="bg-white rounded-xl p-4 mb-6">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 {/* Rating Filter */}
//                 <div className="flex-1">
//                   <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                     {" "}
//                     Filter by Rating{" "}
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {["all", "5", "4", "3", "2", "1"].map((rating) => (
//                       <button
//                         key={rating}
//                         onClick={() => setSelectedRatingFilter(rating)}
//                         className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                           selectedRatingFilter === rating
//                             ? "bg-orange-500 text-white"
//                             : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
//                         }`}
//                       >
//                         {rating === "all" ? "All" : `${rating} ★`}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 {/* Tag Filter */}
//                 <div className="flex-1">
//                   <label className="text-sm font-semibold text-gray-700 mb-2 block">
//                     {" "}
//                     Filter by Tags{" "}
//                   </label>
//                   <div className="flex flex-wrap gap-2">
//                     {["all", "Taste", "Packaging", "Texture", "Purity"].map(
//                       (tag) => (
//                         <button
//                           key={tag}
//                           onClick={() => setSelectedTagFilter(tag)}
//                           className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                             selectedTagFilter === tag
//                               ? "bg-orange-500 text-white"
//                               : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
//                           }`}
//                         >
//                           {tag}
//                         </button>
//                       )
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Reviews List */}
//             <div className="space-y-6">
//               {reviewss.map((review, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 10 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-500"
//                 >
//                   <div className="flex items-start justify-between mb-2">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-orange-500 font-bold flex-shrink-0">
//                         {review.name.charAt(0)}
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-900">
//                           {review.name}
//                         </p>
//                         {review.verified && (
//                           <span className="text-xs text-green-600 font-medium bg-green-50 px-2 rounded-full flex items-center gap-1">
//                             <CheckCircle size={12} /> Verified
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <StarRating rating={review.rating} size={16} />
//                       <span className="text-sm text-gray-500 block mt-1">
//                         {review.date}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Tags */}
//                   <div className="flex flex-wrap gap-2 mb-3">
//                     {review.tags.map((tag, tagIdx) => (
//                       <span
//                         key={tagIdx}
//                         className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>

//                   <h5 className="font-semibold text-gray-900 mb-2">
//                     {review.title}
//                   </h5>
//                   <p className="text-gray-700 leading-relaxed mb-4">
//                     {review.review}
//                   </p>

//                   {/* Images & Videos */}
//                   {(review.images.length > 0 || review.hasVideo) && (
//                     <div className="flex gap-3 flex-wrap">
//                       {review.images.map((img, imgIdx) => (
//                         <div
//                           key={imgIdx}
//                           className="w-24 h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative"
//                         >
//                           <img
//                             src={img}
//                             alt="Review"
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       ))}
//                       {review.hasVideo && (
//                         <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/80 cursor-pointer hover:bg-black transition-opacity flex items-center justify-center relative">
//                           <Play size={32} color="white" fill="white" />
//                           <span className="absolute bottom-1 right-2 text-xs text-white bg-black/50 px-1 rounded">
//                             Video
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//             </div>

//             {/* View All Reviews Button */}
//             <div className="text-center mt-10">
//               <button className="px-8 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-50 transition-colors">
//                 View All {product.reviews.length} Reviews
//               </button>
//             </div>

//             {/* Other Platform Reviews */}
//             <div className="mt-12 pt-8 border-t">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">
//                 {" "}
//                 Reviews from Other Platforms{" "}
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {reviews.map((review, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white rounded-xl p-6 shadow-md text-center border border-gray-100"
//                   >
//                     <h4 className="font-semibold text-gray-900 mb-2">
//                       {" "}
//                       {review.platform}{" "}
//                     </h4>
//                     <StarRating rating={review.rating} size={18} />
//                     <p className="text-2xl font-bold text-gray-900 mt-2">
//                       {" "}
//                       {review.rating}{" "}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       {" "}
//                       {review.count} reviews{" "}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* <hr className="border-t border-gray-200" /> */}

//         {/* FAQ's */}
//         <section className="mb-10" id="faqs" ref={sectionsRefs.faqs}>
//           <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
//             Frequently Asked Questions
//           </h2>
//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <AccordionItem
//                 key={faq.id}
//                 title={faq.question}
//                 content={faq.answer}
//                 isOpen={openAccordion === faq.id}
//                 onClick={() =>
//                   setOpenAccordion(openAccordion === faq.id ? null : faq.id)
//                 }
//               />
//             ))}
//           </div>
//         </section>

//         {/* Why Us / USPs */}
//         <section
//           className="mb-10 mt-20 text-center"
//           id="whyus"
//           ref={sectionsRefs.whyus}
//         >
//           <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
//             Why Choose Us?
//           </h2>
//           {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {product.usps.map((usp, idx) => (
//               <motion.div
//                 key={idx}
//                 className="p-6 bg-white rounded-xl shadow-md border-l-4 border-orange-500 flex items-start gap-4"
//                 whileHover={{
//                   scale: 1.02,
//                   boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
//                 }}
//               >
//                 <CheckCircle
//                   size={24}
//                   className="text-orange-500 flex-shrink-0 mt-0.5"
//                 />
//                 <p className="font-semibold text-gray-800">{usp}</p>
//               </motion.div>
//             ))}
//           </div> */}

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 mt-10">
//             {[
//               {
//                 icon: Award,
//                 title: "Premium Quality",
//                 desc: "Hand-picked and quality tested for the finest experience.",
//               },
//               {
//                 icon: Truck,
//                 title: "Fast Delivery",
//                 desc: "Quick and reliable shipping across all major locations in India.",
//               },
//               {
//                 icon: Shield,
//                 title: "100% Authentic",
//                 desc: "Genuine organic products sourced directly from trusted farmers.",
//               },
//             ].map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 whileHover={{ y: -8 }}
//                 className="bg-white rounded-2xl p-6 text-center shadow-xl transition-all"
//               >
//                 <item.icon size={40} className="text-orange-500 mx-auto mb-4" />
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>

//           {/* Additional Points */}
//           <div className="bg-white rounded-2xl p-8 mt-8 shadow-lg">
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
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.1 }}
//                   className="flex items-start gap-3 p-3 bg-green-50 rounded-lg hover:bg-orange-50 transition-colors"
//                 >
//                   <CheckCircle
//                     size={20}
//                     className="text-green-600 flex-shrink-0 mt-0.5"
//                   />
//                   <span className="text-gray-700 font-medium text-left">{point}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* People Also Bought */}
//         <div className="bg-white py-12 mt-16 rounded-2xl">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-3xl font-bold text-gray-900">
//                 People Also Bought
//               </h2>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1"
//               >
//                 View All
//                 <ChevronRight size={20} />
//               </motion.button>
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//               {[
//                 {
//                   id: 1,
//                   name: "Organic Green Tea",
//                   image:
//                     "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
//                   price: 399,
//                   originalPrice: 499,
//                   discount: 20,
//                   rating: 4.3,
//                   reviews: 89,
//                   tag: "Bestseller",
//                 },
//                 {
//                   id: 2,
//                   name: "Raw Honey - Pure & Natural",
//                   image:
//                     "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400",
//                   price: 549,
//                   originalPrice: 699,
//                   discount: 21,
//                   rating: 4.7,
//                   reviews: 156,
//                   tag: "New",
//                 },
//                 {
//                   id: 3,
//                   name: "Organic Turmeric Powder",
//                   image:
//                     "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400",
//                   price: 199,
//                   originalPrice: 299,
//                   discount: 33,
//                   rating: 4.5,
//                   reviews: 203,
//                   tag: "Hot Deal",
//                 },
//                 {
//                   id: 4,
//                   name: "Cold Pressed Coconut Oil",
//                   image:
//                     "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400",
//                   price: 449,
//                   originalPrice: 599,
//                   discount: 25,
//                   rating: 4.6,
//                   reviews: 178,
//                   tag: null,
//                 },
//                 {
//                   id: 5,
//                   name: "Organic Almond Butter",
//                   image:
//                     "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400",

//                   price: 699,
//                   originalPrice: 899,
//                   discount: 22,
//                   rating: 4.4,
//                   reviews: 92,
//                   tag: "Popular",
//                 },
//                 {
//                   id: 6,
//                   name: "Herbal Chamomile Tea",
//                   image:
//                     "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400",
//                   price: 349,
//                   originalPrice: 449,
//                   discount: 22,
//                   rating: 4.2,
//                   reviews: 67,
//                   tag: null,
//                 },
//                 {
//                   id: 7,
//                   name: "Organic Chia Seeds",
//                   image:
//                     "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400",
//                   price: 299,
//                   originalPrice: 399,
//                   discount: 25,
//                   rating: 4.8,
//                   reviews: 245,
//                   tag: "Top Rated",
//                 },
//                 {
//                   id: 8,
//                   name: "Pure Jaggery Powder",
//                   image:
//                     "https://images.unsplash.com/photo-1604431696980-07e518647bec?w=400",
//                   price: 179,
//                   originalPrice: 249,
//                   discount: 28,
//                   rating: 4.1,
//                   reviews: 134,
//                   tag: null,
//                 },
//               ].map((item, idx) => (
//                 <motion.div
//                   key={item.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.05 }}
//                   whileHover={{
//                     y: -8,
//                     boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//                   }}
//                   className="bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer group"
//                 >
//                   {/* Image Container */}
//                   <div className="relative aspect-square bg-gray-100 overflow-hidden">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     />

//                     {/* Tag Badge */}
//                     {item.tag && (
//                       <motion.span
//                         initial={{ x: -100 }}
//                         animate={{ x: 0 }}
//                         className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded-full text-white ${
//                           item.tag === "Bestseller"
//                             ? "bg-purple-500"
//                             : item.tag === "New"
//                             ? "bg-blue-500"
//                             : item.tag === "Hot Deal"
//                             ? "bg-red-500"
//                             : item.tag === "Top Rated"
//                             ? "bg-green-500"
//                             : "bg-orange-500"
//                         }`}
//                       >
//                         {item.tag}
//                       </motion.span>
//                     )}

//                     {/* Discount Badge */}
//                     <span className="absolute top-3 right-3 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
//                       {item.discount}% OFF
//                     </span>

//                     {/* Quick Actions */}
//                     <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
//                       >
//                         Add to Cart
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
//                       >
//                         <Heart size={18} className="text-gray-600" />
//                       </motion.button>
//                     </div>
//                   </div>

//                   {/* Product Info */}
//                   <div className="p-4">
//                     {/* Rating */}
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded">
//                         <Star size={12} fill="#22C55E" color="#22C55E" />
//                         <span className="text-xs font-semibold text-green-700">
//                           {item.rating}
//                         </span>
//                       </div>
//                       <span className="text-xs text-gray-500">
//                         ({item.reviews})
//                       </span>
//                     </div>

//                     {/* Name */}
//                     <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
//                       {item.name}
//                     </h3>

//                     {/* Price */}
//                     <div className="flex items-center gap-2">
//                       <span className="text-lg font-bold text-gray-900">
//                         ₹{item.price}
//                       </span>
//                       <span className="text-sm text-gray-500 line-through">
//                         ₹{item.originalPrice}
//                       </span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Frequently Bought Together */}
        

// <motion.div
//   initial={{ opacity: 0, y: 20 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   viewport={{ once: true }}
//   className="mt-12 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 sm:p-6 md:p-8"
// >
//   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
//     <Zap size={20} className="sm:w-6 sm:h-6 text-orange-500" />
//     Frequently Bought Together
//   </h3>

//   <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4">
//     {/* Products Container - Scrollable on mobile */}
//     <div className="flex-1 overflow-x-auto">
//       <div className="flex items-center gap-3 sm:gap-4 min-w-max lg:min-w-0 pb-2 lg:pb-0">
//         {/* Current Product */}
//         <div className="flex items-center gap-3 bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow min-w-[200px] sm:min-w-[240px] lg:min-w-0 lg:flex-1">
//           <img
//             src={product.details.img[0].lg}
//             alt={product.details.name}
//             className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
//           />
//           <div className="flex-1 min-w-0">
//             <p className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2">
//               {product.details.name}
//             </p>
//             <p className="text-orange-600 font-bold text-sm sm:text-base mt-1">₹{finalPrice}</p>
//           </div>
//         </div>

//         <div className="text-xl sm:text-2xl font-bold text-gray-400 flex-shrink-0">+</div>

//         {/* Combo Product 1 */}
//         <div className="flex items-center gap-3 bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow min-w-[200px] sm:min-w-[240px] lg:min-w-0 lg:flex-1">
//           <img
//             src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400"
//             alt="Raw Honey"
//             className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
//           />
//           <div className="flex-1 min-w-0">
//             <p className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2">
//               Raw Honey - Pure
//             </p>
//             <p className="text-orange-600 font-bold text-sm sm:text-base mt-1">₹549</p>
//           </div>
//         </div>

//         <div className="text-xl sm:text-2xl font-bold text-gray-400 flex-shrink-0">+</div>

//         {/* Combo Product 2 */}
//         <div className="flex items-center gap-3 bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow min-w-[200px] sm:min-w-[240px] lg:min-w-0 lg:flex-1">
//           <img
//             src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400"
//             alt="Green Tea"
//             className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
//           />
//           <div className="flex-1 min-w-0">
//             <p className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2">
//               Organic Green Tea
//             </p>
//             <p className="text-orange-600 font-bold text-sm sm:text-base mt-1">₹399</p>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Divider for mobile */}
//     <div className="w-full h-px bg-gray-200 lg:hidden"></div>

//     {/* Total & Add - Sticky on mobile */}
//     <div className="flex flex-col items-center gap-3 bg-white rounded-xl p-4 shadow-lg lg:shadow-md lg:min-w-[200px] xl:min-w-[240px]">
//       <div className="text-center w-full">
//         <p className="text-xs sm:text-sm text-gray-600 mb-1">Bundle Price</p>
//         <div className="flex items-baseline justify-center gap-2 flex-wrap">
//           <span className="text-xl sm:text-2xl font-bold text-gray-900">
//             ₹{finalPrice + 549 + 399 - 200}
//           </span>
//           <span className="text-xs sm:text-sm text-gray-500 line-through">
//             ₹{finalPrice + 549 + 399}
//           </span>
//         </div>
//         <motion.span
//           animate={{ scale: [1, 1.05, 1] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="inline-block text-green-600 text-xs sm:text-sm font-semibold mt-1"
//         >
//           Save ₹200!
//         </motion.span>
//       </div>
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="w-full bg-[var(--themeColor)] hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm sm:text-base py-3 px-4 sm:px-6 rounded-xl transition-all shadow-md hover:shadow-lg touch-manipulation"
//       >
//         Add All to Cart
//       </motion.button>
//     </div>
//   </div>

//   {/* Mobile scroll hint */}
//   <p className="text-xs text-gray-500 text-center mt-3 lg:hidden">
//     ← Swipe to see all products →
//   </p>
// </motion.div>


//           </div>
//         </div>

//         {/* Additional Info */}
//         <section
//           className="mb-10 mt-10"
//           id="additionalinfo"
//           ref={sectionsRefs.additionalinfo}
//         >
//           <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
//             Additional Details
//           </h2>
//           <div className="bg-white p-6 rounded-xl shadow-md grid grid-cols-2 sm:grid-cols-3 gap-6">
//             {Object.entries(product.productInfo.additionalInfo).map(
//               ([key, value]) => (
//                 <div key={key}>
//                   <dt className="text-sm font-medium text-gray-500 capitalize">
//                     {key.replace(/([A-Z])/g, " $1")}:
//                   </dt>
//                   <dd className="text-base font-semibold text-gray-900">
//                     {value}
//                   </dd>
//                 </div>
//               )
//             )}
//           </div>
//         </section>

//         {/* Service Highlights */}
//         <div className="bg-white py-12">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid  grid-cols-3 gap-8 text-center">
//               <FeatureIcon icon={Truck} title="Fast Delivery" color="#3B82F6" />
//               <FeatureIcon
//                 icon={RotateCcw}
//                 title="Easy Returns"
//                 color="#9333EA"
//               />
//               <FeatureIcon
//                 icon={Shield}
//                 title="Secure Checkout"
//                 color="#10B981"
//               />
//             </div>
//           </div>
//         </div>

//         <hr className="border-t border-gray-200" />

//         {/* Payment Methods */}
//         <div className="bg-gray-50 py-12">
//           <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
//             <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
//               {" "}
//               We Accept{" "}
//             </h3>
//             <div className="bg-white rounded-xl w-full xs:p-4 py-2 shadow-sm">
//               <div className="flex flex-wrap justify-center items-center gap-4">
//                 {[
//                   { icon: CreditCard, label: "Cards" },
//                   { icon: Smartphone, label: "UPI" },
//                   { icon: Wallet, label: "Wallets" },
//                   { icon: Package, label: "COD" },
//                 ].map((payment, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg"
//                   >
//                     <payment.icon size={20} color="#6B7280" />
//                     <span className="text-sm font-medium text-gray-700">
//                       {" "}
//                       {payment.label}{" "}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Sticky Add to Cart Section (Visible when isSticky is true) */}
//       {/* <AnimatePresence>
//         {isSticky && (
//           <motion.div
//             initial={{ y: "100%", opacity: 0 }}
//             animate={{ y: "0%", opacity: 1 }}
//             exit={{ y: "100%", opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-orange-500 shadow-2xl z-50 p-4"
//           >
      
//             <div className="max-w-7xl mx-auto flex items-center justify-between">
//               <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//                 <span className="text-lg font-bold text-gray-900">
//                   {product.details.name}
//                 </span>
//                 <div className="flex items-center gap-2">
//                   <span className="text-2xl font-extrabold text-orange-600">
//                     ₹{finalPrice}
//                   </span>
//                   <span className="text-lg text-gray-500 line-through">
//                     ₹{product.details.price}
//                   </span>
//                 </div>
//               </div>


//  <div className="flex items-center gap-4">
//                     <span className="font-semibold text-gray-700">
//                       Quantity:
//                     </span>
//                     <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
//                       <motion.button
//                         onClick={() => setQty(Math.max(1, qty - 1))}
//                         className="px-4 py-2 hover:bg-gray-100 transition-colors"
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Minus size={18} />
//                       </motion.button>
//                       <span className="px-6 py-2 font-bold border-x border-gray-300 w-16 text-center">
//                         {qty}
//                       </span>
//                       <motion.button
//                         onClick={() => setQty(qty + 1)}
//                         className="px-4 py-2 hover:bg-gray-100 transition-colors"
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Plus size={18} />
//                       </motion.button>
//                     </div>
//                   </div>

//               <div className="flex gap-3">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="hidden sm:inline-flex bg-[var(--themeColor)] hover:bg-orange-600 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition-colors"
//                 >
//                   Add to Cart ({qty})
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="bg-gray-900 hover:bg-gray-800 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition-colors"
//                 >
//                   Buy Now
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence> */}
//       <AnimatePresence>
//   {isSticky && (
//     <motion.div
//       initial={{ y: "100%", opacity: 0 }}
//       animate={{ y: "0%", opacity: 1 }}
//       exit={{ y: "100%", opacity: 0 }}
//       transition={{ duration: 0.3 }}
//       className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-orange-500 shadow-2xl z-50"
//     >
//       <div className="max-w-7xl mx-auto px-3 py-3 sm:px-4 sm:py-4">
//         {/* Mobile Layout (< md) */}
//         <div className="md:hidden space-y-3">
//           {/* Product Info Row */}
//           <div className="flex items-start justify-between gap-3">
//             <div className="flex-1 min-w-0">
//               <h4 className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">
//                 {product.details.name}
//               </h4>
//               <div className="flex items-center gap-2">
//                 <span className="text-lg font-extrabold text-orange-600">
//                   ₹{finalPrice}
//                 </span>
//                 <span className="text-sm text-gray-500 line-through">
//                   ₹{product.details.price}
//                 </span>
//               </div>
//             </div>

//             {/* Quantity Control - Compact */}
//             <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
//               <motion.button
//                 onClick={() => setQty(Math.max(1, qty - 1))}
//                 className="px-2.5 py-2 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
//                 whileTap={{ scale: 0.95 }}
//                 aria-label="Decrease quantity"
//               >
//                 <Minus size={16} />
//               </motion.button>
//               <span className="px-3 py-2 font-bold border-x border-gray-300 min-w-[40px] text-center text-sm">
//                 {qty}
//               </span>
//               <motion.button
//                 onClick={() => setQty(qty + 1)}
//                 className="px-2.5 py-2 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
//                 whileTap={{ scale: 0.95 }}
//                 aria-label="Increase quantity"
//               >
//                 <Plus size={16} />
//               </motion.button>
//             </div>
//           </div>

//           {/* Action Buttons Row */}
//           <div className="flex gap-2">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="flex-1 bg-[var(--themeColor)] hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm py-3 rounded-xl shadow-lg transition-all touch-manipulation"
//             >
//               Add to Cart
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="flex-1 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white font-bold text-sm py-3 rounded-xl shadow-lg transition-all touch-manipulation"
//             >
//               Buy Now
//             </motion.button>
//           </div>
//         </div>

//         {/* Tablet Layout (md to lg) */}
//         <div className="hidden md:flex lg:hidden items-center justify-between gap-4">
//           {/* Left: Product Info */}
//           <div className="flex flex-col gap-1 min-w-0 flex-shrink">
//             <h4 className="text-base font-bold text-gray-900 line-clamp-1">
//               {product.details.name}
//             </h4>
//             <div className="flex items-center gap-2">
//               <span className="text-xl font-extrabold text-orange-600">
//                 ₹{finalPrice}
//               </span>
//               <span className="text-sm text-gray-500 line-through">
//                 ₹{product.details.price}
//               </span>
//             </div>
//           </div>

//           {/* Middle: Quantity */}
//           <div className="flex items-center gap-3 flex-shrink-0">
//             <span className="font-semibold text-gray-700 text-sm">Qty:</span>
//             <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//               <motion.button
//                 onClick={() => setQty(Math.max(1, qty - 1))}
//                 className="px-3 py-2 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
//                 whileTap={{ scale: 0.95 }}
//                 aria-label="Decrease quantity"
//               >
//                 <Minus size={18} />
//               </motion.button>
//               <span className="px-4 py-2 font-bold border-x border-gray-300 min-w-[50px] text-center">
//                 {qty}
//               </span>
//               <motion.button
//                 onClick={() => setQty(qty + 1)}
//                 className="px-3 py-2 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
//                 whileTap={{ scale: 0.95 }}
//                 aria-label="Increase quantity"
//               >
//                 <Plus size={18} />
//               </motion.button>
//             </div>
//           </div>

//           {/* Right: Actions */}
//           <div className="flex gap-3 flex-shrink-0">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-[var(--themeColor)] hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg transition-all touch-manipulation whitespace-nowrap"
//             >
//               Add to Cart
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg transition-all touch-manipulation"
//             >
//               Buy Now
//             </motion.button>
//           </div>
//         </div>

//         {/* Desktop Layout (lg+) */}
//         <div className="hidden lg:flex items-center justify-between gap-6">
//           {/* Left: Product Info */}
//           <div className="flex items-center gap-4 min-w-0 flex-1">
//             <div className="flex flex-col gap-1">
//               <h4 className="text-lg font-bold text-gray-900 line-clamp-1">
//                 {product.details.name}
//               </h4>
//               <div className="flex items-center gap-2">
//                 <span className="text-2xl font-extrabold text-orange-600">
//                   ₹{finalPrice}
//                 </span>
//                 <span className="text-lg text-gray-500 line-through">
//                   ₹{product.details.price}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Middle: Quantity */}
//           <div className="flex items-center gap-4 flex-shrink-0">
//             <span className="font-semibold text-gray-700">Quantity:</span>
//             <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
//               <motion.button
//                 onClick={() => setQty(Math.max(1, qty - 1))}
//                 className="px-4 py-2 hover:bg-gray-100 active:bg-gray-200 transition-colors"
//                 whileTap={{ scale: 0.95 }}
//                 aria-label="Decrease quantity"
//               >
//                 <Minus size={18} />
//               </motion.button>
//               <span className="px-6 py-2 font-bold border-x border-gray-300 w-16 text-center">
//                 {qty}
//               </span>
//               <motion.button
//                 onClick={() => setQty(qty + 1)}
//                 className="px-4 py-2 hover:bg-gray-100 active:bg-gray-200 transition-colors"
//                 whileTap={{ scale: 0.95 }}
//                 aria-label="Increase quantity"
//               >
//                 <Plus size={18} />
//               </motion.button>
//             </div>
//           </div>

//           {/* Right: Actions */}
//           <div className="flex gap-3 flex-shrink-0">
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-[var(--themeColor)] hover:bg-orange-600 active:bg-orange-700 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all"
//             >
//               Add to Cart ({qty})
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all"
//             >
//               Buy Now
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   )}
// </AnimatePresence>
//       {/* Full Screen Image Modal */}
//       <AnimatePresence>
//         {isFullScreen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             style={{ backgroundColor: "rgba(62, 44, 27, 0.95)" }}
//             onClick={() => setIsFullScreen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               className="relative max-w-2xl max-h-full"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <img
//                 src={product.details.img[selectedImage].lg}
//                 alt={product.details.name}
//                 className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
//               />

//               {/* Close Button */}
//               <motion.button
//                 onClick={() => setIsFullScreen(false)}
//                 className="absolute top-6 right-6 p-2 rounded-full text-white shadow-lg"
//                 style={{ backgroundColor: "rgba(122, 46, 29, 0.8)" }}
//                 whileHover={{
//                   scale: 1.1,
//                   backgroundColor: "#7A2E1D",
//                   rotate: 90,
//                 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <X size={16} />
//               </motion.button>

//               {/* Navigation */}
//               <motion.button
//                 onClick={prevImage}
//                 className="absolute left-1 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white shadow-lg"
//                 style={{ backgroundColor: "rgba(122, 46, 29, 0.8)" }}
//                 // whileHover={{ scale: 1.1, backgroundColor: '#7A2E1D' }}
//                 // whileTap={{ scale: 0.9 }}
//               >
//                 <ChevronLeft size={16} />
//               </motion.button>
//               <motion.button
//                 onClick={nextImage}
//                 className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white shadow-lg"
//                 style={{ backgroundColor: "rgba(122, 46, 29, 0.8)" }}
//                 // whileHover={{ scale: 1.1, backgroundColor: '#7A2E1D' }}
//                 // whileTap={{ scale: 0.9 }}
//               >
//                 <ChevronRight size={16} />
//               </motion.button>

//               {/* Image Counter */}
//               <div
//                 className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white font-bold"
//                 style={{ backgroundColor: "rgba(122, 46, 29, 0.9)" }}
//               >
//                 {selectedImage + 1} / {product.details.img.length}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ProductDetails;
