import { motion } from 'framer-motion';
import { Percent } from 'lucide-react';



const PaymentMethodButton = ({ icon, label, selected, onClick, badge = null }) => {
    const IconComponent = icon;
    return (
        <button
            type="button"
            className={`w-full p-5 rounded-lg border flex items-center justify-between relative transition-all ${selected
                ? 'bg-blue-100 border-[var(--accent-color)] shadow-sm'
                : 'border-gray-300 hover:border-gray-400'
                }`}
            onClick={onClick}
        >
            <div className="flex items-center">
                <IconComponent className={`mr-3 ${label.includes('Cash') ? 'text-green-600' : 'text-blue-600'}`} size={18} />
                <span>{label}</span>
            </div>
            {badge && (
                <motion.div
                    className={`absolute right-0 top-0 ${label.includes('Cash') ? 'bg-red-500' : 'bg-green-500'}  text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg flex items-center`}
                    initial={{ scale: 1 }}
                    animate={label.includes('Online') ? { scale: [1, 1.1, 1] } : { scale: [1, 1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    {label.includes('Online') && <Percent className="mr-1" size={10} />}
                    {badge}
                </motion.div>
            )}
        </button>
    );
};


export default PaymentMethodButton;