import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { Suspense, useEffect ,memo} from 'react';
import './App.css';
//======== tostify =======
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// animation
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  Header, Footer, Info, Breadcrumbs, WhatsApp, ScrollToTop, getProductsData, getAllCartItems, getAllBlogs, getAllRecipes,  getAllOrders,
} from './imports';


import getRoutes from './routes/routes';
import AdminRoutes from './routes/AdminRoutes';
import AdminLogin from './pages/admin/AdminLogin';
import { checkAuthStatus } from './features/auth/auth';
import RecentOrderNotification from './components/recent-order-notification/RecentOrderNotification ';

// Memoized components
const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);
const MemoizedInfo = memo(Info);
const MemoizedBreadcrumbs = memo(Breadcrumbs);
const MemoizedWhatsApp = memo(WhatsApp);

const MainContent = memo(() => {
  return (
    <div className="bg-[var(--bgColorSecondary)] relative">
      <MemoizedInfo text="Enjoy FREE SHIPPING on orders of Rs. 499 or more — Shop now and save!" fontSize='xl' />
      <ToastContainer position='bottom-right' autoClose={1000} />
      <MemoizedHeader />
      <div>
        <MemoizedBreadcrumbs />
        <Suspense fallback={
          <div className='py-52 flex justify-center items-center'>
            <div className="loader"></div>
          </div>
        }>
          <Routes>
            {getRoutes()}
          </Routes>
        </Suspense>
        <MemoizedFooter />
        <div className='max-w-max fixed xs:bottom-10 bottom-5 xs:right-10 right-5 z-50'>
          <MemoizedWhatsApp />
        </div>
      </div>
      <MemoizedInfo text="Organic Nation © All rights reserved." fontSize='xs' />
    </div>
  );
});

MainContent.displayName = 'MainContent';

function App() {

  const { isAdminLoggedIn } = useSelector(state => state.admin)

  // animation initialization 
  // AOS.init();

  const {token} =useSelector(state=>state.auth)
  const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));

  const dispatch = useDispatch();
  // const { totalOrders, loading, ordersByStatus } = useSelector(state => state.adminData)


  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      dispatch(getProductsData());
      dispatch(getAllCartItems());
      dispatch(getAllBlogs());
      dispatch(getAllRecipes());
      dispatch(getAllOrders());
      // if (token) {
      //   await Promise.all([
      //     // dispatch(fetchAdminData(adminToken)),
          
      //   ]);
      // }
    }

    fetchInitialData();
  }, [token, dispatch]);

useEffect(()=>{
  dispatch(checkAuthStatus())
},[dispatch])


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
             {/* <MemoizedPopupBanner /> */}
            <ScrollToTop />
            <MainContent />
            <RecentOrderNotification/>
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;


  