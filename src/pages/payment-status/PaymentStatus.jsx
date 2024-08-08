import React from 'react'
import { PiSealCheckBold } from "react-icons/pi";
import { Link } from 'react-router-dom';

const PaymentStatus = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const transactionId = urlParams.get('id');
    const error = urlParams.get('error');





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
                <div className='flex flex-col items-center gap-3  '>
                    <PiSealCheckBold className='text-3xl text-green-700' />
                    <h4 className='text-5xl font-bold text-[var(--themeColor)]'>Payment Failed</h4>
                    {/* <p className='text-xl w-[80%] text-center'>Your order has been confirmed and is now being processed. Thank you for shopping with us.</p> */}
                </div>

            )}

        </div>
    )
}

export default PaymentStatus;
