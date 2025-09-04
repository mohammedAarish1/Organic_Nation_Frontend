import ProductList from '../productList/ProductList';
import { useSelector } from 'react-redux';




const SearchedProduct = () => {

    const { searchInputValue } = useSelector(state => state.filterData);


    return (
        <div className='bg-[var(--background-color)]'>

            {searchInputValue !== '' && (
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
            )}

        </div>
    )
}

export default SearchedProduct;
