import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, XIcon, Mail } from 'lucide-react';
import { FacebookIcon, LinkedInIcon, WhatsAppIcon } from '../../icons/SvgIcons';

const ShareModal = ({ isOpen, onClose, product }) => {
  const [copied, setCopied] = useState(false);
  
  if (!product) return null;

  const productUrl = window.location.href;
  const finalPrice = Math.round(product.price - (product.price * product.discount) / 100);
  const shareText = `Check out ${product.name} - ₹${finalPrice}`;
  const encodedUrl = encodeURIComponent(productUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: <WhatsAppIcon/>,
      color: '#25D366',
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon color="#1877F2" />,
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Twitter',
      icon: <XIcon color='#000' />,
      color: '#1DA1F2',
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon color="#0A66C2" />,
      color: '#0A66C2',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: <Mail color='black' size={28} />,
      color: '#EA4335',
      url: `mailto:?subject=${encodeURIComponent(product.name)}&body=${encodedText}%20${encodedUrl}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleShareClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Share Product</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Product Preview */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-6">
              <img
                src={product.img?.[0]?.lg || product.img}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 line-clamp-1 text-sm">
                  {product.name}
                </h4>
                <p className="text-orange-600 font-bold">₹{finalPrice}</p>
              </div>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              {shareLinks.map((platform) => (
                <motion.button
                  key={platform.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShareClick(platform.url)}
                  className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                  >
                   { platform.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {platform.name}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Copy Link */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={productUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-100 rounded-lg text-sm text-gray-700 truncate"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyLink}
                className={`px-4 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
