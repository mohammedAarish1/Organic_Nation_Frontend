import React, { useEffect, useState } from 'react';
import Logo from '../../components/logo/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { userGoogleSignup } from '../../features/auth/userSlice'
import { useFormik } from 'formik'

import { useNavigate } from 'react-router-dom';
import { requestOTP } from '../../features/auth/OTPSlice';
import { toast } from 'react-toastify';
// import { useHistory } from 'react-router-dom';



const initialValues = {
  phoneNumber: '',
  password: '',
}

const GoogleSignup = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [token, setToken] = useState('');

  const { user, user_loading, error } = useSelector(state => state.user);




  useEffect(() => {
    // Extract token from URL
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    setToken(token)
  }, [])


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: !userExist && signUpSchema,
    onSubmit: (values, action) => {
      // dispatch(userGoogleSignup({ userData: values, token: token }))
      //   .then(() => {
      //     navigate('/register')
      //   })

      if (values.phoneNumber !== '' && values.password !== '') {
        let phoneNumber = '+91' + values.phoneNumber;
        // dispatch the api call function 
        dispatch(requestOTP(phoneNumber))
          .then((value) => {
            if (value.meta.requestStatus === 'fulfilled') {
              toast.success(value.payload.message)
              // setShowOtpInput(true);
              navigate('/otp-submit', { state: { phoneNumber, otherDetails: values, googleSignup: true, token: token } })
            }

          })
      }

      action.resetForm()
    }
  })



  return (
    <section className='xs:px-10 px-2 pb-20 mt-5 sm:mt-0'>
      <div className='lg:w-[80%] h-auto py-2 bg-opacity-35 mx-auto'>
        <h2 className="text- text-center sm:mt-6 mt-10 sm:mb-2 mb-6 text-[var(--bgColorPrimary)] ">Please provide your "Phone number" and "Password"</h2>
        <div className='md:w-[90%] py-10 flex sm:flex-row flex-col sm:gap-0 gap-6 shadow-xl shadow-black justify-center h-[100%] mx-auto  my-auto bg-[var(--bgColorPrimary)] '>

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



              {/* === Form ===  */}

              <form onSubmit={handleSubmit} className="  rounded px-8 pt-6 pb-2 mb-4">


                {/* phone no.  */}

                <div className="mb-4">
                  <label
                    className="uppercase tracking-widest block text-[var(--bgColorSecondary)] text-sm font-bold mb-2" htmlFor="phoneNumber">
                    Phone No.
                  </label>
                  <input
                    className="shadow appearance-none border bg-[var(--bgColorPrimary)] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    id="phoneNumber"
                    type="text"
                    maxLength={10}
                    minLength={10}
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <p className='text-red-600'>*{errors.phoneNumber}</p>
                  ) : (
                    null
                  )}
                </div>

                {/* password input  */}
                <div className="mb-6">
                  <label className="uppercase tracking-widest block text-[var(--bgColorSecondary)] text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border  bg-[var(--bgColorPrimary)] w-full py-2 px-3 text-white  leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  // required
                  />
                  {errors.password && touched.password ? (
                    <p className='text-red-600'>*{errors.password}</p>
                  ) : (
                    null
                  )}
                  <p className='text-end text-[var(--bgColorSecondary)] text-[11px] hover:underline cursor-pointer'>Forgot Password</p>
                </div>


                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-[var(--bgColorSecondary)] hover:bg-green-700 hover:text-white text-[var(--bgColorPrimary)] font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
                  >
                    {user_loading ? "Signing Up" : "Continue with Google Sign up"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleSignup;
