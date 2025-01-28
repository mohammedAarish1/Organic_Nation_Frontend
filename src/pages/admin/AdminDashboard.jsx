import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate()
  const { totalOrders, loading, totalUsers, totalUserQueries } = useSelector(state => state.adminData);
  const  products  = useSelector((state) => state.filterData.products);


  if (loading) return <div>Loading..</div>

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  const stats = [
    {
      value: totalUsers?.length,
      title: 'Total Users',
      path: '/admin/users',
    },
    {
      value: totalOrders.length,
      title: 'Total Orders',
      path: '/admin/orders',
    },
    {
      value: totalUserQueries.length,
      title: 'Total Queries',
      path: '/admin/queries',
    },
    {
      value: products.length,
      title: 'Total Products',
      path: '/admin/products',
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
    </div>

  );
};

export default AdminDashboard;
