import React from 'react';
import { motion } from 'framer-motion';


const Title = ({ heading, subHeading = '' }) => {
  return (
    // <h2 className='xs:text-[30px] text-2xl font-medium text-[var(--themeColor)] md:tracking-widest'>{text}</h2>
    <div className="flex flex-col items-center mb-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl tracking-widest text-[#712522] mb-2 text-center"
      >
        {heading}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="h-1 w-24 bg-gradient-to-r from-[#712522] to-[#bb7d7b] rounded-full mb-4"
      />
      {subHeading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-600 text-center max-w-2xl"
        >
          {subHeading}
        </motion.p>
      )}
    </div>
  )
}

export default Title
