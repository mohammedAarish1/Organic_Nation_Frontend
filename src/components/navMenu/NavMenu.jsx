import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
import { setCurrentPage } from '../../features/pagination/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSidebar } from '../../features/toggleSidebar/toggleSidebar';
import Search from '../search/Search';
import Logo from '../logo/Logo';
// react icons 
import { MdOutlineHome, MdKeyboardArrowDown } from "react-icons/md";
import { RiShoppingBasketFill,RiMenu3Fill } from "react-icons/ri";
import { TbPhoneCall } from "react-icons/tb";
import { BsChevronDown } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { FaBlog } from "react-icons/fa";
// images 
import AuthenticPickles from '../../images/shop/Authentic-Pickles.png'
import ChutneyDip from '../../images/shop/Chutney&Dip.png';
import FruitPreserves from '../../images/shop/Fruit-Preserves.png'
import SeasoningsHerbs from '../../images/shop/Seasonings&Herbs.png'
import OrganicTea from '../../images/shop/Organic-Tea.png'
import Salt from '../../images/shop/Salt.png'
import Sweetners from '../../images/shop/Sweetners.png'
import OrganicHoney from '../../images/shop/Organic-Honey.png'
import OrganicOils from '../../images/shop/Organic-Oils.png'
import Vegan from '../../images/shop/Vegan.png';
import Oats from '../../images/shop/Oats.png'
import BreakfastCereals from '../../images/shop/Breakfast-Cereals.png';




const categoriesImages = [
    OrganicHoney,
    AuthenticPickles,
    ChutneyDip,
    FruitPreserves,
    SeasoningsHerbs,
    OrganicTea,
    Salt,
    Sweetners,
    OrganicOils,
    Oats,
    Vegan,
    BreakfastCereals
]

