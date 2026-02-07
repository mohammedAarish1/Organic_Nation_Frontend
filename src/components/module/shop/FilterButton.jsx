// components/filterSection/FilterButton.jsx
import { useDispatch, useSelector } from 'react-redux';
import { SlidersHorizontal } from 'lucide-react';
import { setShowFilters } from '../../../features/toggleSidebar/toggleSidebar';

const FilterButton = () => {
  const dispatch = useDispatch();
  const { selectedRanges } = useSelector(state => state.filterData);

  // Count active filters
  const activeFiltersCount = selectedRanges?.length || 0;

  return (
    <button
      onClick={() => dispatch(setShowFilters('showHide'))}
      className="relative flex items-center gap-2 px-4 py-2.5  
                rounded-lg hover:opacity-90 transition-all
               shadow-md active:scale-95 transform font-medium"
      aria-label="Open filters"
    >
      <SlidersHorizontal size={20} />
      <span>Filters</span>
      
      {/* Badge for active filters */}
      {activeFiltersCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
                       w-5 h-5 rounded-full flex items-center justify-center
                       font-bold shadow-md">
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
};

export default FilterButton;