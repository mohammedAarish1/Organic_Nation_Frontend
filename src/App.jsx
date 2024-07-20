import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { Suspense, useEffect } from 'react';
import './App.css';
//======== tostify =======
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// animation
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  Header, Footer, Info, Breadcrumbs, WhatsApp,  ScrollToTop,  getProductsData, getAllCartItems, fetchUserData, getAllOrders, 
} from './imports';
import getRoutes from './routes/routes';


function App() {


  // animation initialization 
  AOS.init();

  const token = JSON.parse(sessionStorage.getItem('token'));
  const dispatch = useDispatch();



  useEffect(() => {
    const fetchInitialData = async () => {
      dispatch(getProductsData());
      dispatch(getAllCartItems());
      if (token) {
        await Promise.all([
          dispatch(fetchUserData(token)),
          dispatch(getAllOrders(token))
        ]);
      }
    };

    fetchInitialData();
  }, [token, dispatch]);


  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <div className={`bg-[var(--bgColorSecondary)] relative`}>
          <Info text="Buy products worth Rs. 3500 & get 30% off by using our code: ON30MAR" />
          <ToastContainer position='bottom-right' autoClose={1000} />
          <Header />
          <div >
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
            {/* whatsApp feature */}
            <div className=' max-w-max fixed xs:bottom-10 bottom-5  xs:right-10 right-5 z-50'>
              <WhatsApp />
            </div>
          </div>
          <Info text="Organic Nation © All rights reserved." />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
