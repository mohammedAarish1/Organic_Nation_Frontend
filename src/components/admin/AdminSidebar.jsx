import React, { memo, useCallback } from 'react';
import { FaHome, FaShoppingCart, FaUserAlt, FaProductHunt, FaSignOutAlt } from 'react-icons/fa';
// import { IoMdLogIn } from 'react-icons/io';
import { RiMailUnreadFill } from 'react-icons/ri';
import { MdOutlineAssignmentReturn } from 'react-icons/md';
import { PiImagesSquareThin } from 'react-icons/pi';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../features/admin/adminSlice";
import { IoCloseSharp } from 'react-icons/io5';

const AdminSidebar = memo(({ setShowSidebar }) => {
    const dispatch = useDispatch();
    // const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));

    const handleLogout = useCallback(() => {
        dispatch(adminLogout());
    }, [dispatch]);

    const closeSidebar = useCallback(() => {
        setShowSidebar(false);
    }, [setShowSidebar]);

    const sidebarLinks = [
        { path: "/admin", icon: FaHome, label: "Dashboard" },
        { path: "/admin/orders", icon: FaShoppingCart, label: "Orders" },
        { path: "/admin/users", icon: FaUserAlt, label: "Users" },
        { path: "/admin/queries", icon: RiMailUnreadFill, label: "Queries" },
        { path: "/admin/returns", icon: MdOutlineAssignmentReturn, label: "Returns" },
        { path: "/admin/products", icon: FaProductHunt, label: "Products" },
        { path: "/admin/banners", icon: PiImagesSquareThin, label: "Banners" },
        { path: "#", icon: FaSignOutAlt, label: "Logout" },
    ];

    return (
        <div className={`bg-[var(--bgColorPrimary)] text-white min-h-screen h-full duration-300 w-64 px-6 py-8`}>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">
                    <img
                        src="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
                        alt="logo"
                        className="w-16"
                    />
                </h1>
                <div className='sm:hidden px-4 text-end'>
                    <button
                        type='button'
                        className='shadow-md rounded-full shadow-green-700 hover:scale-110 text-[#ffe9a1]'
                        onClick={closeSidebar}
                    >
                        <IoCloseSharp className='text-4xl' />
                    </button>
                </div>
            </div>

            <nav className="space-y-4">
                {sidebarLinks.map(({ path, icon: Icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end
                        className={({ isActive }) => `${isActive ? 'underline underline-offset-4' : ''} flex items-center space-x-4`}
                        onClick={label === 'Logout' ? handleLogout : closeSidebar}
                    >
                        <Icon />
                        <span>{label}</span>
                    </NavLink>
                ))}

                {/* <NavLink to="#" className=" bg-red-600 mt-4">
                    {adminToken ? (
                        <button
                            className="flex justify-center items-center gap-4"
                            onClick={handleLogout}
                        >
                            Logout  <FaSignOutAlt />
                        </button>
                    ) : (
                        <button className="flex justify-center items-center gap-4">
                            <IoMdLogIn className='text-xl' /> Log in
                        </button>
                    )}
                </NavLink> */}
            </nav>
        </div>
    );
});

export default AdminSidebar;