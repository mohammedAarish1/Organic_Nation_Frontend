import React, { lazy, Suspense } from 'react'
// import UserInformation from './UserInformation';
// import UserAddresses from './UserAddresses';
import { useParams } from 'react-router-dom';
import Loader from '../common/Loader';
// import UserCoupons from './UserCoupons';

const UserInformation = lazy(() => import('./UserInformation'))
const UserAddresses = lazy(() => import('./UserAddresses'))
const UserCoupons = lazy(() => import('./UserCoupons'))

const ProfileMainSection = ({ activeMenu }) => {


    const { id } = useParams()

    const renderContent = () => {
        switch (id) {
            case 'personal-info':
                return <UserInformation />;
            case 'addresses':
                return <UserAddresses />;
            case 'coupons':
                // Handle logout logic here
                return <UserCoupons />;
            default:
                return <UserInformation />;
        }
    };

    return (
        <Suspense fallback={<Loader height='200px' />}>
            {renderContent()}
        </Suspense>
    )
}

export default ProfileMainSection;
