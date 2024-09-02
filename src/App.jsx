import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { Suspense, useEffect } from 'react';
import './App.css';
//======== tostify =======
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// animation
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  Header, Footer, Info, Breadcrumbs, WhatsApp, ScrollToTop, getProductsData, getAllCartItems, getAllBlogs, getAllRecipes, fetchUserData, getAllOrders,
} from './imports';


import getRoutes from './routes/routes';
import AdminRoutes from './routes/AdminRoutes';
import AdminLogin from './pages/admin/AdminLogin';
import { fetchAdminData } from './features/admin/adminSlice';
import PopupBanner from './components/popup-banner/PopupBanner';




function App() {


  const { isAdminLoggedIn } = useSelector(state => state.admin)

  // animation initialization 
  AOS.init();

  const token = JSON.parse(sessionStorage.getItem('token'));
  const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));

  const dispatch = useDispatch();
  const { totalOrders, loading, ordersByStatus } = useSelector(state => state.adminData)




  useEffect(() => {
    const fetchInitialData = async () => {
      dispatch(getProductsData());
      dispatch(getAllCartItems());
      dispatch(getAllBlogs());
      dispatch(getAllRecipes());
      if (token) {
        await Promise.all([
          dispatch(fetchUserData(token)),
          dispatch(fetchAdminData(adminToken)),
          dispatch(getAllOrders(token))
        ]);
      }
    };

    fetchInitialData();
  }, [token, dispatch]);


  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin/*" element={
          isAdminLoggedIn || adminToken ? <AdminRoutes /> : <AdminLogin />
        } />

        {/* Normal routes */}
        <Route path="*" element={
          <>
            <PopupBanner />
            <ScrollToTop />
            <div className={`bg-[var(--bgColorSecondary)] relative`}>
              <Info text="Enjoy FREE SHIPPING on orders of Rs. 499 or more — Shop now and save!" fontSize='xl' />
              <ToastContainer position='bottom-right' autoClose={1000} />
              <Header />
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
              <Info text="Organic Nation © All rights reserved." fontSize='xs' />
            </div>
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;


  