// components/filterSection/FilterSidebar.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { X, SlidersHorizontal } from 'lucide-react';
import {
  getFilteredData,
  setSelectedRanges,
  clearFilters,
  setCategoryBtnValue,
  fetchCategoryWiseData
} from '../../../features/filter/filterSlice';
import { setShowFilters } from '../../../features/toggleSidebar/toggleSidebar';
import { setCurrentPage } from '../../../features/pagination/pagination';

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const { selectedRanges, categoryBtnValue ,categoryList} = useSelector(state => state.filterData);
  const { showFilters } = useSelector(state => state.sidebar);

  // Category list
  // const categoryList = [
  //   { category: 'All Products', categoryUrl: 'all' },
  //   { category: 'Dry Fruits', categoryUrl: 'dry-fruits' },
  //   { category: 'Spices', categoryUrl: 'spices' },
  //   { category: 'Herbs', categoryUrl: 'herbs' },
  //   { category: 'Seeds', categoryUrl: 'seeds' },
  //   { category: 'Oils', categoryUrl: 'oils' },
  //   // Add your categories here
  // ];

  // Price ranges configuration
  const priceRanges = [
    { label: 'Under Rs. 100', value: 'under_100', min: 0, max: 100 },
    { label: 'Rs. 100 - Rs. 200', value: '100-200', min: 100, max: 200 },
    { label: 'Rs. 200 - Rs. 400', value: '200-400', min: 200, max: 400 },
    { label: 'Rs. 400 - Rs. 600', value: '400-600', min: 400, max: 600 },
    { label: 'Rs. 600 and above', value: '600+', min: 600, max: Infinity },
  ];

  // Handle checkbox change
  const handleCheckboxChange = (rangeValue) => {
    const updatedRanges = selectedRanges.includes(rangeValue)
      ? selectedRanges.filter((range) => range !== rangeValue)
      : [...selectedRanges, rangeValue];

    dispatch(setSelectedRanges(updatedRanges));
    dispatch(getFilteredData({ type: 'PRICE', value: priceRanges }));
    
    // Close on mobile after selection
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        dispatch(setShowFilters(false));
      }, 300);
    }
  };

  // Handle category click
  const handleCategoryClick = (curItem) => {
    dispatch(setCurrentPage(1));
    dispatch(setCategoryBtnValue(curItem.categoryUrl));
    dispatch(fetchCategoryWiseData(curItem.categoryUrl.toLowerCase()));
      dispatch(setShowFilters('hide'));
    
    // Close on mobile
    // if (window.innerWidth <= 768) {
    //   dispatch(setShowFilters(false));
    // }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    dispatch(clearFilters());
      dispatch(setShowFilters('hide'));

    // if (window.innerWidth <= 768) {
    //   dispatch(setShowFilters(false));
    // }
  };

  // Prevent body scroll when filter is open on mobile
  useEffect(() => {
    if (showFilters && window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showFilters]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showFilters) {
        dispatch(setShowFilters('hide'));
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showFilters, dispatch]);

  const isOpen = showFilters;

  return (
    <>
      {/* Overlay - visible when filter is open */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => dispatch(setShowFilters('hide'))}
        aria-hidden="true"
      />

      {/* Filter Sidebar */}
      <aside
        className={`
          fixed z-50 bg-white shadow-2xl
          
          /* Mobile: slide from bottom */
          bottom-0 left-0 right-0
          rounded-t-3xl
          max-h-[85vh]
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          
          /* Desktop: slide from left */
          md:top-0 md:left-0 md:bottom-0
          md:w-80 md:max-h-screen
          md:rounded-none md:rounded-r-lg
          ${isOpen ? 'md:translate-x-0' : 'md:-translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-4 md:px-6 py-4 rounded-t-3xl md:rounded-none">
          <div className="flex items-center justify-between">
            <h2 
              id="filter-title"
              className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2"
            >
              <SlidersHorizontal size={24} className="text-[var(--accent-color)]" />
              Filters
            </h2>
            <button
              onClick={() => dispatch(setShowFilters('hide'))}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close filters"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
          
          {/* Mobile drag indicator */}
          <div className="md:hidden w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2" />
        </div>

        {/* Scrollable Content */}
        <div 
          className="overflow-y-auto px-4 md:px-6 py-4 space-y-6" 
          style={{ 
            maxHeight: 'calc(85vh - 140px)',
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          
          {/* Category Filter */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
              Category
            </h3>
            <div className="space-y-2">
              {categoryList.map((curItem, index) => (
                <Link
                  to={`/shop/${curItem.categoryUrl.toLowerCase()}`}
                  key={index}
                  onClick={() => handleCategoryClick(curItem)}
                  className={`
                    block w-full text-left px-4 py-2.5 rounded-lg 
                    transition-all duration-200 font-medium text-sm
                    ${
                      categoryBtnValue === curItem.categoryUrl.toLowerCase()
                        ? 'bg-[var(--accent-color)] text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-[var(--accent-color)] hover:text-white hover:shadow-sm'
                    }
                  `}
                >
                  {curItem.category}
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Price Filter */}
          <div className='pb-10'>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
              Price Range
            </h3>
            <div className="space-y-3">
              {priceRanges.map((range) => (
                <label
                  key={range.value}
                  className="flex items-center gap-3 cursor-pointer group"
                  htmlFor={range.value}
                >
                  <input
                    type="checkbox"
                    id={range.value}
                    value={range.value}
                    checked={selectedRanges?.includes(range.value)}
                    onChange={() => handleCheckboxChange(range.value)}
                    className="w-5 h-5 rounded border-gray-300 text-[var(--accent-color)] 
                             focus:ring-2 focus:ring-[var(--accent-color)] focus:ring-offset-2
                             cursor-pointer transition-all"
                  />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm md:text-base">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Clear Filters Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 md:px-6 py-4">
          <button
            type="button"
            onClick={handleClearFilters}
            className="w-full bg-[var(--alert-color)] hover:bg-red-600 text-white py-3 rounded-lg 
                     flex items-center justify-center gap-2 font-medium transition-colors
                     shadow-md hover:shadow-lg active:scale-98 transform"
          >
            <X size={20} />
            Clear All Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;