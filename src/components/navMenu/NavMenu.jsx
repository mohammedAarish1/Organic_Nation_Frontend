import React, { useState } from 'react'
// react icons 
import { MdOutlineHome } from "react-icons/md";
import { RiShoppingBasketFill } from "react-icons/ri";
import { CgTrack } from "react-icons/cg";
import { TbPhoneCall } from "react-icons/tb";
import { BsChevronDown } from "react-icons/bs";
import { RiMenu3Fill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';


const NavMenu = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showMobileDropDownMenu, setShowMobileDropDownMenu] = useState(false)
    console.log(showMobileDropDownMenu)
    return (
        <>
            <nav className='flex order-last md:-order-none '>
                <div className='md:hidden z-50'>
                    {showMobileMenu ? <button type='button' onClick={() => setShowMobileMenu(false)}><IoCloseSharp className='text-3xl text-white z-50' /></button> : <button type='button' onClick={() => setShowMobileMenu(true)}><RiMenu3Fill className='text-2xl ' /></button>}


                </div>
                <ul className='  hidden md:flex justify-center items-center md:gap-4'>
                    <li>
                        <NavLink to="/" className={({ isActive }) => `cursor-pointer p-4 rounded-md hover:bg-[var(--hoverEffect)] flex flex-col justify-center items-center ${isActive ? 'bg-[var(--hoverEffect)]' : null} `}>
                            <MdOutlineHome className='text-[var(--titleTextColor)] text-xl' />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className='shop' >
                        <NavLink to="shop" className={({ isActive }) => `cursor-pointer p-4 rounded-md hover:bg-[var(--hoverEffect)] flex flex-col justify-center items-center ${isActive ? 'bg-[var(--hoverEffect)]' : null} `}>
                            <RiShoppingBasketFill className='text-[var(--titleTextColor)] text-xl' />
                            <span>Shop</span>
                        </NavLink>
                        {/* dropdown menu start */}
                        <ul className=' dropDown z-50 hidden absolute left-0 right-0 top-[85%]  bg-[var(--bgColorPrimary)]  2xl:px-48 flex-wrap items-start justify-between text-white '>

                            <li className='cursor-pointer hover:bg-[var(--hoverEffect)] hover:text-[var(--otherTextColor)] xl:p-10 px-2 py-10 transition-all duration-500'>
                                <Link to="" className='flex flex-col justify-center items-center'>
                                    <img src="images/pickel.avif" alt="authentic-pickel" className='w-10' />
                                    <span className=' text-center'>Authentic Pickle</span>
                                </Link>
                            </li>
                            <li className='cursor-pointer hover:bg-[var(--hoverEffect)] hover:text-[var(--otherTextColor)]  xl:p-10 px-2 py-10'>
                                <Link to="" className='flex flex-col justify-center items-center'>
                                    <img src="images/pickel.avif" alt="authentic-pickel" className='w-10' />
                                    <span className='text-center'>Seasonings</span>
                                </Link>
                            </li>
                            <li className='cursor-pointer hover:bg-[var(--hoverEffect)] hover:text-[var(--otherTextColor)]  xl:p-10 px-2 py-10'>
                                <Link to="" className='flex flex-col justify-center items-center'>
                                    <img src="images/pickel.avif" alt="authentic-pickel" className='w-10' />
                                    <span className='text-center'>Organic Tea</span>
                                </Link>
                            </li>
                            <li className='cursor-pointer hover:bg-[var(--hoverEffect)] hover:text-[var(--otherTextColor)]  xl:p-10 px-2 py-10'>
                                <Link to="" className='flex flex-col justify-center items-center'>
                                    <img src="images/pickel.avif" alt="authentic-pickel" className='w-10' />
                                    <span className='text-center'>Organic Oil</span>
                                </Link>
                            </li>
                            <li className='cursor-pointer hover:bg-[var(--hoverEffect)] hover:text-[var(--otherTextColor)]  xl:p-10 px-2 py-10'>
                                <Link to="" className='flex flex-col justify-center items-center'>
                                    <img src="images/pickel.avif" alt="authentic-pickel" className='w-10' />
                                    <span className='text-center'>Sweeteners</span>
                                </Link>
                            </li>

                            <li className='cursor-pointer hover:bg-[var(--hoverEffect)] hover:text-[var(--otherTextColor)]  xl:p-10 px-2 py-10'>
                                <Link to="" className='flex flex-col justify-center items-center'>
                                    <img src="images/pickel.avif" alt="authentic-pickel" className='w-10' />
                                    <span className='text-center'>Herbs</span>
                                </Link>
                            </li>

                        </ul>
                        {/* dropdown menu end */}

                    </li>

                    <li>
                        <NavLink to="track-order" className={({ isActive }) => `cursor-pointer p-4 rounded-md hover:bg-[var(--hoverEffect)] flex flex-col justify-center items-center ${isActive ? 'bg-[var(--hoverEffect)]' : null} `}>
                            <CgTrack className='text-[var(--titleTextColor)] text-xl' />
                            <span>Track Order</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="contact-us" className={({ isActive }) => `cursor-pointer p-4 rounded-md hover:bg-[var(--hoverEffect)] flex flex-col justify-center items-center ${isActive ? 'bg-[var(--hoverEffect)]' : null} `}>
                            <TbPhoneCall className='text-[var(--titleTextColor)] text-xl' />
                            <span>Contact Us</span>
                        </NavLink>
                    </li>

                </ul>
            </nav>

            {/* mobile menu  */}
            <nav className={` ${!showMobileMenu && "hidden"} z-20 absolute top-0 w-[60%] h-max min-h-[100vh] bg-[var(--bgColorPrimary)] right-0 md:hidden order-last md:-order-none `}>
                <ul className=' md:flex justify-center items-center md:gap-4 mt-20 text-white '>

                    <li className='cursor-pointer p-6 rounded-md hover:bg-[var(--hoverEffect)] hover:text-[var(--titleTextColor)]'>
                        <Link to="/" onClick={() => setShowMobileMenu(false)} className='flex flex-col justify-center items-center'>
                            <MdOutlineHome className=' text-xl' />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className=' cursor-pointer relative py-6 rounded-md hover:bg-[var(--hoverEffect)] '  >
                        <Link to="shop" className='flex flex-col justify-center items-center' onClick={()=>setShowMobileDropDownMenu((prev)=>!prev)}>
                            <RiShoppingBasketFill className='text-xl ' />
                            <span className='flex justify-center  items-center gap-1'>Shop <BsChevronDown className='text-sm' /> </span>
                        </Link>
                        {/* dropdown menu start */}
                        <ul className={`${showMobileDropDownMenu ?"flex":"hidden"} translate-y-6  bg-[var(--bgColorSecondary)] text-[var(--titleTextColor)] h-full w-full  items-center flex-col justify-start  mx-auto`}>

                            <li className='cursor-pointer hover:bg-[var(--bgColorPrimary)] hover:text-white w-full  xl:p-10 px-2 py-2 transition-all duration-500'>
                                <Link to="" className='flex flex-row gap-3 justify-start items-center'>
                                    <img src="images/pickel.avif" alt="authentic-pickel" className='w-10' />
                                    <span className=' text-center'>Authentic Pickle</span>
                                </Link>
                            </li>
                            <li className='cursor-pointer hover:bg-[var(--bgColorPrimary)] hover:text-white w-full xl:p-10 px-2 py-2 transition-all duration-500'>
                                <Link to="" className='flex flex-row gap-3 justify-start items-center'>
                                    <img src="images/pickel.avif" alt="authentic-pickel" className='w-10' />
                                    <span className='text-center'>Seasonings</span>
                                </Link>
                            </li>
                            <li className='cursor-pointer hover:bg-[var(--bgColorPrimary)] hover:text-white w-full  xl:p-10 px-2 py-2'>
                                <Link to="" className='flex flex-row gap-3 justify-start items-center'>
                                    <img src="images/pickel.avif" alt="authentic-pickel" className='w-10' />
                                    <span className='text-center'>Organic Tea</span>
                                </Link>
                            </li>
                            <li className='cursor-pointer hover:bg-[var(--bgColorPrimary)] hover:text-white  w-full xl:p-10 px-2 py-2'>
                                <Link to="" className='flex flex-row gap-3 justify-start items-center'>
                                    <img src="images/pickel.avif" alt="authentic-pickel" className='w-10' />
                                    <span className='text-center'>Organic Oil</span>
                                </Link>
                            </li>
                            <li className='cursor-pointer hover:bg-[var(--bgColorPrimary)] hover:text-white w-full  xl:p-10 px-2 py-2'>
                                <Link to="" className='flex flex-row gap-3 justify-start items-center'>
                                    <img src="images/pickel.avif" alt="authentic-pickel" className='w-10' />
                                    <span className='text-center'>Sweeteners</span>
                                </Link>
                            </li>
                            <li className='cursor-pointer hover:bg-[var(--bgColorPrimary)] hover:text-white w-full  xl:p-10 px-2 py-2'>
                                <Link to="" className='flex flex-row gap-3 justify-start items-center'>
                                    <img src="images/pickel.avif" alt="authentic-pickel" className='w-10' />
                                    <span className='text-center'>Herbs</span>
                                </Link>
                            </li>

                        </ul>
                        {/* dropdown menu end */}

                    </li>

                    <li className='cursor-pointer py-6 px-2 rounded-md hover:bg-[var(--hoverEffect)]'>
                        <Link to="track-order" onClick={() => setShowMobileMenu(false)} className='flex flex-col justify-center items-center '>
                            <CgTrack className=' text-xl' />
                            <span>Track Order</span>
                        </Link>
                    </li>
                    <li className='cursor-pointer py-6 px-2 rounded-md hover:bg-[var(--hoverEffect)]'>
                        <Link to="contact-us" onClick={() => setShowMobileMenu(false)} className='flex flex-col justify-center items-center '>
                            <TbPhoneCall className=' text-xl' />
                            <span>Contact Us</span>
                        </Link>
                    </li>

                </ul>
            </nav>

        </>

    )
}

export default NavMenu
