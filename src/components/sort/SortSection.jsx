import {
  // getFilteredData,
  // fetchCategoryWiseData,
  // getSearchedData,
  // getSortData,
  // setCategoryBtnValue
} from '../../features/filter/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setShowFilters } from '../../features/toggleSidebar/toggleSidebar';
// import { Tooltip } from 'react-tooltip';
// react icons 
// import { setCurrentPage } from '../../features/pagination/pagination';
import { useNavigate } from 'react-router-dom';
import SortFilter from '../module/shop/SortFilter';
import Search from "../../components/search/Search"
import { Funnel, Grid, List } from 'lucide-react';


const SortSection = ({ setGridView, gridView }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [sortValue, setSortValue] = useState("sort");
  const { categoryBtnValue, categoryList } = useSelector((state) => state.filterData);
  // for searching in mobile devices
  // const [searchValue, setSearchValue] = useState('');

  return (
    <div>
      <div className='md:hidden mb-5'>
        <Search />
      </div>

      {/* search filter for mobile */}
      {/* <div className='md:hidden mb-5'>
        <form onSubmit={(e) => {
          e.preventDefault();
          dispatch(getFilteredData({ type: 'SEARCH', value: searchValue }))
        }}>
          <input
            type="search"
            name='search'
            id='search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='py-1 pl-2 outline-none w-full'
            placeholder='Search...'
          // onChange={(e) => dispatch(getSearchedData({ value: e.target.value, products }))}
          />
        </form>
      </div> */}

      <div className=' flex md:flex-row flex-row-reverse flex-wrap justify-between sm:gap-0 gap-5 items-center lg:px-32 md:px-2'>

        {/* grid and list view  */}
        <div className=' gap-2 flex'>
          {/* <div>
            <button
              className={`${!gridView ? "bg-gray-400 p-2 " : "bg-[var(--background-color)] text-white p-2"}`}
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
              className={`${!gridView ? "bg-[var(--background-color)] text-white p-2 " : "bg-gray-400 p-2 "}`}
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
          </div> */}

          {/* View mode toggle */}
            <div className="bg-white shadow-md rounded-full p-1 flex">
              <button
                onClick={() => setGridView(true)}

                className={`px-4 py-2 rounded-full flex items-center ${gridView ? 'bg-[#712522] text-white' : 'text-gray-600'}`}
              >
                <Grid size={16} className="mr-2" />
                {/* <span className="hidden sm:inline">Grid View</span> */}
              </button>
              <button
                onClick={() => setGridView(false)}

                className={`px-4 py-2 rounded-full flex items-center ${!gridView ? 'bg-[#712522] text-white' : 'text-gray-600'}`}
              >
                <List size={16} className="mr-2" />
                {/* <span className="hidden sm:inline">Carousel</span> */}
              </button>
            </div>
        </div>


        {/* number of products available  */}
        {/* <div className='uppercase  '>
          Total
          <span className='font-bold text-[20px] text-[var(--themeColor)] '> {filterProduct?.length} </span><span className='font-bold text-[20px] text-[var(--themeColor)]'> {categoryBtnValue.toLowerCase() === 'all' ? '' : `${categoryBtnValue}`}</span> Products Available
        </div> */}

        {/* sort options  */}
        <div className="relative md:block hidden">
          <SortFilter />
        </div>


        {/* categories options visible in mobile devices  */}
        <select
          name="category"
          id="category"
          value={categoryBtnValue}
          // className='md:hidden block w-auto p-2 outline-none'
          className='md:hidden block w-auto py-1 px-2 bg-transparent border border-gray-400 rounded-lg text-[var(--themeColor)] outline-none'
          onChange={(e) => {
            dispatch(setShowFilters('hide'))
            // dispatch(setCurrentPage(1))
            // dispatch(setCategoryBtnValue(e.target.value))
            // dispatch(fetchCategoryWiseData(e.target.value.toLowerCase()))
            navigate(`/shop/${e.target.value.toLowerCase()}`)
          }}>
          {categoryList.map((curItem) => (

            <option value={curItem.categoryUrl.toLowerCase()} key={curItem.categoryUrl}>{curItem.category}</option>

          ))}
        </select>
        {/* categories options visible in mobile devices end */}




        {/* fillter button -- for mobile devices  */}
        <div className='md:hidden block'>
          <button className='flex justify-center items-center text-[var(--themeColor)] gap-3 py-1 px-2 border border-gray-400 rounded-lg'
            onClick={() => dispatch(setShowFilters('showHide'))}
          >Filters <Funnel size={16} /></button>
        </div>

      </div>
    </div>
  )
}

export default SortSection;
