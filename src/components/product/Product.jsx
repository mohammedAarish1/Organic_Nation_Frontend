import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import AddToCartBtn from '../add-to-cart-btn/AddToCartBtn';
import axios from 'axios';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Image from '../image/Image';


// data 
// const product={
//   "_id": "672c90fd6582a38d3147804f",
//   "product_id": 67,
//   "name": "Seeds & Cranberry Muesli",
//   "name-url": "Seeds-&-Cranberry-Muesli",
//   "weight": "300 gm",
//   "grossWeight": "438 gm",
//   "price": 349,
//   "discount": 20,
//   "tax": 18,
//   "hsn-code": "19042000",
//   "category": "Breakfast Cereals",
//   "category-url": "Breakfast-Cereals",
//   "description": "A wholesome blend of seeds and cranberries, this muesli is a nutritious breakfast option with a burst of natural sweetness.",
//   "availability": 10,
//   "img": [
//     {
//         "blur": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/blur/Seeds-%26-Cranberry-Muesli-front.png.webp",
//         "sm": "https://organic-nation-product-images.s3.amazonaws.com/products/sm/Seeds-&-Cranberry-Muesli-front.png.webp",
//         "md": "https://organic-nation-product-images.s3.amazonaws.com/products/md/Seeds-&-Cranberry-Muesli-front.png.webp",
//         "lg": "https://organic-nation-product-images.s3.amazonaws.com/products/lg/Seeds-&-Cranberry-Muesli-front.png.webp",
//         "_id": "673d77915778550d06e9eed9"
//     },
//     {
//         "blur": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/blur/Seeds-%26-Cranberry-Muesli-left.png.webp",
//         "sm": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/sm/Seeds-%26-Cranberry-Muesli-left.png.webp",
//         "md": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/md/Seeds-%26-Cranberry-Muesli-left.png.webp",
//         "lg": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/lg/Seeds-%26-Cranberry-Muesli-left.png.webp",
//         "_id": "673d77915778550d06e9eeda"
//     },
//     {
//         "blur": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/blur/Seeds-%26-Cranberry-Muesli-right.png.webp",
//         "sm": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/sm/Seeds-%26-Cranberry-Muesli-right.png.webp",
//         "md": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/md/Seeds-%26-Cranberry-Muesli-right.png.webp",
//         "lg": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/lg/Seeds-%26-Cranberry-Muesli-right.png.webp",
//         "_id": "673d77915778550d06e9eedb"
//     }
//   ],
//   "meta": {
//       "buy": 2,
//       "get": 1,
//       "season_special": false,
//       "new_arrivals": true,
//       "best_seller": false,
//       "deal_of_the_day": false
//   },
//   "updatedAt": "2024-11-20T05:45:53.498Z"
// }



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
  ${gridView ? 'sm:w-60 w-32 sm:h-60 h-32' : 'xs:w-48 xs:h-48 w-28 h-32'}
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
    <NavLink to={`/shop/${categoryBtnValue}/${product['name-url']}`} className={`${!gridView && 'block w-full'}`}>

      <div
        className={`${!gridView ? "flex flex-row lg:pl-32 justify-start items-center gap-5 w-full  " : "flex justify-center items-center flex-col xs:gap-2 xs:max-w-[150px] max-w-[130px] sm:max-w-[260px]"} font-sans `}
      // data-aos="zoom-in-up"
      // data-aos-duration="700"
      >
        {/* image  */}
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
        <div className={`flex flex-col justify-between  ${!gridView ? 'items-start gap-3  flex-1' : 'items-center w-full'}`}>
          {/* info  */}
          <div className={`flex flex-col justify-center sm:gap-1  sm:justify-between ${!gridView ? 'items-start ' : 'items-center'} min-h-16 `}>
            <p className={`font-medium sm:text-xl text-sm  ${gridView ? 'text-center xs:w-[70%] ' : ''}    text-[#712522] `}>{product.name}</p>
            {/* <p className='text-gray-500 sm:text- text-sm'>Weight: {product.weight}</p> */}
            {!gridView && <p className='lg:w-[70%] xs:block hidden text-sm font-serif'>{product.description.slice(0, 80)}...</p>}
            {/* <p>{error ? 'No reviews yet' : averageRating}</p> */}
            {/* ====================== rating section ======================  */}
            {/* <div className='flex justify-start items-center gap-2 sm:text-xl text-sm'>
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
          </div> */}
            {/* ====================== rating section end ======================  */}


            <p className=''>₹ <span className='font-semibold sm:text-[16px] text-sm' >{Math.round(product.price - (product.price * product.discount / 100))}</span>/- &nbsp; <span className='text-green-700'>{product.discount}% off</span></p>
          </div>
          <AddToCartBtn item={product} />
        </div>
      </div>
    </NavLink>

  )
}


// const Product = ({ gridView }) => {
//   const [imgLoading, setImgLoading] = useState(true);
//   const [isHovered, setIsHovered] = useState(false);
//   const { categoryBtnValue } = useSelector((state) => state.filterData);

