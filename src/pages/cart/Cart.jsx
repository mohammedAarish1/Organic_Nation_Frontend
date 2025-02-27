// import React, { lazy, Suspense, useEffect, useState } from "react";
// // import ProductQty from "../../components/productQty/ProductQty";
// import { useDispatch, useSelector } from "react-redux";
// // react icons
// import { IoIosArrowRoundForward } from "react-icons/io";
// import { BsEmojiAstonished } from "react-icons/bs";
// // import { MdDelete } from "react-icons/md";
// import { FaArrowLeftLong } from "react-icons/fa6";
// // import { ImSpinner9 } from "react-icons/im";
// import { PiSealCheckFill } from "react-icons/pi";
// // product image tempoeary
// import { Link } from "react-router-dom";
// import {
//   getAllCartItems,
//   clearCart,
//   // removeFromCart,
//   // updateQty,
// } from "../../features/cart/cart";
// // import { ErrorMessage, Field, Form, Formik } from "formik";
// // import * as Yup from "yup";
// import {
//   // calculateShippingFee,
//   // checkDeliveryAvailability,
//   setIsAvailable,
// } from "../../features/check-delivery/checkDelivery";
// import { resetCheckoutStatus } from "../../features/manageOrders/manageOrders";
// // import { toast } from "react-toastify";
// import { Tooltip } from "react-tooltip";
// // import OfferBanner from "../../components/offerBanner/OfferBanner";
// import CouponList from "../../components/couponCodeList/CouponList";
// // import Image from '../../components/image/Image';
// // import SingleCartItem from "../../components/module/cart/SingleCartItem";
// // import CheckDeliveryAvailability from "../../components/delivery-availability/CheckDeliveryAvailability";
// const SingleCartItem=lazy(()=>import("../../components/module/cart/SingleCartItem"));
// const CheckDeliveryAvailability = lazy(() => import("../../components/module/cart/CheckDeliveryAvailability"));

// const Cart = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [showCouponCodeList, setShowCouponCodelist] = useState(false);

//   const {
//     cartItemsList,
//     loading,
//     totalCartAmount,
//     totalTax,
//     couponCodeApplied,
//   } = useSelector((state) => state.cart);

//   const dispatch = useDispatch();
//   const MRPTotal = cartItemsList?.reduce((total, product) => {
//     const price = product.price;
//     return Math.round(total + price * product.quantity);
//   }, 0);


//   const totalPickleQuantity = cartItemsList
//     .filter((item) => item.category.includes("Pickles"))
//     .reduce((sum, item) => sum + item.quantity, 0);


//   useEffect(() => {
//     dispatch(setIsAvailable());
//   }, [setIsAvailable]);

//   return (
//     <div>
//       {/* <div>
//         <OfferBanner />
//       </div> */}
//       {totalCartAmount < 399 && totalCartAmount > 0 && (
//         <div className="md:mt-0 mt-5 sm:px-0 px-5 text-center italic text-orange-500 md:text-xl font-sans font-bold">
//           <span>*CASH ON DELIVERY (COD) is available on all orders above  ₹ 399 !</span>
//         </div>
//       )}

