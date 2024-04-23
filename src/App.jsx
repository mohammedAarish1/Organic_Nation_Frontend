import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Info from './components/info/Info'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Shop from './pages/shop/Shop'
import TrackOrder from './pages/track-order/TrackOrder'
import ContactUs from './pages/contact-us/ContactUs'
import Cart from './pages/cart/Cart'
import Login from './pages/login-signup/Login'
import Recipes from './pages/recipes/Recipes'
import Testimonials from './pages/testimonials/Testimonials'

function App() {

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <BrowserRouter>
        <div className='bg-[var(--bgColorSecondary)]'>
          <Info text="Buy products worth Rs. 3500 & get 30% off by using our code: ON30MAR" />
          <Header />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='shop' element={<Shop />} />
            <Route path='track-order' element={<TrackOrder />} />
            <Route path='contact-us' element={<ContactUs />} />
            <Route path='cart' element={<Cart />} />
            <Route path='register' element={<Login />} />
            <Route path='our-recipes' element={<Recipes />} />
            <Route path='testimonials' element={<Testimonials />} />
            <Route path='about-us' element={<About />} />
          </Routes>
          <Footer moveToTop={moveToTop} />
          <Info text="Organic Nation © All rights reserved." />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
