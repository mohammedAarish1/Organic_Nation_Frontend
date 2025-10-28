import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
// import CouponCodeList from './couponCodeList/CouponCodeList';
import OtpLogin from "../pages/login-signup/OtpLogin";
import OtpVerification from "./auth/OtpVerification";
import { getAllCartItems, mergeCart } from "../features/cart/cart";
// import { verifyOTP } from '../features/auth/auth';
// import { toast } from 'react-toastify';
import NewCheckoutForm from "./checkout/NewCheckoutForm";
import { freeShippingEligibleAmt } from "../constants";
import { formatPrice } from "../helper/helperFunctions";
import FamilyCoupon from "./couponCodeList/FamilyCoupon";

import { X, ShoppingCart, ChevronDown } from "lucide-react";
// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

// const slideUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 400,
//       damping: 30
//     }
//   }
// };

// Accordion component for collapsible sections
const Accordion = ({ title, icon, isOpen, setIsOpen, children }) => {
  const IconComponent = icon;

  return (
    <div className="mb-4 text-gray-500">
      <button
        className="w-full flex justify-between items-center p-3.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium flex items-center">
          <IconComponent className="mr-2 text-[var(--accent-color)]" />
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                height: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  duration: 0.4,
                },
                opacity: { duration: 0.25 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.25 },
              },
            }}
            className="mt-3 bg-gray-50 rounded-lg overflow-hidden"
          >
            <motion.div
              className="p-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.1, duration: 0.2 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Single Cart Item Component
const CartItem = ({ item, index }) => {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { delay: 0.05 * index, duration: 0.3 },
      }}
      className="flex items-center mb-3 pb-3 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0"
    >
      <img
        src={
          Array.isArray(item.img)
            ? item.img.filter((path) => path.lg.includes("front"))[0].lg
            : null
        }
        alt="product image"
        className="w-16 h-16 object-cover rounded-lg mr-3 border border-gray-100 shadow-sm"
      />
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
      </div>
      <p className="font-medium">
        ₹{" "}
        {Math.round(
          (item.price - (item.price * item.discount) / 100) * item.quantity
        )}
      </p>
    </motion.div>
  );
};

// Coupon Item Component
// const CouponItem = ({ coupon, onApply, index }) => (
//   <motion.div
//     key={coupon.code}
//     initial={{ opacity: 0, y: 20, scale: 0.95 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     transition={{
//       delay: 0.1 * (index + 1),
//       duration: 0.5,
//       type: "spring",
//       stiffness: 400,
//       damping: 25
//     }}
//     whileHover={{
//       scale: 1.02,
//       boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
//       transition: { duration: 0.2 }
//     }}
//     className="border border-gray-200 rounded-lg p-3 bg-white"
//   >
//     <div className="flex justify-between mb-1">
//       <span className="font-bold text-blue-600">{coupon.code}</span>
//       <span className="text-green-600 font-medium">{coupon.discount}</span>
//     </div>
//     <p className="text-sm text-gray-500">{coupon.description}</p>
//     <motion.button
//       className="mt-2 w-full py-1.5 bg-blue-100 text-blue-600 rounded font-medium"
//       whileHover={{
//         backgroundColor: "rgba(37, 99, 235, 0.2)",
//         scale: 1.02
//       }}
//       whileTap={{ scale: 0.98 }}
//       onClick={() => onApply(coupon)}
//     >
//       Apply
//     </motion.button>
//   </motion.div>
// );

// // OTP Input component
// const OtpInput = ({ otpInputs, handleOtpChange, handleOtpKeyDown, handleOtpPaste }) => (
//   <div className="flex justify-center gap-3 mb-3">
//     {Array(4).fill(0).map((_, index) => (
//       <motion.div
//         key={index}
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: index * 0.15, duration: 0.3 }}
//       >
//         <input
//           ref={otpInputs[index]}
//           type="text"
//           maxLength={1}
//           className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//           onChange={(e) => handleOtpChange(index, e.target.value)}
//           onKeyDown={(e) => handleOtpKeyDown(e, index)}
//           onPaste={index === 0 ? handleOtpPaste : null}
//           inputMode="numeric"
//         />
//       </motion.div>
//     ))}
//   </div>
// );

