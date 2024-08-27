import React, { useState, useEffect, useRef } from 'react';
import { FaSort, FaSync, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const AdminQueries = () => {
  const dispatch = useDispatch()
  const { totalUserQueries, loading } = useSelector(state => state.adminData)
  const [sortedOrders, setSortedOrders] = useState([]);
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const ordersPerPage = 8;
  const modalRef = useRef();



  // useEffect(() => {
  //     sortOrders();
  // }, [order, sortDirection]);

  // const sortOrders = () => {
  //     const sorted = [...order].sort((a, b) => {
  //         const dateA = new Date(a.createdAt);
  //         const dateB = new Date(b.createdAt);
  //         return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
  //     });
  //     setSortedOrders(sorted);
  // };

  useEffect(() => {
    sortAndFilterOrders();
  }, [totalUserQueries, sortDirection, searchTerm]);

  const sortAndFilterOrders = () => {
    let filtered = totalUserQueries ? [...totalUserQueries] : [];

    // Filter orders based on search term
    if (searchTerm) {
      filtered = filtered.filter(query =>
        query.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.email.includes(searchTerm) ||
        query.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        query.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort filtered orders
    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setSortedOrders(sorted);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleSort = () => {
    setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
  };



  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setSelectedOrder(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentQueries = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  if (loading) return <div>Loading..</div>
  return (

    <div className="  p-4 w-full">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-2xl font-bold">Queries</h2>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-2 py-1 border rounded"
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        {/* <button onClick={onRefresh} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    <FaSync />
                </button> */}
      </div>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">
                <input type="checkbox" className="form-checkbox" />
              </th>
              {['Full Name', 'Email', 'Phone No', 'City', 'Date'].map((header) => (
                <th key={header} className="p-3 text-left">
                  <div className="flex items-center">
                    {header}
                    {header === 'Created At' && (
                      <button onClick={handleSort} className="ml-1">
                        <FaSort />
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentQueries.map((query) => (
              <tr key={query._id} className="border-b hover:bg-gray-100">
                <td className="p-3">
                  <input type="checkbox" className="form-checkbox" />
                </td>
                <td className="p-3">{query.fullName}</td>
                <td className="p-3">{query.email}</td>
                <td className="p-3">{query.phoneNumber}</td>
                <td className="p-3">{query.city}</td>
                <td className="p-3">{new Date(query.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                                    <div className="flex flex-col space-y-2">
                                        <button
                                            // onClick={() => handleOrderDetails(user)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        >
                                           Delete
                                        </button>
                                        {/* <select
                                            value={user.orderStatus}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="border rounded p-1"
                                        >
                                            <option value="active">Active</option>
                                            <option value="dispatch">Dispatch</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select> */}
                                    </div>
                                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        {[...Array(totalPages).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {number + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>


    </div>

  );
};

export default AdminQueries;







