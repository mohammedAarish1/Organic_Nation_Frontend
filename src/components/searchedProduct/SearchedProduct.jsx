import React from 'react';
import ProductList from '../productList/ProductList';
import { useSelector } from 'react-redux';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';




const SearchedProduct = () => {


    const { searchInputValue } = useSelector(state => state.filterData);


    return (
        <div>

            {searchInputValue !== '' ? (
                <div>
                    <div className='text-center text-2xl'>
                        <p>
                            Search result for <span className='font-bold text'> "{searchInputValue}" </span>
                        </p>
                    </div>
                    <div className='px-2  mt-10'>
                        <ProductList gridView={true} />
                    </div>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center gap-10 text-2xl py-10'>
                    <p>
                        No result for your search
                    </p>
                    <div className='flex justify-center items-center mb-3 lg:w-[80%] w-[90%] mx-auto '>
                        <div>
                            <Link to="/shop/all" className=" flex underline-hover text-[var(--bgColorPrimary)] hover:text-orange-500 justify-center items-center gap-2 py-1   font-semibold rounded-lg  uppercase "> <FaArrowLeftLong /><span className='text-sm sm:text-[16px]'>Continue Shopping</span></Link>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default SearchedProduct;
