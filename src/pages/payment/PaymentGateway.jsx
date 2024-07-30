import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// card images 
import visa from '../../images/payment_cards/visa.png'
import rupay from '../../images/payment_cards/rupay.png'
import mastercard from '../../images/payment_cards/mastercard.png'
import maestro from '../../images/payment_cards/maestro.png'
import { useLocation } from 'react-router-dom';

const PaymentGateway = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const location = useLocation();
  const totalAmounts = location?.state;

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // form validations 

  const cardValidationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .matches(/^[0-9]{16}$/, 'Card number must be 16 digits')
      .required('Card number is required'),
    expiryDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, 'Expiry date must be in MM/YY format')
      .required('Expiry date is required'),
    cvv: Yup.string()
      .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits')
      .required('CVV is required'),
    cardholderName: Yup.string().required('Cardholder name is required'),
  });

  const upiValidationSchema = Yup.object().shape({
    upiId: Yup.string()
      .matches(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Enter a valid UPI ID')
      .required('UPI ID is required'),
  });

  const walletValidationSchema = Yup.object().shape({
    walletType: Yup.string().required('Please select a wallet'),
  });



  // // form submission 

  // const handlePaymentSubmission = (values) => {
  //   if (paymentMethod === 'card') {
  //     console.log(values)
  //   } else if (paymentMethod === 'upi') {
  //     console.log(values)
  //   } else if (paymentMethod === 'wallet') {
  //     console.log(values)
  //   }
  // }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="lg:flex lg:space-x-8  sm:w-[80%] mx-auto">
        <div className="lg:w-2/3 mb-8 lg:mb-0">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Select Payment Method</h2>
            <div className="flex justify-center space-x-4 mb-6">
              {['card', 'upi', 'wallet'].map((method) => (
                <button
                  key={method}
                  className={`px-4 py-2 rounded-full font-semibold text-sm ${paymentMethod === method
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  onClick={() => handlePaymentMethodChange(method)}
                >
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </button>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div>
                <div className="flex justify-center space-x-2 mb-4">
                  {[visa, mastercard, rupay, maestro].map((card) => (
                    <img
                      key={card}
                      src={card}
                      alt={card}
                      className="h-8 w-auto object-contain"
                    />
                  ))}
                </div>

                {/* ========================= card ==================  */}
                <Formik
                  initialValues={{ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' }}
                  validationSchema={cardValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4">
                      <div>
                        <Field
                          type="text"
                          name="cardNumber"
                          placeholder="Card Number"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <div className="flex space-x-4">
                        <div className="w-1/2">
                          <Field
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <ErrorMessage name="expiryDate" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className="w-1/2">
                          <Field
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <ErrorMessage name="cvv" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="cardholderName"
                          placeholder="Cardholder Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="cardholderName" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                      >
                        Pay Now
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <Formik
                initialValues={{ upiId: '' }}
                validationSchema={upiValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <Field
                        type="text"
                        name="upiId"
                        placeholder="Enter UPI ID"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage name="upiId" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                    >
                      Pay with UPI
                    </button>
                  </Form>
                )}
              </Formik>
            )}

            {paymentMethod === 'wallet' && (
              <Formik
                initialValues={{ walletType: '' }}
                validationSchema={walletValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <Field
                        as="select"
                        name="walletType"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Wallet</option>
                        <option value="paytm">Paytm</option>
                        <option value="phonepe">PhonePe</option>
                        <option value="amazonpay">Amazon Pay</option>
                      </Field>
                      <ErrorMessage name="walletType" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                    >
                      Pay with Wallet
                    </button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Payment Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹ {totalAmounts.totalCartAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Fee</span>
                <span className="font-semibold">₹ {totalAmounts.shippingFee}</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between">
                <span className="text-gray-800 font-bold">Total Payable</span>
                <span className="text-blue-600 font-bold">₹ {totalAmounts.totalCartAmount+totalAmounts.shippingFee} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;




