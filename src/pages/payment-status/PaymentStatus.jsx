import React from 'react'
import { PiSealCheckBold } from "react-icons/pi";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { initiatePayment } from '../../features/orderPayment/payment';
import { useDispatch } from 'react-redux';

const PaymentStatus = () => {

    const dispatch = useDispatch();
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const transactionId = urlParams.get('id');
    const retryToken = urlParams.get('retryToken')
    const error = urlParams.get('error');




    const handleRetryPayment = () => {
        if (retryToken) {
            dispatch(initiatePayment(
                {
                    retryToken,
                }
            ))
        }
    }

    return (
        <div>
            {status === 'success' && (
                <div className=' h-[400px] flex flex-col justify-center items-center'>
                    <div className='flex flex-col items-center gap-3  '>
                        <PiSealCheckBold className='text-3xl text-green-700' />
                        <h4 className='text-5xl font-bold text-[var(--themeColor)]'>Payment successful</h4>
                        <p className='text-xl w-[80%] text-center'>Your order has been confirmed and is now being processed. Thank you for shopping with us.</p>
                    </div>

                    <div className=" flex justify-center  gap-3 px-6 py-4">
                        <Link to='/manage-orders' className=" bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Track Your Order
                        </Link>
                        <Link to='/shop/all' className=" bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Return to Shopping
                        </Link>
                    </div>
                </div>

            )}


            {status === 'failure' && (
                <div className='h-[400px] flex flex-col justify-center items-center'>
                    <div className='flex flex-col items-center gap-3  '>
                        <RxCrossCircled className='text-3xl text-red-700 font-bold' />
                        <h4 className='text-5xl font-bold text-[var(--themeColor)]'>Payment Failed</h4>
                        <p className='text-xl w-[80%] text-center'>We were unable to process your payment. Please check your payment details and try again.</p>
                    </div>
                    <div className=" flex justify-center  gap-3 px-6 py-4">
                        <button
                            type='button'
                            className=" bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                            onClick={handleRetryPayment}
                        >
                            Retry Payment
                        </button>

                    </div>
                </div>

            )}

            {error && (
                <div className='h-[400px] flex flex-col justify-center items-center'>
                    <div className='flex flex-col items-center gap-3  '>
                        <RxCrossCircled className='text-3xl text-red-700 font-bold' />
                        <h4 className='text-3xl font-bold text-red-700'>Internal Server error</h4>
                        <p className='text-xl w-[80%] text-center'>We were unable to process your payment. Please try again.</p>
                    </div>
                    <div className=" flex justify-center  gap-3 px-6 py-4">
                        <button
                            type='button'
                            className=" bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                            onClick={handleRetryPayment}
                        >
                            Retry Payment
                        </button>

                    </div>
                </div>
            )}

        </div>
    )
}

export default PaymentStatus;
