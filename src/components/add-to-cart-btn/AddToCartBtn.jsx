import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getAllCartItems } from '../../features/cart/cart';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
// react icons 
import { BsCart4 } from 'react-icons/bs'




const AddToCartBtn = ({ item, qty = 1 }) => {
  const dispatch = useDispatch();
  // const [itemAdded, setItemAdded] = useState(false);

  const { cartItemsList } = useSelector((state) => state.cart);

  // Get the current quantity of this item in the cart
  const currentQtyInCart = cartItemsList?.find(cartItem => cartItem._id === item._id)?.quantity || 0;



  const handleAddingItemsToCart = () => {
    // Check if adding the new quantity would exceed the available stock
    if (currentQtyInCart + qty > item.availability) {
      toast.error(`No Quanity left in stock.`);
      return;
    }

    dispatch(addToCart({ productId: item._id, quantity: qty, productName: item['name-url'] }))
      .then(() => {
       
        dispatch(getAllCartItems());
        toast.info('Item Added to the Cart')
      })


  }


  const isOutOfStock = item.availability === 0;
  // const stockExceededLimit = currentQtyInCart + qty > item.availability;


  return (
    <div className='z-4 min-w-full  sm:mt-0'
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    >
      <button
        type='button'
        disabled={isOutOfStock}
        data-tooltip-id={isOutOfStock && "addToCart-tooltip"}
        data-tooltip-content="Out of Stock"
        data-tooltip-place="top"
        onClick={(e) => {
          // e.stopPropagation();  // Prevent the event from bubbling up to the NavLink
          handleAddingItemsToCart();
          // if (stockExceededLimit) {
          //   setItemAdded(true)
          //   setTimeout(() => {
          //     setItemAdded(false)
          //   }, 2000)
          // }

        }}
        className={`${isOutOfStock ? 'opacity-60' : 'hover:bg-[var(--bgColorPrimary)]'}  flex justify-center items-center sm:mt-1  w-full text-white sm:py-2 py-1 sm:px-4 px-2 rounded-2xl bg-[#712522]   transition-all duration-500 gap-1 `}>

        <BsCart4 className={`text-white  ${!isOutOfStock && 'animate-bounce'}`} />


        Add to Cart
      </button>

      {/* tooltip */}
      {isOutOfStock && (
        <Tooltip
          id="addToCart-tooltip"
          style={{
            backgroundColor: "red",
            color: "#ffffff",
            borderRadius: "10px",
            padding: "20px"
          }}
          place="top"
          animation="fade"
          delayShow={200} // delay before showing in ms
          delayHide={300} // delay before hiding in ms
        // offset={10} // distance in pixels
        // arrow={true}
        // arrowColor="#25D366"
        >

        </Tooltip >
      )}

    </div>
  )
}

export default AddToCartBtn;
