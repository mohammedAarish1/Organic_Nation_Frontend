// import React, { useEffect } from 'react'
// import Image from '../../image/Image';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategoryWiseData } from '../../../features/filter/filterSlice';

// const YouMayAlsoLike = ({ categoryUrl }) => {
//     const dispatch = useDispatch()
//     const {filteredProducts} = useSelector((state) => state.filterData);
//     const { categoryBtnValue } = useSelector((state) => state.filterData);


//     useEffect(() => {
//         dispatch(fetchCategoryWiseData(categoryUrl))

//     }, [categoryUrl])

//     return (
//         <section className='mt-20'>
//             <h2 className='text-center text-2xl tracking-widest'>You may also like</h2>

//             <div className='hidden-scrollbar flex justify-start items-center gap-5 py-4  overflow-x-auto  w-[90%] mx-auto'>


//                 {filteredProducts?.map((product) => (
//                     <Link to={`/shop/${categoryBtnValue}/${product['name-url']}`} key={product._id} >
//                         <div className='flex flex-col justify-center items-center gap-5 shadow-xl px-8 py-4 cursor-pointer hover:scale-95 hover:bg-[#dcd3b9] transition-all duration-500  min-h-[350px] w-80'>

//                             <div className=''>

//                                 <Image
//                                     src={{
//                                         // sm: mainImage && mainImage.sm,
//                                         sm: Array.isArray(product.img) ? product.img.filter(path => path.sm.toLowerCase().includes('front'))[0].sm : null,
//                                         md: Array.isArray(product.img) ? product.img.filter(path => path.md.toLowerCase().includes('front'))[0].md : null,
//                                         lg: Array.isArray(product.img) ? product.img.filter(path => path.lg.toLowerCase().includes('front'))[0].lg : null,
//                                         // md: mainImage && mainImage.md,
//                                         // lg: mainImage && mainImage.lg
//                                     }}
//                                     // blurSrc={mainImage.blur}
//                                     // alt={'image-main'}
//                                     // style={{ display: 'block', maxWidth: '100%' }}
//                                     className='min-w-32 h-40 object-contain'
//                                 />

//                             </div>
//                             <div className='flex flex-col justify-center items-center gap-2 '>
//                                 <p className=' tracking-widest text-[var(--themeColor)] text-center font-medium '>{product.name}</p>
//                                 <p className='text-[14px] text-gray-500 tracking-widest'>Weight: <span className='text-gray-600'>{product.weight}</span></p>

//                                 <p className='text-[14px] tracking-widest'>₹ <span className='font-semibold'>{Math.round(product.price - (product.price * product.discount / 100))}</span>/- &nbsp; <span>{product.discount}% off</span></p>

//                             </div>
//                         </div>
//                     </Link>
//                 ))}

//                 <div className=''>
//                     <Link to='/shop/all'> <button className='tracking-widest hover:underline underline-offset-4'>View all Products</button></Link>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default YouMayAlsoLike;



import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../../image/Image';
import { fetchCategoryWiseData } from '../../../features/filter/filterSlice';
import AddToCartBtn from '../../add-to-cart-btn/AddToCartBtn';
import { ArrowRight, BadgePercent, Heart } from 'lucide-react';

