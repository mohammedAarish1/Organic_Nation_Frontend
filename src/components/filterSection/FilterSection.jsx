import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  // setFilterInitialValues,
  // getFilterData,
  // getPricerRangeData,
  // getSearchedData,
  // fetchCategoryWiseData,
  // setCategoryBtnValue,
  clearFilters,
  // getSortData,
  getFilteredData
} from '../../features/filter/filterSlice';
import { setCurrentPage } from '../../features/pagination/pagination';
import { setShowFilters } from '../../features/toggleSidebar/toggleSidebar';
import { Link } from 'react-router-dom';
// react icons 
import { IoCloseSharp } from 'react-icons/io5';
import PriceRangeFilter from '../module/shop/PriceRangeFilter ';
import SortFilter from '../module/shop/SortFilter';


const FilterSection = () => {

  const dispatch = useDispatch();
  // const [searchInputValue, setSearchInputValue] = useState('')
  // const  products  = useSelector((state) => state.filterData.products);
  const { showFilters } = useSelector(state => state.sidebar);
  // const { price, minPrice, maxPrice } = useSelector((state) => state.filterData.priceRangeFilter);
  const { products, categoryBtnValue, categoryList,searchInputValue } = useSelector((state) => state.filterData);


  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showFilters]);



  // useEffect(() => {
  //   dispatch(setFilterInitialValues(products));
  // }, [products])

  // useEffect(()=>{
  //   dispatch(getFilteredData({value:searchInputValue}))
  // },[searchInputValue])

  return (
    <div className={`px-4 filters ${showFilters ? 'active' : ''}`}>
      <div className='md:hidden block mb-5 pr-4 text-end'>
        <button
          className='shadow-md rounded-full shadow-green-700 hover:scale-110 text-[#ffe9a1]'
          onClick={() => dispatch(setShowFilters('hide'))}
        >
          <IoCloseSharp className='text-4xl' />
        </button>
      </div>
      {/* search filter  */}
      <div className='mb-5 md:block hidden '>
        <form onSubmit={(e) => {
          e.preventDefault();
          dispatch(setShowFilters('hide'))

        }}>
          <input
            type="text"
            className='py-1 pl-2 outline-none border'
            placeholder='Search...'
            value={searchInputValue}
            onChange={(e) => {
              e.preventDefault()
              // setSearchInputValue(e.target.value)
              // dispatch(getSearchedData({ value: e.target.value, products }))
              dispatch(getFilteredData({ type: 'SEARCH', value: e.target.value }))

            }}
          />
        </form>
      </div>

      {/* category filter */}
      <div className='md:pl-2'>
        <h2 className='text-xl mb-2 md:text-black md:block hidden text-[#ffe9a1] md:tracking-normal tracking-widest
        '>Category</h2>
        <div className=' hidden md:flex md:flex-col gap-2'>
          {categoryList.map((curItem, index) => (
            <Link
              to={`/shop/${curItem.categoryUrl.toLowerCase()}`}
              key={index}
              value={categoryBtnValue}
              className={`${categoryBtnValue === curItem.categoryUrl.toLowerCase() && "border-b-2 border-gray-600"} text-[var(--themeColor)] text-sm hover:border-b-2 border-gray-600 w-max cursor-pointer`}
              // onClick={() => {
              //   dispatch(setCurrentPage(1))
              //   dispatch(setCategoryBtnValue(curItem.categoryUrl))
              //   dispatch(fetchCategoryWiseData(curItem.categoryUrl.toLowerCase()))
              // }}
            >
              {curItem.category}
            </Link>
          ))}

        </div>
      </div>
      {/*  sort section showing in mobile devices  */}

      <div className="relative md:hidden block mt-10">
       <SortFilter isMobile={true} />
      </div>

     

      <div className='md:pt-8 pt-8 pl-2'>
        <PriceRangeFilter isMobile={true}/>
      </div>

      {/* clear filter  */}
      <div className=' mt-8'>
        <button type='button'
          className='bg-[var(--themeColor)] text-white hover:bg-red-700 hover:text-white  text-sm md:text-[16px] transition-all duration-500 md:py-3 py-2 md:px-5 px-3 '
          onClick={() => {
            dispatch(clearFilters())
            if (window.innerWidth <= 768) {
              dispatch(setShowFilters('hide'))

            }
          }}
        >Clear Filters</button>
      </div>
    </div>
  )
}

export default FilterSection;
