import React, { useEffect, useState } from 'react';
import { FaBars, FaHome, FaShoppingCart, FaUserAlt, FaChartLine, FaCog } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { VscAccount } from 'react-icons/vsc';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import AdminSidebar from './AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminData } from '../../features/admin/adminSlice';
import { getOrdersByStatus, getTotalOrders } from '../../features/admin/adminData';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: 'Jan', users: 400, orders: 240, queries: 80 },
  { name: 'Feb', users: 450, orders: 280, queries: 90 },
  { name: 'Mar', users: 500, orders: 320, queries: 100 },
  { name: 'Apr', users: 550, orders: 360, queries: 110 },
  { name: 'May', users: 600, orders: 400, queries: 120 },
  { name: 'Jun', users: 650, orders: 440, queries: 130 },
];

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const adminToken = JSON.parse(sessionStorage.getItem('adminToken'))
  const { totalOrders, loading, totalUsers, totalUserQueries, ordersByStatus } = useSelector(state => state.adminData);
  const { isLoading, productData } = useSelector((state) => state.product_data);




  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };



  // useEffect(() => {
  //   if (adminToken) {
  //     dispatch(getTotalOrders(adminToken))
  //     dispatch(getOrdersByStatus("total"))
  //   }
  // }, [adminToken,dispatch])

  // if (loading) return <div>Loading...</div>


  if (loading) return <div>Loading..</div>

  return (
    <div className="">




      {/* Search */}
      {/* <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 bg-gray-200 rounded-md pr-10"
          />
          <BsSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div> */}

      {/* Boxes */}
      <div className="flex  justify-center items-start gap-5 flex-wrap w-full  ">
        <div
          className=" cursor-pointer flex justify-center flex-col text-[var(--themeColor)] hover:scale-90 duration-300 shadow-md rounded-md p-4 lg:w-1/5 md:w-1/3 w-full h-36 hover:opacity-85"
          onClick={() => navigate('/admin/users')}
        >
          <p className="text-4xl font-bold ">{totalUsers?.length}</p>
          <h3 className="text-2xl font-bold mb-2">Total Users</h3>
        </div>
        <div
          className=" cursor-pointer flex justify-center flex-col text-[var(--themeColor)] hover:scale-90 duration-300 shadow-md rounded-md p-4 lg:w-1/5 md:w-1/3 w-full h-36 hover:opacity-85"
          onClick={() => navigate('/admin/orders')}
        >
          <p className="text-4xl font-bold ">{totalOrders.length}</p>
          <h3 className="text-2xl font-bold mb-2">Total Orders</h3>
        </div>
        <div
          className=" cursor-pointer flex justify-center flex-col text-[var(--themeColor)] hover:scale-90 duration-300 shadow-md rounded-md p-4 lg:w-1/5 md:w-1/3 w-full h-36 hover:opacity-85"
          onClick={() => navigate('/admin/queries')}
        >
          <p className="text-4xl font-bold">{totalUserQueries.length}</p>
          <h3 className="text-2xl font-bold mb-2">Total Queries</h3>
        </div>
        <div
          className=" cursor-pointer flex justify-center flex-col text-[var(--themeColor)] hover:scale-90 duration-300 shadow-md rounded-md p-4 lg:w-1/5 md:w-1/3 w-full h-36 hover:opacity-85"
          onClick={() => navigate('/admin/products')}
        >
          <p className="text-4xl font-bold ">{productData.length}</p>
          <h3 className="text-2xl font-bold mb-2">Total Products</h3>
        </div>

      </div>

      {/* Charts */}
      {/* <div className="bg-white shadow-md rounded-md p-4 mb-8">
          <h3 className="text-lg font-bold mb-4">Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#8884d8" />
              <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
              <Line type="monotone" dataKey="queries" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div> */}

      {/* Table */}
      {/* <div className="bg-white shadow-md rounded-md p-4">
          <h3 className="text-lg font-bold mb-4">Users</h3>
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-4 py-2 bg-gray-200 text-left"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="border-b">
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-4 py-2 text-left"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
    </div>

  );
};

export default AdminDashboard;