//   const containerClasses = `
//     relative overflow-hidden
//     ${gridView ? 'sm:w-60 w-32 sm:h-60 h-32' : 'xs:w-48 xs:h-48 w-28 h-32'}
//     group hover:shadow-xl transition-shadow rounded-lg duration-500 
//   `;

//   const imageClasses = `
//     absolute inset-0 w-full h-full 
//     object-contain py-2
//   `;

//   // Find front and left images if they exist
//   const frontImage = product?.img?.find(img => 
//     Object.values(img).some(path => typeof path === 'string' && path.toLowerCase().includes('front'))
//   );
//   const leftImage = product?.img?.find(img => 
//     Object.values(img).some(path => typeof path === 'string' && path.toLowerCase().includes('left'))
//   );

//   return (
//     <NavLink to={`/shop/${categoryBtnValue}/${product['name-url']}`} className={`${!gridView && 'block w-full'}`}>
//       <div className={`${!gridView ? "flex flex-row lg:pl-32 justify-start items-center gap-5 w-full" : "flex justify-center items-center flex-col xs:gap-2 xs:max-w-[150px] max-w-[130px] sm:max-w-[260px]"} font-sans`}>
//         <div 
//           className={containerClasses}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           {imgLoading && <div className='loader'></div>}
          
//           {/* Stack both images absolutely */}
//           <div className="relative w-full h-full">
//             {frontImage && (
//               <Image
//                 src={{
//                   sm: frontImage.sm,
//                   md: frontImage.md,
//                   lg: frontImage.lg
//                 }}
//                 blurSrc={frontImage.blur}
//                 alt={`${product.name} front view`}
//                 className={`${imageClasses} transition-opacity duration-500 ease-in-out`}
//                 onLoad={() => setImgLoading(false)}
//                 isHovered={isHovered}
//               />
//             )}

//             {leftImage && (
//               <div 
//                 className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
//                   isHovered ? 'opacity-100' : 'opacity-0'
//                 }`}
//               >
//                 <Image
//                   src={{
//                     sm: leftImage.sm,
//                     md: leftImage.md,
//                     lg: leftImage.lg
//                   }}
//                   blurSrc={leftImage.blur}
//                   alt={`${product.name} left view`}
//                   className={imageClasses}
//                   onLoad={() => setImgLoading(false)}
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         <div className={`flex flex-col justify-between ${!gridView ? 'items-start gap-3 flex-1' : 'items-center w-full'}`}>
//           <div className={`flex flex-col justify-center sm:gap-1 sm:justify-between ${!gridView ? 'items-start' : 'items-center'} min-h-16`}>
//             <p className={`font-medium sm:text-xl text-sm ${gridView ? 'text-center xs:w-[70%]' : ''} text-[#712522]`}>
//               {product.name}
//             </p>
//             {!gridView && (
//               <p className='lg:w-[70%] xs:block hidden text-sm font-serif'>
//                 {product.description?.slice(0, 80)}...
//               </p>
//             )}
//             <p className=''>
//               ₹ <span className='font-semibold sm:text-[16px] text-sm'>
//                 {Math.round(product.price - (product.price * product.discount / 100))}
//               </span>/- &nbsp;
//               <span className='text-green-700'>{product.discount}% off</span>
//             </p>
//           </div>
//           <AddToCartBtn item={product} />
//         </div>
//       </div>
//     </NavLink>
//   );
// };



export default Product;





// const images=[
//   {
//       "blur": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/blur/Seeds-%26-Cranberry-Muesli-front.png.webp",
//       "sm": "https://organic-nation-product-images.s3.amazonaws.com/products/sm/Seeds-&-Cranberry-Muesli-front.png.webp",
//       "md": "https://organic-nation-product-images.s3.amazonaws.com/products/md/Seeds-&-Cranberry-Muesli-front.png.webp",
//       "lg": "https://organic-nation-product-images.s3.amazonaws.com/products/lg/Seeds-&-Cranberry-Muesli-front.png.webp",
//       "_id": "673d77915778550d06e9eed9"
//   },
//   {
//       "blur": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/blur/Seeds-%26-Cranberry-Muesli-left.png.webp",
//       "sm": "https://organic-nation-product-images.s3.amazonaws.com/products/sm/Seeds-&-Cranberry-Muesli-left.png.webp",
//       "md": "https://organic-nation-product-images.s3.amazonaws.com/products/md/Seeds-&-Cranberry-Muesli-left.png.webp",
//       "lg": "https://organic-nation-product-images.s3.amazonaws.com/products/lg/Seeds-&-Cranberry-Muesli-left.png.webp",
//       "_id": "673d77915778550d06e9eeda"
//   },
//   {
//       "blur": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/blur/Seeds-%26-Cranberry-Muesli-right.png.webp",
//       "sm": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/sm/Seeds-%26-Cranberry-Muesli-right.png.webp",
//       "md": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/md/Seeds-%26-Cranberry-Muesli-right.png.webp",
//       "lg": "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Seeds-%26-Cranberry-Muesli/lg/Seeds-%26-Cranberry-Muesli-right.png.webp",
//       "_id": "673d77915778550d06e9eedb"
//   }
// ]