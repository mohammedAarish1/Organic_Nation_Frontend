import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedData, setFilterInitialValues } from '../../features/filter/filterSlice';
import { useNavigate } from 'react-router-dom';
import { setShowSidebar } from '../../features/toggleSidebar/toggleSidebar';



const suggestions = [
  'Search for "pickle"',
  'Search for "honey"',
  'Search for "muesli"',
  'Search for "oats"',
  'Search for "jaggery powder"',
  
];

const Search = () => {


  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { productData } = useSelector((state) => state.product_data);
  const { searchInputValue } = useSelector(state => state.filterData);

  // for auto typed suggestions in the placeholder 
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);


  const handleSearch = (e) => {
    e.preventDefault()
   
    if (inputValue !== '' && productData.length > 0) {
      navigate('/searched-product')
    }
    setTimeout(() => {
      dispatch(getSearchedData({ value: inputValue, productData }))
    }, 100)

    if (inputValue === '') {
      navigate('/shop/all')
    }


  }

  const handleOnChange = (e) => {
    setInputValue(e.target.value)

  }

  // for auto typed suggestions in the placeholder 
  useEffect(() => {
    const typingInterval = setInterval(() => {
      const currentSuggestion = suggestions[placeholderIndex];

      if (!isDeleting && typedText === currentSuggestion) {
        clearInterval(typingInterval);
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setPlaceholderIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
      } else {
        setTypedText((prevText) => {
          if (isDeleting) {
            return prevText.slice(0, -1);
          } else {
            return currentSuggestion.slice(0, prevText.length + 1);
          }
        });
      }
    }, 70);

    return () => clearInterval(typingInterval);
  }, [typedText, isDeleting, placeholderIndex]);

  return (
    <div className=" relative ">
      <form className='' onSubmit={handleSearch}>
        <input
          type="text"
          // placeholder="Search Your Product..."
          placeholder={typedText}
          value={inputValue}
          onChange={(e) => handleOnChange(e)}
          className=" w-full xs:py-2 py-1 bg-[var(--bgColorSecondary)] xs:px-4 px-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[var(--themeColor)] placeholder-[var(--themeColor)] placeholder-opacity-80"
        // onMouseLeave={()=>setInputValue('')}
        />
        {/* submit button  */}
        <button
          type='submit'
          className=' absolute top-[50%] -translate-y-1/2 xs:right-3 right-2  cursor-pointer bg-[var(--bgColorSecondary)]'
        >
          <IoSearch />
        </button>

        {/* button for clearing search input  */}
        {inputValue.length > 0 && (
          <button
            type='button'
            className='absolute top-[50%] -translate-y-1/2 xs:right-10 right-6  cursor-pointer bg-[var(--bgColorSecondary)]'
            onClick={() => {
              setInputValue('')
              dispatch(setFilterInitialValues(productData))
              // dispatch(setSearchInputValue())

            }}

          >
            <IoIosClose className='text-2xl' />
          </button>
        )}


      </form>


    </div>



  )
}

export default Search
