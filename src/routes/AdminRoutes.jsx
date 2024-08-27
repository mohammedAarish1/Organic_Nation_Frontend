import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminOrders from '../components/admin/AdminOrders';
import AdminSidebar from '../components/admin/AdminSidebar';

import { useDispatch, useSelector } from 'react-redux';
import { FaBars, FaHome, FaShoppingCart, FaUserAlt, FaChartLine, FaCog ,FaUserCircle} from 'react-icons/fa';
import { RiMenu3Fill } from "react-icons/ri";
import { BsSearch } from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';
import AdminUsers from '../components/admin/AdminUsers';
import { fetchAdminData } from '../features/admin/adminSlice';
import { getAllUserQueries, getAllUsers, getOrdersByStatus, getTotalOrders } from '../features/admin/adminData';
import AdminQueries from '../components/admin/AdminQueries';

// Import other admin components

const AdminRoutes = () => {


  const dispatch = useDispatch();

  const [showSidebar, setShowSidebar] = useState(false);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const { totalOrders, loading, ordersByStatus } = useSelector(state => state.adminData)

  const { admin } = useSelector(state => state.admin);
  const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));


  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };


  useEffect(() => {
    if (adminToken) {

      dispatch(fetchAdminData(adminToken))
        .then(res => {
          dispatch(getTotalOrders(adminToken))
          dispatch(getAllUsers(adminToken))
          dispatch(getAllUserQueries(adminToken))
          dispatch(getOrdersByStatus("total"))

        })
    }
  }, [adminToken, getOrdersByStatus])




  return (
   



    <div className="min-h-screen h-full bg-[var(--bgColorSecondary)]">
      <div className='flex  flex-row'>
        {/* Sidebar */}
        <div className={`w-full   sm:w-64  adminSidebar `}>
          <div className={`${showSidebar && 'active'} h-full`}>

            <AdminSidebar setShowSidebar={setShowSidebar} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4 sm:p-8 h-full  overflow-x-auto">
          {/* Admin Profile */}
          <div className="flex items-center justify-between mb-8 ">
            <div className="flex items-center space-x-4">
              {/* <div className="w-10 h-10 rounded-full bg-gray-300"></div> */}
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
                onClick={() => {
                  setShowSidebar(!showSidebar)
                }}
              >
                <RiMenu3Fill />
              </button>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/queries" element={<AdminQueries />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;