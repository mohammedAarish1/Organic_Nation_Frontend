import { useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaShieldAlt, FaStar, FaLeaf } from 'react-icons/fa';


const Image = memo(({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleLoad = useCallback(() => setIsLoaded(true), []);

  return (
      <img
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          loading="lazy"
      />
  );
});

const BetterImagesSection = memo(({ images }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Optimize with useCallback to prevent unnecessary re-renders
  const setVisibility = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Use requestAnimationFrame for smoother animation timing
    const frameId = requestAnimationFrame(() => {
      const timer = setTimeout(setVisibility, 300);
      return () => clearTimeout(timer);
    });
    return () => cancelAnimationFrame(frameId);
  }, [setVisibility]);

  // Memoized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 14
      }
    }
  };

  // Memoized TrustBadge component
  const TrustBadge = memo(({ type }) => {
    const badges = {
      'quality': { 
        icon: <FaCheckCircle className="text-green-600" />, 
        text: 'Premium Quality' 
      },
      'eco': { 
        icon: <FaLeaf className="text-green-500" />, 
        text: 'Eco Friendly' 
      },
      'trusted': { 
        icon: <FaShieldAlt style={{ color: 'var(--accent-color)' }} />, 
        text: 'Trusted' 
      },
      'rated': { 
        icon: <FaStar style={{ color: 'var(--alert-color)' }} />, 
        text: 'Top Rated' 
      }
    };
    
    const badge = badges[type] || badges.quality;
    
    return (
      <div className="flex items-center gap-1 text-xs font-medium py-1 px-3 rounded-full shadow-sm" 
           style={{ 
             backgroundColor: 'var(--neutral-color)', 
             color: 'var(--text-color)'
           }}>
        {badge.icon}
        <span>{badge.text}</span>
      </div>
    );
  });

  // Custom Image component is already imported from the user's code

  return (
    <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8" 
        //  style={{ background: 'var(--background-color)' }}
         >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4" 
              style={{ color: 'var(--themeColor)' }}>
            Why Choose Our Products
          </h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ backgroundColor: 'var(--accent-color)' }}></div>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-color)' }}>
            Crafted with care, our products combine tradition with innovation for unmatched quality
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative z-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {images.map((item, index) => (
              <motion.div 
                key={item.img} 
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.2 } 
                }}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-5 sm:p-6 h-full flex flex-col">
                  <div className="relative mb-4 flex-shrink-0">
                    <div className="absolute -right-2 -top-2 z-10">
                      <TrustBadge 
                        type={['quality', 'eco', 'trusted', 'rated'][index % 4]} 
                      />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center h-32 overflow-hidden"
                         style={{ backgroundColor: 'var(--neutral-color)', opacity: 0.7 }}>
                      <Image
                        src={item.img}
                        alt={item.text}
                        className="w-20 sm:w-24 h-auto object-contain transition-all duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg mb-2 text-center" 
                        style={{ color: 'var(--themeColor)' }}>
                      {item.text}
                    </h3>
                    <p className="text-sm text-center" style={{ color: 'var(--text-color)' }}>
                      {item.description || "Experience the craftsmanship that sets our products apart."}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* Decorative elements */}
        {/* <div className="hidden md:block absolute top-0 right-0 w-32 h-32 opacity-10" 
             style={{ backgroundColor: 'var(--accent-color)', borderRadius: '50%' }}></div>
        <div className="hidden md:block absolute bottom-0 left-0 w-24 h-24 opacity-10" 
             style={{ backgroundColor: 'var(--themeColor)', borderRadius: '50%' }}></div> */}
      </div>
    </div>
  );
});

export default BetterImagesSection;