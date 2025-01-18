import React, { memo } from 'react';
import { Link } from 'react-router-dom';


const Logo = () => {
  return (
    <Link to='/'>
    <div className=''>
     <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.webp' alt="logo" className='sm:w-24 min-w-16 w-16' />
    </div>
    </Link>
  )
}

export default memo(Logo);
