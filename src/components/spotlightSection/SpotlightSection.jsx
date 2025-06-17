import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Title from '../title/Title';
import Product from '../product/Product';
import { getSpotlightProducts } from '../../features/spotlightProducts/spotlightProducts';
import { MdLocalOffer, MdNewReleases } from 'react-icons/md';
import { GiPodium, GiSunflower } from 'react-icons/gi';
import Tabs from '../button/Tabs';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { scrollToSlide } from '../../helper/helperFunctions';

const ProductSkeleton = () => (
    <div className="animate-pulse">
        <div className="bg-gray-200 h-64 w-64 rounded-lg"></div>
        <div className="mt-4 bg-gray-200 h-4 w-48 rounded"></div>
        <div className="mt-2 bg-gray-200 h-4 w-24 rounded"></div>
    </div>
);

const SpotlightSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.filterData.products);
    const { spotlightProducts, productsType } = useSelector((state) => state.spotlight);
    const [activeTab, setActiveTab] = useState(productsType);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const loadProducts = () => {
            setIsLoading(true);
            dispatch(getSpotlightProducts({ type: activeTab, products }));
            setIsLoading(false);
        };

        if (products) {
            loadProducts();
        }
    }, [products, dispatch, activeTab]);


    // const containerVariants = {
    //     hidden: { opacity: 0 },
    //     visible: {
    //         opacity: 1,
    //         transition: {
    //             staggerChildren: 0.1,
    //             delayChildren: 0.1
    //         }
    //     }
    // };

    const tabs = [
        { key: 'new_arrivals', icon: MdNewReleases, label: 'New Arrival' },
        { key: 'deal_of_the_day', icon: MdLocalOffer, label: 'Deal of the Day' },
        { key: 'best_seller', icon: GiPodium, label: 'Best Seller' },
        { key: 'season_special', icon: GiSunflower, label: 'Season Special' }
    ]

    return (
        <div className=""> {/* Reserve minimum height */}
            {/* <Title heading="In the Spotlight" /> */}
            {/* <div className="">
            </div> */}
            <div className='pt-xs:20 pt-10'>

                <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {isLoading ? (
                    // Show skeleton grid with same dimensions as actual products
                    Array(8).fill(0).map((_, index) => (
                        <div key={index} className="w-64">
                            <ProductSkeleton />
                        </div>
                    ))
                ) : (
                    <motion.div
                        // variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    // className="mb-20"
                    >
                        <div className="relative">
                            <div className="flex items-center my-2">
                                <h3 className="flex xs:text-xl text-[#3E2C1B]  items-center ml-2 sm:hidden font-semibold font-serif">
                                    {/* <FiTrendingUp className="mr-3 text-[#D87C45]" /> */}
                                    {activeTab.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                </h3>

                                {spotlightProducts.length > 2 && (
                                    <div className="flex gap-2 ml-auto">
                                        <button
                                            onClick={() => scrollToSlide(scrollContainerRef, 'prev')}
                                            className="sm:p-3 p-1 bg-white/80 hover:bg-white border border-[#DCD2C0]/30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-[#7A2E1D] hover:text-[#9B7A2F]"
                                        >
                                            <FiChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => scrollToSlide(scrollContainerRef, 'next')}
                                            className="sm:p-3 p-1 bg-white/80 hover:bg-white border border-[#DCD2C0]/30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-[#7A2E1D] hover:text-[#9B7A2F]"
                                        >
                                            <FiChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {spotlightProducts.length > 0 ? (

                                <div
                                    ref={scrollContainerRef}
                                    className="overflow-x-auto scrollbar-hide pb-6"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    <div className="flex justify-center min-w-full w-max gap-6 snap-x snap-mandatory">
                                        {spotlightProducts.map((product) => (
                                            <div key={product._id} className="snap-start">
                                                <Product product={product} gridView={true} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-[#3E2C1B]/70 text-lg">No products available</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="flex justify-center items-center h-16 my-4"> {/* Fixed height for dots */}
                <div className="flex gap-2 justify-center items-center">
                    {tabs.map((type) => (
                        <button
                            key={type.key}
                            className={`transition-all duration-300 rounded-full cursor-auto ${productsType === type.key
                                ? 'bg-[var(--bgColorPrimary)] w-5 h-5'
                                : 'bg-[var(--themeColor)] w-3 h-3'
                                }`}
                            aria-label={`${type.label} indicator`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpotlightSection;
