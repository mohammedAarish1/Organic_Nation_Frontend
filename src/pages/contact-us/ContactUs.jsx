import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { submitContactForm } from '../../features/contactedUser/contactedUser';
import Logo from '../../components/logo/Logo';
import { ImOffice } from "react-icons/im";
import { BiSolidPhoneCall, BiEnvelope } from "react-icons/bi";
import { GrLinkedin } from "react-icons/gr";
import { FaSquareXTwitter, FaYoutube, FaLeaf } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookCircleFill } from "react-icons/ri";
import SEO from '../../helper/SEO/SEO';
import SubmitButton from '../../components/button/SubmitButton';

// Animated form input component
const AnimatedInputField = ({ label, type, name, isTextarea = false, icon }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="mb-5 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label
        htmlFor={name}
        className="flex items-center mb-2 text-[var(--text-color)] font-medium tracking-wide text-sm"
      >
        {icon && <span className="mr-2 text-[var(--themeColor)]">{icon}</span>}
        {label}
      </label>
      <div className="relative">
        <Field
          as={isTextarea ? "textarea" : "input"}
          type={!isTextarea ? type : undefined}
          name={name}
          rows={isTextarea ? 4 : undefined}
          placeholder={`Enter your ${label.toLowerCase()}`}
          className={`
            w-full py-3 px-4 text-[var(--text-color)] 
            bg-[var(--background-color)] rounded-lg
            border-2 transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:shadow-lg
            ${isFocused
              ? "border-[var(--accent-color)] focus:ring-[var(--accent-color)]"
              : "border-[var(--neutral-color)]"
            }
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="mt-1 text-[var(--alert-color)] text-xs italic"
      />
    </motion.div>
  );
};

// Social media link component
const SocialLink = ({ href, icon, delay }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="text-[var(--text-light-color)] hover:text-[var(--accent-color)] transition-colors duration-300"
  >
    {icon}
  </motion.a>
);

// Main Contact component
const ContactUs = () => {
  const dispatch = useDispatch();
  // const { loading } = useSelector((state) => state.contactedUser);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialValues = {
    fullName: '',
    email: '',
    phoneNumber: '',
    city: '',
    message: '',
  };

  const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  const contactDetailSchema = Yup.object({
    fullName: Yup.string().min(2).max(30).required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
    city: Yup.string().min(2).required('City is required'),
    message: Yup.string(),
  });

  const handleOnSubmit = (values, actions) => {
    dispatch(submitContactForm(values))
      .then(() => {
        setFormSubmitted(true);
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again later.");
      });
    actions.resetForm();
  };

  const socialLinks = [
    { href: 'https://www.linkedin.com/company/earthyfoods-pvt-ltd', icon: <GrLinkedin size={24} />, delay: 0.3 },
    { href: 'https://twitter.com/organicnation_', icon: <FaSquareXTwitter size={24} />, delay: 0.4 },
    { href: 'https://www.facebook.com/organicnation/', icon: <RiFacebookCircleFill size={26} />, delay: 0.5 },
    { href: 'https://www.instagram.com/organicnationadmin/', icon: <FaInstagram size={26} />, delay: 0.6 },
    { href: 'https://www.youtube.com/channel/UCyUSaFyepi2jx_ViFKE0TkA/community', icon: <FaYoutube size={26} />, delay: 0.7 },
  ];

  // Form field configurations
  const formFields = [
    { label: 'Full Name', type: 'text', name: 'fullName', icon: <FaLeaf /> },
    { label: 'Email Address', type: 'email', name: 'email', icon: <BiEnvelope /> },
    { label: 'Phone Number', type: 'tel', name: 'phoneNumber', icon: <BiSolidPhoneCall /> },
    { label: 'City', type: 'text', name: 'city', icon: <ImOffice /> },
    { label: 'Message', type: 'textarea', name: 'message', isTextarea: true, icon: <FaLeaf /> },
  ];

  return (
    <section className="relative bg-[var(--background-color)] overflow-hidden">
      <SEO
        title="Contact Us | Organic Nation"
        description="Our commitment to quality extends beyond honey and preserves. As a prominent trader and supplier, we offer a diverse range of organic & Natural products."
        canonicalUrl="https://organicnation.co.in/contact-us"
        ogTitle="Contact Us | Organic Nation"
        ogDescription="Our commitment to quality extends beyond honey and preserves. As a prominent trader and supplier, we offer a diverse range of organic & Natural products."
        ogUrl="https://organicnation.co.in/contact-us"
        ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
        twitterTitle="Contact Us | Organic Nation"
        twitterDescription="Our commitment to quality extends beyond honey and preserves. As a prominent trader and supplier, we offer a diverse range of organic & Natural products including Honey, oats, soya cheap, and muesli."
        twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
        twitterSite="Organic Nation"
        twitterCreator="organicnation_"
      />

      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-[var(--accent-color)] opacity-10 rounded-full"></div>
      <div className="absolute top-1/3 -right-20 w-60 h-60 bg-[var(--secondary-color)] opacity-10 rounded-full"></div>
      <div className="absolute -bottom-20 left-1/4 w-40 h-40 bg-[var(--themeColor)] opacity-10 rounded-full"></div>

      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-[var(--themeColor)] block">Get in Touch</span>
            <span className="text-[var(--accent-color)] text-2xl sm:text-3xl mt-2 block">We'd love to hear from you</span>
          </h1>
          <motion.div
            className="w-20 h-1 bg-[var(--secondary-color)] mx-auto mt-4"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Main content area */}
        <div className="bg-gradient-to-br from-[#7A2E1D] to-[#9B7A2F] rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Company Information Section */}
            <motion.div
              className="lg:w-2/5 p-8 lg:p-12 bg-opacity-90 text-[var(--text-light-color)]"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-full flex flex-col">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Logo />
                  </motion.div>
                </div>

                {/* Company information */}
                <div className="space-y-8 mb-auto">
                  <motion.div
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-[var(--background-color)] p-3 rounded-full text-[var(--themeColor)]">
                      <ImOffice size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Visit Us</h3>
                      <p className="mt-1 text-sm md:text-base opacity-90">
                        Foodsbay India, Bailparao, Ramnagar Road,
                        <br />Nainital, Uttarakhand-263159
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-[var(--background-color)] p-3 rounded-full text-[var(--themeColor)]">
                      <BiSolidPhoneCall size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Call Us</h3>
                      <p className="mt-1">
                        <a
                          href="tel:+919999532041"
                          className="text-sm md:text-base hover:text-[var(--neutral-color)] transition-colors underline"
                        >
                          +91-9999532041
                        </a>
                        <span className="block text-sm italic opacity-90">(For Bulk Queries)</span>
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="bg-[var(--background-color)] p-3 rounded-full text-[var(--themeColor)]">
                      <BiEnvelope size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email Us</h3>
                      <a
                        href="mailto:info@organicnation.co.in"
                        className="mt-1 block text-sm md:text-base hover:text-[var(--neutral-color)] transition-colors underline"
                      >
                        info@organicnation.co.in
                      </a>
                    </div>
                  </motion.div>
                </div>

                {/* Social links section */}
                <div className="mt-10">
                  <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                  <div className="flex items-center space-x-4">
                    {socialLinks.map((link, index) => (
                      <SocialLink key={index} {...link} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form Section */}
            <motion.div
              className="lg:w-3/5 p-8 lg:p-12 bg-white rounded-tl-3xl rounded-bl-3xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--themeColor)] mb-2">
                  Let's Start a Conversation
                </h2>
                <p className="text-[var(--text-color)] opacity-80">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[var(--background-color)] border-l-4 border-[var(--secondary-color)] p-6 rounded-lg shadow-lg mt-8"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-[var(--secondary-color)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-[var(--themeColor)]">Request submitted!</h3>
                      <div className="mt-2 text-[var(--text-color)]">
                        <p>Thank you for contacting us. We'll get back to you at the earliest.</p>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => setFormSubmitted(false)}
                          className="text-sm font-medium text-[var(--themeColor)] hover:text-[var(--accent-color)] transition-colors duration-200"
                        >
                          Submit another request
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <Formik
                  initialValues={initialValues}
                  validationSchema={contactDetailSchema}
                  onSubmit={handleOnSubmit}
                >
                  {({ values, isSubmitting }) => (
                    <Form>
                      <div className="space-y-1">
                        {formFields.map((field, index) => (
                          <AnimatedInputField
                            key={field.name}
                            label={field.label}
                            type={field.type}
                            name={field.name}
                            isTextarea={field.isTextarea}
                            icon={field.icon}
                          />
                        ))}

                        {/* Submit button */}
                        <SubmitButton isSubmitting={isSubmitting} text='Send Message' />
                      </div>
                    </Form>
                  )}
                </Formik>
              )}

            </motion.div>
          </div>
        </div>

        {/* Google Maps integration - For future implementation */}
        {/* <motion.div 
          className="mt-16 rounded-2xl overflow-hidden shadow-lg h-64 sm:h-96"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3479.5462392579554!2d79.11761611511575!3d29.288735882196605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a092d815cf46cf%3A0x5fc8e515f1ebb3bd!2sRamnagar%20-%20Almora%20Rd%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1652723565252!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" 
            title="Our Location"
          ></iframe>
        </motion.div> */}
      </div>
    </section>
  );
};

export default ContactUs;