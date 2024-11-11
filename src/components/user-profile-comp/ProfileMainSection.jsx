import React from 'react'
import UserInformation from './UserInformation';
import UserAddresses from './UserAddresses';
import { useParams } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';


const OrdersSection = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg">
                    <FiPackage className="text-blue-600" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">My Orders</h2>
            </div>
            <div className="text-center py-12">
                <FiPackage size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your order history will appear here</p>
            </div>
        </div>
    );
};


const ProfileMainSection = ({activeMenu}) => {


    const {id}=useParams()

    const renderContent = () => {
        switch (id) {
            case 'personal-info':
                return <UserInformation />;
            case 'addresses':
                return <UserAddresses />;
            case 'orders':
                return <OrdersSection />;
            case 'logout':
                // Handle logout logic here
                return null;
            default:
                return <UserInformation />;
        }
    };

    return (
        <>
            {renderContent()}

        </>
    )
}

export default ProfileMainSection;
