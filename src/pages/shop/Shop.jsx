import React, { useEffect, useState } from 'react'
import FilterSection from '../../components/filterSection/FilterSection';
import ProductList from '../../components/productList/ProductList';
import SortSection from '../../components/sort/SortSection';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
import { setCurrentPage } from '../../features/pagination/pagination';

const Shop = () => {

  const dispatch = useDispatch();
  const { category } = useParams();
  const [gridView, setGridView] = useState(true);
  const { showFilters } = useSelector(state => state.sidebar);
  const { isLoading } = useSelector((state) => state.product_data);
  const { searchInputValue } = useSelector(state => state.filterData);


  const filterProduct = useSelector((state) => state.filterData.data);
  const { categoryBtnValue } = useSelector((state) => state.filterData);




  useEffect(() => {
    if (category) {
      dispatch(fetchCategoryWiseData(category));
      dispatch(setCategoryBtnValue(category));
      dispatch(setCurrentPage(1))
    }
  }, [])


  if (isLoading) return (
    <div className='py-52 flex justify-center items-center'>
      <div className="loader"></div>
    </div>
  )

  return (
    <div>
      {/* <h1 className='text-5xl max-w-[90%] mx-auto px-4 py-4'>All Products</h1> */}
      {/* number of products available  */}
      <div>
        {searchInputValue && searchInputValue.length > 1 ? (
          <div className='text-center text-xl'>
            <p>
              Search result for <span className='font-bold text'> "{searchInputValue}" </span>
            </p>
          </div>
        ) : (
          <div className='uppercase  text-center xs:text-2xl md:pb-10 md:mt-0 mt-5 font-thin px-2 font-sans '>
            Total
            <span className='font-bold  text-[var(--themeColor)] '> {filterProduct?.length} </span>
            <span className='font-bold  text-[var(--themeColor)] tracking-wide'> {categoryBtnValue.toLowerCase() === 'all' ? '' : `${categoryBtnValue}`}</span> Products Available
          </div>
        )}


      </div>
      {/* number of products available  */}

      <div className={`max-w-[90%] mx-auto mt-5 flex md:flex-row flex-col `}>
        <div className={` filters-container ${showFilters ? 'active' : ''}`}>
          <FilterSection />
        </div>

        <section className=" md:w-[80%] w-[100%] mx-auto">
          <div className="">
            <SortSection gridView={gridView} setGridView={setGridView} />

          </div>
          <div className="">
            <ProductList gridView={gridView} />

          </div>
        </section>
      </div>
    </div>
  )


};

export default Shop;




