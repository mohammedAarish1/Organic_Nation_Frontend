import React, { memo, useCallback, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
import { setCurrentPage } from '../../features/pagination/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSidebar } from '../../features/toggleSidebar/toggleSidebar';
import Logo from '../logo/Logo';
// react icons 
import { MdOutlineHome, MdKeyboardArrowDown } from "react-icons/md";
import { RiShoppingBasketFill, RiMenu3Fill } from "react-icons/ri";
import { TbPhoneCall } from "react-icons/tb";
import { IoCloseSharp } from "react-icons/io5";
import { FaBlog ,FaRegUser} from "react-icons/fa";
import { LiaGiftsSolid } from "react-icons/lia";
import { LuChefHat } from "react-icons/lu";



// const NavMenu2 = () => {

//     const [showDropDownMenu, setShowDropDownMenu] = useState(false)
//     const dispatch = useDispatch()
//     const { showSidebar } = useSelector(state => state.sidebar)
//     const { categoryList } = useSelector((state) => state.product_data);




//     const categoriesImages = [
//         { 'Organic-Honey': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Organic-Honey.png' },
//         { 'Authentic-Pickles': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Authentic-Pickles.png' },
//         { 'Chutney-&-Dip': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Chutney%26Dip.png' },
//         { 'Fruit-Preserves': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Fruit-Preserves.png' },
//         { 'Seasonings-&-Herbs': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Seasonings%26Herbs.png' },
//         { 'Organic-Tea': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Organic-Tea.png' },
//         { Salt: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Salt.png' },
//         { Sweetners: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Sweetners.png' },
//         { 'Organic-Oils': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Organic-Oils.png' },
//         { Oats: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Oats.png' },
//         { Vegan: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Vegan.png' },
//         { 'Breakfast-Cereals': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Breakfast-Cereals.png' },
//         { Combo: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Combo.png' },
//     ]


//     const imageLookup = categoriesImages.reduce((acc, obj) => {
//         const [key, value] = Object.entries(obj)[0];
//         acc[key] = value;
//         return acc;
//     }, {});

//     // Step 2: Map categories to include the corresponding image
//     const categoryListWithImg = categoryList?.filter(curItem => curItem.category !== 'All')?.map(curItem => ({
//         categoryUrl: curItem.categoryUrl,
//         category: curItem.category,
//         image: imageLookup[curItem.categoryUrl] || null // Fallback to null if no image found
//     }));



//     // below code is to disable the background while showing menu in the mobile devices 
//     useEffect(() => {
//         if (showSidebar) {
//             document.body.style.overflow = 'hidden';
//         }
//         else {
//             document.body.style.overflow = 'auto';
//         }


//     }, [showSidebar]);


//     return (
//         <>
//             <nav className='flex order-last md:-order-none text-[var(--themeColor)] '>

//                 {/* menu button */}
//                 <div className='md:hidden'>
//                     <button
//                         type='button'
//                         aria-label="Open Menu"
//                         onClick={() => dispatch(setShowSidebar())}
//                     >
//                         <RiMenu3Fill className='text-2xl ' />
//                     </button>
//                 </div>

//                 {/* navbar items */}

//                 <ul className='  hidden md:flex justify-center items-center lg:gap-1  font-medium'>
//                     <li>
//                         <NavLink to="/" className={({ isActive }) => `cursor-pointer lg:p-4 min-w-[86px] rounded-md hover:underline hover:underline-offset-4 flex flex-col justify-center items-center ${isActive ? ' underline underline-offset-4' : null} `}>
//                             <MdOutlineHome className=' text-xl' />
//                             <span>Home</span>
//                         </NavLink>
//                     </li>
//                     <li className='shop' >
//                         <NavLink
//                             to="/shop/all"
//                             onClick={() => dispatch(setCategoryBtnValue('all'))}
//                             className={({ isActive }) => `cursor-pointer lg:p-4 min-w-[86px] rounded-md hover:underline hover:underline-offset-4 flex flex-col justify-center items-center ${isActive ? 'underline underline-offset-4' : null} `}

//                         >
//                             <RiShoppingBasketFill className=' text-xl' />
//                             <span className='flex justify-center items-center'>
//                                 Shop <MdKeyboardArrowDown className=' text-[18px] mt-[3px]' />
//                             </span>
//                         </NavLink>

//                         {/* dropdown menu start */}
//                         <div className='dropDown  absolute lg:right-44 right-24 lg:w-[60%] w-[80%] md:top-[84%] lg:top-[84%] flex  flex-wrap items-start justify-between overflow-hidden shadow-lg'>

//                             <ul className={`z-50 flex flex-wrap items-start justify-between bg-[var(--bgColorSecondary)] text-[var(--bgColorPrimary)]  pt-4 pb-6 font-semibold`}>
//                                 {categoryListWithImg.map((curItem) => (
//                                     <li key={curItem.category} className='cursor-pointer w-1/6  hover:text-yellow-600 xl:p-4 px-2  py-4'>
//                                         <Link to={`/shop/${curItem?.categoryUrl?.toLowerCase()}`} className='flex flex-col justify-center items-center' onClick={() => {
//                                             // setShowDropDownMenu(false)
//                                             dispatch(setCurrentPage(1))
//                                             dispatch(setCategoryBtnValue(curItem.categoryUrl))
//                                             dispatch(fetchCategoryWiseData(curItem.categoryUrl.toLowerCase()))

//                                         }}>
//                                             <img src={curItem.image} alt="authentic-pickel" className='lg:lg:w-20 w-16' />
//                                             <span className=' text-center text-sm '>{curItem.category}</span>
//                                         </Link>
//                                     </li>
//                                 ))}

//                             </ul>

//                         </div>

//                         {/* dropdown menu end */}

//                     </li>

//                     <li>
//                         <NavLink
//                             to={`/shop/${'combo'}`}
//                             onClick={() => {
//                                 dispatch(setCurrentPage(1))
//                                 dispatch(setCategoryBtnValue('combo'))
//                                 dispatch(fetchCategoryWiseData('combo'))
//                             }}
//                             className={({ isActive }) => ` cursor-pointer lg:p-4 min-w-[86px] rounded-md hover:underline hover:underline-offset-4 flex flex-col items-center ${isActive ? 'underline underline-offset-4' : null} `}

//                         >
//                             <LiaGiftsSolid className=' text-2xl' />
//                             <span className='text-center'>Combo</span>
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="contact-us" className={({ isActive }) => `cursor-pointer lg:p-4 min-w-[86px] rounded-md hover:underline hover:underline-offset-4 flex flex-col justify-center items-center ${isActive ? 'underline underline-offset-4' : null} `}>
//                             <TbPhoneCall className='text-xl' />
//                             <span className='text-center'>Contact Us</span>
//                         </NavLink>
//                     </li>

//                 </ul>
//             </nav>



//             {/* ===================================== mobile menu  starts here ================================= */}



//             <nav id='mobileMenu' className={`mobile-menu-container ${showSidebar ? 'active' : ''}  `} >
//                 <div className={`mobile-menu min-h-full xs:w-1/2 w-2/3 ${showDropDownMenu && 'w-full'} ${showSidebar ? 'active' : ''}`}>

//                     <div className='p-4 max-w-min' onClick={() => dispatch(setShowSidebar())}>
//                         <Logo />
//                     </div>

//                     {/* close button  */}
//                     <div className='md:hidden px-4 text-end'>
//                         <button type='button'
//                             className='shadow-md rounded-full shadow-green-700 hover:scale-110 text-[#ffe9a1]'
//                             onClick={() => {
//                                 dispatch(setShowSidebar());
//                                 setShowDropDownMenu(false);
//                             }}><IoCloseSharp className='text-4xl' /></button>

//                     </div>

//                     <ul className=' md:flex justify-center items-center md:gap-4 text-[var(--titleTextColor)] font-mono'>
//                         {/* <li className='cursor-pointer p-4 rounded-md '>
//                             <Search mobileMenu={true} />
//                         </li> */}

//                         <li className='cursor-pointer  rounded-md text-[#ffe9a1] hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)]'>
//                             <Link
//                                 to="/"
//                                 onClick={() => dispatch(setShowSidebar())}
//                                 className='flex text-xl gap-3 justify-start items-center p-4'
//                             >
//                                 <MdOutlineHome className=' text' />
//                                 <span>Home</span>
//                             </Link>
//                         </li>

//                         <li className=' cursor-pointer relative rounded-md text-[#ffe9a1] hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)] '>
//                             <div className='flex justify-between items-center'>
//                                 <Link
//                                     to="/shop/all"
//                                     className='w-full flex text-xl gap-3 justify-start items-center p-4'
//                                     onClick={() => {
//                                         dispatch(setCurrentPage(1))
//                                         dispatch(setCategoryBtnValue('all'))
//                                         dispatch(fetchCategoryWiseData('all'))
//                                         dispatch(setShowSidebar())
//                                     }}
//                                 >
//                                     <RiShoppingBasketFill className='text-xl ' />
//                                     <span className='w-full'>
//                                         Shop
//                                     </span>
//                                 </Link>
//                                 <span className={` border-l-2 border-[var(--titleTextColor)]  p-4`} onClick={() => setShowDropDownMenu((prev) => !prev)}><BsChevronDown className={`${showDropDownMenu && 'rotate-180'} transition-all duration-500`} /></span>
//                             </div>

//                             {/* mobile dropdown menu start */}

//                             {showDropDownMenu && (
//                                 <ul className={`flex translate-y-6  text-[var(--titleTextColor)] h-full w-full  items-center flex-wrap justify-center gap-x-5 gap-y-9 pb-10  mx-auto overflow-y-auto`}>
//                                     {categoryListWithImg.map((curItem, index) => (
//                                         <li key={index} className='w-[40%] cursor-pointer hover:text-orange-500  transition-all duration-300'>
//                                             <Link to={`/shop/${curItem.categoryUrl.toLowerCase()}`} className='flex flex-col gap-3 justify-start items-center' onClick={() => {
//                                                 setShowDropDownMenu(false)
//                                                 dispatch(setCurrentPage(1))
//                                                 dispatch(setCategoryBtnValue(curItem.categoryUrl))
//                                                 dispatch(fetchCategoryWiseData(curItem.categoryUrl.toLowerCase()))
//                                                 dispatch(setShowSidebar())
//                                             }}>
//                                                 <img src={curItem.image} alt="authentic-pickel" className='w-10' />
//                                                 <span className=' text-center text-sm text-[var(--themeColor)] hover:text-orange-500'>{curItem.category}</span>
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}

