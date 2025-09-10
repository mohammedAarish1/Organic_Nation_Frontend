import  { useEffect } from 'react'
// react icons 
// product image 
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllReturnItems, getReturnsByStatus } from '../../features/manage-returns/manageReturns';
import ReturnedOrder from '../../components/return/ReturnedOrder';

//icons
import {  MoveLeft } from 'lucide-react';
import StatusTabs from '../../components/common/StatusTabs';


const STATUS_BUTTONS = [
    {
        id: 'requested',
        label: 'Requested',
        borderColor: 'orange-500',
        iconBgColor: 'EEF2FF',
        iconColor: 'blue',
        shadowColor: 'blue-400',
        getCount: (returns) => returns?.filter(order => order.returnStatus === "requested").length || 0
    },

    {
        id: 'rejected',
        label: 'Rejected',
        borderColor: 'orange-500',
        iconBgColor: 'EEF2FF',
        iconColor: 'red',
        shadowColor: 'red-500',
        getCount: (returns) => returns?.filter(order => order.returnStatus === "rejected").length || 0
    },
    {
        id: 'inProgress',
        label: 'In Progress',
        borderColor: 'purple-500',
        iconBgColor: 'ECFDF5',
        iconColor: 'purple',
        shadowColor: 'purple-400',
        getCount: (returns) => returns?.filter(order => order.returnStatus === "inProgress").length || 0
    },
    {
        id: 'completed',
        label: 'Completed',
        borderColor: 'orange-500',
        iconBgColor: 'FFFBEB',
        iconColor: 'orange',
        shadowColor: 'orange-400',
        getCount: (returns) => returns?.filter(order => order.returnStatus === "completed").length || 0
    },
];


const ManageReturns = () => {


    const dispatch = useDispatch();
    const { returns, returnsByStatus } = useSelector(state => state.returns)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) {
            dispatch(getAllReturnItems())

        }
    }, [user])


    return (
        <div className='bg-[var(--background-color)]'>
            <div className='pt-3 pb-20 lg:w-[80%] w-[95%] mx-auto'>
                {/* heading */}
                <div className='mb-5'>
                    <div className=''>
                        <h3 className='md:text-3xl text-2xl font-serif'>Manage Your Returns</h3>
                        <p className='md:text-[16px] text-sm mt-1 font-sans'>Check and track the status of your return items.</p>
                    </div>
                </div>
                {/* buttons */}
                <div className='py-5 font-serif'>
                    <div className='flex flex-wrap sm:gap-10 gap-2'>
                        {STATUS_BUTTONS.map(button => (
                            <StatusTabs
                                key={button.id}
                                isActive={returnsByStatus.returnStatusTab === button.id}
                                count={button.getCount(returns)}
                                label={button.label}
                                onClick={() => dispatch(getReturnsByStatus(button.id))}
                                borderColor={button.borderColor}
                                iconBgColor={button.iconBgColor}
                                iconColor={button.iconColor}
                                shadowColor={button.shadowColor}
                            />
                        ))}
                    </div>
                </div>

                {/*  all orders  */}
                <div className='mt-6 flex flex-col gap-20'>


                    {/* no orders messgae  */}

                    {returnsByStatus.returnData?.length === 0 && (
                        <div className='flex flex-col gap-8 justify-center items-start xs:text-2xl font-mono'>
                            <p className=''>You have no returns !!!</p>
                            <div>
                                <Link to="/shop/all" className=" flex underline-hover text-[var(--text-color)] max-w-max hover:text-orange-500 justify-center items-center gap-2 py-1   font-semibold rounded-lg  uppercase "> <MoveLeft /><span className='text-sm sm:text-[16px]'>Continue Shopping</span></Link>
                            </div>
                        </div>
                    )}

                    {returnsByStatus.returnData?.map((singleReturn) => (<ReturnedOrder key={singleReturn._id} singleReturn={singleReturn} />))}

                </div>

            </div>
        </div>
    )
}





export default ManageReturns