// // Selection Button component
// const SelectionButton = ({ icon, label, selected, onClick }) => {
//   const IconComponent = icon;
//   return (
//     <button
//       type="button"
//       className={`flex-1 py-2.5 px-3 rounded-lg border flex items-center justify-center transition-all ${selected
//         ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
//         : 'border-gray-300 hover:border-gray-400'
//         }`}
//       onClick={onClick}
//     >
//       <IconComponent className="mr-2" /> {label}
//     </button>
//   );
// };

// // Payment Method Button component
// const PaymentMethodButton = ({ icon, label, selected, onClick, discount = null }) => {
//   const IconComponent = icon;
//   return (
//     <button
//       type="button"
//       className={`w-full p-3.5 rounded-lg border flex items-center justify-between relative transition-all ${selected
//         ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm'
//         : 'border-gray-300 hover:border-gray-400'
//         }`}
//       onClick={onClick}
//     >
//       <div className="flex items-center">
//         <IconComponent className={`mr-3 ${label.includes('Cash') ? 'text-green-600' : 'text-blue-600'}`} size={18} />
//         <span>{label}</span>
//       </div>
//       {discount && (
//         <motion.div
//           className="absolute right-0 top-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg flex items-center"
//           initial={{ scale: 1 }}
//           animate={{ scale: [1, 1.1, 1] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//         >
//           <FaPercent className="mr-1" size={10} />
//           {discount}
//         </motion.div>
//       )}
//     </button>
//   );
// };

// Button Component
// const Button = ({ children, onClick, type = 'button', disabled = false, className = '' }) => (
//   <motion.button
//     type={type}
//     onClick={onClick}
//     disabled={disabled}
//     className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3.5 rounded-lg hover:opacity-90 transition-all disabled:opacity-70 ${className}`}
//     whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
//     whileTap={{ scale: 0.98 }}
//   >
//     {children}
//   </motion.button>
// );

