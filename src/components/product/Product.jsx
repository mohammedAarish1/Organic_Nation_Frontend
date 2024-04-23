import React from 'react'
import { BsCart4 } from "react-icons/bs";


const Product = ({gridView}) => {
    return (
        <div className={`${gridView ? "flex flex-row justify-start items-center gap-5 ":"flex flex-col gap-1"} `}>
            {/* image  */}
            <div className='figure'>
                <a href="#">

                <img src="images/products/product.webp" alt="product" className=' w-60 rounded-2xl' />
                </a>
            </div>
            {/* info  */}
            <div className='flex flex-col gap-1 '>
            <p><span className='font-semibold text-xl'>Garlic Pickle</span> (200/400 gm jars)</p>
            {gridView && <p className='w-[80%] text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto reprehenderit repellendus aspernatur aliquam officiis minus magni tempore impedit suscipit laudantium?</p>}
            <p>**** <span className='text-sm'>190 reveiws</span></p>
            <p className='text-sm'>MRP Rs. 599/- (10% off)</p>
            <a href="#" className='flex justify-center items-center gap-1 mt-2 bg-[var(--bgColorPrimary)] w-max text-white py-2 px-4'><BsCart4 className='text-white animate-bounce' /> Add to Cart</a>
            </div>
        </div>
    )
}

export default Product
// flex flex-col gap-1