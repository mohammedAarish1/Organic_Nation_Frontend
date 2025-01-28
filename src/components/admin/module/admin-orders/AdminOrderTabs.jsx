import React from 'react'
import { getOrdersByStatus } from '../../../../features/admin/adminData';
import { useSelector } from 'react-redux';
import StatusButton from '../../../statusButton/StatusButton';

const AdminOrderTabs = () => {
    const { totalOrders,   } = useSelector((state) => state.adminData);
    return (
        <div className="py-5 font-serif">
            <div className="flex sm:gap-10 gap-2  flex-wrap ">

                {/* button1 */}

                <StatusButton
                    title="Total Order"
                    color="blue-500"
                    curStatus="total"
                    length={totalOrders?.length || 0}
                    action={getOrdersByStatus}
                />
                {/* button2 */}
                <StatusButton
                    title=" Active Order"
                    color="green-500"
                    curStatus="active"
                    length={
                        totalOrders?.filter((order) => order.orderStatus === "active")
                            .length || 0
                    }
                    action={getOrdersByStatus}

                />


                {/* button3 */}
                <StatusButton
                    title="Dispatched"
                    color="orange-400"
                    curStatus="dispatched"
                    length={
                        totalOrders?.filter((order) => order.orderStatus === "dispatched")
                            .length || 0
                    }
                    action={getOrdersByStatus}

                />


                {/* button4 */}
                <StatusButton
                    title="Completed"
                    color="gray-500"
                    curStatus="completed"
                    length={
                        totalOrders?.filter((order) => order.orderStatus === "completed")
                            .length || 0
                    }
                    action={getOrdersByStatus}

                />

                {/* button5 */}
                <StatusButton
                    title="Cancelled"
                    color="red-500"
                    curStatus="cancelled"
                    length={
                        totalOrders?.filter((order) => order.orderStatus === "cancelled")
                            .length || 0
                    }
                    action={getOrdersByStatus}

                />

            </div>
        </div>
    )
}

export default AdminOrderTabs
