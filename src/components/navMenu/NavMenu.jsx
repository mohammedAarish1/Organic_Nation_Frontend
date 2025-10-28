// import React, { memo, useCallback, useEffect, useState } from 'react'
// import { Link, NavLink } from 'react-router-dom';
// import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
// import { setCurrentPage } from '../../features/pagination/pagination';
// import { useDispatch, useSelector } from 'react-redux';
// import { setShowSidebar } from '../../features/toggleSidebar/toggleSidebar';
// import Logo from '../logo/Logo';
// // react icons 


// const NAV_ITEMS = [
//     { path: '/', icon: MdOutlineHome, label: 'Home' },
//     { path: '/shop/all', icon: RiShoppingBasketFill, label: 'Shop', hasDropdown: true },
//     { path: '/shop/combo', icon: LiaGiftsSolid, label: 'Combo' },
//     { path: '/contact-us', icon: TbPhoneCall, label: 'Contact Us' },
//     { path: '/our-blogs', icon: FaBlog, label: 'Blogs', mobileOnly: true },
//     { path: '/our-recipes', icon: LuChefHat, label: 'Recipe', mobileOnly: true },
//     { path: '/profile/personal-info', icon: FaRegUser, label: 'Profile', mobileOnly: true }
// ];

// const CategoryItem = memo(({ category,  onClick }) => {
//     return (
//         <div className=" xl:p-4 px-1 py-2 transition-transform hover:scale-105 ">
//             <Link
//                 to={`/shop/${category.categoryUrl.toLowerCase()}`}
//                 className="flex flex-col items-center group"
//                 // onClick={onClick}
//             >
//                 <div className="relative overflow-hidden mb-2 p-4 shadow-2xl rounded-full">
//                     <img
//                         src={category.image}
//                         alt={category.categoryUrl}
//                         className="lg:w-16 w-16 transition-transform duration-300 group-hover:scale-110"
//                         loading="lazy"
//                     />
//                 </div>
//                 <span className="text-sm font-serif text-center group-hover:text-yellow-600 transition-colors">
//                     {category.category}
//                 </span>
//             </Link>
//         </div>
//     )
// });

// const MobileMenuItem = memo(({ item, onClick }) => {
//     // const [showDropDownMenu, setShowDropDownMenu] = useState(false);

//     return (
//         <>
//             <li className="rounded-md text-[#ffe9a1] hover:bg-[var(--background-color)] p-[2px] hover:text-white transition-colors">
//                 <div className='flex justify-between items-center'>
//                     <Link
//                         to={item.path}
//                         className="flex gap-3 items-center px-4 py-2 bg-gray-700 rounded-lg shadow-sm shadow-white w-full "
//                         onClick={onClick}
//                     >
//                         <item.icon className="text-xl" />
//                         <span>{item.label}</span>
//                     </Link>
//                     {/* {item.label === 'Shop' && (
//                         <span
//                             className={` border-l-2 border-[var(--text-color)]  p-4`}
//                             onClick={() => setShowDropDownMenu((prev) => !prev)}
//                         >
//                             <BsChevronDown className={`${showDropDownMenu && 'rotate-180'} transition-all duration-500`} />
//                         </span>
//                     )} */}
//                 </div >

//             </li>

//         </>
//     )
// });

// const NavMenu = () => {
//     const dispatch = useDispatch();
//     const { showSidebar } = useSelector(state => state.sidebar);
//     const { categoryList } = useSelector(state => state.filterData);

//     // const handleCategoryClick = useCallback((category) => {
//     //     dispatch(setCurrentPage(1))
//     //     dispatch(setCategoryBtnValue(category.categoryUrl))
//     //     dispatch(fetchCategoryWiseData(category.categoryUrl.toLowerCase()))
//     // }, [dispatch]);


//     const categoriesImages = [
//         { 'Organic-Honey': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Organic-Honey.png' },
//         { 'Homestyle-Pickles': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Authentic-Pickles.png' },
//         { 'Chutney-&-Dip': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Chutney%26Dip.png' },
//         { 'Fruit-Preserves': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Fruit-Preserves.png' },
//         { 'Seasonings-&-Herbs': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Seasonings%26Herbs.png' },
//         { 'Organic-Tea': 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Organic-Tea.png' },
//         { Salt: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Salt.png' },
//         { Sweeteners: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/shop_menu_categories/Sweetners.png' },
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

