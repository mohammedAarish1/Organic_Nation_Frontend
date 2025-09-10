import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getList,
  // getOrdersByStatus,
  // getTotalOrders,
} from "../../features/admin/adminData";
import AdminOrderTabs from "../../components/admin/module/admin-orders/AdminOrderTabs";
import Loader from "../../components/common/Loader";

const AdminTable = lazy(() => import("../../components/admin/common/AdminTable"))
const ReportGenerator = lazy(() => import("../../components/admin/ReportGenerator"))

const headers = [
  { key: 'userName', label: 'Receiver' },
  { key: 'phoneNumber', label: 'Phone' },
  { key: 'invoiceNumber', label: 'Order No' },
  { key: 'paymentStatus', label: 'Payment Status' },
  { key: 'orderStatus', label: 'Order Status' },
  { key: 'subTotal', label: 'Total' },
  { key: 'createdAt', label: 'Date' }
]

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { loading, orders } = useSelector(
    (state) => state.adminData
  );
  useEffect(() => {
    dispatch(getList('orders'));
    // dispatch(getTotalOrders());
    // dispatch(getOrdersByStatus("total"));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="">
      {/* Boxes */}
      <AdminOrderTabs />
      {/*  all orders  */}
      <div className="mt-6 flex flex-col gap-20 ">
        <Suspense fallback={<Loader height="200px" />}>
          <AdminTable
            title='Orders'
            headers={headers}
            data={orders.filteredOrders}
          // data={ordersByStatus.filteredOrderData}
          />
        </Suspense>

        <div>
          <Suspense fallback={<Loader height="200px" />}>
            <ReportGenerator
              title='Generate Sale Report'
              type='sales'
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
