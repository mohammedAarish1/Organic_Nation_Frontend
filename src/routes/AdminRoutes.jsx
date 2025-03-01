// import React, { useEffect, useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import AdminDashboard from '../components/admin/AdminDashboard';
// import AdminOrders from '../components/admin/AdminOrders';
// import AdminSidebar from '../components/admin/AdminSidebar';

// import { useDispatch, useSelector } from 'react-redux';
// import {  FaUserCircle } from 'react-icons/fa';
// import { RiMenu3Fill } from "react-icons/ri";
// import { VscAccount } from 'react-icons/vsc';
// import AdminUsers from '../components/admin/AdminUsers';
// import { fetchAdminData } from '../features/admin/adminSlice';
// import { getAllUserQueries, getAllUsers, getOrdersByStatus, getTotalOrders, getTotalReturns } from '../features/admin/adminData';
// import AdminQueries from '../components/admin/AdminQueries';
// import AdminProducts from '../components/admin/AdminProducts';
// import { getProductsData } from '../imports';
// import { ToastContainer } from 'react-toastify';
// import AdminReturnItems from '../components/admin/AdminReturnItems';
// import AdminBanners from '../components/admin/AdminBanners';

// // Import other admin components

// const AdminRoutes = () => {

//   const dispatch = useDispatch();

//   const [showSidebar, setShowSidebar] = useState(false);

//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

//   const { admin } = useSelector(state => state.admin);
//   const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));


//   useEffect(() => {
//     if (adminToken) {

//       dispatch(fetchAdminData(adminToken))
//         .then(res => {
//           dispatch(getTotalOrders());
//           dispatch(getTotalReturns());
//           dispatch(getProductsData());
//           dispatch(getAllUsers())
//           dispatch(getAllUserQueries())
//           dispatch(getOrdersByStatus("total"))

//         })
//     }
//   }, [adminToken, getOrdersByStatus,])




//   return (
//     <div className="min-h-screen h-full bg-[var(--bgColorSecondary)]">
//       <div className='flex  flex-row'>
//         {/* Sidebar */}
//         <div className={`w-full   sm:w-64  adminSidebar `}>
//           <div className={`${showSidebar && 'active'} h-full`}>

//             <AdminSidebar setShowSidebar={setShowSidebar} />
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-grow p-4 sm:p-8 h-full  overflow-x-auto">
//           {/* Admin Profile */}
//           <div className="flex items-center justify-between mb-8 ">
//             <div className="flex items-center space-x-4">
//               {/* <div className="w-10 h-10 rounded-full bg-gray-300"></div> */}
//               <FaUserCircle className='text-4xl text-[var(--themeColor)]' />
//               {isSidebarExpanded && (
//                 <div>
//                   <h2 className="text-lg font-bold">{admin && admin.name}</h2>
//                   <p className="text-gray-500">Admin</p>
//                 </div>
//               )}
//             </div>
//             <div className='flex gap-2'>
//               <button className="px-4 py-2 bg-gray-800 text-white rounded-md">
//                 <VscAccount />
//               </button>
//               <button
//                 className="px-4 py-2 bg-gray-800 text-white rounded-md sm:hidden block"
//                 onClick={() => {
//                   setShowSidebar(!showSidebar)
//                 }}
//               >
//                 <RiMenu3Fill />
//               </button>
//             </div>
//           </div>
//           <ToastContainer position='bottom-right' autoClose={1000} />
//           <Routes>
//             <Route path="/" element={<AdminDashboard />} />
//             <Route path="/orders" element={<AdminOrders />} />
//             <Route path="/users" element={<AdminUsers />} />
//             <Route path="/queries" element={<AdminQueries />} />
//             <Route path="/products" element={<AdminProducts />} />
//             <Route path="/returns" element={<AdminReturnItems />} />
//             <Route path="/banners" element={<AdminBanners />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminRoutes;


import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { RiMenu3Fill } from "react-icons/ri";
import { VscAccount } from 'react-icons/vsc';
import { fetchAdminData } from '../features/admin/adminSlice';
import { getAllUserQueries, getAllUsers, getOrdersByStatus, getTotalOrders, getTotalReturns } from '../features/admin/adminData';
import { getProductsData } from '../imports';
import { ToastContainer } from 'react-toastify';

// Lazy-load the admin components
const AdminDashboard = React.lazy(() => import('../pages/admin/AdminDashboard'));
const AdminOrders = React.lazy(() => import('../pages/admin/AdminOrders'));
const AdminSidebar = React.lazy(() => import('../components/admin/AdminSidebar'));
const AdminUsers = React.lazy(() => import('../pages/admin/AdminUsers'));
const AdminQueries = React.lazy(() => import('../pages/admin/AdminQueries'));
const AdminProducts = React.lazy(() => import('../pages/admin/AdminProducts'));
const AdminReturnItems = React.lazy(() => import('../pages/admin/AdminReturnItems'));
const AdminBanners = React.lazy(() => import('../pages/admin/AdminBanners'));

const AdminRoutes = () => {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const { admin } = useSelector(state => state.admin);
  const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));

  useEffect(() => {
    if (adminToken) {
      dispatch(fetchAdminData(adminToken)).then(res => {
        dispatch(getTotalOrders());
        dispatch(getTotalReturns());
        dispatch(getProductsData());
        dispatch(getAllUsers());
        dispatch(getAllUserQueries());
        dispatch(getOrdersByStatus("total"));
      });
    }
  }, [adminToken, dispatch]);

  return (
    <div className="min-h-screen h-full bg-[var(--bgColorSecondary)]">
      <div className='flex flex-row'>
        {/* Sidebar */}
        <div className={`w-full sm:w-64 adminSidebar`}>
          <div className={`${showSidebar && 'active'} h-full`}>
            <Suspense fallback={<div>Loading Sidebar...</div>}>
              <AdminSidebar setShowSidebar={setShowSidebar} />
            </Suspense>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4 sm:p-8 h-full overflow-x-auto">
          {/* Admin Profile */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <FaUserCircle className='text-4xl text-[var(--themeColor)]' />
              {isSidebarExpanded && (
                <div>
                  <h2 className="text-lg font-bold">{admin && admin.name}</h2>
                  <p className="text-gray-500">Admin</p>
                </div>
              )}
            </div>
            <div className='flex gap-2'>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md">
                <VscAccount />
              </button>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-md sm:hidden block"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <RiMenu3Fill />
              </button>
            </div>
          </div>

          <ToastContainer position='bottom-right' autoClose={1000} />

          <Suspense fallback={<div>Loading Content...</div>}>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/orders" element={<AdminOrders />} />
              <Route path="/users" element={<AdminUsers />} />
              <Route path="/queries" element={<AdminQueries />} />
              <Route path="/products" element={<AdminProducts />} />
              <Route path="/returns" element={<AdminReturnItems />} />
              <Route path="/banners" element={<AdminBanners />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;
