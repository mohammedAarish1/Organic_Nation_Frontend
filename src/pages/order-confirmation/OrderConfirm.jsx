import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
// import { getSingleOrder } from '../../features/manageOrders/manageOrders';
import axios from 'axios';
import { address } from '../../helper/helperFunctions';

const OrderConfirm = () => {

    const { orderId } = useParams();
    const [singleOrder, setSingleOrder] = useState('');
    const apiUrl = import.meta.env.VITE_BACKEND_URL;





    const getSingleOrder = async (orderId) => {
        try {
            const response = await axios.get(`${apiUrl}/api/orders/${orderId}`)
            if (response.data) {
                setSingleOrder(response.data)
            }
        } catch (error) {
            throw error
        }
    }


    useEffect(() => {

        getSingleOrder(orderId)
    }, [orderId])



    if (!singleOrder) return <div>loading...</div>

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden font-sans text-[var(--themeColor)] mb-20 sm:text-[15px] text-sm">
            <div className="text-center py-8 bg-green-100">
                <FaCheckCircle className="mx-auto text-6xl text-green-500" />
                <h2 className="mt-4 text-3xl font-bold text-green-800 tracking-wide">Order Confirmed!</h2>
            </div>
            <div className="px-6 py-4">
                <p className="text-gray-700 text-lg mb-4">
                    Thank you for shopping with us. We've received your order and will process it shortly.
                </p>
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold ">Order Number:</span>
                        <span className="text-gray-800">{singleOrder.orderNo}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold ">Name:</span>
                        <span className="text-gray-800">{singleOrder.receiverDetails.name}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold ">Shipping Address:</span>
                        <span className="text-gray-800 text-end">{address(singleOrder.shippingAddress)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold ">Phone Number</span>
                        <span className="text-gray-800">{singleOrder.receiverDetails.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold ">Total:</span>
                        <span className="text-gray-800">₹ {singleOrder.subTotal + singleOrder.shippingFee}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold ">Payment Method:</span>
                        <span className="text-gray-800">{singleOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold ">Confirmation sent to:</span>
                        <span className="text-gray-800">{singleOrder.userEmail}</span>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 flex justify-center  gap-3 px-6 py-4">
                <Link to='/manage-orders' className=" bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Track Your Order
                </Link>
                <Link to='/shop/all' className=" bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Return to Shopping
                </Link>
            </div>
        </div>
    )
}

export default OrderConfirm;
