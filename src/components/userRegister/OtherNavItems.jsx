import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserOrders, resetCheckoutStatus } from '../../features/manageOrders/manageOrders';
import { clearLocalCart, getAllCartItems } from '../../features/cart/cart';
import { toast } from 'react-toastify';
// icons  
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { BsCart } from "react-icons/bs";
import { logout } from '../../features/auth/auth';




const OtherNavItems = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { totalCartItems } = useSelector((state) => state.cart)
  const { user, user_loading } = useSelector(state => state.auth);
  const location = useLocation();





  // for closing the user menu when click outside the box 
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuRef]);


  useEffect(() => {
    setShowUserMenu(false);
  }, [location]);

  // handle log out of the user
  const handleLogout = () => {
    if (user && !user_loading) {
      // localStorage.removeItem('cart');
      dispatch(logout());
      dispatch(clearUserOrders());
      dispatch(clearLocalCart());
      // dispatch(getAllCartItems());
      dispatch(resetCheckoutStatus(false));
      setShowUserMenu(false);
      localStorage.removeItem('deliveryChargeToken');
      toast.success("You've been successfully logged out !! ");
      navigate('/')
    }
  }




  return (
    <div className='text-[var(--themeColor)] font-sans'>
      <ul className='flex justify-center items-center sm:gap-4 gap-3 font-medium'>
        {/* cart  */}
        <li className='cursor-pointer hover:underline hover:underline-offset-4'>
          <NavLink
            to="cart"
            className={({ isActive }) => `flex flex-col justify-center items-center ${isActive ? 'underline underline-offset-4' : null}`}
          >
            <div className='relative'>
              <BsCart className='  text-3xl' />
              <span className=' py-1 px-3 text-sm text-[var(--themeColor)] rounded-full absolute top-[0%] '>{totalCartItems}</span>
            </div>
            <span>Cart</span>
          </NavLink>
        </li>
        {/* login  */}
        {user && !user_loading && user.id ? (
          <li className='relative'>
            <div
              className=' cursor-pointer sm:p-3 p-1 flex flex-col justify-center items-center'
              onClick={() => setShowUserMenu(prev => !prev)}
            >
              <FaUserCircle className='text-2xl' />
              <span>{user.firstName || 'You'}</span>
            </div>

            {/* ====================== manage order ===================  */}
            <ul ref={userMenuRef} className={`${showUserMenu ? 'max-h-max translate-y-[0] py-6' : 'max-h-0 overflow-hidden invisible opacity-0 -translate-y-[40px] py-0'} text-[var(--bgColorSecondary)] transition-all duration-700   bg-[var(--bgColorPrimary)] flex flex-col gap-2 absolute right-2  rounded-md shadow-xl min-w-max`}>
              <li className=''>
                <p className='pl-2 pr-20'>Signed in as</p>
                <p className='lowercase text-sm px-2'>{user.email}</p>
                <div className='h-[2px] w-full bg-[var(--bgColorSecondary)] mt-1'></div>
              </li>
              {/* manage order link  */}
              <li className='hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)]  cursor-pointer pl-4   py-1' onClick={() => setShowUserMenu(false)}>
                <Link to="/manage-orders">
                  Manage Orders
                </Link>
              </li>
              {/* manage return link  */}
              <li className='hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)]  cursor-pointer pl-4   py-1' onClick={() => setShowUserMenu(false)}>
                <Link to="/manage-returns">
                  Manage Returns
                </Link>
              </li>
              <li className='hover:bg-[var(--bgColorSecondary)] hover:text-[var(--bgColorPrimary)] cursor-pointer pl-4  py-1' onClick={() => handleLogout()}>Sign out</li>
            </ul>


          </li>
        ) : (

          <li>
            <NavLink to="register" className={({ isActive }) => `cursor-pointer sm:p-4 p-1 rounded-md hover:underline hover:underline-offset-4 flex flex-col justify-center items-center ${isActive ? 'underline underline-offset-4' : null} `}>
              <IoMdLogIn className='text-2xl' />
              <span>Login</span>
            </NavLink>
          </li>
        )}


      </ul>
    </div>
  )
}

export default OtherNavItems;

