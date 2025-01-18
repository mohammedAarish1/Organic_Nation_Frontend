import React, { useEffect } from 'react'
import Image from '../../image/Image';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryWiseData } from '../../../features/filter/filterSlice';

const YouMayAlsoLike = ({ categoryUrl }) => {
    const dispatch = useDispatch()
    const filterProduct = useSelector((state) => state.filterData.data);
    const { categoryBtnValue } = useSelector((state) => state.filterData);



    useEffect(() => {
        dispatch(fetchCategoryWiseData(categoryUrl))

    }, [categoryUrl])

    return (
        <section className='mt-20'>
            <h2 className='text-center text-2xl tracking-widest font-serif'>You may also like</h2>

            <div className='hidden-scrollbar flex justify-start items-center gap-5 py-4  overflow-x-auto  w-[90%] mx-auto'>


                {filterProduct?.map((product) => (
                    <Link to={`/shop/${categoryBtnValue}/${product['name-url']}`} key={product._id} >
                        <div className='flex flex-col justify-center items-center gap-5 shadow-xl px-8 py-4 cursor-pointer hover:scale-90 hover:bg-[#dcd3b9] transition-all duration-500  min-h-[350px] w-80'>

                            <div className=''>
                                {/* <img
                src={Array.isArray(product.img) ? product.img.filter(path => path.toLowerCase().includes('front'))[0] : null}
                alt="product-image"
                className='min-w-32 h-40 object-contain max-h-[240px] rounded-xl'
              /> */}

                                <Image
                                    src={{
                                        // sm: mainImage && mainImage.sm,
                                        sm: Array.isArray(product.img) ? product.img.filter(path => path.sm.toLowerCase().includes('front'))[0].sm : null,
                                        md: Array.isArray(product.img) ? product.img.filter(path => path.md.toLowerCase().includes('front'))[0].md : null,
                                        lg: Array.isArray(product.img) ? product.img.filter(path => path.lg.toLowerCase().includes('front'))[0].lg : null,
                                        // md: mainImage && mainImage.md,
                                        // lg: mainImage && mainImage.lg
                                    }}
                                    // blurSrc={mainImage.blur}
                                    // alt={'image-main'}
                                    // style={{ display: 'block', maxWidth: '100%' }}
                                    className='min-w-32 h-40 object-contain'
                                />

                            </div>
                            <div className='flex flex-col justify-center items-center gap-2 '>
                                <p className=' tracking-widest text-[var(--themeColor)] text-center font-medium '>{product.name}</p>
                                <p className='text-[14px] text-gray-500 tracking-widest'>Weight: <span className='text-gray-600'>{product.weight}</span></p>

                                <p className='text-[14px] tracking-widest'>₹ <span className='font-semibold'>{Math.round(product.price - (product.price * product.discount / 100))}</span>/- &nbsp; <span>{product.discount}% off</span></p>

                            </div>
                        </div>
                    </Link>
                ))}

                <div className=''>
                    <Link to='/shop/all'> <button className='tracking-widest hover:underline underline-offset-4'>View all Products</button></Link>
                </div>
            </div>
        </section>
    )
}

export default YouMayAlsoLike;
