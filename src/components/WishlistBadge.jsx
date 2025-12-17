// components/WishlistBadge.jsx
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../contexts/WishlistContext';
import { useSelector } from 'react-redux';

const WishlistBadge = () => {
   const { items: wishlist } = useSelector(state => state.wishlist);
  const wishlistCount = wishlist.length;

  return (
    <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
      <Heart size={24} className="text-gray-700" />
      <AnimatePresence>
        {wishlistCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {wishlistCount > 99 ? '99+' : wishlistCount}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default WishlistBadge;