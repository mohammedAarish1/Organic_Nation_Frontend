// import React, { useState } from 'react';
// import Logo from '../../components/logo/Logo';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { verifyEmail } from '../../features/forgotPassword/forgotPassword';
// import { toast } from 'react-toastify';

// // react icons 







// const VerifyEmail = () => {

//     const dispatch = useDispatch();
//     const [emailSent, setEmailSent] = useState(false);

//     const { loading } = useSelector(state => state.forgotPassword);

//     const initialValues = {
//         email: '',
//     }


//     const emailSchema = Yup.object({
//         email: Yup.string().email().required('Please enter your email'),
//     });

//     const handleEmailSubmit = (values) => {
//         dispatch(verifyEmail(values.email)).then((value) => {
//             setEmailSent(true)
//             toast.info(value.payload.message)
//         })
//     }




//     return (
//         <section className='xs:px-10 px-2 pb-20 mt-5 sm:mt-0 font-mono'>
//             <div className='lg:w-[80%] h-auto py-2 bg-opacity-35 mx-auto'>
//                 <h2 className="text- text-center sm:mt-6 mt-10 sm:mb-2 mb-6 text-[var(--background-color)] text-2xl tracking-widest ">Log in with OTP</h2>
//                 <div className='md:w-[90%] py-10 sm:px-0 px-4 flex sm:flex-row flex-col sm:gap-0 gap-6 shadow-md shadow-black justify-center h-[100%] mx-auto  my-auto bg-[var(--background-color)] '>

//                     {/* ============== right side ================  */}

//                     <div className='sm:w-[40%] mt-3 sm:mt-0 flex justify-center items-center'>
//                         <div className='flex justify-center items-center sm:flex-col gap-3 '>
//                             <div>
//                                 <Logo />
//                             </div>
//                             <div className='flex flex-col justify-center items-center'>
//                                 <span className='sm:text-2xl uppercase text-[var(--background-color)]'>Login to</span>
//                                 <span className='sm;text-2xl uppercase text-[var(--background-color)]'>Organic Nation</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ============== left side ================  */}

//                     <div className='sm:w-[60%] flex justify-center items-center'>
//                         <div className="sm:w-[80%]  mx-auto">
//                             {!emailSent ? (
//                                 <Formik
//                                     initialValues={initialValues}
//                                     validationSchema={emailSchema}
//                                     onSubmit={handleEmailSubmit}
//                                 >

//                                     {({ values }) => (
//                                         <Form>
//                                             <div className='flex flex-col gap-5'>
//                                                 <div className='flex flex-col gap-1'>
//                                                     <label
//                                                         htmlFor="phoneNumber"
//                                                         className='text-[var(--background-color)]'
//                                                     >
//                                                         Please Enter Your Registered Email
//                                                     </label>
//                                                     <div className='flex  items-center gap-2 border border-[var(--background-color)]  rounded-md'>
                                                       
//                                                         <div className='w-full'>
//                                                             <Field
//                                                                 type="text"
//                                                                 placeholder='abc@gmail.com'
//                                                                 name='email'
//                                                                 className=' outline-none w-full bg-transparent py-2 text-[var(--background-color)] pl-2 tracking-widest'
//                                                             />
//                                                         </div>

//                                                     </div>
//                                                     <ErrorMessage name="email" component="div" className='text-red-600 text-[14px]' />
//                                                 </div>
//                                                 <div>
//                                                     <button
//                                                         type="submit"
//                                                         className='p-2 text-[#712522] bg-[var(--background-color)] hover:bg-green-500 hover:text-white transition-all duration-300 w-full flex justify-center items-center gap-2 rounded-md '
//                                                     >
//                                                         Verify Email
//                                                         {loading ? (
//                                                             <ImSpinner9 className='animate-spin' />
//                                                         ) : (
//                                                             <FaArrowRight />
//                                                         )}


//                                                     </button>
//                                                 </div>

//                                             </div>
//                                         </Form>
//                                     )}
//                                 </Formik>
//                             ) : (
//                                 <div className='flex flex-col gap-5 text-2xl'>
//                                     <p className='text-[var(--background-color)] text-center'>Please Check Your Email for the Link for resetting the Password</p>
//                                 </div>
//                             )}

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default VerifyEmail;
