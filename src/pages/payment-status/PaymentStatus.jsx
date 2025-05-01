// import React, { useEffect, useState } from 'react'
// import { PiSealCheckBold } from "react-icons/pi";
// import { RxCrossCircled } from "react-icons/rx";
// import { Link } from 'react-router-dom';
// import { initiatePayment } from '../../features/orderPayment/payment';
// import { useDispatch } from 'react-redux';
// import { clearCart } from '../../features/cart/cart';
// import axios from 'axios';

// const apiUrl = import.meta.env.VITE_BACKEND_URL;


// const PaymentStatus = () => {

//     const dispatch = useDispatch();
//     const urlParams = new URLSearchParams(window.location.search);
//     const status = urlParams.get('status');
//     const transactionId = urlParams.get('id');
//     const orderId = urlParams.get('orderId');    // Order ID from the URL
//     const retryToken = urlParams.get('retryToken')
//     const error = urlParams.get('error');

//     const [orderDetails, setOrderDetails] = useState(null);


//     const getOrderDetails = async (orderId) => {
//         try {
//             const response = await axios.get(`${apiUrl}/api/orders/${orderId}`)
//             if (response.data) {
//                 setOrderDetails(response.data)
//             }
//         } catch (error) {
//             throw error
//         }
//     }




//     const handleRetryPayment = () => {
//         if (retryToken) {
//             dispatch(initiatePayment(
//                 {
//                     retryToken,
//                 }
//             ))
//         }
//     }


//     // Fetch order details once the orderId is available in the URL
//     useEffect(() => {
//         if (orderId) {
//             getOrderDetails(orderId);
//         }
//     }, [orderId]);


//     // Trigger Facebook Pixel Purchase Event when payment is successful
//     useEffect(() => {
//         if (status === 'success' && orderDetails) {
//             const purchaseValue = orderDetails.subTotal + orderDetails.shippingFee; // Calculate purchase value
//             const currency = 'INR'; // You can replace with dynamic currency if needed

//             // Ensure fbq is available and then trigger the purchase event
//             if (window.fbq) {
//                 window.fbq('track', 'Purchase', {
//                     value: purchaseValue,
//                     currency: currency,
//                 });
//             }
//         }
//     }, [status, orderDetails]);

//     useEffect(() => {
//         if (status === 'success') {
//             dispatch(clearCart());
//         }
//     }, [status])

//     return (
//         <div>
//             {status === 'success' && (
//                 <div className=' h-[400px] flex flex-col justify-center items-center'>
//                     <div className='flex flex-col items-center gap-3  '>
//                         <PiSealCheckBold className='text-3xl text-green-700' />
//                         <h4 className='xs:text-5xl text-3xl font-bold text-[var(--themeColor)]'>Payment successful</h4>
//                         <p className='xs:text-xl text-sm w-[80%] text-center'>Your order has been confirmed and is now being processed. Thank you for shopping with us.</p>
//                     </div>

//                     <div className=" flex flex-wrap justify-center  gap-3 xs:px-6 py-4 xs:text-[16px] text-sm">
//                         <Link to='/manage-orders' className=" bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300">
//                             Track Your Order
//                         </Link>
//                         <Link to='/shop/all' className=" bg-green-700 hover:bg-green-800  text-white font-bold py-2 px-4 rounded transition duration-300">
//                             Return to Shopping
//                         </Link>
//                     </div>
//                 </div>
//             )}


//             {status === 'failure' && (
//                 <div className='h-[400px] flex flex-col justify-center items-center'>
//                     <div className='flex flex-col items-center gap-3  '>
//                         <RxCrossCircled className='text-3xl text-red-700 font-bold' />
//                         <h4 className='text-5xl font-bold text-[var(--themeColor)]'>Payment Failed</h4>
//                         <p className='text-xl w-[80%] text-center'>We were unable to process your payment. Please check your payment details and try again.</p>
//                     </div>
//                     <div className=" flex justify-center  gap-3 px-6 py-4">
//                         <button
//                             type='button'
//                             className=" bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
//                             onClick={handleRetryPayment}
//                         >
//                             Retry Payment
//                         </button>

//                     </div>
//                 </div>

//             )}

//             {error && (
//                 <div className='h-[400px] flex flex-col justify-center items-center'>
//                     <div className='flex flex-col items-center gap-3  '>
//                         <RxCrossCircled className='text-3xl text-red-700 font-bold' />
//                         <h4 className='text-3xl font-bold text-red-700'>Internal Server error</h4>
//                         <p className='text-xl w-[80%] text-center'>We were unable to process your payment. Please try again.</p>
//                     </div>
//                     <div className=" flex justify-center  gap-3 px-6 py-4">
//                         <button
//                             type='button'
//                             className=" bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
//                             onClick={handleRetryPayment}
//                         >
//                             Retry Payment
//                         </button>

//                     </div>
//                 </div>
//             )}

//         </div>
//     )
// }

// export default PaymentStatus;
