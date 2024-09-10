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
import { GoDotFill } from "react-icons/go";
import { LiaShippingFastSolid } from "react-icons/lia";
import Accordion from '../../components/accordionItem/Accordion';




const productInfo = [
  {
    title: 'Description',
    content: ['Accordion components are excellent for organizing and presenting information in a compact, easy-to-navigate format. They help reduce clutter on a page, improve readability, and enhance user experience by allowing users to focus on specific content sections at a time']
  },
  {
    title: 'Benefits',
    content: [
      'Easy to use',
      "Compact and organized",
      "Improves user experience",
      "Enhances readability",
    ]
  },
  {
    title: 'Usage',
    content: [
      'Use the accordion component to present information in a compact and organized format.',
      'lorem ipsum ipsum',
      'lorem ipsum ipsum'
    ],
  }
];

const faq = [
  {
    title: 'heading1',
    content: ['testing testing']
  },
  {
    title: 'heading1',
    content: ['testing testing']
  },
  {
    title: 'heading1',
    content: ['testing testing']
  },
]


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
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <div className='loader'></div>
      </div>
    )
  }
  return (
    <div>
      <section className='xs:py-20 py-5  '>
        {/* visible in mobile devices  */}
        <h2 className=' md:hidden block font-semibold xs:text-3xl text-2xl xs:px-10 px-4' >{product.name}</h2>
        {/* visible in mobile devices  */}
        <div className='flex md:flex-row flex-col  '>
          {/* left side  */}
          <ProductImages productImgs={product?.img?.length >= 1 && product.img} />

          {/* right side  */}
          <div className="md:w-[50%] max-h-[600px]  flex md:justify-start justify-center items-center gap-4 py-6 xs:pr-10 px-4 xs:pl-10 md:pl-0 font-sans  ">
            <div className='flex flex-col lg:gap-3 gap-2 tracking-wide'>
              <h2 className='md:block hidden font-medium md:text-4xl text-xl text-[var(--themeColor)]' >{product.name}</h2>
              <p className=''><span className='font-semibold'>Brand: </span><span>ORGANIC NATION</span> </p>
              <p className='flex items-center gap-2'><span className='border border-green-600'><GoDotFill className='text-green-700' /></span><span className='font-semibold '>Pure Vegetarian Product</span></p>
              <p className=''><span className=' font-semibold'>Weight: </span>{product.weight}</p>
              <p className=''><span className=' font-semibold'>Category: </span>{product.category}</p>
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
                <p className='text-2xl text-red-600'>-{product.discount}%</p>
                <p className='flex items-start'>
                  <FaIndianRupeeSign className='text-sm' />
                  <span className='text-3xl font-medium'>{Math.round(product.price - (product.price * product.discount / 100))}</span>
                </p>
                <p className='text-gray-600 text-sm self-end'>(Incl. of all taxes)</p>
              </div>
              <p><span className='font-semibold text-sm'>MRP:</span> <span className='line-through'> ₹{product.price}</span> </p>




              {/* <p className='lg:w-[70%]'>{product.description}</p> */}
              <p className='text-green-700 font-semibold'>*Cash On Delivery is available</p>
              <p className='flex items-center gap-2'><LiaShippingFastSolid className='text-xl' /> <span>Free shipping for all orders above ₹499</span></p>
              <p className='flex items-center gap-3'><span>In Stock:</span>{product.availability ? (<FaCircleCheck className='text-xl text-[var(--bgColorPrimary)]' />) : (<HiXCircle className='text-3xl text-red-700' />)}</p>
              <div className='flex items-center gap-2'>
                Quantity:-  <ProductQty qty={qty} increaseQty={increaseQty} decreaseQty={decreaseQty} />

              </div>
              <div>
                <AddToCartBtn item={product} qty={qty} />
              </div>
            </div>
          </div>
        </div>

      </section>
      {/* ============== product general info=============  */}
      {/* <section className='pt-20'>
        <Accordion data={productInfo} />
      </section> */}
      {/* =============== product info =============  */}
      {/* <section className=''>
        <h3 className='text-center text-[var(--themeColor)] text-xl font-semibold pb-10'>FAQ's</h3>
        <div>
          <Accordion data={faq} />
        </div>
      </section> */}
      {/* =============== product reviews and ratings ========== */}

      <section className='py-20'>
        <div className=' text-start xs:text-2xl tracking-widest font-serif  w-[80%]  mx-auto mb-5'>

          <h3 className='text-center text-[var(--themeColor)] text-xl font-semibold pb-10'>Reviews and Ratings</h3>
        </div>
        <div className=' w-[80%]   mx-auto flex flex-col gap-7'>
          {/* {loading && (<div>loading.....</div>)} */}
          {allReviews?.length > 0 && (
            allReviews.map((reviews) => (

              <SingleReview key={reviews._id} reviews={reviews} />

            ))
          )}

        </div>
        <div className=' w-[80%] mt-10 mx-auto '>
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

                  <p className='text-[14px] tracking-widest'>₹ <span className='font-semibold'>{Math.round(product.price - (product.price * product.discount / 100))}</span>/- &nbsp; <span>{product.discount}% off</span></p>
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





