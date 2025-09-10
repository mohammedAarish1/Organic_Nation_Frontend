import React, { memo, useEffect, useState, useCallback } from 'react';
import Logo from '../logo/Logo';
import Search from '../search/Search';
import OtherNavItems from '../userRegister/OtherNavItems';
import NavMenu from '../navMenu/NavMenu';

// Memoized child components
const MemoizedNavMenu = memo(NavMenu);
const MemoizedOtherNavItems = memo(OtherNavItems);

const Header = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Memoize the scroll handler
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 0);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Memoize the header class string
  const headerClassName = `sticky top-0 w-full z-30 ${
    isScrolled ? 'bg-[var(--background-color)] shadow-xl' : 'bg-transparent'
  }`;

  const containerClassName = 'flex justify-between gap-2 items-center sm:px-10 px-3 relative py-4 xs:py-1 z-30';

  return (
    <header className={headerClassName}>
      <div className={containerClassName}>
        <Logo />
        <div className='md:block hidden relative w-[35%]'>
          <Search />
        </div>
        <MemoizedNavMenu />
        <MemoizedOtherNavItems />
      </div>
    </header>
  );
});


export default Header;