//       <div className=" py-10">
//         {/* shopping btn and clear cart  */}
//         <div className="flex justify-between items-center mb-3 lg:w-[80%] w-[90%] mx-auto ">
//           <div>
//             <Link
//               to="/shop/all"
//               className=" flex underline-hover text-[var(--bgColorPrimary)] hover:text-orange-500 justify-center items-center gap-2 py-1   font-semibold rounded-lg  uppercase "
//             >
//               {" "}
//               <FaArrowLeftLong />
//               <span className="text-sm sm:text-[16px]">Continue Shopping</span>
//             </Link>
//           </div>
//           {cartItemsList?.length !== 0 && (
//             <div>
//               <button
//                 className="bg-red-500 text-sm px-4 py-2 text-white hover:bg-red-600"
//                 onClick={() => {
//                   dispatch(clearCart()).then(() => dispatch(getAllCartItems()));
//                   // dispatch(getAllCartItems())
//                 }}
//               >
//                 CLEAR CART
//               </button>
//             </div>
//           )}
//         </div>
//         {/* shopping btn and clear cart end */}
//         <div className="overflow-x-auto lg:w-[80%] w-[90%] mx-auto">
//           <table className="table-auto min-w-full divide-y divide-gray-200">
//             {/*============= heading start ===================== */}
//             <thead className="bg-[var(--bgColorPrimary)] text-white">
//               <tr>
//                 <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider ">
//                   S No.
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider lg:table-cell hidden">
//                   Image
//                 </th>
//                 <th className="px-6  py-3 text-center text-xs font-medium  uppercase tracking-wider">
//                   Products
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider lg:table-cell hidden">
//                   Price
//                 </th>
//                 <th className="px-6 py-3   text-xs font-medium  uppercase tracking-wider">
//                   Quantity
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider ">
//                   Subtotal
//                 </th>
//                 <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
//                   Remove
//                 </th>
//               </tr>
//             </thead>
//             {/*========================== heading start end ========================*/}

//             {/* cart items start */}
//             {/* {cartItems?.map((curItem, index) => (<SingleCartItem key={curItem.productId} curItem={curItem} index={index} />))} */}
//             <Suspense fallback={<tbody className="loader"></tbody>}>
//               {cartItemsList?.map((curItem, index) => (
//                 // <tbody key={curItem._id} className=" divide-y divide-gray-200">
//                 //   <tr>
//                 //     <td className=" text-center whitespace-nowrap ">
//                 //       <div className=" text-gray-900 px-6 py-4 ">{index + 1}.</div>
//                 //     </td>
//                 //     <td className=" text-center whitespace-nowrap lg:table-cell hidden">
//                 //       <Link to={`/shop/${curItem['category-url'].toLowerCase()}/${curItem['name-url']}`}>