//                         </li>
//                         <li className='cursor-pointer rounded-md text-[#ffe9a1] hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)]'>
//                             <Link
//                                 to={`/shop/${'combo'}`}
//                                 onClick={() => {
//                                     dispatch(setCurrentPage(1))
//                                     dispatch(setCategoryBtnValue('combo'))
//                                     dispatch(fetchCategoryWiseData('combo'))
//                                     dispatch(setShowSidebar())
//                                 }}
//                                 className='flex text-xl gap-3 justify-start items-center  p-4 '

//                             >
//                                 <LiaGiftsSolid className=' text-2xl' />
//                                 <span className='text-center'>Combo</span>
//                             </Link>
//                         </li>

//                         <li className='cursor-pointer rounded-md text-[#ffe9a1] hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)]'>
//                             <Link
//                                 to="/our-blogs"
//                                 onClick={() => dispatch(setShowSidebar())}
//                                 className='flex text-xl gap-3 justify-start items-center  p-4'
//                             >
//                                 <FaBlog className=' text-xl' />
//                                 <span>Blogs</span>
//                             </Link>
//                         </li>
//                         <li className='cursor-pointer rounded-md text-[#ffe9a1] hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)]'>
//                             <Link
//                                 to="/our-recipes"
//                                 onClick={() => dispatch(setShowSidebar())}
//                                 className='flex text-xl gap-3 justify-start items-center  p-4 '
//                             >
//                                 <LuChefHat />
//                                 <span>Recipe</span>
//                             </Link>
//                         </li>
//                         <li className='cursor-pointer rounded-md text-[#ffe9a1] hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)]'>
//                             <Link to="/contact-us" onClick={() => dispatch(setShowSidebar())} className='flex text-xl gap-3 justify-start items-center  p-4'>
//                                 <TbPhoneCall className=' text-xl' />
//                                 <span>Contact Us</span>
//                             </Link>
//                         </li>
//                         <li className='cursor-pointer rounded-md text-[#ffe9a1] hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)]'>
//                             <Link to="/profile/personal-info" onClick={() => dispatch(setShowSidebar())} className='flex text-xl gap-3 justify-start items-center  p-4'>
//                                 <FaRegUser className=' text-xl' />
//                                 <span> Profile</span>
//                             </Link>
//                         </li>

