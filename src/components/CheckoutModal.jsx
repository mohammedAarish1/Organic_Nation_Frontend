// import React, { useState, useRef, useEffect } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import {
//     FaShoppingCart,
//     FaChevronDown,
//     FaChevronUp,
//     FaTimes,
//     FaTag,
//     FaHome,
//     FaBriefcase,
//     FaMapMarkerAlt,
//     FaMoneyBillWave,
//     FaCreditCard,
//     FaPercent
// } from 'react-icons/fa';
// import { RxCross2 } from "react-icons/rx";

// const CheckoutModal = ({ isOpen, onClose }) => {
//     const [step, setStep] = useState(1);
//     const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
//     const [couponOpen, setCouponOpen] = useState(false);
//     const [phoneVerified, setPhoneVerified] = useState(false);
//     const [addressType, setAddressType] = useState('Home');
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [showOtpInput, setShowOtpInput] = useState(false);
//     const otpInputs = Array(4).fill(0).map(() => useRef(null));

//     const handlePhoneSubmit = () => {
//         setShowOtpInput(true);
//     };

//     const handleOtpSubmit = () => {
//         setPhoneVerified(true);
//         setStep(2);
//     };

//     const handleOtpChange = (index, value) => {
//         if (value.length === 1 && index < 3) {
//             otpInputs[index + 1].current.focus();
//         }
//     };

//     const handleOtpKeyDown = (e, index) => {
//         if (e.key === 'Backspace' && index > 0 && otpInputs[index].current.value === '') {
//             otpInputs[index - 1].current.focus();
//         }
//     };

//     const handleOtpPaste = (e) => {
//         e.preventDefault();
//         const pastedData = e.clipboardData.getData('text');
//         if (pastedData.length === 4 && /^\d+$/.test(pastedData)) {
//             for (let i = 0; i < 4; i++) {
//                 otpInputs[i].current.value = pastedData[i];
//             }
//             setTimeout(handleOtpSubmit, 500);
//         }
//     };

//     // Demo data
//     const cartItems = [
//         {
//             id: 1,
//             name: 'Wireless Headphones',
//             price: 129.99,
//             quantity: 1,
//             image: '/api/placeholder/80/80'
//         },
//         {
//             id: 2,
//             name: 'Smartphone Case',
//             price: 24.99,
//             quantity: 2,
//             image: '/api/placeholder/80/80'
//         }
//     ];

//     const coupons = [
//         { code: 'WELCOME10', discount: '10% off', description: 'For new customers' },
//         { code: 'FREESHIP', discount: 'Free shipping', description: 'On orders above $50' },
//         { code: 'SUMMER25', discount: '25% off', description: 'Season special' }
//     ];

//     const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const shippingFee = 5.99;
//     const total = subtotal + shippingFee;

//     const phoneSchema = Yup.object().shape({
//         phone: Yup.string()
//             .matches(/^\d{10}$/, 'Phone number must be 10 digits')
//             .required('Phone number is required')
//     });

//     const checkoutSchema = Yup.object().shape({
//         phone: Yup.string()
//             .matches(/^\d{10}$/, 'Phone number must be 10 digits')
//             .required('Phone number is required'),
//         fullName: Yup.string()
//             .required('Full name is required')
//             .min(3, 'Name must be at least 3 characters'),
//         email: Yup.string()
//             .email('Invalid email address')
//             .required('Email is required'),
//         address: Yup.string()
//             .required('Address is required')
//             .min(5, 'Address is too short'),
//         pincode: Yup.string()
//             .matches(/^\d{6}$/, 'Pincode must be 6 digits')
//             .required('Pincode is required'),
//         city: Yup.string()
//             .required('City is required'),
//         state: Yup.string()
//             .required('State is required'),
//     });

//     if (!isOpen) return null;

