import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
    // VerifyEmail,
    // ResetPassword,
    Home,
    About,
    Shop,
    ContactUs,
    Cart,
    Recipes,
    Testimonials,
    Faq,
    PrivacyPolicy,
    TermsAndConditions,
    CsrPolicy,
    ProductDetails,
    // Checkout,
    BlogDetail,
    OtpLogin,
    Blogs,
    RecipeDetails,
    // GoogleSignup,
    // OrderConfirm,
    NoPageFound,
    // OtpSubmit,
    // PaymentStatus,
    UserProfile,
    ManageOrders,
    ManageReturns,
    SearchedProduct
} from '../imports';
// import GoogleLoginHandler from '../pages/login-signup/GoogleLoginHandler';
import OrderSuccessMessage from '../components/checkout/OrderSuccessMessage';
import Wishlist from '../pages/Wishlist';
import AllReviews from '../pages/AllReviews'



const MyAppRoutes = () => {

    // const { cartItemsList } = useSelector((state) => state.cart);
    const { user } = useSelector(state => state.auth);
 const orderId = sessionStorage.getItem('newOrderId');
    return (

        <Routes>
            <Route
                key="home"
                path='/'
                element={<Home />}
            />
            <Route
                key="shop"
                path='/shop/:category'
                element={<Shop />}
            />
            <Route
                key="searched-product"
                path='/searched-product'
                element={<SearchedProduct />}
            />
            <Route
                key="contact-us"
                path='/contact-us'
                element={<ContactUs />}
            />
            <Route
                key="cart"
                path='/cart'
                element={<Cart />}
            />
            <Route
                key="register"
                path='/register'
                // element={!token ? <Auth /> : <Home />}
                element={user ? <Home /> : <OtpLogin />}
            />
            {/* <Route
             key="forgot-password"
             path='/auth/forgot-password'
             element={<VerifyEmail />}
         />, */}
            {/* <Route
             key="reset-password"
             path='/reset-password/:token'
             element={<ResetPassword />}
         />, */}
            <Route
                key="recipes"
                path='/our-recipes'
                element={<Recipes />}
            />
            <Route
                key="blogs"
                path='/our-blogs'
                element={<Blogs />}
            />
            <Route
                key="recipe-details"
                path='/recipes/:titleUrl'
                element={<RecipeDetails />}
            />
            <Route
                key="blogsTitleUrl"
                path='/blogs/:titleUrl'
                element={<BlogDetail />}
            />
            <Route
                key="testimonials"
                path='/testimonials'
                element={<Testimonials />}
            />
            <Route
                key="about-us"
                path='/about-us'
                element={<About />}
            />
            <Route
                key="faq"
                path='/frequently-asked-questions'
                element={<Faq />}
            />
            <Route
                key="privacy-policy"
                path='/privacy-policy'
                element={<PrivacyPolicy />}
            />
            <Route
                key="terms"
                path='/termsandconditions'
                element={<TermsAndConditions />}
            />
            <Route
                key="csr-policy"
                path='/csr-policy'
                element={<CsrPolicy />}
            />
            <Route
                key="product-details"
                path='/shop/:category/:nameUrl'
                element={<ProductDetails />}
            />
            {/* <Route
             key="checkout"
             path='/cart/checkout'
             element={user && cartItemsList?.length > 0 ? < Checkout /> : <Cart />}
         />, */}
            {/* <Route
             key="google-signup"
             path='/collect-phone-number'
             element={<GoogleSignup />}
         />, */}
            {/* <Route
             key="google-login"
             path='/auth/google/login'
             element={<GoogleLoginHandler />}
         />, */}
            <Route
                key="manage-orders"
                path='/manage-orders'
                element={user ? <ManageOrders /> : <OtpLogin />}
            />
            <Route
                key="manage-returns"
                path='/manage-returns'
                element={user ? <ManageReturns /> : <OtpLogin />}
            />
            {/* <Route
             key="user-profile"
             path='/profile'
             element={user ? <UserProfile /> : <OtpLogin />}
         />, */}
            <Route
                key="user-profile"
                path='/profile/:id'
                element={user ? <UserProfile /> : <OtpLogin />}
            />
            <Route
                key="otp-login"
                path='/otp-login'
                element={!user && <OtpLogin />}
            />
            {/* <Route
             key="otp-submit"
             path='/otp-submit'
             element={!user && <OtpSubmit />}
         />, */}
            {/* <Route
             key="order-confirmed"
             path='/order-confirmed/:orderId'
             element={<OrderConfirm />}
         />, */}
            {/* <Route
                key="order-confirmed"
                path='/order-confirmed/:orderId'
                element={<OrderSuccessMessage />}
            /> */}
            {/* <Route
                key="payment-status"
                path='/payment-status'
                element={<OrderSuccessMessage />}
            /> */}
            <Route
                key="order-status"
                path='/order-status'
                // element={<OrderSuccessMessage />}
                element={user && orderId ? <OrderSuccessMessage /> : <Home />}

            />
            <Route
                key="wish-list"
                path='/wish-list'
                // element={<OrderSuccessMessage />}
                element={<Wishlist/>}

            />
            <Route
                key="no-page-found"
                path='*'
                element={<NoPageFound />}
            />
            <Route
                key="no-page-found"
                path="/product/:productId/reviews"
                element={<AllReviews/>}
            />
        </Routes>

    )
};

export default MyAppRoutes;