// import  { useCallback } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllCartItems, updateQty } from '../../features/cart/cart';
// import { Minus, Plus } from 'lucide-react';

// const ProductQty = ({ qty = 1, setQty, curItem = null }) => {
//     const dispatch = useDispatch();
//     const { loading } = useSelector(state => state.cart);

//     const handleIncreaseQty = useCallback(() => {
//         if (curItem?.quantity) {
//             if (curItem?.quantity === curItem?.availability) {
//                 toast.error('No Quantity left in stock.');
//                 return;
//             }
//             dispatch(updateQty({
//                 productName: curItem['name-url'],
//                 type: 'increase'
//             })).then(() => dispatch(getAllCartItems()))
//         } else {
//              setQty((prevQty) => prevQty + 1)
//         }
//     }, [curItem?.quantity, curItem?.availability, curItem?.['name-url'], dispatch]);

//     const handleDecreaseQty = useCallback(() => {
//         if (curItem?.quantity) {
//             dispatch(updateQty({
//                 productName: curItem['name-url'],
//                 type: 'decrease'
//             })).then(() => dispatch(getAllCartItems()));
//         } else {
//             setQty(prev=>prev>1?prev-1:1)
//         }
//     }, [curItem?.['name-url'], dispatch]);

//     return (
//         // <div className="  max-w-max">
//         //     <div className="amount-toggle flex justify-start items-center gap-5">
//         //         <button
//         //             className='outline-none p-1 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-sm'
//         //             onClick={() => {
//         //                 decreaseQty();
//         //             }}>
//         //             <FaMinus />
//         //         </button>
//         //         <p className="text-xl">{loading ? (<ImSpinner9 className='animate-spin text-xs' />) : qty}</p>
//         //         <button
//         //             className='outline-none p-1 cursor-pointer bg-green-700 hover:bg-green-900 text-white rounded-sm'
//         //             onClick={() => {

//         //                 increaseQty();
//         //             }}>
//         //             <Plus />
//         //         </button>
//         //     </div>
//         // </div>
//         <div className="flex items-center gap-1">
//             <button
//                 onClick={handleDecreaseQty}
//                 className="w-6 h-6 rounded flex items-center justify-center transition-colors"
//                 style={{
//                     backgroundColor: 'var(--neutral-color)'
//                 }}
//             >
//                 <Minus size={16} />
//             </button>

//             <span className="w-7 text-center text-sm font-medium">{curItem?.quantity || qty}</span>

//             <button
//                 onClick={handleIncreaseQty}
//                 className="w-6 h-6 rounded flex items-center justify-center"
//                 style={{
//                     backgroundColor: 'var(--accent-color)',
//                     color: 'var(--text-light-color)'
//                 }}
//                 disabled={curItem?.quantity >= curItem?.availability}
//             >
//                 <Plus size={16} />
//             </button>
//         </div>
//     )
// }

// export default ProductQty;

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems, updateQty } from "../../features/cart/cart";
import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

const ProductQty = ({
  qty = 1,
  setQty,
  curItem = null,
  extraClass = "xs:px-4 px-2 py-2",
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.cart);

  const handleIncreaseQty = useCallback(() => {
    if (curItem?.quantity) {
      if (curItem?.quantity === curItem?.availability) {
        toast.error("No Quantity left in stock.");
        return;
      }
      dispatch(
        updateQty({
          productName: curItem["name-url"],
          type: "increase",
        })
      ).then(() => dispatch(getAllCartItems()));
    } else {
      setQty((prevQty) => prevQty + 1);
    }
  }, [
    curItem?.quantity,
    curItem?.availability,
    curItem?.["name-url"],
    dispatch,
  ]);

  const handleDecreaseQty = useCallback(() => {
    if (curItem?.quantity) {
      dispatch(
        updateQty({
          productName: curItem["name-url"],
          type: "decrease",
        })
      ).then(() => dispatch(getAllCartItems()));
    } else {
      setQty((prev) => (prev > 1 ? prev - 1 : 1));
    }
  }, [curItem?.["name-url"], dispatch]);

  return (
    // <div className="  max-w-max">
    //     <div className="amount-toggle flex justify-start items-center gap-5">
    //         <button
    //             className='outline-none p-1 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-sm'
    //             onClick={() => {
    //                 decreaseQty();
    //             }}>
    //             <FaMinus />
    //         </button>
    //         <p className="text-xl">{loading ? (<ImSpinner9 className='animate-spin text-xs' />) : qty}</p>
    //         <button
    //             className='outline-none p-1 cursor-pointer bg-green-700 hover:bg-green-900 text-white rounded-sm'
    //             onClick={() => {

    //                 increaseQty();
    //             }}>
    //             <Plus />
    //         </button>
    //     </div>
    // </div>

    <div className="flex items-center border border-gray-300 rounded-xl">
      <motion.button
        onClick={handleDecreaseQty}
        className={`${extraClass} hover:bg-gray-100 transition-colors`}
        whileTap={{ scale: 0.95 }}
      >
        <Minus size={18} />
      </motion.button>
      <span
        className={`${extraClass} font-bold border-x border-gray-300  text-center`}
      >
        {curItem?.quantity || qty}
      </span>
      <motion.button
        onClick={handleIncreaseQty}
        className={`${extraClass}  hover:bg-gray-100 transition-colors`}
        whileTap={{ scale: 0.95 }}
        disabled={curItem?.quantity >= curItem?.availability}
      >
        <Plus size={18} />
      </motion.button>
    </div>
  );
};

export default ProductQty;