//                     </ul>
//                 </div>
//             </nav>


//         </>

//     )
// }

// export { NavMenu2 };





// import React, { useEffect, useState, useCallback, memo } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
// import { setCurrentPage } from '../../features/pagination/pagination';
// import { setShowSidebar } from '../../features/toggleSidebar/toggleSidebar';
// import Logo from '../logo/Logo';


// import { MdOutlineHome, MdKeyboardArrowDown } from "react-icons/md";
// import { RiShoppingBasketFill, RiMenu3Fill } from "react-icons/ri";
// import { TbPhoneCall } from "react-icons/tb";
// import { BsChevronDown } from "react-icons/bs";
// import { IoCloseSharp } from "react-icons/io5";
// import { FaBlog } from "react-icons/fa";
// import { LiaGiftsSolid } from "react-icons/lia";
// import { FaRegUser } from "react-icons/fa";
// import { LuChefHat } from "react-icons/lu";




// Constants

const NAV_ITEMS = [
    { path: '/', icon: MdOutlineHome, label: 'Home' },
    { path: '/shop/all', icon: RiShoppingBasketFill, label: 'Shop', hasDropdown: true },
    { path: '/shop/combo', icon: LiaGiftsSolid, label: 'Combo' },
    { path: '/contact-us', icon: TbPhoneCall, label: 'Contact Us' },
    { path: '/our-blogs', icon: FaBlog, label: 'Blogs', mobileOnly: true },
    { path: '/our-recipes', icon: LuChefHat, label: 'Recipe', mobileOnly: true },
    { path: '/profile/personal-info', icon: FaRegUser, label: 'Profile', mobileOnly: true }
];

