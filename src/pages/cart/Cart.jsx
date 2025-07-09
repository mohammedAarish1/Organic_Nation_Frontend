import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiArrowRight, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Image from '../../components/image/Image';
import ProductQty from '../../components/productQty/ProductQty';
import { getAllCartItems, removeFromCart } from '../../features/cart/cart';
import CheckoutModal from '../../components/CheckoutModal';
import SubmitButton from '../../components/button/SubmitButton';
import CheckDeliveryAvailability from '../../components/module/cart/CheckDeliveryAvailability';
import CODEligibility from '../../components/module/cart/CODEligibility';
import FreeShippingAlert from '../../components/module/cart/FreeShippingAlert';
import { formatPrice } from '../../helper/helperFunctions';

// Demo product data
// const demoProducts = [
//   {
//     id: 1,
//     name: "Handcrafted Wooden Bowl",
//     price: 59.99,
//     image: "/api/placeholder/300/300",
//     quantity: 2,
//     inStock: 5
//   },
//   {
//     id: 2,
//     name: "Organic Cotton Throw Pillow",
//     price: 34.99,
//     image: "/api/placeholder/300/300",
//     quantity: 1,
//     inStock: 8
//   },
//   {
//     id: 3,
//     name: "Artisan Ceramic Mug Set",
//     price: 49.99,
//     image: "/api/placeholder/300/300",
//     quantity: 1,
//     inStock: 3
//   }
// ];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