//     const modalAnimation = 'animate-fadeIn';
//     const slideInAnimation = 'animate-slideInRight';

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//             <div className={`bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-lg relative ${modalAnimation}`}>
//                 {/* Close button */}
//                 <div className='text-end mr-2 mt-1 '>
//                     <button
//                         onClick={onClose}
//                         className=" text-gray-500 hover:text-gray-700 transition-colors  hover:bg-gray-100 p-2 rounded-full"
//                     >
//                         <RxCross2 size={20} />
//                     </button>
//                 </div>

//                 {/* Header */}
//                 <div className="flex justify-between items-center px-4 pb-4 border-b">
//                     <div className="flex items-center">
//                         <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png' alt="Company Logo" className="h-10" />
//                     </div>
//                     <div className="text-right">
//                         {/* <p className="text-sm text-gray-500">Total</p> */}
//                         <p className="text-xl font-bold">${total.toFixed(2)}</p>
//                     </div>
//                 </div>

//                 {/* Body */}
//                 <div className="p-4 max-h-[70vh] overflow-y-auto">
//                     {/* Order Summary */}
//                     <div className="mb-4">
//                         <button
//                             className="w-full flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                             onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
//                         >
//                             <span className="font-medium flex items-center">
//                                 <FaShoppingCart className="mr-2" />
//                                 Order Summary
//                             </span>
//                             {orderSummaryOpen ? <FaChevronUp /> : <FaChevronDown />}
//                         </button>

//                         {orderSummaryOpen && (
//                             <div className="mt-2 p-3 bg-gray-50 rounded-lg animate-expandVertical">
//                                 {cartItems.map(item => (
//                                     <div key={item.id} className="flex items-center mb-3 pb-3 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
//                                         <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-3" />
//                                         <div className="flex-1">
//                                             <h4 className="font-medium">{item.name}</h4>
//                                             <p className="text-gray-500">Qty: {item.quantity}</p>
//                                         </div>
//                                         <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
//                                     </div>
//                                 ))}

//                                 <div className="mt-3 pt-3 border-t border-gray-200">
//                                     <div className="flex justify-between mb-1">
//                                         <span>Subtotal</span>
//                                         <span>${subtotal.toFixed(2)}</span>
//                                     </div>
//                                     <div className="flex justify-between mb-1">
//                                         <span>Shipping</span>
//                                         <span>${shippingFee.toFixed(2)}</span>
//                                     </div>
//                                     <div className="flex justify-between font-bold text-lg mt-2">
//                                         <span>Total</span>
//                                         <span>${total.toFixed(2)}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Coupon */}
//                     <div className="mb-4 relative">
//                         <button
//                             className="w-full flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                             onClick={() => setCouponOpen(!couponOpen)}
//                         >
//                             <span className="font-medium flex items-center">
//                                 <FaTag className="mr-2" />
//                                 Apply Coupon
//                             </span>
//                             {couponOpen ? <FaChevronUp /> : <FaChevronDown />}
//                         </button>

//                         {couponOpen && (
//                             <div className="mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-md animate-expandVertical">
//                                 <h3 className="text-lg font-bold mb-3">Available Coupons</h3>
//                                 <div className="space-y-3">
//                                     {coupons.map(coupon => (
//                                         <div key={coupon.code} className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 transition-colors">
//                                             <div className="flex justify-between mb-1">
//                                                 <span className="font-bold text-blue-600">{coupon.code}</span>
//                                                 <span className="text-green-600 font-medium">{coupon.discount}</span>
//                                             </div>
//                                             <p className="text-sm text-gray-500">{coupon.description}</p>
//                                             <button
//                                                 className="mt-2 w-full py-1 bg-blue-100 text-blue-600 rounded font-medium hover:bg-blue-200 transition-colors"
//                                                 onClick={() => {
//                                                     // Apply coupon logic
//                                                     setCouponOpen(false);
//                                                 }}
//                                             >
//                                                 Apply
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Phone Verification */}
//                     {step === 1 && !phoneVerified && (
//                         <div className="mb-4">
//                             <h3 className="font-medium mb-2">Enter your phone number</h3>
//                             <Formik
//                                 initialValues={{ phone: '' }}
//                                 validationSchema={phoneSchema}
//                                 onSubmit={handlePhoneSubmit}
//                             >
//                                 {({ isSubmitting }) => (
//                                     <Form>
//                                         <div className="mb-3">
//                                             <Field
//                                                 type="text"
//                                                 name="phone"
//                                                 placeholder="10-digit phone number"
//                                                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             />
//                                             <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
//                                         </div>

