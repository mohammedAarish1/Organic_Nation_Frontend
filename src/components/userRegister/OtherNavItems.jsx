import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../features/auth/userSlice';
import { clearUserOrders, resetCheckoutStatus } from '../../features/manageOrders/manageOrders';
import { clearLocalCart, getAllCartItems } from '../../features/cart/cart';
import { toast } from 'react-toastify';
// icons  
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";




const OtherNavItems = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { totalCartItems } = useSelector((state) => state.cart)
  const { user, user_loading} = useSelector(state => state.user);




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




  // handle log out of the user
  const handleLogout = () => {
    if (user && !user_loading) {
      console.log('checking log out button')
      // localStorage.removeItem('cart');
      dispatch(userLogout());
      dispatch(clearUserOrders());
      dispatch(clearLocalCart());
      dispatch(getAllCartItems());
      dispatch(resetCheckoutStatus(false));
      setShowUserMenu(false);
      sessionStorage.removeItem('token');
      localStorage.removeItem('deliveryChargeToken');
      toast.success("You've been successfully logged out !! ");
      navigate('/register')
    }
  }




  return (
    <div className='text-[var(--themeColor)]'>
      <ul className='flex justify-center items-center sm:gap-4 gap-3 font-medium'>
        {/* cart  */}
        <li className='cursor-pointer'>
          <Link to="cart" className='flex flex-col justify-center items-center'>
            <div className='relative'>
              <BsCart4 className='  text-2xl' />
              <span className='bg-[var(--bgColorPrimary)] py-1 px-3 text-sm text-white rounded-full absolute top-[-100%] -right-4'>{totalCartItems || 0}</span>
            </div>
            <span>Cart</span>
          </Link>
        </li>
        {/* login  */}
        {user && !user_loading && user.email ? (
          <li className='relative'>
            <div
              className=' cursor-pointer sm:p-3 p-1 flex flex-col justify-center items-center'
              onClick={() => setShowUserMenu(prev => !prev)}
            >
              <FaUserCircle className='text-2xl' />
              <span>{user.firstName}</span>
            </div>


            <ul ref={userMenuRef} className={`${showUserMenu ? 'max-h-max translate-y-[0] py-2' : 'max-h-0 overflow-hidden invisible opacity-0 -translate-y-[40px] py-0'} text-[var(--titleTextColor)] transition-all duration-700   bg-[var(--hoverEffect)] flex flex-col gap-2 absolute right-2  rounded-md shadow-xl min-w-max`}>
              <li className=''>
                <p className='pl-2 pr-20'>Signed in as</p>
                <p className='lowercase text-sm px-2'>{user.email}</p>
                <div className='h-[2px] w-full bg-[var(--bgColorPrimary)] mt-1'></div>
              </li>
              <li className='hover:bg-[var(--bgColorSecondary)] cursor-pointer pl-4   py-1' onClick={() => setShowUserMenu(false)}>
                <Link to="/manage-orders">
                  Manage Orders
                </Link>
              </li>
              <li className='hover:bg-[var(--bgColorSecondary)] cursor-pointer pl-4  py-1'>Help</li>
              <li className='hover:bg-[var(--bgColorSecondary)] cursor-pointer pl-4  py-1' onClick={() => handleLogout()}>Sign out</li>
            </ul>


          </li>
        ) : (

          <li>
            <NavLink to="register" className={({ isActive }) => `cursor-pointer sm:p-4 p-1 rounded-md hover:bg-[var(--hoverEffect)] flex flex-col justify-center items-center ${isActive ? 'bg-[var(--hoverEffect)]' : null} `}>
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
