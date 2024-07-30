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
        blog: blogReducer
    },
})
