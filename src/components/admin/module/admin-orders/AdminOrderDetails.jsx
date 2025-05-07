import React, { useEffect, useRef, useState } from 'react'
import UpdateInvoiceNo from '../../UpdateInvoiceNo'
import { ImSpinner9 } from 'react-icons/im'
import { address } from '../../../../helper/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { generateInvoice } from '../../../../features/admin/adminData';

const AdminOrderDetails = ({ order }) => {

    const dispatch=useDispatch();
    const modalRef = useRef();
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { generatingInvoice, loading } = useSelector(state => state.adminData);



    const handleInvoiceGeneration = (orderId) => {
        dispatch(generateInvoice(orderId))
            .unwrap()
        // .then(() => {
        // })
        // .catch((error) => {
        //     console.error('Failed to generate invoice:', error);
        // });
    }

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

    return (
        <>
            <button
                onClick={() => handleOrderDetails(order)}
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-800"
            >
                Order Details
            </button>
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div ref={modalRef} className="bg-[var(--bgColorPrimary)] flex flex-col gap-2 mx-2 text-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                        <p><strong>Order No:</strong> {selectedOrder.orderNo}</p>
                        <UpdateInvoiceNo selectedOrder={selectedOrder} />
                        <p><strong>Receiver:</strong> {selectedOrder.userName}</p>
                        <p><strong>Phone:</strong> {selectedOrder.phoneNumber}</p>
                        <p><strong>Email:</strong> {selectedOrder.userEmail}</p>
                        <p><strong>Shipping Address:</strong> {address(selectedOrder.shippingAddress)}</p>
                        <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                        <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                        <p><strong>Order Status:</strong> {selectedOrder.orderStatus}</p>
                        <p><strong>Sub Total:</strong> ₹ {selectedOrder.subTotal}</p>
                        <p><strong>Shipping Fee:</strong> {selectedOrder.shippingFee === 0 ? 'FREE' : '₹' + selectedOrder.shippingFee}</p>
                        <p><strong>Total:</strong> ₹ {selectedOrder.subTotal + selectedOrder.shippingFee}</p>
                        <h3 className="text-xl font-bold mt-4 mb-2">Order Items:</h3>
                        <ul>
                            {selectedOrder.orderDetails.map((item, index) => (
                                <li key={item.id}>({index + 1}) -- Item: {item['name-url']} | Quantity: {item.quantity} | Weight: {item.weight} </li>
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

        </>
    )
}

export default AdminOrderDetails
