import React, { memo, useEffect, useState } from 'react'
import Logo from '../logo/Logo'
import Search from '../search/Search'
import OtherNavItems from '../userRegister/OtherNavItems'
import NavMenu from '../navMenu/NavMenu'



// for preventing re-renders of below comp
const MemoizedLogo = memo(Logo);
const MemoizedSearch = memo(Search);
const MemoizedNavMenu = memo(NavMenu);
const MemoizedOtherNavItems = memo(OtherNavItems);


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
  }, []);

  return (
    <header
      className={`sticky top-0 w-full z-40 ${isScrolled ? 'bg-[var(--bgColorSecondary)] shadow-xl' : 'bg-transparent'}`}
    >
      <div className={`flex justify-between gap-2  items-center sm:px-10 px-3 relative py-4 xs:py-2 z-30`}>
        <MemoizedLogo />
        <div className='md:block hidden relative w-[35%] '>
          <MemoizedSearch />
        </div>
        <MemoizedNavMenu />
        <MemoizedOtherNavItems />
      </div>
    </header>
  )
}

export default Header;
