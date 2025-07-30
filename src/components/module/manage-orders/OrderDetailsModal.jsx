import { motion, AnimatePresence } from 'framer-motion';
  

// React Icons
import { 
  GoPackage, 
  GoCalendar, 
  GoCreditCard, 
  GoInfo 
} from "react-icons/go";
import {  
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaReceipt,
  FaTimes,
} from "react-icons/fa";
import { address } from "../../../helper/helperFunctions";





// Enhanced OrderDetailsModal Component
const OrderDetailsModal = ({ isOpen, onClose, order, statusIcon }) => {
  if (!isOpen) return null;

  const detailSections = [
    {
      title: "Order Information",
      icon: GoPackage,
      items: [
        { icon: GoInfo, label: "Order Status", value: order?.orderStatus, statusIcon },
        { icon: GoPackage, label: "Order Number", value: `#${order?.orderNo}` },
        { icon: GoCalendar, label: "Order Date", value: new Date(order?.createdAt).toLocaleDateString() },
      ]
    },
    {
      title: "Contact Information",
      icon: FaPhone,
      items: [
        { icon: FaEnvelope, label: "Email", value: order?.userEmail },
        { icon: FaPhone, label: "Phone", value: order?.phoneNumber },
      ]
    },
    {
      title: "Payment & Shipping",
      icon: GoCreditCard,
      items: [
        { icon: GoCreditCard, label: "Payment Method", value: order?.paymentMethod },
        { icon: FaMapMarkerAlt, label: "Shipping Address", value: address(order?.shippingAddress) },
        { icon: FaReceipt, label: "Total Amount", value: `₹${order?.subTotal + order?.shippingFee}` }
      ]
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[var(--background-color)] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--neutral-color)]/30 bg-[var(--themeColor)] text-[var(--text-light-color)]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--text-light-color)]/10 rounded-lg">
                <FaReceipt className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Order Details</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-[var(--text-light-color)]/10 rounded-lg transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
            {detailSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-[var(--themeColor)] font-semibold">
                  <section.icon className="w-5 h-5" />
                  <h3>{section.title}</h3>
                </div>
                <div className="space-y-3 pl-7">
                  {section.items.map((item, index) => (
                    <div key={index} className="flex items-start justify-between py-2 border-b border-[var(--neutral-color)]/20 last:border-b-0">
                      <div className="flex items-center gap-2 text-[var(--text-color)]/70">
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[var(--text-color)] font-medium text-right max-w-[60%]">
                        <span className="text-sm break-words">{item.value}</span>
                        {item.statusIcon}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetailsModal;