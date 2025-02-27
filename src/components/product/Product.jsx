// import React, { useEffect, useState } from 'react'
// import { NavLink } from 'react-router-dom';
// import AddToCartBtn from '../add-to-cart-btn/AddToCartBtn';
// import axios from 'axios';
// import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
// import { AiOutlineStar } from 'react-icons/ai';
// import { useSelector } from 'react-redux';
// import Image from '../image/Image';


// const product = {
//   _id: "672c90fd6582a38d3147800d",
//   product_id: 1,
//   name: "Organic Light Flora Honey",
//   "name-url": "Organic-Light-Flora-Honey",
//   weight: "500 gm",
//   grossWeight: "768 gm",
//   price: 450,
//   discount: 20,
//   tax: 5,
//   "hsn-code": "4090000",
//   category: "Organic Honey",
//   "category-url": "Organic-Honey",
//   description: "Introducing our Light Flora Honey, a premium product sourced from the finest flowers and crafted with utmost care",
//   availability: 75,
//   img: [
//     {
//       blur: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/blur/back.webp",
//       sm: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/sm/back.webp",
//       md: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/md/back.webp",
//       lg: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/lg/back.webp",
//       _id: "676e75b1ac8842f1442f5373"
//     },
//     {
//       blur: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/blur/front.webp",
//       sm: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/sm/front.webp",
//       md: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/md/front.webp",
//       lg: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/lg/front.webp",
//       _id: "676e75b1ac8842f1442f5374"
//     },
//     {
//       blur: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/blur/left.webp",
//       sm: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/sm/left.webp",
//       md: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/md/left.webp",
//       lg: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/lg/left.webp",
//       _id: "676e75b1ac8842f1442f5375"
//     },
//     {
//       blur: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/blur/right.webp",
//       sm: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/sm/right.webp",
//       md: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/md/right.webp",
//       lg: "https://organic-nation-product-images.s3.amazonaws.com/products/Organic-Light-Flora-Honey/lg/right.webp",
//       _id: "676e75b1ac8842f1442f5376"
//     }
//   ],
//   meta: {
//     buy: 2,
//     get: 1,
//     season_special: false,
//     new_arrivals: false,
//     best_seller: false,
//     deal_of_the_day: false
//   },
//   updatedAt: new Date(1735292337798)
// };


// const Product = ({ gridView ,product}) => {
//   // const [imgLoading, setImgLoading] = useState(true);
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
//           {/* {imgLoading && <div className='loader'></div>} */}

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
//                 // onLoad={() => setImgLoading(false)}
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
//                   // onLoad={() => setImgLoading(false)}
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
//               ₹ <span className='font-semibold sm:text-[16px] text-'>
//                 {Math.round(product.price - (product.price * product.discount / 100))}
//               </span>/- &nbsp;
//               <span className='text-green-800 font-bold'>{product.discount}% off</span>
//             </p>
//           </div>
//           <AddToCartBtn item={product} />
//         </div>
//       </div>
//     </NavLink>
//   );
// };



// export default Product;



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




