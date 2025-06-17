import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import Title from '../../title/Title';


const CertificatesSection = memo(({ certificates, title = "Our Certifications" }) => {
  // Simple state for tracking when items are visible
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Animation variants - kept simple for performance
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //       delayChildren: 0.2
  //     }
  //   }
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, scale: 0.9 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: { type: 'spring', stiffness: 70, damping: 12 }
  //   }
  // };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10" >
      <div className="max-w mx-auto">
        {/* Section header */}
        <Title heading={title} subHeading='Our certifications represent our commitment to quality, safety, and excellence' />
        {/* Certificates container */}
        <motion.div
          className="rounded-lg p-6 sm:p-8"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          initial="hidden"
          animate="visible"
          // variants={containerVariants}
        >
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10 items-center">
            {certificates.map((imgPath, index) => (
              <motion.div
                key={imgPath}
                className="relative"
                // variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <div
                  className="p-3 sm:p-4 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: hoveredIndex === index ? 'var(--neutral-color)' : 'transparent',
                    boxShadow: hoveredIndex === index ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'
                  }}
                >
                  <img
                    src={imgPath}
                    alt="Certificate"
                    className="w-24 sm:w-32 lg:w-40 h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
});

export default CertificatesSection;