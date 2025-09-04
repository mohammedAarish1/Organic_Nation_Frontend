// import React, { memo, useEffect, useRef, useState } from 'react';
// import { useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getFilteredData,
//   // getSearchedData,
//   // setFilterInitialValues
// } from '../../features/filter/filterSlice';
// import { useNavigate } from 'react-router-dom';

// const items = [
//   "pickle",
//   "honey",
//   "muesli",
//   "oats",
//   "jaggery powder"
// ];

// const AnimatedPlaceholder = React.memo(() => {
//   const itemRef = useRef(null);
//   const currentIndexRef = useRef(0);

//   useEffect(() => {
//     const updateText = () => {
//       if (itemRef.current) {
//         // Fade out
//         itemRef.current.style.opacity = '0';

//         setTimeout(() => {
//           // Update text and fade in
//           currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
//           if (itemRef.current) {
//             itemRef.current.textContent = items[currentIndexRef.current];
//             itemRef.current.style.opacity = '0.8';
//           }
//         }, 200);
//       }
//     };

//     const interval = setInterval(updateText, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--themeColor)]">
//       <span className="opacity-80">Search for "</span>
//       <span
//         ref={itemRef}
//         className="opacity-80 transition-opacity duration-300"
//       >
//         {items[0]}
//       </span>
//       <span className="opacity-80">"</span>
//     </div>
//   );
// });



// const Search = () => {
//   const [inputValue, setInputValue] = React.useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const  products  = useSelector((state) => state.filterData.products);

//   const handleSearch = useCallback((e) => {
//     e.preventDefault();

//     if (inputValue !== '' && products.length > 0) {
//       navigate('/searched-product');
//       dispatch(getFilteredData({ type: 'SEARCH', value: inputValue }));
//     } else if (inputValue === '') {
//       navigate('/shop/all');
//     }
//   }, [inputValue, products, navigate, dispatch]);

//   const handleOnChange = useCallback((e) => {
//     setInputValue(e.target.value);
//   }, []);

//   const handleClearInput = useCallback(() => {
//     setInputValue('');
//     // dispatch(setFilterInitialValues(products));
//   }, [dispatch, products]);

//   return (
//     <div className="relative">
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleOnChange}
//           className="w-full xs:py-2 py-1 bg-[var(--bgColorSecondary)] xs:px-4 px-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[var(--themeColor)]"
//         />

//         {!inputValue && <AnimatedPlaceholder />}

//         <button 
//           type="submit"
//           aria-label="Search"
//           className="absolute top-[50%] -translate-y-1/2 xs:right-3 right-2 cursor-pointer bg-[var(--bgColorSecondary)]"
//         >
//         </button>

//         {inputValue.length > 0 && (
//           <button
//             type="button"
//             className="absolute top-[50%] -translate-y-1/2 xs:right-10 right-6 cursor-pointer bg-[var(--bgColorSecondary)]"
//             onClick={handleClearInput}
//           >
//             <IoIosClose className="text-2xl" />
//           </button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default memo(Search);


import React, { memo, useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { getFilteredData } from '../../features/filter/filterSlice';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';

const items = [
  "pickle",
  "honey",
  "chutney",
  "mustard oil",
  "oats",
  "jaggery powder"
];

const AnimatedPlaceholder = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateText = () => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setIsVisible(true);
      }, 300);
    };

    const interval = setInterval(updateText, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 flex">
      <span className="opacity-80">Search for "</span>
      <motion.div
        className="overflow-hidden mx-0.5"
        initial={{ opacity: 1 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-medium text-[var(--themeColor)]">
          {items[currentIndex]}
        </span>
      </motion.div>
      <span className="opacity-80">"</span>
    </div>
  );
});

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.filterData.products);

  const handleSearch = useCallback((e) => {
    e.preventDefault();

    if (inputValue.trim() !== '' && products.length > 0) {
      navigate('/searched-product');
      dispatch(getFilteredData({ type: 'SEARCH', value: inputValue }));
    } else if (inputValue.trim() === '') {
      navigate('/shop/all');
    }
  }, [inputValue, products, navigate, dispatch]);

  const handleOnChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleClearInput = useCallback(() => {
    setInputValue('');
    inputRef.current.focus();
  }, []);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <motion.div
        initial={{ scale: 1 }}
        animate={{ 
          scale: isFocused ? 1.01 : 1,
          boxShadow: isFocused ? '0 4px 15px rgba(0, 0, 0, 0.1)' : '0 2px 5px rgba(0, 0, 0, 0.05)'
        }}
        transition={{ duration: 0.2 }}
        className={`rounded-xl overflow-hidden border ${isFocused ? 'border-[var(--themeColor)]' : 'border-gray-300'}`}
      >
        <form onSubmit={handleSearch} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleOnChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full py-3 bg-[var(--bgColorSecondary)] px-5 rounded-xl focus:outline-none text-base"
            aria-label="Search products"
          />

          {!inputValue && <AnimatedPlaceholder />}

          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            <AnimatePresence>
              {inputValue.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  type="button"
                  className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
                  onClick={handleClearInput}
                  aria-label="Clear search"
                >
                  <X size={18} className=" text-gray-500" />
                </motion.button>
              )}
            </AnimatePresence>
            
            <motion.button 
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              type="submit"
              aria-label="Search"
              className="p-2 bg-[var(--themeColor)] text-white rounded-full flex items-center justify-center shadow-md"
            >
              <SearchIcon size={14} />
            </motion.button>
          </div>
        </form>
      </motion.div>
      
      {/* Recent searches would go here - optional enhancement */}
      {/* {isFocused && inputValue.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-72 overflow-y-auto"
        >
          <div className="p-2 text-sm text-gray-500">
            {items.filter(item => item.includes(inputValue.toLowerCase())).length > 0 ? (
              items
                .filter(item => item.includes(inputValue.toLowerCase()))
                .map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => {
                      setInputValue(item);
                      inputRef.current.focus();
                    }}
                  >
                    <span>{item}</span>
                  </div>
                ))
            ) : (
              <div className="p-2">No suggestions found</div>
            )}
          </div>
        </motion.div>
      )} */}
    </div>
  );
};

export default memo(Search);