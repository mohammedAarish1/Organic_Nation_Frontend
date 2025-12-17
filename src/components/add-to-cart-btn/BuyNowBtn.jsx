import {motion} from 'framer-motion'
import { addToCart, getAllCartItems } from "../../features/cart/cart";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

const BuyNowBtn = ({
  item,
   qty = 1,
   setIsCheckoutOpen,
   className=''
  }) => {
const dispatch=useDispatch();
 const { cartItemsList } = useSelector((state) => state.cart);

  const currentQtyInCart = cartItemsList?.find(cartItem => cartItem._id === item._id)?.quantity || 0;

   const handleBuyNow = (e) => {
      // e.preventDefault();
      // e.stopPropagation();
  
      if (currentQtyInCart + qty > item.availability) {
        toast.error(`Only ${item.availability} pcs. available`);
        return;
      }
  
      dispatch(addToCart({
        productId: item._id,
        quantity: qty,
        productName: item['name-url']
      }))
        .then(() => {
          dispatch(getAllCartItems())
          .then(result=>{
            if(result.type==='cart/getAllCartItems/fulfilled'){
              setIsCheckoutOpen(true)
            }
          })
        });
    };

     const isOutOfStock = item?.availability === 0;
  return (
    <motion.button
      onClick={handleBuyNow}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      // className="flex-1 bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all touch-manipulation"
      className={`bg-gray-900 hover:bg-gray-800 active:bg-gray-700 text-white rounded-xl shadow-lg transition-all ${className} ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed opacity-50' : ''}`}
    >
      Buy Now
    </motion.button>
  );
};

export default BuyNowBtn;
