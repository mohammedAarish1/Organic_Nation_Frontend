import React, { useMemo } from 'react'
import {  useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Title from '../title/Title';

const ProductCategories = () => {
    const { categoryList } = useSelector((state) => state.filterData);

    // Categories images
    const categoriesImages = [
        { 'Organic-Honey': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/1Honey.webp' },
        { 'Homestyle-Pickles': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/2Pickle.webp' },
        { 'Chutney-&-Dip': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/3ChutneyAndDip.webp' },
        { 'Fruit-Preserves': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/4FruitPreserves.webp' },
        { 'Seasonings-&-Herbs': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/5SeasoningsAndHerbs.webp' },
        { 'Organic-Tea': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/6Tea.webp' },
        { Salt: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/7PureSalt.webp' },
        { Sweeteners: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/8sweetners.webp' },
        { 'Organic-Oils': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/9OrganicOil.webp' },
        { Oats: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/10oats.webp' },
        { Vegan: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/11vegan.webp' },
        { 'Breakfast-Cereals': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/12cereals.webp' },
        { Combo: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_new/13combo.webp' },
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
            image: imageLookup[curItem.categoryUrl] || null, // Fallback to null if no image found
        }));
    }, [categoryList, imageLookup]);

    // Handle category click (dispatch actions)
    // const handleCategoryClick = (categoryUrl) => {
    //     dispatch(setCurrentPage(1));
    //     dispatch(setCategoryBtnValue(categoryUrl));
    //     dispatch(fetchCategoryWiseData(categoryUrl.toLowerCase()));
    // };

    return (
        <div>
            <div className='text-center xs:pt-32 pt-16 xs:pb-20 pb-3 px-10'>
                <Title text="Our Categories !" />
            </div>
            <div className='xs:px-10 px-2'>
                <div className='w-full h-1 bg-gradient-to-r from-[#712522] to-[#bb7d7b]'></div>
            </div>
            <div className='xs:pt-20 pt-10 pb-20 px-10 '>
                <div className='flex flex-wrap justify-center items-center gap-16'>
                    {/* category mapping */}
                    {categoryListWithImg?.map((curItem) => (
                        <Link
                            to={`/shop/${curItem.categoryUrl.toLowerCase()}`}
                            key={curItem.category}
                            className='flex flex-col gap- cursor-pointer hover:scale-95 hover:opacity-80 transition-all duration-500'
                            // onClick={() => handleCategoryClick(curItem.categoryUrl)}
                        >
                            <div>
                                <img
                                    src={curItem.image}
                                    className='w-72'
                                    alt={`Image of ${curItem.category}`} // Improve alt text for accessibility
                                />
                            </div>
                            <div>
                                <h1 className='border border-t-0 text-center py-2  font-medium xs:text-xl tracking-wide'>
                                    {curItem.category}
                                </h1>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCategories;