//     // Lock body scroll when mobile menu is open
//     useEffect(() => {
//         document.body.style.overflow = showSidebar ? 'hidden' : 'auto';
//         return () => {
//             document.body.style.overflow = 'auto';
//         };
//     }, [showSidebar]);

//     const filteredCategories = categoryList?.filter(item => item.category !== 'All')
//         .map(item => ({
//             ...item,
//             image: imageLookup[item.categoryUrl] || null
//         }));

//     return (
//         <>
//             {/* Desktop Navigation */}
//             <nav className="flex order-last md:-order-none text-[var(--themeColor)]">
//                 <button
//                     type="button"
//                     className="md:hidden"
//                     aria-label="Toggle Menu"
//                     onClick={() => dispatch(setShowSidebar())}
//                 >
//                     <RiMenu3Fill className="text-2xl" />
//                 </button>

//                 <ul className="hidden md:flex items-center lg:gap-1 font-medium">
//                     {NAV_ITEMS.filter(item => !item.mobileOnly).map(item => (
//                         <li key={item.path} className={`${item.label==='Shop' && 'shop'}`}>
//                             <NavLink
//                                 to={item.path}
//                                 className={({ isActive }) => `flex flex-col items-center lg:p-4 min-w-[86px] rounded-md hover:underline hover:underline-offset-4 transition-all  ${isActive ? 'underline underline-offset-4' : ''}`}
//                                 // onClick={() => {
//                                 //     if (item.label === 'Shop') {
//                                 //         dispatch(setCategoryBtnValue('all'))
//                                 //     } else if (item.label === 'Combo') {
//                                 //         dispatch(setCurrentPage(1))
//                                 //         dispatch(setCategoryBtnValue('combo'))
//                                 //         dispatch(fetchCategoryWiseData('combo'))
//                                 //     }
//                                 // }}
//                             >
//                                 <item.icon className="text-xl" />
//                                 <span className="flex items-center">
//                                     {item.label}
//                                     {item.hasDropdown && <MdKeyboardArrowDown className="mt-[3px] text-[18px]" />}
//                                 </span>
//                             </NavLink>

//                             {item.hasDropdown && (
//                                 <div className="dropDown absolute lg:right-44 right-24 lg:w-[60%] w-[80%] md:top-[84%] shadow-xl rounded-lg overflow-hidden">
//                                     <div className="grid grid-cols-7 gap-x-3 bg-[var(--background-color)] p-2">

//                                         {filteredCategories.map(category => (
//                                             <CategoryItem
//                                                 key={category.categoryUrl}
//                                                 category={category}
//                                                 // image={category.image}
//                                                 // onClick={() => handleCategoryClick(category)}
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </nav>

//             {/* Mobile Navigation */}
//             <div
//                 className={`fixed inset-0 bg-black/50 transition-opacity z-50 ${showSidebar ? 'opacity-100 visible' : 'opacity-0 invisible'
//                     }`}
//                 onClick={() => dispatch(setShowSidebar(false))}
//             >
//                 <div
//                     className={`absolute left-0 top-0 h-full w-[280px] bg-[var(--background-color)] transform transition-transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'
//                         }`}
//                     onClick={e => e.stopPropagation()}
//                 >
//                     <div className="flex items-center justify-between p-4">
//                         <Logo />
//                         <button
//                             type="button"
//                             className="rounded-full p-2 text-[#ffe9a1] hover:bg-gray-700 transition-colors"
//                             onClick={() => dispatch(setShowSidebar(false))}
//                         >
//                             <IoCloseSharp className="text-3xl" />
//                         </button>
//                     </div>

//                     <ul className="space-y-2 p-4">
//                         {NAV_ITEMS.map(item => (
//                             <MobileMenuItem
//                                 key={item.path}
//                                 item={item}
//                                 onClick={() => {dispatch(setShowSidebar(false))}}
//                             />
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default memo(NavMenu);


