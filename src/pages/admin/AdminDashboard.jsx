import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getResourcesCount } from '../../features/admin/adminData';
// import AdminBulkEmail from './AdminBulkEmail';


const StatBox = ({ value, title, onClick }) => (
  <div
    className="cursor-pointer flex justify-center flex-col text-[var(--themeColor)] hover:scale-90 duration-300 shadow-md rounded-md p-4 lg:w-1/5 md:w-1/3 w-full h-36 hover:opacity-85"
    onClick={onClick}
  >
    <p className="text-4xl font-bold">{value}</p>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
  </div>
);


const AdminDashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resourcesCount, loading } = useSelector(state => state.adminData);
  // const products = useSelector((state) => state.filterData.products);

  const { orderCount, productCount, returnCount, queryCount, userCount } = resourcesCount;

  useEffect(() => {
    dispatch(getResourcesCount())
  }, [])
  if (loading) return <div>Loading..</div>

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  const stats = [
    {
      value: userCount,
      title: 'Total Users',
      path: '/admin/users',
    },
    {
      value: orderCount,
      title: 'Total Orders',
      path: '/admin/orders',
    },
    {
      value: queryCount,
      title: 'Total Queries',
      path: '/admin/queries',
    },
    {
      value: productCount,
      title: 'Total Products',
      path: '/admin/products',
    },
    {
      value: returnCount,
      title: 'Total Returns',
      path: '/admin/returns',
    },
  ];

  return (
    <div>
      {/* Boxes */}
      <div className="flex justify-center items-start gap-5 flex-wrap w-full">
        {stats.map((stat, index) => (
          <StatBox
            key={index}
            value={stat.value}
            title={stat.title}
            onClick={handleNavigate(stat.path)}
          />
        ))}
      </div>
      {/* <div>
        <AdminBulkEmail/>
      </div> */}
    </div>

  );
};

export default AdminDashboard;
