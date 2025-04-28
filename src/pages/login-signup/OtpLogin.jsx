import React, { useState } from 'react';
import Logo from '../../components/logo/Logo';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import ResendOTP from '../../components/otp/ResendOTP';
import { motion } from 'framer-motion';

// react icons 
import { FaArrowRight } from "react-icons/fa6";
import { requestOTP } from '../../features/auth/auth';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;


const Button = ({ children, onClick, type = 'button', disabled = false, className = '' }) => (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3.5 rounded-lg hover:opacity-90 transition-all disabled:opacity-70 ${className}`}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );



const OtpLogin = ({ isCheckout,setShowOtpInput, setPhoneNumber}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState('')
    const [showReferralCode, setShowReferralCode] = useState(false);


    const { sendingOTP } = useSelector(state => state.auth);

    // Initial values now include referral code
    const initialValues = {
        phoneNumber: '',
        referralCode: '', // New field
    }

    // Phone number validation regex
    const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;


 const phoneSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required')
  });

    // Validation schema with optional referral code
    const phoneNumberSchema = Yup.object({
        phoneNumber: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Please enter your phone number'),
        referralCode: showReferralCode
            ? Yup.string()
                // .required('Referral code is required')
                .max(10, 'Referral code must be at most 10 characters')
                .matches(/^[A-Za-z0-9]*$/, 'Referral code can only contain letters and numbers')
            : Yup.string().optional(),
    });


    const isReferralCodeExist = async (referralCode) => {
        try {
            const response = await axios.post(`${apiUrl}/api/auth/user/exist`, { referralCode })
            return response.data
        } catch (error) {
            throw error
        }
    }

    // Handle form submission
    const handlePhoneNumberSubmit = (values) => {
        console.log('values',values)
        let phoneNumber = '+91' + values.phoneNumber;
        setSubmittedPhoneNumber(phoneNumber);
        if(isCheckout){

            setPhoneNumber(phoneNumber);
        }
        console.log('phnenumber',phoneNumber)

        // Prepare data to send, including referral code if provided
        const payload = { phoneNumber, ...(showReferralCode && { referralCode: values.referralCode }) }

        // if referral code provided by the user we'll check if it's exist or not and then dipatch the action
        if (showReferralCode && values.referralCode) {
            isReferralCodeExist(values.referralCode)
                .then(result => {
                    if (!result.exist) {
                        toast.error(result.message)
                    } else {
                        // dispatch the api call function 
                        dispatch(requestOTP(phoneNumber)).then((value) => {
                            if (value.meta.requestStatus === 'fulfilled') {
                                toast.success(value.payload.message)
                                // Navigate with phone number and optional referral code
                                navigate('/otp-submit', { state: payload })
                            }
                        })
                    }

                })

        } else {
            console.log('hello')
            // if user doesn't provided the referral code we simply dispatch the api call function 
            dispatch(requestOTP(phoneNumber)).then((value) => {
                if (value.meta.requestStatus === 'fulfilled') {
                    toast.success(value.payload.message)
                    // Navigate with phone number and optional referral code

                    if (isCheckout) {
                        setShowOtpInput(true)
                    } else {
                        navigate('/otp-submit', { state: payload })
                    }
                }
            })
        }

    }

    const toggleReferralCode = () => {
        setShowReferralCode(!showReferralCode);
    }
    if (isCheckout) {
        return (
              <div className="mb-6">
                  <h3 className="font-medium mb-3 text-lg">Enter your phone number</h3>
                  <Formik
                    initialValues={initialValues}
                    // validationSchema={phoneNumberSchema}
                    onSubmit={handlePhoneNumberSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="mb-4">
                          <Field
                            type="text"
                            name="phoneNumber"
                            placeholder="10-digit phone number"
                            className="w-full p-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                          />
                          <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
            
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Sending OTP...' : 'Add Address'}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
        )
    } else {
        return (
            <section className='xs:px-10 px-2 pb-20 mt-5 sm:mt-0'>
                <div className='lg:w-[80%] h-auto py-2 bg-opacity-35 mx-auto'>
                    <h2 className="text- text-center sm:mt-6 xs:mt-10 sm:mb-2 mb-6 text-gray-500 text-xl">
                        Please provide us the Phone Number to continue
                    </h2>
                    <div className='md:w-[90%] py-10 sm:px-0 px-4 flex sm:flex-row flex-col sm:gap-0 gap-6 shadow-md shadow-black justify-center h-[100%] mx-auto my-auto bg-[var(--bgColorPrimary)]'>

                        {/* Left side - Logo Section */}
                        <div className='sm:w-[40%] mt-3 sm:mt-0 flex flex-wrap justify-center items-center sm:mb-0 mb-5'>
                            <div className='flex justify-center items-center flex-col gap-3'>
                                <div>
                                    <Logo />
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    <span className='sm:text-2xl uppercase text-[var(--bgColorSecondary)]'>Login to</span>
                                    <span className='sm:text-2xl uppercase text-[var(--bgColorSecondary)]'>Organic Nation</span>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Form Section */}
                        <div className='sm:w-[60%]'>
                            <div className="sm:w-[80%] mx-auto">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={phoneNumberSchema}
                                    onSubmit={handlePhoneNumberSubmit}
                                >
                                    {({ values }) => (
                                        <Form>
                                            <div className='flex flex-col gap-5'>
                                                {/* Phone Number Field */}
                                                <div className='flex flex-col gap-1'>
                                                    <label
                                                        htmlFor="phoneNumber"
                                                        className='text-[var(--bgColorSecondary)]'
                                                    >
                                                        Enter Your 10 digit Phone Number
                                                    </label>
                                                    <div className='flex items-center gap-2 border border-[var(--bgColorSecondary)] rounded-md'>
                                                        <div className='flex justify-center items-center pl-2 pr-1 gap-1 text-[var(--bgColorSecondary)]'>
                                                            <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/flag.png' alt="country_flag" className='w-8' />
                                                            <span>+91</span>
                                                        </div>
                                                        <div className='w-full'>
                                                            <Field
                                                                type="text"
                                                                placeholder='123-4567-890'
                                                                name='phoneNumber'
                                                                className='outline-none w-full bg-transparent py-2 text-[var(--bgColorSecondary)] tracking-widest'
                                                            />
                                                        </div>
                                                    </div>
                                                    <ErrorMessage name="phoneNumber" component="div" className='text-red-600 text-[14px]' />
                                                </div>

                                                {/* Referral Code Toggle */}
                                                <div className='flex items-center gap-2'>
                                                    <input
                                                        type="checkbox"
                                                        id="hasReferralCode"
                                                        checked={showReferralCode}
                                                        onChange={toggleReferralCode}
                                                        className='text-gray-500'
                                                    />
                                                    <label
                                                        htmlFor="hasReferralCode"
                                                        className='text-gray-500'
                                                    >
                                                        Have a referral code? (optional)
                                                    </label>
                                                </div>

                                                {/* Conditional Referral Code Field */}
                                                {showReferralCode && (
                                                    <div className='flex flex-col gap-1'>
                                                        <label
                                                            htmlFor="referralCode"
                                                            className='text-[var(--bgColorSecondary)]'
                                                        >
                                                            Enter Referral Code
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            // placeholder='Enter referral code'
                                                            name='referralCode'
                                                            className='outline-none w-full bg-transparent py-2 px-2 border border-[var(--bgColorSecondary)] rounded-md text-[var(--bgColorSecondary)] tracking-widest'
                                                        />
                                                        <ErrorMessage name="referralCode" component="div" className='text-red-600 text-[14px]' />
                                                    </div>
                                                )}

                                                {/* Submit Button */}
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className='p-2 text-[#712522] bg-[var(--bgColorSecondary)] hover:bg-green-500 hover:text-white transition-all duration-300 w-full flex justify-center items-center gap-2 rounded-md'
                                                    >
                                                        Send OTP
                                                        {sendingOTP ? (
                                                            <ImSpinner9 className='animate-spin' />
                                                        ) : (
                                                            <FaArrowRight />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Resend OTP */}
                                                <ResendOTP
                                                    phoneNumber={submittedPhoneNumber}
                                                    handleResendOTP={handlePhoneNumberSubmit}
                                                />
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }


};

export default OtpLogin;
