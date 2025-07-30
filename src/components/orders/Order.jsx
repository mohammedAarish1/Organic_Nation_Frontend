import React, { lazy, Suspense, useState } from "react";
import { useDispatch } from "react-redux";
import { cancelOrder, getAllOrders } from "../../features/manageOrders/manageOrders";
// import SingleOrder from "./SingleOrder";
import Alert from "../alert/Alert";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
import { motion, AnimatePresence } from 'framer-motion';


const SingleOrder = lazy(() => import("./SingleOrder"))
const DeliveryFeedbackForm = lazy(() => import("../../helper/DeliveryFeedbackForm"))
const SingleOrderFooterSection = lazy(() => import("../module/manage-orders/SingleOrderFooterSection"));
const OrderDetailsModal = lazy(() => import("../module/manage-orders/OrderDetailsModal"));

// React Icons
import {
  GoDotFill,
  GoPackage,
  GoCalendar,
  GoCreditCard,
  GoInfo
} from "react-icons/go";
import {
  IoCheckmarkDoneCircleSharp,
} from "react-icons/io5";
import {
  MdOutlineCancel,
  MdDeliveryDining,
  MdOutlineFeedback
} from "react-icons/md";
import {
  FaArrowRight,
  FaEye,
  FaTimes,
  FaChevronDown
} from "react-icons/fa";

// Status Configuration
const STATUS_CONFIG = {
  active: {
    icon: <GoDotFill className="text-xl text-[var(--secondary-color)]" />,
    color: "var(--secondary-color)",
    bgColor: "var(--secondary-color)/10",
    label: "Active"
  },
  completed: {
    icon: <IoCheckmarkDoneCircleSharp className="text-xl text-[var(--secondary-color)]" />,
    color: "var(--secondary-color)",
    bgColor: "var(--secondary-color)/10",
    label: "Completed"
  },
  cancelled: {
    icon: <MdOutlineCancel className="text-xl text-[var(--alert-color)]" />,
    color: "var(--alert-color)",
    bgColor: "var(--alert-color)/10",
    label: "Cancelled"
  }
};

export const OrderStatusIcon = ({ status }) => STATUS_CONFIG[status]?.icon || null;



const DeliveryFeedbackModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[var(--background-color)] rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-3 border-b border-[var(--neutral-color)]/30 bg-[var(--themeColor)] text-[var(--text-light-color)]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--text-light-color)]/10 rounded-lg">
                <MdDeliveryDining className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Delivery Feedback</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-[var(--text-light-color)]/10 rounded-lg transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Modal Content */}
          <div className="p-3">
            <p className="text-[var(--text-color)]/70 mb-1">
              How was your experience with the delivery partner?
            </p>
            <Suspense fallback={<Loader height="400px" />}>
              <DeliveryFeedbackForm
                invoiceNumber={order.invoiceNumber}
                setShowDeliveryFeedbackForm={onClose}
              />
            </Suspense>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};



