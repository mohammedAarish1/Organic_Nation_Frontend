import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiGrid, FiList } from 'react-icons/fi';
import Title from '../title/Title';

const ProductCategories = () => {
  const { categoryList } = useSelector((state) => state.filterData);
  const [viewMode, setViewMode] = useState('carousel'); // 'grid' or 'carousel'
  const [hoveredItem, setHoveredItem] = useState(null);

  // Categories images
  const categoriesImages = [
    { 'Organic-Honey': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/honey.webp' },
    { 'Homestyle-Pickles': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/pickles.webp' },
    { 'Chutney-&-Dip': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/chutney%26dip.webp' },
    { 'Fruit-Preserves': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/fruit_preserves.webp' },
    { 'Seasonings-&-Herbs': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/seasonings.webp' },
    { 'Organic-Tea': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/tea.webp' },
    { Salt: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/salt.webp' },
    { Sweeteners: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/sweeteners.webp' },
    { 'Organic-Oils': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/oils.webp' },
    { Oats: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/oats.webp' },
    { Vegan: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/vegan.webp' },
    { 'Breakfast-Cereals': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/breakfast_cereals.webp' },
  ];

  // Memoize image lookup for performance optimization
  const imageLookup = useMemo(() => {
    return categoriesImages.reduce((acc, obj) => {
      const [key, value] = Object.entries(obj)[0];
      acc[key] = value;
      return acc;
    }, {});
  }, [categoriesImages]);

  // Memoize category list with images
  const categoryListWithImg = useMemo(() => {
    return categoryList?.filter(curItem => curItem.category !== 'All')?.map(curItem => ({
      categoryUrl: curItem.categoryUrl,
      category: curItem.category,
      image: imageLookup[curItem.categoryUrl] || null,
    }));
  }, [categoryList, imageLookup]);

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Custom hook for carousel scroll control
  const useHorizontalScroll = () => {
    const scrollRef = React.useRef();
    React.useEffect(() => {
      const el = scrollRef.current;
      if (el) {
        const onWheel = e => {
          if (e.deltaY === 0) return;
          e.preventDefault();
          el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            behavior: 'smooth'
          });
        };
        el.addEventListener('wheel', onWheel);
        return () => el.removeEventListener('wheel', onWheel);
      }
    }, []);
    return scrollRef;
  };

  const scrollRef = useHorizontalScroll();

  // Featured categories - you can customize this list
  const featuredCategories = categoryListWithImg?.slice(0, 4) || [];

  // Other categories
  const otherCategories = categoryListWithImg?.slice(4) || [];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16">
      {/* Header section */}
      <div className="container mx-auto px-4 md:px-8">

        <Title
          heading=' Explore Our Categories'
          subHeading=' Discover our handpicked selection of premium organic products'
        />
        {/* View mode toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white shadow-md rounded-full p-1 flex">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-full flex items-center ${viewMode === 'grid' ? 'bg-[#712522] text-white' : 'text-gray-600'}`}
            >
              <FiGrid className="mr-2" />
              <span className="hidden sm:inline">Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-4 py-2 rounded-full flex items-center ${viewMode === 'carousel' ? 'bg-[#712522] text-white' : 'text-gray-600'}`}
            >
              <FiList className="mr-2" />
              <span className="hidden sm:inline">Carousel</span>
            </button>
          </div>
        </div>

        {/* Featured Categories Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 pl-4 border-l-4 border-[#712522]">
            Featured Categories
          </h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.categoryUrl}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative"
              >
                <Link
                  to={`/shop/${category.categoryUrl.toLowerCase()}`}
                  className="block"
                >
                  <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="h-40 md:h-48 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.category}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-xl">{category.category}</h3>
                      <div className="flex items-center mt-2">
                        <span className="text-sm">Explore</span>
                        <FiArrowRight className="ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* All Categories Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 pl-4 border-l-4 border-[#712522]">
            All Categories
          </h3>

          {viewMode === 'grid' ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {categoryListWithImg?.map((category) => (
                <motion.div
                  key={category.categoryUrl}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredItem(category.categoryUrl)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative"
                >
                  <Link
                    to={`/shop/${category.categoryUrl.toLowerCase()}`}
                    className="block"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300">
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.category}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className={`absolute inset-0 bg-[#712522]/20 transition-opacity duration-300 ${hoveredItem === category.categoryUrl ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                      <div className="p-3 border-t">
                        <h3 className={`text-center font-medium transition-colors duration-300 ${hoveredItem === category.categoryUrl ? 'text-[#712522]' : 'text-gray-800'}`}>
                          {category.category}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="relative">
              <div
                ref={scrollRef}
                className="flex overflow-x-auto scrollbar-hide pb-6 snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex gap-4">
                  {categoryListWithImg?.map((category) => (
                    <motion.div
                      key={category.categoryUrl}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex-shrink-0 w-56 snap-start"
                    >
                      <Link
                        to={`/shop/${category.categoryUrl.toLowerCase()}`}
                        className="block"
                      >
                        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
                          <div className="h-40 overflow-hidden">
                            <img
                              src={category.image}
                              alt={category.category}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-4 text-center">
                            <h3 className="font-medium text-lg text-gray-800">{category.category}</h3>
                            <div className="mt-2 flex justify-center">
                              <span className="inline-flex items-center text-sm text-[#712522]">
                                View Products <FiArrowRight className="ml-1" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                  <div className="w-16 h-1 bg-[#712522] rounded-full"></div>
                  <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;