// Main CheckoutModal Component
const CheckoutModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  // const [addressType, setAddressType] = useState('Home');
  // const [paymentMethod, setPaymentMethod] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  // const otpInputs = Array(4).fill(0).map(() => useRef(null));

  const {
    cartItemsList,
    totalCartAmount,
    totalTax,
    couponCodeApplied,
    discountProgress,
  } = useSelector((state) => state.cart);
  const { checking, shippingFee } = useSelector((state) => state.delivery);

  const coupons = [
    { code: "BUY4PICKLES", description: "Get Any Four Pickles at Flat ₹999" },
    {
      code: "FOODSBAY5YEARS",
      description: "Get additional 10% off on all orders above ₹ 1299",
    },
  ];

  const getDataAfterLogin = () => {
    // dispatch(getAllOrders())
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (localCart.length > 0) {
      const cart = {
        items: localCart,
        totalCartAmount: totalCartAmount,
        totalTaxes: totalTax,
        couponCodeApplied: couponCodeApplied,
      };

      dispatch(mergeCart({ cart })).then(() => {
        // localStorage.removeItem("cart");
        setPhoneVerified(true);
        setStep(2);
        dispatch(getAllCartItems());
        // if (checkoutStatus) {
        //   navigate("/cart/checkout");
        // } else {
        //   navigate("/");
        // }
      });
    }
    //  else {
    //   navigate("/");
    // }
  };

  // Add this in the CheckoutModal component
  useEffect(() => {
    // If user is already logged in, skip to step 2
    if (user) {
      setPhoneVerified(true);
      setStep(2);
    }
  }, [user]);

  if (!isOpen) return null;

  // Order Summary Content
  const renderOrderSummary = () => (
    <>
      {cartItemsList.map((item, index) => (
        <CartItem key={item._id} item={item} index={index} />
      ))}

      <motion.div
        className="mt-4 pt-3 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.2, duration: 0.3 },
        }}
      >
        <div className="flex justify-between mb-1 text-sm">
          <span>Subtotal</span>
          <span>₹ {formatPrice(discountProgress.totalCartAmount)}</span>
        </div>
        <div className="flex justify-between mb-1 text-sm font-bold">
          <span>Less: Discount Applied ({discountProgress?.discountType})</span>
          <span>₹ {formatPrice(discountProgress?.discountAmount)}</span>
        </div>
        <div className="flex justify-between mb-1 text-sm">
          <span>Shipping</span>
          <span>
            ₹ {totalCartAmount < freeShippingEligibleAmt ? shippingFee : "FREE"}
          </span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>
            ₹{" "}
            {Math.round(
              totalCartAmount +
                (totalCartAmount < freeShippingEligibleAmt ? shippingFee : 0)
            )}
          </span>
        </div>
      </motion.div>
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop with separate animation */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            // onClick={onClose}
          />

          <motion.div
            id="checkout-popup"
            className="bg-white rounded-xl shadow-2xl w-full max-w-md md:max-w-lg relative z-10"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 30, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 1,
            }}
          >
            {/* Close button */}
            <div className="flex justify-end p-2">
              <motion.button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors hover:bg-gray-100 p-2 rounded-full"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(239, 246, 255, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-6 pb-4 border-b mb-4">
              <div className="flex items-center">
                <img
                  src="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
                  alt="Company Logo"
                  className="h-10"
                />
              </div>
              <div className="text-right">
                <p className="text-xl font-bold bg-[var(--text-color)] bg-clip-text text-transparent">
                  ₹{" "}
                  {Math.round(
                    totalCartAmount +
                      (totalCartAmount < freeShippingEligibleAmt
                        ? shippingFee
                        : 0)
                  )}
                  {/* ₹ {Math.round(totalCartAmount + (totalCartAmount < freeShippingEligibleAmt ? 0 : 0))} */}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 pb-6 max-h-[70vh] overflow-y-auto">
              {/* ======================================== Order Summary  ======================================= */}
              {user && <FamilyCoupon />}

              <Accordion
                title="Order Summary"
                icon={ShoppingCart}
                isOpen={orderSummaryOpen}
                setIsOpen={setOrderSummaryOpen}
              >
                {renderOrderSummary()}
              </Accordion>

              {/* =========================================== Coupon ============================================= */}
              {/* <Accordion
                title={appliedCoupon ? `Applied: ${appliedCoupon.code}` : 'Apply Coupon'}
                icon={FaTag}
                isOpen={couponOpen}
                setIsOpen={setCouponOpen}
              >
                <CouponCodeList
                  cartItems={cartItems}
                  totalCartAmount={totalCartAmount}
                  totalTax={totalTax}
                  couponCodeApplied={couponCodeApplied}
                />

              </Accordion> */}

              {/* Phone Verification */}
              <AnimatePresence mode="wait">
                {step === 1 && !phoneVerified && !showOtpInput && (
                  <motion.div
                    key="phone-form"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {/* {renderPhoneForm()} */}
                    <OtpLogin
                      isCheckout={true}
                      setShowOtpInput={setShowOtpInput}
                      setPhoneNumber={setPhoneNumber}
                    />
                  </motion.div>
                )}

                {step === 1 && showOtpInput && !phoneVerified && (
                  <motion.div
                    key="otp-verification"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {/* {renderOtpVerification()} */}
                    <OtpVerification
                      phoneNumber={phoneNumber}
                      showOtpInput={showOtpInput}
                      getDataAfterLogin={getDataAfterLogin}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="checkout-form"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {/* {renderCheckoutForm()} */}
                    <NewCheckoutForm close={onClose} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
