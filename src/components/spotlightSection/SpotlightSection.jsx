import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button/Button';
import Title from '../title/Title';
import Product from '../product/Product';
import { spotlighProducts } from '../../features/spotlightProducts/spotlightProducts';

const SpotlightSection = () => {



    const dispatch = useDispatch();
    const { productData } = useSelector((state) => state.product_data);
    const { products, productsType } = useSelector((state) => state.spotlight);



    useEffect(() => {
        dispatch((spotlighProducts({ type: "new_arrivals", productData: productData })));
    }, [productData])


    return (
        <div>
            <div className='sm:py-20 py-10'>
                <div className='flex justify-center xs:gap-4 gap-1 items-center'>
                    <div className='h-1 md:w-[30%] xs:w-[20%] w-[20%] bg-gradient-to-r from-[#712522] to-[#bb7d7b]'></div>
                    <Title text="In the Spotlight" />
                    <div className='h-1 md:w-[30%] xs:w-[20%] w-[20%] bg-gradient-to-r from-[#bb7d7b] to-[#712522]'></div>
                </div>
            </div>
            {/* buttons  */}
            <div className=' flex justify-center lg:gap-16'>
                <Button title="New Arrival" basis="new_arrivals" />
                <Button title="Deal of the Day" basis="deal_of_the_day" />
                <Button title="Best Seller" basis="best_seller" />
                <Button title="Seasons Special" basis="season_special" />
            </div>
            <div className='flex justify-center flex-wrap xs:gap-14 gap-7 py-16 '>
                {products?.map((product) => <Product key={product._id} product={product} gridView={true} />)}

            </div>
            {/* dots */}
            <div className='flex justify-center items-center'>
                <div className='flex gap-2 justify-center items-center'>
                    <button className={`${productsType == 'new_arrivals' ? 'bg-[var(--bgColorPrimary)] w-5 h-5' : 'bg-[var(--themeColor)] w-3 h-3'}  rounded-full cursor-auto `}></button>
                    <button className={`${productsType == 'deal_of_the_day' ? 'bg-[var(--bgColorPrimary)] w-5 h-5' : 'bg-[var(--themeColor)] w-3 h-3'}  rounded-full cursor-auto `}></button>
                    <button className={`${productsType == 'best_seller' ? 'bg-[var(--bgColorPrimary)] w-5 h-5' : 'bg-[var(--themeColor)] w-3 h-3'}  rounded-full cursor-auto `}></button>
                    <button className={`${productsType == 'season_special' ? 'bg-[var(--bgColorPrimary)] w-5 h-5' : 'bg-[var(--themeColor)] w-3 h-3'}  rounded-full cursor-auto `}></button>

                </div>
            </div>

        </div>
    )
}

export default SpotlightSection;
