import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../imports'
import { FaAngleDown } from 'react-icons/fa'
import { IoCubeOutline } from 'react-icons/io5'
import { getOrdersByStatus, getTotalOrders } from '../../features/admin/adminData'
import AdminOrderList from './AdminOrderList'

const AdminOrders = () => {

  const dispatch = useDispatch();
  const { totalOrders, loading, ordersByStatus } = useSelector(state => state.adminData)
  const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));


  useEffect(() => {
    dispatch(getOrdersByStatus("total"))
    if (adminToken) {
      dispatch(getTotalOrders())
    }
  }, [adminToken, getOrdersByStatus])


  if (loading) return <div>Loading...</div>

  return (
    <div className=''>
      {/* Boxes */}
      <div className='py-5 font-serif'>
        <div className='flex sm:gap-10 gap-2  flex-wrap '>

          {/* button1 */}
          <div className={`${ordersByStatus.orderStatusTab === 'total' && 'border-blue-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-blue-400  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getOrdersByStatus("total"))}>
            <div className='sm:block hidden bg-[#EEF2FF] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[blue]' /></div>
            <div>
              <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>{totalOrders?.length || 0}</p>
              <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Total Order</p>
            </div>
            <div className='sm:hidden block bg-[#EEF2FF] md:p-5 xs:p-2 rounded-full'><FaAngleDown /></div>
          </div>

          {/* button2 */}
          <div
            className={`${ordersByStatus.orderStatusTab === 'active' && 'border-green-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-green-400  transition-all duration-500 hover:bg-[var(--hoverEffect)]`}
            onClick={() => dispatch(getOrdersByStatus("active"))}
          >
            <div className='sm:block hidden bg-[#ECFDF5] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[green]' /></div>
            <div>
              <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
                {totalOrders?.filter(order => order.orderStatus === "active").length || 0}
              </p>
              <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Active Order</p>
            </div>
            <div className='sm:hidden block bg-[#ECFDF5] md:p-5 xs:p-2 rounded-full'><FaAngleDown /></div>
          </div>


          {/* button3 */}
          <div className={`${ordersByStatus.orderStatusTab === 'dispatched' && 'border-green-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-[#a54dc8]  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getOrdersByStatus("dispatched"))}>
            <div className='sm:block hidden bg-[#ECFDF5] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[#a54dc8]' /></div>
            <div>
              <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
                {totalOrders?.filter(order => order.orderStatus === "dispatched").length || 0}
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
                {totalOrders?.filter(order => order.orderStatus === "completed").length || 0}
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
                {totalOrders?.filter(order => order.orderStatus === "cancelled").length || 0}

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

        {/* {ordersByStatus.orderData?.length === 0 && (
          <div className='flex flex-col gap-8 justify-center items-start xs:text-2xl font-mono'>
            <p className=''>You have no orders !!!</p>
            <div>
              <Link to="/shop/all" className=" flex underline-hover text-[var(--bgColorPrimary)] max-w-max hover:text-orange-500 justify-center items-center gap-2 py-1   font-semibold rounded-lg  uppercase "> <FaArrowLeftLong /><span className='text-sm sm:text-[16px]'>Continue Shopping</span></Link>
            </div>
          </div>
        )} */}


        <AdminOrderList orders={ordersByStatus.orderData} />

      </div>
    </div>
  )
}

export default AdminOrders;
