import { Share2 } from "lucide-react";
import { motion } from "framer-motion";
import ShareModal from "../product-share/ShareModal";
import { useState } from "react";
import { useShare } from "../../hooks/useShare";

const ShareBtn = ({ product, className = "py-4 px-5" }) => {
  const { shareProduct, isSharing } = useShare();
  const [showShareModal, setShowShareModal] = useState(false);
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        // onClick={() => shareProduct(product)}
        onClick={() => setShowShareModal(true)}
        disabled={isSharing}
        className={` border-2 border-gray-300 rounded-xl hover:border-orange-500 active:border-orange-600 transition-all flex gap-2 items-center justify-center touch-manipulation ${className}`}
        aria-label="Share product"
      >
        <Share2 size={20} color="#6B7280" />
        <span className="text-sm sm:hidden font-medium text-gray-700">Share</span>
      </motion.button>
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        product={product.details}
      />
    </>
  );
};

export default ShareBtn;
