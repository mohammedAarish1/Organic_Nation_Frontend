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
    <div className={`${!gridView ? "flex flex-row lg:pl-32 justify-start items-center gap-5  " : "flex  justify-between items-center flex-col gap-2 max-w-[260px] min-h-[460px] "} font-sans`}
      data-aos="zoom-in-up"
      data-aos-duration="1000"
    >
      {/* image  */}
      <NavLink to={`/shop/${categoryBtnValue}/${product['name-url']}`}>
        <div className={`figure  ${gridView ? 'w-[250px]' : 'xs:w-[250px] w-[100px]'} `}>
          {imgLoading && <div className='loader'></div>}
          <img
            src={Array.isArray(product.img) ? product.img.filter(path => path.toLowerCase().includes('front'))[0] : null}
            alt="product_Image"
            className={`${!gridView ? 'sm:min-w-60 w-40 max-h-[240px] rounded-2xl ' : 'sm:min-h-[240px] xs:max-h-[200px] max-h-[180px] rounded-2xl'} object-contain`}
            onLoad={() => setImgLoading(false)}
          />
        </div>
      </NavLink>
      {/* info  */}
      <div className={`flex flex-col sm:gap-1  justify-between  ${!gridView ? 'items-start' : 'items-center'} flex-1`}>
        <p className={`font-medium sm:text-xl  ${gridView ? 'text-center w-2/3' : ''}    text-[#712522]`}>{product.name}</p>
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
        <AddToCartBtn item={product} />
      </div>
    </div>
  )
}

export default Product;
