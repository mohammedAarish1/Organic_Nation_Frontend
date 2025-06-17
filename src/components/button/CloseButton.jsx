import React from 'react'
import { IoCloseSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';


const CloseButton = ({action}) => {
    return (
        <motion.button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(122,46,29,0.1)] text-[var(--themeColor)] hover:bg-[rgba(122,46,29,0.2)] transition-colors"
            onClick={action}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
        >
            <IoCloseSharp className="text-2xl" />
        </motion.button>
    )
}

export default CloseButton
