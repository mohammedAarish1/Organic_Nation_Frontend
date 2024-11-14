import React, { useState, useEffect, useRef } from 'react';
import { FaSort, FaSync, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { generateInvoice, getOrdersByStatus, getTotalOrders, updateOrderStatus, updatePaymentStatus } from '../../features/admin/adminData';
import { ImSpinner9 } from 'react-icons/im';
import Alert from '../alert/Alert';
import { fetchAdminData } from '../../features/admin/adminSlice';
import { useNavigate } from 'react-router-dom';
import { address, handleDocumentDeleteFromDatabase } from '../../helper/helperFunctions';
import ReportGenerator from './ReportGenerator';
import { toast } from 'react-toastify';



const AdminOrderList = ({ orders }) => {
    const dispatch = useDispatch();
    const [sortedOrders, setSortedOrders] = useState([]);
    const [curStatusAndId, setCurStatusAndId] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const [sortDirection, setSortDirection] = useState('desc');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const ordersPerPage = 4;
    const modalRef = useRef();
    const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
    const { generatingInvoice, loading } = useSelector(state => state.adminData);

    useEffect(() => {
        sortAndFilterOrders();
    }, [orders, sortDirection, searchTerm]);

    const sortAndFilterOrders = () => {
        let filtered = orders ? [...orders] : [];

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

    const handleOrderDetails = (order) => {
        setSelectedOrder(order);
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
    const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);





    const hideAlert = () => {
        setCurStatusAndId('')
        setIsAlertOpen(false);

    };



    // for changing order  status locally
    const handleStatusChange = (orderId, status) => {
        setCurStatusAndId({ orderId, status })
        setIsAlertOpen(true)
    }

    const handleDelete = () => {
        handleDocumentDeleteFromDatabase('orders', curStatusAndId.orderId, dispatch, getTotalOrders)
        setIsAlertOpen(false);

    }

    // for changing order and payment  status in database
    const updateUserOrderStatus = (deliveryDate) => {
        if (curStatusAndId.status === 'paid' || curStatusAndId.status === 'pending') {
            dispatch(updatePaymentStatus(curStatusAndId))
                .then(res => {
                    if (res.meta.requestStatus === 'fulfilled') {
                        setIsAlertOpen(false);
                        toast.info('Updated Successfully')

                    }
                })
        } else {
            const payload={...curStatusAndId,deliveryDate:deliveryDate||null}
            dispatch(updateOrderStatus(payload))
                .then(res => {
                    if (res.meta.requestStatus === 'fulfilled') {
                        setIsAlertOpen(false)
                        toast.info('Updated Successfully')

                    }
                })
        }

    }

    // for fetching new orders
    const handleRefreshOrders = () => {
        if (adminToken) {
            dispatch(getTotalOrders())
        }
    }

    const handleInvoiceGeneration = (orderId) => {

        dispatch(generateInvoice(orderId))
            .unwrap()
        // .then(() => {
        //     console.log('Invoice generated and download initiated');
        // })
        // .catch((error) => {
        //     console.error('Failed to generate invoice:', error);
        // });
    }

    // if (orders.length === 0) return <div>loading..</div>


    return (

        <div className="  p-4 w-full text-sm font-sans">
            <div className="flex justify-between items-center mb-4 ">
                <h2 className="text-2xl font-bold">Orders</h2>
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
                <table className="min-w-full shadow-md rounded-lg">
                    <thead className="bg-[var(--bgColorPrimary)] text-white">
                        <tr>
                            <th className="p-3">
                                <input type="checkbox" className="form-checkbox" />
                            </th>
                            {['Receiver', 'Phone', 'Order No', 'Payment Status', 'Order Status', 'Total', 'Date'].map((header) => (
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
                        {currentOrders.map((order) => (
                            <tr key={order._id} className="border-b hover:bg-gray-100">

                                <td className="p-3">
                                    <input type="checkbox" className="form-checkbox" />
                                </td>
                                <td className="p-3">{order.receiverDetails.name}</td>
                                <td className="p-3">{order.receiverDetails.phoneNumber}</td>
                                {/* <td className="p-3">{order.userEmail}</td> */}
                                <td className="p-3">{order.invoiceNumber}</td>
                                <td className="p-3">{order.paymentStatus.toUpperCase()}</td>
                                <td className="p-3">{order.orderStatus}</td>
                                <td className="p-3">₹ {order.subTotal + order.shippingFee}</td>
                                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="p-3">
                                    <div className="flex justify-end items-center gap-5 ">
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => handleOrderDetails(order)}
                                                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-800"
                                            >
                                                Order Details
                                            </button>
                                            {/* ============== order status ==========  */}
                                            <div className='flex justify-between items-center gap-2' >
                                                <label htmlFor="">Order Status:</label>
                                                <select
                                                    value={order.orderStatus}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    className="border rounded p-1"
                                                >
                                                    <option value="active">Active</option>
                                                    <option value="dispatched">Dispatched</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                            {/* ============== payment status ==========  */}
                                            <div className='flex justify-between items-center gap-2'>
                                                <label htmlFor="">Payment Status:</label>
                                                <select
                                                    value={order.paymentStatus}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                    className="border rounded p-1"
                                                >
                                                    <option value="paid">PAID</option>
                                                    <option value="pending">PENDING</option>

                                                </select>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => handleStatusChange(order._id, '')}
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

            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div ref={modalRef} className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                        <p><strong>Order No:</strong> {selectedOrder.orderNo}</p>
                        <p><strong>Receiver:</strong> {selectedOrder.receiverDetails.name}</p>
                        <p><strong>Phone:</strong> {selectedOrder.receiverDetails.phoneNumber}</p>
                        <p><strong>Email:</strong> {selectedOrder.userEmail}</p>
                        <p><strong>Billing Address:</strong> {address(selectedOrder.billingAddress)}</p>
                        <p><strong>Shipping Address:</strong> {address(selectedOrder.shippingAddress)}</p>
                        <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                        <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                        <p><strong>Order Status:</strong> {selectedOrder.orderStatus}</p>
                        <p><strong>Sub Total:</strong> ₹ {selectedOrder.subTotal}</p>
                        <p><strong>Shipping Fee:</strong> {selectedOrder.shippingFee === 0 ? 'FREE' : '₹' + selectedOrder.shippingFee}</p>
                        <p><strong>Total:</strong> ₹ {selectedOrder.subTotal + selectedOrder.shippingFee}</p>
                        <h3 className="text-xl font-bold mt-4 mb-2">Order Items:</h3>
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
                        </button>
                    </div>
                </div>
            )}

            <div>
                <ReportGenerator />
            </div>

            {/* alert for changing order status and delete the order */}
            <Alert
                isOpen={isAlertOpen}
                alertMessage={
                    curStatusAndId.status === '' ?
                        `Are you sure, do you really want to delete this ?` :
                        `Do you want to update the order status to ${curStatusAndId.status}`
                }
                hideAlert={hideAlert}
                handleAction={curStatusAndId.status === '' ? handleDelete : updateUserOrderStatus}
                updatingOrderStatus={curStatusAndId.status ==='completed'}
            />

        </div>

    );
};

export default AdminOrderList;