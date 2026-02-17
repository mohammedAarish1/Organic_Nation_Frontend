// import React, { useState } from 'react';
// // react icons
// import ProductQty from '../../productQty/ProductQty';
// import AddToCartBtn from '../../add-to-cart-btn/AddToCartBtn';

// const ProductInfo = ({product}) => {
//   const [qty, setQty] = useState(1);

//   // const increaseQty = (q) => {

//   //   setQty((prevQty) => prevQty + 1)
//   // };
//   // const decreaseQty = () => {
//   //   qty > 1 ? setQty(qty - 1) : setQty(1)
//   // };

//   return (
//     <div className="md:w-[50%] max-h-[600px]  flex md:justify-start justify-center items-center gap-4 py-6 xs:pr-10 px-4 xs:pl-10 md:pl-0 font-s  ">
//     <div className='flex flex-col lg:gap-3 gap-1 tracking-wide'>
//       <h2 className='md:block hidden font-medium md:text-4xl text-xl text-[var(--themeColor)]' >{product.details.name}</h2>
//       <p className=''><span className='font-semibold'>Brand: </span><span>ORGANIC NATION</span> </p>
//       <p className='flex items-center gap-2'><span className='border border-green-600'><GoDotFill className='text-green-700' /></span><span className='font-semibold '>Pure Vegetarian Product</span></p>
//       <p className=''><span className=' font-semibold'>Weight: </span>{product.details.weight}</p>
//       <p className=''><span className=' font-semibold'>Category: </span>{product.details.category}</p>
//       <div className='flex justify-start items-center gap-6'>
//         <div className='flex justify-start items-center gap-2'>
//           <p>{product.averageRating}</p>
//           <div className='flex justify-start items-center gap-2'>
//             {[...Array(5)].map((star, index) => {
//               const ratingValue = index + 0.5;
//               return (
//                 <label key={index}>
//                   <input
//                     type="radio"
//                     name="rating"
//                     value={ratingValue}
//                     // onClick={() => setFieldValue('rating', ratingValue)}
//                     className='hidden'
//                   />
//                   {product.averageRating >= index + 1 ? (
//                     <FaStar className="text-orange-400" />
//                   ) : product.averageRating >= index + 0.5 ? (
//                     <FaStarHalfAlt className='text-orange-400' />
//                   ) : (
//                     <AiOutlineStar className="text-orange-400" />
//                   )}

//                 </label>
//               );
//             })}
//           </div>
//         </div>
//         <p className=''>{product.reviews.length} <span>ratings</span></p>
//       </div>

//       <div className='flex gap-3  items-center '>
//         {product.details.discount!==0 &&  <p className='text-2xl text-red-600'>-{product.details.discount}%</p> }

//         <p className='flex items-start'>
//           <FaIndianRupeeSign className='text-sm' />
//           <span className='text-3xl font-medium'>{Math.round(product.details.price - (product.details.price * product.details.discount / 100))}</span>
//         </p>
//         <p className='text-gray-600 text-sm self-end'>(Incl. of all taxes)</p>
//       </div>
//      {product.details.discount !==0 &&  <p><span className='font-semibold text-sm'>MRP:</span> <span className='line-through'> ₹{product.details.price}</span> </p>
//     }

//       {/* <p className='lg:w-[70%]'>{product.description}</p> */}
//       <p className='text-green-700 font-semibold'>*Cash On Delivery is available</p>
//       <p className='flex items-center gap-2'><LiaShippingFastSolid className='text-xl' /> <span>Free shipping for all orders above freeShippingEligibleAmt</span></p>
//       <p className='flex items-center gap-3'><span>In Stock:</span>{product.details.availability ? (<FaCircleCheck className='text-xl text-[var(--background-color)]' />) : (<HiXCircle className='text-3xl text-red-700' />)}</p>
//       <div className='flex items-center gap-2 xs:mb-0 mb-5'>
//         {/* Quantity:-  <ProductQty qty={qty} increaseQty={increaseQty} decreaseQty={decreaseQty} /> */}
//         Quantity:-  <ProductQty qty={qty} setQty={setQty} />
//       </div>
//       <div>
//         <AddToCartBtn item={product.details} qty={qty} />
//       </div>
//     </div>
//   </div>
//   )
// }

