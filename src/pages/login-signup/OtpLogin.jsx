import React, { useState } from 'react';
import Logo from '../../components/logo/Logo';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import ResendOTP from '../../components/otp/ResendOTP';
import { motion } from 'framer-motion';

// react icons 
import { requestOTP } from '../../features/auth/auth';
import axios from 'axios';
import OtpVerification from '../../components/auth/OtpVerification';
import { getAllCartItems, mergeCart } from '../../features/cart/cart';
import SubmitButton from '../../components/button/SubmitButton';

import { Leaf, PhoneCall } from 'lucide-react';

const apiUrl = import.meta.env.VITE_BACKEND_URL;


const PhoneNumberField = ({ itemVariants }) => {
    return (
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <label
                htmlFor="phoneNumber"
                className="text-[var(--text-color)] font-medium"
            >
                Enter Your 10 digit Phone Number
            </label>
            <div className="flex items-center border-2 border-[var(--neutral-color)] focus-within:border-[var(--accent-color)] rounded-lg overflow-hidden transition-colors duration-300">
                <div className="flex justify-center items-center pl-3 pr-2 py-2 gap-2 bg-[var(--background-color)]">
                    <img
                        src="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/flag.png"
                        alt="country_flag"
                        className="w-6 h-auto"
                    />
                    <span className="text-[var(--text-color)] font-medium">+91</span>
                </div>
                <div className="w-full">
                    <Field
                        type="text"
                        placeholder="10-digit phone number"
                        name="phoneNumber"
                        className="outline-none w-full py-3 px-3 text-[var(--text-color)] bg-white"
                    />
                </div>
            </div>
            <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
            />
        </motion.div>
    )
}



