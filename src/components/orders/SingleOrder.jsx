// import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
// import ButtonTwo from "../button/ButtonTwo";
// import ReviewsAndRatings from "../../helper/ReviewsAndRatings";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart, getAllCartItems } from "../../features/cart/cart";
// import { toast } from "react-toastify";
// // react icons
// import { IoIosCloseCircleOutline } from "react-icons/io";
// // import ReturnItemForm from "../returnItemForm/ReturnItemForm";
// import Image from "../image/Image";
// import Loader from "../common/Loader";
// const apiUrl = import.meta.env.VITE_BACKEND_URL;
// const ReturnItemForm = lazy(() => import("../returnItemForm/ReturnItemForm"))
// import CloseButton from '../button/CloseButton';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaTimes, FaStar } from 'react-icons/fa';

// const ReviewModal = ({ productName = "Sample Product" }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Prevent body scroll when modal is open
//   useEffect(() => {
//     if (isModalOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     // Cleanup function to reset overflow when component unmounts
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isModalOpen]);

//   // Handle ESC key press to close modal
//   useEffect(() => {
//     const handleEscapeKey = (event) => {
//       if (event.key === 'Escape') {
//         setIsModalOpen(false);
//       }
//     };

//     if (isModalOpen) {
//       document.addEventListener('keydown', handleEscapeKey);
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscapeKey);
//     };
//   }, [isModalOpen]);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   // Modal animation variants
//   const overlayVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { duration: 0.3 }
//     },
//     exit: {
//       opacity: 0,
//       transition: { duration: 0.2 }
//     }
//   };

//   const modalVariants = {
//     hidden: {
//       opacity: 0,
//       scale: 0.8,
//       y: 50
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         duration: 0.4,
//         ease: "easeOut"
//       }
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.8,
//       y: 50,
//       transition: {
//         duration: 0.3,
//         ease: "easeIn"
//       }
//     }
//   };

//   return (
//     <>
//       {/* Trigger Button */}
//       <motion.button
//         onClick={openModal}
//         className="px-6 py-3 font-bold text-white rounded-2xl shadow-lg flex items-center gap-3 transition-all duration-300"
//         style={{ backgroundColor: '#7A2E1D' }}
//         whileHover={{
//           scale: 1.05,
//           backgroundColor: '#9B7A2F',
//           boxShadow: "0 10px 30px rgba(122, 46, 29, 0.3)"
//         }}
//         whileTap={{ scale: 0.98 }}
//       >
//         <FaStar />
//         <span>Write a Review</span>
//       </motion.button>

//       {/* Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
//             variants={overlayVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             onClick={closeModal} // Close modal when clicking on overlay
//           >
//             <motion.div
//               className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
//               style={{ backgroundColor: '#FFFFFF' }}
//               variants={modalVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
//             >
//               {/* Close Button */}
//               <div className=" pt-2 flex justify-end">

//                 <CloseButton action={closeModal} />
//               </div>
//               {/* Modal Content */}
//               <div className="">
//                 <ReviewsAndRatings
//                   productName={productName}
//                   insideProductDetails={true}
//                 />
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };





// const SingleOrder = ({
//   curOrder,
//   paymentMethod,
//   invoiceNumber,
//   isReturnDisabled,
//   orderStatus,
// }) => {
//   let nameUrl = curOrder["name-url"];
//   const dispatch = useDispatch();
//   const [singleOrderItem, setSingleOrderItem] = useState(null);
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [showProductReview, setShowProductReview] = useState(false);

//   const modalRef = useRef();

