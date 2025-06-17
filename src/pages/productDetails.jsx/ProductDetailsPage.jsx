import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaTruck,
  FaUndo,
  FaEye,
  FaTag,
  FaCheckCircle,
  FaFire
} from 'react-icons/fa';
import {
  FaShield,
} from 'react-icons/fa6';
import AddToCartBtn from '../../components/add-to-cart-btn/AddToCartBtn';
import ProductQty from '../../components/productQty/ProductQty';
import { GoDotFill } from 'react-icons/go';

const ProductDetailsPage = ({ product }) => {



  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  // const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [qty, setQty] = useState(1);


  const nextImage = () => {
    setImageLoading(true);
    setSelectedImage((prev) => (prev + 1) % product.details.img.length);
    setTimeout(() => setImageLoading(false), 300);
  };

  const prevImage = () => {
    setImageLoading(true);
    setSelectedImage((prev) => (prev - 1 + product.details.img.length) % product.details.img.length);
    setTimeout(() => setImageLoading(false), 300);
  };

  // const handleQuantityChange = (action) => {
  //   if (action === 'increase' && quantity < product.details.stockCount) {
  //     setQuantity(prev => prev + 1);
  //   } else if (action === 'decrease' && quantity > 1) {
  //     setQuantity(prev => prev - 1);
  //   }
  // };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Image Gallery */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Main Image */}
            <div className="relative">
              <motion.div
                className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                style={{ backgroundColor: '#FFFFFF' }}
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ duration: 0.4, type: "spring" }}
                onClick={() => setIsFullScreen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.details.img[selectedImage].lg}
                    alt={product.details.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* View Full Size Badge */}
                {/* <motion.div
                  className="absolute top-4 right-4 px-4 py-2 rounded-full text-white text-sm font-semibold flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ backgroundColor: '#7A2E1D' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <FaEye />
                  <span>Full View</span>
                </motion.div> */}

                {/* Trending Badge */}
                {/* {product.details.trending && (
                  <motion.div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold flex items-center space-x-1"
                    style={{ backgroundColor: '#D87C45' }}
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <FaFire />
                    <span>TRENDING</span>
                  </motion.div>
                )} */}

                {/* Navigation Arrows */}
                <motion.button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: '#F5EFE6', color: '#7A2E1D' }}
                >
                  <FaChevronLeft />
                </motion.button>
                <motion.button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: '#F5EFE6', color: '#7A2E1D' }}
                >
                  <FaChevronRight />
                </motion.button>

                {/* Image Counter */}
                <div
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm font-semibold"
                  style={{ backgroundColor: 'rgba(122, 46, 29, 0.8)' }}
                >
                  {selectedImage + 1} / {product.details.img.length}
                </div>
              </motion.div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-4 overflow-x-auto p-2">
              {product.details.img.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setImageLoading(true);
                    setSelectedImage(index);
                    setTimeout(() => setImageLoading(false), 300);
                  }}
                  className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-3 transition-all duration-300 ${selectedImage === index
                    ? 'ring-4 shadow-xl transform scale-105'
                    : 'hover:scale-110 shadow-md'
                    }`}
                  style={{
                    borderColor: selectedImage === index ? '#9B7A2F' : '#DCD2C0',
                    ringColor: selectedImage === index ? '#9B7A2F' : 'transparent'
                  }}
                >
                  <img
                    src={image.lg}
                    alt={`${product.details.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <motion.span
                  className="px-4 py-2 rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: '#9B7A2F' }}
                  whileHover={{ scale: 1.05 }}
                >
                  Organic Nation
                </motion.span>
                <motion.button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 rounded-full transition-all duration-300 hover:shadow-lg"
                  style={{ backgroundColor: '#DCD2C0' }}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaHeart
                    className={`text-xl transition-colors duration-300 ${isWishlisted ? 'text-red-500' : '#7A2E1D'
                      }`}
                    style={{ color: isWishlisted ? '#D87C45' : '#7A2E1D' }}
                  />
                </motion.button>
              </div>

              <motion.h1
                className="text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                style={{ color: '#3E2C1B' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {product.details.name}
              </motion.h1>

              {/* Rating */}
              <motion.div
                className="flex items-center space-x-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex text-2xl">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1 * i, type: "spring" }}
                    >
                      <FaStar
                        className={i < Math.floor(product.averageRating) ? '' : 'text-gray-300'}
                        style={{ color: i < Math.floor(product.averageRating) ? '#9B7A2F' : '#DCD2C0' }}
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-xl font-semibold" style={{ color: '#3E2C1B' }}>
                  {product.averageRating}
                </span>
                <span style={{ color: '#7A2E1D' }}>
                  ({product.reviews.length} reviews)
                </span>
              </motion.div>
            </div>


            <motion.div
              className="p-3 rounded-2xl"
              style={{ backgroundColor: '#FFFFFF', color: '#3E2C1B' }}
              // style={{ color: '#3E2C1B' }}

              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.02 }}
            >
              <p className='flex items-center gap-2'><span className='border border-green-600'><GoDotFill className='text-green-700' /></span><span className='font-medium '>Pure Vegetarian Product</span></p>

            </motion.div>


            {/* Price */}
            <motion.div
              className="flex items-center space-x-6 p-6 rounded-2xl"
              style={{ backgroundColor: '#FFFFFF' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-5xl font-bold" style={{ color: '#7A2E1D' }}>
                {/* ₹{product.details.price} */}
                ₹{Math.round(product.details.price - (product.details.price * product.details.discount / 100))}
              </span>
              <div className="flex flex-col">
                <span className="text-2xl line-through" style={{ color: '#9B7A2F' }}>
                  ₹{product.details.price}
                </span>
                <motion.span
                  className="px-3 py-1 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: '#D87C45' }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  {product.details.discount}% OFF
                  {/* {Math.round(((product.details.originalPrice - product.details.price) / product.details.originalPrice) * 100)}% OFF */}
                </motion.span>
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              className="p-6 rounded-2xl shadow-lg"
              style={{ backgroundColor: '#FFFFFF' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -2, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <h3 className="font-bold text-xl mb-6" style={{ color: '#7A2E1D' }}>
                Product Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Category', value: product.details.category.split(' > ').pop() },
                  { label: 'Weight', value: product.details.weight },
                  // { label: 'Roast', value: product.details.color },
                  // { label: 'Origin', value: product.details.model },
                  // { label: 'Guarantee', value: product.details.warranty },
                  { label: 'Stock', value: `${product.details.availability} available` }
                ].map((detail, index) => (
                  <motion.div
                    key={index}
                    className="flex justify-between items-center p-3 rounded-xl"
                    style={{ backgroundColor: '#F5EFE6' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: '#DCD2C0' }}
                  >
                    <span style={{ color: '#7A2E1D' }} className="font-medium">
                      {detail.label}:
                    </span>
                    <span
                      style={{ color: detail.label === 'Stock' ? '#6B8E23' : '#3E2C1B' }}
                      className="font-semibold"
                    >
                      {detail.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features */}

            {product.productInfo?.productInfo[1].content.length > 0 && (
              <motion.div
                className="p-6 rounded-2xl shadow-lg"
                style={{ backgroundColor: '#FFFFFF' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ y: -2 }}
              >
                <h3 className="font-bold text-xl mb-6" style={{ color: '#7A2E1D' }}>
                  Premium Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.productInfo.productInfo[1].content.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-xl transition-all duration-300"
                      style={{ backgroundColor: '#F5EFE6' }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: '#DCD2C0',
                        x: 5
                      }}
                    >
                      <FaCheckCircle style={{ color: '#6B8E23' }} />
                      <span style={{ color: '#3E2C1B' }} className="font-medium">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quantity and Actions */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >

              <div className='flex items-center gap-2 xs:mb-0 mb-5'>
                {/* Quantity:-  <ProductQty qty={qty} increaseQty={increaseQty} decreaseQty={decreaseQty} /> */}
                Quantity:-  <ProductQty qty={qty} setQty={setQty} />
              </div>

              {/* <div className="flex items-center space-x-6">
                <span className="font-bold text-lg" style={{ color: '#7A2E1D' }}>
                  Quantity:
                </span>
                <div className="flex items-center rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
                  <motion.button
                    onClick={() => handleQuantityChange('decrease')}
                    className="px-6 py-3 font-bold text-xl transition-all duration-300"
                    style={{
                      backgroundColor: quantity <= 1 ? '#DCD2C0' : '#F5EFE6',
                      color: quantity <= 1 ? '#9B7A2F' : '#7A2E1D'
                    }}
                    disabled={quantity <= 1}
                    whileHover={{ backgroundColor: '#DCD2C0' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    -
                  </motion.button>
                  <div className="px-8 py-3 font-bold text-xl" style={{ color: '#3E2C1B' }}>
                    {quantity}
                  </div>
                  <motion.button
                    onClick={() => handleQuantityChange('increase')}
                    className="px-6 py-3 font-bold text-xl transition-all duration-300"
                    style={{
                      backgroundColor: quantity >= product.details.stockCount ? '#DCD2C0' : '#F5EFE6',
                      color: quantity >= product.details.stockCount ? '#9B7A2F' : '#7A2E1D'
                    }}
                    disabled={quantity >= product.details.stockCount}
                    whileHover={{ backgroundColor: '#DCD2C0' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +
                  </motion.button>
                </div>
              </div> */}

              <div className="flex flex-col sm:flex-row gap-4">
                <AddToCartBtn item={product.details} qty={qty} />
                {/* <motion.button
                  className="flex-1 py-4 px-8 rounded-2xl font-bold text-lg text-white flex items-center justify-center space-x-3 shadow-lg transition-all duration-300"
                  style={{ backgroundColor: '#7A2E1D' }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: '#9B7A2F',
                    boxShadow: "0 10px 30px rgba(122, 46, 29, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </motion.button> */}
                {/* <motion.button
                  className="flex-1 py-4 px-8 rounded-2xl font-bold text-lg text-white shadow-lg transition-all duration-300"
                  style={{ backgroundColor: '#9B7A2F' }}
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: '#7A2E1D',
                    boxShadow: "0 10px 30px rgba(155, 122, 47, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Buy Now
                </motion.button> */}
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-8 border-t-2"
              style={{ borderColor: '#DCD2C0' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              {[
                { icon: FaTruck, title: "Free Shipping", subtitle: "On orders over ₹499", color: '#6B8E23' },
                { icon: FaShield, title: "Quality Assured", subtitle: "100% home-style", color: '#7A2E1D' },
                { icon: FaUndo, title: "Easy Returns", subtitle: "07-day policy", color: '#9B7A2F' }
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  className="text-center space-y-3 p-4 rounded-xl transition-all duration-300"
                  style={{ backgroundColor: '#FFFFFF' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: '#F5EFE6',
                    y: -5
                  }}
                >
                  <badge.icon className="mx-auto text-3xl" style={{ color: badge.color }} />
                  <div className="font-bold" style={{ color: '#3E2C1B' }}>
                    {badge.title}
                  </div>
                  <div className="text-sm" style={{ color: '#7A2E1D' }}>
                    {badge.subtitle}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Share */}
            {/* <motion.div
              className="flex items-center justify-center space-x-3 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <FaShare style={{ color: '#9B7A2F' }} />
              <span style={{ color: '#7A2E1D' }} className="font-semibold">
                Share this premium product
              </span>
            </motion.div> */}
          </motion.div>
        </motion.div>

        {/* Description */}
      </div>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(62, 44, 27, 0.95)' }}
            onClick={() => setIsFullScreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-2xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={product.details.img[selectedImage].lg}
                alt={product.details.name}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />

              {/* Close Button */}
              <motion.button
                onClick={() => setIsFullScreen(false)}
                className="absolute top-6 right-6 p-2 rounded-full text-white shadow-lg"
                style={{ backgroundColor: 'rgba(122, 46, 29, 0.8)' }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: '#7A2E1D',
                  rotate: 90
                }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes size={16} />
              </motion.button>

              {/* Navigation */}
              <motion.button
                onClick={prevImage}
                className="absolute left-1 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white shadow-lg"
                style={{ backgroundColor: 'rgba(122, 46, 29, 0.8)' }}
              // whileHover={{ scale: 1.1, backgroundColor: '#7A2E1D' }}
              // whileTap={{ scale: 0.9 }}
              >
                <FaChevronLeft size={16} />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-white shadow-lg"
                style={{ backgroundColor: 'rgba(122, 46, 29, 0.8)' }}
              // whileHover={{ scale: 1.1, backgroundColor: '#7A2E1D' }}
              // whileTap={{ scale: 0.9 }}
              >
                <FaChevronRight size={16} />
              </motion.button>

              {/* Image Counter */}
              <div
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white font-bold"
                style={{ backgroundColor: 'rgba(122, 46, 29, 0.9)' }}
              >
                {selectedImage + 1} / {product.details.img.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailsPage;