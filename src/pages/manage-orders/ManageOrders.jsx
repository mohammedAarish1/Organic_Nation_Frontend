// import React, { useEffect } from 'react'
// // react icons 
// // product image 
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllOrders, getOrdersByStatus } from '../../features/manageOrders/manageOrders';
// import Order from '../../components/orders/Order';
// import { Link } from 'react-router-dom';




// const ManageOrders = () => {


//     const dispatch = useDispatch()
//     const { orders, ordersByStatus } = useSelector(state => state.orders)
//     const { user } = useSelector(state => state.auth)


//     useEffect(() => {
//         if (user) {
//             dispatch(getAllOrders())

//         }
//     }, [user])


//     return (
//         <div className='mt-3 mb-20 lg:w-[80%] w-[95%] mx-auto'>
//             {/* heading */}
//             <div className='mb-5'>
//                 <div className=''>
//                     <h3 className='md:text-3xl text-2xl font-serif'>Manage Your Orders</h3>
//                     <p className='md:text-[16px] text-sm mt-1 font-sans'>Check and track the status of your recent orders.</p>
//                 </div>
//             </div>
//             {/* buttons */}
//             <div className='py-5 font-serif'>
//                 <div className='flex flex-wrap sm:gap-10 gap-2   '>

//                     {/* button1 */}
//                     <div
//                         className={`${ordersByStatus.orderStatusTab === 'total' && 'border-blue-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-blue-400  transition-all duration-500 hover:bg-[var(--hoverEffect)]`}
//                         onClick={() => dispatch(getOrdersByStatus("total"))}
//                     >
//                         <div className='sm:block hidden bg-[#EEF2FF] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[blue]' /></div>
//                         <div>
//                             <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>{orders?.length || 0}</p>
//                             <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Total Order</p>
//                         </div>
//                         <div className='sm:hidden block bg-[#EEF2FF] md:p-5 xs:p-2 rounded-full'><ChevronDown size={20} /></div>
//                     </div>

//                     {/* button2 */}
//                     <div className={`${ordersByStatus.orderStatusTab === 'active' && 'border-green-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-green-400  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getOrdersByStatus("active"))}>
//                         <div className='sm:block hidden bg-[#ECFDF5] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[green]' /></div>
//                         <div>
//                             <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
//                                 {orders?.filter(order => order.orderStatus === "active").length || 0}
//                             </p>
//                             <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Active Order</p>
//                         </div>
//                         <div className='sm:hidden block bg-[#ECFDF5] md:p-5 xs:p-2 rounded-full'><ChevronDown size={20} /></div>
//                     </div>
//                     {/* button3 */}
//                     <div className={`${ordersByStatus.orderStatusTab === 'dispatched' && 'border-purple-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-purple-400  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getOrdersByStatus("dispatched"))}>
//                         <div className='sm:block hidden bg-[#ECFDF5] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[green]' /></div>
//                         <div>
//                             <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
//                                 {orders?.filter(order => order.orderStatus === "dispatched").length || 0}
//                             </p>
//                             <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Dispatched</p>
//                         </div>
//                         <div className='sm:hidden block bg-[#ECFDF5] md:p-5 xs:p-2 rounded-full'><ChevronDown size={20} /></div>
//                     </div>

//                     {/* button4 */}
//                     <div className={`${ordersByStatus.orderStatusTab === 'completed' && 'border-orange-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-orange-400  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getOrdersByStatus("completed"))}>
//                         <div className='sm:block hidden bg-[#FFFBEB] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[orange]' /></div>
//                         <div>
//                             <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
//                                 {orders?.filter(order => order.orderStatus === "completed").length || 0}
//                             </p>
//                             <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Completed</p>
//                         </div>
//                         <div className='sm:hidden block bg-[#FFFBEB] md:p-5 xs:p-2 rounded-full'><ChevronDown size={20} /></div>
//                     </div>

//                     {/* button5 */}
//                     <div className={`${ordersByStatus.orderStatusTab === 'cancelled' && 'border-red-500 border-[1px]'} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-red-500  transition-all duration-500 hover:bg-[var(--hoverEffect)]`} onClick={() => dispatch(getOrdersByStatus("cancelled"))}>
//                         <div className='sm:block hidden bg-[#FEF2F2] md:p-4 p-2 rounded-full'><IoCubeOutline className='text-2xl text-[red]' /></div>
//                         <div>
//                             <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>
//                                 {orders?.filter(order => order.orderStatus === "cancelled").length || 0}

//                             </p>
//                             <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>Cancelled</p>
//                         </div>
//                         <div className='sm:hidden block bg-[#FEF2F2] md:p-5 xs:p-2 rounded-full'><ChevronDown size={20} /></div>
//                     </div>



//                 </div>
//             </div>
//             {/*  all orders  */}
//             <div className='mt-6 flex flex-col gap-20'>


//                 {/* no orders messgae  */}

//                 {ordersByStatus.orderData?.length === 0 && (
//                     <div className='flex flex-col gap-8 justify-center items-start xs:text-2xl font-mono'>
//                         <p className=''>You have no orders !!!</p>
//                         <div>
//                             <Link to="/shop/all" className=" flex underline-hover text-[var(--bgColorPrimary)] max-w-max hover:text-orange-500 justify-center items-center gap-2 py-1   font-semibold rounded-lg  uppercase "> <FaArrowLeftLong /><span className='text-sm sm:text-[16px]'>Continue Shopping</span></Link>
//                         </div>
//                     </div>
//                 )}

//                 {ordersByStatus.orderData?.map((order) => (<Order key={order._id} order={order} />))}



//             </div>

//         </div>
//     )
// }

// export default ManageOrders2


// ManageOrders.js
import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getOrdersByStatus } from '../../features/manageOrders/manageOrders';
// import Order from '../../components/orders/Order';

// StatusButton.js

import { ChevronDown, Box } from 'lucide-react';


// lazy loading

const Order = lazy(() => import('../../components/orders/Order'))

const StatusButton = ({
  isActive,
  count,
  label,
  onClick,
  borderColor,
  iconBgColor,
  iconColor,
  shadowColor
}) => (
  <div
    className={`${isActive && `border-${borderColor} border-[1px]`} 
      flex justify-start items-center xs:gap-3 rounded-lg max-w-max 
      sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer 
      shadow-sm shadow-${shadowColor} transition-all duration-500 
      hover:bg-[var(--hoverEffect)]`}
    onClick={onClick}
  >
    <div className={`sm:block hidden bg-${iconBgColor} md:p-4 p-2 rounded-full`}>
      <Box color={iconColor} size={24} />
    </div>
    <div>
      <p className='font-semibold lg:text-[22px] xs:text-xl max-w-max'>{count}</p>
      <p className='text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]'>{label}</p>
    </div>
    <div className={`sm:hidden block bg-${iconBgColor} md:p-5 xs:p-2 rounded-full`}>
      <ChevronDown size={20} />
    </div>
  </div>
);

// NoOrders.js
import { Link } from 'react-router-dom';
import Loader from '../../components/common/Loader';

import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
import { ShoppingBag ,ArrowRight } from 'lucide-react';

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
//         className="flex underline-hover text-[var(--bgColorPrimary)] max-w-max 
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
              <StatusButton
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
                      <StatusButton
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

