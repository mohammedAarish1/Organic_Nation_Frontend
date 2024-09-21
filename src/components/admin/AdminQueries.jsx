import React, { useState, useEffect, useRef } from 'react';
import { FaSort, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserQueries } from '../../features/admin/adminData';
import { handleDocumentDeleteFromDatabase } from '../../helper/helperFunctions';
import Alert from '../alert/Alert';



const AdminQueries = () => {

  const dispatch = useDispatch();
  const { totalUserQueries, loading } = useSelector(state => state.adminData)
  const [curItemId, setCurItemId] = useState(''); // used for  deleting the query from the list
  const [sortedOrders, setSortedOrders] = useState([]);
  const [sortDirection, setSortDirection] = useState('desc');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const ordersPerPage = 8;
  const modalRef = useRef();


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



  const handleQueryMessage = (query) => {
    setSelectedQuery(query);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setSelectedQuery(null);
    }
  };

  const hideAlert = () => {
    setCurItemId('')
    setIsAlertOpen(false);

  };

  const handleDelete = () => {
    handleDocumentDeleteFromDatabase('queries', curItemId, dispatch, getAllUserQueries)
    setIsAlertOpen(false);
  }

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
                    {header === 'Date' && (
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
                      onClick={() => handleQueryMessage(query)}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-800"
                    >
                      View Message
                    </button>
                    <button
                      // onClick={() => handleDocumentDeleteFromDatabase('queries', query._id, dispatch, getAllUserQueries)}
                      onClick={() => {
                        setCurItemId(query._id)
                        setIsAlertOpen(true);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
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

      {selectedQuery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div ref={modalRef} className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            <h4 className='font-semibold'>Message:-</h4>
            <p>{selectedQuery.message}</p>
          </div>
        </div>
      )}


      {/* alert for changing order status  */}
      <Alert
        isOpen={isAlertOpen}
        alertMessage={`Are you sure, do you really want to delete this ?`}
        actionMessageOne='Yes'
        actionMessageTwo='No'
        hideAlert={hideAlert}
        handleAction1={handleDelete}
      />
    </div>

  );
};

export default AdminQueries;