import  { memo,  useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
// import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
// import { setCurrentPage } from '../../features/pagination/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSidebar } from '../../features/toggleSidebar/toggleSidebar';
import Logo from '../logo/Logo';
// react icons 
import { motion, AnimatePresence } from 'framer-motion';
// import CloseButton from '../button/CloseButton';
import { getCatogoriesWithImages } from '../../helper/helperFunctions';
import { ALargeSmall, ArrowDown,  ArrowRight, ChevronDown, CookingPot, Gift, History, Home, Leaf, Menu, PhoneCall, PhoneCallIcon, ShoppingBasket, User } from 'lucide-react';

const NAV_ITEMS = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/shop/all', icon: ShoppingBasket, label: 'Shop', hasDropdown: true },
    { path: '/shop/gifts-&-combos', icon: Gift, label: 'Gifts & Combos', },
    { path: '/manage-orders', icon: History , label: 'Order History' },
    // { path: '/about-us', icon: LiaGiftsSolid, label: 'About us' },
    { path: '/contact-us', icon: PhoneCall, label: 'Contact Us' },
    { path: '/our-blogs', icon: ALargeSmall, label: 'Blogs', mobileOnly: true },
    { path: '/our-recipes', icon: CookingPot, label: 'Recipe', mobileOnly: true },
    { path: '/profile/personal-info', icon: User, label: 'Profile', mobileOnly: true }
];

const CategoryItem = memo(({ category, onClick }) => {
    return (
        <motion.div
            className="xl:p-4 px-1 py-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Link
                to={`/shop/${category.categoryUrl.toLowerCase()}`}
                className="flex flex-col items-center group"
            >
                <motion.div
                    className="relative overflow-hidden mb-2 p-4 shadow-lg rounded-full bg-[var(--background-color)]"
                    whileHover={{
                        boxShadow: "0 8px 20px rgba(155, 122, 47, 0.3)",
                    }}
                >
                    <motion.img
                        src={category.image}
                        alt={category.categoryUrl}
                        className="lg:w-16 w-16"
                        loading="lazy"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                </motion.div>
                <span className="text-sm font-serif text-center group-hover:text-[var(--accent-color)] transition-colors">
                    {category.category}
                </span>
            </Link>
        </motion.div>
    )
});

const MobileMenuItem = memo(({ item, onClick, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.li
            className="overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <motion.div
                className="flex justify-between items-center mb-2 rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Link
                    to={item.path}
                    className="flex gap-3 items-center px-4 py-3 bg-gradient-to-r from-[#7A2E1D] to-[#8a3e2d] rounded-xl w-full shadow-md"
                    onClick={onClick}
                >
                    <motion.div
                        className="p-2 bg-[rgba(255,255,255,0.15)] rounded-lg"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                    >
                        <item.icon className="text-xl text-[#ffe9a1]" />
                    </motion.div>
                    <span className="text-[#ffe9a1] font-medium">{item.label}</span>

                    {item.hasDropdown && (
                        <motion.div
                            className="ml-auto"
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsOpen(!isOpen);
                            }}
                        >
                            <ArrowDown size={20} className="text-[#ffe9a1]" />
                        </motion.div>
                    )}
                </Link>
            </motion.div>

            {item.hasDropdown && isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pl-8 pr-2 mb-3"
                >
                    <div className="border-l-2 border-[var(--accent-color)] pl-4 space-y-2 py-2">
                        <Link
                            to="/shop/all"
                            className="block py-2 px-3 rounded-lg text-[var(--text-color)] hover:bg-[var(--neutral-color)] transition-colors"
                            onClick={onClick}
                        >
                            All Products
                        </Link>
                        <Link
                            to="/shop/organic-honey"
                            className="block py-2 px-3 rounded-lg text-[var(--text-color)] hover:bg-[var(--neutral-color)] transition-colors"
                            onClick={onClick}
                        >
                            Organic Honey
                        </Link>
                        <Link
                            to="/shop/homestyle-pickles"
                            className="block py-2 px-3 rounded-lg text-[var(--text-color)] hover:bg-[var(--neutral-color)] transition-colors"
                            onClick={onClick}
                        >
                            Homestyle Pickles
                        </Link>
                        <Link
                            to="/shop/organic-oils"
                            className="block py-2 px-3 rounded-lg text-[var(--text-color)] hover:bg-[var(--neutral-color)] transition-colors"
                            onClick={onClick}
                        >
                            Organic Oils
                        </Link>
                        <Link
                            to="/shop/all"
                            className="flex items-center gap-2 py-2 px-3 rounded-lg text-[var(--secondary-color)] hover:bg-[var(--neutral-color)] transition-colors font-medium"
                            onClick={onClick}
                        >
                            View All Categories <ArrowRight size={20}/>
                        </Link>
                    </div>
                </motion.div>
            )}
        </motion.li>
    )
});

