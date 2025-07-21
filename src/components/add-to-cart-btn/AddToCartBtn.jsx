// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { addToCart, getAllCartItems } from '../../features/cart/cart';
// import { toast } from 'react-toastify';
// import { Tooltip } from 'react-tooltip';
// // react icons 
// import { BsCart4 } from 'react-icons/bs'




// const AddToCartBtn = ({ item, qty = 1 }) => {
//   const dispatch = useDispatch();
//   // const [itemAdded, setItemAdded] = useState(false);

//   const { cartItemsList } = useSelector((state) => state.cart);

//   // Get the current quantity of this item in the cart
//   const currentQtyInCart = cartItemsList?.find(cartItem => cartItem._id === item._id)?.quantity || 0;



//   const handleAddingItemsToCart = () => {
//     // Check if adding the new quantity would exceed the available stock
//     if (currentQtyInCart + qty > item.availability) {
//       toast.error(`No Quanity left in stock.`);
//       return;
//     }

//     dispatch(addToCart({ productId: item._id, quantity: qty, productName: item['name-url'] }))
//       .then(() => {

//         dispatch(getAllCartItems());
//         toast.info('Item Added to the Cart')
//       })


//   }


//   const isOutOfStock = item.availability === 0;
//   // const stockExceededLimit = currentQtyInCart + qty > item.availability;


//   return (
//     <div className='z-4 min-w-full  sm:mt-0'
//     onClick={(e) => {
//       e.preventDefault();
//       e.stopPropagation();
//     }}
//     >
//       <button
//         type='button'
//         disabled={isOutOfStock}
//         data-tooltip-id={isOutOfStock && "addToCart-tooltip"}
//         data-tooltip-content="SOLD OUT"
//         data-tooltip-place="top"
//         onClick={(e) => {
//           // e.stopPropagation();  // Prevent the event from bubbling up to the NavLink
//           handleAddingItemsToCart();
//           // if (stockExceededLimit) {
//           //   setItemAdded(true)
//           //   setTimeout(() => {
//           //     setItemAdded(false)
//           //   }, 2000)
//           // }

//         }}
//         className={`${isOutOfStock ? 'opacity-60' : 'hover:bg-[var(--bgColorPrimary)]'}  flex justify-center items-center sm:mt-1  w-full text-white sm:py-2 py-1 sm:px-4 px-2 rounded-2xl bg-[#712522]   transition-all duration-500 gap-1 `}>

//         <BsCart4 className={`text-white  ${!isOutOfStock && 'animate-bounce'}`} />


//         Add to Cart
//       </button>

//       {/* tooltip */}
//       {isOutOfStock && (
//         <Tooltip
//           id="addToCart-tooltip"
//           style={{
//             backgroundColor: "red",
//             color: "#ffffff",
//             borderRadius: "10px",
//             padding: "20px"
//           }}
//           place="top"
//           animation="fade"
//           delayShow={200} // delay before showing in ms
//           delayHide={300} // delay before hiding in ms
//         // offset={10} // distance in pixels
//         // arrow={true}
//         // arrowColor="#25D366"
//         >

//         </Tooltip >
//       )}

//     </div>
//   )
// }

// export default AddToCartBtn;


import React, { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getAllCartItems } from '../../features/cart/cart';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { BsCart4 } from 'react-icons/bs';
import { useCartNotification } from '../../context/CartNotificationContext';
import { FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AddToCartBtn = ({ item, qty = 1 }) => {
  const dispatch = useDispatch();
  const { cartItemsList } = useSelector((state) => state.cart);
  const { showCartNotification } = useCartNotification();
  // Generate a unique ID for each button's tooltip
  const tooltipId = useMemo(() => `addToCart-tooltip-${item._id}`, [item._id]);

  const currentQtyInCart = cartItemsList?.find(cartItem => cartItem._id === item._id)?.quantity || 0;

  const handleAddingItemsToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (currentQtyInCart + qty > item.availability) {
      toast.error(`No Quantity left in stock.`);
      return;
    }

    dispatch(addToCart({
      productId: item._id,
      quantity: qty,
      productName: item['name-url']
    }))
      .then(() => {
        dispatch(getAllCartItems());
        // toast.info('Item Added to the Cart');
        // Show cart notification instead of toast
         // ADD THIS LINE - Update discount progress
        // dispatch(getDiscountProgress());
        showCartNotification();
      });
  };

  const isOutOfStock = item.availability === 0;

  return (
    <div
      className="relative z-30 w-full"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <motion.button
        // type="button"
        disabled={isOutOfStock}
        data-tooltip-id={isOutOfStock ? tooltipId : undefined}
        onClick={handleAddingItemsToCart}
        // className={`
        //   relative z-30 w-full flex justify-center items-center gap-2
        //   sm:py-2 py-1.5 xs:px-4 
        //    text-sm font-medium
        //   transition-all duration-500 tracking-tight
        //   ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed opacity-50'  : ' hover:bg-[var(--bgColorPrimary)] hover:text-white border border-black' }
        // `}

        className={`flex-1 py-2 xs:px-8 rounded-2xl font-bold xs:text-lg text-white flex items-center justify-center space-x-3 shadow-lg transition-all duration-300 w-full bg-[var(--themeColor)] ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed opacity-50'  : '' }`}
        whileHover={!isOutOfStock && {
          scale: 1.02,
          backgroundColor: '#9B7A2F',
          boxShadow: "0 10px 30px rgba(122, 46, 29, 0.3)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        <FaShoppingCart
        // className={` ${!isOutOfStock && 'animate-bounce'}`} 
        />
        <span>Add to Cart</span>
      </motion.button>

      {isOutOfStock && (
        <Tooltip
          id={tooltipId}
          place="top"
          content="SOLD OUT"
          className="z-50 !bg-red-500 !rounded-lg !py-2 !px-4"
          classNameArrow="!border-red-500"
          style={{
            backgroundColor: "rgb(239 68 68)",
            fontSize: "0.875rem",
            fontWeight: "500"
          }}
          noArrow={false}
          animation="fade"
          delayShow={200}
          delayHide={300}
        />
      )}
    </div>
  );
};

export default memo(AddToCartBtn);
