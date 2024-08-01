import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedData, setFilterInitialValues } from '../../features/filter/filterSlice';
import { useNavigate } from 'react-router-dom';
import { setShowSidebar } from '../../features/toggleSidebar/toggleSidebar';





const Search = ({ mobileMenu = false }) => {


  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { productData } = useSelector((state) => state.product_data);
  const { searchInputValue } = useSelector(state => state.filterData);




  const handleSearch = (e) => {
    e.preventDefault()
    // below code is for hiding the sidebar in mobile menu after searching 
    if (mobileMenu) {
      dispatch(setShowSidebar())
    }
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


  return (
    <div className=" relative ">
      <form className='' onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Your Product..."
          value={inputValue}
          onChange={(e) => handleOnChange(e)}
          className=" w-full xs:py-2 py-1 bg-[var(--bgColorSecondary)] xs:px-4 px-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[var(--themeColor)]"
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
            className=' absolute top-[50%] -translate-y-1/2 xs:right-10 right-6  cursor-pointer bg-[var(--bgColorSecondary)]'
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
