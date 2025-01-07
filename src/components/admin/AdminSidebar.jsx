import { useState } from "react";
import {  FaHome, FaShoppingCart, FaUserAlt, } from 'react-icons/fa';
import { IoMdLogIn } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { RiMailUnreadFill } from "react-icons/ri";
import { FaProductHunt } from "react-icons/fa6";
import { PiImagesSquareThin } from "react-icons/pi";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { adminLogout } from "../../features/admin/adminSlice";
import { useDispatch } from "react-redux";


const AdminSidebar = ({ setShowSidebar }) => {


    const dispatch = useDispatch();

    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };




    return (
        <div
            className={`bg-[var(--bgColorPrimary)] text-white min-h-screen  h-full duration-300 ${isSidebarExpanded ? 'w-64 px-6 py-8' : 'w-24 px-4 py-6'
                }`}
        >
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">
                    <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png" alt="logo" className="w-16" />
                </h1>
                {/* <button onClick={toggleSidebar} className="text-2xl translate-x-4">
                    {isSidebarExpanded ? <FaArrowCircleLeft className="text-2xl " /> : <FaArrowCircleRight className="text-2xl" />}
                </button> */}
                {/* close button  */}
                <div className='sm:hidden px-4 text-end'>
                    <button type='button'
                        className='shadow-md rounded-full shadow-green-700 hover:scale-110 text-[#ffe9a1]'
                        onClick={() => {
                            // dispatch(setShowSidebar());
                            setShowSidebar(false);
                        }}><IoCloseSharp className='text-4xl' /></button>

                </div>
            </div>

            <nav className="space-y-4">
                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) => `${isActive ? ' underline underline-offset-4' : null}  flex items-center space-x-4`}
                    onClick={() => setShowSidebar(false)}
                >
                    <FaHome />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) => `${isActive ? ' underline underline-offset-4' : null}  flex items-center space-x-4`}
                    onClick={() => setShowSidebar(false)}

                >
                    <FaShoppingCart />
                    <span>Orders</span>
                </NavLink>
                <NavLink
                    to="/admin/users"
                    className={({ isActive }) => `${isActive ? ' underline underline-offset-4' : null}  flex items-center space-x-4`}
                    onClick={() => setShowSidebar(false)}
                >
                    <FaUserAlt />
                    <span>Users</span>
                </NavLink>
                <NavLink
                    to="/admin/queries"
                    className={({ isActive }) => `${isActive ? ' underline underline-offset-4' : null}  flex items-center space-x-4`}
                    onClick={() => setShowSidebar(false)}
                >
                    <RiMailUnreadFill />
                    <span>Queries</span>
                </NavLink>
                <NavLink
                    to="/admin/returns"
                    className={({ isActive }) => `${isActive ? ' underline underline-offset-4' : null}  flex items-center space-x-4`}
                    onClick={() => setShowSidebar(false)}
                >
                    <MdOutlineAssignmentReturn />
                    <span>Returns</span>
                </NavLink>
                <NavLink
                    to="/admin/products"
                    className={({ isActive }) => `${isActive ? ' underline underline-offset-4' : null}  flex items-center space-x-4`}
                    onClick={() => setShowSidebar(false)}
                >
                    <FaProductHunt />
                    <span>Products</span>
                </NavLink>
                <NavLink
                    to="/admin/banners"
                    className={({ isActive }) => `${isActive ? ' underline underline-offset-4' : null}  flex items-center space-x-4`}
                    onClick={() => setShowSidebar(false)}
                >
                    <PiImagesSquareThin />
                    <span>Banners</span>
                </NavLink>
                <NavLink to="#" className={({ isActive }) => ` flex items-center space-x-4`}>

                    {adminToken ? (
                        <button
                            className="flex justify-center items-center gap-4"
                            onClick={() => {
                                dispatch(adminLogout());
                            }}
                        >
                            <PiSignOutBold /> Logout
                        </button>
                    ) : (
                        <button className="flex justify-center items-center gap-4"> <IoMdLogIn className='text-xl' /> Log in</button>
                    )}



                </NavLink>

            </nav>
        </div>

    );
};
export default AdminSidebar;