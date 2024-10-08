import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersByStatus,
  getTotalOrders,
} from "../../features/admin/adminData";
import AdminOrderList from "./AdminOrderList";
import StatusButton from "../statusButton/StatusButton";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { totalOrders, loading, ordersByStatus } = useSelector(
    (state) => state.adminData
  );
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  useEffect(() => {
    dispatch(getTotalOrders());
    dispatch(getOrdersByStatus("total"));
  }, [adminToken, getOrdersByStatus, dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="">
      {/* Boxes */}
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
      {/*  all orders  */}
      <div className="mt-6 flex flex-col gap-20 ">
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
  );
};

export default AdminOrders;
