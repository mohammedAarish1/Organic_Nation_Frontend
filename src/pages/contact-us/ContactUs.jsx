import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { submitContactForm } from '../../features/contactedUser/contactedUser';
import Logo from '../../components/logo/Logo';

// react icons 
import { ImOffice, ImFacebook2, ImSpinner9 } from "react-icons/im";
import { BiSolidPhoneCall } from "react-icons/bi";
import { GrLinkedin } from "react-icons/gr";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaArrowRight, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import SEO from '../../helper/SEO/SEO';


const ContactUs = () => {


  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    message: '',

  }

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.contactedUser);


  const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;


  const contactDetailSchema = Yup.object({
    fullName: Yup.string().min(2).max(20).required('Please enter your name'),
    email: Yup.string().email(),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Please enter your phone number'),
    city: Yup.string().min(2).required('Please enter city'),
    message: Yup.string()
    // confirm_password: Yup.string().required().oneOf([Yup.ref('password'), null], 'Password must match')
  })

  const handleOnSubmit = (values, action) => {
    dispatch(submitContactForm(values))
      .then((res) => {
        toast.success(res.payload.message)
      })

    action.resetForm()
  }

  return (
    <section className='xs:px-10 px-2 pb-20 mt-5 sm:mt-0 font-mono'>
      <SEO
        title="Contact Us | Organic Nation "
        description="Our commitment to quality extends beyond honey and preserves. As a prominent trader and supplier, we offer a diverse range of organic & Natural products."
        canonicalUrl="https://organicnation.co.in/contact-us"
        ogTitle="Contact Us | Organic Nation"
        ogDescription="Our commitment to quality extends beyond honey and preserves. As a prominent trader and supplier, we offer a diverse range of organic & Natural products."
        ogUrl="https://organicnation.co.in/contact-us"
        ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
        ogImageWidth="478"
        ogImageHeight="446"
        twitterTitle="Contact Us | Organic Nation "
        twitterDescription="Our commitment to quality extends beyond honey and preserves. As a prominent trader and supplier, we offer a diverse range of organic & Natural products including Honey, oats, soya cheap, and muesli."
        twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
        twitterSite="Organic Nation"
        twitterCreator="organicnation_"
      />

      <div className='lg:w-[90%] h-auto py-2 bg-opacity-35 mx-auto'>
        <h2 className="mb-4 text-2xl text-center font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl"><span className=" bg-clip-text text-[var(--themeColor)]">Contact Us</span></h2>
        <div className='md:w-[95%] py-16 flex md:gap-0 gap-20 md:flex-row flex-col  justify-center h-[100%] mx-auto  my-auto  bg-gradient-to-r from-[#6D613B] to-[#D3BB71] '>

          {/* right side  */}
          <div className='md:w-[40%] mt-3 sm:mt-0   '>
            <div className='flex flex-col gap-5 text-[var(--bgColorSecondary)] text-sm justify-center h-full items-center px-3 '>
              <Logo />
              <h2 className="text-lg font-semibold ">Company Information</h2>
              <ImOffice className='text-5xl' />
              <p className='xs:w-[50%] w-[90%] text-center'><span className='font-semibold'>Work Address:</span> Foodsbay India, Bailparao,
                Ramnagar Road, Nainital, Uttarakhand-263159</p>
              <BiSolidPhoneCall className='text-5xl animate-pulse' />
              <p className='text-center'><span className='font-semibold'>Phone</span> <a href="tel:+919999532041" className='underline underline-offset-2 '>+91-9999532041</a> (For Bulk Queries)</p>
              <p>Email: <a href="mailto:info@organicnation.co.in" className='underline underline-offset-2'>info@organicnation.co.in</a> </p>
              {/* follow us  */}
              <div className='flex sm:flex-row flex-col justify-center items-center gap-3'>
                <h2>Follow us on:</h2>
                <div className='flex justify-center items-center gap-3'>
                  <a href=" https://www.linkedin.com/company/earthyfoods-pvt-ltd" target='_blank'><GrLinkedin className='text-[28px]  hover:text-[var(--bgColorSecondary)] hover:text-white' /></a>
                  <a href="https://twitter.com/organicnation_" target='_blank'><FaSquareXTwitter className='text-[33px] hover:text-[var(--bgColorSecondary)] hover:text-white ' /></a>
                  <a href="https://www.facebook.com/organicnation/" target='_blank'><ImFacebook2 className='text-[28px] hover:text-[var(--bgColorSecondary)] hover:text-white ' /></a>
                  <a href="https://www.instagram.com/organicnationadmin/" target='_blank'><FaInstagramSquare className='text-[33px]  hover:text-[var(--bgColorSecondary)] hover:text-white' /></a>
                  <a href="https://www.youtube.com/channel/UCyUSaFyepi2jx_ViFKE0TkA/community?pvf=CAI%253D" target='_blank'><FaYoutube className='text-[40px]  hover:text-[var(--bgColorSecondary)] hover:text-white' /></a>
                </div>
              </div>
            </div>


          </div>

          {/* left side  */}
          <div className='md:w-[60%] '>
            <div className="sm:w-[90%]  mx-auto">

              <h2 className='px-8 text-[var(--themeColor)] font-semibold mb-2  text-2xl'><span className=''>Have Questions?</span> Get in touch with us today</h2>
              <p className='px-8 text-gray-700'>Please fill in the below details, we'll get back to you! </p>



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
                        <label htmlFor="fullName" className="block text-[var(--themeColor)] font-bold tracking-widest uppercase text-sm font- mb-2" >
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
                        <label className="block text-[var(--themeColor)] font-bold tracking-widest uppercase text-sm  mb-2" htmlFor="email">
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
                        <label className="block text-[var(--themeColor)] font-bold tracking-widest uppercase text-sm  mb-2" htmlFor="phoneNumber">
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
                        <label className="block text-[var(--themeColor)] font-bold tracking-widest uppercase text-sm font- mb-2" htmlFor="city">
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
                      {/* message  */}
                      <div className="mb-4">
                        <label className="block text-[var(--themeColor)] font-bold tracking-widest uppercase text-sm font- mb-2" htmlFor="city">
                          Message (optional)
                        </label>
                        <Field
                          // type="text"
                          as="textarea"
                          placeholder='Type your message here..'
                          id="message"
                          name="message"
                          className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage name="message" component="div" className='text-red-600 text-[14px]' />
                      </div>

                      {/* submit button  */}
                      <div className="flex items-center justify-end mt-6">
                        <button
                          type="submit"
                          className="bg-[var(--bgColorSecondary)] flex justify-center items-center gap-3 w-full hover:bg-green-700 hover:text-white text-[var(--bgColorPrimary)] font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
                        >
                          Submit Your Request
                          {loading ? (
                            <ImSpinner9 className='animate-spin' />
                          ) : (
                            <FaArrowRight />
                          )}
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
