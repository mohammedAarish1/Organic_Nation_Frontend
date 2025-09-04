import React, { useCallback, useEffect, useRef, memo, lazy, Suspense } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserOrders, resetCheckoutStatus } from '../../features/manageOrders/manageOrders';
import { clearLocalCart, getAllCartItems } from '../../features/cart/cart';
import { logout } from '../../features/auth/auth';
import { toast } from 'react-toastify';

// Icons
import Loader from '../common/Loader';
import { LogIn, ShoppingCart, User } from 'lucide-react';


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
    {/* <div className="relative transition-transform group-hover:scale-105">
      <BsCart className="text-3xl" />
      <span className="absolute -top-1 -right-2 bg-yellow-400 text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {totalCartItems}
      </span>
    </div>
    <span>Cart</span> */}
    <button className="text-[#3E2C1B] hover:text-[#9B7A2F] relative">
      <ShoppingCart size={20} />
      <span className="absolute -top-2 -right-2 bg-[#D87C45] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {totalCartItems}
      </span>
    </button>
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
      <ul className="flex justify-center items-center sm:gap-3 gap-2 font-medium">
       

        {user && !user_loading ? (
          <li className="relative">
            {/* <button
              className="flex flex-col items-center sm:p-3 p-1 hover:opacity-80 transition-opacity"
              onClick={() => setShowUserMenu(prev => !prev)}
              aria-expanded={showUserMenu}
              aria-label="User menu"
            >
              <FaUserCircle className="text-2xl" />
              <span className='flex gap-[1px] justify-end items-end'>{user.fullName || 'You'}<IoIosArrowDown className='mb-[3px] text-sm' /></span>
            </button> */}

            <button
              className="text-[#3E2C1B] hover:text-[#9B7A2F]"
              onClick={() => setShowUserMenu(prev => !prev)}
              aria-expanded={showUserMenu}
              aria-label="User menu"
            >
              <User size={20} className='mt-1' />
            </button>

            <Suspense fallback={<Loader height='10px' />}>
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
              // className={({ isActive }) => `
              //   flex flex-col items-center sm:p-4 p-1 
              //   hover:underline hover:underline-offset-4
              //   ${isActive ? 'underline underline-offset-4' : ''}
              // `}
              className="text-[#3E2C1B] hover:text-[#9B7A2F]"

            >
              {/* <IoMdLogIn className="text-2xl" /> */}
              <LogIn size={20} />
              {/* <span>Login</span> */}
            </NavLink>
          </li>
        )}

         <li>
          <CartButton totalCartItems={totalCartItems} />
        </li>
      </ul>
    </nav>
  );
};

export default memo(OtherNavItems);

