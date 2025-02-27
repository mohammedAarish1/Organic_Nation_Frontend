// import React, { useState } from "react";
// import {
//   cancelOrder,
//   getAllOrders,
// } from "../../features/manageOrders/manageOrders";
// import { useDispatch } from "react-redux";
// import SingleOrder from "./SingleOrder";
// import Alert from "../alert/Alert";
// // react icons
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import {  MdOutlineCancel } from "react-icons/md";
// import { GoDotFill } from "react-icons/go";
// import {
//   IoCheckmarkDoneCircleSharp,
//   IoChevronDownOutline,
// } from "react-icons/io5";
// import { BsCartX } from "react-icons/bs";
// import { toast } from "react-toastify";
// import { FaArrowRight } from "react-icons/fa";
// import { PiSealCheckFill } from "react-icons/pi";
// import DeliveryFeedbackForm from "../../helper/DeliveryFeedbackForm";
// import { address } from "../../helper/helperFunctions";

// const Order = ({ order }) => {
//   const statusIcons = {
//     active: <GoDotFill className="text-xl text-green-500" />,
//     completed: (
//       <IoCheckmarkDoneCircleSharp className="text-xl text-green-500" />
//     ),
//     cancelled: <MdOutlineCancel className="text-xl text-red-500" />, // Cancelled icon
//   };

//   const dispatch = useDispatch();
//   const [showOrderDetails, setShowOrderDetails] = useState(false);
//   const [showAllItems, setShowAllItems] = useState(false);
//   const [isAlertOpen, setIsAlertOpen] = useState(false);
//   const [showDeliveryFeedbackForm, setShowDeliveryFeedbackForm] =
//     useState(false);

//   const deliveryDate = new Date(order?.deliveryDate);
//   const isReturnDisabled = deliveryDate && (new Date() - deliveryDate) / (1000 * 60 * 60 * 24) > 3;

//   const showAlert = () => {
//     setIsAlertOpen(true);
//   };

//   const hideAlert = () => {
//     setIsAlertOpen(false);
//   };

//   const handleOrderCancel = () => {
//     // below method will be dipatched on the basis of order status
//     dispatch(cancelOrder(order._id)).then((res) => {
//       if (res.meta.requestStatus === "fulfilled") {
//         dispatch(getAllOrders());
//         toast.info(res.payload);
//       }
//     });
//     // navigate('/manage-orders')

//     setIsAlertOpen(false);
//   };


//   return (
//     <>
//       {/* order 1 start */}
//       <div className="shadow-xl font-mono">
//         <div>
//           {/* order details heading  */}
//           <div className="flex sm:justify-between justify-center items-center bg-[var(--bgColorPrimary)] text-white py-3 px-4 uppercase">
//             <div className="flex justify-start items-center gap-10 ">
//               <div className="lg:block hidden">
//                 <p>Order Number</p>
//                 <p className="text-gray-300 text-sm">#{order?.orderNo}</p>
//               </div>
//               <div className="sm:block hidden">
//                 <p>Date Placed</p>
//                 <p className="text-gray-300 text-sm capitalize">
//                   {new Date(order?.createdAt).toDateString()}
//                 </p>
//               </div>
//               <div className="lg:block hidden">
//                 <p>Payment Method</p>
//                 <p className="text-gray-300 text-sm capitalize">
//                   {order?.paymentMethod}
//                 </p>
//               </div>
//               <div className="sm:block hidden">
//                 <p>Status</p>
//                 <p className="flex justify-center items-center gap-1 text-gray-300 text-sm capitalize">
//                   {order?.orderStatus}{" "}
//                   {statusIcons[order?.orderStatus]
//                     ? statusIcons[order?.orderStatus]
//                     : null}
//                 </p>
//               </div>
//             </div>
//             <div className="flex gap-3 font-mono">
//               <div className="flex gap-3 text-sm xs:text-[16px]">
//                 {/* order detail button  */}
//                 <button
//                   className=" flex  justify-center items-center gap-2 underline underline-offset-2 bg-green-700 xs:px-5 px-2 py-2 rounded-md text-white hover:bg-green-800 xs:text-[16px] text-sm"
//                   onClick={() => setShowOrderDetails(true)}
//                 >
//                   Order Details <FaArrowRight />{" "}
//                 </button>
//                 {/* download invoice button  */}
//                 {/* {order.orderStatus === "completed" && (
//                                     <button className='flex justify-center items-center gap-1 border-green-700 border-2 xs:px-5 px-2 py-2 rounded-md hover:bg-green-800 xs:text-[16px] text-sm'>Download Invoice <MdOutlineFileDownload className='text-xl' /> </button>
//                                 )} */}
//               </div>