//                 //         <div className="font-semibold text-gray-900 px-6 py-4">
//                 //           {/* <img
//                 //             src={
//                 //               Array.isArray(curItem.img) ? curItem.img.filter((path) => path.includes("front") )[0] : null
//                 //             }
//                 //             className="w-20 max-h-24 object-contain"
//                 //             alt={curItem.name}
//                 //           /> */}
//                 //           <Image
//                 //             src={{
//                 //               // sm: leftImage.sm,
//                 //               sm: Array.isArray(curItem.img) ? curItem.img.filter((path) => path.sm.includes("front"))[0].sm : null,
//                 //               md: Array.isArray(curItem.img) ? curItem.img.filter((path) => path.md.includes("front"))[0].md : null,
//                 //               lg: Array.isArray(curItem.img) ? curItem.img.filter((path) => path.lg.includes("front"))[0].lg : null,
//                 //               // md: leftImage.md,
//                 //               // lg: leftImage.lg
//                 //             }}
//                 //             // blurSrc={leftImage.blur}
//                 //             alt={curItem.name}
//                 //             className="w-20 max-h-24 object-contain"
//                 //           />
//                 //         </div>
//                 //       </Link>
//                 //     </td>
//                 //     <td className=" text-center whitespace-nowrap">
//                 //       <Link to={`/shop/${curItem['category-url'].toLowerCase()}/${curItem['name-url']}`}>
//                 //         <div className="font-semibold text-gray-900 px-6 py-4 ">
//                 //           {curItem.name}
//                 //         </div>
//                 //       </Link>
//                 //     </td>
//                 //     <td className="text-center whitespace-nowrap lg:table-cell hidden">
//                 //       <div className=" text-gray-900 px-6 py-4">
//                 //         ₹{" "}
//                 //         {Math.round(
//                 //           curItem.price - (curItem.price * curItem.discount) / 100
//                 //         )}
//                 //       </div>
//                 //     </td>
//                 //     <td className=" text-center   whitespace-nowrap">
//                 //       {/* <div className=" text-gray-900 flex justify-center items-center "><ProductQty qty={curItem.qty} increaseQty={() => dispatch(increaseProductQty(curItem.id))} decreaseQty={() => dispatch(decreaseProductQty(curItem.id))} /></div> */}
//                 //       <div className=" text-gray-900 flex justify-center items-center px-6 py-4">
//                 //         <ProductQty
//                 //           qty={curItem.quantity}
//                 //           increaseQty={() => {
//                 //             if (curItem.quantity === curItem.availability) {
//                 //               toast.error(`No Quanity left in stock.`);
//                 //               return;
//                 //             }
//                 //             dispatch(
//                 //               updateQty({
//                 //                 productName: curItem['name-url'],
//                 //                 type: "increase",
//                 //               })
//                 //             ).then(() => {
//                 //               dispatch(getAllCartItems());
//                 //             });
//                 //           }}
//                 //           decreaseQty={() =>
//                 //             dispatch(
//                 //               updateQty({
//                 //                 productName: curItem['name-url'],
//                 //                 type: "decrease",
//                 //               })
//                 //             ).then(() => {
//                 //               dispatch(getAllCartItems());
//                 //             })
//                 //           }
//                 //         />
//                 //       </div>
//                 //     </td>
//                 //     <td className=" text-center whitespace-nowrap ">
//                 //       <div className=" text-gray-900 px-6 py-4">
//                 //         ₹{" "}
//                 //         {Math.round(
//                 //           (curItem.price -
//                 //             (curItem.price * curItem.discount) / 100) *
//                 //           curItem.quantity
//                 //         )}
//                 //       </div>
//                 //     </td>
//                 //     <td className=" text-center whitespace-nowrap">
//                 //       <button
//                 //         onClick={() => {
//                 //           dispatch(removeFromCart(curItem['name-url'])).then(() =>
//                 //             dispatch(getAllCartItems())
//                 //           );
//                 //         }}
//                 //         className="text-red-500 hover:text-red-700 px-6 py-4 "
//                 //       >
//                 //         <MdDelete className="text-xl" />
//                 //       </button>
//                 //     </td>
//                 //   </tr>
//                 // </tbody>
//                 <SingleCartItem key={curItem._id} curItem={curItem} index={index} />
//               ))}
//             </Suspense>
//             {/* cart items end */}
//           </table>

//           {loading && cartItemsList?.length === 0 && (
//             <div className="flex items-center justify-center sm:text-4xl text-xl mt-5 py-5  w-full">
//               <div className="flex justify-center items-center gap-5">
//                 <p>Loading..</p>
//               </div>
//             </div>
//           )}

//           {/* cart empty message section start */}
//           {cartItemsList?.length === 0 && !loading && (
//             <div className="flex items-center justify-center sm:text-4xl text-xl mt-5 py-5  w-full">
//               <div className="flex justify-center items-center gap-5">
//                 <p>Your Cart is Empty</p>
//                 <span>
//                   {" "}
//                   <BsEmojiAstonished />
//                 </span>
//               </div>
//             </div>
//           )}
//           {/* cart empty message section end */}

//           <div className="w-full h-[1px] bg-[var(--bgColorPrimary)] mt-8"></div>
//         </div>

//         {/*================================ total price section starts =====================*/}
//         <div className="flex  lg:w-[80%] w-[90%] mx-auto mt-10 sm:justify-end justify-center font-sans uppercase text-sm tracking-widest">
//           <div className="bg-[var(--hoverEffect)] flex flex-col  gap-4 p-5 md:w-[35%] ">
//             <div className="flex justify-between items-center gap-10">
//               <span>Grand Total:</span>
//               <span>₹ {Math.round(MRPTotal || 0)}</span>
//             </div>
//             <div className="flex justify-between items-center gap-10 font-semibold">
//               <span>Total Discount (-):</span>
//               <span>₹ ({Math.round(MRPTotal - totalCartAmount || 0)})</span>
//             </div>
//             <div className="flex justify-between items-center gap-10">
//               <span>Order Total:</span>
//               <span className="font-semibold">₹ {Math.round(totalCartAmount || 0)}</span>
//             </div>