const CategoryItem = memo(({ category, image, onClick }) => {
    return (
        <div className=" xl:p-4 px-1 py-2 transition-transform hover:scale-105 ">
            <Link
                to={`/shop/${category.toLowerCase()}`}
                className="flex flex-col items-center group"
                onClick={onClick}
            >
                <div className="relative overflow-hidden mb-2 p-4 shadow-2xl rounded-full">
                    <img
                        src={image}
                        alt={category}
                        className="lg:w-16 w-16 transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                    />
                </div>
                <span className="text-sm font-serif text-center group-hover:text-yellow-600 transition-colors">
                    {category}
                </span>
            </Link>
        </div>
    )
});

const MobileMenuItem = memo(({ item, onClick }) => {
    // const [showDropDownMenu, setShowDropDownMenu] = useState(false);

    return (
        <>
            <li className="rounded-md text-[#ffe9a1] hover:bg-[var(--bgColorSecondary)] p-[2px] hover:text-white transition-colors">
                <div className='flex justify-between items-center'>
                    <Link
                        to={item.path}
                        className="flex gap-3 items-center px-4 py-2 bg-gray-700 rounded-lg shadow-sm shadow-white w-full "
                        onClick={onClick}
                    >
                        <item.icon className="text-xl" />
                        <span>{item.label}</span>
                    </Link>
                    {/* {item.label === 'Shop' && (
                        <span
                            className={` border-l-2 border-[var(--titleTextColor)]  p-4`}
                            onClick={() => setShowDropDownMenu((prev) => !prev)}
                        >
                            <BsChevronDown className={`${showDropDownMenu && 'rotate-180'} transition-all duration-500`} />
                        </span>
                    )} */}
                </div >

            </li>

        </>
    )
});

