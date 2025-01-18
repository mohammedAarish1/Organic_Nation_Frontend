import React, { useState } from 'react';
import Product from '../../components/product/Product'
import { useSelector } from 'react-redux';
import Pagination from '../pagination/Pagination';


const ProductList = ({ gridView }) => {

  const { isLoading, isError, } = useSelector((state) => state.product_data)
  const filterProduct = useSelector((state) => state.filterData.data)
  const { currentPage } = useSelector((state) => state.pagination)

  // pagination logic 

  const [postPerPage, setPostPerPage] = useState(9);

  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const currentPageData = filterProduct?.slice(firstIndex, lastIndex);


  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>Something went wrong</h1>

  return (
    <div className=' mt-5  '>
      <div
        className={`${gridView && "flex-row  items-center"} flex flex-wrap justify-center sm:gap-10 xs:gap-2 gap-x-1 gap-y-8 py-2 xs:py-8`}
        // className={`products-grid bg-gray-200`}
      >
        {currentPageData?.map((product) => (
          <Product gridView={gridView} key={product._id} product={product} />
        ))}

        {filterProduct.length === 0 && (
          <p className='text-6xl  py-11'>0 results</p>
        )}
      </div>
      <div className=' my-20 py-2'>
        <Pagination totalPost={filterProduct?.length} postPerPage={postPerPage} />
      </div>
    </div>
  )
}

export default ProductList;
