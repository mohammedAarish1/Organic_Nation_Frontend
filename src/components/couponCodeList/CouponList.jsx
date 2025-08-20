// import React, { useEffect, useRef } from "react";
// // react icnons
// import { RiDiscountPercentLine } from "react-icons/ri";
// import {
//   applyAdditionalCouponDiscount,
//   applyPickleCouponCode,
//   applyReferralCouponDiscount,
//   getAllCartItems,
//   applyFamilyCouponCode,
// } from "../../features/cart/cart";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { Field, Form, Formik } from "formik";
// import { ImSpinner9 } from "react-icons/im";
// import {  FaTags,  } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import api from "../../config/axiosConfig";
// import PersoanlCouponCard from "../user-profile-comp/PersoanlCouponCard";



// const CouponList = ({
//   totalCartAmount,
//   totalTax,
//   setShowCouponCodelist,
//   totalPickleQuantity,
//   couponCodeApplied,
//   showCouponCodeList,
//   showList,
//   hideList
// }) => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const modalRef = useRef();

//   // const [isPickleCodeApplied, setPickleCodeApplied] = useState(false);
//   // const [isAdditionalDiscountCodeApplied, setAdditionalDiscountCodeApplied] = useState(false);
//   const { cartItems,  error } = useSelector(state => state.cart);


//   const hasPickleCoupon = couponCodeApplied?.some((coupon) => coupon.name === "PickleCoupon") || false;
//   const hasAdditionalCoupon = couponCodeApplied?.some((coupon) => coupon.name === "Additinal_10%_Discount") || false;


//   const handleClickOutside = (event) => {
//     if (modalRef.current && !modalRef.current.contains(event.target)) {
//       // setSelectedOrder(null);
//       // setShowCouponCodelist(false);
//       hideList();
//     }
//   };


//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // 45% coupon code validation
//   const handleFamilyDiscountCoupon = () => {
//     // const items = cartItemsList.map(item => ({ id: item._id, quantity: item.quantity }));
//     const payload = { phoneNumber: user ? user.phoneNumber : '', couponCode: 'FFNEW45' };

//     dispatch(applyFamilyCouponCode(payload))
//       .unwrap()
//       .then((result) => {
//         dispatch(getAllCartItems());

//         // sessionStorage.setItem('ccToken', JSON.stringify(result.validationToken))
//         toast.success("Coupon Code successfully applied !");
//         action.resetForm();
//         // Handle successful validation here
//       })
//       .catch((error) => {
//         toast.error(error || "Coupon Code is not valid !");
//         // Handle validation error here
//       });

//   };


//   // pickle coupon code
//   const handleCouponCodeValidation = () => {
//     let payload;
//     if (user) {
//       const cart = {
//         items: cartItems,
//         totalCartAmount,
//         totalTaxes: totalTax,
//         couponCodeApplied,
//       };
//       payload = { cart, phoneNumber: user.phoneNumber, couponCode: "BUY4PICKLE" };
//     } else {
//       const localCart = JSON.parse(localStorage.getItem("cart")) || [];
//       let cart = {};
//       if (localCart?.length > 0) {
//         cart = {
//           items: localCart,
//           totalCartAmount,
//           totalTaxes: totalTax,
//           couponCodeApplied,
//         };
//       }
//       payload = { cart, phoneNumber: null, couponCode: "BUY4PICKLE" };
//     }

//     dispatch(applyPickleCouponCode(payload))
//       .unwrap()
//       .then((result) => {
//         if (user) {

//           dispatch(getAllCartItems());
//         }
//         setShowCouponCodelist(false);

//         toast.success("Coupon Code successfully applied !");
//         // Handle successful validation here
//       })
//       .catch((error) => {
//         toast.error(error || "Coupon Code is not valid !");
//         // Handle validation error here
//       });




//   };

//   // additional 10% off coupon handler function
//   const handleAdditionalDiscountCoupon = () => {
//     let payload;
//     if (user) {
//       const cart = {
//         items: cartItems,
//         totalCartAmount,
//         totalTaxes: totalTax,
//         couponCodeApplied,
//       };
//       payload = { cart, phoneNumber: user.phoneNumber, couponCode: "FOODSBAY5YEARS" };
//     } else {
//       const localCart = JSON.parse(localStorage.getItem("cart")) || [];
//       let cart = {};
//       if (localCart?.length > 0) {
//         cart = {
//           items: localCart,
//           totalCartAmount,
//           totalTaxes: totalTax,
//           couponCodeApplied,
//         };
//       }
//       payload = { cart, phoneNumber: null, couponCode: "FOODSBAY5YEARS" };
//     }