//               {/* order details modal  */}
//               <div
//                 className={`modal-background ${showOrderDetails ? "active" : ""
//                   }`}
//                 onClick={() => setShowOrderDetails(false)}
//               >
//                 <div
//                   className={`text-white modal ${showOrderDetails ? "active" : ""
//                     }`}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <p className="flex justify-end">
//                     <IoIosCloseCircleOutline
//                       className="cursor-pointer text-3xl hover:scale-110"
//                       onClick={() => setShowOrderDetails(false)}
//                     />
//                   </p>
//                   <h2 className="text-xl font-medium">Order Details</h2>
//                   <div className="mt-4">
//                     <div className="flex justify-between items-center  border-gray-400 border-b-2 py-2">
//                       <span>Order Status</span>
//                       <span className=" flex justify-center items-center gap-2 text-gray-400">
//                         {order?.orderStatus}{" "}
//                         {statusIcons[order?.orderStatus]
//                           ? statusIcons[order?.orderStatus]
//                           : null}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center  border-gray-400 border-b-2 py-2">
//                       <span>Order Number</span>
//                       <span className="text-gray-400 ">#{order?.orderNo}</span>
//                     </div>
//                     <div className="flex justify-between items-center  border-gray-400 border-b-2 py-2">
//                       <span>Order Date</span>
//                       <span className="text-gray-400 capitalize">
//                         {new Date(order?.createdAt).toDateString()}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center  border-gray-400 border-b-2 py-2">
//                       <span>Email</span>
//                       <span className="text-gray-400 lowercase">
//                         {order?.userEmail}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center  border-gray-400 border-b-2 py-2">
//                       <span>Phone</span>
//                       <span className="text-gray-400">
//                         {order?.receiverDetails.phoneNumber}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center  border-gray-400 border-b-2 py-2">
//                       <span>Payment Method</span>
//                       <span className="text-gray-400">
//                         {order?.paymentMethod}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center  border-gray-400 border-b-2 py-2">
//                       <span>Shipping Address</span>
//                       <span className="text-gray-400 sm:w-1/3 text-end">
//                         {address(order?.shippingAddress)}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center  border-gray-400 border-b-2 py-2">
//                       <span>
//                         Total Price{" "}
//                         <span className="text-sm capitalize">
//                           {" "}
//                           (including shippingFee)
//                         </span>
//                       </span>
//                       <span className="text-gray-400">
//                         ₹{order?.subTotal + order?.shippingFee}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* order details body  */}
//           <div className="   bg-gradient-to-r from-[#6D613B] to-[#D3BB71]">
//             {/* product details  */}
//             {order?.orderDetails.map((curOrder, index) => {
//               return !showAllItems && index !== 0 ? null : (
//                 <div
//                   key={curOrder._id}
//                   className="flex flex-col gap-10 py-7 xs:px-4 px-2"
//                 >
//                   <SingleOrder
//                     curOrder={curOrder}
//                     paymentMethod={order?.paymentMethod}
//                     invoiceNumber={order?.invoiceNumber}
//                     isReturnDisabled={isReturnDisabled}
//                     orderStatus={order.orderStatus}
//                   />
//                 </div>
//               );
//             })}
//             {order?.orderDetails.length > 1 && (
//               <div className="flex justify-center items-center py-4">
//                 <button
//                   className="flex justify-center items-center gap-2 bg-green-700 px-4 py-2 rounded-md text-white transition-all duration-500 hover:tracking-widest"
//                   onClick={() => setShowAllItems(!showAllItems)}
//                 >
//                   {showAllItems ? "Show Less" : "Show All"}{" "}
//                   <IoChevronDownOutline
//                     className={`${showAllItems ? "rotate-180" : ""}`}
//                   />{" "}
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* order footer section  */}
//           <div className=" bg-[#6D613B] ">
//             {/* <p className='flex justify-start items-center xs:gap-2 max-w-max'><span className='xs:text-[16px] text-[12px]'>Payment Done</span> <span><FaCheckCircle className='text-green-600 xs:text-[1rem] text-[15px] ' /> </span></p> */}
//             <div className="text-white xs:px-5 px-1 py-3 xs:text-[16px] text-[12px]">
//               <div className="flex justify-between ">
//                 <p className="text-end ">Grand Total:</p>
//                 <p className="font-semibold">
//                   {" "}
//                   ₹{" "}
//                   {order?.orderDetails.reduce(
//                     (total, item) => total + item.unitPrice * item.quantity,
//                     0
//                   )}
//                 </p>
//               </div>
//               <div className="flex justify-between ">
//                 <p className="text-end "> Discount (-):</p>
//                 <p className="font-semibold">
//                   (₹{" "}
//                   {order?.orderDetails.reduce(
//                     (total, item) => total + item.unitPrice * item.quantity,
//                     0
//                   ) - order.subTotal}
//                   )
//                 </p>
//               </div>
//               {/* <div className="flex justify-between ">
//                 <p className="text-end ">Sub Total:</p>
//                 <p> ₹ {order?.subTotal}</p>
//               </div> */}

