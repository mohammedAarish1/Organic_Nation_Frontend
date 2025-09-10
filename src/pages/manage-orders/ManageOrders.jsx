import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getOrdersByStatus } from '../../features/manageOrders/manageOrders';

// lazy loading
const Order = lazy(() => import('../../components/orders/Order'))


// NoOrders.js
import { Link } from 'react-router-dom';
import Loader from '../../components/common/Loader';

import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
import { ShoppingBag ,ArrowRight } from 'lucide-react';
import StatusTabs from '../../components/common/StatusTabs';

const NoOrders = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className='flex flex-col items-center justify-center py-12 px-6 text-center'
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className='mb-6'
    >
      <ShoppingBag size={56} color='gray' />
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className='mb-8'
    >
      <h2 className='text-2xl font-semibold text-gray-700 mb-2'>No Orders Yet</h2>
      <p className='text-gray-500 max-w-md'>
        Start exploring our products and place your first order today!
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Link
        to="/shop/all"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] hover:from-[var(--accent-color)] hover:to-[var(--themeColor)]
          text-white rounded-lg hover:bg-orange-500 transition-colors duration-200 
          font-medium group"
      >
        <span>Start Shopping</span>
        <ArrowRight className='text-sm group-hover:translate-x-1 transition-transform' />
      </Link>
    </motion.div>
  </motion.div>
);


// const NoOrders = () => (
//   <div className='flex flex-col gap-8 justify-center items-start xs:text-2xl font-mono'>
//     <p>You have no orders !!!</p>
//     <div>
//       <Link
//         to="/shop/all"
//         className="flex underline-hover text-[var(--background-color)] max-w-max 
//           hover:text-orange-500 justify-center items-center gap-2 py-1 
//           font-semibold rounded-lg uppercase"
//       >
//         <FaArrowLeftLong />
//         <span className='text-sm sm:text-[16px]'>Continue Shopping</span>
//       </Link>
//     </div>
//   </div>
// );

// OrdersHeader.js
const OrdersHeader = () => (
  <div className='mb-5'>
    <div>
      <h3 className='md:text-3xl text-2xl font-serif'>Manage Your Orders</h3>
      <p className='md:text-[16px] text-sm mt-1 font-sans'>
        Check and track the status of your recent orders.
      </p>
    </div>
  </div>
);



const STATUS_BUTTONS = [
  {
    id: 'total',
    label: 'Total Order',
    borderColor: 'blue-500',
    iconBgColor: 'EEF2FF',
    iconColor: 'blue',
    shadowColor: 'blue-400',
    getCount: (orders) => orders?.length || 0
  },
  {
    id: 'active',
    label: 'Active Order',
    borderColor: 'green-500',
    iconBgColor: 'ECFDF5',
    iconColor: 'green',
    shadowColor: 'green-400',
    getCount: (orders) => orders?.filter(order => order.orderStatus === "active").length || 0
  },
  {
    id: 'dispatched',
    label: 'Dispatched',
    borderColor: 'purple-500',
    iconBgColor: 'ECFDF5',
    iconColor: 'green',
    shadowColor: 'purple-400',
    getCount: (orders) => orders?.filter(order => order.orderStatus === "dispatched").length || 0
  },
  {
    id: 'completed',
    label: 'Completed',
    borderColor: 'orange-500',
    iconBgColor: 'FFFBEB',
    iconColor: 'orange',
    shadowColor: 'orange-400',
    getCount: (orders) => orders?.filter(order => order.orderStatus === "completed").length || 0
  },
  {
    id: 'cancelled',
    label: 'Cancelled',
    borderColor: 'red-500',
    iconBgColor: 'FEF2F2',
    iconColor: 'red',
    shadowColor: 'red-500',
    getCount: (orders) => orders?.filter(order => order.orderStatus === "cancelled").length || 0
  }
];

const ManageOrders = () => {
  const dispatch = useDispatch();
  const { orders, ordersByStatus } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getAllOrders());
    }
  }, [user, dispatch]);

  return (
    <div className='bg-[var(--background-color)] pt-3'>
      <div className=''>
        {/* <OrdersHeader /> */}

        {/* <div className='py-5 font-serif'>
          <div className='flex flex-wrap sm:gap-10 gap-2'>
            {STATUS_BUTTONS.map(button => (
              <StatusTabs
                key={button.id}
                isActive={ordersByStatus.orderStatusTab === button.id}
                count={button.getCount(orders)}
                label={button.label}
                onClick={() => dispatch(getOrdersByStatus(button.id))}
                borderColor={button.borderColor}
                iconBgColor={button.iconBgColor}
                iconColor={button.iconColor}
                shadowColor={button.shadowColor}
              />
            ))}
          </div>
        </div> */}
        <Suspense fallback={<Loader height='200px' />}>
          <div className='mt-6 flex flex-col gap-20'>
            {ordersByStatus.orderData?.length === 0 ? (
              <NoOrders />
            ) : (
              // ordersByStatus.orderData?.map((order) => (

              //   <Order key={order._id} order={order} />
              // ))


              <div className='pb-20 lg:w-[80%] w-[95%] mx-auto '>
                <OrdersHeader />

                <div className='py-5 font-serif'>
                  <div className='flex flex-wrap sm:gap-10 gap-2'>
                    {STATUS_BUTTONS.map(button => (
                      <StatusTabs
                        key={button.id}
                        isActive={ordersByStatus.orderStatusTab === button.id}
                        count={button.getCount(orders)}
                        label={button.label}
                        onClick={() => dispatch(getOrdersByStatus(button.id))}
                        borderColor={button.borderColor}
                        iconBgColor={button.iconBgColor}
                        iconColor={button.iconColor}
                        shadowColor={button.shadowColor}
                      />
                    ))}
                  </div>
                </div>
                <Suspense fallback={<Loader height='200px' />}>
                  <div className='mt-6 flex flex-col gap-20'>
                    {(
                      ordersByStatus.orderData?.map((order) => (
                        <Order key={order._id} order={order} />
                      ))
                    )}
                  </div>
                </Suspense>
              </div>

            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ManageOrders;

