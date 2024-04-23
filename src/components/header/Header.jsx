import React from 'react'
import Logo from '../logo/Logo'
import Search from '../search/Search'
import NavMenu from '../navMenu/NavMenu'
import OtherNavItems from '../userRegister/OtherNavItems'

const Header = () => {
  return (
    <header>
    <div className='flex justify-between items-center xs:px-10 relative pt-2 pb-2'>
      <Logo/>
      <Search/>
      <NavMenu/>
      <OtherNavItems />
    </div>
    </header>
  )
}

export default Header
