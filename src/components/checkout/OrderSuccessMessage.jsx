import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../features/cart/cart";
import { initiatePayment } from "../../features/orderPayment/payment";
import {
  Archive,
  ArrowRight,
  Check,
  CircleX,
  Clock,
  MapPin,
  ShoppingBag,
  Truck,
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

// Helper functions
const formatAddress = ({ address, city, state, pinCode }) => {
  return `${address}, ${city}, ${state} - ${pinCode}`;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const getEstimatedDeliveryDate = (createdAt) => {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + 4);
  return date.toDateString();
};

// Constants
const CONFETTI_DURATION = 3000;
const CONFETTI_COLORS = ["#5B21B6", "#2563EB", "#10B981"];

const OrderSuccessMessage = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  // const { orderId: paramOrderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // Get URL parameters for payment status
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("status");
  // const urlOrderId = urlParams.get("orderId");
  const retryToken = urlParams.get("retryToken");
  const urlError = urlParams.get("error");

  // Determine which orderId to use
  // const orderId = paramOrderId || urlOrderId;
  const orderId = sessionStorage.getItem("newOrderId");
  // Set payment status based on URL
  useEffect(() => {
    if (status === "success") {
      setOrderStatus("success");
    } else if (status === "failure") {
      setOrderStatus("failure");
    } else if (urlError) {
      setOrderStatus("error");
    } else {
      // Default to success for COD orders or direct page access
      setOrderStatus("success");
    }
  }, [status, urlError]);

  useEffect(() => {
    const getOrderDetails = async () => {
      if (!orderId) {
        navigate("/", { replace: true });
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`${apiUrl}/api/orders/${orderId}`);
        if (response.data) {
          setOrderDetails(response.data);
          sessionStorage.removeItem('newOrderId');
        }
      } catch (err) {
        setError("Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    };

     if (orderId) {
      getOrderDetails();
    }

  }, [orderId,apiUrl]);

  // Fetch order data
  // useEffect(() => {
  //   const getOrderDetails = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get(`${apiUrl}/api/orders/${orderId}`);
  //       if (response.data) {
  //         setOrderDetails(response.data);
  //       }
  //     } catch (err) {
  //       setError("Failed to load order details");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (orderId) {
  //     getOrderDetails();
  //   }
  // }, [orderId, apiUrl]);

  // Handle retry payment logic
  const handleRetryPayment = () => {
    if (retryToken) {
      dispatch(
        initiatePayment({
          retryToken,
        })
      );
    }
  };

  // Handle confetti effect for successful payments
  useEffect(() => {
    if (!orderDetails || orderStatus !== "confirmed" || !showConfetti) return;

    const end = Date.now() + CONFETTI_DURATION;

    // Multiple confetti bursts
    const runConfetti = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 70,
        origin: { x: 0.2, y: 0.6 },
        colors: CONFETTI_COLORS,
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 70,
        origin: { x: 0.8, y: 0.6 },
        colors: CONFETTI_COLORS,
      });

      // Add middle burst for mobile
      confetti({
        particleCount: 2,
        startVelocity: 30,
        angle: 90,
        spread: 45,
        origin: { x: 0.5, y: 0.5 },
        colors: CONFETTI_COLORS,
      });

      if (Date.now() < end) {
        requestAnimationFrame(runConfetti);
      }
    };

    runConfetti();

    // Cleanup timer
    const timer = setTimeout(() => setShowConfetti(false), CONFETTI_DURATION);
    return () => clearTimeout(timer);
  }, [orderDetails, showConfetti, orderStatus]);

  // FB Pixel tracking for successful payments
  useEffect(() => {
    if (orderStatus === "confirmed" && orderDetails) {
      // Clear cart after successful payment
      dispatch(clearCart());

      // FB Pixel tracking for purchase event
      // const purchaseValue = orderDetails.subTotal + orderDetails.shippingFee;
      // const currency = 'INR';

      // if (window.fbq) {
      //     window.fbq('track', 'Purchase', {
      //         value: purchaseValue,
      //         currency: currency,
      //     });
      // }
    }
  }, [orderStatus, orderDetails, dispatch]);

  // Create order stages based on current status
  const orderStages = useMemo(() => {
    if (!orderDetails) return [];

    const status = orderDetails.orderStatus || "active";

    return [
      {
        name: "Order Placed",
        icon: Check,
        complete: true,
      },
      {
        name: "Processing",
        icon: Archive,
        complete: true,
      },
      {
        name: "Dispatched",
        icon: Truck,
        complete: status === "dispatched" || status === "completed",
      },
      {
        name: "Delivered",
        icon: ShoppingBag,
        complete: status === "completed",
      },
    ];
  }, [orderDetails]);

  // Calculate progress percentage for timeline
  const progressPercentage = useMemo(() => {
    if (!orderStages.length) return 0;
    const completedStages = orderStages.filter(
      (stage) => stage.complete
    ).length;
    return ((completedStages - 0.5) / (orderStages.length - 1)) * 100;
  }, [orderStages]);

  // Loading state with animation
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Error state with improved UI
  if (error && orderStatus !== "error" && orderStatus !== "failure") {
    return (
      <div
        id="payment-error-popup"
        className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 p-4"
      >
        <div className="text-center p-6 max-w-md bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || "We couldn't find the order details you're looking for."}
          </p>
          <button
            id="returnHome"
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  // Payment failed UI - Using the same styled modal for consistency
  if (orderStatus === "failure" || orderStatus === "error") {
    return (
      <AnimatePresence>
        <motion.div
          id="payment-failure-popup"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Enhanced backdrop with subtle blur */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-black/60 to-red-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Payment failed modal */}
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md md:max-w-lg relative z-10 overflow-hidden my-6 sm:my-8 flex flex-col max-h-[90vh]"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 30, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          >
            {/* Error header with gradient background */}
            <div className="bg-gradient-to-r from-red-500 to-red-700 text-white py-6 sm:py-8 px-4 sm:px-6 relative overflow-hidden">
              <motion.div className="relative z-10">
                <motion.div
                  className="flex justify-center mb-4"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.3,
                  }}
                >
                  <div className="bg-white bg-opacity-30 rounded-full p-3 sm:p-4 backdrop-blur-sm shadow-lg">
                    <CircleX size={28} className="text-white sm:text-3xl" />
                  </div>
                </motion.div>

                <motion.h2
                  className="text-xl sm:text-2xl font-bold text-center mb-1"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {orderStatus === "failure"
                    ? "Payment Failed"
                    : "Internal Server Error"}
                </motion.h2>

                <motion.p
                  className="text-center text-white text-opacity-90 text-sm sm:text-base"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {orderStatus === "failure"
                    ? "We were unable to process your payment."
                    : "We encountered an error processing your request."}
                </motion.p>
              </motion.div>
            </div>

            {/* Error message and retry option */}
            <div className="px-4 sm:px-6 py-6 sm:py-8">
              <motion.p
                className="text-gray-600 text-center mb-6"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                {orderStatus === "failure"
                  ? "Please check your payment details and try again."
                  : "Please try again or contact customer support if the issue persists."}
              </motion.p>

              {/* Action buttons */}
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={handleRetryPayment}
                  className="py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 shadow-md"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Retry Payment
                </motion.button>

                <motion.button
                  onClick={() => navigate("/shop/all")}
                  className="py-3 px-6 border border-blue-600 text-blue-600 rounded-lg font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Return to Shopping
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }
  // Success UI - For both COD and online payment success
  return (
    <AnimatePresence>
      <motion.div
        id="payment-success-popup"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Enhanced backdrop with subtle blur */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black/60 to-blue-900/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal content with improved responsive design */}
        <motion.div
          className="bg-white rounded-xl shadow-2xl w-full max-w-md md:max-w-lg relative z-10 overflow-hidden my-6 sm:my-8 flex flex-col max-h-[90vh]"
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 30, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        >
          {/* Success header with gradient background */}
          <div className="bg-custom-gradient text-white py-6 sm:py-8 px-4 sm:px-6 relative overflow-hidden flex-shrink-0">
            {/* Success content with improved animations */}
            <div className="relative z-10">
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.3,
                }}
              >
                <div className="bg-white bg-opacity-30 rounded-full p-3 sm:p-4 backdrop-blur-sm shadow-lg">
                  <Check className="text-white text-2xl sm:text-3xl" />
                </div>
              </motion.div>

              <motion.h2
                className="text-xl sm:text-2xl font-bold text-center mb-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {status === "success"
                  ? "Payment Successful!"
                  : "Order Placed Successfully!"}
              </motion.h2>

              <motion.p
                className="text-center text-white text-opacity-90 text-sm sm:text-base"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Thank you for your purchase
              </motion.p>
            </div>
          </div>

          {/* Order details */}
          {orderDetails && (
            <div className="px-4 sm:px-6 py-4 sm:py-5 overflow-y-auto flex-1">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4 sm:space-y-6"
              >
                {/* Order ID and Date */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-500 text-xs sm:text-sm">Order ID</p>
                    <p className="font-medium text-sm sm:text-base">
                      {orderDetails.orderNo}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs sm:text-sm">
                      Order Date
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {formatDate(orderDetails.createdAt)}
                    </p>
                  </div>
                </motion.div>

                {/* Enhanced delivery timeline */}
                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 rounded-lg p-3 sm:p-4"
                  whileHover={{
                    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
                  }}
                >
                  <div className="flex items-center mb-3">
                    <Clock
                      size={20}
                      className="text-[var(--accent-color)] mr-2"
                    />
                    <h3 className="font-medium text-sm sm:text-base">
                      Estimated Delivery
                    </h3>
                  </div>

                  <p className="font-bold text-[var(--text-color)] mb-4 text-sm sm:text-base">
                    {getEstimatedDeliveryDate(orderDetails.createdAt)}
                  </p>

                  {/* Timeline */}
                  <div className="relative pt-6 pb-8">
                    {/* Timeline connector line - Background */}
                    <div className="absolute left-0 right-0 top-10 h-1 bg-gray-200 rounded-full"></div>

                    {/* Timeline connector line - Progress */}
                    <motion.div
                      className="absolute left-0 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                      style={{
                        top: "2.5rem",
                        width: "0%",
                      }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>

                    {/* Timeline items */}
                    <div className="flex justify-between relative">
                      {orderStages.map((stage, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <motion.div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md z-10 ${
                              stage.complete ? "bg-green-500" : "bg-gray-200"
                            }`}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                          >
                            <stage.icon
                              className={`text-sm ${
                                stage.complete ? "text-white" : "text-gray-500"
                              }`}
                            />
                          </motion.div>

                          {/* Label - positioned below the dot */}
                          <p
                            className={`text-xs mt-2 text-center w-16 sm:w-20 ${
                              stage.complete
                                ? "text-green-600 font-medium"
                                : "text-gray-500"
                            }`}
                          >
                            {stage.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Delivery Address */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-start p-3 sm:p-4 bg-gray-50 rounded-lg"
                  whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
                >
                  <div className="mt-0.5 text-lg text-red-500">
                    <MapPin />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="font-medium text-sm sm:text-base">
                      Delivery Address
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mt-1 break-words">
                      {formatAddress(orderDetails.shippingAddress)}
                    </p>
                  </div>
                </motion.div>

                {/* Payment Method */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-between py-3 px-1 border-t border-b items-center"
                >
                  <span className="text-gray-600 text-sm">Payment Method</span>
                  <span className="font-medium text-sm bg-blue-50 px-3 py-1 rounded-full capitalize">
                    {orderDetails.paymentMethod.replaceAll("_", " ")}
                  </span>
                </motion.div>

                {/* Order Amount */}
                <motion.div
                  variants={itemVariants}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-600 text-sm">Order Amount</span>
                  <motion.span
                    className="font-bold text-lg sm:text-xl text-[var(--text-color)]"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    ₹{" "}
                    {Math.round(
                      orderDetails.subTotal + orderDetails.shippingFee
                    )}
                  </motion.span>
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Action buttons */}
          <motion.div
            className="p-4 border-t flex flex-col sm:flex-row gap-3 flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              className="py-3 border border-[var(--accent-color)] text-[var(--accent-color)] rounded-lg font-medium flex items-center justify-center gap-2 w-full"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/shop/all")}
            >
              Continue Shopping
            </motion.button>
            <motion.button
              className="py-3 bg-custom-gradient text-white rounded-lg font-medium flex items-center justify-center gap-2 w-full shadow-md"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/manage-orders")}
            >
              Track Order <ArrowRight />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderSuccessMessage;
