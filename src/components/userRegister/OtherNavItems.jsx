import React, { useCallback, useEffect, useRef, memo, lazy, Suspense } from 'react';
import {  NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserOrders, resetCheckoutStatus } from '../../features/manageOrders/manageOrders';
import { clearLocalCart, getAllCartItems } from '../../features/cart/cart';
import { logout } from '../../features/auth/auth';
import { toast } from 'react-toastify';
import { IoIosArrowDown } from "react-icons/io";

// Icons
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import Loader from '../common/Loader';


const UserMenu = lazy(() => import('../module/navigation-menu/UserMenu'))

const CartButton = memo(({ totalCartItems }) => (
  <NavLink
    to="cart"
    className={({ isActive }) => `
      group flex flex-col justify-center items-center
      hover:underline hover:underline-offset-4
      ${isActive ? 'underline underline-offset-4' : ''}
    `}
  >
    <div className="relative transition-transform group-hover:scale-105">
      <BsCart className="text-3xl" />
      <span className="absolute -top-1 -right-2 bg-yellow-400 text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {totalCartItems}
      </span>
    </div>
    <span>Cart</span>
  </NavLink>
));




const OtherNavItems = () => {
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { totalCartItems } = useSelector(state => state.cart);
  const { user, user_loading } = useSelector(state => state.auth);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on location change
  useEffect(() => {
    setShowUserMenu(false);
  }, [location]);

  // Fetch cart items when user changes
  useEffect(() => {
    dispatch(getAllCartItems());
  }, [user, dispatch]);

  const handleLogout = useCallback(() => {
    if (user && !user_loading) {
      dispatch(logout());
      dispatch(clearUserOrders());
      dispatch(clearLocalCart());
      dispatch(resetCheckoutStatus(false));
      setShowUserMenu(false);
      toast.success("Successfully logged out!");
      navigate('/');
    }
  }, [dispatch, navigate, user, user_loading]);

  return (
    <nav className="text-[var(--themeColor)]">
      <ul className="flex justify-center items-center sm:gap-4 gap-3 font-medium">
        <li>
          <CartButton totalCartItems={totalCartItems} />
        </li>

        {user && !user_loading ? (
          <li className="relative">
            <button
              className="flex flex-col items-center sm:p-3 p-1 hover:opacity-80 transition-opacity"
              onClick={() => setShowUserMenu(prev => !prev)}
              aria-expanded={showUserMenu}
              aria-label="User menu"
            >
              <FaUserCircle className="text-2xl" />
              <span className='flex gap-[1px] justify-end items-end'>{user.firstName || 'You'}<IoIosArrowDown className='mb-[3px] text-sm' /></span>
            </button>

            <Suspense fallback={<Loader height='10px'/>}>
              <UserMenu
                user={user}
                showMenu={showUserMenu}
                menuRef={menuRef}
                onLogout={handleLogout}
              />
            </Suspense>

          </li>
        ) : (
          <li>
            <NavLink
              to="register"
              className={({ isActive }) => `
                flex flex-col items-center sm:p-4 p-1 
                hover:underline hover:underline-offset-4
                ${isActive ? 'underline underline-offset-4' : ''}
              `}
            >
              <IoMdLogIn className="text-2xl" />
              <span>Login</span>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default memo(OtherNavItems);

