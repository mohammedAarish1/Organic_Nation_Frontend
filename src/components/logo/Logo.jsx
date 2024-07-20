import React from 'react';
import { Link } from 'react-router-dom';
// image
import logo from '../../images/logo/logo.png'


const Logo = () => {
  return (
    <Link to='/'>
    <div className=''>
     <img src={logo} alt="logo" className='sm:w-24 min-w-16 w-16' />
    </div>
    </Link>
  )
}

export default Logo;
