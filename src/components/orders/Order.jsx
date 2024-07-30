import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cancelOrder } from '../../features/manageOrders/manageOrders';
import { useDispatch } from 'react-redux';
import SingleOrder from './SingleOrder';
import Alert from '../alert/Alert';
// react icons 
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineFileDownload, MdOutlineCancel } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { IoCheckmarkDoneCircleSharp, IoChevronDownOutline } from "react-icons/io5";
import { BsCartX } from "react-icons/bs";



const Order = ({ order }) => {

    const statusIcons = {
        active: <GoDotFill className='text-xl text-green-500' />,
        completed: <IoCheckmarkDoneCircleSharp className='text-xl text-green-500' />,
        cancelled: <MdOutlineCancel className='text-xl text-red-500' /> // Cancelled icon
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const [showAllItems, setShowAllItems] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const showAlert = () => {
        setIsAlertOpen(true);
    };

    const hideAlert = () => {
        setIsAlertOpen(false);
    };

    const handleOrderCancel = () => {
        // below method will be dipatched on the basis of order status 
        dispatch(cancelOrder(order._id))
        navigate('/manage-orders')

        setIsAlertOpen(false);
    };





    return (
        <>
            {/* order 1 start */}
            <div className='shadow-xl font-sans'>
                <div>
                    {/* order details heading  */}
                    <div className='flex sm:justify-between justify-center items-center bg-[var(--bgColorPrimary)] text-white py-3 px-4 uppercase'>
                        <div className='flex justify-start items-center gap-10 '>
                            <div className='lg:block hidden' >
                                <p>Order Number</p>
                                <p className='text-gray-300 text-sm'>#{order?.orderNo}</p>
                            </div>
                            <div className='sm:block hidden'>
                                <p>Date Placed</p>
                                <p className='text-gray-300 text-sm capitalize'>{new Date(order?.createdAt).toDateString()}</p>
                            </div>
                            <div className='lg:block hidden'>
                                <p>Payment Method</p>
                                <p className='text-gray-300 text-sm capitalize'>{order?.paymentMethod}</p>
                            </div>
                            <div className='sm:block hidden'>
                                <p>Status</p>
                                <p className='flex justify-center items-center gap-1 text-gray-300 text-sm capitalize'>{order.orderStatus} {statusIcons[order.orderStatus] ? statusIcons[order.orderStatus] : null}</p>
                            </div>
                        </div>
                        <div className='flex gap-3 font-mono'>
                            <div className='flex gap-3 text-sm xs:text-[16px]' >
                                {/* order detail button  */}
                                <button className='bg-green-700 xs:px-5 px-2 py-2 rounded-md text-white hover:bg-green-800 xs:text-[16px] text-sm' onClick={() => setShowOrderDetails(true)}>Order Details</button>
                                {/* download invoice button  */}
                                {order.orderStatus === "completed" && (
                                    <button className='flex justify-center items-center gap-1 border-green-700 border-2 xs:px-5 px-2 py-2 rounded-md hover:bg-green-800 xs:text-[16px] text-sm'>Download Invoice <MdOutlineFileDownload className='text-xl' /> </button>
                                )}
                            </div>

                            {/* order details modal  */}
                            <div className={`modal-background ${showOrderDetails ? 'active' : ''}`} onClick={() => setShowOrderDetails(false)}>
                                <div className={`text-white modal ${showOrderDetails ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>

                                    <p className="flex justify-end" ><IoIosCloseCircleOutline className='cursor-pointer text-3xl hover:scale-110' onClick={() => setShowOrderDetails(false)} /></p>
                                    <h2 className='text-xl font-medium'>Order Details</h2>
                                    <div className='mt-4'>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Order Status</span>
                                            <span className=' flex justify-center items-center gap-2 text-gray-400'>{order?.orderStatus} {statusIcons[order.orderStatus] ? statusIcons[order.orderStatus] : null}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Order Number</span>
                                            <span className='text-gray-400'>#{order?.orderNo}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Order Date</span>
                                            <span className='text-gray-400 capitalize'>{new Date(order?.createdAt).toDateString()}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Email</span>
                                            <span className='text-gray-400 lowercase'>{order?.userEmail}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Phone</span>
                                            <span className='text-gray-400'>{order.receiverDetails.phoneNumber}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Payment Method</span>
                                            <span className='text-gray-400'>{order?.paymentMethod}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Shipping Address</span>
                                            <span className='text-gray-400 sm:w-1/3 text-end'>{order.shippingAddress}</span>
                                        </div>
                                        <div className='flex justify-between items-center  border-gray-400 border-b-2 py-2'>
                                            <span>Total Price</span>
                                            <span className='text-gray-400'>₹{order.amountPaid}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* order details body  */}
                    <div className='   bg-gradient-to-r from-[#6D613B] to-[#D3BB71]' >
                        {/* product details  */}
                        {order.orderDetails.map((curOrder, index) => {
                            return !showAllItems && index !== 0 ? null : (
                                <div key={curOrder[0]} className='flex flex-col gap-10 py-7 xs:px-4 px-2'>
                                    <SingleOrder curOrder={curOrder} />
                                </div>
                            )
                        })}
                        {order.orderDetails.length > 1 && (
                            <div className='flex justify-center items-center py-4'>
                                <button className='flex justify-center items-center gap-2 bg-green-700 px-4 py-2 rounded-md text-white transition-all duration-500 hover:tracking-widest' onClick={() => setShowAllItems(!showAllItems)}>{showAllItems ? 'Show Less' : 'Show All'} <IoChevronDownOutline className={`${showAllItems ? 'rotate-180' : ''}`} /> </button>
                            </div>
                        )}

                    </div>



                    {/* order footer section  */}
                    <div className=' bg-[#6D613B] '>
                       
                        {/* <p className='flex justify-start items-center xs:gap-2 max-w-max'><span className='xs:text-[16px] text-[12px]'>Payment Done</span> <span><FaCheckCircle className='text-green-600 xs:text-[1rem] text-[15px] ' /> </span></p> */}
                        <div className='text-white xs:px-5 px-1 py-3'>
                            <div className='flex justify-between'>
                                <p className='text-end xs:text-[18px] text-[12px]'>Sub Total:</p>
                                <p> ₹ {order?.subTotal}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='text-end xs:text-[12px] text-[12px]'>Total taxes:</p>
                                <p> ₹ {order?.taxAmount}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='text-end xs:text-[12px] text-[12px]'>Shipping Fee:</p>
                                <p> ₹ {order?.shippingFee}</p>
                            </div>
                            <div className='flex justify-between items-center xs:text-[20px] text-[12px] font-semibold'>
                                <p className='text-end '>Total Amount Payable:</p>
                                <p> ₹ {order?.subTotal + order?.taxAmount + order?.shippingFee}</p>
                            </div>
                        </div>
                        <div className={` ${order?.orderStatus !== 'active' ? 'bg-[#D3BB71]' : 'bg-[#D3BB71] hover:bg-[#e0cf9c]'}  `}>
                            <button
                                className='flex w-full h-full justify-center  py-3 gap-1 items-center'
                                onClick={showAlert}
                                disabled={order?.orderStatus !== 'active'}
                            >
                                <span> <BsCartX className={`${order?.orderStatus !== 'active' ? 'text-red-400' : 'text-red-500'} text-xl  `} /></span>
                                <span className={`${order?.orderStatus !== 'active' ? 'text-gray-400' : ''} xs:block hidden`}>Cancel order</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* alert for cancelling order  */}
                <Alert
                    isOpen={isAlertOpen}
                    alertMessage='Are you sure you want to cancel this order? This action cannot be undone.'
                    actionMessageOne='Yes, Cancel Order'
                    actionMessageTwo='No, Keep Order'
                    hideAlert={hideAlert}
                    handleAction1={handleOrderCancel}
                />
            </div>
            {/* order 1 end */}
        </>
    )
}

export default Order
