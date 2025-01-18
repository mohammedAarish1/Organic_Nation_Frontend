import { memo } from "react";
import { Link } from "react-router-dom";
// icons
import { LuUserCircle } from "react-icons/lu";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { PiKeyReturnFill } from "react-icons/pi";
import { RiLogoutCircleLine } from "react-icons/ri";


const USER_MENU_ITEMS = [
    {
      id: 'profile',
      label: 'Personal Information',
      description: 'Manage your personal details',
      icon: LuUserCircle,
      path: '/profile/personal-info',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      id: 'orders',
      label: 'Your Orders',
      description: 'Track and manage orders',
      icon: BsFillBoxSeamFill,
      path: '/manage-orders',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 'returns',
      label: 'Returns & Refunds',
      description: 'Manage your returns',
      icon: PiKeyReturnFill,
      path: '/manage-returns',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    }
  ];


  const UserMenuItem = memo(({ icon: Icon, label, path, onClick }) => (
    <li>
      <Link
        to={path}
        className="flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-all group"
        onClick={onClick}
      >
        <span className="p-2 rounded-lg bg-gray-100 group-hover:bg-white group-hover:text-green-600 transition-colors">
          <Icon className="text-lg" />
        </span>
        <span className="font-medium text-gray-700 group-hover:text-gray-900">{label}</span>
      </Link>
    </li>
  ));

const UserMenu = ({ user, showMenu, menuRef, onLogout }) => (
    <div 
      ref={menuRef}
      className={`
        absolute xs:right-0 -right-16 w-72 mt-2 bg-white rounded-2xl shadow-xl
        border border-gray-100 overflow-hidden
        transition-all duration-300 transform
        ${showMenu 
          ? 'translate-y-0 opacity-100 visible' 
          : 'translate-y-4 opacity-0 invisible'
        }
      `}
    >
      {/* Header Section */}
      <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-indigo-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-2xl font-semibold text-green-600">
              {user.firstName?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 capitalize">{user.firstName || 'User'}</h3>
            <p className="text-sm text-gray-500">{user.phoneNumber || user.email}</p>
          </div>
        </div>
        <div className="h-1 w-12 bg-green-600 rounded-full"></div>
      </div>
  
      {/* Menu Items */}
      <div className="py-2">
        <ul className="divide-y divide-gray-50">
          {USER_MENU_ITEMS.map(item => (
            <UserMenuItem key={item.id} {...item} />
          ))}
        </ul>
      </div>
  
      {/* Footer Section */}
      <div className="px-4 py-3 bg-gray-50">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 
                   rounded-xl bg-white border border-gray-200
                   hover:bg-red-50 hover:border-red-100 hover:text-red-600
                   transition-all duration-300 group"
        >
          <RiLogoutCircleLine className="text-xl group-hover:rotate-180 transition-transform duration-300" />
          <span className="font-medium">Sign out</span>
        </button>
      </div>
    </div>
  );

  export default UserMenu;