import React from 'react';
import { Route } from 'react-router-dom';

import {
    VerifyEmail, ResetPassword, SearchedProduct, Home, About, Shop, ContactUs, Cart, Auth, Recipes, Testimonials, Faq, PrivacyPolicy, TermsAndConditions, CsrPolicy, BulkOrder, ProductDetails, Checkout, BlogDetail, OtpLogin, Blogs, RecipeDetails, GoogleSignup, ManageOrders, OrderConfirm, PaymentGateway, NoPageFound,
    OtpSubmit
} from '../imports';

const getRoutes = () => [
    <Route
        key="home"
        path='/'
        element={<Home />}
    />,
    <Route
        key="shop"
        path='/shop/:category'
        element={<Shop />}
    />,
    <Route
        key="searched-product"
        path='/searched-product'
        element={<SearchedProduct />}
    />,
    <Route
        key="contact-us"
        path='/contact-us'
        element={<ContactUs />}
    />,
    <Route
        key="cart"
        path='/cart'
        element={<Cart />}
    />,
    <Route
        key="register"
        path='/register'
        element={<Auth />}
    />,
    <Route
        key="forgot-password"
        path='/auth/forgot-password'
        element={<VerifyEmail />}
    />,
    <Route
        key="reset-password"
        path='/reset-password/:token'
        element={<ResetPassword />}
    />,
    <Route
        key="recipes"
        path='/our-recipes'
        element={<Recipes />}
    />,
    <Route
        key="blogs"
        path='/our-blogs'
        element={<Blogs />}
    />,
    <Route
        key="recipe-details"
        path='/recipes/:id'
        element={<RecipeDetails
        />} />,
    <Route
        key="blogsId"
        path='/blogs/:id'
        element={<BlogDetail />}
    />,
    <Route
        key="testimonials"
        path='/testimonials'
        element={<Testimonials />}
    />,
    <Route
        key="about-us"
        path='/about-us'
        element={<About />}
    />,
    <Route
        key="faq"
        path='/frequently-asked-questions'
        element={<Faq />}
    />,
    <Route
        key="privacy-policy"
        path='/privacy-policy'
        element={<PrivacyPolicy />}
    />,
    <Route
        key="terms"
        path='/terms&conditions'
        element={<TermsAndConditions />}
    />,
    <Route
        key="csr-policy"
        path='/csr-policy'
        element={<CsrPolicy />}
    />,
    <Route
        key="bulk-order"
        path='/bulk-order'
        element={<BulkOrder />}
    />,
    <Route
        key="product-details"
        path='/shop/:category/:nameUrl'
        element={<ProductDetails />}
    />,
    <Route
        key="checkout"
        path='/cart/checkout'
        element={<Checkout />}
    />,
    <Route
        key="google-signup"
        path='/collect-phone-number'
        element={<GoogleSignup />}
    />,
    <Route
        key="manage-orders"
        path='/manage-orders'
        element={<ManageOrders />}
    />,
    <Route
        key="otp-login"
        path='/otp-login'
        element={<OtpLogin />}
    />,
    <Route
        key="otp-submit"
        path='/otp-submit'
        element={<OtpSubmit />}
    />,
    <Route
        key="order-confirmed"
        path='/order-confirmed/:orderId'
        element={<OrderConfirm />}
    />,
    <Route
        key="payment-gateway"
        path='/payment-gateway'
        element={<PaymentGateway />}
    />,
    <Route
        key="no-page-found"
        path='*'
        element={<NoPageFound />}
    />,
];

export default getRoutes;