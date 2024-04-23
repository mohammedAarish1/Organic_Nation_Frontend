import React from 'react'
// icons  
import { FaUserPlus } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom';

const OtherNavItems = () => {
  return (
    <div className=''>
      <ul className='flex  justify-center items-center gap-4'>
        {/* cart  */}
        <li className='cursor-pointer stop-animation'>
          <Link to="cart" className='flex flex-col justify-center items-center'>
            <BsCart4 className='animate  text-[var(--titleTextColor)] text-xl' />
            <span>Cart</span>
          </Link>
        </li>
        {/* login  */}
        <li>
          <NavLink to="register" className={({ isActive }) => `cursor-pointer p-4 rounded-md hover:bg-[var(--hoverEffect)] flex flex-col justify-center items-center ${isActive ? 'bg-[var(--hoverEffect)]' : null} `}>
            <FaUserPlus className='text-[var(--titleTextColor)] text-xl' />
            <span>Login</span>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default OtherNavItems