// export default ProductInfo;

import { motion } from "framer-motion";
import {
  Truck,
  Shield,
  CreditCard,
  Heart,
  CheckCircle,
  Award,
  Wallet,
  RotateCcw,
  Star,
  StarHalf,
  BadgePercent,
} from "lucide-react";
import ProductQty from "../../../components/productQty/ProductQty";
import AddToCartBtn from "../../add-to-cart-btn/AddToCartBtn";
import BuyNowBtn from "../../add-to-cart-btn/BuyNowBtn";
import WishListBtn from "../../add-to-cart-btn/WishListBtn";
import CheckDeliveryAvailability from "../cart/CheckDeliveryAvailability";
import { memo, useMemo, useState } from "react";
import ShareBtn from "../../add-to-cart-btn/ShareBtn";
import StarRating from "../../common/StarRating";
import { freeShippingEligibleAmt } from "../../../constants";

const offers = [
  {
    tag: "BUNDLE",
    text: "FLAT 40% OFF on buying 2 or more items",
    code: null,
    highlight: true,
    category: "Organic Honey",
  },
  {
    tag: "BANK",
    text: "Instant 5% Off on Online Payments",
    code: null,
    highlight: false,
    category: "all",
  },
  // {
  //   tag: "COUPON",
  //   text: "Use code ORGANIC15 for extra 15% off",
  //   code: "ORGANIC15",
  //   highlight: false,
  // },
  // {
  //   tag: "FREEBIE",
  //   text: "Free sample pack on orders above ₹999",
  //   code: null,
  //   highlight: false,
  // },
];

