import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import ReviewsAndRatings from "../../helper/ReviewsAndRatings";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, getAllCartItems } from "../../features/cart/cart";
import { toast } from "react-toastify";
import Image from "../image/Image";
import Loader from "../common/Loader";
import CloseButton from '../button/CloseButton';
import { motion, AnimatePresence } from 'framer-motion';
import {  FaStar, FaEye, FaShoppingCart, FaUndo } from 'react-icons/fa';
import { MdReviews } from 'react-icons/md';
import {getButtonStyles} from '../../helper/helperFunctions'

const apiUrl = import.meta.env.VITE_BACKEND_URL;
const ReturnItemForm = lazy(() => import("../returnItemForm/ReturnItemForm"));

const SingleOrder = ({
  curOrder,
  paymentMethod,
  invoiceNumber,
  isReturnDisabled,
  orderStatus,
}) => {
  const nameUrl = curOrder["name-url"];
  const dispatch = useDispatch();
  const [singleOrderItem, setSingleOrderItem] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showProductReview, setShowProductReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const modalRef = useRef();

  const getCurOrderItem = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiUrl}/products/organic-honey/${nameUrl}`);
      if (response.data.product) {
        setSingleOrderItem(response.data.product);
      }
    } catch (error) {
      console.error("Error fetching order item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsFormVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFormCancel = () => setIsFormVisible(false);

  useEffect(() => {
    getCurOrderItem();
  }, [nameUrl]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: singleOrderItem._id,
        quantity: 1,
        productName: singleOrderItem["name-url"],
      })
    ).then(() => {
      dispatch(getAllCartItems());
      toast.success("Product added to the Cart");
    });
  };

  const isReturned = curOrder.quantity === curOrder.returnInfo.returnedQuantity;
  const canReturn = !isReturned && !isReturnDisabled && orderStatus === "completed";
  const partialReturn = curOrder.returnInfo.returnedQuantity > 0 && curOrder.returnInfo.returnedQuantity < curOrder.quantity;

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center py-8"
      >
        <Loader height="50px" />
      </motion.div>
    );
  }

  if (!singleOrderItem) {
    return (
      <div className="text-center py-8 text-[var(--text-color)]">
        Product not found
      </div>
    );
  }

  const actionButtons = [
    {
      icon: FaEye,
      text: "View Product",
      action: () => {},
      link: `/shop/all/${nameUrl}`,
      variant: "primary"
    },
    {
      icon: FaShoppingCart,
      text: "Buy Again",
      action: handleAddToCart,
      variant: "secondary"
    },
    {
      icon: MdReviews,
      text: "Review Product",
      action: () => setShowProductReview(true),
      variant: "accent"
    },
    {
      icon: FaUndo,
      text: isReturned ? "Returned" : "Return Item",
      action: () => setIsFormVisible(true),
      variant: "return",
      disabled: !canReturn
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[var(--background-color)] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 xs:p-6 p-2 border border-[var(--neutral-color)]/30"
    >
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Product Image & Info */}
        <div className="flex flex-row gap-4 flex-1">
          {/* Product Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="relative group bg-gray-500"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white shadow-md">
              <Image
                src={{
                  sm: Array.isArray(singleOrderItem.img) 
                    ? singleOrderItem.img.find(path => path.sm?.toLowerCase().includes("front"))?.sm 
                    : null,
                  md: Array.isArray(singleOrderItem.img) 
                    ? singleOrderItem.img.find(path => path.md?.toLowerCase().includes("front"))?.md 
                    : null,
                  lg: Array.isArray(singleOrderItem.img) 
                    ? singleOrderItem.img.find(path => path.lg?.toLowerCase().includes("front"))?.lg 
                    : null,
                }}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                alt={singleOrderItem.name}
              />
            </div>
            {/* Quantity Badge */}
            <div className="absolute -top-2 -right-2 bg-[var(--themeColor)] text-[var(--text-light-color)] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {curOrder.quantity}
            </div>
          </motion.div>

          {/* Product Details */}
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-[var(--text-color)] text-lg leading-tight">
              {singleOrderItem.name}
            </h3>
            
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-color)]/70">Quantity:</span>
                <span className="font-medium text-[var(--themeColor)]">
                  {curOrder.quantity} {curOrder.quantity > 1 ? 'Pcs' : 'Pc'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-[var(--text-color)]/70">Rate:</span>
                <span className="font-bold text-[var(--accent-color)] text-base">
                  ₹{Math.round(singleOrderItem.price)}
                </span>
              </div>

              {/* Return Status */}
              {partialReturn && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1 bg-[var(--alert-color)]/10 text-[var(--alert-color)] px-2 py-1 rounded-full text-xs font-medium"
                >
                  <FaUndo className="w-3 h-3" />
                  {curOrder.returnInfo.returnedQuantity} item(s) returned
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 lg:flex-col lg:w-auto w-full">
          {actionButtons.map((button, index) => {
            const ButtonContent = (
              <motion.button
                key={index}
                whileHover={{ scale: button.disabled ? 1 : 1.02 }}
                whileTap={{ scale: button.disabled ? 1 : 0.98 }}
                onClick={button.action}
                disabled={button.disabled}
                className={`review
                  flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
                  transition-all duration-200 min-w-[120px] lg:min-w-[140px]
                  ${getButtonStyles(button.variant, button.disabled)}
                `}
              >
                <button.icon className="w-4 h-4" />
                {button.text}
              </motion.button>
            );

            return button.link ? (
              <Link key={index} to={button.link} className="block">
                {ButtonContent}
              </Link>
            ) : (
              ButtonContent
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="mt-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--neutral-color)] to-transparent"></div>
      </div>

      {/* Product Review Modal */}
      <AnimatePresence>
        {showProductReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => setShowProductReview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--background-color)] rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--neutral-color)]/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[var(--themeColor)]/10 rounded-lg">
                    <FaStar className="w-5 h-5 text-[var(--themeColor)]" />
                  </div>
                  <h2 className="text-xl font-bold text-[var(--text-color)]">
                    Rate & Review
                  </h2>
                </div>
                <CloseButton action={() => setShowProductReview(false)} />
              </div>

              {/* Modal Content */}
              <div className="p-3 overflow-y-auto">
                <p className="text-[var(--text-color)]/70 mb-4">
                  Share your experience with this product
                </p>
                <ReviewsAndRatings productName={nameUrl} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Return Form Modal */}
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--background-color)] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-[var(--neutral-color)]/30">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[var(--alert-color)]/10 rounded-lg">
                    <FaUndo className="w-5 h-5 text-[var(--alert-color)]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--text-color)]">
                    Return Request
                  </h2>
                </div>
              </div>

              {/* Return Policy */}
              <div className="p-6 bg-[var(--neutral-color)]/10 border-b border-[var(--neutral-color)]/30">
                <div className="space-y-2 text-sm text-[var(--text-color)]/70">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[var(--themeColor)] rounded-full mt-2 flex-shrink-0"></div>
                    <p>Returns accepted within 2 days of delivery for unused items in original packaging</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[var(--themeColor)] rounded-full mt-2 flex-shrink-0"></div>
                    <p>Please attach images and video for verification during return process</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[var(--themeColor)] rounded-full mt-2 flex-shrink-0"></div>
                    <p>Refunds processed once return is received and inspected</p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                <Suspense fallback={<Loader height="50px" />}>
                  <ReturnItemForm
                    product={curOrder}
                    returnedQuantity={curOrder.returnInfo.returnedQuantity || 0}
                    paymentMethod={paymentMethod}
                    amountPaid={Math.round(
                      singleOrderItem.price -
                      (singleOrderItem.price * singleOrderItem.discount) / 100
                    )}
                    invoiceNumber={invoiceNumber}
                    onSubmit={() => setIsFormVisible(false)}
                    onCancel={handleFormCancel}
                  />
                </Suspense>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};



export default SingleOrder;