const YouMayAlsoLike = ({ categoryUrl }) => {
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state) => state.filterData);
  const { categoryBtnValue } = useSelector((state) => state.filterData);
  const [wishlistedItems, setWishlistedItems] = useState(new Set());

  useEffect(() => {
    dispatch(fetchCategoryWiseData(categoryUrl));
  }, [categoryUrl, dispatch]);

  const toggleWishlist = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlistedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Limit to 6 products for better performance and UI
  const displayProducts = filteredProducts?.slice(0, 6) || [];

  return (
    <motion.section 
      className="mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      // variants={containerVariants}
      style={{ backgroundColor: '#F5EFE6' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 
            className="text-4xl lg:text-5xl font-bold mb-4 tracking-wide"
            style={{ color: '#3E2C1B' }}
          >
            You May Also Like
          </h2>
          <div 
            className="w-24 h-1 mx-auto rounded-full"
            style={{ backgroundColor: '#9B7A2F' }}
          />
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="relative"
          variants={itemVariants}
        >
          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 px-2">
            <AnimatePresence>
              {displayProducts.map((product, index) => {
                const discountedPrice = Math.round(product.price - (product.price * product.discount / 100));
                const isWishlisted = wishlistedItems.has(product._id);

                return (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-shrink-0"
                  >
                    <Link to={`/shop/${categoryBtnValue}/${product['name-url']}`}>
                      <motion.div
                        className="relative w-80 bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer group"
                        variants={cardHoverVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                        style={{
                          minHeight: '420px',
                          boxShadow: '0 10px 30px rgba(62, 44, 27, 0.1)'
                        }}
                      >
                        {/* Discount Badge */}
                        {product.discount > 0 && (
                          <motion.div
                            className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-white text-sm font-bold flex items-center space-x-1"
                            style={{ backgroundColor: '#D87C45' }}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                          >
                            <BadgePercent size={16} />
                            <span>{product.discount}% OFF</span>
                          </motion.div>
                        )}

                        {/* Wishlist Button */}
                        <motion.button
                          onClick={(e) => toggleWishlist(product._id, e)}
                          className="absolute top-4 right-4 z-10 p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                          style={{ backgroundColor: 'rgba(245, 239, 230, 0.9)' }}
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart
                            className={`transition-colors duration-300 ${
                              isWishlisted ? 'text-red-500' : 'text-gray-400'
                            }`}
                            style={{ 
                              color: isWishlisted ? '#D87C45' : '#7A2E1D'
                            }}
                          />
                        </motion.button>

                        {/* Product Image */}
                        <div className="relative h-56 overflow-hidden">
                          <motion.div
                            className="w-full h-full flex items-center justify-center p-6"
                            style={{ backgroundColor: '#F5EFE6' }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image
                              src={{
                                sm: Array.isArray(product.img) 
                                  ? product.img.find(path => path.sm.toLowerCase().includes('front'))?.sm 
                                  : null,
                                md: Array.isArray(product.img) 
                                  ? product.img.find(path => path.md.toLowerCase().includes('front'))?.md 
                                  : null,
                                lg: Array.isArray(product.img) 
                                  ? product.img.find(path => path.lg.toLowerCase().includes('front'))?.lg 
                                  : null,
                              }}
                              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                              alt={product.name}
                            />
                          </motion.div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </div>

                        {/* Product Info */}
                        <div className="p-6 space-y-4">
                          {/* Product Name */}
                          <motion.h3
                            className="font-bold text-lg leading-tight text-center"
                            style={{ color: '#3E2C1B' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                          >
                            {product.name}
                          </motion.h3>

                          {/* Weight */}
                          <motion.div
                            className="text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                          >
                            <span 
                              className="text-sm font-medium px-3 py-1 rounded-full"
                              style={{ 
                                backgroundColor: '#DCD2C0',
                                color: '#7A2E1D' 
                              }}
                            >
                              Weight: {product.weight}
                            </span>
                          </motion.div>

                          {/* Rating (if available) */}
                          {/* {product.averageRating && (
                            <motion.div
                              className="flex items-center justify-center space-x-2"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.6 }}
                            >
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className="text-sm"
                                    style={{ 
                                      color: i < Math.floor(product.averageRating) 
                                        ? '#9B7A2F' 
                                        : '#DCD2C0' 
                                    }}
                                  />
                                ))}
                              </div>
                              <span 
                                className="text-sm font-semibold"
                                style={{ color: '#7A2E1D' }}
                              >
                                {product.averageRating}
                              </span>
                            </motion.div>
                          )} */}

                          {/* Price */}
                          <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.7 }}
                          >
                            <div className="flex items-center justify-center space-x-3">
                              <span 
                                className="text-2xl font-bold"
                                style={{ color: '#7A2E1D' }}
                              >
                                ₹{discountedPrice}
                              </span>
                              {product.discount > 0 && (
                                <span 
                                  className="text-lg line-through"
                                  style={{ color: '#9B7A2F' }}
                                >
                                  ₹{product.price}
                                </span>
                              )}
                            </div>
                          </motion.div>

                          {/* Quick Add Button (appears on hover) */}
                          <motion.div
                            className=""
                            initial={{ y: 0 }}
                            whileHover={{ y: 0 }}
                          >
                                            <AddToCartBtn item={product} />
                            
                            {/* <motion.button
                              className="w-full py-3 px-4 rounded-2xl font-bold text-white flex items-center justify-center space-x-2 shadow-lg"
                              style={{ backgroundColor: '#7A2E1D' }}
                              whileHover={{ 
                                backgroundColor: '#9B7A2F',
                                scale: 1.02 
                              }}
                              whileTap={{ scale: 0.98 }}
                              onClick={(e) => {
                                e.preventDefault();
                                // Add to cart logic here
                              }}
                            >
                              <FaShoppingCart />
                              <span>Quick Add</span>
                            </motion.button> */}
                          </motion.div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* View All Products Card */}
            <motion.div
              className="flex-shrink-0"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: displayProducts.length * 0.1 }}
            >
              <Link to="/shop/all">
                <motion.div
                  className="w-80 h-full min-h-[420px] bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg flex flex-col items-center justify-center cursor-pointer group border-2 border-dashed"
                  style={{ borderColor: '#DCD2C0' }}
                  variants={cardHoverVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="text-center space-y-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#F5EFE6' }}
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >
                      <ArrowRight 
                        className="text-3xl"
                        style={{ color: '#7A2E1D' }}
                      />
                    </motion.div>
                    <div>
                      <h3 
                        className="text-2xl font-bold mb-2"
                        style={{ color: '#3E2C1B' }}
                      >
                        View All Products
                      </h3>
                      <p 
                        className="text-lg font-medium"
                        style={{ color: '#7A2E1D' }}
                      >
                        Explore our complete collection
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil((displayProducts.length + 1) / 3) }).map((_, index) => (
              <motion.div
                key={index}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#DCD2C0' }}
                whileHover={{ 
                  scale: 1.5,
                  backgroundColor: '#9B7A2F'
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default YouMayAlsoLike;



