import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/common/Loader';

const AdminTable=lazy(()=>import('../../components/admin/common/AdminTable'))

const headers = [
    { key: 'name', label: 'Name' },
    { key: 'weight', label: 'Weight' },
    { key: 'price', label: 'MRP' },
    { key: 'discount', label: 'Discount %' },
    { key: 'availability', label: 'Stock' },
    { key: 'tax', label: 'Tax Rate' }
]

const AdminProducts = () => {
    const  products  = useSelector((state) => state.filterData.products);
  
    return (
        <div>
            <Suspense fallback={<Loader height='200px' />}>
            <AdminTable
                title='Products'
                headers={headers}
                data={products}
            />
            </Suspense>
        </div>
    );
};

export default AdminProducts;