//               <div className="flex justify-between items-center">
//                 <p className="text-end ">Shipping Fee (+):</p>
//                 <p> ₹ {order?.shippingFee}</p>
//               </div>
//               <div className="flex justify-between items-center xs:text-[20px]  font-semibold">
//                 <div className="flex items-center gap-2">
//                   <p className=" ">Total Amount Payable:</p>
//                   <div className=" text-green-200 font-bold text-xs sm:block hidden">
//                     {order.couponCodeApplied.length > 0 && (
//                       <p className="flex items-center ">
//                         (Coupon Code Applied) <PiSealCheckFill className="text-xl" />
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <p> ₹ {order?.subTotal + order?.shippingFee}</p>
//               </div>
//               {/* visible in mobile devices */}
//               <div className=" text-green-200 font-bold text-xs sm:hidden block">
//                 {order.couponCodeApplied.length > 0 && (
//                   <p className="flex items-center ">
//                     (Coupon Code Applied) <PiSealCheckFill className="text-xl" />
//                   </p>
//                 )}
//               </div>
//               {/* visible in mobile devices  end*/}

//             </div>

//             {order.orderStatus === "completed" && (
//               <div>
//                 {/* =================== feedback modal ==========  */}
//                 <div
//                   className={`delivery-feedback-modal-bg ${showDeliveryFeedbackForm ? "active" : ""
//                     }`}
//                   onClick={() => setShowDeliveryFeedbackForm(false)}
//                 >
//                   <div
//                     className={`text-white delivery-feedback-modal ${showDeliveryFeedbackForm ? "active" : ""
//                       }`}
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <div className="flex justify-end">
//                       <button>
//                         <IoIosCloseCircleOutline
//                           className="cursor-pointer text-3xl hover:scale-110"
//                           onClick={() => setShowDeliveryFeedbackForm(false)}
//                         />
//                       </button>
//                     </div>
//                     <h2 className="text-xl font-serif">
//                       How's Your Experience with the Delivery Partner ?
//                     </h2>

//                     <DeliveryFeedbackForm
//                       invoiceNumber={order.invoiceNumber}
//                       setShowDeliveryFeedbackForm={setShowDeliveryFeedbackForm}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* cancel button  */}
//             <div
//               className={` ${order?.orderStatus !== "active"
//                   ? "bg-[#D3BB71]"
//                   : "bg-[#D3BB71] hover:bg-[#e0cf9c]"
//                 }  `}
//             >
//               <button
//                 className="flex w-full h-full justify-center  py-3 gap-1 items-center"
//                 onClick={showAlert}
//                 disabled={order?.orderStatus !== "active"}
//               >
//                 <span>
//                   {" "}
//                   <BsCartX
//                     className={`${order?.orderStatus !== "active"
//                         ? "text-red-400"
//                         : "text-red-500"
//                       } text-xl  `}
//                   />
//                 </span>
//                 <span
//                   className={`${order?.orderStatus !== "active" ? "text-gray-400" : ""
//                     } `}
//                 >
//                   Cancel order
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* alert for cancelling order  */}
//         <Alert
//           isOpen={isAlertOpen}
//           alertMessage="Are you sure you want to cancel this order? This action cannot be undone."
//           hideAlert={hideAlert}
//           handleAction={handleOrderCancel}
//         />
//       </div>
//       {/* order 1 end */}
//     </>
//   );
// };

// export default Order;



import React, { lazy, Suspense, useState } from "react";
import { useDispatch } from "react-redux";
import { cancelOrder, getAllOrders } from "../../features/manageOrders/manageOrders";
import SingleOrder from "./SingleOrder";
import Alert from "../alert/Alert";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
// import DeliveryFeedbackForm from "../../helper/DeliveryFeedbackForm";
// import SingleOrderFooterSection from "../module/manage-orders/SingleOrderFooterSection";
// import OrderDetailsModal from "../module/manage-orders/OrderDetailsModal";
const DeliveryFeedbackForm = lazy(() => import("../../helper/DeliveryFeedbackForm"))
const SingleOrderFooterSection = lazy(() => import("../module/manage-orders/SingleOrderFooterSection"));
const OrderDetailsModal = lazy(() => import("../module/manage-orders/OrderDetailsModal"));