//                                         <button
//                                             type="submit"
//                                             disabled={isSubmitting}
//                                             className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                                         >
//                                             {isSubmitting ? 'Sending OTP...' : 'Get OTP'}
//                                         </button>
//                                     </Form>
//                                 )}
//                             </Formik>
//                         </div>
//                     )}

//                     {/* OTP Verification */}
//                     {step === 1 && showOtpInput && !phoneVerified && (
//                         <div className="mb-4 animate-fadeIn">
//                             <h3 className="font-medium mb-2">Enter OTP sent to your phone</h3>
//                             <div className="flex justify-center gap-5 mb-3">
//                                 {Array(4).fill(0).map((_, index) => (
//                                     <input
//                                         key={index}
//                                         ref={otpInputs[index]}
//                                         type="text"
//                                         maxLength={1}
//                                         className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         onChange={(e) => handleOtpChange(index, e.target.value)}
//                                         onKeyDown={(e) => handleOtpKeyDown(e, index)}
//                                         onPaste={index === 0 ? handleOtpPaste : null}
//                                         inputMode="numeric"
//                                     />
//                                 ))}
//                             </div>
//                             <div className="text-center">
//                                 <button
//                                     onClick={handleOtpSubmit}
//                                     className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
//                                 >
//                                     Verify OTP
//                                 </button>
//                                 <p className="text-sm text-gray-500 mt-2">
//                                     Didn't receive the code? <button className="text-blue-600">Resend</button>
//                                 </p>
//                             </div>
//                         </div>
//                     )}

//                     {/* Checkout Form */}
//                     {step === 2 && (
//                         <div className="animate-fadeIn">
//                             <Formik
//                                 initialValues={{
//                                     phone: '1234567890', // Pre-filled phone number
//                                     fullName: '',
//                                     email: '',
//                                     address: '',
//                                     pincode: '',
//                                     city: '',
//                                     state: '',
//                                 }}
//                                 validationSchema={checkoutSchema}
//                                 onSubmit={(values) => {
//                                     // Handle form submission
//                                     console.log(values, addressType, paymentMethod);
//                                     if (paymentMethod === 'online') {
//                                         // Redirect to payment gateway
//                                     } else {
//                                         // Process COD order
//                                     }
//                                 }}
//                             >
//                                 {({ isSubmitting }) => (
//                                     <Form>
//                                         <div className="space-y-4 mb-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium mb-1">Phone Number</label>
//                                                 <Field
//                                                     type="text"
//                                                     name="phone"
//                                                     disabled={true}
//                                                     className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg"
//                                                 />
//                                             </div>

//                                             <div>
//                                                 <label className="block text-sm font-medium mb-1">Full Name</label>
//                                                 <Field
//                                                     type="text"
//                                                     name="fullName"
//                                                     placeholder="Enter your full name"
//                                                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 />
//                                                 <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
//                                             </div>

//                                             <div>
//                                                 <label className="block text-sm font-medium mb-1">Email</label>
//                                                 <Field
//                                                     type="email"
//                                                     name="email"
//                                                     placeholder="Enter your email"
//                                                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 />
//                                                 <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//                                             </div>

//                                             <div>
//                                                 <label className="block text-sm font-medium mb-1">Address</label>
//                                                 <Field
//                                                     as="textarea"
//                                                     name="address"
//                                                     placeholder="Enter your address"
//                                                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
//                                                 />
//                                                 <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
//                                             </div>