//             <CouponList
//               totalCartAmount={totalCartAmount}
//               totalTax={totalTax}
//               setShowCouponCodelist={setShowCouponCodelist}
//               totalPickleQuantity={totalPickleQuantity}
//               couponCodeApplied={couponCodeApplied}
//               showCouponCodeList={showCouponCodeList}
//               showList={() => setShowCouponCodelist(true)}
//               hideList={() => setShowCouponCodelist(false)}

//             />

//             {/* coupon  */}
//             <hr />
//             <div>

//               {totalCartAmount < 499 && totalCartAmount > 0 && (
//                 <div className="text-center mt-2 font-bold">
//                   <p className="text-[12px] text-green-700 capitalize">
//                     ( Add  ₹ <span>{499 - totalCartAmount}</span> worth of products more to get FREE SHIPPING !!)
//                   </p>
//                 </div>
//               )}
//               <div className=" text-green-700 font-bold text-xs">
//                 {couponCodeApplied?.length > 0 && (
//                   <p className="flex  items-center gap-1">
//                     Coupon Code Applied <PiSealCheckFill className="text-xl" />
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* pin code availability check  */}
//             <Suspense fallback={<div className="loader"></div>}>
//               <CheckDeliveryAvailability />
//             </Suspense>
//             {/* <div className="flex flex-col gap-2">
//               <h3>Check Delivery Availability:</h3>
//               <div>
//                 <Formik
//                   initialValues={{ pincode: "" }}
//                   validationSchema={validationSchema}
//                   onSubmit={handleSubmit}
//                 >
//                   {({ }) => (
//                     <Form>
//                       <div className="flex items-center ">
//                         <Field
//                           type="text"
//                           name="pincode"
//                           placeholder="Enter pin code"
//                           className="border border-gray-300 rounded-tl-md rounded-bl-md px-2 py-1 outline-none tracking-wide w-full "
//                         />
//                         <button
//                           type="submit"
//                           className="px-4 py-1 rounded-tr-md rounded-br-md bg-orange-400 hover:bg-orange-500"
//                         >
//                           {checking ? (
//                             <ImSpinner9 className="animate-spin" />
//                           ) : (
//                             "Check"
//                           )}
//                         </button>
//                       </div>
//                       <ErrorMessage
//                         name="pincode"
//                         component="div"
//                         className="text-red-600 text-[14px]"
//                       />
//                       <div className="max-w-1/3">
//                         {isAvailable ? (
//                           <p className="text-center text-green-700 text-[13px] py-1 break-all">
//                             {message}
//                           </p>
//                         ) : (
//                           <p className="text-center text-red-500 text-[13px] py-1 break-all">
//                             {error}
//                           </p>
//                         )}
//                       </div>
//                     </Form>
//                   )}
//                 </Formik>
//               </div>
//             </div> */}
//             {/* chec button  */}
//             <Link
//               to={user ? "/cart/checkout" : "/otp-login"}
//               onClick={() => dispatch(resetCheckoutStatus(true))}
//             >
//               <div
//                 className={`${cartItemsList?.length === 0
//                   ? "bg-green-400"
//                   : " bg-green-500 hover:bg-green-700"
//                   } flex justify-center items-center gap-2    transition-all duration-700 text-white rounded-md`}
//                 data-tooltip-id="checkout-tooltip"
//                 data-tooltip-content="Your cart is Empty !"
//                 data-tooltip-place="bottom"
//               >
//                 <button
//                   type="button"
//                   className="py-3"
//                   disabled={cartItemsList?.length === 0}
//                 >
//                   Proceed to Checkout
//                 </button>
//                 <IoIosArrowRoundForward className="text-3xl" />
//               </div>

//               {/* tooltip  */}