//   const getCurOrderItem = async () => {
//     try {
//       const response = await axios.get(
//         `${apiUrl}/products/organic-honey/${nameUrl}`
//       );
//       if (response.data.product) {
//         setSingleOrderItem(response.data.product);
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const handleClickOutside = (event) => {
//     if (modalRef.current && !modalRef.current.contains(event.target)) {
//       // setSelectedOrder(null);
//       setIsFormVisible(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleFormCancel = () => {
//     setIsFormVisible(false);
//   };

//   useEffect(() => {
//     getCurOrderItem();
//   }, [nameUrl]);

//   if (!singleOrderItem) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col gap-4 font-mono">
//       <div className="flex xs:flex-row flex-col gap-5 xs:gap-0 justify-between xs:items-center">
//         <div className="flex justify-start xs:gap-5 gap-5 items-center">
//           <div>
//             {/* <img
//               src={ Array.isArray(singleOrderItem.img) ? singleOrderItem.img.filter((path) => path.toLowerCase().includes("front") )[0]  : null }
//               className="xs:w-16 w-12 rounded-xl"
//               alt="product-image"
//             /> */}

//             <Image
//               src={{
//                 // sm: leftImage.sm,
//                 sm: Array.isArray(singleOrderItem.img) ? singleOrderItem.img.filter((path) => path.sm.toLowerCase().includes("front"))[0].sm : null,
//                 md: Array.isArray(singleOrderItem.img) ? singleOrderItem.img.filter((path) => path.md.toLowerCase().includes("front"))[0].md : null,
//                 lg: Array.isArray(singleOrderItem.img) ? singleOrderItem.img.filter((path) => path.lg.toLowerCase().includes("front"))[0].lg : null,
//                 // md: leftImage.md,
//                 // lg: leftImage.lg
//               }}
//               // blurSrc={leftImage.blur}
//               className="xs:w-16 w-12 rounded-xl"
//               alt="product-image"
//             />
//           </div>
//           <div className="flex flex-col justify-start xs:gap-3 gap-1 text-sm xs:text-[16px]  ">
//             <p>{singleOrderItem.name}</p>
//             <p>Quantity : {curOrder.quantity} Pcs.</p>
//             <p>
//               Rate Per Quantity: ₹
//               {Math.round(singleOrderItem.price)}
//               {/* <span className="text-green-300 text-sm">
//                 ({singleOrderItem.discount}% off)
//               </span> */}
//             </p>
//           </div>
//         </div>
//         {/* ==================buttons============ */}

//         <div className="flex xs:flex-col justify-center items-end xs:gap-2 gap-1">
//           {/* ====== View Product Button ==============  */}

//           <Link to={`/shop/all/${nameUrl}`}>
//             <ButtonTwo text="View Product" />
//           </Link>

//           {/* ====== Buy again button ==============  */}
//           <div
//             onClick={() => {
//               dispatch(
//                 addToCart({
//                   productId: singleOrderItem._id,
//                   quantity: 1,
//                   productName: singleOrderItem["name-url"],
//                 })
//               ).then(() => {
//                 dispatch(getAllCartItems());
//                 toast.success("Product added to the Cart");
//               });
//             }}
//           >
//             <ButtonTwo text="Buy again" />
//           </div>

//           {/* ====== Review Product Button ==============  */}

//           <div
//             onClick={() => {
//               setShowProductReview(true);
//             }}
//           >
//             <ButtonTwo text="Review Product" />
//           </div>
//           {/* ====== Return items ==============  */}

//           <div
//             onClick={() => {
//               setIsFormVisible(true);
//             }}
//           >
//             <button
//               type="submit"
//               className={`${curOrder.quantity === curOrder.returnInfo.returnedQuantity ||
//                 isReturnDisabled ||
//                 orderStatus !== "completed"
//                 ? "opacity-50 "
//                 : ""
//                 } btn-97 `}
//               disabled={
//                 curOrder.quantity === curOrder.returnInfo.returnedQuantity ||
//                 isReturnDisabled ||
//                 orderStatus !== "completed"
//               }
//             >
//               {curOrder.quantity === curOrder.returnInfo.returnedQuantity 
//                 ? "Returned"
//                 : " Return Item"}
//             </button>
//           </div>
//         </div>
//         {/* =================== review modal ==========  */}
//         {/* <div
//           className={`product-review-modal-bg ${showProductReview ? "active" : ""
//             }`}
//           onClick={() => setShowProductReview(false)}
//         >
//           <div
//             className={`text-white product-review-modal ${showProductReview ? "active" : ""
//               }`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-end">
//               <button>
//                 <IoIosCloseCircleOutline
//                   className="cursor-pointer text-3xl hover:scale-110"
//                   onClick={() => setShowProductReview(false)}
//                 />
//               </button>
//             </div>
//             <h2 className="text-xl font-mono mb-3">
//               Give your Valuable Feedback
//             </h2>

//             <ReviewsAndRatings productName={nameUrl} />
//           </div>
//         </div> */}

//         <ReviewModal />
//       </div>

//       <div className="text-end text-white text-sm italic">
//         <p>{`${curOrder.returnInfo.returnedQuantity < curOrder.quantity &&
//           curOrder.returnInfo.returnedQuantity > 0
//           ? `* ${curOrder.returnInfo.returnedQuantity} Quantity of this item is returned by you`
//           : ""
//           }`}</p>
//       </div>

//       {/* horozontal line */}
//       <div className="px-10">
//         <div className="w-full h-[1px] bg-gradient-to-r from-[#bdb7a3] to-[#a28223]"></div>
//       </div>

//       {/* ================ edit product section ===========  */}
//       {isFormVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40">
//           <div
//             ref={modalRef}
//             className="bg-[var(--bgColorSecondary)] p-6 mt-20 rounded-lg max-w-3xl w-full max-h-[70vh] overflow-y-auto"
//           >

//             <h2 className="text-2xl font-semibold text-[var(--themeColor)] mb-4">
//               Request a return for this Item
//             </h2>

//             <div className="px-6 italic text-gray-500 text-sm pb-4 pt-2">

//               <ul className=" flex flex-col gap-1 list-disc">
//                 <li>
//                   We accept returns within 2 days of delivery for unused and
//                   unopened items in their original packaging.
//                 </li>
//                 <li>
//                   Please attach images and 1 video of the product for
//                   verification during the return process.
//                 </li>
//                 <li>
//                   Refunds will be processed once the return is received and
//                   inspected.
//                 </li>
//               </ul>
//             </div>
//             <Suspense fallback={<Loader height='50px' />}>
//               <ReturnItemForm
//                 product={curOrder}
//                 returnedQuantity={curOrder.returnInfo.returnedQuantity || 0}
//                 paymentMethod={paymentMethod}
//                 amountPaid={Math.round(
//                   singleOrderItem.price -
//                   (singleOrderItem.price * singleOrderItem.discount) / 100
//                 )}
//                 invoiceNumber={invoiceNumber}
//                 onSubmit={() => setIsFormVisible(false)}
//                 onCancel={handleFormCancel}
//               />
//             </Suspense>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleOrder;




import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import ButtonTwo from "../button/ButtonTwo";
import ReviewsAndRatings from "../../helper/ReviewsAndRatings";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, getAllCartItems } from "../../features/cart/cart";
import { toast } from "react-toastify";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from "../image/Image";
import Loader from "../common/Loader";
import CloseButton from '../button/CloseButton';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaStar, FaEye, FaShoppingCart, FaUndo, FaStarHalfAlt } from 'react-icons/fa';
import { MdReviews } from 'react-icons/md';

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

// Helper function for button styles
const getButtonStyles = (variant, disabled) => {
  const baseStyles = "border shadow-sm hover:shadow-md";
  
  if (disabled) {
    return `${baseStyles} bg-[var(--neutral-color)]/50 text-[var(--text-color)]/40 cursor-not-allowed border-[var(--neutral-color)]`;
  }

  switch (variant) {
    case 'primary':
      return `${baseStyles} bg-[var(--themeColor)] hover:bg-[var(--themeColor)]/90 text-[var(--text-light-color)] border-[var(--themeColor)]`;
    case 'secondary':
      return `${baseStyles} bg-[var(--accent-color)] hover:bg-[var(--accent-color)]/90 text-[var(--text-light-color)] border-[var(--accent-color)]`;
    case 'accent':
      return `${baseStyles} bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/90 text-[var(--text-light-color)] border-[var(--secondary-color)]`;
    case 'return':
      return `${baseStyles} bg-[var(--alert-color)] hover:bg-[var(--alert-color)]/90 text-[var(--text-light-color)] border-[var(--alert-color)]`;
    default:
      return `${baseStyles} bg-[var(--background-color)] hover:bg-[var(--neutral-color)]/20 text-[var(--text-color)] border-[var(--neutral-color)]`;
  }
};

export default SingleOrder;
