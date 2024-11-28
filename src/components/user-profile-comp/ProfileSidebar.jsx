// import { 
//     FiUser, 
//     FiMapPin, 
//     FiPackage, 
//     FiLogOut, 
//     FiMenu,
//     FiX,
//     FiChevronRight
//   } from 'react-icons/fi';



// const ProfileSidebar = ({ activeMenu, setActiveMenu, isMobileMenuOpen, setIsMobileMenuOpen }) => {
//     const menuItems = [
//       { id: 'personal-info', label: 'Personal Information', icon: FiUser },
//       { id: 'addresses', label: 'Manage Addresses', icon: FiMapPin },
//       { id: 'orders', label: 'My Orders', icon: FiPackage },
//       { id: 'logout', label: 'Log Out', icon: FiLogOut },
//     ];
  
//     return (
//       <div className=''>
//         {/* Mobile Menu Button */}
//         <div className="md:hidden fixed top-4 left-4 z-50">
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="p-2 rounded-lg bg-white shadow-lg text-gray-700 hover:bg-gray-50"
//           >
//             {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//           </button>
//         </div>
  
//         {/* Sidebar Content */}
//         <div
//           className={`
//             fixed md:relative top-0 left-0 h-full w-80  shadow-xl md:shadow-md transform 
//             ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
//             md:translate-x-0 transition-transform duration-300 ease-in-out z-10
//           `}
//         >
//           <div className="p-6">
//             <div className="flex items-center gap-3 mb-8">
//               <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
//                 <FiUser className="text-white" size={24} />
//               </div>
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-600">John Doe</h2>
//                 <p className="text-sm text-gray-500">john.doe@example.com</p>
//               </div>
//             </div>
  
//             <nav className="space-y-2">
//               {menuItems.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <button
//                     key={item.id}
//                     onClick={() => {
//                       setActiveMenu(item.id);
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className={`
//                       w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
//                       ${
//                         activeMenu === item.id
//                           ? 'bg-blue-50 text-green-600 shadow-sm'
//                           : 'text-gray-600 hover:bg-gray-50'
//                       }
//                     `}
//                   >
//                     <Icon size={20} />
//                     <span className="font-medium">{item.label}</span>
//                     {activeMenu === item.id && (
//                       <FiChevronRight className="ml-auto" size={18} />
//                     )}
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>
//         </div>
//       </div>
//     );
//   };


//   export default ProfileSidebar;



import React from 'react';
import { 
  FiUser, 
  FiMapPin, 
  FiPackage, 
  FiLogOut, 
  FiMenu,
  FiChevronRight
} from 'react-icons/fi';
import { RiCouponLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";

const ProfileSidebar = ({ activeMenu, setActiveMenu, isMobileMenuOpen, setIsMobileMenuOpen }) => {

  const navigate=useNavigate()
  const { user } = useSelector(state => state.auth)

  const firstName=user?.firstName || 'You'
  const lastName=user?.lastName || ''

  const menuItems = [
    { id: 'personal-info', label: 'Personal Information', icon: FiUser },
    { id: 'addresses', label: 'Manage Addresses', icon: FiMapPin },
    { id: 'orders', label: 'My Orders', icon: FiPackage },
    { id: 'coupons', label: 'Coupons', icon: RiCouponLine },
  ];

  return (
    <div className="relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <div className="w-80 shadow-md">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                <FiUser className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-600">{firstName+''+lastName}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    // onClick={() => }
                    onClick={() => {
                      setActiveMenu(item.id)
                      navigate(item.id==='orders' ? `/manage-orders`:`/profile/${item.id}`)
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${
                        activeMenu === item.id
                          ? 'bg-blue-50 text-green-600 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                    {activeMenu === item.id && (
                      <FiChevronRight className="ml-auto" size={18} />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* ================================ Mobile Dropdown =================================== */}
      <div className="md:hidden flex justify-end">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative  p-2 rounded-lg bg-gray-300 shadow-lg text-gray-700 hover:bg-gray-400 z-50 flex justify-center items-center  gap-2"
        >
          <span className="font-medium">Menu</span>
          <FaAngleDown  className='items-end'  size={20} />
        </button>

        {/* Dropdown Menu */}
        <div
          className={`
            absolute right-2 top-16 w-64 bg-white rounded-lg shadow-xl z-40 overflow-hidden
            transition-all duration-300 ease-in-out transform origin-top
            ${isMobileMenuOpen 
              ? 'opacity-100 scale-y-100 translate-y-0' 
              : 'opacity-0 scale-y-0 -translate-y-4'}
          `}
        >
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                <FiUser className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-600">{firstName+' '+ lastName}</h2>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveMenu(item.id);
                      setIsMobileMenuOpen(false);
                      navigate(item.id==='orders' ? `/manage-orders`:`/profile/${item.id}`)
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
                      ${
                        activeMenu === item.id
                          ? 'bg-blue-50 text-green-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span className="font-medium text-sm">{item.label}</span>
                    {activeMenu === item.id && (
                      <FiChevronRight className="ml-auto" size={16} />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;