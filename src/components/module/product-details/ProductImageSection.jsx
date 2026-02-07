import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { memo } from 'react';

const ProductImageSection = memo(({
product,
selectedImage,
setSelectedImage,
setIsFullScreen,
setFullScreenImages,
setFullScreenIndex,
nextImage,
prevImage
}) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };
  return (
     <motion.div variants={itemVariants} className="space-y-6">
              {/* Main Image */}
              <div className="relative">
                <motion.div
                  className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                  style={{ backgroundColor: "#FFFFFF" }}
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  // onClick={() => setIsFullScreen(true)}
                  onClick={() => {
                    setFullScreenImages(
                      product.img.map((img) => img.lg)
                    );
                    setFullScreenIndex(selectedImage);
                    setIsFullScreen(true);
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImage}
                      src={product.img[selectedImage].lg}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                  {/* Navigation Arrows */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hidden sm:flex"
                    style={{ backgroundColor: "#F5EFE6", color: "#7A2E1D" }}
                  >
                    <ChevronLeft />
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hidden sm:flex"
                    style={{ backgroundColor: "#F5EFE6", color: "#7A2E1D" }}
                  >
                    <ChevronRight />
                  </motion.button>

                  {/* Image Counter */}
                  <div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:px-4 px-2 sm:py-2 py-1 rounded-full text-white sm:text-sm text-[11px] font-semibold"
                    style={{ backgroundColor: "rgba(122, 46, 29, 0.8)" }}
                  >
                    {selectedImage + 1} / {product.img.length}
                  </div>
                </motion.div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex space-x-4 overflow-x-auto p-2 scrollbar-hide">
                {product.img.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      // setImageLoading(true);
                      setSelectedImage(index);
                      // setTimeout(() => setImageLoading(false), 100);
                    }}
                    className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-3 transition-all duration-300 ${
                      selectedImage === index
                        ? "ring-4 shadow-xl transform scale-105"
                        : "hover:scale-110 shadow-md"
                    }`}
                    style={{
                      borderColor:
                        selectedImage === index ? "#9B7A2F" : "#DCD2C0",
                      ringColor:
                        selectedImage === index ? "#9B7A2F" : "transparent",
                    }}
                  >
                    <img
                      src={image.lg}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
  )
})

export default ProductImageSection
