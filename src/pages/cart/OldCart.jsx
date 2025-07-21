// import React, { lazy, Suspense, useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import { BsEmojiAstonished } from "react-icons/bs";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { PiSealCheckFill } from "react-icons/pi";
// import { Tooltip } from "react-tooltip";

// // Redux actions
// import {
//   getAllCartItems,
//   clearCart,
// } from "../../features/cart/cart";
// import { setIsAvailable } from "../../features/check-delivery/checkDelivery";
// import { resetCheckoutStatus } from "../../features/manageOrders/manageOrders";
// import CheckoutModal from "../../components/CheckoutModal";
// import OrderSuccessMessage from "../../components/checkout/OrderSuccessMessage";
// import CartNotificationExample from "../../components/module/cart/CartNotification";
// import ShoppingCart from "./Cart";

// // Lazy loaded components
// const SingleCartItem = lazy(() => import("../../components/module/cart/SingleCartItem"));
// const CheckDeliveryAvailability = lazy(() => import("../../components/module/cart/CheckDeliveryAvailability"));
// const CouponList = lazy(() => import("../../components/couponCodeList/CouponList"));

// const CartTableHeader = () => (
//   <thead className="bg-[var(--bgColorPrimary)] text-white">
//     <tr>
//       <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">S No.</th>
//       <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider lg:table-cell hidden">Image</th>
//       <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Products</th>
//       <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider lg:table-cell hidden">Price</th>
//       <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Quantity</th>
//       <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Subtotal</th>
//       <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Remove</th>
//     </tr>
//   </thead>
// );

// const OldCart = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
//   const {
//     cartItemsList,
//     loading,
//     totalCartAmount,
//     totalTax,
//     couponCodeApplied,
//   } = useSelector((state) => state.cart);

//   const [showCouponCodeList, setShowCouponCodelist] = React.useState(false);

//   // Memoized calculations
//   const MRPTotal = useMemo(() =>
//     cartItemsList?.reduce((total, product) => (
//       Math.round(total + product.price * product.quantity)
//     ), 0) || 0
//     , [cartItemsList]);

//   const totalPickleQuantity = useMemo(() =>
//     cartItemsList
//       .filter((item) => item.category.includes("Pickles"))
//       .reduce((sum, item) => sum + item.quantity, 0)
//     , [cartItemsList]);

//   const handleClearCart = () => {
//     dispatch(clearCart()).then(() => dispatch(getAllCartItems()));
//   };

//   useEffect(() => {
//     dispatch(setIsAvailable());
//   }, [dispatch]);

//   const renderCartItems = () => (
//     <Suspense fallback={<tbody className="loader"></tbody>}>
//       {cartItemsList?.map((curItem, index) => (
//         <SingleCartItem
//           key={curItem._id}
//           curItem={curItem}
//           index={index}
//         />
//       ))}
//     </Suspense>
//   );

//   const renderEmptyCartMessage = () => (
//     <div className="flex items-center justify-center sm:text-4xl text-xl mt-5 py-5 w-full">
//       <div className="flex justify-center items-center gap-5">
//         <p>Your Cart is Empty</p>
//         <BsEmojiAstonished />
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       {totalCartAmount < 399 && totalCartAmount > 0 && (
//         <div className="md:mt-0 mt-5 sm:px-0 px-5 text-center italic text-orange-500 md:text-xl font-sans font-bold">
//           *CASH ON DELIVERY (COD) is available on all orders above ₹ 399!
//         </div>
//       )}

//       <div className="py-10">
//         <div className="flex justify-between items-center mb-3 lg:w-[80%] w-[90%] mx-auto">
//           <Link
//             to="/shop/all"
//             className="flex underline-hover text-[var(--bgColorPrimary)] hover:text-orange-500 items-center gap-2 py-1 font-semibold rounded-lg uppercase"
//           >
//             <FaArrowLeftLong />
//             <span className="text-sm sm:text-[16px]">Continue Shopping</span>
//           </Link>

//           {cartItemsList?.length > 0 && (
//             <button
//               className="bg-red-500 text-sm px-4 py-2 text-white hover:bg-red-600"
//               onClick={handleClearCart}
//             >
//               CLEAR CART
//             </button>
//           )}
//         </div>

//         <div className="overflow-x-auto lg:w-[80%] w-[90%] mx-auto">
//           <table className="table-auto min-w-full divide-y divide-gray-200">
//             <CartTableHeader />
//             {renderCartItems()}
//           </table>

//           {loading && cartItemsList?.length === 0 && (
//             <div className="flex items-center justify-center sm:text-4xl text-xl mt-5 py-5 w-full">
//               <div className="flex justify-center items-center gap-5">
//                 <p>Loading..</p>
//               </div>
//             </div>
//           )}

//           {cartItemsList?.length === 0 && !loading && renderEmptyCartMessage()}

//           <div className="w-full h-[1px] bg-[var(--bgColorPrimary)] mt-8" />
//         </div>

//         {cartItemsList?.length !== 0 && (
//           <div className="flex lg:w-[80%] w-[90%] mx-auto mt-10 sm:justify-end justify-center font-sans uppercase text-sm tracking-widest">
//             <div className="shadow-md flex flex-col gap-4 p-5 md:w-[35%]">
//               <div className="flex justify-between items-center gap-10">
//                 <span>Grand Total:</span>
//                 <span>₹ {Math.round(MRPTotal)}</span>
//               </div>
//               <div className="flex justify-between items-center gap-10 font-semibold">
//                 <span>Total Discount (-):</span>
//                 <span>₹ ({Math.round(MRPTotal - totalCartAmount)})</span>
//               </div>
//               <div className="flex justify-between items-center gap-10">
//                 <span>Order Total:</span>
//                 <span className="font-semibold">₹ {Math.round(totalCartAmount)}</span>
//               </div>

//               <hr />

//               {totalCartAmount < freeShippingEligibleAmt && totalCartAmount > 0 && (
//                 <div className="text-center mt-2 font-bold">
//                   <p className="text-[12px] text-green-700 capitalize">
//                     ( Add ₹ {freeShippingEligibleAmt - totalCartAmount} worth of products more to get FREE SHIPPING !!)
//                   </p>
//                 </div>
//               )}

//               {couponCodeApplied?.length > 0 && (
//                 <div className="text-green-700 font-bold text-xs">
//                   <p className="flex items-center gap-1">
//                     Coupon Code Applied <PiSealCheckFill className="text-xl" />
//                   </p>
//                 </div>
//               )}

//               <Suspense fallback={<div className="loader" />}>
//                 <CheckDeliveryAvailability />
//               </Suspense>

//               <button
//                 type="button"
//                 className={`py-1 flex justify-center items-center gap-2 transition-all duration-700 text-white rounded-md ${cartItemsList?.length === 0
//                   ? "bg-green-400"
//                   : " hover:bg-[var(--accent-color)] bg-custom-gradient hover:brightness-110"
//                   }`}
//                 onClick={() => setIsCheckoutOpen(true)}
//               >CHECKOUT  <IoIosArrowRoundForward className="text-3xl" /></button>
//             </div>
//           </div>
//         )}
//       </div>
//       <CheckoutModal
//         isOpen={isCheckoutOpen}
//         onClose={() => setIsCheckoutOpen(false)}
//       />

//     </div>
//   );
// };

// export default OldCart;