import React, { useState, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddToCartBtn from '../add-to-cart-btn/AddToCartBtn';
import Image from '../image/Image';
import { LuEye } from "react-icons/lu";

// QuickView Modal Component
const QuickViewModal = ({ product, onClose }) => {
  const discountedPrice = Math.round(product.price - (product.price * product.discount / 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="relative w-full max-w-md px-6 pb-6 bg-white rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
        <div className='text-end pt-4'>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="aspect-square w-full relative max-h-[250px]">
            <Image
              src={{
                sm: product.img[0].sm,
                md: product.img[0].md,
                lg: product.img[0].lg
              }}
              blurSrc={product.img[0].blur}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">₹{discountedPrice}</span>
              <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
              <span className="px-2 py-1 text-sm font-semibold text-green-600 bg-green-50 rounded-full">
                {product.discount}% off
              </span>
            </div>

            <AddToCartBtn item={product} />
          </div>
        </div>
      </div>
    </div>
  );
};



// const Product = memo(({ gridView, product }) => {


//   const [isHovered, setIsHovered] = useState(false);
//   const [showQuickView, setShowQuickView] = useState(false);
//   const { categoryBtnValue } = useSelector((state) => state.filterData);

//   const frontImage = product?.img?.[0];
//   const hoverImage = product?.img?.[1];

//   const discountedPrice = Math.round(product.price - (product.price * product.discount / 100));

//   return (
//     <>
//       <div className={`
//         group relative
//         ${gridView 
//           ? 'w-full sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px]' 
//           : 'w-full max-w-full'
//         }
//       `}>
//         <div className={`
//           bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300
//           hover:shadow-lg relative
//           ${gridView 
//             ? 'flex flex-col' 
//             : 'flex flex-col sm:flex-row gap-4'
//           }
//         `}>
//           {/* Image Container */}
//           <div className={`
//             relative aspect-square z-10
//             ${gridView 
//               ? 'w-full' 
//               : 'w-full sm:w-[200px] md:w-[240px]'
//             }
//           `}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           >
//             {/* Product Images */}
//             <NavLink to={`/shop/${categoryBtnValue}/${product['name-url']}`}>
//             <div className="relative w-full h-full">
//             {frontImage && (
//                 <div className="absolute inset-0">
//                   <Image
//                     src={{
//                       sm: frontImage.sm,
//                       md: frontImage.md,
//                       lg: frontImage.lg
//                     }}
//                     blurSrc={frontImage.blur}
//                     alt={product.name}
//                     className="w-full h-full object-contain p-2"
//                     isHovered={!isHovered}
//                   />
//                 </div>
//               )}

//               {/* Hover Image */}
//               {hoverImage && (
//                 <div className="absolute inset-0">
//                   <Image
//                     src={{
//                       sm: hoverImage.sm,
//                       md: hoverImage.md,
//                       lg: hoverImage.lg
//                     }}
//                     blurSrc={hoverImage.blur}
//                     alt={`${product.name} alternate view`}
//                     className="w-full h-full object-contain p-2"
//                     isHovered={isHovered}
//                   />
//                 </div>
//               )}
//               </div>
//             </NavLink>

//             {/* Quick View Button */}
//             <button
//               onClick={() => setShowQuickView(true)}
//               className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md
//                 opacity-0 group-hover:opacity-100 transition-opacity duration-300
//                 hover:bg-gray-100 z-20"
//             >
//               <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//               </svg>
//             </button>

//             {/* Discount Badge */}
//             <div className="absolute top-4 left-4 px-2 py-1 bg-red-500 text-white text-sm font-semibold rounded z-20">
//               {product.discount}% OFF
//             </div>
//           </div>

//           {/* Product Info */}
//           <div className={`
//             flex flex-col relative z-20 bg-white
//             ${gridView 
//               ? 'p-4 gap-2' 
//               : 'p-4 sm:p-6 flex-1'
//             }
//           `}>
//             <NavLink to={`/shop/${categoryBtnValue}/${product['name-url']}`}
//               className="relative z-20">
//               <h3 className="text-sm sm:text-base font-medium text-gray-900 hover:text-[#712522] transition-colors duration-200">
//                 {product.name}
//               </h3>
//             </NavLink>

//             {!gridView && (
//               <p className="mt-2 text-sm text-gray-600 line-clamp-2 hidden sm:block relative z-20">
//                 {product.description}
//               </p>
//             )}

//             <div className="mt-2 space-y-2 relative z-20">
//               <div className="flex items-baseline gap-2">
//                 <span className="text-lg sm:text-xl font-bold text-gray-900">₹{discountedPrice}</span>
//                 <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
//               </div>

//               <div className="w-full relative z-30">
//                 <AddToCartBtn item={product} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick View Modal */}
//       {showQuickView && (
//         <QuickViewModal 
//           product={product} 
//           onClose={() => setShowQuickView(false)} 
//         />
//       )}
//     </>
//   );
// });

// Product.displayName = 'Product';

// export default Product;




const Product = memo(({ gridView, product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { categoryBtnValue } = useSelector((state) => state.filterData);

  // Find images specifically marked as front and left views
  const frontImage = product?.img?.find(img =>
    Object.values(img).some(path => typeof path === 'string' && path.toLowerCase().includes('front'))
  );

  const leftImage = product?.img?.find(img =>
    Object.values(img).some(path => typeof path === 'string' && path.toLowerCase().includes('left'))
  );

  const discountedPrice = Math.round(product.price - (product.price * product.discount / 100));

  return (
    <>
      <div className={`
        group relative
        ${gridView
          ? 'xs:w-full w-36 max-w-[170px] xs:min-w-[200px] sm:min-w-[250px] md:min-w-[220px] lg:min-w-[300px]'
          : 'w-full sm:max-w-[80%]'
        }
      `}>
        <div className={`
         rounded-lg overflow-hidden shadow-sm transition-all duration-300 
          hover:shadow-lg relative
          ${gridView
            ? 'flex flex-col'
            : 'flex flex-row xs:gap-4'
          }
        `}>
          {/* Image Container */}
          <NavLink to={`/shop/${categoryBtnValue}/${product['name-url']}`}>
            <div
              className={`
              relative aspect-square z-10 overflow-hidden
              ${gridView ? 'w-full' : 'xs:w-[200px] w-[150px] md:w-[200px] lg:w-[240px]'}
            `}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Front Image */}
              {frontImage && (
                <div className={`
                absolute inset-0 w-full h-full
                transition-opacity duration-300 ease-in-out
                ${isHovered ? 'opacity-0' : 'opacity-100'}
              `}>
                  <Image
                    src={{
                      sm: frontImage.lg,
                      md: frontImage.lg,
                      lg: frontImage.lg
                    }}
                    blurSrc={frontImage.blur}
                    alt={`${product.name} front view`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              )}

              {/* Left/Hover Image */}
              {leftImage && (
                <div className={`
                absolute inset-0 w-full h-full
                transition-opacity duration-300 ease-in-out
                ${isHovered ? 'opacity-100' : 'opacity-0'}
              `}>
                  <Image
                    src={{
                      sm: leftImage.lg,
                      md: leftImage.lg,
                      lg: leftImage.lg
                    }}
                    blurSrc={leftImage.blur}
                    alt={`${product.name} left view`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              )}

              {/* Quick View Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowQuickView(true);
                }}
                className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                hover:bg-gray-100 z-20"
              >
                <LuEye className='text-xl text-gray-600' />
              </button>

              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 px-2 py-1 bg-red-500 text-white text-sm font-semibold rounded z-20">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          </NavLink>
          {/* Product Info */}
          <div className={`
            flex flex-col relative z-20
            ${gridView ? 'xs:p-2 p-1 xs:gap-2' : 'p-4 sm:p-6 flex-1 lg:gap-7'}`}>
            <NavLink
              to={`/shop/${categoryBtnValue}/${product['name-url']}`}
              className=" z-20"
            >
              <h3 className={`text-sm sm:text-base  text-gray-900 hover:text-[#712522] transition-colors duration-200 ${gridView ? 'min-h-10 xs:min-h-full' : ''} `}>
                {product.name}
              </h3>


              {!gridView && (
                <p className="mt-2 xs:text-sm text-[10px] text-gray-600 line-clamp-2  relative z-20">
                  {product.description}
                </p>
              )}
            </NavLink>
            <div className="space-y-2 relative z-20">
              <NavLink
                to={`/shop/${categoryBtnValue}/${product['name-url']}`}
                className="relative z-20"
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-lg sm:text-xl font-semibold text-gray-700">₹{discountedPrice}</span>
                  <span className="text-sm text-gray-500 font-semibold line-through">₹{product.price}</span>
                </div>
              </NavLink>
              <div className="w-full relative z-30">
                <AddToCartBtn item={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
});


export default Product;