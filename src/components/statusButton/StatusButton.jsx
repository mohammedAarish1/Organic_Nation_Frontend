import { useDispatch, useSelector } from 'react-redux';
import {  Box, ChevronDown } from 'lucide-react';

const StatusButton = ({ title, color, curStatus, length,action }) => {
    const dispatch = useDispatch();
    const {  ordersByStatus } = useSelector(
      (state) => state.adminData
    );
  
    return (
      <div
        className={`${ ordersByStatus.orderStatusTab === curStatus && `border-${color} border-[1px]`} flex justify-start items-center xs:gap-3 rounded-lg  max-w-max sm:pr-6 pr-1 pl-2 xs:py-2 cursor-pointer shadow-sm shadow-${color}  transition-all duration-500 hover:bg-[var(--hoverEffect)]`}
        onClick={() => dispatch(action(curStatus))}
      >
        <div className="sm:block hidden bg-[#EEF2FF] md:p-4 p-2 rounded-full">
          <Box className={`text-2xl text-${color}`} />
        </div>
        <div>
          <p className="font-semibold lg:text-[22px] xs:text-xl max-w-max">
            {length}
          </p>
          <p className="text-gray-600 tracking-wider lg:text-[16px] xs:text-xs text-[10px]">
           {title}
          </p>
        </div>
        <div className="sm:hidden block bg-[#EEF2FF] md:p-5 xs:p-2 rounded-full">
          <ChevronDown />
        </div>
      </div>
    );
  };

export default StatusButton;
