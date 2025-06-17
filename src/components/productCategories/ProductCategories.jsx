// import React, { useMemo, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiArrowRight, FiGrid, FiList } from 'react-icons/fi';
// import Title from '../title/Title';

// const ProductCategories = () => {
//   const { categoryList } = useSelector((state) => state.filterData);
//   const [viewMode, setViewMode] = useState('carousel'); // 'grid' or 'carousel'
//   const [hoveredItem, setHoveredItem] = useState(null);

//   // Categories images
//   const categoriesImages = [
//     { 'Organic-Honey': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/honey.webp' },
//     { 'Homestyle-Pickles': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/pickles.webp' },
//     { 'Chutney-&-Dip': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/chutney%26dip.webp' },
//     { 'Fruit-Preserves': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/fruit_preserves.webp' },
//     { 'Seasonings-&-Herbs': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/seasonings.webp' },
//     { 'Organic-Tea': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/tea.webp' },
//     { Salt: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/salt.webp' },
//     { Sweeteners: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/sweeteners.webp' },
//     { 'Organic-Oils': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/oils.webp' },
//     { Oats: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/oats.webp' },
//     { Vegan: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/vegan.webp' },
//     { 'Breakfast-Cereals': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/breakfast_cereals.webp' },
//   ];

//   // Memoize image lookup for performance optimization
//   const imageLookup = useMemo(() => {
//     return categoriesImages.reduce((acc, obj) => {
//       const [key, value] = Object.entries(obj)[0];
//       acc[key] = value;
//       return acc;
//     }, {});
//   }, [categoriesImages]);

//   // Memoize category list with images
//   const categoryListWithImg = useMemo(() => {
//     return categoryList?.filter(curItem => curItem.category !== 'All')?.map(curItem => ({
//       categoryUrl: curItem.categoryUrl,
//       category: curItem.category,
//       image: imageLookup[curItem.categoryUrl] || null,
//     }));
//   }, [categoryList, imageLookup]);

//   // Animation variants for framer-motion
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   // Custom hook for carousel scroll control
//   const useHorizontalScroll = () => {
//     const scrollRef = React.useRef();
//     React.useEffect(() => {
//       const el = scrollRef.current;
//       if (el) {
//         const onWheel = e => {
//           if (e.deltaY === 0) return;
//           e.preventDefault();
//           el.scrollTo({
//             left: el.scrollLeft + e.deltaY,
//             behavior: 'smooth'
//           });
//         };
//         el.addEventListener('wheel', onWheel);
//         return () => el.removeEventListener('wheel', onWheel);
//       }
//     }, []);
//     return scrollRef;
//   };

//   const scrollRef = useHorizontalScroll();

//   // Featured categories - you can customize this list
//   const featuredCategories = categoryListWithImg?.slice(0, 4) || [];

//   // Other categories
//   const otherCategories = categoryListWithImg?.slice(4) || [];

//   return (
//     <div className="bg-gradient-to-b from-white to-gray-50 py-16">
//       {/* Header section */}
//       <div className="container mx-auto px-4 md:px-8">

//         <Title
//           heading=' Explore Our Categories'
//           subHeading=' Discover our handpicked selection of premium organic products'
//         />
//         {/* View mode toggle */}
//         <div className="flex justify-center mb-8">
//           <div className="bg-white shadow-md rounded-full p-1 flex">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`px-4 py-2 rounded-full flex items-center ${viewMode === 'grid' ? 'bg-[#712522] text-white' : 'text-gray-600'}`}
//             >
//               <FiGrid className="mr-2" />
//               <span className="hidden sm:inline">Grid View</span>
//             </button>
//             <button
//               onClick={() => setViewMode('carousel')}
//               className={`px-4 py-2 rounded-full flex items-center ${viewMode === 'carousel' ? 'bg-[#712522] text-white' : 'text-gray-600'}`}
//             >
//               <FiList className="mr-2" />
//               <span className="hidden sm:inline">Carousel</span>
//             </button>
//           </div>
//         </div>

