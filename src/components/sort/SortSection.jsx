import React, { useState } from 'react';
import { BsFillGridFill, BsList } from "react-icons/bs";
import { fetchCategoryWiseData, getSearchedData, getSortData, setCategoryBtnValue } from '../../features/filter/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setShowFilters } from '../../features/toggleSidebar/toggleSidebar';
import { Tooltip } from 'react-tooltip';
// react icons 
import { LiaFilterSolid } from "react-icons/lia";
import { setCurrentPage } from '../../features/pagination/pagination';
import { useNavigate } from 'react-router-dom';


const SortSection = ({ setGridView, gridView }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortValue, setSortValue] = useState("sort");
  const { productData, categoryList } = useSelector((state) => state.product_data);
  const { categoryBtnValue } = useSelector((state) => state.filterData);


  return (
    <div>

      {/* search filter  */}
      <div className='md:hidden mb-5 bg-gray-500'>
        <form onSubmit={(e) => {
          e.preventDefault();

        }}>
          <input
            type="text"
            className='py-1 pl-2 outline-none w-full'
            placeholder='Search...'
            onChange={(e) => dispatch(getSearchedData({ value: e.target.value, productData }))} />
        </form>
      </div>

      <div className='flex md:flex-row flex-row-reverse flex-wrap justify-between sm:gap-0 gap-5 items-center lg:px-32 md:px-2'>

        {/* grid and list view  */}
        <div className=' gap-2 flex'>
          <div>
            <button
              className={`${!gridView ? "bg-gray-400 p-2 " : "bg-[var(--bgColorPrimary)] text-white p-2"}`}
              onClick={() => setGridView(true)}
              data-tooltip-id="grideView"
              data-tooltip-content="Grid View"
              data-tooltip-place="top"
            >
              <BsFillGridFill />
            </button>
            <Tooltip
              id="grideView"
              style={{
                backgroundColor: "#712522",
                color: "#ffffff",
                borderRadius: "10px",
                padding: "10px"
              }}
              place="top"
              animation="fade"
              delayShow={100} // delay before showing in ms
              delayHide={100} // delay before hiding in ms
            >

            </Tooltip >
          </div>

          <div>
            <button
              className={`${!gridView ? "bg-[var(--bgColorPrimary)] text-white p-2 " : "bg-gray-400 p-2 "}`}
              onClick={() => setGridView(false)}
              data-tooltip-id="listView"
              data-tooltip-content="List View"
              data-tooltip-place="top"
            >
              <BsList />
            </button>
            <Tooltip
              id="listView"
              style={{
                backgroundColor: "#712522",
                color: "#ffffff",
                borderRadius: "10px",
                padding: "10px"
              }}
              place="top"
              animation="fade"
              delayShow={100} // delay before showing in ms
              delayHide={100} // delay before hiding in ms
            >

            </Tooltip >
          </div>
        </div>


        {/* number of products available  */}
        {/* <div className='uppercase  '>
          Total
          <span className='font-bold text-[20px] text-[var(--themeColor)] '> {filterProduct?.length} </span><span className='font-bold text-[20px] text-[var(--themeColor)]'> {categoryBtnValue.toLowerCase() === 'all' ? '' : `${categoryBtnValue}`}</span> Products Available
        </div> */}

        {/* sort options  */}
        <div className="relative md:block hidden">
          <select
            id="sort"
            name="sort"
            value={sortValue}
            onChange={(e) => {
              setSortValue(e.target.value)
              dispatch(getSortData({ value: e.target.value, productData }))
            }}
            // className="w-auto block border cursor-pointer bg-white border-gray-300 hover:border-gray-500 p-2  leading-tight focus:outline-none"
            className="outline-none block w-auto p-2.5"
          >
            <option defaultValue="sort" >Sort</option>
            {/* <option value="#" disabled></option> */}
            <option value="low_to_high">Price: Low to High</option>
            {/* <option value="#" disabled></option> */}
            <option value="high_to_low">Price: High to Low</option>
            {/* <option value="#" disabled></option> */}
            <option value="a-z">a - z</option>
            {/* <option value="#" disabled></option> */}
            <option value="z-a">z - a</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">

          </div>
        </div>


        {/* categories options visible in mobile devices  */}
        <select
          name="category"
          id="category"
          defaultValue={categoryBtnValue}
          className='md:hidden block w-auto p-2 outline-none'
          onChange={(e) => {
            dispatch(setShowFilters('hide'))
            dispatch(setCurrentPage(1))
            dispatch(setCategoryBtnValue(e.target.value))
            dispatch(fetchCategoryWiseData(e.target.value.toLowerCase()))
            navigate(`/shop/${e.target.value.toLowerCase()}`)
          }}>
          {categoryList.map((curItem) => (

            <option value={curItem.categoryUrl} key={curItem.categoryUrl}>{curItem.category}</option>

          ))}
        </select>
        {/* categories options visible in mobile devices end */}




        {/* fillter button -- for mobile devices  */}
        <div className='md:hidden block'>
          <button className='flex justify-center items-center gap-3 bg-white p-2'
            onClick={() => dispatch(setShowFilters('showHide'))}
          >Filters <LiaFilterSolid /></button>
        </div>

      </div>
    </div>
  )
}

export default SortSection;
