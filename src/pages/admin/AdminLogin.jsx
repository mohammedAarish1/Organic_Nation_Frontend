// src/LoginForm.js
import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { adminLogin, fetchAdminData } from '../../features/admin/adminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Logo from '../../components/logo/Logo'
import { toast, ToastContainer } from 'react-toastify';


// Example URL for background image (use your own image URL)
const backgroundImageUrl = 'https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-56228.jpg?t=st=1724734255~exp=1724737855~hmac=b261b59d1919bd74a703e91e6d3311f4d8059c0a2c82e8f31ace4351a71b0202&w=1060';

const AdminLogin = () => {

  // State to store token
  // const [adminToken, setAdminToken] = useState(JSON.parse(sessionStorage.getItem('adminToken')));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));


  const initialValues = {
    username: '',
    password: '',
    secretKey: '',
  }

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    secretKey: Yup.string().required('Required'),
  })



  const handleFormSubmission = (values) => {

    dispatch(adminLogin(values))
      .then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          const adminToken = res.payload.token;
          sessionStorage.setItem("adminToken", JSON.stringify(adminToken));
          dispatch(fetchAdminData(adminToken));
          toast.info(res.payload?.message)
        }else{
          toast.error(res.payload?.message || 'Network Error')
        }
      })
     
  }



  useEffect(() => {
    if (adminToken) {
      navigate('/admin');
    }
  }, [navigate, adminToken]);

  return (
    <div>
          <ToastContainer position='bottom-right' autoClose={1000} />
      <div
        className="relative min-h-screen flex items-center justify-center "
        style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='z-50 fixed top-10 left-10'>

          <Logo />
        </div>

        {/* Backdrop with blur effect */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg "></div>
        <div>

        </div>

        <div className="relative z-10 p-8 text-white  rounded-lg shadow-2xl w-full max-w-md">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmission}
          >
            {() => (
              <Form>
                <h1 className="text-2xl font-bold mb-6 text-center ">Admin Login</h1>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm   mb-1 uppercase tracking-widest">
                    Username
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className="w-full px-3 py-2 text-black  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm uppercase tracking-widest  mb-1">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div className="mb-6">
                  <label htmlFor="secretkey" className="block text-sm uppercase tracking-widest  mb-1">
                    Secret Key
                  </label>
                  <Field
                    type="text"
                    id="secretKey"
                    name="secretKey"
                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <ErrorMessage name="secretKey" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  // disabled={isSubmitting}
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