//         {/* Featured Categories Section */}
//         <div className="mb-16">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-8 pl-4 border-l-4 border-[#712522]">
//             Featured Categories
//           </h3>

//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
//           >
//             {featuredCategories.map((category, index) => (
//               <motion.div
//                 key={category.categoryUrl}
//                 variants={itemVariants}
//                 whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                 className="relative"
//               >
//                 <Link
//                   to={`/shop/${category.categoryUrl.toLowerCase()}`}
//                   className="block"
//                 >
//                   <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300">
//                     <div className="h-40 md:h-48 overflow-hidden">
//                       <img
//                         src={category.image}
//                         alt={category.category}
//                         className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                       />
//                     </div>
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
//                     <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
//                       <h3 className="font-bold text-xl">{category.category}</h3>
//                       <div className="flex items-center mt-2">
//                         <span className="text-sm">Explore</span>
//                         <FiArrowRight className="ml-2" />
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>

//         {/* All Categories Section */}
//         <div>
//           <h3 className="text-2xl font-semibold text-gray-800 mb-8 pl-4 border-l-4 border-[#712522]">
//             All Categories
//           </h3>

//           {viewMode === 'grid' ? (
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
//             >
//               {categoryListWithImg?.map((category) => (
//                 <motion.div
//                   key={category.categoryUrl}
//                   variants={itemVariants}
//                   onMouseEnter={() => setHoveredItem(category.categoryUrl)}
//                   onMouseLeave={() => setHoveredItem(null)}
//                   className="relative"
//                 >
//                   <Link
//                     to={`/shop/${category.categoryUrl.toLowerCase()}`}
//                     className="block"
//                   >
//                     <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300">
//                       <div className="relative h-36 overflow-hidden">
//                         <img
//                           src={category.image}
//                           alt={category.category}
//                           className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                         />
//                         <div className={`absolute inset-0 bg-[#712522]/20 transition-opacity duration-300 ${hoveredItem === category.categoryUrl ? 'opacity-100' : 'opacity-0'}`} />
//                       </div>
//                       <div className="p-3 border-t">
//                         <h3 className={`text-center font-medium transition-colors duration-300 ${hoveredItem === category.categoryUrl ? 'text-[#712522]' : 'text-gray-800'}`}>
//                           {category.category}
//                         </h3>
//                       </div>
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </motion.div>
//           ) : (
//             <div className="relative">
//               <div
//                 ref={scrollRef}
//                 className="flex overflow-x-auto scrollbar-hide pb-6 snap-x snap-mandatory"
//                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//               >
//                 <div className="flex gap-4">
//                   {categoryListWithImg?.map((category) => (
//                     <motion.div
//                       key={category.categoryUrl}
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       whileInView={{ opacity: 1, scale: 1 }}
//                       transition={{ duration: 0.5 }}
//                       className="flex-shrink-0 w-56 snap-start"
//                     >
//                       <Link
//                         to={`/shop/${category.categoryUrl.toLowerCase()}`}
//                         className="block"
//                       >
//                         <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
//                           <div className="h-40 overflow-hidden">
//                             <img
//                               src={category.image}
//                               alt={category.category}
//                               className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                             />
//                           </div>
//                           <div className="p-4 text-center">
//                             <h3 className="font-medium text-lg text-gray-800">{category.category}</h3>
//                             <div className="mt-2 flex justify-center">
//                               <span className="inline-flex items-center text-sm text-[#712522]">
//                                 View Products <FiArrowRight className="ml-1" />
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//               <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
//                 <div className="flex space-x-2">
//                   <div className="w-16 h-1 bg-[#712522] rounded-full"></div>
//                   <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
//                   <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCategories;



import React, { useMemo, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiGrid,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiTrendingUp,
  FiHeart
} from 'react-icons/fi';
import Title from '../title/Title';
import Tabs from '../button/Tabs';
import { scrollToSlide } from '../../helper/helperFunctions';

