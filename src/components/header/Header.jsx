import React, { useEffect, useState } from 'react'
import Logo from '../logo/Logo'
import Search from '../search/Search'
import OtherNavItems from '../userRegister/OtherNavItems'
import NavMenu from '../navMenu/NavMenu'

const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  return (
    <header
      className={`sticky top-0 w-full z-50 ${isScrolled ? 'bg-[var(--bgColorSecondary)] shadow-xl' : 'bg-transparent'}`}
    >
      <div className={`flex justify-between gap-2  items-center sm:px-10 px-3 relative py-4 xs:py-2 z-30`}>
        <Logo />
        <div className='md:block hidden relative w-[35%] '>
          <Search />
        </div>
        <NavMenu />
        <OtherNavItems />
      </div>
    </header>
  )
}

export default Header;
