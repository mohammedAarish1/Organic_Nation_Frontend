// import React from "react";
// import Logo from "../../components/logo/Logo";
// import { useDispatch, useSelector } from "react-redux";
// import OtpInput from "../../components/otp/OtpInput";
// import { toast } from "react-toastify";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ImSpinner9 } from "react-icons/im";

// // react icons
// import { FaArrowRight } from "react-icons/fa6";
// import { getAllOrders } from "../../features/manageOrders/manageOrders";
// import { getAllCartItems, mergeCart } from "../../features/cart/cart";
// import { handleGoogleSignup, updateUserRegisterStatus, verifyOTP } from "../../features/auth/auth";

// const OtpSubmit = () => {
//   const location = useLocation();
//   const userInfo = location?.state;  // this will contain the data from the previous route
//   const { checkoutStatus } = useSelector((state) => state.orders);
//   const { totalCartAmount, totalTax, couponCodeApplied } = useSelector(state => state.cart)

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { verifyingOTP } = useSelector((state) => state.auth);



//   // below function will fetch the data when the existing user logged in via otp
//   const getDataAfterLogin = () => {
//     dispatch(getAllOrders())
//     const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     if (localCart.length > 0) {
//       const cart = {
//         items: localCart,
//         totalCartAmount: userInfo.totalCartAmount || totalCartAmount,
//         totalTaxes: userInfo.totalTax || totalTax,
//         couponCodeApplied: userInfo.couponCodeApplied || couponCodeApplied
//       }


//       dispatch(mergeCart({ cart })).then(() => {
//         // localStorage.removeItem("cart");
//         dispatch(getAllCartItems());
//         if (checkoutStatus) {
//           navigate("/cart/checkout");
//         } else {
//           navigate("/");
//         }
//       });
//     } else {
//       navigate("/");
//     }

//   };

//   // ======================= otp submission =======================
//   const handleOtpSubmit = (otp) => {
//     if (otp && userInfo) {
//       const payload = {
//         phoneNumber: userInfo.phoneNumber,
//         referralCode: userInfo.referralCode,
//         otp
//       }
//       dispatch(verifyOTP(payload))
//         .then((value) => {
//           if (value.meta.requestStatus === "fulfilled") {
//             const token = value.payload.accessToken;
//             if (token) {
//               getDataAfterLogin();
//             }
//             // =========== below code will be executed when the user login with google ========
//             // else if (signingUpUser.otherDetails && signingUpUser.googleSignup) {
//             //   dispatch(handleGoogleSignup({ userData: signingUpUser.otherDetails, }))
//             //     .unwrap() // This ensures proper error handling
//             //     .then((result) => {
//             //       if (result.accessToken) {
//             //         dispatch(updateUserRegisterStatus(true));
//             //         getDataAfterLogin();
//             //         toast.success("Sign up Successfully");
//             //       }
//             //     })
//             //     .catch((error) => {
//             //       toast.error(error.message || "Sign up failed");
//             //     });

//             // }
//             // ======== this block will execute when the user tries to sign up with otp for the first time ====
//             // else {
//             //   dispatch(updateUserRegisterStatus(false));
//             //   navigate("/register", {
//             //     state: { ...signingUpUser },
//             //   });
//             // }
//           } else {
//             toast.error(value.payload);
//           }
//         }
//         );
//     }
//   };

//   return (
//     <section className="xs:px-10 px-2 pb-20 mt-5 sm:mt-0 font-mono ">
//       <div className="lg:w-[80%] h-auto py-2 mt-10 bg-opacity-35 mx-auto">
//         {/* <h2 className="text- text-center sm:mt-6 mt-10 sm:mb-2 mb-6 text-[var(--bgColorPrimary)] text-2xl tracking-widest ">
//           Log in with OTP
//         </h2> */}
//         <div className="md:w-[90%] py-10 sm:px-0 px-4 flex sm:flex-row flex-col sm:gap-0 gap-6 shadow-md shadow-black justify-center h-[100%] mx-auto  my-auto bg-[var(--bgColorPrimary)] ">
//           {/* ============== right side ================  */}

//           <div className="sm:w-[40%] mt-3 sm:mt-0 flex justify-center items-center">
//             <div className="flex justify-center items-center sm:flex-col gap-3 ">
//               <div>
//                 <Logo />
//               </div>
//               <div className="flex flex-col justify-center items-center">
//                 <span className="sm:text-2xl uppercase text-[var(--bgColorSecondary)]">
//                   Login to
//                 </span>
//                 <span className="sm;text-2xl uppercase text-[var(--bgColorSecondary)]">
//                   Organic Nation
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* ============== left side ================  */}

//           <div className="sm:w-[60%]">
//             <div className="sm:w-[80%]  mx-auto">
//               <div className="flex flex-col gap-5">
//                 <header className="">
//                   <h1 className="text-2xl font-bold mb-1 text-[var(--bgColorSecondary)] tracking-wide">
//                     OTP Verification
//                   </h1>
//                   <p className="text-[15px] text-slate-400">
//                     Enter the 6-digit verification code that was sent to your
//                     phone number.
//                   </p>
//                 </header>
//                 <OtpInput length={6} handleOtpSubmit={handleOtpSubmit} />
//                 <div>
//                   <button
//                     type="submit"
//                     className="p-2 bg-[var(--bgColorSecondary)] text-[#712522] hover:bg-green-500 hover:text-white transition-all duration-300 w-full flex justify-center items-center gap-2 rounded-md "
//                   >
//                     Submit OTP
//                     {verifyingOTP ? (
//                       <ImSpinner9 className="animate-spin" />
//                     ) : (
//                       <FaArrowRight />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OtpSubmit;

