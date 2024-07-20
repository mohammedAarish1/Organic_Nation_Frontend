import React, { useEffect, useState } from 'react'
import FilterSection from '../../components/filterSection/FilterSection';
import ProductList from '../../components/productList/ProductList';
import SortSection from '../../components/sort/SortSection';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { fetchCategoryWiseData, setCategoryBtnValue } from '../../features/filter/filterSlice';
import { setCurrentPage } from '../../features/pagination/pagination';

const Shop = () => {

  const dispatch = useDispatch();
  const { category } = useParams();
  const [gridView, setGridView] = useState(true);
  const { showFilters } = useSelector(state => state.sidebar);
  const { isLoading } = useSelector((state) => state.product_data);




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