//     dispatch(applyAdditionalCouponDiscount(payload))
//       .unwrap()
//       .then((result) => {
//         if (user) {

//           dispatch(getAllCartItems());
//         }
//         setShowCouponCodelist(false);

//         toast.success("Coupon Code successfully applied !");
//         // Handle successful validation here
//       })
//       .catch((error) => {
//         toast.error(error || "Not Eligible");
//         // Handle validation error here
//       });



//   };

//   // referral code discount handler function
//   const handleReferralCodeDiscount = (couponId) => {
//     if (user) {
//       // const cart = {
//       //   items: cartItems,
//       //   totalCartAmount,
//       //   totalTaxes: totalTax,
//       //   couponCodeApplied,
//       // };
//       const payload = { phoneNumber: user.phoneNumber, couponId };
//       dispatch(applyReferralCouponDiscount(payload))
//         .unwrap()
//         .then((result) => {
//           dispatch(getAllCartItems());
//           setShowCouponCodelist(false);

//           toast.success("Coupon Code successfully applied !");
//           // Handle successful validation here
//         })
//         .catch((error) => {
//           toast.error(error || "Not Eligible");
//           // Handle validation error here
//         });
//     }

//   };


//   // Map to match coupon codes to functions
//   const couponCodeHandlers = {
//     "FFNEW45": handleFamilyDiscountCoupon,
//     "BUY4PICKLES": handleCouponCodeValidation,
//     "FOODSBAY5YEARS": handleAdditionalDiscountCoupon,
//   };

//   const handleCouponCodeSubmit = async (values, { setSubmitting }) => {
//     if (values.couponCode !== '') {
//       // Get the coupon handler based on the entered coupon code
//       const couponHandler = couponCodeHandlers[values.couponCode.trim().toUpperCase()];

//       if (couponHandler) {
//         // Call the respective function based on the coupon code
//         couponHandler();
//       } else {
//         if (user) {
//           try {
//             const response = await api.get(`/api/validate/coupon/${values.couponCode.trim()}`);
//             if (response.status === 200) {
//               const couponId = response.data._id;
//               handleReferralCodeDiscount(couponId)
//             } else {
//               toast.error('Invalid coupon code')
//             }
//           } catch (error) {
//             toast.error(error.response?.data?.message)
//             throw error;
//           }
//         } else {
//           toast.error('Invalid Coupon code')
//         }
//       }
//     } else {
//       toast.error('Please Provide a valid Coupon Code')
//     }
//     setSubmitting(false);

//   };

//   // useEffect(() => {
//   //   if (couponCodeApplied?.length > 0) {
//   //     const hasPickleCoupon = couponCodeApplied?.some((coupon) => coupon.name === "PickleCoupon") || false;
//   //     setPickleCodeApplied(hasPickleCoupon);
//   //     const hasAdditionalCoupon = couponCodeApplied?.some((coupon) => coupon.name === "Additinal_10%_Discount") || false;
//   //     setAdditionalDiscountCodeApplied(hasAdditionalCoupon);
//   //   }
//   // }, [couponCodeApplied, dispatch]);


//   return (

//     <div className="">
//       <div className="flex justify-center items-center gap-1 mt-3 text-green-700 text-xl">
//         <FaTags />
//         <button
//           className="glowing-text hover:underline underline-offset-2"
//           onClick={showList}
//         >
//           See Available Coupons!
//         </button>
//       </div>
//       {/* pop up box  */}
//       {showCouponCodeList && (
//         <div className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center z-40 ">
//           <div
//             ref={modalRef}
//             className="bg-[var(--bgColorSecondary)] shadow-lg rounded-lg max-w-xl pt-2 pb-6 px-4 w-full max-h-[80vh] overflow-y-auto mx-5 "
//           >

//             <div className="capitalize flex flex-col gap-4 font-serif xs:text-sm text-[10px] text-[var(--themeColor)]">
//               <div>
//                 <h3 className="">Coupons</h3>
//                 <span className="text-xs text-gray-600">
//                   Cart Value: ₹{totalCartAmount}
//                 </span>
//               </div>

//               {/* 45% discount coupon for family friends  */}
//               <div>
//                 <Formik
//                   initialValues={{ couponCode: "" }}
//                   // validationSchema={handleCouponCodeValidation}
//                   // onSubmit={handleFamilyDiscountCoupon} 
//                   onSubmit={handleCouponCodeSubmit}
//                 >
//                   {({ isSubmitting }) => (
//                     <Form>
//                       <div
//                         className="flex items-center gap-4 xs:px-2"

