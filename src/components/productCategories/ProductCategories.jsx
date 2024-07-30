import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../features/pagination/pagination';
import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
import { useNavigate } from 'react-router-dom';
import Title from '../title/Title';

const ProductCategories = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryList } = useSelector((state) => state.product_data);


    const categoriesImages = [
        { 'Organic-Honey': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories/Honey.png' },
        { 'Authentic-Pickles': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories/Pickle.png' },
        { 'Chutney-&-Dip': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories/ChutneyAndDip1.png' },
        { 'Fruit-Preserves': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories/FruitPreserves.png' },
        { 'Seasonings-&-Herbs': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories/SeasoningsAndHerbs.png' },
        { 'Organic-Tea': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories/Tea.png' },
        { Salt: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories/PureSalt.png' },
        { Sweetners: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories/sweetners.png' },
        { 'Organic-Oils': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories/OrganicOil.png' },
        { Oats: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories/oats.png' },
        { Vegan: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories/vegan.png' },
        { 'Breakfast-Cereals': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/categories/cereals.png' },
    ]


    const imageLookup = categoriesImages.reduce((acc, obj) => {
        const [key, value] = Object.entries(obj)[0];
        acc[key] = value;
        return acc;
    }, {});

    // Step 2: Map categories to include the corresponding image
    const categoryListWithImg = categoryList?.filter(curItem => curItem.category !== 'All')?.map(curItem => ({
        categoryUrl: curItem.categoryUrl,
        category: curItem.category,
        image: imageLookup[curItem.categoryUrl] || null // Fallback to null if no image found
    }));


    return (
        <div>
            <div className='text-center pt-32 xs:pb-20 pb-3  px-10'>
                <Title text="Our Categories !" />
            </div>
            {/* horozontal line */}
            <div className='xs:px-10 px-2'>
                <div className='w-full h-1 bg-gradient-to-r from-[#712522] to-[#bb7d7b]'></div>
            </div>
            {/*============ categories==========  */}
            <div className='xs:pt-20 pt-10 pb-20 px-10 '>
                <div className='flex flex-wrap justify-center items-center gap-16'>
                    {/* category   */}
                    {categoryListWithImg?.map((curItem) => (
                        <div
                            key={curItem.category}
                            className='flex flex-col gap-2  cursor-pointer  '
                            onClick={() => {
                                dispatch(setCurrentPage(1))
                                dispatch(setCategoryBtnValue(curItem.categoryUrl))
                                dispatch(fetchCategoryWiseData(curItem.categoryUrl.toLowerCase()))
                                navigate(`/shop/${curItem.categoryUrl.toLowerCase()}`)
                            }}
                            data-aos="zoom-out"
                            data-aos-duration="1000"
                        >
                            <div>
                                <img src={curItem.image} className='w-72 rounded-xl hover:scale-90 hover:opacity-80 transition-all duration-500' alt="category_image" />
                            </div>
                            <div>
                                <h1 className='bg-[var(--themeColor)] text-center py-2 text-white font-medium xs:text-xl rounded-xl font-mono tracking-wide'>{curItem.category}</h1>
                            </div>
                        </div>
                    ))}

                    {/* category  end  */}


                </div>
            </div>
        </div>
    )
}

export default ProductCategories;




// [
//     {
       
//         "weight": "500 gm",
//         "price": 390,
//         "discount ": 20,
//         "tax": 5,
//         "category": "Organic Honey",
//         "category-url": "Organic-Honey",
//         "description": "Organic Nation's Jamun Honey is a premium product crafted from the nectar of the blossoms of Jamun trees.",
//         "availability": 25,
//         "quantity": 1
//     },
//     {
       
//         "weight": "500 gm",
//         "price": 450,
//         "discount ": 20,
//         "tax": 12,
//         "category": "Organic Honey",
//         "category-url": "Organic-Honey",
//         "description": "Introducing our Light Flora Honey, a premium product sourced from the finest flowers and crafted with utmost care",
//         "availability": 25,
//         "quantity": 1
//     }
// ]