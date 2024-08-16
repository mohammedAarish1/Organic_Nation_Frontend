import React, { useState } from 'react';
import Logo from '../../components/logo/Logo';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { requestOTP } from '../../features/auth/OTPSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import ResendOTP from '../../components/otp/ResendOTP';

// react icons 
import { FaArrowRight } from "react-icons/fa6";








const OtpLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submittedPhoneNumber, setSubmittedPhoneNumber] = useState('')

    const { loading, } = useSelector(state => state.OTPSlice);


    const initialValues = {
        phoneNumber: '',
    }

    const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    const phoneNumberSchema = Yup.object({
        phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Please enter your phone number'),
    });

    const handlePhoneNumberSubmit = (values) => {
        let phoneNumber = '+91' + values.phoneNumber;
        setSubmittedPhoneNumber(phoneNumber);
        // dispatch the api call function 
        dispatch(requestOTP(phoneNumber)).then((value) => {
            if (value.meta.requestStatus === 'fulfilled') {
                toast.success(value.payload.message)
                // setShowOtpInput(true);
                navigate('/otp-submit', { state: { phoneNumber } })
            }

        })
    }

    return (
        <section className='xs:px-10 px-2 pb-20 mt-5 sm:mt-0 font-mono'>
            <div className='lg:w-[80%] h-auto py-2 bg-opacity-35 mx-auto'>
                <h2 className="text- text-center sm:mt-6 mt-10 sm:mb-2 mb-6 text-[var(--bgColorPrimary)] text-2xl tracking-widest ">Log in with OTP</h2>
                <div className='md:w-[90%] py-10 sm:px-0 px-4 flex sm:flex-row flex-col sm:gap-0 gap-6 shadow-md shadow-black justify-center h-[100%] mx-auto  my-auto bg-[var(--bgColorPrimary)] '>

                    {/* ============== right side ================  */}

                    <div className='sm:w-[40%] mt-3 sm:mt-0 flex justify-center items-center'>
                        <div className='flex justify-center items-center sm:flex-col gap-3 '>
                            <div>
                                <Logo />
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <span className='sm:text-2xl uppercase text-[var(--bgColorSecondary)]'>Login to</span>
                                <span className='sm;text-2xl uppercase text-[var(--bgColorSecondary)]'>Organic Nation</span>
                            </div>
                        </div>
                    </div>

                    {/* ============== left side ================  */}

                    <div className='sm:w-[60%]'>
                        <div className="sm:w-[80%]  mx-auto">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={phoneNumberSchema}
                                onSubmit={handlePhoneNumberSubmit}
                            >

                                {({ values }) => (
                                    <Form>
                                        <div className='flex flex-col gap-5'>
                                            <div className='flex flex-col gap-1'>
                                                <label
                                                    htmlFor="phoneNumber"
                                                    className='text-[var(--bgColorSecondary)]'
                                                >
                                                    Enter Your Phone Number
                                                </label>
                                                <div className='flex  items-center gap-2 border border-[var(--bgColorSecondary)]  rounded-md'>
                                                    <div className='flex justify-center items-center pl-2 pr-1 gap-1 text-[var(--bgColorSecondary)]'>
                                                        {/* <FaFlag /> */}
                                                        <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/flag.png' alt="country_flag" className='w-8' />
                                                        <span>+91</span>
                                                    </div>
                                                    <div className='w-full'>
                                                        <Field
                                                            type="text"
                                                            placeholder='123-4567-890'
                                                            name='phoneNumber'
                                                            className=' outline-none w-full bg-transparent py-2 text-[var(--bgColorSecondary)] tracking-widest'
                                                        />
                                                    </div>

                                                </div>
                                                <ErrorMessage name="phoneNumber" component="div" className='text-red-600 text-[14px]' />
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className='p-2 text-[#712522] bg-[var(--bgColorSecondary)] hover:bg-green-500 hover:text-white transition-all duration-300 w-full flex justify-center items-center gap-2 rounded-md '
                                                >
                                                    Send OTP
                                                    {loading ? (
                                                        <ImSpinner9 className='animate-spin' />
                                                    ) : (
                                                        <FaArrowRight />
                                                    )}


                                                </button>
                                            </div>
                                            {/* resend code  */}
                                            <ResendOTP phoneNumber={submittedPhoneNumber} handleResendOTP={handlePhoneNumberSubmit} />
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
};

export default OtpLogin;
