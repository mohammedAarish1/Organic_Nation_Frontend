import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    FaShoppingCart, FaChevronDown, FaChevronUp, FaTag,
    FaHome, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave,
    FaCreditCard, FaPercent
} from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { motion } from 'framer-motion';
import { additionalDiscountforOnlinePayment, checkDeliveryAndCalculateShippingFee, generateTransactionID } from '../../helper/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../features/cart/cart';
import { initiatePayment } from '../../features/orderPayment/payment';
import { addOrders } from '../../features/manageOrders/manageOrders';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../features/auth/auth';


const SavedAddressCard = ({
    addresses,
    selectedAddress,
    onSelect,
    onAddNew,
    onEdit
}) => {
    console.log('selectedAddress', selectedAddress)
    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedAddress) {
            const address = addresses.filter(address => address._id === selectedAddress)
            console.log('address', address)
            const pinCode = address[0].pinCode

            checkDeliveryAndCalculateShippingFee(pinCode, dispatch)

        }
    }, [selectedAddress])

    return (
        <div className="mb-6">
            <h3 className="font-medium mb-3 text-lg">Select Delivery Address</h3>

            <div className="space-y-3">
                {addresses.map((address) => (
                    <motion.div
                        key={address._id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedAddress === address._id
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                            }`}
                        onClick={() => onSelect(address._id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="flex items-center">
                            <input
                                type="radio"
                                checked={selectedAddress === address._id}
                                onChange={() => onSelect(address._id)}
                                className="mr-3 h-4 w-4 text-[var(--accent-color)]"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-medium text-gray-800">{'Aarish'}</p>
                                    <span className={`text-xs px-2 py-1 rounded-full ${address.addressType === 'Home'
                                        ? 'bg-green-100 text-green-700'
                                        : address.addressType === 'Office'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-purple-100 text-purple-700'
                                        }`}>
                                        {address.addressType}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">
                                    <span className="inline-block w-20">Phone:</span>
                                    {address.phoneNumber}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <span className="inline-block w-20">Address:</span>
                                    {address.address}
                                </p>
                                <p className="text-sm text-gray-700 ml-20">
                                    {address.city}, {address.state} - {address.pinCode}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.button
                onClick={onAddNew}
                className="mt-4 w-full py-1 px-4 border border-dashed border-blue-400 rounded-lg flex items-center justify-center text-[var(--text-color)] hover:bg-blue-50 transition-colors"
                whileHover={{ scale: 1.01, backgroundColor: "rgba(239, 246, 255, 0.6)" }}
                whileTap={{ scale: 0.99 }}
            >
                <span className="text-xl mr-2">+</span> Add New Address
            </motion.button>
        </div>
    );
};


const Button = ({ children, onClick, type = 'button', disabled = false, className = '' }) => (
    <motion.button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-full bg-custom-gradient text-white font-medium py-3.5 rounded-lg hover:opacity-90 transition-all disabled:opacity-70 ${className}`}
        whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
        whileTap={{ scale: 0.98 }}
    >
        {children}
    </motion.button>
);

// Selection Button component
const SelectionButton = ({ icon, label, selected, onClick }) => {
    const IconComponent = icon;
    return (
        <button
            type="button"
            className={`flex-1 py-2.5 px-3 rounded-lg border flex items-center justify-center transition-all ${selected
                ? 'bg-blue-50 border-[var(--accent-color)] shadow-sm'
                : 'border-gray-300 hover:border-gray-400'
                }`}
            onClick={onClick}
        >
            <IconComponent className="mr-2" /> {label}
        </button>
    );
};


// Payment Method Button component
const PaymentMethodButton = ({ icon, label, selected, onClick, discount = null }) => {
    const IconComponent = icon;
    return (
        <button
            type="button"
            className={`w-full p-3.5 rounded-lg border flex items-center justify-between relative transition-all ${selected
                ? 'bg-blue-50 border-[var(--accent-color)]  shadow-sm'
                : 'border-gray-300 hover:border-gray-400'
                }`}
            onClick={onClick}
        >
            <div className="flex items-center">
                <IconComponent className={`mr-3 ${label.includes('Cash') ? 'text-green-600' : 'text-blue-600'}`} size={18} />
                <span>{label}</span>
            </div>
            {discount && (
                <motion.div
                    className="absolute right-0 top-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg flex items-center"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <FaPercent className="mr-1" size={10} />
                    {discount}
                </motion.div>
            )}
        </button>
    );
};

// FormField component for consistent form inputs
const FormField = ({ setFieldValue = null, label, name, type = "text", placeholder, disabled = false, autoFocus = false, as }) => {

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const { user } = useSelector((state) => state.auth);
    const { shippingFee, userCity, userPincode, userState, error } = useSelector((state) => state.delivery);

    const handleOnChange = (e,) => {
        const value = e.target.value;
        setFieldValue(name, value)
        if (name === 'pinCode' && value.length === 6) {

            checkDeliveryAndCalculateShippingFee(
                value,
                dispatch
            );
        }
        // Add any logic you need here
    };

    const handlePincodeBlur = () => {
        setFieldValue('city', userCity)
        setFieldValue('state', userState)
    }


    useEffect(() => {
        if (autoFocus && inputRef.current && (!user || !user[name])) {
            inputRef.current.focus();
        }
    }, [autoFocus, name, user]);

    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <Field
                type={type}
                name={name}
                innerRef={inputRef}
                as={as}
                placeholder={placeholder}
                disabled={disabled}
                onChange={handleOnChange}
                onBlur={name === 'pinCode' ? handlePincodeBlur : undefined}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] shadow-sm ${disabled ? 'bg-gray-100' : ''
                    } ${as === 'textarea' ? 'h-20' : ''}`}
            />
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
        </div>
    )
};


const NewCheckoutForm = ({ close }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth);
    const { cartItemsList, totalCartAmount, totalTax, couponCodeApplied } = useSelector((state) => state.cart);
    const { addingNewOrder } = useSelector((state) => state.orders);
    const { shippingFee, userCity, userPincode, userState, error } = useSelector((state) => state.delivery);

    console.log('user', user)
    const [addressType, setAddressType] = useState('Home');
    const [paymentMethod, setPaymentMethod] = useState('');


    const [savedAddresses, setSavedAddresses] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const checkoutSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .matches(/^\d{10}$/, 'Phone number must be 10 digits')
            .required('Phone number is required'),
        fullName: Yup.string()
            .required('Full name is required')
            .min(3, 'Name must be at least 3 characters'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        address: Yup.string()
            .required('Address is required')
            .min(5, 'Address is too short'),
        pinCode: Yup.string()
            .matches(/^\d{6}$/, 'Pincode must be 6 digits')
            .required('Pincode is required'),
        city: Yup.string()
            .required('City is required'),
        state: Yup.string()
            .required('State is required'),
    });

    const initialValues = {
        phoneNumber: user?.phoneNumber.replace('+91', '') || '',
        fullName: user?.fullName || '',
        email: user?.email || '',
        address: '',
        pinCode: '',
        city: '',
        state: '',
    };


    const processOrder = (shippingInfo) => {

        const merchantTransactionId = generateTransactionID();
        const { discountAmount, taxDiscount } = additionalDiscountforOnlinePayment(totalCartAmount, totalTax);

        const orderDetails = cartItemsList.map((item) => {
            return {
                id: item._id,
                "name-url": item["name-url"],
                quantity: item.quantity,
                weight: item.weight,
                tax: item.tax,
                hsnCode: item["hsn-code"],
                unitPrice: item.price,
            };
        });

        const checkoutData = {
            fullName: shippingInfo.fullName,
            userEmail: shippingInfo.email,
            phoneNumber: shippingInfo.phoneNumber,
            addressType: shippingInfo.addressType,
            shippingAddress: {
                address: shippingInfo.address,
                pinCode: shippingInfo.pinCode,
                city: shippingInfo.city,
                state: shippingInfo.state,
            },
            orderDetails: orderDetails,
            subTotal: totalCartAmount,
            taxAmount: totalTax,
            shippingFee: totalCartAmount < 499 ? shippingFee : 0,
            paymentMethod: paymentMethod,
            paymentStatus: "pending",
            merchantTransactionId: paymentMethod === "cash_on_delivery" ? '' : merchantTransactionId,
            couponCodeApplied: couponCodeApplied || user?.cart?.couponCodeApplied,
        };


        if (user && cartItemsList.length > 0) {
            console.log('check')
            if (paymentMethod === "cash_on_delivery") {
                dispatch(addOrders(checkoutData)).then((value) => {
                    if (value.type === "manageOrders/addOrders/fulfilled") {
                        close();
                        dispatch(getUserData())
                        navigate(`/order-confirmed/${value.payload.orderId}`);
                    }
                });
            } else {
                console.log('check')
                dispatch(addOrders(checkoutData)).then((value) => {
                    if (value.type === "manageOrders/addOrders/fulfilled") {
                        dispatch(
                            initiatePayment({
                                number: shippingInfo.phoneNumber.replace('+91', ''),
                                amount: totalCartAmount + (totalCartAmount < 499 ? shippingFee : 0),
                                merchantTransactionId: merchantTransactionId,
                            })
                        );
                        dispatch(clearCart());
                    }
                });
            }
        }
    };


    // const handleSubmit = (values, action) => {
    //     const merchantTransactionId = generateTransactionID();
    //     // calutaing additional 5% discount for online payment and tax inlcuded in this discounted amount
    //     const { discountAmount, taxDiscount } = additionalDiscountforOnlinePayment(totalCartAmount, totalTax);


    //     const orderDetails = cartItemsList.map((item) => {
    //         return {
    //             id: item._id,
    //             "name-url": item["name-url"],
    //             quantity: item.quantity,
    //             weight: item.weight,
    //             tax: item.tax,
    //             hsnCode: item["hsn-code"],
    //             unitPrice: item.price, // Update price with the discounted value
    //         };
    //     });

    //     let checkoutData = {
    //         fullName: user?.fullName || values?.fullName?.trim(),
    //         userEmail: user?.email || values?.email?.toLowerCase().trim(),
    //         phoneNumber: user?.phoneNumber || values?.phoneNumber,
    //         addressType: addressType,
    //         shippingAddress: {
    //             address: values.address,
    //             pinCode: values.pinCode,
    //             city: values.city,
    //             state: values.state,
    //         },
    //         orderDetails: orderDetails,
    //         // subTotal: values.paymentMethod === "cash_on_delivery" ? totalCartAmount : totalCartAmount - discountAmount,
    //         subTotal: totalCartAmount,
    //         taxAmount: totalTax,
    //         shippingFee: totalCartAmount < 499 ? shippingFee : 0,
    //         paymentMethod: paymentMethod,
    //         paymentStatus: "pending",
    //         merchantTransactionId: paymentMethod === "cash_on_delivery" ? '' : merchantTransactionId,
    //         couponCodeApplied: couponCodeApplied || user?.cart?.couponCodeApplied,
    //     };


    //     if (user && cartItemsList.length > 0) {
    //         if (paymentMethod === "cash_on_delivery") {
    //             dispatch(addOrders(checkoutData)).then((value) => {
    //                 if (value.type === "manageOrders/addOrders/fulfilled") {
    //                     // dispatch(clearCart());
    //                     close()
    //                     // localStorage.removeItem("deliveryChargeToken");
    //                     navigate(`/order-confirmed/${value.payload.orderId}`);
    //                     // navigate(`/order-confirmed`);
    //                 }
    //             });
    //         } else {
    //             dispatch(addOrders(checkoutData)).then((value) => {
    //                 if (value.type === "manageOrders/addOrders/fulfilled") {
    //                     dispatch(
    //                         initiatePayment({
    //                             number: values?.phoneNumber.slice(3),
    //                             // amount: totalCartAmount - discountAmount + (totalCartAmount < 499 ? shippingFee : 0),
    //                             amount: totalCartAmount + (totalCartAmount < 499 ? shippingFee : 0),
    //                             merchantTransactionId: merchantTransactionId,
    //                         })
    //                     );

    //                     dispatch(clearCart());
    //                     // localStorage.removeItem("deliveryChargeToken");
    //                 }
    //             });
    //         }
    //     }

    //     action.resetForm();
    // };



    // Handle form submit for new address
    const handleSubmit = (values, action) => {
        const shippingInfo = {
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber.includes('+91') ? values.phoneNumber : `+91${values.phoneNumber}`,
            addressType: addressType,
            address: values.address,
            pinCode: values.pinCode,
            city: values.city,
            state: values.state,
        };

        processOrder(shippingInfo);
        action.resetForm();
    };


    // Handle checkout with saved address
    const handleSavedAddressCheckout = () => {
        const addressToUse = savedAddresses.find(addr => addr._id === selectedAddress);

        if (!addressToUse || !paymentMethod) return;

        const shippingInfo = {
            fullName: user?.fullName,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            addressType: addressToUse.addressType,
            address: addressToUse.address,
            pinCode: addressToUse.pinCode,
            city: addressToUse.city,
            state: addressToUse.state,
        };

        processOrder(shippingInfo);
    };

    useEffect(() => {
        // Check if user is logged in and has previous orders/addresses
        if (user?.addresses && user.addresses.length > 0) {
            setSavedAddresses(user.addresses);
            setSelectedAddress(user.addresses[0]._id); // Select first address by default
        } else {
            console.log('hhhdhdhdhd')
            // No saved addresses, show the form
            setShowAddressForm(true);
        }
    }, [user]);

    return (
        <div className="slide-in text-[var(--text-color)]">
            {savedAddresses.length > 0 && !showAddressForm ? (
                <>
                    <SavedAddressCard
                        addresses={savedAddresses}
                        selectedAddress={selectedAddress}
                        onSelect={setSelectedAddress}
                        onAddNew={() => setShowAddressForm(true)}
                        onEdit={() => { }}
                    />

                    {/* Payment method selection */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium mb-2">Payment Method</label>
                        <div className="space-y-3">
                            <PaymentMethodButton
                                icon={FaMoneyBillWave}
                                label="Cash on Delivery"
                                selected={paymentMethod === 'cash_on_delivery'}
                                onClick={() => setPaymentMethod('cash_on_delivery')}
                            />

                            <PaymentMethodButton
                                icon={FaCreditCard}
                                label="Online Payment"
                                selected={paymentMethod === 'online_payment'}
                                onClick={() => setPaymentMethod('online_payment')}
                                discount="10% off"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleSavedAddressCheckout}
                        disabled={!paymentMethod || !selectedAddress}
                        className="mt-6"
                    >
                        {paymentMethod === 'online_payment' ? 'Proceed to Pay' : 'Place Order'}
                    </Button>
                </>
            ) : (
                <>
                    {/* Back button when adding new address */}
                    {savedAddresses.length > 0 && (
                        <motion.button
                            onClick={() => setShowAddressForm(false)}
                            className="flex items-center text-[var(--accent-color)] mb-4 hover:underline"
                            whileHover={{ x: -3 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <FaChevronDown className="transform rotate-90 mr-1" /> Back to saved addresses
                        </motion.button>
                    )}

                    <Formik
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue }) => (
                            <Form className="space-y-4">
                                <FormField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    disabled={true}
                                />

                                <FormField
                                    setFieldValue={setFieldValue}
                                    label="Full Name"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    autoFocus={true}
                                    disabled={user?.fullName}
                                />

                                <FormField
                                    setFieldValue={setFieldValue}
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    disabled={user?.email}
                                />

                                <FormField
                                    setFieldValue={setFieldValue}
                                    label="Address"
                                    name="address"
                                    as="textarea"
                                    placeholder="Enter your address"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        setFieldValue={setFieldValue}
                                        label="Pincode"
                                        name="pinCode"
                                        placeholder="6-digit pincode"
                                    />

                                    <FormField
                                        setFieldValue={setFieldValue}
                                        label="City"
                                        name="city"
                                        placeholder="City"
                                    />
                                </div>

                                <FormField
                                    setFieldValue={setFieldValue}
                                    label="State"
                                    name="state"
                                    placeholder="State"
                                />

                                <div>
                                    <label className="block text-sm font-medium mb-1">Save Address As</label>
                                    <div className="flex space-x-2">
                                        <SelectionButton
                                            icon={FaHome}
                                            label="Home"
                                            selected={addressType === 'Home'}
                                            onClick={() => setAddressType('Home')}
                                        />
                                        <SelectionButton
                                            icon={FaBriefcase}
                                            label="Office"
                                            selected={addressType === 'Office'}
                                            onClick={() => setAddressType('Office')}
                                        />
                                        <SelectionButton
                                            icon={FaMapMarkerAlt}
                                            label="Other"
                                            selected={addressType === 'Other'}
                                            onClick={() => setAddressType('Other')}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                                    <div className="space-y-3">
                                        <PaymentMethodButton
                                            icon={FaMoneyBillWave}
                                            label="Cash on Delivery"
                                            selected={paymentMethod === 'cash_on_delivery'}
                                            onClick={() => setPaymentMethod('cash_on_delivery')}
                                        />

                                        <PaymentMethodButton
                                            icon={FaCreditCard}
                                            label="Online Payment"
                                            selected={paymentMethod === 'online_payment'}
                                            onClick={() => setPaymentMethod('online_payment')}
                                            discount="10% off"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting || !paymentMethod}
                                    className="mt-6"
                                >
                                    {paymentMethod === 'online_payment' ? 'Proceed to Pay' : 'Place Order'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </>
            )}
        </div>
    )
}

export default NewCheckoutForm;