//                                             <div className="grid grid-cols-2 gap-4">
//                                                 <div>
//                                                     <label className="block text-sm font-medium mb-1">Pincode</label>
//                                                     <Field
//                                                         type="text"
//                                                         name="pincode"
//                                                         placeholder="6-digit pincode"
//                                                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                     />
//                                                     <ErrorMessage name="pincode" component="div" className="text-red-500 text-sm mt-1" />
//                                                 </div>

//                                                 <div>
//                                                     <label className="block text-sm font-medium mb-1">City</label>
//                                                     <Field
//                                                         type="text"
//                                                         name="city"
//                                                         placeholder="City"
//                                                         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                     />
//                                                     <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
//                                                 </div>
//                                             </div>

//                                             <div>
//                                                 <label className="block text-sm font-medium mb-1">State</label>
//                                                 <Field
//                                                     type="text"
//                                                     name="state"
//                                                     placeholder="State"
//                                                     className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                                 />
//                                                 <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
//                                             </div>

//                                             <div>
//                                                 <label className="block text-sm font-medium mb-1">Save Address As</label>
//                                                 <div className="flex space-x-3">
//                                                     <button
//                                                         type="button"
//                                                         className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center ${addressType === 'Home' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'
//                                                             }`}
//                                                         onClick={() => setAddressType('Home')}
//                                                     >
//                                                         <FaHome className="mr-2" /> Home
//                                                     </button>
//                                                     <button
//                                                         type="button"
//                                                         className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center ${addressType === 'Office' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'
//                                                             }`}
//                                                         onClick={() => setAddressType('Office')}
//                                                     >
//                                                         <FaBriefcase className="mr-2" /> Office
//                                                     </button>
//                                                     <button
//                                                         type="button"
//                                                         className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center ${addressType === 'Other' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'
//                                                             }`}
//                                                         onClick={() => setAddressType('Other')}
//                                                     >
//                                                         <FaMapMarkerAlt className="mr-2" /> Other
//                                                     </button>
//                                                 </div>
//                                             </div>

//                                             <div>
//                                                 <label className="block text-sm font-medium mb-2">Payment Method</label>
//                                                 <div className="space-y-3">
//                                                     <button
//                                                         type="button"
//                                                         className={`w-full p-3 rounded-lg border flex items-center justify-between ${paymentMethod === 'cod' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'
//                                                             }`}
//                                                         onClick={() => setPaymentMethod('cod')}
//                                                     >
//                                                         <div className="flex items-center">
//                                                             <FaMoneyBillWave className="mr-3 text-green-600" size={18} />
//                                                             <span>Cash on Delivery</span>
//                                                         </div>
//                                                     </button>

//                                                     <button
//                                                         type="button"
//                                                         className={`w-full p-3 rounded-lg border flex items-center justify-between relative ${paymentMethod === 'online' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300'
//                                                             }`}
//                                                         onClick={() => setPaymentMethod('online')}
//                                                     >
//                                                         <div className="flex items-center">
//                                                             <FaCreditCard className="mr-3 text-blue-600" size={18} />
//                                                             <span>Online Payment</span>
//                                                         </div>
//                                                         <div className="absolute right-0 top-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg flex items-center">
//                                                             <FaPercent className="mr-1" size={10} />
//                                                             10% off
//                                                         </div>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <button
//                                             type="submit"
//                                             disabled={isSubmitting || !paymentMethod}
//                                             className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 mt-4"
//                                         >
//                                             {paymentMethod === 'online' ? 'Proceed to Pay' : 'Place Order'}
//                                         </button>
//                                     </Form>
//                                 )}
//                             </Formik>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Add custom animations to tailwind
// const customStyles = `
//   @keyframes fadeIn {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }
  
//   @keyframes slideInRight {
//     from { transform: translateX(100%); }
//     to { transform: translateX(0); }
//   }
  
