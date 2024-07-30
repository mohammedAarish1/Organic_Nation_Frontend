import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ProductImages from '../../components/product-images/ProductImages'
import ProductQty from '../../components/productQty/ProductQty'
import AddToCartBtn from '../../components/add-to-cart-btn/AddToCartBtn';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryWiseData } from '../../features/filter/filterSlice';
import { getAllReviews, getAverageRating } from '../../features/reviews/reviews';
import SingleReview from '../../components/reviews/SingleReview';
import ReviewsAndRatings from '../../helper/ReviewsAndRatings';
// react icons 
import { FaCircleCheck, FaStar, FaIndianRupeeSign } from "react-icons/fa6";
import { HiXCircle } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
import { FaStarHalfAlt } from 'react-icons/fa';




const ProductDetails = () => {

  const { nameUrl } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState('');

  const filterProduct = useSelector((state) => state.filterData.data);
  const { allReviews, loading, averageRating } = useSelector((state) => state.reviews);
  const { categoryBtnValue } = useSelector((state) => state.filterData);

  const apiUrl = import.meta.env.VITE_BACKEND_URL;



  const getProductDetail = async (nameUrl) => {

    try {
      const response = await axios.get(`${apiUrl}/category/organic-honey/${nameUrl}`);
      let product = response.data.product
      if (product) {
        setProduct(product)
        dispatch(fetchCategoryWiseData(product['category-url'].toLowerCase()))
        dispatch(getAllReviews(product['name-url']))
        dispatch(getAverageRating(product['name-url']))
      }
    } catch (error) {
      throw error
    }
  }


  useEffect(() => {
    getProductDetail(nameUrl)
  }, [nameUrl])


  // for qty increase and decrease 

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1)
  };
  const decreaseQty = () => {
    qty > 1 ? setQty(qty - 1) : setQty(1)
  };




  if (!product) {
    return <div>Loading</div>
  }
  return (
    <div>
      <section className='xs:py-20 py-5  '>
        <h2 className=' md:hidden block font-semibold xs:text-3xl text-2xl xs:px-10 px-4' >{product.name}</h2>
        <div className='flex md:flex-row flex-col  '>


          {/* left side  */}
          <ProductImages productImgs={product?.img?.length >= 1 && product.img} />

          {/* right side  */}
          <div className="md:w-[50%] max-h-[600px]  flex md:justify-start justify-center items-center gap-4 py-6 xs:pr-10 px-4 xs:pl-10 md:pl-0 font-sans  ">
            <div className='flex flex-col lg:gap-5 gap-2 tracking-widest'>
              <h2 className='md:block hidden font-medium md:text-4xl text-xl text-[var(--themeColor)]' >{product.name}</h2>
              <p className='text-sm'><span className='text-gray-600'>Weight: </span>{product.weight}</p>
              <p className='text-sm'><span className='text-gray-600'>Category: </span>{product.category}</p>
              <div className='flex justify-start items-center gap-6'>
                <div className='flex justify-start items-center gap-2'>
                  <p>{averageRating}</p>
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
                          {averageRating >= index + 1 ? (
                            <FaStar className="text-orange-400" />
                          ) : averageRating >= index + 0.5 ? (
                            <FaStarHalfAlt className='text-orange-400' />
                          ) : (
                            <AiOutlineStar className="text-orange-400" />
                          )}

                        </label>
                      );
                    })}
                  </div>
                </div>
                <p className=''>{allReviews.length} <span>ratings</span></p>
              </div>

              <div className='flex gap-3  items-center '>
                <p className='text-2xl text-red-600'>-{product["discount "]}%</p>
                <p className='flex items-start'>
                  <FaIndianRupeeSign className='text-sm' />
                  <span className='text-3xl font-medium'>{Math.round(product.price - (product.price * product['discount '] / 100))}</span>
                </p>
              </div>
              <p><span className='text-gray-600 text-sm'>MRP:</span> <span className='line-through'> ₹{product.price}</span> </p>




              <p className='lg:w-[70%]'>{product.description}</p>
              <p className='flex items-center gap-3'><span>In Stock:</span>{product.availability ? (<FaCircleCheck className='text-xl text-[var(--bgColorPrimary)]' />) : (<HiXCircle className='text-3xl text-red-700' />)}</p>
              <div>
                <ProductQty qty={qty} increaseQty={increaseQty} decreaseQty={decreaseQty} />

              </div>
              <div>
                <AddToCartBtn item={product} qty={qty} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =============== product reviews and ratings ========== */}

      <section className='py-20'>
        <div className=' text-start xs:text-2xl tracking-widest font-serif lg:w-1/2 sm:w-[70%] w-[90%]  mx-auto mb-5'>
          <h2 >Reviews and Ratings</h2>
        </div>
        <div className='lg:w-1/2 sm:w-[70%] w-[90%]   mx-auto flex flex-col gap-7'>
          {/* {loading && (<div>loading.....</div>)} */}
          {allReviews?.length > 0 && (
            allReviews.map((reviews) => (

              <SingleReview key={reviews._id} reviews={reviews} />

            ))
          )}

        </div>
        <div className='lg:w-1/2 sm:w-[70%] w-[90%] mt-10 mx-auto '>
          {/* ============add reviews =========== */}
          <div>
            <h3 className='tracking-widest font-mono mb-2'>Add Review:</h3>
          </div>
          <ReviewsAndRatings productName={nameUrl} insideProductDetails={true} />
        </div>
      </section>


      {/* =============== you may also like section ========== */}

      <section className='mt-20'>
        <h2 className='text-center text-2xl tracking-widest font-serif'>You may also like</h2>

        <div className='hidden-scrollbar flex justify-start items-center gap-5 py-4  overflow-x-auto  w-[90%] mx-auto'>


          {filterProduct?.map((product) => (
            <Link to={`/shop/${categoryBtnValue}/${product['name-url']}`} key={product._id} >
              <div className='flex flex-col justify-center items-center gap-5 shadow-xl px-8 py-4 cursor-pointer hover:scale-90 hover:bg-[#dcd3b9] transition-all duration-500  min-h-[350px] max-w-64 rounded-2xl'>
                {/* image  */}

                <div className=''>
                  <img src={Array.isArray(product.img) ? product.img.filter(path => path.toLowerCase().includes('front'))[0] : null} alt="product-image" className='min-w-32 w-32 h-32 object-contain max-h-[240px] rounded-xl' />
                </div>
                {/* info  */}
                <div className='flex flex-col justify-center items-center gap-2 '>
                  <p className=' tracking-widest text-[var(--themeColor)] text-center font-medium w-2/3'>{product.name}</p>
                  <p className='text-[14px] text-gray-500 tracking-widest'>Weight: <span className='text-gray-600'>{product.weight}</span></p>

                  <p className='text-[14px] tracking-widest'>₹ <span className='font-semibold'>{Math.round(product.price - (product.price * product['discount '] / 100))}</span>/- &nbsp; <span>{product['discount ']}% off</span></p>
                  {/* <AddToCartBtn item={product} /> */}

                </div>
              </div>
            </Link>
          ))}

          <div className=''>
            <Link to='/shop/all'> <button className='tracking-widest hover:underline underline-offset-4'>View all Products</button></Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default ProductDetails





