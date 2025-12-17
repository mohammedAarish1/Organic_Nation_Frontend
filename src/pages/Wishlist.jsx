// pages/Wishlist.jsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, Trash2, User, X } from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion'
import { clearWishlist, fetchWishlist, toggleWishlistItem } from '../features/wishlistSlice';

import Product from '../components/product/Product';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { wishlistProducts, loading } = useSelector(state => state.wishlist);
 const [showClearModal, setShowClearModal] = useState(false);


  useEffect(() => {
    if (user) {
      dispatch(fetchWishlist());
    }
  }, [user, dispatch]);



  const handleRemove = async (productId) => {
    try {
      await dispatch(toggleWishlistItem({
        productId,
        isInWishlist: true
      })).unwrap();
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleClearAll = async () => {
    try {
      await dispatch(clearWishlist()).unwrap();
      toast.success('Wishlist cleared');
      setShowClearModal(false);
    } catch (error) {
      toast.error('Failed to clear wishlist');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">
      <div className="loader"></div>
    </div>;
  }
  if(!user){
      return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
          <p className="text-gray-600 mb-6">Please log in to see your wish list.</p>
          
          
          <Link
          to='/register'
            className="bg-green-500 w-full text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2"
          >
            <User className="w-5 h-5" /> {/* Lucide User Icon */}
            Log In
          </Link>
        </div>
      </div>
    );
  }

  if (wishlistProducts?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={48} className="text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Start adding items you love to your wishlist and shop them later!
          </p>
          <Link
            to="/shop/all"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8">
        
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-1">{wishlistProducts?.length} items</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowClearModal(true)}
            className="px-4 py-2 border-2 border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <Trash2 size={18} />
            Clear All
          </motion.button>
        </div>

        {/* Wishlist Grid */}
        <div className="flex gap-3 flex-wrap justify-center">
          
            {wishlistProducts?.map((item) => {
            //   const finalPrice = calculateFinalPrice(item.price, item.discount);
              
              return (
                <div className='relative max-w-max'>

                <Product gridView={true} product={item}/>
                     {/* Remove Button */}
                   <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemove(item['name-url'])}
                    className="absolute -top-3 -right-1 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                  >
                    <X size={18} className="text-red-500" />
                  </motion.button>
                </div>
              );
            })}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link
            to="/shop/all"
            className="inline-block border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Clear All Confirmation Modal */}
      <AnimatePresence>
        {showClearModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowClearModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Clear Wishlist?
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove all items from your wishlist? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleClearAll();
                    setShowClearModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wishlist;