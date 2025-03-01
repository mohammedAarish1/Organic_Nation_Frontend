import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReturnsByStatus,
  getTotalReturns,
} from "../../features/admin/adminData";
import StatusButton from "../../components/statusButton/StatusButton";
import Loader from "../../components/common/Loader";

const AdminTable = lazy(() => import("../../components/admin/common/AdminTable"))


const headers = [
  { key: 'invoiceNumber', label: 'Invoice Number' },
  { key: 'itemName', label: 'Item Name' },
  { key: 'weight', label: 'Weight' },
  { key: 'quantity', label: 'Quantity' },
  { key: 'returnStatus', label: 'Return Status' },
  { key: 'returnOptions', label: 'Requested for' },
  { key: 'createdAt', label: 'Date' }
]


const AdminReturnItems = () => {
  const dispatch = useDispatch();
  const { totalReturns, loading, returnsByStatus } = useSelector(
    (state) => state.adminData
  );
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  useEffect(() => {
    dispatch(getTotalReturns());
    dispatch(getReturnsByStatus("requested"));
  }, [adminToken, getReturnsByStatus, dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="">
      {/* Boxes */}
      <div className="py-5 font-serif">
        <div className="flex sm:gap-10 gap-2  flex-wrap ">
         
          {/* button1 */}
          
          <StatusButton
            title="Requested"
            color="blue-500"
            curStatus="requested"
            length={
                totalReturns?.filter((curReturn) => curReturn.returnStatus === "requested")
                  .length || 0

              }
            action={getReturnsByStatus}

              />
          {/* button2 */}
          <StatusButton
            title="Rejected"
            color="green-500"
            curStatus="rejected"
            length={
              totalReturns?.filter((curReturn) => curReturn.returnStatus === "rejected")
                .length || 0
            }
            action={getReturnsByStatus}

          />
       

          {/* button3 */}
          <StatusButton
            title="In Progress"
            color="orange-400"
            curStatus="inProgress"
            length={
              totalReturns?.filter((curReturn) => curReturn.returnStatus === "inProgress")
                .length || 0
            }
            action={getReturnsByStatus}

          />
         

          {/* button4 */}
          <StatusButton
            title="Completed"
            color="gray-500"
            curStatus="completed"
            length={
              totalReturns?.filter((curReturn) => curReturn.returnStatus === "completed")
                .length || 0
            }
            action={getReturnsByStatus}

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

      <Suspense fallback={<Loader height='200px' />}>
      <AdminTable
          title='Returns'
          headers={headers}
          data={returnsByStatus.returnData}
        />
      </Suspense>
      </div>
    </div>
  );
};

export default AdminReturnItems;
