import React, { useState, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { setCurrentPage } from '../../features/pagination/pagination';
import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
import { useDispatch } from 'react-redux';

const icons = [
    { name:'Pickles',category: 'Authentic-Pickles', icon: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/CategoryCarousel/pickle.webp' },
    { name:'Honey',category: 'Organic-Honey', icon: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/CategoryCarousel/honey.webp' },
    { name:'Seasonings',category: 'Seasonings-&-Herbs', icon: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/CategoryCarousel/seasonings.webp' },
    { name:'Salt',category: 'Salt', icon: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/CategoryCarousel/salt.webp' },
    { name:'Cereals',category: 'Breakfast-Cereals', icon: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/CategoryCarousel/brefastCereals.webp' },
    { name:'Chutney',category: 'Chutney-&-Dip', icon: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/CategoryCarousel/chutney.webp' },
    { name:'Oats',category: 'Oats', icon: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/CategoryCarousel/oats.webp' },
    { name:'Oils',category: 'Organic-Oils', icon: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/CategoryCarousel/oils.webp' },
    { name:'Preserves',category: 'Fruit-Preserves', icon: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/CategoryCarousel/preserves.webp' },
    { name:'Vegan',category: 'Vegan', icon: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/CategoryCarousel/soyaChaap.webp' },
    { name:'Sweetners',category: 'Sweetners', icon: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/CategoryCarousel/sugar.webp' },
    { name:'Tea',category: 'Organic-Tea', icon: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/CategoryCarousel/tea.webp' },
];

const CategoryCarousel = () => {

    const dispatch = useDispatch()
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = 200;

        if (container) {
            const newScrollPosition = direction === 'left'
                ? container.scrollLeft - scrollAmount
                : container.scrollLeft + scrollAmount;

            container.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = () => {
        const container = scrollRef.current;
        if (container) {
            setShowLeftArrow(container.scrollLeft > 0);
            setShowRightArrow(
                container.scrollLeft < (container.scrollWidth - container.clientWidth - 10)
            );
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 xs:py-12 py-6 font-sans ">
            <div className="flex items-center gap-2">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    aria-label="Previous Categories" 
                    className={`flex-shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200
                              ${showLeftArrow ? 'text-gray-800' : 'text-gray-300'}`}
                    disabled={!showLeftArrow}
                >
                    <IoIosArrowBack className="w-6 h-6" />
                </button>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory py-2"
                >
                    {icons.map((item, index) => (
                        <Link
                            to={`/shop/${item.category.toLowerCase()}`}
                            key={item.name}
                            className="flex flex-col items-center flex-shrink-0 snap-center group cursor-pointer"
                            onClick={() => {
                                dispatch(setCurrentPage(1))
                                dispatch(setCategoryBtnValue(item.category))
                                dispatch(fetchCategoryWiseData(item.category.toLowerCase()))
                                // navigate(`/shop/${curItem.categoryUrl.toLowerCase()}`)
                            }}
                        >
                            <div className="relative">
                                <div className="border-4 border-[var(--themeColor)] p-2 rounded-full 
                                            transform transition-transform duration-300 
                                            group-hover:scale-110 group-hover:shadow-lg
                                            w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                                            flex items-center justify-center">
                                    <img
                                        src={item.icon}
                                        alt={`Image representing the ${item.name} category`}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="absolute inset-0 rounded-full bg-[var(--themeColor)]/10 
                                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                            <span className="mt-2 text-sm sm:text-base text-[var(--themeColor)] font-medium
                                         group-hover:font-semibold transition-all duration-300 max-w-16">
                                {item.name.replace(/-/g, ' ')}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    aria-label="Next Categories" 
                    className={`flex-shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200
                              ${showRightArrow ? 'text-gray-800' : 'text-gray-300'}`}
                    disabled={!showRightArrow}
                >
                    <IoIosArrowForward className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default CategoryCarousel;