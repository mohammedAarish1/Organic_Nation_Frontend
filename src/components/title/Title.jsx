// import React from 'react';
// import { motion } from 'framer-motion';


// const Title = ({ heading, subHeading = '' }) => {
//   return (
//     // <h2 className='xs:text-[30px] text-2xl font-medium text-[var(--themeColor)] md:tracking-widest'>{text}</h2>
//     <div className="flex flex-col items-center mb-12">
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-3xl md:text-4xl tracking-widest text-[#712522] mb-2 text-center"
//       >
//         {heading}
//       </motion.h2>
//       <motion.div
//         initial={{ scaleX: 0 }}
//         animate={{ scaleX: 1 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="h-1 w-24 bg-gradient-to-r from-[#712522] to-[#bb7d7b] rounded-full mb-4"
//       />
//       {subHeading && (
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="text-gray-600 text-center max-w-2xl"
//         >
//           {subHeading}
//         </motion.p>
//       )}
//     </div>
//   )
// }

// export default Title



import React from 'react';
import { motion } from 'framer-motion';

const Title = ({ heading, subHeading = '', variant = 'default' }) => {
  // Animation variants for different effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: -30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };

  const lineVariants = {
    hidden: { 
      scaleX: 0,
      opacity: 0
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  };

  const subHeadingVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Split heading into words for animated effect
  const words = heading.split(' ');

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center sm:my-16 my-10 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-8 -left-8 w-16 h-16 rounded-full border-2 opacity-10"
          style={{ borderColor: 'var(--accent-color)' }}
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -top-4 -right-12 w-12 h-12 rounded-full opacity-5"
          style={{ backgroundColor: 'var(--secondary-color)' }}
          animate={{ 
            y: [0, -10, 0],
            x: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Heading */}
      <div className="relative mb-6">
        {/* Animated background text effect */}
        <motion.div
          className="absolute inset-0 flex flex-wrap justify-center items-center gap-2 opacity-5 -z-10"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span 
            className="text-6xl md:text-8xl font-black tracking-wider"
            style={{ color: 'var(--themeColor)' }}
          >
            {heading.charAt(0)}
          </span>
        </motion.div>

        {/* Main heading with word animation */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold text-center relative z-10"
          style={{ color: 'var(--themeColor)' }}
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-3 relative"
              whileHover={{ 
                scale: 1.05,
                color: 'var(--accent-color)',
                transition: { duration: 0.2 }
              }}
            >
              {word}
              {/* Individual word underline effect */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full opacity-0"
                style={{ backgroundColor: 'var(--accent-color)' }}
                whileHover={{ 
                  opacity: 1,
                  scaleX: 1,
                  transition: { duration: 0.3 }
                }}
                initial={{ scaleX: 0 }}
              />
            </motion.span>
          ))}
        </motion.h2>

        {/* Decorative corner elements */}
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg opacity-30"
          style={{ borderColor: 'var(--accent-color)' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 rounded-br-lg opacity-30"
          style={{ borderColor: 'var(--accent-color)' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        />
      </div>

      {/* Enhanced decorative line */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <motion.div
          variants={lineVariants}
          className="h-1 w-16 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)' }}
        />
        
        <motion.div
          className="relative"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div 
            className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
            style={{ borderColor: 'var(--themeColor)' }}
          >
            <motion.div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: 'var(--accent-color)' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.div
          variants={lineVariants}
          className="h-1 w-16 rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, var(--accent-color), transparent)' }}
        />
      </div>

      {/* Enhanced subtitle */}
      {subHeading && (
        <motion.div
          variants={subHeadingVariants}
          className="relative max-w-4xl px-6"
        >
          {/* Quote marks */}
          <motion.div
            className="absolute -top-2 -left-2 text-4xl opacity-20"
            style={{ color: 'var(--accent-color)' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            "
          </motion.div>
          <motion.div
            className="absolute -bottom-6 -right-2 text-4xl opacity-20"
            style={{ color: 'var(--accent-color)' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          >
            "
          </motion.div>

          <motion.div
            className="text-base sm:text-lg md:text-xl text-center leading-relaxed font-medium relative z-10"
            style={{ color: 'var(--text-color)' }}
            initial={{ letterSpacing: '0.1em' }}
            animate={{ letterSpacing: '0.05em' }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.span
              className="relative inline-block"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {subHeading}
              <motion.p
                className="absolute inset-0 rounded-lg -z-10 opacity-0"
                style={{ backgroundColor: 'var(--background-color)' }}
                whileHover={{ 
                  opacity: 0.8,
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
              />
            </motion.span>
          </motion.div>

          {/* Decorative dots */}
          <div className="flex justify-center mt-4 gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--accent-color)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ 
                  delay: 2 + i * 0.2, 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.5,
                  opacity: 1,
                  transition: { duration: 0.2 }
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-20"
            style={{ backgroundColor: 'var(--secondary-color)' }}
            initial={{ 
              x: Math.random() * 400,
              y: Math.random() * 200,
              opacity: 0
            }}
            animate={{
              x: Math.random() * 400,
              y: Math.random() * 200,
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Title;