const ProductCategories = () => {
  const { categoryList } = useSelector((state) => state.filterData);
  const [viewMode, setViewMode] = useState('featured');
  const [hoveredItem, setHoveredItem] = useState(null);
  const scrollContainerRef = useRef(null);

  // Categories images with enhanced data
  const categoriesData = [
    {
      'Organic-Honey': {
        image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/honey.webp',
        featured: true,
        trending: true,
        description: 'Pure, natural sweetness from local beekeepers'
      }
    },
    {
      'Homestyle-Pickles': {
        image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/pickles.webp',
        featured: true,
        trending: false,
        description: 'Traditional recipes, authentic flavors'
      }
    },
    {
      'Chutney-&-Dip': {
        image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/chutney%26dip.webp',
        featured: true,
        trending: true,
        description: 'Handcrafted condiments for every meal'
      }
    },
    {
      'Fruit-Preserves': {
        image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/fruit_preserves.webp',
        featured: true,
        trending: false,
        description: 'Farm-fresh fruits preserved naturally'
      }
    },
    {
      'Seasonings-&-Herbs': {
        image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/seasonings.webp',
        featured: false,
        trending: true,
        description: 'Aromatic spices for culinary excellence'
      }
    },
    {
      'Organic-Tea': {
        image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/tea.webp',
        featured: false,
        trending: true,
        description: 'Premium tea leaves for perfect brewing'
      }
    },
    {
      Salt: {
        image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/salt.webp',
        featured: false,
        trending: false,
        description: 'Mineral-rich salts from pristine sources'
      }
    },
    {
      Sweeteners: {
        image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/sweeteners.webp',
        featured: false,
        trending: false,
        description: 'Natural alternatives to refined sugar'
      }
    },
    {
      'Organic-Oils': {
        image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/oils.webp',
        featured: false,
        trending: true,
        description: 'Cold-pressed oils for healthy cooking'
      }
    },
    {
      Oats: {
        image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/oats.webp',
        featured: false,
        trending: false,
        description: 'Wholesome grains for nutritious meals'
      }
    },
    {
      Vegan: {
        image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/vegan.webp',
        featured: false,
        trending: true,
        description: 'Plant-based products for conscious living'
      }
    },
    {
      'Breakfast-Cereals': {
        image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/breakfast_cereals.webp',
        featured: false,
        trending: false,
        description: 'Start your day with organic goodness'
      }
    },
  ];


  const tabs = [
    { key: 'featured', icon: FiStar, label: 'Featured' },
    { key: 'trending', icon: FiTrendingUp, label: 'Trending' },
    { key: 'grid', icon: FiGrid, label: 'All Categories' }
  ]

  // Enhanced image lookup with metadata
  const categoryLookup = useMemo(() => {
    return categoriesData.reduce((acc, obj) => {
      const [key, value] = Object.entries(obj)[0];
      acc[key] = value;
      return acc;
    }, {});
  }, []);

  // Enhanced category list with metadata
  const enhancedCategoryList = useMemo(() => {
    if (!categoryList || categoryList.length === 0) return [];

    return categoryList
      .filter(curItem => curItem.category !== 'All')
      .map(curItem => ({
        categoryUrl: curItem.categoryUrl,
        category: curItem.category,
        image: categoryLookup[curItem.categoryUrl]?.image || 'https://via.placeholder.com/300x200?text=No+Image',
        featured: categoryLookup[curItem.categoryUrl]?.featured || false,
        trending: categoryLookup[curItem.categoryUrl]?.trending || false,
        description: categoryLookup[curItem.categoryUrl]?.description || 'Discover our premium organic products'
      }));
  }, [categoryList, categoryLookup]);

  // Categorized lists
  const featuredCategories = enhancedCategoryList.filter(item => item.featured);
  const trendingCategories = enhancedCategoryList.filter(item => item.trending);
  const allCategories = enhancedCategoryList;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      y: 30,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };


  // Featured card component
  const FeaturedCard = ({ category, index }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="relative group cursor-pointer"
    >
      <Link to={`/shop/${category.categoryUrl.toLowerCase()}`}>
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500">

          {/* Trending badge */}
          {category.trending && (
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-[#D87C45] to-[#9B7A2F] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
              <FiTrendingUp className="w-3 h-3" />
              Trending
            </div>
          )}

          {/* Main image */}
          <div className="h-64 md:h-72 overflow-hidden relative">
            <img
              src={category.image}
              alt={category.category}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
            <h3 className="font-bold text-2xl mb-2 leading-tight">
              {category.category.replace(/-/g, ' ')}
            </h3>
            <p className="text-gray-200 text-sm mb-4 leading-relaxed">
              {category.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-[#e4b035] bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">Explore Collection</span>
                <FiArrowRight className={`ml-2 w-4 h-4 transition-transform duration-300 ${hoveredItem === category.categoryUrl ? 'translate-x-1' : ''
                  }`} />
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="text-white/80 hover:text-red-400 transition-colors duration-300 p-2"
              >
                <FiHeart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-8 left-8 w-3 h-3 bg-[#9B7A2F] rounded-full opacity-60" />
          <div className="absolute bottom-20 right-8 w-2 h-2 bg-white rounded-full opacity-40" />
        </div>
      </Link>
    </motion.div>
  );

  // Regular card component
  const RegularCard = ({ category, index }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="relative group min-w-[260px] flex-shrink-0 cursor-pointer"
    >
      <Link to={`/shop/${category.categoryUrl.toLowerCase()}`}>
        <div className="bg-gradient-to-br from-white to-[#F5EFE6] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-[#DCD2C0]/30">

          {/* Trending indicator */}
          {category.trending && (
            <div className="absolute top-3 left-3 z-10 bg-[#D87C45] text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
              <FiStar className="w-3 h-3" />
              Hot
            </div>
          )}

          {/* Image container */}
          <div className="h-48 overflow-hidden relative">
            <img
              src={category.image}
              alt={category.category}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-[#7A2E1D]/20 to-transparent transition-opacity duration-300 ${hoveredItem === category.categoryUrl ? 'opacity-100' : 'opacity-0'
              }`} />
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className={`font-semibold text-lg mb-2 transition-colors duration-300 ${hoveredItem === category.categoryUrl ? 'text-[#7A2E1D]' : 'text-[#3E2C1B]'
              }`}>
              {category.category.replace(/-/g, ' ')}
            </h3>

            <p className="text-[#3E2C1B]/70 text-sm mb-4 leading-relaxed">
              {category.description}
            </p>

            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium transition-colors duration-300 ${hoveredItem === category.categoryUrl ? 'text-[#9B7A2F]' : 'text-[#7A2E1D]'
                }`}>
                View Products
              </span>
              <FiArrowRight className={`w-4 h-4 transition-all duration-300 ${hoveredItem === category.categoryUrl
                ? 'text-[#9B7A2F] translate-x-1'
                : 'text-[#7A2E1D]'
                }`} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  // Loading state
  if (!categoryList || categoryList.length === 0) {
    return (
      <div className="bg-gradient-to-b from-[#F5EFE6] via-white to-[#F5EFE6] py-10">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-b from-[#F5EFE6] via-white to-[#F5EFE6] py-8 overflow-hidden">

      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 border border-[#9B7A2F]/10 rounded-full animate-spin" style={{ animationDuration: '50s' }} />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 border border-[#7A2E1D]/10 rounded-full animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
      </div> */}

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <Title
            heading="Discover Our Premium Collections"
            subHeading="Handpicked organic treasures crafted with love and tradition"
          />

          {/* Enhanced View Mode Toggle */}
          {/* <div className="flex justify-center mt-8">
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-2 flex border border-[#DCD2C0]/30">
              {[
                { key: 'featured', icon: FiStar, label: 'Featured' },
                { key: 'trending', icon: FiTrendingUp, label: 'Trending' },
                { key: 'grid', icon: FiGrid, label: 'All Categories' }
              ].map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setViewMode(key)}
                  className={`px-6 py-3 rounded-xl flex items-center transition-all duration-300 font-medium ${viewMode === key
                    ? 'bg-gradient-to-r from-[#7A2E1D] to-[#9B7A2F] text-white shadow-lg'
                    : 'text-[#3E2C1B] hover:bg-[#F5EFE6]'
                    }`}
                >
                  <Icon className="mr-2 w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div> */}
          <Tabs tabs={tabs} activeTab={viewMode} setActiveTab={setViewMode} />
        </div>
        {/* Featured Categories Section */}
        {viewMode === 'featured' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            {featuredCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                {featuredCategories.map((category, index) => (
                  <FeaturedCard key={category.categoryUrl} category={category} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#3E2C1B]/70 text-lg">No featured categories available</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Trending Categories Carousel */}
        {viewMode === 'trending' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            // className="mb-20"
          >
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-[#3E2C1B] flex items-center">
                  <FiTrendingUp className="mr-3 text-[#D87C45]" />
                  Trending Now
                </h3>

                {trendingCategories.length > 3 && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => scrollToSlide(scrollContainerRef,'prev')}
                      className="p-3 bg-white/80 hover:bg-white border border-[#DCD2C0]/30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-[#7A2E1D] hover:text-[#9B7A2F]"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => scrollToSlide(scrollContainerRef,'next')}
                      className="p-3 bg-white/80 hover:bg-white border border-[#DCD2C0]/30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-[#7A2E1D] hover:text-[#9B7A2F]"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {trendingCategories.length > 0 ? (
                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto scrollbar-hide pb-6 gap-6 snap-x snap-mandatory"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {trendingCategories.map((category, index) => (
                    <div key={category.categoryUrl} className="snap-start">
                      <RegularCard category={category} index={index} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-[#3E2C1B]/70 text-lg">No trending categories available</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* All Categories Grid */}
        {viewMode === 'grid' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-3xl font-bold text-[#3E2C1B] mb-8 flex items-center">
              <FiGrid className="mr-3 text-[#9B7A2F]" />
              Complete Collection
            </h3>

            {allCategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {allCategories.map((category, index) => (
                  <motion.div
                    key={category.categoryUrl}
                    variants={cardVariants}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    onMouseEnter={() => setHoveredItem(category.categoryUrl)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="cursor-pointer"
                  >
                    <Link to={`/shop/${category.categoryUrl.toLowerCase()}`}>
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-[#DCD2C0]/20 group">

                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={category.image}
                            alt={category.category}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                            }}
                          />

                          {category.trending && (
                            <div className="absolute top-2 right-2 bg-[#D87C45] text-white px-2 py-1 rounded-lg text-xs font-semibold">
                              Hot
                            </div>
                          )}

                          <div className={`absolute inset-0 bg-gradient-to-t from-[#7A2E1D]/30 to-transparent transition-opacity duration-300 ${hoveredItem === category.categoryUrl ? 'opacity-100' : 'opacity-0'
                            }`} />
                        </div>

                        <div className="p-4">
                          <h3 className={`font-semibold text-center transition-colors duration-300 ${hoveredItem === category.categoryUrl ? 'text-[#7A2E1D]' : 'text-[#3E2C1B]'
                            }`}>
                            {category.category.replace(/-/g, ' ')}
                          </h3>

                          <div className="flex justify-center mt-2">
                            <div className={`flex items-center text-sm transition-colors duration-300 ${hoveredItem === category.categoryUrl ? 'text-[#9B7A2F]' : 'text-[#7A2E1D]'
                              }`}>
                              <span>Explore</span>
                              <FiArrowRight className={`ml-1 w-3 h-3 transition-transform duration-300 ${hoveredItem === category.categoryUrl ? 'translate-x-1' : ''
                                }`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#3E2C1B]/70 text-lg">No categories available</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductCategories;