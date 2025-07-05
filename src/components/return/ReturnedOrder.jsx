// import React, { useEffect, useState } from "react";
// import {
//   getAllOrders,
// } from "../../features/manageOrders/manageOrders";
// import { useDispatch, useSelector } from "react-redux";
// import Alert from "../alert/Alert";
// // react icons
// import { MdOutlineCancel } from "react-icons/md";
// import { GoDotFill } from "react-icons/go";

// import { toast } from "react-toastify";
// import { GrInProgress } from "react-icons/gr";
// import { MdOutlineFileDownloadDone } from "react-icons/md";
// import axios from "axios";
// import ButtonTwo from "../button/ButtonTwo";
// import { Link, useNavigate } from "react-router-dom";
// import { addToCart, getAllCartItems } from "../../features/cart/cart";
// import { cancelReturnRequest, getAllReturnItems } from "../../features/manage-returns/manageReturns";
// import Image from "../image/Image";

// const apiUrl = import.meta.env.VITE_BACKEND_URL;

// const ReturnedOrder = ({ singleReturn }) => {

//   const statusIcons = {
//     requested: <GoDotFill className="text-xl text-green-500" />,
//     rejected: <MdOutlineCancel className="text-xl text-red-500" />,
//     inProgress: <GrInProgress className="text-sm text-orange-500" />,
//     completed: <MdOutlineFileDownloadDone className="text-xl text-green-500" />, // Cancelled icon
//   };

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [itemDetails, setItemDetails] = useState("");
//   const { loading } = useSelector(state => state.returns)
//   const [isAlertOpen, setIsAlertOpen] = useState(false);

//   const showAlert = () => {
//     setIsAlertOpen(true);
//   };

//   const hideAlert = () => {
//     setIsAlertOpen(false);
//   };

//   const getCurReturnedItem = async () => {
//     try {
//       const response = await axios.get(
//         `${apiUrl}/products/organic-honey/${singleReturn.itemName}`
//       );
//       if (response.data.product) {
//         setItemDetails(response.data.product);
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const handleReturnCancel = () => {
//     dispatch(cancelReturnRequest(singleReturn._id))
//       .then(res => {
//         if (res.meta.requestStatus === 'fulfilled') {
//           dispatch(getAllReturnItems());
//           dispatch(getAllOrders());
//           // navigate('/manage-orders');
//           toast.info('Cancelled Successfully')
//         }
//       })
//     setIsAlertOpen(false);
//     // navigate('/manage-returns')

//   };

//   useEffect(() => {
//     getCurReturnedItem();

//   }, [singleReturn.itemName]);


//   if (loading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <>
//       {/* order 1 start */}
//       <div className="shadow-xl font-sans">
//         <div>
//           {/* order details heading  */}
//           <div className="flex sm:justify-between justify-center items-center bg-[var(--bgColorPrimary)] text-white sm:text-[16px] text-[10px] py-3 px-4 uppercase">
//             <div className="flex justify-start items-center gap-10 ">
//               <div className="">
//                 <p>Order Number</p>
//                 <p className="text-gray-300 ">
//                   #{singleReturn?.invoiceNumber}
//                 </p>
//               </div>
//               <div className="">
//                 <p>Return Requested</p>
//                 <p className="text-gray-300 capitalize">
//                   {new Date(singleReturn?.createdAt).toDateString()}
//                 </p>
//               </div>
//               {/* <div className='lg:block hidden'>
//                                 <p>Payment Method</p>
//                                 <p className='text-gray-300 text-sm capitalize'>{order?.paymentMethod}</p>
//                             </div> */}
//               <div className="">
//                 <p>Status</p>
//                 <p className="flex justify-center items-center gap-1 text-gray-300 capitalize">
//                   {singleReturn?.returnStatus}{" "}
//                   {statusIcons[singleReturn.returnStatus]
//                     ? statusIcons[singleReturn.returnStatus]
//                     : null}
//                 </p>
//               </div>
//             </div>
//           </div>
//           {/* order details body  */}
//           <div className=" p-4  bg-gradient-to-r from-[#6D613B] to-[#D3BB71]">
//             {/* product details  */}
//             <h4 className="text-white text-xl mb-4 italic">Item Description:</h4>
//             <div className="flex flex-col gap-4 font-sans">
//               <div className="flex xs:flex-row flex-col gap-5 xs:gap-0 justify-between xs:items-center">
//                 <div className="flex justify-start xs:gap-5 gap-5 items-center">
//                   <div>

//                     <Image
//                       src={{
//                         // sm: leftImage.sm,
//                         sm: Array.isArray(itemDetails?.img) ? itemDetails?.img.filter((path) => path.sm.toLowerCase().includes("front"))[0].sm: null,
//                         md: Array.isArray(itemDetails?.img) ? itemDetails?.img.filter((path) => path.md.toLowerCase().includes("front"))[0].md: null,
//                         lg: Array.isArray(itemDetails?.img) ? itemDetails?.img.filter((path) => path.lg.toLowerCase().includes("front"))[0].lg: null,
//                         // md: leftImage.md,
//                         // lg: leftImage.lg
//                       }}
//                       // blurSrc={leftImage.blur}
//                       alt='product-image'
//                       className="w-20 max-h-24 object-contain"
//                     />
//                   </div>
//                   <div className="flex flex-col justify-start xs:gap-3 gap-1 text-sm xs:text-[16px] text-white ">
//                     <p>{itemDetails.name}</p>
//                     <p>Quantity : {singleReturn.quantity} Pcs.</p>
//                     {/* <p>Amount Paid: ₹ {singleReturn.price} </p> */}
//                   </div>
//                 </div>
//                 {/* ==================buttons============ */}

//                 <div className="flex xs:flex-col justify-center items-end xs:gap-2 gap-1">
//                   {/* ====== View Product Button ==============  */}

//                   <Link to={`/shop/all/${singleReturn.itemName}`}>
//                     <ButtonTwo text="View Product" />
//                   </Link>

//                   {/* ====== Buy again button ==============  */}
//                   <div
//                     onClick={() => {
//                       dispatch(
//                         addToCart({
//                           productId: itemDetails._id,
//                           quantity: 1,
//                           productName: itemDetails["name-url"],
//                         })
//                       ).then(() => {
//                         dispatch(getAllCartItems());
//                         toast.success("Product added to the Cart");
//                       });
//                     }}
//                   >
//                     <ButtonTwo text="Buy again" />
//                   </div>
//                 </div>
//               </div>

//               {/* horozontal line */}
//               {/* <div className='px-10'>
//                 <div className='w-full h-[1px] bg-gradient-to-r from-[#bdb7a3] to-[#a28223]'></div>
//             </div> */}
//             </div>
//           </div>

//           {/* order footer section  */}
//           <div className=' bg-[#6D613B] '>

//             {/* <div className='text-white xs:px-5 px-1 py-3 xs:text-[16px] text-[12px]'>
//                             <div className='flex justify-between '>
//                                 <p className='text-end '>Sub Total:</p>
//                                 <p> ₹ {order?.subTotal}</p>
//                             </div>

//                             <div className='flex justify-between items-center xs:text-[12px] text-[12px]'>
//                                 <p className='text-end '>Shipping Fee:</p>
//                                 <p> ₹ {order?.shippingFee}</p>
//                             </div>
//                             <div className='flex justify-between items-center xs:text-[20px]  font-semibold'>
//                                 <p className='text-end '>Total Amount Payable:</p>
//                                 <p> ₹ {order?.subTotal + order?.shippingFee}</p>
//                             </div>
//                         </div> */}
//             <div className={`${singleReturn?.returnStatus === 'completed' ? 'bg-[#D3BB71] opacity-35' : 'bg-[#D3BB71] hover:bg-[#e0cf9c] '} `}>
//               <button
//                 className='flex w-full h-full justify-center  py-3 gap-1 items-center'
//                 onClick={showAlert}
//                 disabled={singleReturn?.returnStatus === 'completed'}
//               >
//                 {/* <span> <BsCartX className={`${singleReturn?.returnStatus !== 'requested' ? 'text-red-400' : 'text-red-500'} text-xl  `} /></span> */}
//                 <span className={` `}>Cancel Returning Item</span>
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* alert for cancelling order  */}
//         <Alert
//           isOpen={isAlertOpen}
//           alertMessage="Do You want cancel 'returning the item' ?"
//           hideAlert={hideAlert}
//           handleAction={handleReturnCancel}
//         />
//       </div>
//       {/* order 1 end */}
//     </>
//   );
// };

// export default ReturnedOrder;


import React, { useEffect, useState, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from 'framer-motion';
import axios from "axios";

// Components
import Image from "../image/Image";
import Alert from "../alert/Alert";
import Loader from "../common/Loader";

// Redux actions
import {
  getAllOrders,
} from "../../features/manageOrders/manageOrders";
import { addToCart, getAllCartItems } from "../../features/cart/cart";
import { cancelReturnRequest, getAllReturnItems } from "../../features/manage-returns/manageReturns";

// Icons
import { 
  MdOutlineCancel, 
  MdOutlineFileDownloadDone,
  MdCancel
} from "react-icons/md";
import { 
  GoDotFill, 
  GoPackage, 
  GoCalendar, 
  GoInfo 
} from "react-icons/go";
import { GrInProgress } from "react-icons/gr";
import {  FaEye, FaShoppingCart, FaUndo } from 'react-icons/fa';

// Helper functions
import { getButtonStyles } from '../../helper/helperFunctions';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// Status Configuration
const RETURN_STATUS_CONFIG = {
  requested: {
    icon: <GoDotFill className="text-xl text-[var(--secondary-color)]" />,
    color: "var(--secondary-color)",
    bgColor: "var(--secondary-color)/10",
    label: "Requested"
  },
  rejected: {
    icon: <MdOutlineCancel className="text-xl text-[var(--alert-color)]" />,
    color: "var(--alert-color)",
    bgColor: "var(--alert-color)/10",
    label: "Rejected"
  },
  inProgress: {
    icon: <GrInProgress className="text-sm text-[var(--warning-color)]" />,
    color: "var(--warning-color)",
    bgColor: "var(--warning-color)/10",
    label: "In Progress"
  },
  completed: {
    icon: <MdOutlineFileDownloadDone className="text-xl text-[var(--secondary-color)]" />,
    color: "var(--secondary-color)",
    bgColor: "var(--secondary-color)/10",
    label: "Completed"
  }
};

// Return Status Icon Component
const ReturnStatusIcon = ({ status }) => RETURN_STATUS_CONFIG[status]?.icon || null;

// Enhanced Return Header Component
const ReturnHeader = ({ singleReturn, statusIcon }) => {
  const statusConfig = RETURN_STATUS_CONFIG[singleReturn?.returnStatus];

  const headerItems = [
    {
      icon: GoPackage,
      label: "Order Number",
      value: `#${singleReturn?.invoiceNumber}`,
      className: "flex"
    },
    {
      icon: GoCalendar,
      label: "Return Requested",
      value: new Date(singleReturn?.createdAt).toLocaleDateString(),
      className: "md:flex hidden"
    },
    {
      icon: GoInfo,
      label: "Status",
      value: statusConfig?.label || singleReturn?.returnStatus,
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
      </div>
    </motion.div>
  );
};

const ReturnedOrder = ({ singleReturn }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.returns);
  
  const [itemDetails, setItemDetails] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCurReturnedItem = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${apiUrl}/products/organic-honey/${singleReturn.itemName}`
      );
      if (response.data.product) {
        setItemDetails(response.data.product);
      }
    } catch (error) {
      console.error("Error fetching returned item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnCancel = () => {
    dispatch(cancelReturnRequest(singleReturn._id))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getAllReturnItems());
          dispatch(getAllOrders());
          toast.info('Return request cancelled successfully');
        }
      });
    setIsAlertOpen(false);
  };

  const handleAddToCart = () => {
    if (itemDetails) {
      dispatch(
        addToCart({
          productId: itemDetails._id,
          quantity: 1,
          productName: itemDetails["name-url"],
        })
      ).then(() => {
        dispatch(getAllCartItems());
        toast.success("Product added to the Cart");
      });
    }
  };

  useEffect(() => {
    if (singleReturn.itemName) {
      getCurReturnedItem();
    }
  }, [singleReturn.itemName]);

  if (loading || isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center py-8"
      >
        <Loader height="200px" />
      </motion.div>
    );
  }

  if (!itemDetails) {
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
      link: `/shop/all/${singleReturn.itemName}`,
      variant: "primary"
    },
    {
      icon: FaShoppingCart,
      text: "Buy Again",
      action: handleAddToCart,
      variant: "secondary"
    }
  ];

  const isCompleted = singleReturn?.returnStatus === 'completed';
  const canCancelReturn = singleReturn?.returnStatus === 'requested';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[var(--neutral-color)]/20 mb-6"
    >
      {/* Header */}
      <ReturnHeader
        singleReturn={singleReturn}
        statusIcon={<ReturnStatusIcon status={singleReturn?.returnStatus} />}
      />

      {/* Main Content */}
      <div className="xs:p-6 px-2 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--background-color)] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 xs:p-6 p-2 border border-[var(--neutral-color)]/30"
        >
          {/* Item Description Header */}
          <div className="mb-4">
            <h4 className="text-[var(--text-color)] text-xl font-semibold flex items-center gap-2">
              <FaUndo className="text-[var(--alert-color)]" />
              Return Details
            </h4>
          </div>

          {/* Product Info */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Product Image & Info */}
            <div className="flex flex-row gap-4 flex-1">
              {/* Product Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white shadow-md">
                  <Image
                    src={{
                      sm: Array.isArray(itemDetails?.img) 
                        ? itemDetails?.img.find(path => path.sm?.toLowerCase().includes("front"))?.sm 
                        : null,
                      md: Array.isArray(itemDetails?.img) 
                        ? itemDetails?.img.find(path => path.md?.toLowerCase().includes("front"))?.md 
                        : null,
                      lg: Array.isArray(itemDetails?.img) 
                        ? itemDetails?.img.find(path => path.lg?.toLowerCase().includes("front"))?.lg 
                        : null,
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    alt={itemDetails.name}
                  />
                </div>
                {/* Quantity Badge */}
                <div className="absolute -top-2 -right-2 bg-[var(--alert-color)] text-[var(--text-light-color)] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {singleReturn.quantity}
                </div>
              </motion.div>

              {/* Product Details */}
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-[var(--text-color)] text-lg leading-tight">
                  {itemDetails.name}
                </h3>
                
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--text-color)]/70">Return Quantity:</span>
                    <span className="font-medium text-[var(--alert-color)]">
                      {singleReturn.quantity} {singleReturn.quantity > 1 ? 'Pcs' : 'Pc'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--text-color)]/70">Return Status:</span>
                    <span className={`font-medium capitalize px-2 py-1 rounded-full text-xs`}
                          style={{ 
                            backgroundColor: RETURN_STATUS_CONFIG[singleReturn?.returnStatus]?.bgColor,
                            color: RETURN_STATUS_CONFIG[singleReturn?.returnStatus]?.color
                          }}>
                      {RETURN_STATUS_CONFIG[singleReturn?.returnStatus]?.label || singleReturn?.returnStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[var(--text-color)]/70">Requested Date:</span>
                    <span className="font-medium text-[var(--themeColor)]">
                      {new Date(singleReturn?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 lg:flex-col lg:w-auto w-full">
              {actionButtons.map((button, index) => {
                const ButtonContent = (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={button.action}
                    className={`
                      flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
                      transition-all duration-200 min-w-[120px] lg:min-w-[140px]
                      ${getButtonStyles(button.variant)}
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
        </motion.div>
      </div>

      {/* Footer Section - Cancel Return Button */}
      {canCancelReturn && (
        <div className="border-t border-[var(--neutral-color)]/30">
          <motion.button
            whileHover={{ scale: canCancelReturn ? 1.01 : 1 }}
            whileTap={{ scale: canCancelReturn ? 0.99 : 1 }}
            className={`
              flex w-full justify-center items-center gap-2 py-4 font-medium transition-all duration-300
              ${canCancelReturn 
                ? 'bg-[var(--alert-color)] hover:bg-[var(--alert-color)]/90 text-[var(--text-light-color)]' 
                : 'bg-[var(--neutral-color)]/20 text-[var(--text-color)]/50 cursor-not-allowed'
              }
            `}
            onClick={() => setIsAlertOpen(true)}
            disabled={!canCancelReturn}
          >
            <MdCancel className="w-5 h-5" />
            <span>Cancel Return Request</span>
          </motion.button>
        </div>
      )}

      {/* Completion Message */}
      {isCompleted && (
        <div className="border-t border-[var(--neutral-color)]/30 bg-[var(--secondary-color)]/10">
          <div className="flex justify-center items-center gap-2 py-4 text-[var(--secondary-color)] font-medium">
            <MdOutlineFileDownloadDone className="w-5 h-5" />
            <span>Return Completed Successfully</span>
          </div>
        </div>
      )}

      {/* Cancel Alert */}
      <Alert
        isOpen={isAlertOpen}
        alertMessage="Are you sure you want to cancel this return request? This action cannot be undone."
        hideAlert={() => setIsAlertOpen(false)}
        handleAction={handleReturnCancel}
      />
    </motion.div>
  );
};

export default ReturnedOrder;