//   @keyframes expandVertical {
//     from { max-height: 0; opacity: 0; }
//     to { max-height: 500px; opacity: 1; }
//   }
  
//   .animate-fadeIn {
//     animation: fadeIn 0.3s ease-out forwards;
//   }
  
//   .animate-slideInRight {
//     animation: slideInRight 0.3s ease-out forwards;
//   }
  
//   .animate-expandVertical {
//     animation: expandVertical 0.3s ease-out forwards;
//     overflow: hidden;
//   }
// `;

// // Usage example
// const App = () => {
//     const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

//     return (
//         <div className="p-4">
//             <style>{customStyles}</style>
//             <button
//                 onClick={() => setIsCheckoutOpen(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//                 Open Checkout
//             </button>

//             <CheckoutModal
//                 isOpen={isCheckoutOpen}
//                 onClose={() => setIsCheckoutOpen(false)}
//                 logo="/api/placeholder/120/40"
//             />
//         </div>
//     );
// };

// export default App;



import React, { useState, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  FaShoppingCart, FaChevronDown, FaChevronUp, FaTag,
  FaHome, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave,
  FaCreditCard, FaPercent
} from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";

// CSS-in-JS for animations, properly scoped using a unique class
const CheckoutModalAnimations = () => (
  <style jsx global>{`
    .checkout-animations .fade-in {
      animation: fadeIn 0.4s ease-out forwards;
    }
    
    .checkout-animations .slide-in {
      animation: slideIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    .checkout-animations .expand {
      animation: expand 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
      overflow: hidden;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideIn {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes expand {
      from { max-height: 0; opacity: 0; }
      to { max-height: 800px; opacity: 1; }
    }
    
    .checkout-animations .pulse-btn {
      transition: all 0.3s;
    }
    
    .checkout-animations .pulse-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
  `}</style>
);

// Single Cart Item Component
const CartItem = ({ item }) => (
  <div className="flex items-center mb-3 pb-3 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-3 border border-gray-100" />
    <div className="flex-1">
      <h4 className="font-medium">{item.name}</h4>
      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
    </div>
    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
  </div>
);

// Coupon Component
const CouponItem = ({ coupon, onApply }) => (
  <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 transition-colors bg-white hover:bg-blue-50">
    <div className="flex justify-between mb-1">
      <span className="font-bold text-blue-600">{coupon.code}</span>
      <span className="text-green-600 font-medium">{coupon.discount}</span>
    </div>
    <p className="text-sm text-gray-500">{coupon.description}</p>
    <button
      className="mt-2 w-full py-1.5 bg-blue-100 text-blue-600 rounded font-medium hover:bg-blue-200 transition-colors pulse-btn"
      onClick={() => onApply(coupon)}
    >
      Apply
    </button>
  </div>
);

// OTP Input Component
const OtpInput = ({ otpInputs, handleOtpChange, handleOtpKeyDown, handleOtpPaste }) => (
  <div className="flex justify-center gap-3 mb-3">
    {Array(4).fill(0).map((_, index) => (
      <input
        key={index}
        ref={otpInputs[index]}
        type="text"
        maxLength={1}
        className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        onChange={(e) => handleOtpChange(index, e.target.value)}
        onKeyDown={(e) => handleOtpKeyDown(e, index)}
        onPaste={index === 0 ? handleOtpPaste : null}
        inputMode="numeric"
      />
    ))}
  </div>
);

