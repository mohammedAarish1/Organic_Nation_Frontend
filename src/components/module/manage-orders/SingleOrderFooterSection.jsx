// import { PiSealCheckFill } from "react-icons/pi";
// import { BsCartX } from "react-icons/bs";

// const SingleOrderFooterSection = ({ order, onCancelOrder, isActive }) => {
//     const calculateTotal = () => order?.orderDetails.reduce(
//       (total, item) => total + item.unitPrice * item.quantity,
//       0
//     );

//     const total = calculateTotal();
//     const discount = total - order.subTotal;

//     return (
//       <div className="">
//         <div className="xs:px-5 px-1 py-3 xs:text-[16px] text-[12px]">
//           <div className="flex justify-between">
//             <p className="text-end">Grand Total:</p>
//             <p className="font-semibold">₹ {total}</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="text-end">Discount (-):</p>
//             <p className="font-semibold">(₹ {discount})</p>
//           </div>
//           <div className="flex justify-between items-center">
//             <p className="text-end">Shipping Fee (+):</p>
//             <p>₹ {order?.shippingFee}</p>
//           </div>
//           <div className="flex justify-between items-center xs:text-[20px] font-semibold">
//             <div className="flex items-center gap-2">
//               <p>Total Amount Payable:</p>
//               {order.couponCodeApplied.length > 0 && (
//                 <div className="text-green-500 font-bold text-xs sm:block hidden">
//                   <p className="flex items-center">
//                     (Coupon Code Applied) <PiSealCheckFill className="text-xl" />
//                   </p>
//                 </div>
//               )}
//             </div>
//             <p>₹ {order?.subTotal + order?.shippingFee}</p>
//           </div>
//           {order.couponCodeApplied.length > 0 && (
//             <div className="text-green-200 font-bold text-xs sm:hidden block">
//               <p className="flex items-center">
//                 (Coupon Code Applied) <PiSealCheckFill className="text-xl" />
//               </p>
//             </div>
//           )}
//         </div>

//         <div className={`${isActive ? "bg-[#D3BB71] hover:bg-[#e0cf9c]" : "bg-gray-200"}`}>
//           <button
//             className="flex w-full h-full justify-center py-3 gap-1 items-center"
//             onClick={onCancelOrder}
//             disabled={!isActive}
//           >
//             <BsCartX className={`${isActive ? "text-red-500" : "text-red-400"} text-xl`} />
//             <span className={!isActive ? "text-gray-400" : ""}>
//               Cancel order
//             </span>
//           </button>
//         </div>
//       </div>
//     );
//   };

//   export default SingleOrderFooterSection;


import { motion } from 'framer-motion';
// React Icons
import { PiSealCheckFill } from "react-icons/pi";
import { BsCartX } from "react-icons/bs";


// Enhanced SingleOrderFooterSection Component
const SingleOrderFooterSection = ({ order, onCancelOrder, isActive }) => {
  const calculateTotal = () => order?.orderDetails.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  const total = calculateTotal();
  const discount = total - order.subTotal;
  const finalAmount = order?.subTotal + order?.shippingFee;

  const priceBreakdown = [
    { label: "Subtotal", value: `₹${total}`, type: "regular" },
    { label: "Discount", value: `₹${discount}`, type: "discount" },
    { label: "Shipping Fee", value: `₹${order?.shippingFee}`, type: "regular" },
  ];

  return (
    <div className="border-t border-[var(--neutral-color)]/20">
      {/* Price Breakdown */}
      <div className="p-6 space-y-3">
        {priceBreakdown.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-[var(--text-color)]/70">{item.label}:</span>
            <span className={`font-medium ${item.type === 'discount' ? 'text-[var(--secondary-color)]' : 'text-[var(--text-color)]'}`}>
              {item.type === 'discount' && discount > 0 && '-'}{item.value}
            </span>
          </motion.div>
        ))}

        {/* Coupon Applied Badge */}
        {order.couponCodeApplied?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-[var(--secondary-color)]/10 text-[var(--secondary-color)] px-3 py-2 rounded-lg text-sm font-medium"
          >
            <PiSealCheckFill className="w-4 h-4" />
            <span>Coupon Applied</span>
          </motion.div>
        )}

        {/* Total */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center pt-3 border-t border-[var(--neutral-color)]/20"
        >
          <span className="font-bold text-[var(--text-color)] text-lg">Total Amount:</span>
          <span className="font-bold text-[var(--themeColor)] text-xl">₹{finalAmount}</span>
        </motion.div>
      </div>

      {/* Cancel Order Button */}
      <div className='flex items-center justify-end'>
        <motion.button
          // whileHover={isActive ? { scale: 1.02 } : {}}
          whileTap={isActive ? { scale: 0.98 } : {}}
          className={`
           pr-4 flex items-center justify-end hover:underline gap-2 py-2 font-medium
          ${isActive
              ? ' text-gray-600'
              : ' text-gray-400 cursor-not-allowed'
            }
        `}
          onClick={onCancelOrder}
          disabled={!isActive}
        >
          <BsCartX className="w-5 h-5" />
          <span>Cancel</span>
        </motion.button>
      </div>
    </div>
  );
};

export default SingleOrderFooterSection;