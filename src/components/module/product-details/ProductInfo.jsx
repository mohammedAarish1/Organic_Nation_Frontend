import React, { useState } from 'react';
// react icons 
import { FaCircleCheck, FaStar, FaIndianRupeeSign } from "react-icons/fa6";
import { HiXCircle } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
import { FaStarHalfAlt } from 'react-icons/fa';
import { GoDotFill } from "react-icons/go";
import { LiaShippingFastSolid } from "react-icons/lia";
import ProductQty from '../../productQty/ProductQty';
import AddToCartBtn from '../../add-to-cart-btn/AddToCartBtn';

const ProductInfo = ({product}) => {
  const [qty, setQty] = useState(1);


  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1)
  };
  const decreaseQty = () => {
    qty > 1 ? setQty(qty - 1) : setQty(1)
  };

  return (
    <div className="md:w-[50%] max-h-[600px]  flex md:justify-start justify-center items-center gap-4 py-6 xs:pr-10 px-4 xs:pl-10 md:pl-0 font-s  ">
    <div className='flex flex-col lg:gap-3 gap-1 tracking-wide'>
      <h2 className='md:block hidden font-medium md:text-4xl text-xl text-[var(--themeColor)]' >{product.details.name}</h2>
      <p className=''><span className='font-semibold'>Brand: </span><span>ORGANIC NATION</span> </p>
      <p className='flex items-center gap-2'><span className='border border-green-600'><GoDotFill className='text-green-700' /></span><span className='font-semibold '>Pure Vegetarian Product</span></p>
      <p className=''><span className=' font-semibold'>Weight: </span>{product.details.weight}</p>
      <p className=''><span className=' font-semibold'>Category: </span>{product.details.category}</p>
      <div className='flex justify-start items-center gap-6'>
        <div className='flex justify-start items-center gap-2'>
          <p>{product.averageRating}</p>
          <div className='flex justify-start items-center gap-2'>
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 0.5;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    // onClick={() => setFieldValue('rating', ratingValue)}
                    className='hidden'
                  />
                  {product.averageRating >= index + 1 ? (
                    <FaStar className="text-orange-400" />
                  ) : product.averageRating >= index + 0.5 ? (
                    <FaStarHalfAlt className='text-orange-400' />
                  ) : (
                    <AiOutlineStar className="text-orange-400" />
                  )}

                </label>
              );
            })}
          </div>
        </div>
        <p className=''>{product.reviews.length} <span>ratings</span></p>
      </div>

      <div className='flex gap-3  items-center '>
        {product.details.discount!==0 &&  <p className='text-2xl text-red-600'>-{product.details.discount}%</p> }
      
        <p className='flex items-start'>
          <FaIndianRupeeSign className='text-sm' />
          <span className='text-3xl font-medium'>{Math.round(product.details.price - (product.details.price * product.details.discount / 100))}</span>
        </p>
        <p className='text-gray-600 text-sm self-end'>(Incl. of all taxes)</p>
      </div>
     {product.details.discount !==0 &&  <p><span className='font-semibold text-sm'>MRP:</span> <span className='line-through'> ₹{product.details.price}</span> </p>
    }



      {/* <p className='lg:w-[70%]'>{product.description}</p> */}
      <p className='text-green-700 font-semibold'>*Cash On Delivery is available</p>
      <p className='flex items-center gap-2'><LiaShippingFastSolid className='text-xl' /> <span>Free shipping for all orders above ₹499</span></p>
      <p className='flex items-center gap-3'><span>In Stock:</span>{product.details.availability ? (<FaCircleCheck className='text-xl text-[var(--bgColorPrimary)]' />) : (<HiXCircle className='text-3xl text-red-700' />)}</p>
      <div className='flex items-center gap-2 xs:mb-0 mb-5'>
        Quantity:-  <ProductQty qty={qty} increaseQty={increaseQty} decreaseQty={decreaseQty} />
      </div>
      <div>
        <AddToCartBtn item={product.details} qty={qty} />
      </div>
    </div>
  </div>
  )
}

export default ProductInfo;
