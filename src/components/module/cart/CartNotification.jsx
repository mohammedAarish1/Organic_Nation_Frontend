import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCartNotification } from "../../../context/CartNotificationContext";
import Image from "../../image/Image";
import { getAllCartItems, removeFromCart } from "../../../features/cart/cart";
import ProductQty from "../../productQty/ProductQty";
import CheckoutModal from "../../CheckoutModal";
import CloseButton from "../../button/CloseButton";
import { formatPrice } from "../../../helper/helperFunctions";
import { ArrowRight, CheckCircle, ShoppingCart, Trash } from "lucide-react";
// import SubmitButton from "../../button/SubmitButton";

const CartNotification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItemsList, totalCartAmount, lastAddedItem, discountProgress } =
    useSelector((state) => state.cart);
  const { isCartNotificationVisible, hideCartNotification } =
    useCartNotification();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Calculate total price
  const totalPrice = cartItemsList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // // Handle quantity update
  // const handleUpdateQuantity = useCallback((itemId, newQuantity) => {
  //   dispatch(updateCartItem({ productId: itemId, quantity: newQuantity }))
  //     .then(() => dispatch(getAllCartItems()));
  // }, [dispatch]);

  // // Handle item removal
  const handleRemoveItem = useCallback(
    (nameUrl) => {
      dispatch(removeFromCart(nameUrl)).then(() => dispatch(getAllCartItems()));
    },
    [dispatch]
  );

  // // Handle navigation to cart page
  const handleViewCart = useCallback(() => {
    hideCartNotification();
    navigate("/cart");
  }, [hideCartNotification, navigate]);

  // // Handle navigation to checkout
  const handleCheckout = useCallback(() => {
    hideCartNotification();
    setIsCheckoutOpen(true);
  }, [hideCartNotification, navigate]);

  // Animation variants for mobile (bottom) and desktop (right)
  const mobileVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      y: "100%",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  const desktopVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: "100%",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };

  // Animation for items in cart
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      <AnimatePresence>
        {isCartNotificationVisible && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-60 z-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={hideCartNotification}
            />

            {/* Cart Notification Panel */}
            <motion.div
              id="cart-notification-popup"
              className={`fixed z-50 flex flex-col shadow-2xl ${
                isMobile
                  ? "bottom-0 left-0 right-0 rounded-t-3xl max-h-[80vh]"
                  : "top-0 right-0 bottom-0 w-full max-w-md rounded-l-2xl"
              }`}
              variants={isMobile ? mobileVariants : desktopVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                backgroundColor: "var(--background-color)",
                color: "var(--text-color)",
                boxShadow: "0 0 25px rgba(0,0,0,0.15)",
              }}
            >
              {/* Header */}
              <div
                className="p-5 border-b"
                style={{
                  borderColor: "var(--neutral-color)",
                  background:
                    "linear-gradient(to right, var(--background-color), var(--neutral-color))",
                }}
              >
                <motion.div
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--themeColor)",
                        color: "var(--text-light-color)",
                      }}
                    >
                      <ShoppingCart size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Your Cart</h3>
                      <p className="text-sm opacity-75">
                        {cartItemsList.length > 0
                          ? `${cartItemsList.reduce(
                              (total, item) => total + item.quantity,
                              0
                            )} items added`
                          : "No items added"}
                      </p>
                    </div>
                  </div>
                  <CloseButton action={hideCartNotification} />
                </motion.div>

                {lastAddedItem && (
                  <motion.div
                    className="mt-3 flex items-center gap-2 text-sm px-3 py-2 rounded-full w-fit"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      backgroundColor: "var(--themeColor)",
                      color: "var(--text-light-color)",
                    }}
                  >
                    <CheckCircle size={16} />
                    <span>"{lastAddedItem.name}" was added to your cart</span>
                  </motion.div>
                )}
              </div>

              {/* Cart Items List - Scrollable Section */}
              <div
                className="flex-1 overflow-y-auto p-4 pb-60"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "var(--themeColor) var(--neutral-color)",
                }}
              >
                {cartItemsList.length === 0 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center h-48 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: "var(--neutral-color)" }}
                    >
                      <ShoppingCart
                        size={20}
                        style={{ color: "var(--themeColor)" }}
                      />
                    </div>
                    <p className="font-medium text-lg">Your cart is empty</p>
                    <p className="text-sm opacity-75 mt-1 max-w-xs">
                      Add items to your cart to see them here
                    </p>
                  </motion.div>
                ) : (
                  <ul className="space-y-4">
                    {cartItemsList.map((item, index) => (
                      <motion.li
                        key={item._id}
                        custom={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex gap-3 p-3 rounded-xl relative group"
                        style={{
                          backgroundColor:
                            index % 2 === 0
                              ? "rgba(220, 210, 192, 0.3)"
                              : "rgba(220, 210, 192, 0.15)",
                          borderLeft: "3px solid var(--themeColor)",
                        }}
                      >
                        {item.discount > 0 && (
                          <div className="absolute top-4 left-4 px-2 py-1 bg-red-500 text-white text-sm font-semibold rounded z-20">
                            {item.discount}% OFF
                          </div>
                        )}

                        {/* Item Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex items-center justify-center shadow-md">
                          {item.img ? (
                            // <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            <Image
                              src={{
                                sm: Array.isArray(item.img)
                                  ? item.img.filter((path) =>
                                      path.sm.includes("front")
                                    )[0].sm
                                  : null,
                                md: Array.isArray(item.img)
                                  ? item.img.filter((path) =>
                                      path.md.includes("front")
                                    )[0].md
                                  : null,
                                lg: Array.isArray(item.img)
                                  ? item.img.filter((path) =>
                                      path.lg.includes("front")
                                    )[0].lg
                                  : null,
                              }}
                              // blurSrc={leftImage.blur}
                              alt={item.name}
                              className="w-20 max-h-24 object-contain"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{
                                backgroundColor: "var(--neutral-color)",
                              }}
                            >
                              <ShoppingCart
                                className="text-xl"
                                style={{ color: "var(--themeColor)" }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          {/* <p className="text-sm opacity-75 mt-0.5">{item.description || "Product Description"}</p> */}

                          <div className="flex justify-between items-center mt-2">
                            {/* Quantity controls */}

                            <ProductQty curItem={item} />
                            {/* Price */}
                            <div
                              className="font-semibold"
                              style={{ color: "var(--themeColor)" }}
                            >
                              {/* ₹ {(item.price * item.quantity).toFixed(2)} */}
                              ₹
                              {formatPrice(
                                item.discount > 0
                                  ? (item.price -
                                      (item.price * item.discount) / 100) *
                                      item.quantity
                                  : item.price * item.quantity
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Remove button (appears on hover/touch) */}
                        <motion.button
                          onClick={() => handleRemoveItem(item["name-url"])}
                          className="absolute -right-2 -top-2 w-7 h-7 rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            backgroundColor: "var(--alert-color)",
                            color: "var(--text-light-color)",
                          }}
                        >
                          <Trash size={16} />
                        </motion.button>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Fixed Footer with Cart Summary and Buttons */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 border-t z-20"
                style={{
                  backgroundColor: "var(--background-color)",
                  borderColor: "var(--neutral-color)",
                  boxShadow: "0 -4px 10px rgba(0,0,0,0.03)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {/* Cart Summary */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm opacity-75">Subtotal:</span>
                    <span>
                      ₹ {discountProgress.totalCartAmount?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm opacity-75">
                      Discount Applied ({discountProgress.discountType}):
                    </span>
                    <span>₹ {discountProgress.discountAmount?.toFixed(2)}</span>
                  </div>
                  {discountProgress.progressInfo?.nextThreshold && (
                    <div className="flex justify-between items-center mb-1 text-[var(--themeColor)] font-bold">
                      <span className="text-sm opacity-75">
                        You are just ₹
                        {Math.round(
                          discountProgress.progressInfo?.nextThreshold -
                            (discountProgress.progressInfo?.nextThreshold ===
                            1999
                              ? discountProgress.progressInfo.currentCartAmount
                              : discountProgress.progressInfo
                                  ?.currentEligibleAmount)
                        )}{" "}
                        away from FLAT{" "}
                        {discountProgress.progressInfo?.nextDiscountType}:
                      </span>
                    </div>
                  )}

                  <div
                    className="h-px w-full my-2"
                    style={{ backgroundColor: "var(--neutral-color)" }}
                  ></div>

                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total:</span>
                    <span
                      className="font-bold text-xl"
                      style={{ color: "var(--themeColor)" }}
                    >
                      ₹ {Math.round(totalCartAmount)}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="viewCartBtn"
                    onClick={handleViewCart}
                    className="py-3 px-4 rounded-xl font-medium text-center transition-all hover:shadow-md"
                    style={{
                      backgroundColor: "var(--neutral-color)",
                      color: "var(--themeColor)",
                      borderLeft: "3px solid var(--themeColor)",
                    }}
                  >
                    View Cart
                  </button>
                  {/* <SubmitButton id='checkoutBtn' text='Checkout' action={handleCheckout} /> */}

                  <motion.button
                    id="checkoutBtn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="py-3 px-4 rounded-xl font-medium text-center flex items-center justify-center gap-2 shadow-md"
                    style={{
                      backgroundColor: "var(--themeColor)",
                      color: "var(--text-light-color)",
                    }}
                    disabled={cartItemsList.length === 0}
                  >
                    <span>Checkout</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};

export default CartNotification;
