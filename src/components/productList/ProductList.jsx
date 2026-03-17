import  { lazy, Suspense, useState } from 'react';
import Product from '../../components/product/Product'
import { useSelector } from 'react-redux';
// import Pagination from '../pagination/Pagination';
import Loader from '../../components/common/Loader'
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowDownNarrowWide, ArrowLeft } from 'lucide-react';

// const Pagination = lazy(() => import('../pagination/Pagination'))

const ProductList = ({ gridView }) => {

  const { filteredProducts, loading } = useSelector((state) => state.filterData)
  // const { currentPage } = useSelector((state) => state.pagination)
  
  // const [postPerPage, setPostPerPage] = useState(9);
  // const lastIndex = currentPage * postPerPage;
  // const firstIndex = lastIndex - postPerPage;
  // const currentPageData = filteredProducts?.slice(firstIndex, lastIndex);
  
  const [visibleCount, setVisibleCount] = useState(9);

  const currentPageData = filteredProducts?.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  if (loading) return <h1>Loading...</h1>

  return (
    <div className=' mt-5  '>
      {/* <div className='text-center font-thin px-2 font-sans'>
        <p className="text-[var(--text-color)] font-medium">
          Showing {filteredProducts?.length} product(s)
        </p>
      </div> */}
      <div
        className={`${gridView && "flex-row  items-center"} flex flex-wrap justify-center sm:gap-10 xs:gap-2 gap-x-6 gap-y-8 py-2`}
      // className={`products-grid bg-gray-200`}
      >
        {currentPageData?.map((product) => (
          <Product gridView={gridView} key={product._id} product={product} />
        ))}

        {filteredProducts?.length === 0 && !loading && (
          // <p className='text-6xl  py-11'>No result for your search</p>
          // <Loader height="100px" />
          <div className='flex flex-col justify-center items-center gap-10 text-2xl py-10'>
            <p>
              No result for your search
            </p>
            <div className='flex justify-center items-center mb-3 lg:w-[80%] w-[90%] mx-auto '>
              <div>
                <Link to="/shop/all" className=" flex underline-hover text-[var(--text-color)] hover:text-orange-500 justify-center items-center gap-2 py-1   font-semibold rounded-lg  uppercase "> <ArrowLeft /><span className='text-sm sm:text-[16px]'>Continue Shopping</span></Link>
              </div>
            </div>
          </div>
        )}
        {loading && (
          <Loader height="100px" />
        )}
      </div>
      {/* <div className=' my-20 py-2'>
        <Suspense fallback={<Loader height="10px" />}>
          <Pagination totalPost={filteredProducts?.length} postPerPage={postPerPage} />
        </Suspense>
      </div> */}

        {visibleCount < filteredProducts?.length && (
        <div className="flex justify-center sm:my-10 my-5">
          <button
            onClick={handleViewMore}
            className="sm:px-6 px-2 py-2 bg-[var(--alert-color)] text-white rounded-md hover:bg-orange-600 transition"
          >
            <span className='flex items-center gap-2'>View More Products <ArrowDown size={18} /> </span>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductList;
