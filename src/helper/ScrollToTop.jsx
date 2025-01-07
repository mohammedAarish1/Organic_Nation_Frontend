// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

// export default ScrollToTop;


import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Delay the scroll to ensure the new page content is rendered
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
    }, 0);
  }, [location.key]); // Use location.key instead of pathname

  return null;
};

export default ScrollToTop;