//               {cartItemsList?.length === 0 && (
//                 <Tooltip
//                   id="checkout-tooltip"
//                   style={{
//                     backgroundColor: "gray",
//                     color: "#ffffff",
//                     borderRadius: "10px",
//                     padding: "20px",
//                   }}
//                   place="bottom"
//                   animation="fade"
//                   delayShow={200} // delay before showing in ms
//                   delayHide={300} // delay before hiding in ms
//                 // offset={10} // distance in pixels
//                 // arrow={true}
//                 // arrowColor="#25D366"
//                 ></Tooltip>
//               )}

//               {/* tooltip end */}
//             </Link>
//           </div>
//         </div>
//         {/* total price section end */}
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { lazy, Suspense, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BsEmojiAstonished } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";
import { PiSealCheckFill } from "react-icons/pi";
import { Tooltip } from "react-tooltip";

// Redux actions
import {
  getAllCartItems,
  clearCart,
} from "../../features/cart/cart";
import { setIsAvailable } from "../../features/check-delivery/checkDelivery";
import { resetCheckoutStatus } from "../../features/manageOrders/manageOrders";

// Lazy loaded components
const SingleCartItem = lazy(() => import("../../components/module/cart/SingleCartItem"));
const CheckDeliveryAvailability = lazy(() => import("../../components/module/cart/CheckDeliveryAvailability"));
const CouponList = lazy(() => import("../../components/couponCodeList/CouponList"));

const CartTableHeader = () => (
  <thead className="bg-[var(--bgColorPrimary)] text-white">
    <tr>
      <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">S No.</th>
      <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider lg:table-cell hidden">Image</th>
      <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Products</th>
      <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider lg:table-cell hidden">Price</th>
      <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Quantity</th>
      <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Subtotal</th>
      <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Remove</th>
    </tr>
  </thead>
);

