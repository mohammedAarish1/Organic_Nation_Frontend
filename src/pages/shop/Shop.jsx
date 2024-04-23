import React, { useState } from 'react'
import FilterSection from '../../components/filterSection/FilterSection';
import ProductList from '../../components/productList/ProductList';
import SortSection from '../../components/sort/SortSection';

const Shop = () => {

  const [gridView,setGridView]=useState(false);

  console.log(gridView)

  return (
    <div className="max-w-[90%] mx-auto mt-5 flex">
    <div className='w-[20%] '>
      <FilterSection />
    </div>

    <section className=" w-[80%]">
      <div className="">
        <SortSection gridView={gridView} setGridView={setGridView} />
        
      </div>
      <div className="">
        <ProductList gridView={gridView} />
        
      </div>
    </section>
  </div>
  )
   
 
};

export default Shop;