// react icons
import { GoDotFill } from "react-icons/go";
import { IoCheckmarkDoneCircleSharp, IoChevronDownOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

const STATUS_ICONS = {
  active: <GoDotFill className="text-xl text-green-500" />,
  completed: <IoCheckmarkDoneCircleSharp className="text-xl text-green-500" />,
  cancelled: <MdOutlineCancel className="text-xl text-red-500" />
};

export const OrderStatusIcon = ({ status }) => STATUS_ICONS[status] || null;



// OrderHeader.js
const OrderHeader = ({ order, onShowDetails, statusIcon }) => {
  const headerItems = [
    { label: "Order Number", value: `#${order?.orderNo}`, className: "lg:block hidden" },
    { label: "Date Placed", value: new Date(order?.createdAt).toDateString(), className: "sm:block hidden" },
    { label: "Payment Method", value: order?.paymentMethod, className: "lg:block hidden" },
    {
      label: "Status",
      value: order?.orderStatus,
      icon: statusIcon,
      className: "sm:block hidden"
    }
  ];

  return (
    <div className="flex sm:justify-between justify-center items-center bg-[var(--bgColorPrimary)] text-white py-3 px-4 uppercase">
      <div className="flex justify-start items-center gap-10">
        {headerItems.map(({ label, value, icon, className }) => (
          <div key={label} className={className}>
            <p>{label}</p>
            <p className="text-gray-300 text-sm capitalize flex items-center gap-1">
              {value} {icon}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-3 font-mono">
        <button
          className="flex justify-center items-center gap-2 underline underline-offset-2 bg-green-700 xs:px-5 px-2 py-2 rounded-md text-white hover:bg-green-800 xs:text-[16px] text-sm"
          onClick={onShowDetails}
        >
          Order Details <FaArrowRight />
        </button>
      </div>
    </div>
  );
};


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

  return (
    <div className="shadow-xl">
      <OrderHeader
        order={order}
        onShowDetails={() => setShowOrderDetails(true)}
        statusIcon={<OrderStatusIcon status={order?.orderStatus} />}
      />

      <div className="">
        {order?.orderDetails.map((curOrder, index) => (
          !showAllItems && index !== 0 ? null : (
            <div key={curOrder._id} className="flex flex-col gap-10 py-7 xs:px-4 px-2">
              <SingleOrder
                curOrder={curOrder}
                paymentMethod={order?.paymentMethod}
                invoiceNumber={order?.invoiceNumber}
                isReturnDisabled={isReturnDisabled}
                orderStatus={order.orderStatus}
              />
            </div>
          )
        ))}

        {order?.orderDetails.length > 1 && (
          <div className="flex justify-center items-center py-4">
            <button
              className="flex justify-center items-center gap-2 bg-green-700 px-4 py-2 rounded-md text-white transition-all duration-500 hover:tracking-widest"
              onClick={() => setShowAllItems(!showAllItems)}
            >
              {showAllItems ? "Show Less" : "Show All"}
              <IoChevronDownOutline className={showAllItems ? "rotate-180" : ""} />
            </button>
          </div>
        )}
      </div>
      <Suspense fallback={<Loader height='150px' />}>
        <SingleOrderFooterSection
          order={order}
          onCancelOrder={() => setIsAlertOpen(true)}
          isActive={order?.orderStatus === "active"}
        />
      </Suspense>


      <Suspense fallback={<Loader height='400px' />}>
        <OrderDetailsModal
          isOpen={showOrderDetails}
          onClose={() => setShowOrderDetails(false)}
          order={order}
          statusIcon={<OrderStatusIcon status={order?.orderStatus} />}
        />
      </Suspense>

      {order.orderStatus === "completed" && (
        <div className="text-end">
          <button
            className="px-2 py-1 underline"
            onClick={() => setShowDeliveryFeedbackForm(true)}
          >
            Delivery Feedback</button>
        </div>
      )}


      {showDeliveryFeedbackForm && (
        <div className="delivery-feedback-modal-bg active">
          <div className="text-white delivery-feedback-modal active">
            <div className="flex justify-end">
              <button onClick={() => setShowDeliveryFeedbackForm(false)}>
                <IoIosCloseCircleOutline className="cursor-pointer text-3xl hover:scale-110" />
              </button>
            </div>
            <h2 className="text-xl font-serif">
              How's Your Experience with the Delivery Partner?
            </h2>
            <Suspense fallback={<Loader height='400px' />}>
              <DeliveryFeedbackForm
                invoiceNumber={order.invoiceNumber}
                setShowDeliveryFeedbackForm={setShowDeliveryFeedbackForm}
              />
            </Suspense>
          </div>
        </div>
      )}

      <Alert
        isOpen={isAlertOpen}
        alertMessage="Are you sure you want to cancel this order? This action cannot be undone."
        hideAlert={() => setIsAlertOpen(false)}
        handleAction={handleOrderCancel}
      />
    </div>
  );
};

export default Order;