// Enhanced OrderHeader Component
const OrderHeader = ({ order, onShowDetails, statusIcon }) => {
  const statusConfig = STATUS_CONFIG[order?.orderStatus];

  const headerItems = [
    {
      icon: GoPackage,
      label: "Order Number",
      value: `#${order?.orderNo}`,
      className: "lg:flex hidden"
    },
    {
      icon: GoCalendar,
      label: "Date Placed",
      value: new Date(order?.createdAt).toLocaleDateString(),
      className: "md:flex hidden"
    },
    {
      icon: GoCreditCard,
      label: "Payment Method",
      value: order?.paymentMethod,
      className: "lg:flex hidden"
    },
    {
      icon: GoInfo,
      label: "Status",
      value: statusConfig?.label || order?.orderStatus,
      statusIcon: statusIcon,
      className: "flex"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] text-[var(--text-light-color)] py-4 px-6 rounded-t-2xl"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Header Info */}
        <div className="flex flex-wrap gap-6">
          {headerItems.map(({ icon: Icon, label, value, statusIcon, className }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${className} flex-col gap-1`}
            >
              <div className="flex items-center gap-2 text-sm opacity-80">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <span className="capitalize">{value}</span>
                {statusIcon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 bg-[var(--text-light-color)] text-[var(--themeColor)] px-4 py-2.5 rounded-lg font-medium hover:bg-[var(--background-color)] transition-colors shadow-lg"
          onClick={onShowDetails}
        >
          <FaEye className="w-4 h-4" />
          <span>Order Details</span>
          <FaArrowRight className="w-3 h-3" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Enhanced Order Component
const Order = ({ order }) => {
  const dispatch = useDispatch();
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [showDeliveryFeedbackForm, setShowDeliveryFeedbackForm] = useState(false);

  const deliveryDate = new Date(order?.deliveryDate);
  const isReturnDisabled = deliveryDate &&
    (new Date() - deliveryDate) / (1000 * 60 * 60 * 24) > 3;

  const handleOrderCancel = () => {
    dispatch(cancelOrder(order._id)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(getAllOrders());
        toast.info(res.payload);
      }
    });
    setIsAlertOpen(false);
  };

  const visibleItems = showAllItems ? order?.orderDetails : order?.orderDetails?.slice(0, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[var(--neutral-color)]/20"
    >
      <OrderHeader
        order={order}
        onShowDetails={() => setShowOrderDetails(true)}
        statusIcon={<OrderStatusIcon status={order?.orderStatus} />}
      />

      {/* Order Items */}
      <div className="xs:p-6 px-2 py-4">
        <AnimatePresence>
          {visibleItems?.map((curOrder, index) => (
            <motion.div
              key={curOrder._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={index !== visibleItems.length - 1 ? "mb-6" : ""}
            >
              <Suspense fallback={<Loader height='200px' />}>
                <SingleOrder
                  curOrder={curOrder}
                  paymentMethod={order?.paymentMethod}
                  invoiceNumber={order?.invoiceNumber}
                  isReturnDisabled={isReturnDisabled}
                  orderStatus={order.orderStatus}
                />
              </Suspense>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Show All/Less Button */}
        {order?.orderDetails?.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-[var(--accent-color)] text-[var(--text-light-color)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--accent-color)]/90 transition-colors shadow-md"
              onClick={() => setShowAllItems(!showAllItems)}
            >
              <span>{showAllItems ? "Show Less" : `Show All (${order.orderDetails.length})`}</span>
              <motion.div
                animate={{ rotate: showAllItems ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Footer Section */}
      <Suspense fallback={<div className="p-4"><Loader height="150px" /></div>}>
        <SingleOrderFooterSection
          order={order}
          onCancelOrder={() => setIsAlertOpen(true)}
          isActive={order?.orderStatus === "active"}
        />
      </Suspense>

      {/* Delivery Feedback Button */}
      {order.orderStatus === "completed" && (
        <div className="px-6 pb-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 text-[var(--themeColor)] hover:text-[var(--themeColor)]/80 text-sm underline underline-offset-2"
            onClick={() => setShowDeliveryFeedbackForm(true)}
          >
            <MdOutlineFeedback className="w-4 h-4" />
            Delivery Feedback
          </motion.button>
        </div>
      )}

      {/* Modals */}
      <Suspense fallback={null}>
        <OrderDetailsModal
          isOpen={showOrderDetails}
          onClose={() => setShowOrderDetails(false)}
          order={order}
          statusIcon={<OrderStatusIcon status={order?.orderStatus} />}
        />
      </Suspense>

      <DeliveryFeedbackModal
        isOpen={showDeliveryFeedbackForm}
        onClose={() => setShowDeliveryFeedbackForm(false)}
        order={order}
      />

      <Alert
        isOpen={isAlertOpen}
        alertMessage="Are you sure you want to cancel this order? This action cannot be undone."
        hideAlert={() => setIsAlertOpen(false)}
        handleAction={handleOrderCancel}
      />
    </motion.div>
  );
};


export default Order;