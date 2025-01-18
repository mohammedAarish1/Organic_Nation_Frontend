import { IoIosCloseCircleOutline } from "react-icons/io";
import { address } from "../../../helper/helperFunctions";

const OrderDetailsModal = ({ isOpen, onClose, order, statusIcon }) => {
  if (!isOpen) return null;

  const detailRows = [
    { label: "Order Status", value: order?.orderStatus, icon: statusIcon },
    { label: "Order Number", value: `#${order?.orderNo}` },
    { label: "Order Date", value: new Date(order?.createdAt).toDateString(), className: "capitalize" },
    { label: "Email", value: order?.userEmail, className: "lowercase" },
    { label: "Phone", value: order?.receiverDetails.phoneNumber },
    { label: "Payment Method", value: order?.paymentMethod },
    { label: "Shipping Address", value: address(order?.shippingAddress), className: "sm:w-1/3 text-end" },
    { label: "Total Price (including shippingFee)", value: `₹${order?.subTotal + order?.shippingFee}` }
  ];

  return (
    <div className="modal-background active" onClick={onClose}>
      <div className="text-white modal active" onClick={(e) => e.stopPropagation()}>
        <p className="flex justify-end">
          <IoIosCloseCircleOutline
            className="cursor-pointer text-3xl hover:scale-110"
            onClick={onClose}
          />
        </p>
        <h2 className="text-xl font-medium">Order Details</h2>
        <div className="mt-4">
          {detailRows.map(({ label, value, icon, className }) => (
            <div key={label} className="flex justify-between items-center border-gray-400 border-b-2 py-2">
              <span>{label}</span>
              <span className={`text-gray-400 ${className || ''}`}>
                {value} {icon}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;