const NavMenu = () => {

    const [showDropDownMenu, setShowDropDownMenu] = useState(false)
    const dispatch = useDispatch()
    const { showSidebar } = useSelector(state => state.sidebar)
    const { categoryList } = useSelector((state) => state.product_data);


    const categoryListWithImg = categoryList.filter((curItem) => curItem.category !== 'All').map((curItem, index) => ({ ...curItem, img: categoriesImages[index] }));



    // below code is to disable the background while showing menu in the mobile devices 
    useEffect(() => {
        if (showSidebar) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }


    }, [showSidebar]);


    return (
        <>
            <nav className='flex order-last md:-order-none text-[var(--themeColor)] '>

                {/* menu button */}
                <div className='md:hidden'>
                    <button type='button' onClick={() => dispatch(setShowSidebar())}><RiMenu3Fill className='text-2xl ' /></button>

                </div>

                {/* navbar items */}

                <ul className='  hidden md:flex justify-center items-center md:gap-1  font-medium'>
                    <li>
                        <NavLink to="/" className={({ isActive }) => `cursor-pointer p-4 min-w-[86px] rounded-md hover:bg-[var(--hoverEffect)] flex flex-col justify-center items-center ${isActive ? 'bg-[var(--hoverEffect)]' : null} `}>
                            <MdOutlineHome className=' text-xl' />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className='shop' >
                        <NavLink
                            to="/shop/all"
                            onClick={() => dispatch(setCategoryBtnValue('all'))}
                            className={({ isActive }) => `cursor-pointer p-4 min-w-[86px] rounded-md hover:bg-[var(--hoverEffect)] flex flex-col justify-center items-center ${isActive ? 'bg-[var(--hoverEffect)]' : null} `}

                        >
                            <RiShoppingBasketFill className=' text-xl' />
                            <span className='flex justify-center items-center'>Shop <MdKeyboardArrowDown className=' text-[18px] mt-[3px]' /></span>
                        </NavLink>

                        {/* dropdown menu start */}
                        <div className='dropDown  absolute lg:right-44 right-24 lg:w-[60%] w-[80%] md:top-[84%] lg:top-[84%]  bg-gray-700 flex  flex-wrap items-start justify-between overflow-hidden shadow-lg'>

                            <ul className={`z-50 flex flex-wrap items-start justify-between bg-[var(--bgColorSecondary)] text-[var(--bgColorPrimary)]  pt-4 pb-6 font-semibold`}>
                                {categoryListWithImg.map((curItem) => (
                                    <li key={curItem.category} className='cursor-pointer w-1/6  hover:text-yellow-600 xl:p-4 px-2  py-4'>
                                        <Link to={`/shop/${curItem.categoryUrl.toLowerCase()}`} className='flex flex-col justify-center items-center' onClick={() => {
                                            // setShowDropDownMenu(false)
                                            dispatch(setCurrentPage(1))
                                            dispatch(setCategoryBtnValue(curItem.categoryUrl))
                                            dispatch(fetchCategoryWiseData(curItem.categoryUrl.toLowerCase()))

                                        }}>
                                            <img src={curItem.img} alt="authentic-pickel" className='lg:lg:w-20 w-16' />
                                            <span className=' text-center text-sm '>{curItem.category}</span>
                                        </Link>
                                    </li>
                                ))}

                            </ul>

                        </div>

                        {/* dropdown menu end */}

                    </li>

                    <li>
                        <NavLink to="/our-blogs" className={({ isActive }) => ` cursor-pointer px-2 py-4 min-w-[86px] rounded-md hover:bg-[var(--hoverEffect)] flex flex-col items-center ${isActive ? 'bg-[var(--hoverEffect)]' : null} `}>
                            <FaBlog className=' text-xl' />
                            <span className='text-center'>Blogs</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="contact-us" className={({ isActive }) => `cursor-pointer px-2 py-4 min-w-[86px] rounded-md hover:bg-[var(--hoverEffect)] flex flex-col justify-center items-center ${isActive ? 'bg-[var(--hoverEffect)]' : null} `}>
                            <TbPhoneCall className='text-xl' />
                            <span className='text-center'>Contact Us</span>
                        </NavLink>
                    </li>

                </ul>
            </nav>



            {/* ===================================== mobile menu  starts here ================================= */}



            <nav id='mobileMenu' className={`mobile-menu-container ${showSidebar ? 'active' : ''} `}>
                <div className={`mobile-menu min-h-full xs:w-1/2 w-2/3 ${showDropDownMenu && 'w-full'} ${showSidebar ? 'active' : ''}`}>

                    <div className='p-4'>
                        <Logo />
                    </div>

                    {/* close button  */}
                    <div className='md:hidden px-4 text-end'>
                        <button type='button'
                            className='shadow-md rounded-full shadow-green-700 hover:scale-110 text-[#ffe9a1]'
                            onClick={() => {
                                dispatch(setShowSidebar());
                                setShowDropDownMenu(false);
                            }}><IoCloseSharp className='text-4xl' /></button>

                    </div>

                    <ul className=' md:flex justify-center items-center md:gap-4 text-[var(--titleTextColor)] font-mono'>
                        <li className='cursor-pointer p-4 rounded-md '>
                            <Search mobileMenu={true} />
                        </li>

                        <li className='cursor-pointer p-4 rounded-md text-[#ffe9a1] hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)]'>
                            <Link to="/" onClick={() => dispatch(setShowSidebar())} className='flex text-xl gap-3 justify-start items-center'>
                                <MdOutlineHome className=' text' />
                                <span>Home</span>
                            </Link>
                        </li>

                        <li className=' cursor-pointer   p-4 relative rounded-md text-[#ffe9a1] hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)] '>
                            <div className='flex justify-between items-center'>
                                <Link to="shop" className='w-full flex text-xl gap-3 justify-start items-center' onClick={() => {
                                    dispatch(setShowSidebar())
                                }}>
                                    <RiShoppingBasketFill className='text-xl ' />
                                    <span className='w-full'>
                                        Shop
                                    </span>
                                </Link>
                                <span className={`pl-1 border-l-2 border-[var(--titleTextColor)]`} onClick={() => setShowDropDownMenu((prev) => !prev)}><BsChevronDown className={`${showDropDownMenu && 'rotate-180'} transition-all duration-500`} /></span>
                            </div>

                            {/* mobile dropdown menu start */}

                            {showDropDownMenu && (
                                <ul className={`flex translate-y-6  text-[var(--titleTextColor)] h-full w-full  items-center flex-wrap justify-center gap-x-5 gap-y-9 pb-10  mx-auto overflow-y-auto`}>
                                    {categoryListWithImg.map((curItem, index) => (
                                        <li key={index} className='w-[40%] cursor-pointer hover:text-orange-500  transition-all duration-300'>
                                            <Link to="shop" className='flex flex-col gap-3 justify-start items-center' onClick={() => {
                                                setShowDropDownMenu(false)
                                                dispatch(setCurrentPage(1))
                                                dispatch(setCategoryBtnValue(curItem.category))
                                                dispatch(fetchCategoryWiseData(curItem.categoryUrl.toLowerCase()))
                                                dispatch(setShowSidebar())
                                            }}>
                                                <img src={curItem.img} alt="authentic-pickel" className='w-10' />
                                                <span className=' text-center text-sm'>{curItem.category}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}




                        </li>

                        <li className='cursor-pointer p-4 rounded-md text-[#ffe9a1] hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)]'>
                            <Link to="/our-blogs" onClick={() => dispatch(setShowSidebar())} className='flex text-xl gap-3 justify-start items-center '>
                                <FaBlog className=' text-xl' />
                                <span>Blog</span>
                            </Link>
                        </li>
                        <li className='cursor-pointer p-4 rounded-md text-[#ffe9a1] hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)]'>
                            <Link to="contact-us" onClick={() => dispatch(setShowSidebar())} className='flex text-xl gap-3 justify-start items-center '>
                                <TbPhoneCall className=' text-xl' />
                                <span>Contact Us</span>
                            </Link>
                        </li>

                    </ul>


                </div>
            </nav>


        </>

    )
}

export default NavMenu;
