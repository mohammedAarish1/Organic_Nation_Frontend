import React, { useState } from 'react';
import Logo from '../../components/logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userSignup, userLogin, fetchUserData } from '../../features/auth/userSlice';
import { getAllOrders } from '../../features/manageOrders/manageOrders';
import { Formik, Form, Field } from 'formik';
import { signUpSchema } from '../../form-validation/signUpSchema';
import { loginSchema } from '../../form-validation/loginSchema';
import Alert from '../../components/alert/Alert';
import { getAllCartItems, mergeCart } from '../../features/cart/cart';
import OtpInput from '../../components/otp/OtpInput';
// react icons 
import { FcGoogle, FcIphone } from "react-icons/fc";
import { ImSpinner9 } from 'react-icons/im';
import { FaArrowRight } from 'react-icons/fa';
import { requestOTP } from '../../features/auth/OTPSlice';






const Auth = () => {



  // belo code is for handling the navigation after otp verified by the user (extracting phone number)
  const location = useLocation();
  const otpUser = location?.state;
  const apiUrl = import.meta.env.VITE_BACKEND_URL;


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOtpInput, setShowOtpInput] = useState(true);
  const [userExist, setUserExist] = useState(otpUser ? false : true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { checkoutStatus } = useSelector(state => state.orders);
  const { user, user_loading, error, } = useSelector(state => state.user);
  const { isAuthenticated } = useSelector(state => state.OTPSlice);




  const initialValues = {
    firstName: '',
    lastName: '',
    userId: '',
    email: '',
    phoneNumber: otpUser ? otpUser.phoneNumber : '',
    password: '',
    // confirm_password: ''
  }




  const hideAlert = () => {
    setIsAlertOpen(false);
    localStorage.removeItem('cart');
    if (checkoutStatus) {
      navigate('/cart/checkout')
    } else {

      navigate('/')
    }
  };

  const handleCartMerge = (action) => {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    // setIsAlertOpen(false);
    dispatch(mergeCart({ localCart, replaceCart: action.replaceCart }))
      .then(() => {
        setIsAlertOpen(false);
        localStorage.removeItem('cart');
        dispatch(getAllCartItems());
        if (checkoutStatus) {
          navigate('/cart/checkout')
        } else {

          navigate('/')
        }
      })
  }




  const handleSubmit = (values, action) => {
    if (!userExist) {

      if (isAuthenticated) {
        dispatch(userSignup(values))
          .then((value) => {
            if (value?.error?.message === 'Rejected') {
              return;
            } else {
              toast.success("Congragulations! signed up succesfully")
              setUserExist(true)
            }

          })

      } else {
        let phoneNumber = '+91' + values.phoneNumber;
        // dispatch the api call function 
        dispatch(requestOTP(phoneNumber))
          .then((value) => {
            if (value.meta.requestStatus === 'fulfilled') {
              toast.success(value.payload.message)
              // setShowOtpInput(true);
              navigate('/otp-submit', { state: { phoneNumber, otherDetails: { ...values, phoneNumber: phoneNumber }, googleSignup: false } })
            }

          })
      }

    } else {
      if (values.userId && values.password) {


        dispatch(userLogin({ userId: values.userId, password: values.password }))
          .then((value) => {
            if (value.meta.requestStatus === 'fulfilled') {
              const token = value.payload.token;
              sessionStorage.setItem("token", JSON.stringify(token));
              dispatch(fetchUserData(token));
              dispatch(getAllOrders(token));
              dispatch(getAllCartItems())
                .then(res => {
                  const localCart = JSON.parse(localStorage.getItem('cart') || '[]');

                  if (localCart.length > 0 && res.payload.length > 0) {
                    setIsAlertOpen(true)
                  } else if (localCart.length > 0 && res.payload.length === 0) {
                    dispatch(mergeCart({ localCart, replaceCart: true }))
                      .then(() => {
                        localStorage.removeItem('cart');
                        dispatch(getAllCartItems());
                        if (checkoutStatus) {
                          navigate('/cart/checkout')
                        } else {

                          navigate('/')
                        }
                      }
                      )
                  } else {
                    if (checkoutStatus) {
                      navigate('/cart/checkout')
                    } else {

                      navigate('/');
                    }

                  }



                })
              toast.success("Log in Successfully");


            } else if (value.payload === 'Request failed with status code 400') {
              toast.error('Invalid Credentials')
            } else if (value.meta.requestStatus === 'rejected') {
              toast.error(error)
            }

          })


      }
    }

    action.resetForm()
  }




  return (
    <section className='xs:px-10 px-2 pb-20 mt-5 sm:mt-0 font-mono'>
      <div className='lg:w-[80%] h-auto py-2 bg-opacity-35 mx-auto'>
        {otpUser ? (
          <p className='text-center'>*Please provide us the following details to complete the signing up process*</p>
        ) : (
          <h2 className="text-4xl text-center sm:mt-6 mt-10 sm:mb-2 mb-6 text-[var(--themeColor)] ">{userExist ? 'Welcome Back !' : 'Create Your Account'}</h2>
        )}


        <div className='md:w-[90%] py-10 flex sm:flex-row flex-col sm:gap-0 gap-6 shadow-md shadow-black justify-center h-[100%] mx-auto  my-auto bg-gradient-to-r from-[#6D613B] to-[#D3BB71]  '>

          {/* ============== right side ================  */}

          <div className='sm:w-[40%] mt-3 sm:mt-0 flex justify-center items-center '>
            <div className='flex justify-center items-center sm:flex-col gap-3 '>
              <div>
                <Logo />
              </div>
              <div className='flex flex-col justify-center items-center'>
                <span className='sm:text-2xl uppercase text-[var(--bgColorSecondary)]'>{!userExist ? "Sign up to" : "Log in"}</span>
                <span className='sm;text-2xl uppercase text-[var(--bgColorSecondary)]'>Organic Nation</span>
              </div>
            </div>
          </div>

          {/* ============== left side ================  */}

          <div className='sm:w-[60%] text-[var(--themeColor)]'>
            <div className="sm:w-[80%]  mx-auto">

              <h2 className='px-8 mb-2  text-3xl'>{!userExist ? "Sign up" : "Log in"}</h2>

              {/* <p>Please fill in the below details and get registered.</p> */}


              {/* === Form ===  */}
              <Formik
                initialValues={initialValues}
                validationSchema={!userExist ? signUpSchema : loginSchema}
                onSubmit={handleSubmit}
                validateOnChange={false}   // Disable validation on change
                validateOnBlur={false}     // Disable validation on blur
              >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                  <Form className="  rounded px-8 pt-6 pb-2 mb-4">



                    {/* firstName input  */}
                    {!userExist && (
                      <div className="mb-4">
                        <label
                          className="uppercase tracking-widest block text-[var(--themeColor)] text-sm font-bold mb-2" htmlFor="firstName">
                          First Name
                        </label>
                        <Field
                          className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3  tracking-widest leading-tight focus:outline-none focus:shadow-outline"
                          id="firstName"
                          type="text"
                          name="firstName"
                        />
                        {errors.firstName && touched.firstName ? (
                          <p className='text-red-600'>*{errors.firstName}</p>
                        ) : (
                          null
                        )}
                      </div>
                    )}
                    {/* lastName input  */}
                    {!userExist && (
                      <div className="mb-4">
                        <label
                          className="uppercase tracking-widest block text-[var(--themeColor)] text-sm font-bold mb-2" htmlFor="lastName">
                          Last Name
                        </label>
                        <Field
                          className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3 tracking-widest leading-tight focus:outline-none focus:shadow-outline"
                          id="lastName"
                          type="text"
                          name="lastName"
                        />
                        {errors.lastName && touched.lastName ? (
                          <p className='text-red-600'>*{errors.lastName}</p>
                        ) : (
                          null
                        )}
                      </div>
                    )}

                    {/* userId--- email or phone  */}
                    {userExist && (
                      <div className="mb-4">
                        <label
                          className="uppercase tracking-widest block text-[var(--themeColor)] text-sm font-bold mb-2" htmlFor="userId">
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
                          <p className='text-red-600'>*{errors.userId}</p>
                        ) : (
                          null
                        )}
                      </div>
                    )}

                    {/* Email input  */}
                    {!userExist && (
                      <div className="mb-4">
                        <label
                          className="uppercase tracking-widest block text-[var(--themeColor)] text-sm font-bold mb-2" htmlFor="firstName">
                          Email
                        </label>
                        <Field
                          className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3  tracking-widest leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          type="text"
                          name="email"
                        />
                        {errors.email && touched.email ? (
                          <p className='text-red-600'>*{errors.email}</p>
                        ) : (
                          null
                        )}
                      </div>
                    )}

                    {/* phone no.  */}
                    {!userExist && (
                      <div className="mb-4">
                        <label
                          className="uppercase tracking-widest block text-[var(--themeColor)] text-sm font-bold mb-2"
                          htmlFor="phoneNumber"
                        >

                          Phone No.
                        </label>
                        <div className='flex  items-center gap-2 border border-[var(--bgColorSecondary)] '>
                          <div className='flex justify-center items-center pl-2 pr-1 gap-1 text-[var(--bgColorSecondary)]'>
                            {/* <FaFlag /> */}
                            <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/flag.png' alt="country_flag" className='w-8' />
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
                          <p className='text-red-600'>*{errors.phoneNumber}</p>
                        ) : (
                          null
                        )}
                      </div>
                    )}
                    {/* password input  */}
                    <div className="mb-6">
                      <label className="uppercase tracking-widest block text-[var(--themeColor)] text-sm font-bold mb-2" htmlFor="password">
                        Password
                      </label>
                      <Field
                        className="shadow appearance-none border  bg-[var(--bgColorSecondary)] w-full py-2 px-3   leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name="password"
                      />
                      {errors.password && touched.password ? (
                        <p className='text-red-600'>*{errors.password}</p>
                      ) : (
                        null
                      )}
                      {userExist && (
                        <Link
                          to='/auth/forgot-password'
                          className='text-end text-[var(--bgColorSecondary)] text-[11px] hover:underline cursor-pointer'
                        >
                          Forgot Password
                        </Link>
                      )}


                    </div>
                    {/* email and password error msg */}
                    {error && (
                      <div className='text-center pb-4 text-red-600'>
                        {userExist ? (
                          <p>{error?.msg}</p>
                        ) : (
                          <p>{error.msg}</p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between ">
                      {!userExist ? (
                        <button
                          type="submit"
                          className='p-2 bg-[var(--bgColorSecondary)] hover:bg-green-500 hover:text-white transition-all duration-300 w-full flex justify-center items-center gap-2 rounded-md '
                        >
                          Sign up
                          {user_loading ? (
                            <ImSpinner9 className='animate-spin' />
                          ) : (
                            <FaArrowRight />
                          )}


                        </button>
                      ) : (
                        <button
                          type="submit"
                          className='p-2 bg-[var(--bgColorSecondary)] hover:bg-green-500 hover:text-white transition-all duration-300 w-full flex justify-center items-center gap-2 rounded-md '
                        >
                          Log in
                          {user_loading ? (
                            <ImSpinner9 className='animate-spin' />
                          ) : (
                            <FaArrowRight />
                          )}


                        </button>
                      )}

                    </div>
                  </Form>
                )}

              </Formik>


              <div className='pb-4 text-center'>
                {!userExist ? (
                  <p className='px-8 text-gray-700'>Already have an account ? <button className='text-[var(--themeColor)] text-2xl underline underline-offset-8 cursor-pointer' onClick={() => setUserExist(true)}>Log in</button></p>
                ) : (
                  <p className='px-8 text-gray-700'>Don't have an account ? <button className='text-[var(--themeColor)] text-2xl underline underline-offset-8 cursor-pointer' onClick={() => setUserExist(false)}>Sign up</button></p>
                )}
              </div>

              {/* horizontal line */}
              <div className='flex justify-center gap-4 items-center mb-4'>
                <div className='h-1 md:w-[35%] xs:w-[35%] w-[30%] bg-gradient-to-r from-[#6D613B] to-[#D3BB71]'></div>
                <span className='text-[var(--bgColorSecondary)]'>or</span>
                <div className='h-1 md:w-[35%] xs:w-[35%] w-[30%] bg-gradient-to-r from-[#D3BB71] to-[#6D613B]'></div>
              </div>
              {/* other login options */}

              <div className='flex flex-col  px-8 gap-3'>
                {/* otp sign up  */}
                {!otpUser && (
                  <div className='flex justify-center items-center gap-3 py-1 border text-[var(--themeColor)] hover:bg-white hover:text-black'>
                    <FcIphone className='text-2xl' />
                    <Link to="/otp-login" className=''>Log in with OTP</Link>
                  </div>
                )}


                {/* google  */}

                <div className='flex justify-center items-center gap-3 py-1 border text-[var(--themeColor)] hover:bg-white hover:text-black'>
                  <FcGoogle className='text-2xl' />
                  <a href={`${apiUrl}/api/auth/google`} className=''>Log in with Google</a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* alert for cart merge  */}
      <Alert
        isOpen={isAlertOpen}
        alertMessage='You have items in your cart from a previous session. Would you like to merge them with your current cart?'
        actionMessageOne='Yes, merge the Cart'
        actionMessageTwo='No, Keep the Previous Session cart'
        actionMessageThree='No, Keep the Current Session cart'
        hideAlert={hideAlert}
        handleAction1={() => handleCartMerge({ replaceCart: false })}
        handleAction2={() => handleCartMerge({ replaceCart: true })}
      />
    </section>
  );
};

export default Auth;
