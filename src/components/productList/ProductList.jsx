import React, { lazy, Suspense, useState } from 'react';
import Product from '../../components/product/Product'
import { useSelector } from 'react-redux';
// import Pagination from '../pagination/Pagination';
import Loader from '../../components/common/Loader'

const Pagination = lazy(() => import('../pagination/Pagination'))

const ProductList = ({ gridView }) => {

  const {filteredProducts,loading} = useSelector((state) => state.filterData)
  const { currentPage } = useSelector((state) => state.pagination)



  const [postPerPage, setPostPerPage] = useState(9);

  const lastIndex = currentPage * postPerPage;
  const firstIndex = lastIndex - postPerPage;
  const currentPageData = filteredProducts?.slice(firstIndex, lastIndex);


  if (loading) return <h1>Loading...</h1>

  return (
    <div className=' mt-5  '>
      <div
        className={`${gridView && "flex-row  items-center"} flex flex-wrap justify-center sm:gap-10 xs:gap-2 gap-x-1 gap-y-8 py-2 xs:py-8`}
      // className={`products-grid bg-gray-200`}
      >
        {currentPageData?.map((product) => (
          <Product gridView={gridView} key={product._id} product={product} />
        ))}

        {filteredProducts?.length === 0 && !loading && (
          <p className='text-6xl  py-11'>0 results</p>
          // <Loader height="100px" />
        )}
        {loading && (
          <Loader height="100px" />
        )}
      </div>
      <div className=' my-20 py-2'>
        <Suspense fallback={<Loader height="10px" />}>
          <Pagination totalPost={filteredProducts?.length} postPerPage={postPerPage} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductList;
