import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { Suspense, useEffect, memo } from 'react';
import './App.css';
//======== tostify =======
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// animation
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  Header,
  Footer,
   Info,
  Breadcrumbs,
  WhatsApp,
  ScrollToTop,
  // getAllCartItems,
  // getAllBlogs,
  // getAllRecipes,
  getAllOrders,
} from './imports';


import getRoutes from './routes/routes';
import AdminRoutes from './routes/AdminRoutes';
import AdminLogin from './pages/admin/AdminLogin';
import { checkAuthStatus } from './features/auth/auth';
// import RecentOrderNotification from './components/recent-order-notification/RecentOrderNotification ';
import { getProductsData } from './features/filter/filterSlice';
import { CartNotificationProvider } from './context/CartNotificationContext';
import CartNotification from './components/module/cart/CartNotification';
import DiscountProgress from './components/common/DiscountProgress';

// Memoized components

const MainContent = memo(() => {
  return (
    <div className="bg-[var(--bgColorSecondary)] relative">
      <Info text="Free shipping on orders over Rs. 199/- | Order over Rs. 499 and get Flat 20% OFF" fontSize='[10px]' />
      <ToastContainer position='top-right' autoClose={1000} />
      <Header />
      <DiscountProgress/>
      <div>
        <Breadcrumbs />
        <Suspense fallback={
          <div className='py-52 flex justify-center items-center'>
            <div className="loader"></div>
          </div>
        }>
          <Routes>
            {getRoutes()}
          </Routes>
        </Suspense>
        <Footer />
        <div className='max-w-max fixed xs:bottom-10 bottom-5 xs:right-10 right-5 z-50'>
          <WhatsApp />
        </div>
      </div>
      {/* <Info text="Organic Nation © All rights reserved." fontSize='xs' /> */}
    </div>
  );
});

MainContent.displayName = 'MainContent';

function App() {
  const { isAdminLoggedIn } = useSelector(state => state.admin)


  // const {token} =useSelector(state=>state.auth)
  const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));

  const dispatch = useDispatch();


  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      dispatch(getProductsData());
      // dispatch(getAllCartItems());
      // dispatch(getAllBlogs());
      // dispatch(getAllRecipes());
      dispatch(getAllOrders());
      dispatch(checkAuthStatus())
    }

    fetchInitialData();
  }, [dispatch]);




  return (
     <CartNotificationProvider>
    <BrowserRouter>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/*" element={
          isAdminLoggedIn || adminToken ? <AdminRoutes /> : <AdminLogin />
        } />

        {/* Normal routes */}
        <Route path="*" element={
          <>
            <ScrollToTop />
            <MainContent />
            <CartNotification />
            {/* <RecentOrderNotification /> */}
          </>
        } />
      </Routes>
    </BrowserRouter>
    </CartNotificationProvider>
  )
}

export default App;
