import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import CloseButton from "./button/CloseButton";
import PaymentMethodButton from "./checkout/PaymentMethodButton";
import SubmitButton from "./button/SubmitButton";
import { calculateCODCharges } from "../features/check-delivery/checkDelivery";
import { getUserData } from "../features/auth/auth";
import {
  initiatePayment,
  updateMerchantTransId,
} from "../features/orderPayment/payment";
import { generateTransactionID } from "../helper/helperFunctions";
import api from "../config/axiosConfig";

import {
  Banknote,
  ChevronRight,
  CreditCard,
  Info,
  ShoppingCart,
} from "lucide-react";

const DISCOUNT_PERCENTAGE = 5;

const getOriginalAmt = (curTotal) => {
  const originalAmt = (curTotal * 100) / (100 - DISCOUNT_PERCENTAGE);
  return Math.round(originalAmt);
};
const getOriginalTaxAmt = (curTotalTax) => {
  const originalTaxAmt = (curTotalTax * 100) / (100 - DISCOUNT_PERCENTAGE);
  return Math.round(originalTaxAmt);
};

const CompleteOrderModal = ({ isOpen, onClose, order }) => {
  const { CODCharge } = useSelector((state) => state.delivery);
  // const { loading } = useSelector(state => state.payment)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      order?.paymentMethod === "online_payment" &&
      order?.paymentStatus === "pending"
    ) {
      dispatch(calculateCODCharges(order?.orderDetails));
    }
  }, []);

  if (!isOpen) return null;

  const handleOrderCompletion = async (paymentMethod) => {
    try {
      if (paymentMethod === "cash_on_delivery") {
        const payload = {
          orderId: order._id,
          paymentMethod,
          subTotal: getOriginalAmt(order.subTotal) + CODCharge,
          taxAmount: getOriginalTaxAmt(order.taxAmount),
          CODCharge,
        };
        const response = await api.post(
          "/api/orders/recomplete-order",
          payload
        );
        if (response.status === 200) {
          sessionStorage.setItem("newOrderId", response.data.orderId);
          dispatch(getUserData());
          navigate(`/order-status?status=confirmed`);
        }
      } else if (paymentMethod === "online_payment") {
        sessionStorage.setItem("newOrderId", order?._id);
        const newMerchantTransactionId = generateTransactionID();
        const payload = {
          newMerchantTransactionId,
          id: order.merchantTransactionId,
        };
        dispatch(updateMerchantTransId(payload)).then((result) => {
          if (result.payload.success) {
            const payload = {
              number: order.phoneNumber.replace("+91", ""),
              amount: order.subTotal,
              merchantTransactionId: newMerchantTransactionId,
            };
            dispatch(initiatePayment(payload));
          }
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = (values, action) => {
    handleOrderCompletion(values.paymentMethod).then(() => {
      action.setSubmitting(false);
      action.resetForm();
      onClose();
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[var(--text-color)]/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="bg-[var(--background-color)] rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-auto border-2 border-[var(--neutral-color)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className=" px-3 py-3 flex justify-end">
            <CloseButton action={onClose} />
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="bg-[var(--neutral-color)]/30 rounded-2xl p-5 border border-[var(--neutral-color)]">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center border-[var(--neutral-color)]">
                  <span className="font-bold text-[var(--text-color)]">
                    Total Amount:
                  </span>
                  <span className="font-bold text-xl text-[var(--secondary-color)]">
                    ₹{getOriginalAmt(order?.subTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-4">
              <h3 className="font-semibold text-[var(--text-color)] mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-[var(--themeColor)] rounded-full flex items-center justify-center">
                  <span className="text-[var(--text-light-color)] text-xs font-bold">
                    ₹
                  </span>
                </div>
                Choose Payment Method
              </h3>
              <Formik
                initialValues={{ paymentMethod: "" }}
                onSubmit={handleSubmit}
              >
                {({ values, isSubmitting, setFieldValue }) => (
                  <Form>
                    <div className="space-y-3">
                      <PaymentMethodButton
                        icon={CreditCard}
                        label={`Pay Now ₹${order?.subTotal}`}
                        selected={values.paymentMethod === "online_payment"}
                        onClick={() =>
                          setFieldValue("paymentMethod", "online_payment")
                        }
                        badge="5% off"
                      />
                      <PaymentMethodButton
                        icon={Banknote}
                        label={`Cash on Delivery ₹${
                          getOriginalAmt(order?.subTotal) + CODCharge
                        }`}
                        selected={values.paymentMethod === "cash_on_delivery"}
                        onClick={() =>
                          setFieldValue("paymentMethod", "cash_on_delivery")
                        }
                        badge={`COD Charge applicable (₹${CODCharge})`}
                      />
                    </div>
                    <SubmitButton
                      id="placeOrderBtn"
                      isSubmitting={isSubmitting}
                      text={
                        values.paymentMethod === "online_payment"
                          ? `Place Order`
                          : `Place Order`
                      }
                    />
                  </Form>
                )}
              </Formik>
            </div>

            {/* Security Note */}
            <div className="bg-[var(--accent-color)]/10 rounded-xl p-4 border-2 border-[var(--accent-color)]/20">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[var(--accent-color)]/20 rounded-lg flex-shrink-0">
                  <Info className="w-5 h-5 text-[var(--accent-color)]" />
                </div>
                <div>
                  <h4 className="font-bold text-[var(--text-color)] mb-2">
                    🔒 Secure & Protected
                  </h4>
                  <p className="text-sm text-[var(--text-color)]/80 leading-relaxed">
                    Your payment information is encrypted with bank-level
                    security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const IncompleteOrder = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  // const [dismissed, setDismissed] = useState(false);
  const [incompleteOrder, setIncompleteOrder] = useState(null);
  const [showCompleteOrderModal, setShowCompleteOrderModal] = useState(false);

  const getLastIncompleteOrder = async () => {
    const response = await api.get("/api/orders/last/incomplete-order");
    if (response.status === 200) {
      setIncompleteOrder(response.data);
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (user) {
      getLastIncompleteOrder();
    }
  }, [user]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (incompleteOrder) {
      sessionStorage.setItem(
        `incomplete-payment-dismissed-${incompleteOrder._id}`,
        "true"
      );
    }
    onDismiss?.();
  };

  const handleCompletePayment = () => {
    setShowCompleteOrderModal(true);
  };

  if (!incompleteOrder || !user || !isVisible) return null;

  const itemCount = incompleteOrder.orderDetails?.length || 0;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
      >
        {/* Main Banner */}
        <div className="bg-[#F5EFE6] rounded-2xl shadow-2xl border border-[#DCD2C0] overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-[#7A2E1D] to-[#D87C45] px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="bg-white/20 p-1.5 rounded-lg"
                >
                  <CreditCard size={20} className=" text-[#F5EFE6]" />
                </motion.div>
                <div>
                  <h3 className="text-[#F5EFE6] font-semibold text-sm">
                    Payment Pending
                  </h3>
                  {/* <div className="flex items-center space-x-2 text-[#F5EFE6]/80 text-xs">
                    <BsClock className="w-3 h-3" />
                    <span>{timeLeft}</span>
                  </div> */}
                </div>
              </div>
              <CloseButton action={handleDismiss} />
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[#3E2C1B] font-medium">
                  Order {incompleteOrder.orderNo}
                </p>
                <p className="text-[#3E2C1B]/70 text-sm">
                  {itemCount} item{itemCount !== 1 ? "s" : ""} • ₹{" "}
                  {getOriginalAmt(incompleteOrder.subTotal)}{" "}
                  <span className="text-[var(--themeColor)]">
                    (Grab 5% off on instant payment)
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-1 bg-[#D87C45]/10 px-2 py-1 rounded-full">
                <div className="w-2 h-2 bg-[#D87C45] rounded-full animate-pulse" />
                <span className="text-[#D87C45] text-xs font-medium">
                  Awaiting Payment
                </span>
              </div>
            </div>

            {/* Items Preview */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">Items in your order:</span>
              </div>
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {incompleteOrder.orderDetails?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-700 truncate capitalize">
                      {item["name-url"].replaceAll("-", " ")}
                    </span>
                    <span className="text-gray-900 font-medium">
                      {item.quantity} Pcs.{" "}
                    </span>
                    {/* <span className="text-gray-900 font-medium">${item.price}</span> */}
                  </div>
                ))}
                {/* {itemCount > 3 && (
                  <p className="text-xs text-gray-500">+{itemCount - 3} more items</p>
                )} */}
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCompletePayment}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CreditCard size={17} />
              <span>Complete Payment</span>
              <ChevronRight size={17} />
            </motion.button>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-2xl blur-xl -z-10" />

        <CompleteOrderModal
          isOpen={showCompleteOrderModal}
          onClose={() => setShowCompleteOrderModal(false)}
          order={incompleteOrder}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default IncompleteOrder;
