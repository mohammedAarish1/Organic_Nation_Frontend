import React, { useEffect } from 'react'
// react icons 
import { FaAngleDown, FaArrowLeftLong } from "react-icons/fa6";
import { IoCubeOutline } from "react-icons/io5";
// product image 
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllReturnItems, getReturnsByStatus } from '../../features/manage-returns/manageReturns';
import ReturnedOrder from '../../components/return/ReturnedOrder';




const ManageReturns = () => {


    const dispatch = useDispatch();
    const {returns,returnsByStatus}=useSelector(state=>state.returns)
    const {user}=useSelector(state=>state.auth)


    useEffect(() => {
        if (user) {
            dispatch(getAllReturnItems())
           
        }
    }, [user])


    return (
        <div className='mt-3 mb-20 lg:w-[80%] w-[95%] mx-auto'>
            {/* heading */}
            <div className='mb-5'>
                <div className=''>
                    <h3 className='md:text-3xl text-2xl font-serif'>Manage Your Returns</h3>
                    <p className='md:text-[16px] text-sm mt-1 font-sans'>Check and track the status of your return items.</p>
                </div>
            </div>
            {/* buttons */}
            <div className='py-5 font-serif'>
                <div className='flex flex-wrap sm:gap-10 gap-2   '>

                    {/* button1 */}
                    <div className={`${returnsByStatus.returnStatusTab === 'requested' && 'border-blue-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-blue-400  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getReturnsByStatus("requested"))}>
                        <div className='sm:block hidden bg-[#EEF2FF] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[blue]' /></div>
                        <div>
                            <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>{returns?.filter(order => order.returnStatus === "requested").length || 0}</p>
                            <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Requested</p>
                        </div>
                        <div className='sm:hidden block bg-[#EEF2FF] md:p-5 xs:p-2 rounded-full'><FaAngleDown /></div>
                    </div>

                    {/* button2 */}
                    <div className={`${returnsByStatus.returnStatusTab === 'rejected' && 'border-red-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-red-500  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getReturnsByStatus("rejected"))}>
                        <div className='sm:block hidden bg-[#ECFDF5] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-red-500' /></div>
                        <div>
                            <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
                                {returns?.filter(order => order.returnStatus === "rejected").length || 0}
                            </p>
                            <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Rejected</p>
                        </div>
                        <div className='sm:hidden block bg-[#ECFDF5] md:p-5 xs:p-2 rounded-full'><FaAngleDown /></div>
                    </div>
                    {/* button3 */}
                    <div className={`${returnsByStatus.returnStatusTab === 'inProgress' && 'border-purple-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-orange-400  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getReturnsByStatus("inProgress"))}>
                        <div className='sm:block hidden bg-[#ECFDF5] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-orange-500' /></div>
                        <div>
                            <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
                                {returns?.filter(order => order.returnStatus === "inProgress").length || 0}
                            </p>
                            <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>In Progress</p>
                        </div>
                        <div className='sm:hidden block bg-[#ECFDF5] md:p-5 xs:p-2 rounded-full'><FaAngleDown /></div>
                    </div>

                    {/* button4 */}
                    <div className={`${returnsByStatus.returnStatusTab === 'completed' && 'border-green-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-green-500  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getReturnsByStatus("completed"))}>
                        <div className='sm:block hidden bg-[#FFFBEB] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-green-500' /></div>
                        <div>
                            <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
                                {returns?.filter(order => order.returnStatus === "completed").length || 0}
                            </p>
                            <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Completed</p>
                        </div>
                        <div className='sm:hidden block bg-[#FFFBEB] md:p-5 xs:p-2 rounded-full'><FaAngleDown /></div>
                    </div>

                    {/* button5 */}
                    {/* <div className={`${returnsByStatus.returnStatusTab === 'cancelled' && 'border-gray-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-gray-500  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getReturnsByStatus("cancelled"))}>
                        <div className='sm:block hidden bg-[#FEF2F2] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[red]' /></div>
                        <div>
                            <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
                                {returns?.filter(order => order.returnStatus === "cancelled").length || 0}

                            </p>
                            <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Cancelled</p>
                        </div>
                        <div className='sm:hidden block bg-[#FEF2F2] md:p-5 xs:p-2 rounded-full'><FaAngleDown /></div>
                    </div> */}

                </div>
            </div>
            {/*  all orders  */}
            <div className='mt-6 flex flex-col gap-20'>


                {/* no orders messgae  */}

                {returnsByStatus.returnData?.length === 0 && (
                    <div className='flex flex-col gap-8 justify-center items-start xs:text-2xl font-mono'>
                        <p className=''>You have no returns !!!</p>
                        <div>
                            <Link to="/shop/all" className=" flex underline-hover text-[var(--bgColorPrimary)] max-w-max hover:text-orange-500 justify-center items-center gap-2 py-1   font-semibold rounded-lg  uppercase "> <FaArrowLeftLong /><span className='text-sm sm:text-[16px]'>Continue Shopping</span></Link>
                        </div>
                    </div>
                )}

                {returnsByStatus.returnData?.map((singleReturn) => (<ReturnedOrder key={singleReturn._id} singleReturn={singleReturn} />))}

            </div>

        </div>
    )
}





export default ManageReturns