const Cart = () => {
  const dispatch = useDispatch();
  // const [cartItems, setCartItems] = useState(demoProducts);
  // const [promoCode, setPromoCode] = useState('');
  // const [discountApplied, setDiscountApplied] = useState(false);
  // const [shippingMethod, setShippingMethod] = useState('standard');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { checking, shippingFee } = useSelector(state => state.delivery)

  const {
    cartItemsList,
    loading,
    totalCartAmount,
    totalTax,
    couponCodeApplied,
  } = useSelector((state) => state.cart);

  // Calculate order summary
  // const subtotal = cartItemsList.reduce((total, item) => total + (item.price * item.quantity), 0);
  // const discount = discountApplied ? subtotal * 0.1 : 0;
  // const shipping = shippingMethod === 'express' ? 12.99 : 4.99;
  // const tax = (subtotal - discount) * 0.07;
  // const total = subtotal - discount + shipping + tax;

  // Memoized calculations
  const MRPTotal = useMemo(() =>
    cartItemsList?.reduce((total, product) => (
      Math.round(total + product.price * product.quantity)
    ), 0) || 0
    , [cartItemsList]);


  // Handle quantity change
  // const updateQuantity = (id, newQuantity) => {
  //   if (newQuantity < 1) return;

  //   const updatedCart = cartItems.map(item => {
  //     if (item.id === id) {
  //       return {
  //         ...item,
  //         quantity: Math.min(newQuantity, item.inStock)
  //       };
  //     }
  //     return item;
  //   });

  //   setCartItems(updatedCart);
  // };

  // Remove item from cart
  // const removeItem = (id) => {
  //   const updatedCart = cartItems.filter(item => item.id !== id);
  //   setCartItems(updatedCart);
  // };

  // Apply promo code
  // const applyPromoCode = () => {
  //   if (promoCode.toLowerCase() === 'discount10') {
  //     setDiscountApplied(true);
  //   }
  // };

  // Move to wishlist (stub function)
  // const moveToWishlist = (id) => {
  //   // In a real app, this would move the item to wishlist
  //   removeItem(id);
  // };

  

  return (
    <div className="bg-[#F5EFE6] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] text-[#FFFFFF] py-4 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-xl md:text-2xl font-bold">Your Shopping Cart</h1>
          <p className="text-sm opacity-80">Review and modify your items before checkout</p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 mt-6">
        {/* Back to shopping link */}
        <Link
          to="/shop/all"
          className="flex items-center text-[#3E2C1B] mb-6 hover:text-[#7A2E1D] transition-colors"
        // whileHover={{ x: -5 }}
        >
          <FiArrowLeft className="mr-2" /> Continue Shopping
        </Link>

        {cartItemsList.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="flex justify-center mb-4">
              <FiShoppingBag className="w-16 h-16 text-[#DCD2C0]" />
            </div>
            <h2 className="text-2xl text-[#3E2C1B] font-semibold mb-2">Your cart is empty</h2>
            <p className="text-[#3E2C1B] opacity-70 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/shop/all"
              className="bg-[#7A2E1D] text-[#FFFFFF] px-8 py-3 rounded-md inline-block hover:bg-opacity-90 transition-colors"
            >
              Explore Products
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items section */}
            <motion.div
              className="lg:w-2/3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Header row (desktop only) */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-[#DCD2C0] bg-opacity-30 text-[#3E2C1B] font-medium">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                {/* Cart items */}
                {cartItemsList.map((item) => (
                  <motion.div
                    key={item._id}
                    className="border-b border-[#DCD2C0] last:border-b-0 p-4"
                    variants={itemVariants}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Product image and info */}
                      <div className="md:col-span-6">
                        <div className="flex items-center">
                          <div className="w-20 h-20 mr-4 rounded-md overflow-hidden bg-[#DCD2C0] bg-opacity-20 flex-shrink-0">
                            <Image
                              src={{
                                sm: Array.isArray(item.img) ? item.img.filter((path) => path.sm.includes("front"))[0].sm : null,
                                md: Array.isArray(item.img) ? item.img.filter((path) => path.md.includes("front"))[0].md : null,
                                lg: Array.isArray(item.img) ? item.img.filter((path) => path.lg.includes("front"))[0].lg : null,
                              }}
                              // blurSrc={leftImage.blur}
                              alt={item.name}
                              className="w-20 max-h-24 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#3E2C1B]">{item.name}</h3>
                            <div className="md:hidden mt-1 mb-2 text-[#3E2C1B] font-semibold space-x-2">
                              {item.discount > 0 ? (
                                <>
                                  <span className="text-lg font-semibold ">
                                    ₹{Math.round(item.price - (item.price * item.discount) / 100)}
                                  </span>
                                  <span className="line-through text-xs text-gray-500">
                                    ₹{item.price}
                                  </span>
                                </>
                              ) : (
                                <span className="text-lg font-semibold">₹{item.price}</span>
                              )}
                              {/* {item.discount > 0 && (
                          <span className="ml-2 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                            {item.discount}% OFF
                          </span>
                        )} */}
                            </div>
                            <div className="flex mt-2 space-x-3 text-sm">
                              <button
                                onClick={() => {
                                  dispatch(removeFromCart(item['name-url'])).then(() =>
                                    dispatch(getAllCartItems())
                                  );
                                }}
                                className="flex items-center text-[#D87C45] hover:text-[#7A2E1D] transition-colors"
                              >
                                <FiTrash2 className="mr-1" /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price (desktop) */}
                      {/* <div className="hidden md:flex md:col-span-2 items-center justify-center text-[#3E2C1B]">
                        {item.discount > 0 && Math.round(item.price - (item.price * item.discount) / 100)}  <span className={`${item.discount > 0 && 'line-through text-xs'}`}>₹{item.price}</span>
                      </div> */}

                      <div className="hidden md:flex md:col-span-2 items-center justify-center text-[#3E2C1B] space-x-2">
                        {item.discount > 0 ? (
                          <>
                            <span className="text-lg font-semibold ">
                              ₹{Math.round(item.price - (item.price * item.discount) / 100)}
                            </span>
                            <span className="line-through text-xs text-gray-500">
                              ₹{item.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-semibold">₹{item.price}</span>
                        )}
                        {/* {item.discount > 0 && (
                          <span className="ml-2 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">
                            {item.discount}% OFF
                          </span>
                        )} */}
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-start md:justify-center">
                        <ProductQty
                          curItem={item}
                        />
                        {item.quantity >= item.availability && (
                          <span className="text-xs text-[#D87C45] ml-2 mt-2">
                            Max quantity
                          </span>
                        )}
                      </div>


                      {/* Subtotal */}
                      <div className="md:col-span-2 flex items-center justify-end md:text-right text-[#3E2C1B] font-semibold">
                        {/* ₹{item.discount > 0 ? formatPrice(item.price - (item.price * item.discount) / 100) * item.quantity : formatPrice(item.price * item.quantity)} */}
                        ₹{formatPrice(item.discount > 0 ? (item.price - (item.price * item.discount) / 100) * item.quantity : (item.price * item.quantity))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Order summary section */}
            <motion.div
              className="lg:w-1/3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-[#3E2C1B] mb-4">Order Summary</h2>

                {/* Check Delivery Availability */}
                {/* <CheckDeliveryAvailability /> */}

                {/* COD Eligibility */}
                {totalCartAmount < 399 && totalCartAmount > 0 && (
                  <CODEligibility />
                )}

                {/* Free Shipping Alert */}
                {totalCartAmount < 499 && totalCartAmount > 0 && (
                  <FreeShippingAlert totalCartAmount={totalCartAmount} />
                )}



                {/* Promo code */}
                {/* <div className="mb-6">
                  <div className="flex">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code"
                      className="flex-grow px-3 py-2 bg-[#F5EFE6] border border-[#DCD2C0] rounded-l-md text-[#3E2C1B] placeholder-[#3E2C1B] placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-[#9B7A2F]"
                    />
                    <motion.button
                      onClick={applyPromoCode}
                      className="bg-[#9B7A2F] text-[#FFFFFF] px-4 py-2 rounded-r-md"
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply
                    </motion.button>
                  </div>
                  {discountApplied && (
                    <p className="text-[#6B8E23] text-sm mt-2">Promo code applied: 10% off</p>
                  )}
                  <p className="text-xs text-[#3E2C1B] opacity-70 mt-2">
                    Try code: "DISCOUNT10" for 10% off
                  </p>
                </div> */}

                {/* Shipping options */}
                {/* <div className="mb-6">
                  <h3 className="text-sm font-medium text-[#3E2C1B] mb-3">Shipping</h3>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="form-radio text-[#7A2E1D] focus:ring-[#7A2E1D]"
                      />
                      <span className="ml-2 text-[#3E2C1B] text-sm">Standard Shipping - ₹4.99</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="form-radio text-[#7A2E1D] focus:ring-[#7A2E1D]"
                      />
                      <span className="ml-2 text-[#3E2C1B] text-sm">Express Shipping - ₹12.99</span>
                    </label>
                  </div>
                </div> */}

                {/* Order calculations */}
                <div className="border-t border-[#DCD2C0] pt-4 mb-6">
                  <div className="flex justify-between py-2">
                    <span className="text-[#3E2C1B]">Subtotal</span>
                    <span className="text-[#3E2C1B] font-medium">₹{formatPrice(totalCartAmount)}</span>
                  </div>
                  {/* {discountApplied && (
                    <div className="flex justify-between py-2">
                      <span className="text-[#6B8E23]">Discount (10%)</span>
                      <span className="text-[#6B8E23]">-₹{formatPrice(discount)}</span>
                    </div>
                  )} */}
                  <div className="flex justify-between py-2">
                    <span className="text-[#3E2C1B]">Shipping</span>
                    <span className="text-[#3E2C1B]">₹{formatPrice(shippingFee)}</span>
                  </div>
                  {/* <div className="flex justify-between py-2">
                    <span className="text-[#3E2C1B]">Estimated Tax</span>
                    <span className="text-[#3E2C1B]">₹{formatPrice(tax)}</span>
                  </div> */}
                  <div className="flex justify-between py-3 text-lg font-semibold border-t border-[#DCD2C0] mt-2">
                    <span className="text-[#3E2C1B]">Total</span>
                    <span className="text-[#7A2E1D]">₹{formatPrice(totalCartAmount)}</span>
                  </div>
                </div>
                {/* Checkout button */}
                {/* <motion.button
                  className="w-full bg-[#7A2E1D] text-[#FFFFFF] py-3 rounded-md font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsCheckoutOpen(true)}
                >
                Proceed to Checkout
                  <FiArrowRight className="ml-2" />
                </motion.button> */}

                <SubmitButton text='Proceed to Checkout' action={() => setIsCheckoutOpen(true)} />

                {/* Additional info */}
                <div className="mt-6 text-xs text-[#3E2C1B] opacity-70">
                  <p>*Shipping will be calculated  on next step based on delivery address.</p>
                  {/* <p>Shipping calculated based on delivery address.</p> */}
                  {/* <p className="mt-1">Taxes calculated based on applicable state and local laws.</p> */}
                </div>
              </div>

              {/* Payment methods */}
              <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-[#3E2C1B] mb-2">Accepted Payment Methods</h3>
                <div className="flex space-x-2 mt-2">
                  {["Debit Card", "Credit Card", "UPI",].map((method) => (
                    <div key={method} className="px-2 py-1 bg-[#DCD2C0] text-xs rounded text-[#3E2C1B]">
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

    </div>
  );
}


export default Cart;