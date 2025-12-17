import { useSelector, useDispatch } from "react-redux";

import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  fetchWishlist,
  toggleWishlistItem,
} from "../../features/wishlistSlice";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

const WishListBtn = ({ productId,extraClasses='p-4' }) => {
  const dispatch = useDispatch();

  // Get user authentication state (adjust based on your auth implementation)
  const {  user } = useSelector((state) => state.auth); // or however you store auth
  const { items: wishlist, loading: wishlistLoading } = useSelector(
    (state) => state.wishlist
  );

  // ... rest of your existing state

  // Check if current product is in wishlist
  const isInWishlist = wishlist.some(
    (nameUrl) => nameUrl === productId
  );
  // Fetch wishlist when user is authenticated
  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist());
    }
  }, [user, dispatch]);

  // Handle wishlist toggle
  const handleWishlistToggle = async (e) => {
      e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add items to wishlist");
      // Optional: Redirect to login
      // navigate('/login');
      return;
    }

    try {
      await dispatch(
        toggleWishlistItem({
          productId,
          isInWishlist,
        })
      ).unwrap();

      // Refetch to get updated list with full product details
      // dispatch(fetchWishlist());

      toast.success(
        isInWishlist ? "Removed from wishlist" : "Added to wishlist"
      );
    } catch (error) {
      toast.error(error || "Failed to update wishlist");
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
         onClick={handleWishlistToggle}
          disabled={wishlistLoading}
        className={`${extraClasses} border-2 border-gray-300 rounded-xl hover:border-red-500 active:border-red-600 transition-all flex items-center justify-center touch-manipulation`}
         aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          size={24}
          fill={isInWishlist ? "#EF4444" : "none"}
          color={isInWishlist ? "#EF4444" : "#6B7280"}
        />
      </motion.button>
    </>
  );
};

export default WishListBtn;
