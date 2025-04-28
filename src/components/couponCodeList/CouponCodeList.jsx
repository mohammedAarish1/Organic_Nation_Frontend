import React from 'react'
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { applyPickleCouponCode, getAllCartItems } from '../../features/cart/cart';
import { toast } from 'react-toastify';



// Coupon Item Component
const CouponItem = ({ coupon, onApply, index }) => (
  <motion.div
    key={coupon.code}
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      delay: 0.1 * (index + 1),
      duration: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 25
    }}
    whileHover={{
      scale: 1.02,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 }
    }}
    className="border border-gray-200 rounded-lg p-3 bg-white"
  >
    <div className="flex justify-between mb-1">
      <span className="font-bold text-blue-600">{coupon.code}</span>
      <span className="text-green-600 font-medium">{coupon.discount}</span>
    </div>
    <p className="text-sm text-gray-500">{coupon.description}</p>
    <motion.button
      className="mt-2 w-full py-1.5 bg-blue-100 text-blue-600 rounded font-medium"
      whileHover={{
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        scale: 1.02
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onApply()}
    >
      Apply
    </motion.button>
  </motion.div>
);



const CouponCodeList = () => {


  const coupons = [
    { code: 'BUY4PICKLES', description: 'Get Any Four Pickles at Flat ₹999', action: () => { } },
    { code: 'FOODSBAY5YEARS', description: 'Get additional 10% off on all orders above ₹ 1299', action: () => { } },
  ];


  return (
    <div>
      <h3 className="text-lg font-bold mb-3">Available Coupons</h3>
      <div className="space-y-3">
        {coupons.map((coupon, index) => (
          <CouponItem
            key={coupon.code}
            coupon={coupon}
            onApply={coupon.action}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default CouponCodeList