// Main CheckoutModal Component
const CheckoutModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [addressType, setAddressType] = useState('Home');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  
  const otpInputs = Array(4).fill(0).map(() => useRef(null));

  // Data
  const cartItems = [
    { id: 1, name: 'Wireless Headphones', price: 129.99, quantity: 1, image: '/api/placeholder/80/80' },
    { id: 2, name: 'Smartphone Case', price: 24.99, quantity: 2, image: '/api/placeholder/80/80' }
  ];

  const coupons = [
    { code: 'WELCOME10', discount: '10% off', description: 'For new customers' },
    { code: 'FREESHIP', discount: 'Free shipping', description: 'On orders above $50' },
    { code: 'SUMMER25', discount: '25% off', description: 'Season special' }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = 5.99;
  const discount = appliedCoupon ? (appliedCoupon.code === 'WELCOME10' ? subtotal * 0.1 : 0) : 0;
  const total = subtotal + shippingFee - discount;

  // Form validation schemas
  const phoneSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required')
  });

  const checkoutSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    fullName: Yup.string()
      .required('Full name is required')
      .min(3, 'Name must be at least 3 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    address: Yup.string()
      .required('Address is required')
      .min(5, 'Address is too short'),
    pincode: Yup.string()
      .matches(/^\d{6}$/, 'Pincode must be 6 digits')
      .required('Pincode is required'),
    city: Yup.string()
      .required('City is required'),
    state: Yup.string()
      .required('State is required'),
  });

  // Handlers
  const handlePhoneSubmit = () => setShowOtpInput(true);

  const handleOtpSubmit = () => {
    setPhoneVerified(true);
    setStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (value.length === 1 && index < 3) {
      otpInputs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && otpInputs[index].current.value === '') {
      otpInputs[index - 1].current.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (pastedData.length === 4 && /^\d+$/.test(pastedData)) {
      for (let i = 0; i < 4; i++) {
        otpInputs[i].current.value = pastedData[i];
      }
      setTimeout(handleOtpSubmit, 500);
    }
  };

  const handleApplyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
    setCouponOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 checkout-animations">
      <CheckoutModalAnimations />
      
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md md:max-w-lg relative fade-in">
        {/* Close button */}
        <div className="flex justify-end p-2">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors hover:bg-gray-100 p-2 rounded-full"
          >
            <RxCross2 size={20} />
          </button>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-6 pb-4 border-b mb-4">
          <div className="flex items-center">
            <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png' alt="Company Logo" className="h-10" />
          </div>
          <div className="text-right">
            <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 max-h-[70vh] overflow-y-auto">
          {/* Order Summary */}
          <div className="mb-4">
            <button
              className="w-full flex justify-between items-center p-3.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
              onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
            >
              <span className="font-medium flex items-center">
                <FaShoppingCart className="mr-2 text-blue-600" />
                Order Summary
              </span>
              {orderSummaryOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {orderSummaryOpen && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg expand">
                {cartItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Shipping</span>
                    <span>${shippingFee.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between mb-1 text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Coupon */}
          <div className="mb-6 relative">
            <button
              className="w-full flex justify-between items-center p-3.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
              onClick={() => setCouponOpen(!couponOpen)}
            >
              <span className="font-medium flex items-center">
                <FaTag className="mr-2 text-purple-600" />
                {appliedCoupon ? `Applied: ${appliedCoupon.code}` : 'Apply Coupon'}
              </span>
              {couponOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {couponOpen && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg shadow-md expand">
                <h3 className="text-lg font-bold mb-3">Available Coupons</h3>
                <div className="space-y-3">
                  {coupons.map(coupon => (
                    <CouponItem 
                      key={coupon.code} 
                      coupon={coupon} 
                      onApply={handleApplyCoupon} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Phone Verification */}
          {step === 1 && !phoneVerified && (
            <div className="mb-6 slide-in">
              <h3 className="font-medium mb-3 text-lg">Enter your phone number</h3>
              <Formik
                initialValues={{ phone: '' }}
                validationSchema={phoneSchema}
                onSubmit={handlePhoneSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-4">
                      <Field
                        type="text"
                        name="phone"
                        placeholder="10-digit phone number"
                        className="w-full p-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3.5 rounded-lg hover:opacity-90 transition-all pulse-btn disabled:opacity-70"
                    >
                      {isSubmitting ? 'Sending OTP...' : 'Get OTP'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          )}

          {/* OTP Verification */}
          {step === 1 && showOtpInput && !phoneVerified && (
            <div className="mb-6 fade-in">
              <h3 className="font-medium mb-3 text-lg">Enter OTP sent to your phone</h3>
              <OtpInput 
                otpInputs={otpInputs}
                handleOtpChange={handleOtpChange}
                handleOtpKeyDown={handleOtpKeyDown}
                handleOtpPaste={handleOtpPaste}
              />
              <div className="text-center mt-4">
                <button
                  onClick={handleOtpSubmit}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2.5 px-8 rounded-lg hover:opacity-90 transition-all pulse-btn"
                >
                  Verify OTP
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Didn't receive the code? <button className="text-blue-600 font-medium">Resend</button>
                </p>
              </div>
            </div>
          )}

          {/* Checkout Form */}
          {step === 2 && (
            <div className="slide-in">
              <Formik
                initialValues={{
                  phone: '1234567890',
                  fullName: '',
                  email: '',
                  address: '',
                  pincode: '',
                  city: '',
                  state: '',
                }}
                validationSchema={checkoutSchema}
                onSubmit={(values) => {
                  // console.log(values, addressType, paymentMethod);
                  if (paymentMethod === 'online') {
                    // Redirect to payment gateway
                  } else {
                    // Process COD order
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <Field
                        type="text"
                        name="phone"
                        disabled={true}
                        className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <Field
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      />
                      <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <Field
                        as="textarea"
                        name="address"
                        placeholder="Enter your address"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 shadow-sm"
                      />
                      <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Pincode</label>
                        <Field
                          type="text"
                          name="pincode"
                          placeholder="6-digit pincode"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                        <ErrorMessage name="pincode" component="div" className="text-red-500 text-sm mt-1" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <Field
                          type="text"
                          name="city"
                          placeholder="City"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                        <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <Field
                        type="text"
                        name="state"
                        placeholder="State"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                      />
                      <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Save Address As</label>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          className={`flex-1 py-2.5 px-3 rounded-lg border flex items-center justify-center transition-all ${
                            addressType === 'Home' 
                              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setAddressType('Home')}
                        >
                          <FaHome className="mr-2" /> Home
                        </button>
                        <button
                          type="button"
                          className={`flex-1 py-2.5 px-3 rounded-lg border flex items-center justify-center transition-all ${
                            addressType === 'Office' 
                              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setAddressType('Office')}
                        >
                          <FaBriefcase className="mr-2" /> Office
                        </button>
                        <button
                          type="button"
                          className={`flex-1 py-2.5 px-3 rounded-lg border flex items-center justify-center transition-all ${
                            addressType === 'Other' 
                              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setAddressType('Other')}
                        >
                          <FaMapMarkerAlt className="mr-2" /> Other
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Payment Method</label>
                      <div className="space-y-3">
                        <button
                          type="button"
                          className={`w-full p-3.5 rounded-lg border flex items-center justify-between transition-all ${
                            paymentMethod === 'cod' 
                              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setPaymentMethod('cod')}
                        >
                          <div className="flex items-center">
                            <FaMoneyBillWave className="mr-3 text-green-600" size={18} />
                            <span>Cash on Delivery</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          className={`w-full p-3.5 rounded-lg border flex items-center justify-between relative transition-all ${
                            paymentMethod === 'online' 
                              ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          onClick={() => setPaymentMethod('online')}
                        >
                          <div className="flex items-center">
                            <FaCreditCard className="mr-3 text-blue-600" size={18} />
                            <span>Online Payment</span>
                          </div>
                          <div className="absolute right-0 top-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg flex items-center">
                            <FaPercent className="mr-1" size={10} />
                            10% off
                          </div>
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !paymentMethod}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition-all pulse-btn disabled:opacity-70 mt-6"
                    >
                      {paymentMethod === 'online' ? 'Proceed to Pay' : 'Place Order'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;