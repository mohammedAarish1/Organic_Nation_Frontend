import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../features/pagination/pagination';
import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
import { useNavigate } from 'react-router-dom';
// category image 
import Pickle from '../../images/ctaegory/Pickle.png';
import cereals from '../../images/ctaegory/cereals.png';
import ChutneyAndDip1 from '../../images/ctaegory/ChutneyAndDip1.png';
import FruitPreserves from '../../images/ctaegory/FruitPreserves.png';
import Honey from '../../images/ctaegory/Honey.png';
import oats from '../../images/ctaegory/oats.png';
import OrganicOil from '../../images/ctaegory/OrganicOil.png';
import PureSalt from '../../images/ctaegory/PureSalt.png';
import SeasoningsAndHerbs from '../../images/ctaegory/SeasoningsAndHerbs.png';
import sweetners from '../../images/ctaegory/sweetners.png';
import Tea from '../../images/ctaegory/Tea.png';
import vegan from '../../images/ctaegory/vegan.png';
import Title from '../title/Title';

const ProductCategories = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {  categoryList } = useSelector((state) => state.product_data);



    const categoriesImages = [Honey, Pickle, ChutneyAndDip1, FruitPreserves, SeasoningsAndHerbs, Tea, PureSalt, sweetners, OrganicOil, oats, vegan, cereals,]

    const categoryListWithImg = categoryList.filter((curItem) => curItem.category !== 'All').map((curItem, index) => ({ ...curItem, img: categoriesImages[index] }));

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
                    {categoryListWithImg.map((curItem) => (
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
                                <img src={curItem.img} className='w-72 rounded-xl hover:scale-90 hover:opacity-80 transition-all duration-500' alt="category_image" />
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
