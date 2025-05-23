import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/common/Loader';

const AdminTable = lazy(() => import('../../components/admin/common/AdminTable'))
const ReportGenerator=lazy(()=>import('../../components/admin/ReportGenerator'))

const headers = [
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone No' },
    { key: 'createdAt', label: 'Date' },
    { key: 'createdAt', label: 'Time' }
]

const AdminUsers = () => {
    const { totalUsers, loading } = useSelector(state => state.adminData);

    if (loading) return <div>Loading..</div>
    return (
        <div>
            <Suspense fallback={<Loader height="200px" />}>
                <AdminTable
                    title='Users'
                    headers={headers}
                    data={totalUsers}
                />
            </Suspense>
            <div>
                <Suspense fallback={<Loader height="200px" />}>
                    <ReportGenerator
                        title='Generate User Report'
                        type='users'
                    />
                </Suspense>

            </div>
        </div>
    );
};

export default AdminUsers;

