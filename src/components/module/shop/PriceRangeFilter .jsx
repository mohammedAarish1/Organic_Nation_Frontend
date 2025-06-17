import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  // filterBasedOnPrice,
  getFilteredData,
  setSelectedRanges
} from '../../../features/filter/filterSlice';
import { setShowFilters } from '../../../features/toggleSidebar/toggleSidebar';

// A functional component for the sorting logic based on price ranges
const PriceRangeFilter = ({ isMobile }) => {
  const dispatch = useDispatch()
  // const [selectedRanges, setSelectedRanges] = useState([]);
  const { selectedRanges } = useSelector(state => state.filterData)

  // Define price ranges
  const priceRanges = [
    { label: 'Under Rs. 100', value: 'under_100', min: 0, max: 100 },
    { label: 'Rs. 100 - Rs. 200', value: '100-200', min: 100, max: 200 },
    { label: 'Rs. 200 - Rs. 400', value: '200-400', min: 200, max: 400 },
    { label: 'Rs. 400 - Rs. 600', value: '400-600', min: 400, max: 600 },
    { label: 'Rs. 600 and above', value: '600+', min: 600, max: Infinity },
  ];



  const handleCheckboxChange = (rangeValue) => {
    const updatedRanges = selectedRanges.includes(rangeValue)
      ? selectedRanges.filter((range) => range !== rangeValue)
      : [...selectedRanges, rangeValue];

    dispatch(setSelectedRanges(updatedRanges)); // Dispatch the updated ranges to Redux
    dispatch(getFilteredData({ type: 'PRICE', value: priceRanges }))
    if (isMobile) {
      dispatch(setShowFilters('hide'))
    }


  };


  // useEffect(() => {
  //   dispatch(getFilteredData({ type: 'PRICE', value: priceRanges }))
  // }, [selectedRanges])

  return (
    <div>
      <h2 className='text-xl xs:text-gray-800 text-gray-300 mb-2'>Price</h2>
      <div>
        {priceRanges.map((range) => (
          <div key={range.value}>
            <input
              type="checkbox"
              id={range.value}
              value={range.value}
              checked={selectedRanges?.includes(range.value)}
              onChange={() => handleCheckboxChange(range.value)}
            />
            <label className=' xs:text-[var(--text-color)] text-white' htmlFor={range.value}> {range.label}</label>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PriceRangeFilter;
