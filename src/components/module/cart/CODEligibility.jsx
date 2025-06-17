import React from 'react';
import { motion } from 'framer-motion';

const CODEligibility = () => {
    return (
        <motion.div
            className={`border rounded-md p-3 mb-4 ${"bg-[#9B7A2F] bg-opacity-10 border-[#9B7A2F] border-opacity-30"}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        >
            <p className="text-[#6B8E23] text-sm font-medium flex items-center">
                <span className="w-4 h-4 mr-2 flex items-center justify-center rounded-full bg-[#6B8E23] bg-opacity-20">
                    <span className="text-xs">💰</span>
                </span>
                CASH ON DELIVERY (COD) is available on all orders above ₹ 399 !
            </p>

        </motion.div>
    )
}

export default CODEligibility;