//                       >
//                         <Field
//                           type="text"
//                           name="couponCode"
//                           placeholder="Enter Coupon code"
//                           className="border border-gray-300 -md  px-2 py-1 outline-none tracking-wide w-full  "
//                         />
//                         <button
//                           type="submit"
//                           className={`px-6 py-1 -md bg-green-400 hover:bg-green-600 `}
//                         // disabled={!user || totalCartAmount < 1000}
//                         >
//                           {isSubmitting ? (
//                             <ImSpinner9 className="animate-spin" />
//                           ) : (
//                             "Apply"
//                           )}
//                         </button>
//                       </div>

//                     </Form>
//                   )}
//                 </Formik>
//               </div>


//               {/* 45% discount coupon for family friends  */}
//               <div>
//                 <p className="pb-2">Available Coupons:</p>
//                 <div className="flex flex-col gap-6">
//                   {/* pickle coupon */}
//                   <section className="border rounded-md px-2 py-4 shadow-inner shadow-gray-600">
//                     <div className="flex-col flex gap-2">
//                       <div className="flex justify-between ">
//                         <span className="flex items-center gap-2 font-bold">
//                           <RiDiscountPercentLine className="text-2xl text-green-500" />{" "}
//                           BUY4PICKLES
//                         </span>
//                         <button
//                           className={`bg-green-400 xs:px-6 px-3 xs:py-2 py-1  ${hasPickleCoupon ? 'opacity-60' : 'hover:bg-green-600'} `}
//                           onClick={handleCouponCodeValidation}
//                           disabled={hasPickleCoupon}
//                         >
//                           {hasPickleCoupon ? "Applied" : " Apply"}
//                         </button>
//                       </div>
//                       <div>
//                         <p>Get Any Four Pickles at Flat ₹999</p>
//                         <p className="text-gray-500 xs:text-xs mt-2">
//                           {totalPickleQuantity < 4 &&
//                             "*Please pick at least four pickles to avail this offer !"}
//                         </p>
//                       </div>
//                     </div>
//                   </section>
//                   {/* pickle coupon end */}


//                   {/* extra 10% coupon box  */}
//                   <section className="border rounded-md px-2 py-4 shadow-inner shadow-gray-600">
//                     <div className="flex-col flex gap-2">
//                       <div className="flex justify-between ">
//                         <span className="flex items-center gap-2 font-bold">
//                           <RiDiscountPercentLine className="text-2xl text-green-500 " />
//                           FOODSBAY5YEARS
//                         </span>
//                         <button
//                           className={`bg-green-400  xs:px-6 px-3 xs:py-2 py-1 ${hasAdditionalCoupon ? 'opacity-60' : 'hover:bg-green-600'}`}
//                           onClick={handleAdditionalDiscountCoupon}
//                           disabled={hasAdditionalCoupon}
//                         >
//                           {hasAdditionalCoupon ? "Applied" : " Apply"}
//                           {/* {couponCodeApplied?.some((coupon) => coupon.name === "Additinal_10%_Discount") ? "Applied" : " Apply"} */}
//                         </button>
//                       </div>
//                       <div>
//                         <p>Get additional 10% off on all orders above ₹ 1299</p>
//                         <p className="text-gray-500 text-xs mt-2">
//                           {totalCartAmount < 1299 &&
//                             "*Please add products worth ₹ 1299 or more"}
//                         </p>
//                       </div>
//                     </div>
//                   </section>
//                   {/* extra 10% coupon */}
//                   {/* =======  personal coupons ======= */}
//                   <section className='flex flex-col flex-wrap gap-3'>
//                     {!user && (
//                       <div className="flex items-center gap-3 bg-green-400 p-2 rounded-md text-[10px]">
//                         <p className="">Please log in to view your rewarded coupons.</p>
//                         <Link to='/register' className="font-bold underline underline-offset-2 min-w-20">Log in</Link>
//                       </div>
//                     )}
//                     {user?.referralCoupons?.length === 0 && (
//                       <div className=' xs:min-h-10   text-center'>
//                         <h2 className="xs:text-lg font-bold mb-4 italic ">Earn more Coupons !!</h2>
//                       </div>

//                     )}
//                     {user?.referralCoupons?.map(coupon => (
//                       <PersoanlCouponCard
//                         key={coupon._id}
//                         coupon={coupon}
//                         handleAction={() => handleReferralCodeDiscount(coupon.couponId)}
//                       // handleRemoveCoupon={handleCoupon}
//                       />
//                     ))}
//                     <Link
//                       to="/profile/coupons"
//                       className="py-2 bg-gray-300 w-full text-center rounded-lg"
//                     >🎉 Refer a Friend & Earn a ₹100 Coupon! 🎉 Share Now !</Link>
//                   </section>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CouponList;
