// import React, { useState } from 'react';
// import Logo from '../../components/logo/Logo';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { resetPassword } from '../../features/forgotPassword/forgotPassword';
// import { toast } from 'react-toastify';
// import { Link, useParams } from 'react-router-dom';

// // react icons 



// const ResetPassword = () => {

//     const dispatch = useDispatch();
//     const [passwordResetted, setPasswordResetted] = useState(false);
//     const { loading } = useSelector(state => state.forgotPassword);



//     // extracting token from the URL 
//     const { token } = useParams();


//     const initialValues = {
//         newPassword: '',
//         confirm_password: '',
//     }


//     const passwordSchema = Yup.object({
//         newPassword: Yup.string().min(6).required('Please enter your password'),
//         confirm_password: Yup.string().required().oneOf([Yup.ref('newPassword'), null], 'Password must match')
//     });

//     const handlePasswordSubmit = (values) => {
//         if (token) {
//             dispatch(resetPassword({ token, newPassword: values.newPassword }))
//                 .then((value) => {
//                     setPasswordResetted(true);
//                     toast.success(value.payload.message);
//                 })
//         }
//     }


//     return (
//         <section className='xs:px-10 px-2 pb-20 mt-5 sm:mt-0 font-mono'>
//             <div className='lg:w-[80%] h-auto py-2 bg-opacity-35 mx-auto'>
//                 <h2 className="text- text-center sm:mt-6 mt-10 sm:mb-2 mb-6 text-[var(--themeColor)] text-2xl tracking-widest ">Reset Your Password</h2>
//                 <div className='md:w-[90%] py-10 sm:px-0 px-4 flex sm:flex-row flex-col sm:gap-0 gap-6 shadow-md shadow-black justify-center h-[100%] mx-auto  my-auto bg-[var(--themeColor)] '>

//                     {/* ============== right side ================  */}

//                     <div className='sm:w-[40%] mt-3 sm:mt-0 flex justify-center items-center'>
//                         <div className='flex justify-center items-center sm:flex-col gap-3 '>
//                             <div>
//                                 <Logo />
//                             </div>
//                             <div className='flex flex-col justify-center items-center'>
//                                 <span className='sm:text-2xl uppercase text-[var(--text-color)]'>Login to</span>
//                                 <span className='sm;text-2xl uppercase text-[var(--text-color)]'>Organic Nation</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ============== left side ================  */}

//                     <div className='sm:w-[60%] flex justify-center items-center'>
//                         <div className="sm:w-[80%]  mx-auto">
//                             {!passwordResetted ? (
//                                 <Formik
//                                     initialValues={initialValues}
//                                     validationSchema={passwordSchema}
//                                     onSubmit={handlePasswordSubmit}
//                                 >

//                                     {({ values }) => (
//                                         <Form>
//                                             <div className='flex flex-col gap-5'>
//                                                 {/* password  */}
//                                                 <div className='flex flex-col gap-1'>
//                                                     <label
//                                                         htmlFor="newPassword"
//                                                         className='text-[var(--background-color)]'
//                                                     >
//                                                         Please Enter Your New Password
//                                                     </label>
//                                                     <div className='flex  items-center gap-2 border border-[var(--text-color)]  rounded-md'>

//                                                         <div className='w-full'>
//                                                             <Field
//                                                                 type="password"
//                                                                 placeholder=''
//                                                                 name='newPassword'
//                                                                 className=' outline-none w-full bg-transparent py-2 text-[var(--background-color)] pl-2 tracking-widest'
//                                                             />
//                                                         </div>

//                                                     </div>
//                                                     <ErrorMessage name="newPassword" component="div" className='text-red-600 text-[14px]' />
//                                                 </div>
//                                                 {/*confirm password  */}
//                                                 <div className='flex flex-col gap-1'>
//                                                     <label
//                                                         htmlFor="confirm_password"
//                                                         className='text-[var(--background-color)]'
//                                                     >
//                                                         Re-Enter Your New Password
//                                                     </label>
//                                                     <div className='flex  items-center gap-2 border border-[var(--background-color)]  rounded-md'>

//                                                         <div className='w-full'>
//                                                             <Field
//                                                                 type="password"
//                                                                 placeholder=''
//                                                                 name='confirm_password'
//                                                                 className=' outline-none w-full bg-transparent py-2 text-[var(--background-color)] pl-2 tracking-widest'
//                                                             />
//                                                         </div>

//                                                     </div>
//                                                     <ErrorMessage name="confirm_password" component="div" className='text-red-600 text-[14px]' />
//                                                 </div>
//                                                 <div>
//                                                     <button
//                                                         type="submit"
//                                                         className='p-2 text-[#712522] bg-[var(--background-color)] hover:bg-green-500 hover:text-white transition-all duration-300 w-full flex justify-center items-center gap-2 rounded-md '
//                                                     >
//                                                         Reset Password
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
//                                     <div className='flex flex-col justify-center items-center gap-5'>

//                                         <p className='text-[var(--background-color)] text-center'>Password Resetted Successfully. You can log in now !</p>
//                                         <Link
//                                             to='/register'
//                                             className='bg-[var(--background-color)] text-[15px] text-center px-4 py-1 rounded-md flex justify-center items-center gap-2 hover:scale-90 duration-500 transition-all'
//                                         >
//                                             Login Here <FaArrowRight />
//                                         </Link>
//                                     </div>
//                                 </div>
//                             )}

//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ResetPassword;