const NavMenu = () => {
    const dispatch = useDispatch();
    const { showSidebar } = useSelector(state => state.sidebar);
    const { categoryList } = useSelector(state => state.filterData);


    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = showSidebar ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showSidebar]);

    const categoriesImages = getCatogoriesWithImages(categoryList)

    // Sidebar animation variants
    const sidebarVariants = {
        hidden: { x: "-100%" },
        visible: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 250,
                damping: 25,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            x: "-100%",
            transition: {
                ease: "easeInOut",
                duration: 0.3,
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    // Overlay animation variants
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    // Header animation for mobile menu
    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.2, duration: 0.5 }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="flex order-last md:-order-none ">
                <motion.button
                    type="button"
                    className="md:hidden flex items-center justify-center h-10 w-10 rounded-full "
                    aria-label="Toggle Menu"
                    onClick={() => dispatch(setShowSidebar())}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Menu size={20} />
                </motion.button>

                <ul className="hidden md:flex items-center lg:gap-1 font-medium text-[var(--themeColor)]">
                    {NAV_ITEMS.filter(item => !item.mobileOnly).map(item => (
                        <li key={item.path} className={`${item.label === 'Shop' && 'shop'}`}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `flex flex-col items-center lg:p-4 min-w-[86px] rounded-md hover:underline hover:underline-offset-4 transition-all ${isActive ? 'underline underline-offset-4' : ''}`}
                            >
                                {/* <item.icon className="text-xl" /> */}
                                <span className="flex items-center">
                                    {item.label}
                                    {item.hasDropdown && <ChevronDown size={20} className="mt-[3px]" />}
                                </span>
                            </NavLink>

                            {item.hasDropdown && (
                                <div className="dropDown absolute lg:right-44 right-24 lg:w-[60%] w-[80%] md:top-[84%] shadow-xl rounded-lg overflow-hidden">
                                    <div className="grid grid-cols-7 gap-x-3 bg-[var(--background-color)] p-2">
                                        {categoriesImages.map(category => (
                                            <CategoryItem
                                                key={category.categoryUrl}
                                                category={category}
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
            <AnimatePresence>
                {showSidebar && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
                        onClick={() => dispatch(setShowSidebar(false))}
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div
                        id='mobile-menu'
                            className="absolute left-0 top-0 h-full w-[300px] bg-gradient-to-br from-[var(--background-color)] to-[var(--neutral-color)] rounded-r-3xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                            variants={sidebarVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[var(--accent-color)]/10 -mr-16 -mt-16"></div>
                            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-[var(--secondary-color)]/10 -ml-20 -mb-20"></div>

                            <motion.div
                                className="flex items-center justify-between p-4 border-b border-[var(--neutral-color)]"
                                variants={headerVariants}
                            >
                                <div className="flex items-center gap-2">
                                    <Leaf className="text-[var(--secondary-color)] text-xl" />
                                    <Logo />
                                </div>
                                {/* <CloseButton action={() => dispatch(setShowSidebar(false))} /> */}
                            </motion.div>

                            <div className="p-5 h-[calc(100%-70px)] overflow-y-auto custom-scrollbar">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-6"
                                >
                                    <h3 className="text-[var(--text-color)] opacity-70 text-sm uppercase tracking-wider font-medium mb-1">Menu</h3>
                                    <div className="h-1 w-10 bg-[var(--accent-color)] rounded-full"></div>
                                </motion.div>

                                <ul className="space-y-3">
                                    {NAV_ITEMS.map((item, index) => (
                                        <MobileMenuItem
                                            key={item.path}
                                            item={item}
                                            onClick={() => { dispatch(setShowSidebar(false)) }}
                                            index={index}
                                        />
                                    ))}
                                </ul>

                                <motion.div
                                    className="mt-8 p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-md"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <h4 className="font-serif text-[var(--themeColor)] mb-2">Need Help?</h4>
                                    <p className="text-sm text-[var(--text-color)] mb-3">Contact our customer support team</p>
                                    <Link
                                        to="/contact-us"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary-color)] text-white rounded-lg font-medium text-sm hover:bg-[var(--themeColor)] transition-colors"
                                        onClick={() => dispatch(setShowSidebar(false))}
                                    >
                                        <PhoneCallIcon size={16} /> Contact Us
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default memo(NavMenu);