import React from 'react'
import { getFilteredData, setCategoryBtnValue } from '../../../features/filter/filterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setShowFilters } from '../../../features/toggleSidebar/toggleSidebar';

const SortFilter = ({ isMobile = false }) => {
    const dispatch = useDispatch();
    const { sortValue } = useSelector((state) => state.filterData);

    return (
        <div>
            <select
                id="sort"
                name="sort"
                value={sortValue}
                onChange={(e) => {
                    // setSortValue(e.target.value)
                    dispatch(setCategoryBtnValue('all'))
                    // dispatch(getSortData({ value: e.target.value, products }))
                    dispatch(getFilteredData({ type: 'SORT', value: e.target.value }))
                    if (isMobile) {
                        dispatch(setShowFilters('hide'))

                    }
                }}
                // className="w-auto block border cursor-pointer bg-white border-gray-300 hover:border-gray-500 p-2  leading-tight focus:outline-none"
                className="outline-none block border w-auto max-w-40 xs:max-w-full p-2.5"
            >
                <option defaultValue="sort" >Sort</option>
                <option value="low_to_high">Price: Low to High</option>
                <option value="high_to_low">Price: High to Low</option>
                <option value="a-z">a - z</option>
                <option value="z-a">z - a</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">

            </div>
        </div>
    )
}

export default SortFilter;
