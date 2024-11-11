

import { lazy } from 'react';

// common components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Info from './components/info/Info';
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs';
import WhatsApp from './components/whatsApp/WhatsApp';

import VerifyEmail from './components/forgotPassword/VerifyEmail';
import ResetPassword from './components/forgotPassword/ResetPassword';
import SearchedProduct from './components/searchedProduct/SearchedProduct';


// pages
export const Home = lazy(() => import('./pages/home/Home'));
export const About = lazy(() => import('./pages/about/About'));
export const Shop = lazy(() => import('./pages/shop/Shop'));
export const ContactUs = lazy(() => import('./pages/contact-us/ContactUs'))
export const Cart = lazy(() => import('./pages/cart/Cart'))
export const Auth = lazy(() => import('./pages/login-signup/Auth'))
export const Recipes = lazy(() => import('./pages/recipes/Recipes'))
export const Testimonials = lazy(() => import('./pages/testimonials/Testimonials'))
export const Faq = lazy(() => import('./pages/FAQ\'s/Faq'))
export const PrivacyPolicy = lazy(() => import('./pages/privacy-policy/PrivacyPolicy'))
export const TermsAndConditions = lazy(() => import('./pages/terms&conditions/TermsCondions'))
export const CsrPolicy = lazy(() => import('./pages/CSR-Policy/CsrPolicy'));
export const BulkOrder = lazy(() => import('./pages/bulk-order/BulkOrder'));
export const ProductDetails = lazy(() => import('./pages/productDetails.jsx/ProductDetails'));
export const Checkout = lazy(() => import('./pages/checkout/Checkout'));
export const BlogDetail = lazy(() => import('./pages/blog-detail-page/BlogDetail'));
export const OtpLogin = lazy(() => import('./pages/login-signup/OtpLogin'));
export const OtpSubmit = lazy(() => import('./pages/login-signup/OtpSubmit'));
export const Blogs = lazy(() => import('./pages/blogs/Blogs'));
export const ScrollToTop = lazy(() => import('./helper/ScrollToTop'));
export const RecipeDetails = lazy(() => import('./pages/recipe-detail-page/RecipeDetails'));
export const GoogleSignup = lazy(() => import('./pages/login-signup/GoogleSignup'));
export const OrderConfirm = lazy(() => import('./pages/order-confirmation/OrderConfirm'));
export const PaymentStatus = lazy(() => import('./pages/payment-status/PaymentStatus'));
export const NoPageFound = lazy(() => import('./pages/no-page-found/NoPageFound'));
export const UserProfile=lazy(()=>import('./pages/user-profile/UserProfile'))

// Redux actions
export { getProductsData } from '../src/features/productData/productsDataSlice';
export { getAllCartItems } from './features/cart/cart';
export { getAllOrders } from './features/manageOrders/manageOrders';
export { getAllBlogs } from './features/blogs/blogs';
export { getAllRecipes } from './features/blogs/blogs'
import ManageOrders from './pages/manage-orders/ManageOrders';


export {
  Header,
  Footer,
  Info,
  Breadcrumbs,
  WhatsApp,
  VerifyEmail,
  ResetPassword,
  SearchedProduct,
  ManageOrders
};