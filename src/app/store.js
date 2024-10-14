import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth';
import productReducer from '../features/productData/productsDataSlice';
import filterReducer from '../features/filter/filterSlice';
import paginationReducer from '../features/pagination/pagination';
import cartReducer from '../features/cart/cart';
import spotlightProductsReducer from '../features/spotlightProducts/spotlightProducts';
import sidebarReducer from '../features/toggleSidebar/toggleSidebar'
import reviewsReducer from '../features/reviews/reviews';
import deliveryReducer from '../features/check-delivery/checkDelivery';
// import otpSliceReducer from '../features/auth/OTPSlice';
import forgotPasswordReducer from '../features/forgotPassword/forgotPassword';
import blogReducer from '../features/blogs/blogs';
import contactedUserReducer from '../features/contactedUser/contactedUser';
import paymentReducer from '../features/orderPayment/payment';
import adminReducer from '../features/admin/adminSlice';
import adminDataReducer from '../features/admin/adminData';
import manageReturnsReducer from '../features/manage-returns/manageReturns';
import manageOrdersReducer from '../features/manageOrders/manageOrders'

// import adminFeatureReducer from '../features/admin/adminFeatures'

import { setStore } from '../helper/storeUtils';


 const store = configureStore({
    reducer: {
        auth: authReducer,
        product_data: productReducer,
        filterData: filterReducer,
        pagination: paginationReducer,
        cart: cartReducer,
        spotlight: spotlightProductsReducer,
        sidebar: sidebarReducer,
        reviews: reviewsReducer,
        delivery: deliveryReducer,
        // OTPSlice: otpSliceReducer,
        forgotPassword: forgotPasswordReducer,
        blog: blogReducer,
        contactedUser: contactedUserReducer,
        payment: paymentReducer,
        admin: adminReducer,
        adminData: adminDataReducer,
        returns: manageReturnsReducer,
        orders: manageOrdersReducer,
        // adminFeatures: adminFeatureReducer,
    },
})

setStore(store);  // this makes a copy of the store which i had mported in axiosCongig.js file

export default store;