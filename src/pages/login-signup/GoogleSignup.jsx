// import React, { useEffect, useState } from "react";
// import Logo from "../../components/logo/Logo";
// import { useDispatch, useSelector } from "react-redux";
// import { Field, Form, Formik } from "formik";
// import * as Yup from 'yup';


// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { requestOTP } from "../../features/auth/auth";
// import api from "../../config/axiosConfig";
// // import { useHistory } from 'react-router-dom';

// const initialValues = {
//   phoneNumber: "",
//   password: "",
// };


// const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

// export const signUpSchema = Yup.object({
//     phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Please enter your phone number'),
//     password: Yup.string().min(6).required('Please enter your password'),
// })

// const GoogleSignup = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [token, setToken] = useState("");

//   const { user, user_loading, error } = useSelector((state) => state.auth);
//   const { checkoutStatus } = useSelector((state) => state.orders);
//   const {totalCartAmount,totalTax,couponCodeApplied}=useSelector(state=>state.cart)


//   useEffect(() => {
//     // Extract token from URL
//     const query = new URLSearchParams(window.location.search);
//     const token = query.get("token");
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     // setToken(token);
//   }, []);

//   const handleSubmit = (values, action) => {
//     if (values.phoneNumber !== "" && values.password !== "") {
//       let phoneNumber = "+91" + values.phoneNumber;
//       // dispatch the api call function
//       dispatch(requestOTP(phoneNumber)).then((value) => {
//         if (value.meta.requestStatus === "fulfilled") {
//           toast.success(value.payload.message);
//           // setShowOtpInput(true);
//           navigate("/otp-submit", {
//             state: {
//               phoneNumber,
//               otherDetails: values,
//               googleSignup: true,
//               // token: token,
//             },
//           });
//         }
//       });
//     }

//     action.resetForm();
//   };

//   return (
//     <section className="xs:px-10 px-2 pb-20 mt-5 sm:mt-0">
//       <div className="lg:w-[80%] h-auto py-2 bg-opacity-35 mx-auto">
//         <h2 className="text- text-center sm:mt-6 mt-10 sm:mb-2 mb-6 text-[var(--background-color)] ">
//           Please provide your "Phone number" and "Password"
//         </h2>
//         <div className="md:w-[90%] py-10 flex sm:flex-row flex-col sm:gap-0 gap-6 shadow-xl shadow-black justify-center h-[100%] mx-auto  my-auto bg-[var(--background-color)] ">
//           {/* ============== right side ================  */}

//           <div className="sm:w-[40%] mt-3 sm:mt-0 flex justify-center items-center">
//             <div className="flex justify-center items-center sm:flex-col gap-3 ">
//               <div>
//                 <Logo />
//               </div>
//               <div className="flex flex-col justify-center items-center">
//                 <span className="sm:text-2xl uppercase text-[var(--background-color)]">
//                   Login to
//                 </span>
//                 <span className="sm;text-2xl uppercase text-[var(--background-color)]">
//                   Organic Nation
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* ============== left side ================  */}

//           <div className="sm:w-[60%]">
//             <div className="sm:w-[80%]  mx-auto">
//               {/* === Form ===  */}

//               <Formik
//                 initialValues={initialValues}
//                 validationSchema={signUpSchema}
//                 onSubmit={handleSubmit}
//                 validateOnChange={false} // Disable validation on change
//                 validateOnBlur={false} // Disable validation on blur
//               >
//                 {({ values, errors, touched,  }) => (
//                   <Form>
//                     <div className="mb-4">
//                       <label
//                         className="uppercase tracking-widest block text-[var(--background-color)] text-sm font-bold mb-2"
//                         htmlFor="phoneNumber"
//                       >
//                         Phone No.
//                       </label>
//                       <div className="flex  items-center gap-2 border border-[var(--background-color)] ">
//                         <div className="flex justify-center items-center pl-2 pr-1 gap-1 text-[var(--background-color)]">
//                           {/* <FaFlag /> */}
//                           <img
//                             src="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/flag.png"
//                             alt="country_flag"
//                             className="w-8"
//                           />
//                           <span className="shadow appearance-none  bg-[var(--background-color)] text-white w-full py-2 px-  leading-tight focus:outline-none focus:shadow-outline">
//                             +91
//                           </span>
//                         </div>
//                         <Field
//                           className="shadow appearance-none  bg-[var(--background-color)] text-white w-full py-2 px-  leading-tight focus:outline-none focus:shadow-outline"
//                           id="phoneNumber"
//                           type="text"
//                           maxLength={10}
//                           minLength={10}
//                           name="phoneNumber"
//                           // value={values.phoneNumber}
//                           // onChange={handleChange}
//                           // onBlur={handleBlur}
//                         />
//                       </div>
//                       {errors.phoneNumber && touched.phoneNumber ? (
//                         <p className="text-red-600">*{errors.phoneNumber}</p>
//                       ) : null}
//                     </div>

//                     {/* password input  */}
//                     <div className="mb-6">
//                       <label
//                         className="uppercase tracking-widest block text-[var(--background-color)] text-sm font-bold mb-2"
//                         htmlFor="password"
//                       >
//                         Password
//                       </label>
//                       <Field
//                         className="shadow appearance-none border  bg-[var(--background-color)] w-full py-2 px-3 text-white  leading-tight focus:outline-none focus:shadow-outline"
//                         id="password"
//                         type="password"
//                         name="password"
//                         // value={values.password}
//                         // onChange={handleChange}
//                         // onBlur={handleBlur}
//                         // required
//                       />
//                       {errors.password && touched.password ? (
//                         <p className="text-red-600">*{errors.password}</p>
//                       ) : null}
//                       <p className="text-end text-[var(--background-color)] text-[11px] hover:underline cursor-pointer">
//                         Forgot Password
//                       </p>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <button
//                         type="submit"
//                         className="bg-[var(--background-color)] hover:bg-green-700 hover:text-white text-[var(--background-color)] font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
//                       >
//                         {user_loading
//                           ? "Signing Up"
//                           : "Continue with Google Sign up"}
//                       </button>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GoogleSignup;

