import React, { useState, useEffect, useRef } from 'react';
import { FaSort, FaSync, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner9 } from 'react-icons/im';
import { FiPlusSquare } from "react-icons/fi";
import ProductForm from './ProductForm';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import UploadProductImage from '../UploadProductImage';




const AdminProducts = () => {
    const dispatch = useDispatch();
    const [sortedProducts, setSortedProducts] = useState([]);
    const { isLoading, productData } = useSelector((state) => state.product_data);
    const [sortDirection, setSortDirection] = useState('desc');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const productsPerPage = 8;
    const modalRef = useRef();


    useEffect(() => {
        sortAndFilterOrders();
    }, [productData, sortDirection, searchTerm]);

    const sortAndFilterOrders = () => {
        let filtered = productData ? [...productData] : [];

        // Filter orders based on search term
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.weight.includes(searchTerm.toLowerCase())
                // product.tax.includes(searchTerm) ||
                // product.price.includes(searchTerm)
            );
        }

        // Sort filtered orders
        const sorted = filtered.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });

        setSortedProducts(sorted);
        setCurrentPage(1); // Reset to first page when search changes
    };

    const handleSort = () => {
        setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
    };



    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            // setSelectedOrder(null);
            setIsFormVisible(false)
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);


        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Pagination
    const indexOfLastOrder = currentPage * productsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    // const handleAddClick = () => {
    //     setSelectedProduct(null);
    //     setIsFormVisible(true);
    //   };

    // const handleEditProduct = (product) => {
    //     setSelectedProduct(product);
    //     setIsFormVisible(true);
    // };

    const handleFormSubmit = () => {
        setIsFormVisible(false);
        // fetchProducts();
    };

    const handleFormCancel = () => {
        setIsFormVisible(false);
    };


    return (

        <div className="  p-4 w-full font-sans">
            {/* <div className='pb-20'>

                <UploadProductImage />
            </div> */}
            <div className="flex justify-between items-center mb-4 ">
                <h2 className="text-2xl font-bold">Products</h2>
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
                {/* <button onClick={handleRefreshOrders} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    <FaSync className={`${loading && 'animate-spin'}`} />
                </button> */}
                <button
                    type='submit'
                    className='flex justify-center items-center gap-2 shadow-md shadow-green-500 px-4 py-2 rounded-md  hover:bg-green-600 hover:text-white'
                    onClick={() => {
                        setSelectedProduct(null);
                        setIsFormVisible(true);
                    }}
                >
                    Add New Product <FiPlusSquare className='text-xl' />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full shadow-md rounded-lg">
                    <thead className="bg-[var(--bgColorPrimary)] text-white">
                        <tr>
                            <th className="p-3">
                                <input type="checkbox" className="form-checkbox" />
                            </th>
                            {['Name', 'Weight', 'MRP', 'Selling Price', 'Stock', 'Tax Rate',].map((header) => (
                                <th key={header} className="p-3 text-left">
                                    <div className={`flex items-center ${header !== 'Name' && 'justify-center'}`}>
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
                        {currentProducts.map((product) => (
                            <tr key={product._id} className="border-b hover:bg-gray-100">

                                <td className="p-3">
                                    <input type="checkbox" className="form-checkbox" />
                                </td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3 text-center">{product.weight}</td>
                                <td className="p-3 text-center">₹ {product.price}</td>
                                <td className="p-3 text-center">₹ {product.price}</td>
                                <td className="p-3 text-center">{product.availability} Pcs.</td>
                                <td className="p-3 text-center"> {product.tax}%</td>
                                <td className="p-3">
                                    <div className="flex flex-col space-y-2">
                                        {/* <button
                                            // onClick={() => handleOrderDetails(product)}
                                            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-800"
                                        >
                                            Product Details
                                        </button> */}
                                        <button
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setIsFormVisible(true)
                                            }}
                                            className="  px-2 py-1 rounded hover:text-green-800 flex justify-center"
                                        >
                                            <FaEdit className='text-yellow-500 text-xl' />
                                        </button>
                                        {/* <select
                                                value={order.orderStatus}
                                                // onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                                                onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                                                className="border rounded p-1"
                                            >
                                                <option value="active">Active</option>
                                                <option value="dispatched">Dispatched</option>
                                                <option value="completed">Completed</option>
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
            <div className="mt-10 flex justify-center items-center space-x-2">
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

            {/* {selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div ref={modalRef} className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                            <p><strong>Order No:</strong> {selectedOrder.orderNo}</p>
                            <p><strong>Receiver:</strong> {selectedOrder.receiverDetails.name}</p>
                            <p><strong>Phone:</strong> {selectedOrder.receiverDetails.phoneNumber}</p>
                            <p><strong>Email:</strong> {selectedOrder.userEmail}</p>
                            <p><strong>Billing Address:</strong> {selectedOrder.billingAddress}</p>
                            <p><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</p>
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
                )} */}

            {/* ================ edit product section ===========  */}
            {isFormVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        ref={modalRef}
                        className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <h2 className="text-2xl font-bold mb-4">Product Details</h2>


                        <ProductForm
                            product={selectedProduct}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                        />
                        {/* <UploadProductImage
                            product={selectedProduct}
                        //   onSubmit={handleFormSubmit}
                        //   onCancel={handleFormCancel}
                        /> */}
                    </div>
                </div>
            )}

        </div>

    );
};

export default AdminProducts;

