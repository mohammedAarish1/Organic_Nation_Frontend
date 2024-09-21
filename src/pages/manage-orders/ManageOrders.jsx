import React, { useEffect } from 'react'
// react icons 
import { FaAngleDown, FaArrowLeftLong } from "react-icons/fa6";
import { IoCubeOutline } from "react-icons/io5";
// product image 
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders,  getAllReturnItems,  getOrdersByStatus } from '../../features/manageOrders/manageOrders';
import Order from '../../components/orders/Order';
import { Link } from 'react-router-dom';




const ManageOrders = () => {


    const dispatch = useDispatch()
    const { orders, ordersByStatus } = useSelector(state => state.orders)
    const token = JSON.parse(sessionStorage.getItem('token'))


    useEffect(() => {
        if (token) {
            dispatch(getAllOrders(token))
           
        }
    }, [token])


    return (
        <div className='mt-3 mb-20 lg:w-[80%] w-[95%] mx-auto'>
            {/* heading */}
            <div className='mb-5'>
                <div className=''>
                    <h3 className='md:text-3xl text-2xl font-serif'>Manage Your Orders</h3>
                    <p className='md:text-[16px] text-sm mt-1 font-sans'>Check the status of recent orders, manage returns, and download invoices.</p>
                </div>
            </div>
            {/* buttons */}
            <div className='py-5 font-serif'>
                <div className='flex flex-wrap sm:gap-10 gap-2   '>

                    {/* button1 */}
                    <div className={`${ordersByStatus.orderStatusTab === 'total' && 'border-blue-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-blue-400  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getOrdersByStatus("total"))}>
                        <div className='sm:block hidden bg-[#EEF2FF] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[blue]' /></div>
                        <div>
                            <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>{orders?.length || 0}</p>
                            <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Total Order</p>
                        </div>
                        <div className='sm:hidden block bg-[#EEF2FF] md:p-5 xs:p-2 rounded-full'><FaAngleDown /></div>
                    </div>

                    {/* button2 */}
                    <div className={`${ordersByStatus.orderStatusTab === 'active' && 'border-green-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-green-400  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getOrdersByStatus("active"))}>
                        <div className='sm:block hidden bg-[#ECFDF5] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[green]' /></div>
                        <div>
                            <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
                                {orders?.filter(order => order.orderStatus === "active").length || 0}
                            </p>
                            <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Active Order</p>
                        </div>
                        <div className='sm:hidden block bg-[#ECFDF5] md:p-5 xs:p-2 rounded-full'><FaAngleDown /></div>
                    </div>
                    {/* button3 */}
                    <div className={`${ordersByStatus.orderStatusTab === 'dispatched' && 'border-purple-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-purple-400  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getOrdersByStatus("dispatched"))}>
                        <div className='sm:block hidden bg-[#ECFDF5] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[green]' /></div>
                        <div>
                            <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
                                {orders?.filter(order => order.orderStatus === "dispatched").length || 0}
                            </p>
                            <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Dispatched</p>
                        </div>
                        <div className='sm:hidden block bg-[#ECFDF5] md:p-5 xs:p-2 rounded-full'><FaAngleDown /></div>
                    </div>

                    {/* button4 */}
                    <div className={`${ordersByStatus.orderStatusTab === 'completed' && 'border-orange-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-orange-400  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getOrdersByStatus("completed"))}>
                        <div className='sm:block hidden bg-[#FFFBEB] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[orange]' /></div>
                        <div>
                            <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
                                {orders?.filter(order => order.orderStatus === "completed").length || 0}
                            </p>
                            <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Completed</p>
                        </div>
                        <div className='sm:hidden block bg-[#FFFBEB] md:p-5 xs:p-2 rounded-full'><FaAngleDown /></div>
                    </div>

                    {/* button5 */}
                    <div className={`${ordersByStatus.orderStatusTab === 'cancelled' && 'border-red-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-red-500  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getOrdersByStatus("cancelled"))}>
                        <div className='sm:block hidden bg-[#FEF2F2] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[red]' /></div>
                        <div>
                            <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
                                {orders?.filter(order => order.orderStatus === "cancelled").length || 0}

                            </p>
                            <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Cancelled</p>
                        </div>
                        <div className='sm:hidden block bg-[#FEF2F2] md:p-5 xs:p-2 rounded-full'><FaAngleDown /></div>
                    </div>



                </div>
            </div>
            {/*  all orders  */}
            <div className='mt-6 flex flex-col gap-20'>


                {/* no orders messgae  */}

                {ordersByStatus.orderData?.length === 0 && (
                    <div className='flex flex-col gap-8 justify-center items-start xs:text-2xl font-mono'>
                        <p className=''>You have no orders !!!</p>
                        <div>
                            <Link to="/shop/all" className=" flex underline-hover text-[var(--bgColorPrimary)] max-w-max hover:text-orange-500 justify-center items-center gap-2 py-1   font-semibold rounded-lg  uppercase "> <FaArrowLeftLong /><span className='text-sm sm:text-[16px]'>Continue Shopping</span></Link>
                        </div>
                    </div>
                )}

                {ordersByStatus.orderData?.map((order) => (<Order key={order._id} order={order} />))}



            </div>

        </div>
    )
}

export default ManageOrders


