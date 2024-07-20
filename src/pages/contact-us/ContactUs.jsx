import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { submitContactForm } from '../../features/contactedUser/contactedUser';
import Logo from '../../components/logo/Logo';

// react icons 
import { ImOffice, ImFacebook2 } from "react-icons/im";
import { BiSolidPhoneCall } from "react-icons/bi";
import { GrLinkedin } from "react-icons/gr";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";


const ContactUs = () => {


  const dispatch = useDispatch();

  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',

  }

  const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;


  const contactDetailSchema = Yup.object({
    fullName: Yup.string().min(2).max(20).required('Please enter your name'),
    email: Yup.string().email(),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Please enter your phone number'),
    city: Yup.string().min(2).required('Please enter city'),
    // confirm_password: Yup.string().required().oneOf([Yup.ref('password'), null], 'Password must match')
  })

  const handleOnSubmit = (values, action) => {
    console.log("form submitted", values);
    dispatch(submitContactForm(values))
      .then((res) => {
        console.log('adfasdfasdf', res.payload.message)
        toast.success(res.payload.message)
      })

    action.resetForm()
  }

  return (
    <section className='xs:px-10 px-2 pb-20 mt-5 sm:mt-0 font-mono'>

      <div className='lg:w-[90%] h-auto py-2 bg-opacity-35 mx-auto'>
        <h2 className="text-4xl text-center sm:mt-6 mt-10 sm:mb-2 mb-6 text-[var(--bgColorPrimary)] ">Contact us</h2>
        <div className='md:w-[95%] pb-16 pt-16 flex sm:gap-0 gap-20 sm:flex-row flex-col  justify-center h-[100%] mx-auto  my-auto bg-[var(--bgColorPrimary)] '>

          {/* right side  */}
          <div className='sm:w-[40%] mt-3 sm:mt-0  '>
            <div className='flex flex-col gap-5 text-[var(--bgColorSecondary)] text-sm justify-center h-full items-center px-3 '>
              <Logo />
              <h2 className="text-lg font-semibold ">Company Information</h2>
              <ImOffice className='text-5xl' />
              <p className='xs:w-[50%] w-[90%] text-center'><span className='font-semibold'>Work Address:</span> M/s Earthy Foods Private Limited Bailparao,
                Ramnagar Road, Nainital, Uttarakhand-263159</p>
              <BiSolidPhoneCall className='text-5xl animate-pulse' />
              <p><span className='font-semibold'>Phone</span> +91-9999532041 (For Bulk Queries)</p>
              <p><span className='font-semibold'>Email:</span> info@earthyfoods.net</p>
              {/* follow us  */}
              <div className='flex justify-center items-center gap-3'>
                <h2>Follow us on:</h2>
                <a href=" https://www.linkedin.com/company/earthyfoods-pvt-ltd" target='_blank'><GrLinkedin className='text-[30px]  hover:text-[var(--bgColorSecondary)]' /></a>
                <a href="https://twitter.com/organicnation_" target='_blank'><FaSquareXTwitter className='text-[33px] hover:text-[var(--bgColorSecondary)] ' /></a>
                <a href="https://www.facebook.com/organicnation/" target='_blank'><ImFacebook2 className='text-[29px] hover:text-[var(--bgColorSecondary)] ' /></a>
                <a href="https://www.instagram.com/organicnationadmin/" target='_blank'><FaInstagramSquare className='text-[33px]  hover:text-[var(--bgColorSecondary)]' /></a>

              </div>
            </div>


          </div>

          {/* left side  */}
          <div className='sm:w-[60%]'>
            <div className="sm:w-[90%]  mx-auto">

              <h2 className='px-8 text-[var(--bgColorSecondary)] mb-2  text-2xl'><span className=''>Have Questions?</span> Get in touch with us today</h2>
              <p className='px-8 text-gray-400'>Please fill in the below details, we'll get back to you! </p>



              <Formik
                initialValues={initialValues}
                validationSchema={contactDetailSchema}
                onSubmit={handleOnSubmit}
              >
                {({ values }) => (
                  <Form >
                    <div className="  rounded px-8 pt-6 pb-2 mb-4">
                      {/* name input  */}
                      <div className="mb-4">
                        <label htmlFor="fullName" className="block text-[var(--bgColorSecondary)] uppercase text-sm font- mb-2" >
                          Your Name
                        </label>
                        <Field
                          type="text"
                          id="fullName"
                          name="fullName"
                          className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="fullName" component="div" className='text-red-600 text-[14px]' />

                      </div>

                      {/* Email input  */}
                      <div className="mb-4">
                        <label className="block text-[var(--bgColorSecondary)] uppercase text-sm  mb-2" htmlFor="email">
                          Your Email
                        </label>
                        <Field
                          type="text"
                          id="email"
                          name="email"
                          className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="email" component="div" className='text-red-600 text-[14px]' />
                      </div>
                      {/* phone no. input  */}
                      <div className="mb-4">
                        <label className="block text-[var(--bgColorSecondary)] uppercase text-sm  mb-2" htmlFor="phoneNumber">
                          Phone No.
                        </label>
                        <Field
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="phoneNumber" component="div" className='text-red-600 text-[14px]' />
                      </div>

                      {/* city  */}
                      <div className="mb-4">
                        <label className="block text-[var(--bgColorSecondary)] uppercase text-sm font- mb-2" htmlFor="city">
                          Your City
                        </label>
                        <Field
                          type="text"
                          id="city"
                          name="city"
                          className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="city" component="div" className='text-red-600 text-[14px]' />
                      </div>

                      {/* submit button  */}
                      <div className="flex items-center justify-end mt-6">
                        <button
                          className="bg-[var(--bgColorSecondary)] w-full hover:bg-green-700 hover:text-white text-[var(--bgColorPrimary)] font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                          Submit Your Request
                        </button>
                      </div>
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

export default ContactUs;
