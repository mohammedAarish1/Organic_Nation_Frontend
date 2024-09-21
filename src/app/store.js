import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productData/productsDataSlice';
import filterReducer from '../features/filter/filterSlice';
import paginationReducer from '../features/pagination/pagination';
import cartReducer from '../features/cart/cart';
import spotlightProductsReducer from '../features/spotlightProducts/spotlightProducts';
import sidebarReducer from '../features/toggleSidebar/toggleSidebar'
import userReducer from '../features/auth/userSlice';
import manageOrdersReducer from '../features/manageOrders/manageOrders';
import reviewsReducer from '../features/reviews/reviews';
import deliveryReducer from '../features/check-delivery/checkDelivery';
import otpSliceReducer from '../features/auth/OTPSlice';
import forgotPasswordReducer from '../features/forgotPassword/forgotPassword';
import blogReducer from '../features/blogs/blogs';
import contactedUserReducer from '../features/contactedUser/contactedUser';
import paymentReducer from '../features/orderPayment/payment';
import adminReducer from '../features/admin/adminSlice';
import adminDataReducer from '../features/admin/adminData';
// import adminFeatureReducer from '../features/admin/adminFeatures'




export const store = configureStore({
    reducer: {
        product_data: productReducer,
        filterData: filterReducer,
        pagination: paginationReducer,
        cart: cartReducer,
        spotlight: spotlightProductsReducer,
        sidebar: sidebarReducer,
        user: userReducer,
        orders: manageOrdersReducer,
        reviews: reviewsReducer,
        delivery: deliveryReducer,
        OTPSlice: otpSliceReducer,
        forgotPassword: forgotPasswordReducer,
        blog: blogReducer,
        contactedUser: contactedUserReducer,
        payment: paymentReducer,
        admin: adminReducer,
        adminData: adminDataReducer,
        // adminFeatures: adminFeatureReducer,
    },
})
