// import React from 'react';
// import { motion } from 'framer-motion';

// const CODEligibility = () => {
//     return (
//         <motion.div
//             className={`border rounded-md p-3 mb-4 ${"bg-[#9B7A2F] bg-opacity-10 border-[#9B7A2F] border-opacity-30"}`}
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
//         >
//             <p className="text-[#6B8E23] text-sm font-medium flex items-center">
//                 <span className="w-4 h-4 mr-2 flex items-center justify-center rounded-full bg-[#6B8E23] bg-opacity-20">
//                     <span className="text-xs">💰</span>
//                 </span>
//                 CASH ON DELIVERY (COD) is available on all orders above ₹ 399 !
//             </p>

//         </motion.div>
//     )
// }



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CODEligibility = () => {
    return (
        <motion.div
            className="relative overflow-hidden rounded-lg p-3 mb-4 backdrop-blur-sm"
            style={{
                background: 'linear-gradient(135deg, #F5EFE6 0%, #DCD2C0 100%)',
                border: '1px solid #9B7A2F',
                boxShadow: '0 2px 8px rgba(122, 46, 29, 0.1)'
            }}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.1 }}
            whileHover={{ 
                boxShadow: '0 4px 16px rgba(122, 46, 29, 0.15)',
                transition: { duration: 0.3 }
            }}
        >
            {/* Subtle background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-2 -right-2 w-12 h-12 rounded-full blur-lg"
                    style={{
                        background: 'linear-gradient(135deg, rgba(155, 122, 47, 0.2) 0%, rgba(122, 46, 29, 0.1) 100%)'
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex items-center">
                <motion.div
                    className="w-8 h-8 mr-3 flex items-center justify-center rounded-full shadow-sm"
                    style={{
                        background: 'linear-gradient(135deg, #9B7A2F 0%, #7A2E1D 100%)'
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                    <span className="text-sm">💰</span>
                </motion.div>
                
                <div className="flex-1">
                    <motion.p 
                        className="font-medium text-sm leading-tight"
                        style={{ color: '#3E2C1B' }}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span style={{ color: '#7A2E1D' }}>Cash on Delivery</span> available on orders above ₹399
                    </motion.p>
                </div>

                <motion.div
                    className="ml-3 w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#7A2E1D' }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </motion.div>
    );
};

export default CODEligibility;