const NavMenu = () => {
    const dispatch = useDispatch();
    const { showSidebar } = useSelector(state => state.sidebar);
    const { categoryList } = useSelector(state => state.product_data);

    const handleCategoryClick = useCallback((category) => {
        dispatch(setCurrentPage(1))
        dispatch(setCategoryBtnValue(category.categoryUrl))
        dispatch(fetchCategoryWiseData(category.categoryUrl.toLowerCase()))
    }, [dispatch]);


    const categoriesImages = [
        { 'Organic-Honey': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Organic-Honey.png' },
        { 'Authentic-Pickles': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Authentic-Pickles.png' },
        { 'Chutney-&-Dip': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Chutney%26Dip.png' },
        { 'Fruit-Preserves': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Fruit-Preserves.png' },
        { 'Seasonings-&-Herbs': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Seasonings%26Herbs.png' },
        { 'Organic-Tea': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Organic-Tea.png' },
        { Salt: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Salt.png' },
        { Sweetners: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Sweetners.png' },
        { 'Organic-Oils': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Organic-Oils.png' },
        { Oats: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Oats.png' },
        { Vegan: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Vegan.png' },
        { 'Breakfast-Cereals': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Breakfast-Cereals.png' },
        { Combo: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Combo.png' },
    ]

    const imageLookup = categoriesImages.reduce((acc, obj) => {
        const [key, value] = Object.entries(obj)[0];
        acc[key] = value;
        return acc;
    }, {});

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = showSidebar ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showSidebar]);

    const filteredCategories = categoryList?.filter(item => item.category !== 'All')
        .map(item => ({
            ...item,
            image: imageLookup[item.categoryUrl] || null
        }));

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="flex order-last md:-order-none text-[var(--themeColor)]">
                <button
                    type="button"
                    className="md:hidden"
                    aria-label="Toggle Menu"
                    onClick={() => dispatch(setShowSidebar())}
                >
                    <RiMenu3Fill className="text-2xl" />
                </button>

                <ul className="hidden md:flex items-center lg:gap-1 font-medium">
                    {NAV_ITEMS.filter(item => !item.mobileOnly).map(item => (
                        <li key={item.path} className={`${item.label==='Shop' && 'shop'}`}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `flex flex-col items-center lg:p-4 min-w-[86px] rounded-md hover:underline hover:underline-offset-4 transition-all  ${isActive ? 'underline underline-offset-4' : ''}`}
                                onClick={() => {
                                    if (item.label === 'Shop') {
                                        dispatch(setCategoryBtnValue('all'))
                                    } else if (item.label === 'Combo') {
                                        dispatch(setCurrentPage(1))
                                        dispatch(setCategoryBtnValue('combo'))
                                        dispatch(fetchCategoryWiseData('combo'))
                                    }
                                }}
                            >
                                <item.icon className="text-xl" />
                                <span className="flex items-center">
                                    {item.label}
                                    {item.hasDropdown && <MdKeyboardArrowDown className="mt-[3px] text-[18px]" />}
                                </span>
                            </NavLink>

                            {item.hasDropdown && (
                                <div className="dropDown absolute lg:right-44 right-24 lg:w-[60%] w-[80%] md:top-[84%] shadow-xl rounded-lg overflow-hidden">
                                    <div className="grid grid-cols-7 gap-x-3 bg-[var(--bgColorSecondary)] p-2">
                                        {filteredCategories.map(category => (
                                            <CategoryItem
                                                key={category.categoryUrl}
                                                category={category.category}
                                                image={category.image}
                                                onClick={() => handleCategoryClick(category)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Navigation */}
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity z-50 ${showSidebar ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => dispatch(setShowSidebar(false))}
            >
                <div
                    className={`absolute left-0 top-0 h-full w-[280px] bg-[var(--bgColorPrimary)] transform transition-transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-4">
                        <Logo />
                        <button
                            type="button"
                            className="rounded-full p-2 text-[#ffe9a1] hover:bg-gray-700 transition-colors"
                            onClick={() => dispatch(setShowSidebar(false))}
                        >
                            <IoCloseSharp className="text-3xl" />
                        </button>
                    </div>

                    <ul className="space-y-2 p-4">
                        {NAV_ITEMS.map(item => (
                            <MobileMenuItem
                                key={item.path}
                                item={item}
                                onClick={() => {
                                    dispatch(setShowSidebar(false));
                                    if (item.label === 'Shop') {
                                        dispatch(setCurrentPage(1))
                                        dispatch(setCategoryBtnValue('all'))
                                        dispatch(fetchCategoryWiseData('all'))
                                    }else if(item.label==='Combo'){
                                        dispatch(setCurrentPage(1))
                                        dispatch(setCategoryBtnValue('combo'))
                                        dispatch(fetchCategoryWiseData('combo'))
                                    }
                                }}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default memo(NavMenu);