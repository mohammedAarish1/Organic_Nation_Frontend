import React, { useState, useEffect, useRef } from 'react';
import { FaSort, FaSync, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { generateInvoice, getOrdersByStatus, getTotalOrders, updateOrderStatus, updatePaymentStatus, updateReturnStatus } from '../../features/admin/adminData';
import { ImSpinner9 } from 'react-icons/im';
import Alert from '../alert/Alert';
import { useNavigate } from 'react-router-dom';
import { handleDocumentDeleteFromDatabase } from '../../helper/helperFunctions';
import { toast } from 'react-toastify';
import AdminReturnItemImages from './AdminReturnItemImages';



const AdminReturnItemList = ({ returns }) => {
    const dispatch = useDispatch();
    const [sortedOrders, setSortedOrders] = useState([]);
    const [curStatusAndId, setCurStatusAndId] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const [sortDirection, setSortDirection] = useState('desc');
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const ordersPerPage = 4;
    const modalRef = useRef();
    const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
    const {  loading } = useSelector(state => state.adminData);


    useEffect(() => {
        sortAndFilterOrders();
    }, [returns, sortDirection, searchTerm]);

    const sortAndFilterOrders = () => {
        let filtered = returns ? [...returns] : [];

        // Filter orders based on search term
        if (searchTerm) {
            filtered = filtered.filter(order =>
                order.receiverDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.receiverDetails.phoneNumber.includes(searchTerm) ||
                order.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.orderNo.toLowerCase().includes(searchTerm.toLowerCase())
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

    const handleReturnDetails = (order) => {
        setSelectedReturn(order);
    };


    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setSelectedReturn(null);
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
    const currentReturns = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);





    const hideAlert = () => {
        setCurStatusAndId('')
        setIsAlertOpen(false);

    };



    // for changing order  status locally
    const handleStatusChange = (returnId, status) => {
        setCurStatusAndId({ returnId, status })
        setIsAlertOpen(true)
    }

    const handleDelete = () => {
        handleDocumentDeleteFromDatabase('orders', curStatusAndId.orderId, dispatch, getTotalOrders)
        setIsAlertOpen(false);

    }

    // for changing order and payment  status in database
    const updateUserReturnStatus = () => {

       
            dispatch(updateReturnStatus(curStatusAndId))
                .then(res => {
                    if (res.meta.requestStatus === 'fulfilled') {
                        setIsAlertOpen(false);
                        toast.info('Updated Successfully')

                    }
                })
        

    }

    // for fetching new orders
    const handleRefreshOrders = () => {
        if (adminToken) {
            dispatch(getTotalOrders())
        }
    }

 


    return (

        <div className="  p-4 w-full text-sm">
            <div className="flex justify-between items-center mb-4 ">
                <h2 className="text-2xl font-bold">Returns</h2>
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
                <button onClick={handleRefreshOrders} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    <FaSync className={`${loading && 'animate-spin'}`} />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-[var(--bgColorPrimary)] text-white">
                        <tr>
                            <th className="p-3">
                                <input type="checkbox" className="form-checkbox" />
                            </th>
                            {['Invoice Number', 'Item Name', 'Weight', 'Quantity', 'Return Status', 'Requested for', 'Date'].map((header) => (
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
                        {currentReturns.map((curReturn) => (
                            <tr key={curReturn._id} className="border-b hover:bg-gray-100">

                                <td className="p-3">
                                    <input type="checkbox" className="form-checkbox" />
                                </td>
                                <td className="p-3">{curReturn.invoiceNumber}</td>
                                <td className="p-3">{curReturn.itemName}</td>
                                {/* <td className="p-3">{curReturn.userEmail}</td> */}
                                <td className="p-3">{curReturn.weight}</td>
                                <td className="p-3">{curReturn.quantity}</td>
                                <td className="p-3">{curReturn.returnStatus}</td>
                                <td className="p-3">₹ {curReturn.returnOptions}</td>
                                <td className="p-3">{new Date(curReturn.createdAt).toLocaleDateString()}</td>
                                <td className="p-3">
                                    <div className="flex justify-end items-center gap-5 ">
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => handleReturnDetails(curReturn)}
                                                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
                                            >
                                                Return Details
                                            </button>
                                            <div className='flex items-center gap-2'>
                                            <div>
                                                <AdminReturnItemImages images={curReturn.images}/>
                                            </div>
                                            <div>
                                                <a href={curReturn.video} target='_blank' className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors '>Show Video</a>
                                            </div>
                                            </div>
                                           
                                            {/* ============== order status ==========  */}
                                            <div className='flex justify-between items-center gap-2' >
                                                <label htmlFor="">Return Status:</label>
                                                <select
                                                    value={curReturn.returnStatus}
                                                    onChange={(e) => handleStatusChange(curReturn._id, e.target.value)}
                                                    className="border rounded p-1"
                                                >
                                                    <option value="requested">Requested</option>
                                                    <option value="rejected">Rejected</option>
                                                    <option value="inProgress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </div>
                                           
                                        </div>
                                        <button
                                            onClick={(e) => handleStatusChange(curReturn._id, '')}
                                            className=" text-red-500 py-1 rounded hover:text-red-800"
                                        >
                                            <MdDeleteForever className="text-2xl" />
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

            {selectedReturn && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div ref={modalRef} className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Return Details</h2>
                        <p><strong>Reason of Return:</strong> {selectedReturn.reason}</p>
                        <p><strong>Invoice No:</strong> {selectedReturn.invoiceNumber}</p>
                        <p><strong>Item Name:</strong> {selectedReturn.itemName}</p>
                        <p><strong>Weight:</strong> {selectedReturn.weight}</p>
                        <p><strong>Quantity:</strong> {selectedReturn.quantity}</p>
                        {/* <p><strong>Return Status Address:</strong> {selectedReturn.billingAddress}</p> */}
                        <p><strong>Requested For:</strong> {selectedReturn.returnOptions}</p>
                        <p><strong>Return Status:</strong> {selectedReturn.returnStatus}</p>
                        {/* <p><strong>Total:</strong> ₹ {selectedReturn.subTotal + selectedReturn.shippingFee}</p> */}
                        {/* <h3 className="text-xl font-bold mt-4 mb-2">Order Items:</h3>
                        <ul>
                            {selectedOrder.orderDetails.map((item) => (
                                <li key={item.id}>Item:{item['name-url']}, Quantity:{item.quantity}, Weight:{item.weight} </li>
                            ))}
                        </ul>
                        <button
                            className="flex justify-center items-center gap-1 mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() => handleInvoiceGeneration(selectedOrder._id)}
                        >
                            {!generatingInvoice ? ' Generate Invoice' : <ImSpinner9 className='animate-spin' />}
                        </button> */}
                    </div>
                </div>
            )}

          

            {/* alert for changing order status and delete the order */}
            <Alert
                isOpen={isAlertOpen}
                alertMessage={
                    curStatusAndId.status === '' ?
                        `Are you sure, do you really want to delete this ?` :
                        `Do you want to update the order status to ${curStatusAndId.status}`
                }
                hideAlert={hideAlert}
                handleAction={curStatusAndId.status === '' ? handleDelete : updateUserReturnStatus}
            />

        </div>

    );
};

export default AdminReturnItemList;

