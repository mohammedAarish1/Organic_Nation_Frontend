import React, { useState } from "react";
import Logo from "../../components/logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllOrders } from "../../features/manageOrders/manageOrders";
import { Formik, Form, Field } from "formik";
import { signUpSchema } from "../../form-validation/signUpSchema";
import { loginSchema } from "../../form-validation/loginSchema";
import Alert from "../../components/alert/Alert";
import { getAllCartItems, mergeCart } from "../../features/cart/cart";
// import OtpInput from '../../components/otp/OtpInput';
// react icons
import { FcGoogle, FcIphone } from "react-icons/fc";
import { ImSpinner9 } from "react-icons/im";
import { FaArrowRight } from "react-icons/fa";
import { fetchDataAfterLogin } from "../../helper/helperFunctions";
import {  login, signup, updateUserRegisterStatus } from "../../features/auth/auth";

const Auth = () => {
  // belo code is for handling the navigation after otp verified by the user (extracting phone number)
  const location = useLocation();
  const signingUpUser = location?.state; // we will get this data when user tries to sign up with otp
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [showOtpInput, setShowOtpInput] = useState(true);
  // const [userRegistered, setuserRegistered] = useState(otpUser && userSignedUpSuccessfully === null ? false : true);
  // const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { checkoutStatus } = useSelector((state) => state.orders);
  const { user, user_loading, error, userRegistered } = useSelector( (state) => state.auth );

  const {totalCartAmount,totalTax,couponCodeApplied}=useSelector(state=>state.cart);
  const localCart=JSON.parse(localStorage.getItem('cart'))



  

  const initialValues = {
    firstName: "",
    lastName: "",
    userId: "",
    email: "",
    phoneNumber: signingUpUser ? signingUpUser?.phoneNumber : "",
    password: "",
    // password: '',
    // confirm_password: ''
  };

  // const hideAlert = () => {
  //   setIsAlertOpen(false);
  //   localStorage.removeItem("cart");
  //   if (checkoutStatus) {
  //     navigate("/cart/checkout");
  //   } else {
  //     navigate("/");
  //   }
  // };

  // const handleCartMerge = (action) => {
  //   const localCart = JSON.parse(localStorage.getItem("cart"));
  //   // setIsAlertOpen(false);
  //   dispatch(mergeCart({ localCart })).then(() => {
  //     setIsAlertOpen(false);
  //     localStorage.removeItem("cart");
  //     dispatch(getAllCartItems());
  //     if (checkoutStatus) {
  //       navigate("/cart/checkout");
  //     } else {
  //       navigate("/");
  //     }
  //   });
  // };

  const handleOtpLogin=()=>{
    navigate('/otp-login', {
      state: { totalCartAmount,totalTax,couponCodeApplied },
    })
  }

  const handleSubmit = (values, action) => {
    if (!userRegistered) {
      dispatch(signup(values))
      .unwrap() 
      .then((res) => {
        if (res.accessToken) {
          // dispatch(updateUserRegisterStatus(true));
          let cart;
          if(localCart.length>0){
             cart={
              items:localCart,
              totalCartAmount:signingUpUser?.totalCartAmount,
              totalTaxex:signingUpUser?.totalTax,
              couponCodeApplied,
            }
          }
          fetchDataAfterLogin(
            dispatch,
            navigate,
            cart,
            checkoutStatus
          );
          toast.success("Sign up Successfully");
        }
      });
    } else {
      if (values.userId && values.password) {
        const credentials = { userId: values.userId, password: values.password };
        dispatch(login(credentials))
        .unwrap() 
        .then((res) => {
          if (res.accessToken) {
            let cart;
            if(localCart?.length>0){
               cart={
                items:localCart,
                totalCartAmount,
                totalTaxex:totalTax,
                couponCodeApplied,
              }
            }

            fetchDataAfterLogin(
              dispatch,
              navigate,
              cart,
              checkoutStatus
            );
            toast.success("Log in Successfully");
          }  else {
            toast.error('User Not Found');
          }
        })
        // .catch(()=>{
        //   toast.error('Invalid Credentials')
        // })
      }
    }

    action.resetForm();
  };

 

  return (
    <section className="xs:px-10 px-2 pb-20 mt-5 sm:mt-0 font-serif">
      <div className="lg:w-[80%] h-auto py-2 bg-opacity-35 mx-auto">
        {signingUpUser ? (
          <p className="text-center">
            *Please provide us the following details to complete the signing up
            process*
          </p>
        ) : (
          <h2 className="text-4xl text-center sm:mt-6 mt-10 sm:mb-2 mb-6 text-[var(--themeColor)] ">
            {userRegistered ? "Welcome Back !" : "Create Your Account"}
          </h2>
        )}

        <div className="md:w-[90%] py-10 flex sm:flex-row flex-col sm:gap-0 gap-6 shadow-md shadow-black justify-center h-[100%] mx-auto  my-auto bg-gradient-to-r from-[#6D613B] to-[#D3BB71]  ">
          {/* ============== right side ================  */}

          <div className="sm:w-[40%] mt-3 sm:mt-0 flex justify-center items-center ">
            <div className="flex justify-center items-center sm:flex-col gap-3 ">
              <div>
                <Logo />
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="sm:text-2xl uppercase text-[var(--bgColorSecondary)]">
                  {!userRegistered ? "Sign up to" : "Log in"}
                </span>
                <span className="sm;text-2xl uppercase text-[var(--bgColorSecondary)]">
                  Organic Nation
                </span>
              </div>
            </div>
          </div>

          {/* ============== left side ================  */}

          <div className="sm:w-[60%] text-[var(--themeColor)]">
            <div className="sm:w-[80%]  mx-auto">
              <h2 className="px-8 mb-2  text-3xl">
                {!userRegistered ? "Sign up" : "Log in"}
              </h2>

              {/* <p>Please fill in the below details and get registered.</p> */}

              {/* === Form ===  */}
              <Formik
                initialValues={initialValues}
                validationSchema={!userRegistered ? signUpSchema : loginSchema}
                onSubmit={handleSubmit}
                validateOnChange={false} // Disable validation on change
                validateOnBlur={false} // Disable validation on blur
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form className="  rounded px-8 pt-6 pb-2 mb-4">
                    {/* firstName input  */}
                    {!userRegistered && (
                      <div className="mb-4">
                        <label
                          className="uppercase tracking-widest block text-[var(--themeColor)] text-sm font-bold mb-2"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <Field
                          className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3  tracking-widest leading-tight focus:outline-none focus:shadow-outline"
                          id="firstName"
                          type="text"
                          name="firstName"
                        />
                        {errors.firstName && touched.firstName ? (
                          <p className="text-red-600">*{errors.firstName}</p>
                        ) : null}
                      </div>
                    )}
                    {/* lastName input  */}
                    {!userRegistered && (
                      <div className="mb-4">
                        <label
                          className="uppercase tracking-widest block text-[var(--themeColor)] text-sm font-bold mb-2"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <Field
                          className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3 tracking-widest leading-tight focus:outline-none focus:shadow-outline"
                          id="lastName"
                          type="text"
                          name="lastName"
                        />
                        {errors.lastName && touched.lastName ? (
                          <p className="text-red-600">*{errors.lastName}</p>
                        ) : null}
                      </div>
                    )}

                    {/* userId--- email or phone  */}
                    {userRegistered && (
                      <div className="mb-4">
                        <label
                          className="uppercase tracking-widest block text-[var(--themeColor)] text-sm font-bold mb-2"
                          htmlFor="userId"
                        >
                          User ID
                        </label>
                        <Field
                          className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3  tracking-widest leading-tight focus:outline-none focus:shadow-outline"
                          id="userId"
                          type="text"
                          name="userId"
                          placeholder="Email or Phone Number"
                        />
                        {errors.userId && touched.userId ? (
                          <p className="text-red-600">*{errors.userId}</p>
                        ) : null}
                      </div>
                    )}

                    {/* Email input  */}
                    {!userRegistered && (
                      <div className="mb-4">
                        <label
                          className="uppercase tracking-widest block text-[var(--themeColor)] text-sm font-bold mb-2"
                          htmlFor="firstName"
                        >
                          Email
                        </label>
                        <Field
                          className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3  tracking-widest leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          type="text"
                          name="email"
                        />
                        {errors.email && touched.email ? (
                          <p className="text-red-600">*{errors.email}</p>
                        ) : null}
                      </div>
                    )}

                    {/* phone no.  */}
                    {!userRegistered && (
                      <div className="mb-4">
                        <label
                          className="uppercase tracking-widest block text-[var(--themeColor)] text-sm font-bold mb-2"
                          htmlFor="phoneNumber"
                        >
                          Phone No.
                        </label>
                        <div className="flex  items-center gap-2 border border-[var(--bgColorSecondary)] ">
                          <div className="flex justify-center items-center pl-2 pr-1 gap-1 text-[var(--bgColorSecondary)]">
                            {/* <FaFlag /> */}
                            <img
                              src="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/flag.png"
                              alt="country_flag"
                              className="w-8"
                            />
                            <span>+91</span>
                          </div>
                          <Field
                            className="shadow appearance-none  bg-[var(--bgColorSecondary)] w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                            id="phoneNumber"
                            type="text"
                            maxLength={10}
                            minLength={10}
                            name="phoneNumber"
                          />
                        </div>
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <p className="text-red-600">*{errors.phoneNumber}</p>
                        ) : null}
                      </div>
                    )}
                    {/* password input  */}
                    <div className="mb-6">
                      <label
                        className="uppercase tracking-widest block text-[var(--themeColor)] text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <Field
                        className="shadow appearance-none border  bg-[var(--bgColorSecondary)] w-full py-2 px-3   leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name="password"
                      />
                      {errors.password && touched.password ? (
                        <p className="text-red-600">*{errors.password}</p>
                      ) : null}
                      {userRegistered && (
                        <Link
                          to="/auth/forgot-password"
                          className="text-end text-[var(--bgColorSecondary)] text-[11px] hover:underline cursor-pointer"
                        >
                          Forgot Password
                        </Link>
                      )}
                    </div>
                    {/* email and password error msg */}
                    {error && (
                      <div className="text-center pb-4 text-red-600">
                        {userRegistered ? (
                          <p>{error?.msg}</p>
                        ) : (
                          <p>{error.msg}</p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between ">
                      {!userRegistered ? (
                        <button
                          type="submit"
                          className="p-2 bg-[var(--bgColorSecondary)] hover:bg-green-500 hover:text-white transition-all duration-300 w-full flex justify-center items-center gap-2 rounded-md "
                        >
                          Sign up
                          {user_loading ? (
                            <ImSpinner9 className="animate-spin" />
                          ) : (
                            <FaArrowRight />
                          )}
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="p-2 bg-[var(--bgColorSecondary)] hover:bg-green-500 hover:text-white transition-all duration-300 w-full flex justify-center items-center gap-2 rounded-md "
                        >
                          Log in
                          {user_loading ? (
                            <ImSpinner9 className="animate-spin" />
                          ) : (
                            <FaArrowRight />
                          )}
                        </button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>

              <div className="pb-4 text-center">
                <p className="px-8 text-gray-700">Don't have an account ? </p>
              </div>

              {/* horizontal line */}
              {/* <div className='flex justify-center gap-4 items-center mb-4'>
                <div className='h-1 md:w-[35%] xs:w-[35%] w-[30%] bg-gradient-to-r from-[#6D613B] to-[#D3BB71]'></div>
                <span className='text-[var(--bgColorSecondary)]'>or</span>
                <div className='h-1 md:w-[35%] xs:w-[35%] w-[30%] bg-gradient-to-r from-[#D3BB71] to-[#6D613B]'></div>
              </div> */}
              {/* other login options */}

              <div className="flex flex-col  px-8 gap-3">
                {/* otp sign up  */}
                {!signingUpUser && (
                  <div className="flex justify-center items-center gap-3  border text-[var(--themeColor)] hover:bg-white hover:text-black">
                   
                    {/* <Link to="/otp-login" className="w-full"> */}
                    <button 
                    className="flex justify-center items-center w-full py-1"
                    onClick={handleOtpLogin}
                    >
                    <FcIphone className="text-2xl" />
                    Log in with OTP
                    </button>
                    
                    {/* </Link> */}
                  </div>
                )}

                {/* google  */}

                {/* <div className="flex justify-center items-center gap-3 border text-[var(--themeColor)] hover:bg-white hover:text-black">
                  <a
                    className="w-full"
                    href={`${apiUrl}/api/auth/google`}
                  >
                     <button className="flex justify-center items-center w-full py-1 gap-1">
                     <FcGoogle className="text-xl" />
                     Log in with Google
                    </button>
                   
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* alert for cart merge  */}
      {/* <Alert
        isOpen={isAlertOpen}
        alertMessage="You have items in your cart from a previous session. Would you like to merge them with your current cart?"
        actionMessageOne="Yes, merge the Cart"
        actionMessageTwo="No, Keep the Previous Session cart"
        actionMessageThree="No, Keep the Current Session cart"
        hideAlert={hideAlert}
        handleAction1={() => handleCartMerge({ replaceCart: false })}
        handleAction2={() => handleCartMerge({ replaceCart: true })}
      /> */}
    </section>
  );
};

export default Auth;
