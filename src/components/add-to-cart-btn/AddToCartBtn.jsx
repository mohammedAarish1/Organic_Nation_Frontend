import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, getAllCartItems } from '../../features/cart/cart';
import { toast } from 'react-toastify';
// react icons 
import { BsCart4 } from 'react-icons/bs'
import { FaCheck } from "react-icons/fa";




const AddToCartBtn = ({ item, qty = 1 }) => {
  const dispatch = useDispatch();
  const [itemAdded, setItemAdded] = useState(false);

  const handleAddingItemsToCart = () => {

    dispatch(addToCart({ productId: item._id, quantity: qty, productName: item['name-url'] }))
      .then(() => {
        dispatch(getAllCartItems());
        toast.info('Item Added to the Cart')
      })


  }

  return (
    <div>
      <button
        type='button'
        onClick={() => {
          handleAddingItemsToCart();
          setItemAdded(true)
          setTimeout(() => {
            setItemAdded(false)
          }, 2000)
        }}
        className={` ${itemAdded ? 'bg-green-700 gap-2' : 'bg-[#712522] hover:scale-90  transition-all duration-500 gap-1 '} flex justify-center items-center mt-2  w-max text-white py-2 px-4 hover:scal-110  `}>
        {!itemAdded && <BsCart4 className='text-white animate-bounce ' />} {itemAdded ? 'Addded' : 'Add to Cart'}{itemAdded && <FaCheck />}
      </button>
    </div>
  )
}

export default AddToCartBtn;
