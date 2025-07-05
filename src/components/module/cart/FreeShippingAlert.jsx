import React from 'react'
import { motion } from 'framer-motion'

const FreeShippingAlert = ({ totalCartAmount = 250, shippingFee =0}) => {
  const remaining = Math.max(0, 499 - totalCartAmount);
  const progress = Math.min(100, (totalCartAmount / 499) * 100);

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl p-4 mb-4 backdrop-blur-sm transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, #F5EFE6 0%, rgba(107, 142, 35, 0.05) 50%, #DCD2C0 100%)',
        border: '2px solid #6B8E23',
        boxShadow: '0 4px 12px rgba(107, 142, 35, 0.15)'
      }}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 10 }}
      whileHover={{
        scale: 1.02,
        y: -2,
        boxShadow: '0 6px 20px rgba(107, 142, 35, 0.2)',
        transition: { duration: 0.3 }
      }}
    >
      {/* Animated background */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(107, 142, 35, 0.15) 0%, rgba(155, 122, 47, 0.1) 100%)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div> */}

      {/* Main content */}
      <div className="relative z-10">
        <div className="flex items-center mb-3">
          <motion.div
            className="w-12 h-12 mr-4 flex items-center justify-center rounded-full shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #6B8E23 0%, #9B7A2F 100%)'
            }}
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-xl">🎁</span>
          </motion.div>

          <div className="flex-1">
            <motion.p
              className="font-bold text-lg leading-tight"
              style={{ color: '#3E2C1B' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span style={{ color: '#6B8E23' }}>FREE SHIPPING</span> Almost Yours!
            </motion.p>
            <motion.p
              className="text-sm mt-1"
              style={{ color: '#7A2E1D' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Add ₹{remaining} more to qualify
            </motion.p>
          </div>
          {shippingFee > 0 && (
            <motion.div
              className="ml-4 px-3 py-1 rounded-full text-xs font-bold shadow-md"
              style={{
                background: 'linear-gradient(135deg, #D87C45 0%, #9B7A2F 100%)',
                color: '#FFFFFF'
              }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              SAVE ₹{shippingFee}!
            </motion.div>
          )}

        </div>

        {/* Progress bar */}
        <div className="relative">
          <div
            className="w-full rounded-full h-3 overflow-hidden"
            style={{ backgroundColor: '#DCD2C0' }}
          >
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: 'linear-gradient(135deg, #6B8E23 0%, #9B7A2F 100%)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: [-20, 100]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
          <motion.p
            className="text-xs font-medium mt-1 text-center"
            style={{ color: '#6B8E23' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {progress.toFixed(0)}% towards FREE shipping
          </motion.p>
        </div>
      </div>

      {/* Pulsing border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2"
        style={{ borderColor: 'rgba(107, 142, 35, 0.5)' }}
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};


export default FreeShippingAlert