const OtpLogin = ({ isCheckout = false, setShowOtpInput, setPhoneNumber }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState('')
    const [showReferralCode, setShowReferralCode] = useState(false);

    const [showOTPFields, setShowOTPFields] = useState(false);
    const { cartItems, cartItemsList, totalCartAmount, totalTax, couponCodeApplied } = useSelector((state) => state.cart);

    const { sendingOTP } = useSelector(state => state.auth);

    const getDataAfterLogin = () => {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (localCart.length > 0) {
            const cart = {
                items: localCart,
                totalCartAmount: totalCartAmount,
                totalTaxes: totalTax,
                couponCodeApplied: couponCodeApplied
            }


            dispatch(mergeCart({ cart })).then(() => {
                dispatch(getAllCartItems());
                // if (checkoutStatus) {
                //   navigate("/cart/checkout");
                // } else {
                //   navigate("/");
                // }
            });
        }
        //  else {
        //   navigate("/");
        // }

    };

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    // Item animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };


    // Initial values now include referral code
    const initialValues = {
        phoneNumber: '',
        referralCode: '', // New field
    }

    // Phone number validation regex
    // const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    const phoneRegExp = /^\d{10}$/;

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
        let phoneNumber = '+91' + values.phoneNumber;
        setSubmittedPhoneNumber(phoneNumber);
        if (isCheckout) {

            setPhoneNumber(phoneNumber);
        }

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
            // if user doesn't provided the referral code we simply dispatch the api call function 
            dispatch(requestOTP(phoneNumber)).then((value) => {
                if (value.meta.requestStatus === 'fulfilled') {
                    toast.success(value.payload.message)
                    // Navigate with phone number and optional referral code

                    if (isCheckout) {
                        setShowOtpInput(true)
                    } else {
                        // navigate('/otp-submit', { state: payload })
                        setShowOTPFields(true)
                    }
                }
            })
        }

    }

    // const toggleReferralCode = () => {
    //     setShowReferralCode(!showReferralCode);
    // }
    if (isCheckout) {
        return (
            <div className="mb-6">
                {/* <h3 className="font-medium mb-3 text-lg">Enter your 10 digit  phone number</h3> */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={phoneNumberSchema}
                    onSubmit={handlePhoneNumberSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>

                            <PhoneNumberField itemVariants={itemVariants} />

                            <SubmitButton
                                id='addAddressBtn'
                                isSubmitting={isSubmitting}
                                text={isSubmitting ? 'Sending OTP...' : 'Add Address'}
                            />

                        </Form>
                    )}
                </Formik>
            </div>
        )
    } else {
        return (
            <section className="relative bg-[var(--background-color)] py-12 px-4 sm:px-6 md:px-8 min-h-screen flex items-center">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-[var(--themeColor)] opacity-5 rounded-full"></div>
                    <div className="absolute top-1/4 right-0 w-60 h-60 bg-[var(--accent-color)] opacity-5 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-[var(--secondary-color)] opacity-5 rounded-full"></div>
                </div>

                <div className="container mx-auto max-w-4xl z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-6 text-[var(--text-color)] text-xl sm:text-2xl font-medium"
                    >
                        Please provide your phone number to continue
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                        <div className="flex flex-col sm:flex-row">
                            {/* Left side - Logo Section */}
                            <div className="sm:w-2/5 bg-gradient-to-br from-[var(--themeColor)] to-[var(--accent-color)] p-8 flex items-center justify-center">
                                <motion.div
                                    className="flex flex-col items-center justify-center gap-6"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.div variants={itemVariants}>
                                        <Logo />
                                    </motion.div>

                                    <motion.div
                                        className="text-center"
                                        variants={itemVariants}
                                    >
                                        <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[var(--text-light-color)]">
                                            Login to
                                        </h2>
                                        <p className="text-2xl sm:text-3xl font-bold uppercase text-[var(--text-light-color)]">
                                            Organic Nation
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        variants={itemVariants}
                                        className="hidden sm:block mt-4"
                                    >
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-2 text-[var(--text-light-color)]">
                                                <span className="p-2 bg-white/10 rounded-full">
                                                    <Leaf size={20} className="text-[var(--text-light-color)]" />
                                                </span>
                                                <span>Organic Products</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[var(--text-light-color)]">
                                                <span className="p-2 bg-white/10 rounded-full">
                                                    <PhoneCall size={20} className="text-[var(--text-light-color)]" />
                                                </span>
                                                <span>Easy OTP Verification</span>
                                            </div>
                                            {/* <div className="flex items-center gap-2 text-[var(--text-light-color)]">
                                                <span className="p-2 bg-white/10 rounded-full">
                                                    <FaUserFriends className="text-[var(--text-light-color)]" />
                                                </span>
                                                <span>Refer Friends & Earn</span>
                                            </div> */}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Right side - Form Section */}
                            <div className="sm:w-3/5 p-8">
                                <div className="sm:w-[90%] mx-auto">
                                    {showOTPFields ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <OtpVerification
                                                isCheckout={true}
                                                phoneNumber={submittedPhoneNumber}
                                                showOtpInput={showOTPFields}
                                                getDataAfterLogin={getDataAfterLogin}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={phoneNumberSchema}
                                                onSubmit={handlePhoneNumberSubmit}
                                            >
                                                {({ values }) => (
                                                    <Form>
                                                        <motion.div
                                                            className="flex flex-col gap-3"
                                                            variants={containerVariants}
                                                        >
                                                            {/* Phone Number Field */}
                                                            <PhoneNumberField itemVariants={itemVariants} />



                                                            {/* Referral Code Toggle */}
                                                            {/* <motion.div variants={itemVariants} className="flex items-center gap-2">
                                                                <div className="relative">
                                                                    <input
                                                                        type="checkbox"
                                                                        id="hasReferralCode"
                                                                        checked={showReferralCode}
                                                                        onChange={toggleReferralCode}
                                                                        className="peer sr-only"
                                                                    />
                                                                    <label
                                                                        htmlFor="hasReferralCode"
                                                                        className="flex h-5 w-9 cursor-pointer items-center rounded-full bg-gray-300 p-1 
                                            after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all 
                                            peer-checked:bg-[var(--accent-color)] peer-checked:after:translate-x-3"
                                                                    >
                                                                    </label>
                                                                </div>
                                                                <label
                                                                    htmlFor="hasReferralCode"
                                                                    className="text-[var(--text-color)] cursor-pointer"
                                                                >
                                                                    Have a referral code? (optional)
                                                                </label>
                                                            </motion.div> */}

                                                            {/* Conditional Referral Code Field */}
                                                            {showReferralCode && (
                                                                <motion.div
                                                                    variants={itemVariants}
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="flex flex-col gap-2"
                                                                >
                                                                    <label
                                                                        htmlFor="referralCode"
                                                                        className="text-[var(--text-color)] font-medium"
                                                                    >
                                                                        Enter Referral Code
                                                                    </label>
                                                                    <Field
                                                                        type="text"
                                                                        name="referralCode"
                                                                        className="outline-none w-full py-3 px-3 border-2 border-[var(--neutral-color)] focus:border-[var(--accent-color)] rounded-lg text-[var(--text-color)] transition-colors duration-300"
                                                                        placeholder="Enter your friend's referral code"
                                                                    />
                                                                    <ErrorMessage
                                                                        name="referralCode"
                                                                        component="div"
                                                                        className="text-[var(--alert-color)] text-sm mt-1"
                                                                    />
                                                                </motion.div>
                                                            )}

                                                            {/* Submit Button */}
                                                            <SubmitButton
                                                                id='sendOtpBtn'
                                                                isSubmitting={sendingOTP}
                                                                text='Send OTP'
                                                            />

                                                            {/* <motion.div variants={itemVariants} className="mt-4">
                                                                <button
                                                                    type="submit"
                                                                    className="p-3 w-full text-[var(--text-light-color)] font-medium text-lg
                                           bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)]
                                           hover:from-[var(--accent-color)] hover:to-[var(--themeColor)]
                                           flex justify-center items-center gap-3 rounded-lg
                                           transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                                           shadow-md hover:shadow-lg"
                                                                    disabled={sendingOTP}
                                                                >
                                                                    <span>Send OTP</span>
                                                                    {sendingOTP ? (
                                                                        <ImSpinner9 className="animate-spin" />
                                                                    ) : (
                                                                        <motion.span
                                                                            animate={{ x: [0, 5, 0] }}
                                                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                                                        >
                                                                            <FaArrowRight />
                                                                        </motion.span>
                                                                    )}
                                                                </button>
                                                            </motion.div> */}

                                                            {/* Additional Information */}
                                                            <motion.div variants={itemVariants} className="text-center text-sm text-[var(--text-color)] opacity-80">
                                                                <p>By continuing, you agree to our <span className="text-[var(--themeColor)] cursor-pointer">Terms of Service</span> and <span className="text-[var(--themeColor)] cursor-pointer">Privacy Policy</span></p>
                                                            </motion.div>
                                                        </motion.div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }


};

export default OtpLogin;
