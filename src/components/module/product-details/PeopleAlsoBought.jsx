import { useEffect } from "react";
import { motion } from "framer-motion";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryWiseData } from "../../../features/filter/filterSlice";

import {
  ChevronRight,
  Star,
} from "lucide-react";
import AddToCartBtn from "../../add-to-cart-btn/AddToCartBtn";
import WishListBtn from "../../add-to-cart-btn/WishListBtn";

const PeopleAlsoBought = ({ categoryUrl }) => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state) => state.filterData);
  const { categoryBtnValue } = useSelector((state) => state.filterData);

  useEffect(() => {
    dispatch(fetchCategoryWiseData(categoryUrl));
  }, [categoryUrl, dispatch]);

  return (
    <div className="bg-white py-12 mt-16 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            You may also like
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1"
          >
            View All
            <ChevronRight size={20} />
          </motion.button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer group"
              onClick={()=>navigate(`/shop/${categoryBtnValue}/${item['name-url']}`)}
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={item.img[0].lg}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Tag Badge */}
                {item.tag && (
                  <motion.span
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded-full text-white ${
                      item.tag === "Bestseller"
                        ? "bg-purple-500"
                        : item.tag === "New"
                        ? "bg-blue-500"
                        : item.tag === "Hot Deal"
                        ? "bg-red-500"
                        : item.tag === "Top Rated"
                        ? "bg-green-500"
                        : "bg-orange-500"
                    }`}
                  >
                    {item.tag}
                  </motion.span>
                )}

                {/* Discount Badge */}
                <span className="absolute top-3 left-3 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                  {item.discount}% OFF
                  
                </span>
                <span className="absolute top-1 right-3  py-1  text-white text-xs font-bold rounded-full">
                  <WishListBtn productId={item["name-url"]} extraClasses='p-1' />
                </span>

                {/* Quick Actions */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <AddToCartBtn
                    item={item}
                    qty={1}
                    extraClasses="flex gap-1 py-1 sm:text-base text-xs w-full items-center justify-center z-30"
                  />
                  {/* <WishListBtn productId={item["name-url"]} extraClasses='p-1' /> */}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded">
                    <Star size={12} fill="#22C55E" color="#22C55E" />
                    <span className="text-xs font-semibold text-green-700">
                      {item.reviewsAndRating?.averageRating}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    ({item.reviewsAndRating?.totalReviews} reviews)
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {item.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{item.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Frequently Bought Together */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 sm:p-6 md:p-8"
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <Zap size={20} className="sm:w-6 sm:h-6 text-orange-500" />
            Frequently Bought Together
          </h3>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4">
            <div className="flex-1 overflow-x-auto">
              <div className="flex items-center gap-3 sm:gap-4 min-w-max lg:min-w-0 pb-2 lg:pb-0">
                <div className="flex items-center gap-3 bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow min-w-[200px] sm:min-w-[240px] lg:min-w-0 lg:flex-1">
                  <img
                    src={product.details.img[0].lg}
                    alt={product.details.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2">
                      {product.details.name}
                    </p>
                    <p className="text-orange-600 font-bold text-sm sm:text-base mt-1">
                      ₹{finalPrice}
                    </p>
                  </div>
                </div>

                <div className="text-xl sm:text-2xl font-bold text-gray-400 flex-shrink-0">
                  +
                </div>

                <div className="flex items-center gap-3 bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow min-w-[200px] sm:min-w-[240px] lg:min-w-0 lg:flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400"
                    alt="Raw Honey"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2">
                      Raw Honey - Pure
                    </p>
                    <p className="text-orange-600 font-bold text-sm sm:text-base mt-1">
                      ₹549
                    </p>
                  </div>
                </div>

                <div className="text-xl sm:text-2xl font-bold text-gray-400 flex-shrink-0">
                  +
                </div>

                <div className="flex items-center gap-3 bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow min-w-[200px] sm:min-w-[240px] lg:min-w-0 lg:flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400"
                    alt="Green Tea"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2">
                      Organic Green Tea
                    </p>
                    <p className="text-orange-600 font-bold text-sm sm:text-base mt-1">
                      ₹399
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 lg:hidden"></div>

            <div className="flex flex-col items-center gap-3 bg-white rounded-xl p-4 shadow-lg lg:shadow-md lg:min-w-[200px] xl:min-w-[240px]">
              <div className="text-center w-full">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">
                  Bundle Price
                </p>
                <div className="flex items-baseline justify-center gap-2 flex-wrap">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">
                    ₹{finalPrice + 549 + 399 - 200}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                    ₹{finalPrice + 549 + 399}
                  </span>
                </div>
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block text-green-600 text-xs sm:text-sm font-semibold mt-1"
                >
                  Save ₹200!
                </motion.span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[var(--themeColor)] hover:bg-orange-600 active:bg-orange-700 text-white font-semibold text-sm sm:text-base py-3 px-4 sm:px-6 rounded-xl transition-all shadow-md hover:shadow-lg touch-manipulation"
              >
                Add All to Cart
              </motion.button>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-3 lg:hidden">
            ← Swipe to see all products →
          </p>
        </motion.div> */}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