const OfferBox = ({ offer }) => {
  return (
    <motion.div
      // key={idx}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className={`flex flex-col items-center p-1 min-w-32 w-72 h-18 rounded-lg cursor-pointer transition-all ${
        offer.highlight
          ? "bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-300 shadow-md"
          : "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
      }`}
    >
      <motion.span
        animate={offer.highlight ? { scale: [1, 1.1, 1] } : {}}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className={`px-2 py-0.5 text-white text-xs font-bold rounded-full flex-shrink-0 ${
          offer.highlight ? "bg-orange-500" : "bg-green-600"
        }`}
      >
        {offer.tag}
      </motion.span>

      <div className="mt-2 flex-1 text-center">
        <p
          className={`text-xs font-medium ${
            offer.highlight ? "text-orange-800" : "text-gray-800"
          }`}
        >
          {offer.text}
          <br />
          {offer.highlight && (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2 text-xs text-red-600 font-bold"
            >
              🔥 Most Popular
            </motion.span>
          )}
        </p>
        {offer.code && (
          <div className="mt-1">
            <span className="text-xs text-gray-600">Code:</span>
            <motion.span
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(34, 197, 94, 0)",
                  "0 0 0 4px rgba(34, 197, 94, 0.3)",
                  "0 0 0 0 rgba(34, 197, 94, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-2 py-0.5 bg-white border border-dashed border-green-500 text-green-700 text-xs font-bold rounded"
            >
              {offer.code}
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ProductInfo = memo(
  ({ product, qty, setQty, setIsCheckoutOpen, actionButtonRef }) => {
    console.log('product', product)
    const [isWishlisted, setIsWishlisted] = useState(false);
    const finalPrice = useMemo(
      () =>
        Math.round(
          product?.details?.price -
            (product?.details?.price * product?.details?.discount) / 100,
        ),
      [product?.details.price, product?.details.discount],
    );

    const pricePerGram = useMemo(() => {
      const weightMatch = product?.details.weight.match(/(\d+)/);
      const weightInGrams = weightMatch ? parseInt(weightMatch[1]) : 1;
      return (finalPrice / weightInGrams).toFixed(2);
    }, [finalPrice, product?.details.weight]);
    return (
      <div className="flex flex-col">
        <div className="flex-1">
          {/* Title and Ratings */}
          <h1 className="text-xl lg:text-2xl font-extrabold text-gray-900 mb-1">
            {product?.details.title || product?.details.name}
          </h1>
          {/* USPs */}
          <div className="flex flex-wrap gap-2 mb-2">
            {product?.productInfo?.usps?.map((usp, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium flex items-center gap-1"
              >
                <CheckCircle size={16} />
                {usp}
              </span>
            ))}
          </div>

          <div className="flex items-center flex-wrap gap-4 mb-1 pb-2 border-b border-gray-100">
            <StarRating rating={product.averageRating} size={16} />
            <span className="font-semibold text-gray-900">
              {product.averageRating}
            </span>
            <a
              href="#reviews"
              className="text-orange-600 hover:text-orange-700 font-medium underline-offset-4 hover:underline transition-colors"
            >
              ({product.reviews.length} reviews)
            </a>

            {/* External Reviews */}
            {product.productInfo.otherReviews?.length > 0 && (
              <div className="flex items-center gap-3 xs:ml-auto">
                {product.productInfo.otherReviews.map((review, index) => {
                  if (review.rating<4) return null;
                  return (
                    <a
                      key={index}
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center  gap-1.5 hover:opacity-80 transition-opacity"
                      title={`${review.platform.toUpperCase()} Rating`}
                    >
                      <span className="text-sm font-medium text-gray-600">
                        {/* {review.platform === "amazon" ? "Amazon🛒" : "FK🛍️"} */}
                        {review.platform}
                      </span>
                      <StarRating rating={review.rating} size={12} />
                      <span className="text-sm font-semibold text-gray-900">
                        {review.rating}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Net Content & Price per Gram */}

          <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
            <p className="text-center">
              <span className=" text-xs font-medium">Net Content</span>{" "}
              <span className="font-semibold text-gray-900">
                ({product.details.weight})
              </span>
            </p>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="text-center">
              <span className=" text-xs font-medium">Price per Gram</span>{" "}
              <span className="font-semibold text-gray-900">
                (₹{pricePerGram}/g)
              </span>
            </div>
          </div>

          {/* Pricing Block */}
          <div className="bg-orange-50 rounded-xl px-4 py-2 mb-4 shadow-inner">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-extrabold text-gray-900">
                ₹{finalPrice}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ₹{product.details.price}
              </span>
              {product.details.discount>0 && (
  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold shadow-md">
                {product.details.discount}% OFF
              </span>
              )}
            
            </div>
            <p className="text-xs text-gray-600 mb-3">Inclusive of all taxes</p>

            {/* Shipping & COD Info */}
            <div className="flex flex-wrap gap-2 mb-1">
              <div className="flex items-center gap-2 text-xs text-green-700 bg-green-100 px-2 py-1 rounded-lg font-semibold">
                <Truck size={14} />
                Free Shipping (Above ₹{freeShippingEligibleAmt})
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-lg font-semibold">
                <Wallet size={14} />
                COD Available
              </div>
              <div className="flex items-center gap-2 text-xs text-red-700 bg-blue-100 px-2 py-1 rounded-lg font-semibold">
                <BadgePercent size={14} />
                Flat 5% off on Prepaid Orders
              </div>
            </div>
          </div>

          {/* Available Offers */}
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-orange-500"
                >
                  <path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5" />
                  <path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.8 1.1z" />
                </svg>
              </motion.div>
              Available Offers
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full"
              >
                HOT
              </motion.span>
            </h3>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide  py-1">
              {product.details.category === "Organic Honey" && (
                <OfferBox offer={offers[0]} />
              )}
              <OfferBox offer={offers[1]} />
            </div>
            {/* Limited Time Banner */}
            {/* <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg overflow-hidden relative"
                  >
                    <motion.div
                      animate={{ x: ["100%", "-100%"] }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="whitespace-nowrap text-white text-xs font-semibold"
                    >
                      ⏰ Limited Time Offer! • Sale ends in 24 hours • Don't
                      miss out! • ⏰ Limited Time Offer! • Sale ends in 24 hours
                      • Don't miss out!
                    </motion.div>
                  </motion.div> */}
          </div>

          {/* Action Buttons & Quantity (non-sticky desktop view) */}
          <div
            ref={actionButtonRef}
            className="pb-6 border-b lg:border-none lg:pb-0"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="font-semibold text-gray-700">Quantity:</span>
              <ProductQty qty={qty} setQty={setQty} />
            </div>

            <div className="w-full space-y-3 sm:space-y-0">
              {/* Mobile: Stacked layout */}
              <div className="flex flex-col gap-3 sm:hidden">
                <AddToCartBtn
                  item={product.details}
                  qty={qty}
                  extraClasses="flex py-4 gap-1 w-full items-center justify-center z-30"
                />
                <BuyNowBtn
                  item={product.details}
                  qty={qty}
                  setIsCheckoutOpen={setIsCheckoutOpen}
                  className="flex-1 font-bold text-lg py-4 touch-manipulation"
                />
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="flex-1 p-4 sm:h-full max-h-10 border-2 border-gray-300 rounded-xl hover:border-red-500 active:border-red-600 transition-all flex items-center justify-center gap-2 touch-manipulation"
                    // className="flex items-center justify-center border-2 max-h-min"
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    <Heart
                      size={22}
                      className="flex-shrink-0"
                      fill={isWishlisted ? "#EF4444" : "none"}
                      color={isWishlisted ? "#EF4444" : "#6B7280"}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Wishlist
                    </span>
                  </motion.button>
                  <ShareBtn product={product} className="flex-1" />
                </div>
              </div>

              {/* Tablet+: All in one line */}
              <div className="hidden sm:flex gap-3">
                <AddToCartBtn
                  item={product.details}
                  qty={qty}
                  extraClasses="flex flex-1 gap-1 w-full items-center justify-center z-30"
                />
                <BuyNowBtn
                  item={product.details}
                  qty={qty}
                  setIsCheckoutOpen={setIsCheckoutOpen}
                  className="flex-1 font-bold text-lg py-4 touch-manipulation"
                />
                <WishListBtn productId={product?.details["name-url"]} />
                <ShareBtn product={product} />
              </div>
            </div>

            {/* Trust Line & Guarantee */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-1 text-xs sm:text-sm">
              <div className="flex items-center sm:gap-4 gap-2 text-gray-600">
                <span className="flex items-center gap-1">
                  <Shield size={16} className="text-green-600" />
                  Secure payment
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Truck size={16} className="text-blue-600" />
                  Fast delivery
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <RotateCcw size={16} className="text-purple-600" />
                  Easy returns
                </span>
              </div>
              <button className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
                <CheckCircle size={16} />
                7-Day Return Policy
              </button>
            </div>
          </div>

          {/* Pincode Checker */}
          <CheckDeliveryAvailability />

          {/* Trust Badges - Optimized Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 ">
            <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-md">
              <Shield size={18} className="text-green-600" />
              <span className="text-xs font-semibold text-gray-700">FSSAI</span>
              <span className="text-xs text-gray-500">
                Lic:{product.productInfo?.additionalInfo.fssaiLicense}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-md">
              <CheckCircle size={18} className="text-green-600" />
              <span className="text-xs font-semibold text-gray-700">
                Lab Tested
              </span>
              <span className="text-xs text-gray-500">Certified</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-md">
              <Award size={18} className="text-green-600" />
              <span className="text-xs font-semibold text-gray-700">
                Original & Pure
              </span>
              <span className="text-xs text-gray-500">Verified</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-white rounded-lg shadow-md">
              <CreditCard size={18} className="text-blue-600" />
              <span className="text-xs font-semibold text-gray-700">
                Secure
              </span>
              <span className="text-xs text-gray-500">Payment</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default ProductInfo;
