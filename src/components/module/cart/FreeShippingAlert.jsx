import React from 'react'
import { motion } from 'framer-motion'
const FreeShippingAlert = ({totalCartAmount}) => {
  return (
    <motion.div
                    className="bg-[#6B8E23] bg-opacity-10 border border-[#6B8E23] border-opacity-30 rounded-md p-3 mb-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <p className="text-[#6B8E23] text-sm font-medium flex items-center">
                      <span className="w-4 h-4 mr-2 flex items-center justify-center rounded-full bg-[#6B8E23] bg-opacity-20">
                        <span className="text-xs">🎁</span>
                      </span>
                      Add ₹{(499 - totalCartAmount)} worth of products more to get FREE SHIPPING!
                    </p>
                  </motion.div>
  )
}

export default FreeShippingAlert
