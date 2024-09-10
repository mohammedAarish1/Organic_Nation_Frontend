import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import AddToCartBtn from '../add-to-cart-btn/AddToCartBtn';
import axios from 'axios';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';


const Product = ({ gridView, product }) => {

  const [imgLoading, setImgLoading] = useState(true);
  const [avgRating, setAvgRating] = useState(null);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const { categoryBtnValue } = useSelector((state) => state.filterData);


  // product image change effect
  const frontImage = product.img?.find(path => path.toLowerCase().includes('front'));
  const leftImage = product.img?.find(path => path.toLowerCase().includes('left'));


  const containerClasses = `
  relative overflow-hidden
  ${gridView ? 'w-60 h-60' : 'xs:w-60 xs:h-60 w-28 h-40'}
  group hover:shadow-xl transition-shadow rounded-lg duration-500
`;

  const imageClasses = `
  absolute inset-0 w-full h-full
  object-contain transition-opacity duration-1000 py-2
`;

  const getProductAvgRating = async (nameUrl) => {
    if (!nameUrl) return;

    try {

      const response = await axios.get(`${apiUrl}/api/reviews/average/${nameUrl}`)
      if (response.status === 200) {
        setAvgRating(response.data.averageRating)
      }


    } catch (error) {
      if (error.response && error.response.status === 404) {
        setAvgRating(0)
      }
    }
  }

  useEffect(() => {
    getProductAvgRating(product['name-url']);
  }, [product['name-url']]);


  return (
    <div className={`${!gridView ? "flex flex-row lg:pl-32 justify-start items-center gap-5  " : "flex justify-between items-center flex-col gap-2 max-w-[260px] "} font-sans`}
      data-aos="zoom-in-up"
      data-aos-duration="700"
    >
      {/* image  */}
      <NavLink to={`/shop/${categoryBtnValue}/${product['name-url']}`}>
        <div className={containerClasses}>
          {imgLoading && <div className='loader'></div>}
          <img
            src={frontImage}
            alt="product_Image"
            className={`${imageClasses} group-hover:opacity-0`}
            onLoad={() => setImgLoading(false)}
          />
          {leftImage && (
            <img
              src={leftImage}
              alt="Product left"
              className={`${imageClasses} opacity-0 group-hover:opacity-100`}
            />
          )}
        </div>
      </NavLink>
      {/* info  */}
      <div className={`flex flex-col justify-between  ${!gridView ? 'items-start' : 'items-center w-full'} flex-1 `}>
      <NavLink to={`/shop/${categoryBtnValue}/${product['name-url']}`}>
        <div className={`flex flex-col justify-center sm:gap-1  sm:justify-between ${!gridView ? 'items-start' : 'items-center h-32'}`}>
          <p className={`font-medium sm:text-xl  ${gridView ? 'text-center w-[90%]' : ''}    text-[#712522]`}>{product.name}</p>
          <p className='text-gray-500'>Weight: {product.weight}</p>
          {!gridView && <p className='lg:w-[70%] sm:block hidden text-sm font-serif'>{product.description}</p>}
          {/* <p>{error ? 'No reviews yet' : averageRating}</p> */}
          <div className='flex justify-start items-center gap-2'>
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 0.5;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    className='hidden'
                  />
                  {avgRating >= index + 1 ? (
                    <FaStar className="text-orange-400" />
                  ) : avgRating >= index + 0.5 ? (
                    <FaStarHalfAlt className='text-orange-400' />
                  ) : (
                    <AiOutlineStar className="text-orange-400" />
                  )}

                </label>
              );
            })}
          </div>


          <p className=''>₹ <span className='font-semibold'>{Math.round(product.price - (product.price * product.discount / 100))}</span>/- &nbsp; <span className='text-green-700'>{product.discount}% off</span></p>
        </div>
        </NavLink>
        <AddToCartBtn item={product} />
      </div>
    </div>
  )
}

export default Product;