const Cart = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    cartItemsList,
    loading,
    totalCartAmount,
    totalTax,
    couponCodeApplied,
  } = useSelector((state) => state.cart);

  const [showCouponCodeList, setShowCouponCodelist] = React.useState(false);

  // Memoized calculations
  const MRPTotal = useMemo(() => 
    cartItemsList?.reduce((total, product) => (
      Math.round(total + product.price * product.quantity)
    ), 0) || 0
  , [cartItemsList]);

  const totalPickleQuantity = useMemo(() => 
    cartItemsList
      .filter((item) => item.category.includes("Pickles"))
      .reduce((sum, item) => sum + item.quantity, 0)
  , [cartItemsList]);

  const handleClearCart = () => {
    dispatch(clearCart()).then(() => dispatch(getAllCartItems()));
  };

  useEffect(() => {
    dispatch(setIsAvailable());
  }, [dispatch]);

  const renderCartItems = () => (
    <Suspense fallback={<tbody className="loader"></tbody>}>
      {cartItemsList?.map((curItem, index) => (
        <SingleCartItem 
          key={curItem._id} 
          curItem={curItem} 
          index={index} 
        />
      ))}
    </Suspense>
  );

  const renderEmptyCartMessage = () => (
    <div className="flex items-center justify-center sm:text-4xl text-xl mt-5 py-5 w-full">
      <div className="flex justify-center items-center gap-5">
        <p>Your Cart is Empty</p>
        <BsEmojiAstonished />
      </div>
    </div>
  );

  return (
    <div>
      {totalCartAmount < 399 && totalCartAmount > 0 && (
        <div className="md:mt-0 mt-5 sm:px-0 px-5 text-center italic text-orange-500 md:text-xl font-sans font-bold">
          *CASH ON DELIVERY (COD) is available on all orders above ₹ 399!
        </div>
      )}

      <div className="py-10">
        <div className="flex justify-between items-center mb-3 lg:w-[80%] w-[90%] mx-auto">
          <Link
            to="/shop/all"
            className="flex underline-hover text-[var(--bgColorPrimary)] hover:text-orange-500 items-center gap-2 py-1 font-semibold rounded-lg uppercase"
          >
            <FaArrowLeftLong />
            <span className="text-sm sm:text-[16px]">Continue Shopping</span>
          </Link>

          {cartItemsList?.length > 0 && (
            <button
              className="bg-red-500 text-sm px-4 py-2 text-white hover:bg-red-600"
              onClick={handleClearCart}
            >
              CLEAR CART
            </button>
          )}
        </div>

        <div className="overflow-x-auto lg:w-[80%] w-[90%] mx-auto">
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <CartTableHeader />
            {renderCartItems()}
          </table>

          {loading && cartItemsList?.length === 0 && (
            <div className="flex items-center justify-center sm:text-4xl text-xl mt-5 py-5 w-full">
              <div className="flex justify-center items-center gap-5">
                <p>Loading..</p>
              </div>
            </div>
          )}

          {cartItemsList?.length === 0 && !loading && renderEmptyCartMessage()}

          <div className="w-full h-[1px] bg-[var(--bgColorPrimary)] mt-8" />
        </div>

        <div className="flex lg:w-[80%] w-[90%] mx-auto mt-10 sm:justify-end justify-center font-sans uppercase text-sm tracking-widest">
          <div className="shadow-md flex flex-col gap-4 p-5 md:w-[35%]">
            <div className="flex justify-between items-center gap-10">
              <span>Grand Total:</span>
              <span>₹ {Math.round(MRPTotal)}</span>
            </div>
            <div className="flex justify-between items-center gap-10 font-semibold">
              <span>Total Discount (-):</span>
              <span>₹ ({Math.round(MRPTotal - totalCartAmount)})</span>
            </div>
            <div className="flex justify-between items-center gap-10">
              <span>Order Total:</span>
              <span className="font-semibold">₹ {Math.round(totalCartAmount)}</span>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
              <CouponList
                totalCartAmount={totalCartAmount}
                totalTax={totalTax}
                setShowCouponCodelist={setShowCouponCodelist}
                totalPickleQuantity={totalPickleQuantity}
                couponCodeApplied={couponCodeApplied}
                showCouponCodeList={showCouponCodeList}
                showList={() => setShowCouponCodelist(true)}
                hideList={() => setShowCouponCodelist(false)}
              />
            </Suspense>

            <hr />

            {totalCartAmount < 499 && totalCartAmount > 0 && (
              <div className="text-center mt-2 font-bold">
                <p className="text-[12px] text-green-700 capitalize">
                  ( Add ₹ {499 - totalCartAmount} worth of products more to get FREE SHIPPING !!)
                </p>
              </div>
            )}

            {couponCodeApplied?.length > 0 && (
              <div className="text-green-700 font-bold text-xs">
                <p className="flex items-center gap-1">
                  Coupon Code Applied <PiSealCheckFill className="text-xl" />
                </p>
              </div>
            )}

            <Suspense fallback={<div className="loader" />}>
              <CheckDeliveryAvailability />
            </Suspense>

            <Link
              to={user ? "/cart/checkout" : "/otp-login"}
              onClick={() => dispatch(resetCheckoutStatus(true))}
            >
              <div
                className={`flex justify-center items-center gap-2 transition-all duration-700 text-white rounded-md ${
                  cartItemsList?.length === 0
                    ? "bg-green-400"
                    : "bg-gradient-to-r to-green-700 from-[var(--themeColor)] hover:from-green-700 hover:to-green-900"
                }`}
                data-tooltip-id="checkout-tooltip"
                data-tooltip-content="Your cart is Empty!"
                data-tooltip-place="bottom"
              >
                <button
                  type="button"
                  className="py-3"
                  disabled={cartItemsList?.length === 0}
                >
                  Proceed to Checkout
                </button>
                <IoIosArrowRoundForward className="text-3xl" />
              </div>

              {cartItemsList?.length === 0 && (
                <Tooltip
                  id="checkout-tooltip"
                  style={{
                    backgroundColor: "gray",
                    color: "#ffffff",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                  place="bottom"
                  animation="fade"
                  delayShow={200}
                  delayHide={300}
                />
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
