



import React, { memo, useEffect, useRef, useState } from 'react';
import  { useCallback } from 'react';
import { IoSearch } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedData, setFilterInitialValues } from '../../features/filter/filterSlice';
import { useNavigate } from 'react-router-dom';

const items = [
  "pickle",
  "honey",
  "muesli",
  "oats",
  "jaggery powder"
];

const AnimatedPlaceholder = React.memo(() => {
  const itemRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const updateText = () => {
      if (itemRef.current) {
        // Fade out
        itemRef.current.style.opacity = '0';
        
        setTimeout(() => {
          // Update text and fade in
          currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
          if (itemRef.current) {
            itemRef.current.textContent = items[currentIndexRef.current];
            itemRef.current.style.opacity = '0.8';
          }
        }, 200);
      }
    };

    const interval = setInterval(updateText, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--themeColor)]">
      <span className="opacity-80">Search for "</span>
      <span 
        ref={itemRef}
        className="opacity-80 transition-opacity duration-300"
      >
        {items[0]}
      </span>
      <span className="opacity-80">"</span>
    </div>
  );
});



const Search = () => {
  const [inputValue, setInputValue] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productData } = useSelector((state) => state.product_data);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    
    if (inputValue !== '' && productData.length > 0) {
      navigate('/searched-product');
      dispatch(getSearchedData({ value: inputValue, productData }));
    } else if (inputValue === '') {
      navigate('/shop/all');
    }
  }, [inputValue, productData, navigate, dispatch]);

  const handleOnChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleClearInput = useCallback(() => {
    setInputValue('');
    dispatch(setFilterInitialValues(productData));
  }, [dispatch, productData]);

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={inputValue}
          onChange={handleOnChange}
          className="w-full xs:py-2 py-1 bg-[var(--bgColorSecondary)] xs:px-4 px-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[var(--themeColor)]"
        />
        
        {!inputValue && <AnimatedPlaceholder />}
        
        <button
          type="submit"
          aria-label="Search"
          className="absolute top-[50%] -translate-y-1/2 xs:right-3 right-2 cursor-pointer bg-[var(--bgColorSecondary)]"
        >
          <IoSearch />
        </button>

        {inputValue.length > 0 && (
          <button
            type="button"
            className="absolute top-[50%] -translate-y-1/2 xs:right-10 right-6 cursor-pointer bg-[var(--bgColorSecondary)]"
            onClick={handleClearInput}
          >
            <IoIosClose className="text-2xl" />
          </button>
        )}
      </form>
    </div>
  );
};

export default memo(Search);