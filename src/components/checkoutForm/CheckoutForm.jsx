import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutSchema } from '../../form-validation/checkoutSchema';
import { clearCart } from '../../features/cart/cart';
import { addOrders } from '../../features/manageOrders/manageOrders';

// state list 
import { states } from '../../helper/stateList';
// react icons 
import { MdEmail, MdOutlinePhoneAndroid, MdLocationCity } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { PiFileZipFill } from "react-icons/pi";
// formik
import { Formik, Form, Field, } from 'formik';
import { initiatePayment } from '../../features/orderPayment/payment';


const CheckoutForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user);

    const { cartItemsList, totalCartAmount } = useSelector((state) => state.cart);
    const { shippingFee } = useSelector(state => state.delivery)

    const initialValues = {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phoneNumber || '',
        receiverFirstName: '',
        receiverLastName: '',
        receiverEmail: '',
        receiverPhone: '',
        shippingAddress: {
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'India',
        },
        billingAddress: {
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'India',
        },
        sameAsContact: false,
        sameAsShipping: false,
        paymentMethod: '',
    };


    // checkout form submission
    const handleSubmit = (values, action) => {
        // to convert the address object into plain string 
        function address(obj) {
            let result = '';
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const value = obj[key];
                    if (Array.isArray(value)) {
                        result += value.flat().join(' ') + ' ';
                    } else {
                        result += value + ' ';
                    }
                }
            }
            return result.trim();
        }

        // below orderDetails will contain each item id and qty in 2D array
        const orderDetails = cartItemsList.map(item => [item['name-url'], item._id, item.quantity]);
        let checkoutData = {
            orderNo: 'ON' + Date.now(),
            orderStatus: 'active',
            userEmail: user?.email,
            billingAddress: address(values.billingAddress),
            shippingAddress: address(values.shippingAddress),
            orderDetails: orderDetails,
            subTotal: totalCartAmount,
            paymentStatus: 'pending',
            // taxAmount: totalTax,
            shippingFee: shippingFee,
            paymentMethod: values.paymentMethod,
            receiverDetails: {
                name: !values.sameAsContact ? values.receiverFirstName || '' : '',
                phoneNumber: !values.sameAsContact ? values.receiverPhone || '' : '',
            }
        }
        if (user && cartItemsList.length > 0) {
            if (values.paymentMethod === 'cash_on_delivery') {
                dispatch(addOrders(checkoutData))
                    .then((value) => {
                        if (value.type === "manageOrders/addOrders/fulfilled") {
                            dispatch(clearCart());
                            localStorage.removeItem('deliveryChargeToken');
                            navigate(`/order-confirmed/${value.payload.orderId}`)
                        }
                    })
            } else {
                dispatch(initiatePayment(
                    {
                        number: values.receiverPhone ? values.receiverPhone : values.phone.slice(3),
                        amount: totalCartAmount + shippingFee,
                    }
                ))
                // navigate('/payment-gateway', { state: { totalCartAmount, shippingFee, } })
            }

        } else {
        }

        action.resetForm();

    };


    return (
        <div className="xl:col-span-2 bg-[#d9cb9b]   rounded-md p-8 sticky top-0">
            <h2 className="text-2xl font-bold text-[#333]">Complete your order</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={checkoutSchema}
                onSubmit={handleSubmit}

            >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form className="mt-10">
                        {/*============== contact details ================= */}
                        <div>
                            <div className='flex justify-between items-center py-3 '>
                                <h3 className="text-lg font-bold text-[#333] ">Contact Details</h3>
                                <Link to='/register' className='hover:underline underline-offset-4  cursor-pointer'>{!user ? 'Login' : null}</Link>

                            </div>
                            <div className="grid sm:grid-cols-2 gap-10">

                                {/* first name  */}
                                <div className="relative z-0">
                                    <Field
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer "
                                        placeholder=" "
                                        autoComplete="off"

                                    />

                                    <label htmlFor="firstName" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">First Name</label>
                                    <FaUserEdit className='absolute top-4 right-4 text-xl' />
                                    {errors?.firstName && touched?.firstName ? (
                                        <p className='text-red-600'>*{errors?.firstName}</p>
                                    ) : (
                                        null
                                    )}

                                </div>
                                {/* last name  */}
                                <div className="relative z-0">
                                    <Field
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                        placeholder=" "
                                        autoComplete="off"
                                    />


                                    <label htmlFor="lastName" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">Last Name</label>

                                    <FaUserEdit className='absolute top-4 right-4 text-xl' />
                                    {errors?.lastName && touched?.lastName ? (
                                        <p className='text-red-600'>*{errors?.lastName}</p>
                                    ) : (
                                        null
                                    )}
                                </div>
                                {/* email */}
                                <div className="relative z-0">
                                    <Field
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                        placeholder=" "
                                        autoComplete="off"
                                    />


                                    <label htmlFor="email" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">Email</label>
                                    <MdEmail className='absolute top-4 right-4 text-xl' />
                                    {errors.email && touched.email ? (
                                        <p className='text-red-600'>*{errors.email}</p>
                                    ) : (
                                        null
                                    )}
                                </div>
                                {/* phone number */}
                                <div className="relative z-0">
                                    <Field
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                        placeholder=" "
                                        autoComplete="off"
                                    />

                                    <label htmlFor="phone" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">Phone</label>

                                    <MdOutlinePhoneAndroid className='absolute top-4 right-4 text-xl' />
                                    {errors?.phone && touched?.phone ? (
                                        <p className='text-red-600'>*{errors?.phone}</p>
                                    ) : (
                                        null
                                    )}
                                </div>
                            </div>
                        </div>
                        {/*============== receiver's details ================= */}
                        <div className='mt-6'>
                            <h3 className="text-lg font-bold text-[#333]  mt-6">Receiver Details</h3>
                            <div className='flex items-center gap-2 py-4'>
                                <Field
                                    type="checkbox"
                                    id="sameAsContact"
                                    name="sameAsContact"
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setFieldValue('sameAsContact', e.target.checked);
                                        if (e.target.checked && values.sameAsContact) {
                                            setFieldValue('receiverFirstName', values.firstName);
                                            setFieldValue('receiverLastName', values.lastName);
                                            setFieldValue('receiverEmail', values.email);
                                            setFieldValue('receiverPhone', values.phone);
                                        } else {
                                            setFieldValue('receiverFirstName', values.receiverFirstName);
                                            setFieldValue('receiverLastName', values.receiverLastName);
                                            setFieldValue('receiverEmail', values.receiverEmail);
                                            setFieldValue('receiverPhone', values.receiverPhone);
                                        }
                                    }}
                                />
                                <label htmlFor='sameAsContact'>Same as Contact Detail</label>
                            </div>
                            {!values.sameAsContact && (
                                <div className="grid sm:grid-cols-2 gap-10">

                                    {/* first name  */}
                                    <div className="relative z-0">
                                        <Field
                                            type="text"
                                            name="receiverFirstName"
                                            id="receiverFirstName"
                                            className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                            placeholder=" "
                                            autoComplete="off"
                                        />

                                        <label htmlFor="receiverFirstName" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">First Name</label>
                                        <FaUserEdit className='absolute top-4 right-4 text-xl' />
                                        {errors.receiverFirstName && touched.receiverFirstName ? (
                                            <p className='text-red-600'>*{errors.receiverFirstName}</p>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                    {/* last name  */}
                                    <div className="relative z-0">
                                        <Field
                                            type="text"
                                            name="receiverLastName"
                                            id="receiverLastName"
                                            className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                            placeholder=" "
                                            autoComplete="off"
                                        />


                                        <label htmlFor="receiverLastName" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">Last Name</label>

                                        <FaUserEdit className='absolute top-4 right-4 text-xl' />
                                        {errors.receiverLastName && touched.receiverLastName ? (
                                            <p className='text-red-600'>*{errors.receiverLastName}</p>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                    {/* email */}
                                    <div className="relative z-0">
                                        <Field
                                            type="text"
                                            name="receiverEmail"
                                            id="receiverEmail"
                                            className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                            placeholder=" "
                                            autoComplete="off"
                                        />

                                        <label htmlFor="receiverEmail" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">Email</label>
                                        <MdEmail className='absolute top-4 right-4 text-xl' />
                                        {errors?.receiverEmail && touched?.receiverEmail ? (
                                            <p className='text-red-600'>*{errors?.receiverEmail}</p>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                    {/* phone number */}
                                    <div className="relative z-0">
                                        <Field
                                            type="text"
                                            name="receiverPhone"
                                            id="receiverPhone"
                                            className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                            placeholder=" "
                                            autoComplete="off"
                                        />

                                        <label htmlFor="receiverPhone" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">Phone</label>

                                        <MdOutlinePhoneAndroid className='absolute top-4 right-4 text-xl' />
                                        {errors?.receiverPhone && touched?.receiverPhone ? (
                                            <p className='text-red-600'>*{errors?.receiverPhone}</p>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>


                        <div className="mt-6">
                            {/*=========== shipping address ============  */}
                            <div>
                                <h3 className="text-lg font-bold text-[#333] mb-6">Shipping Address</h3>
                                <div className="grid sm:grid-cols-2 gap-10">

                                    {/* Address   */}
                                    <div className="relative z-0 w-full">
                                        <Field
                                            type="text"
                                            name="shippingAddress.address"
                                            id="shippingAddress.address"
                                            className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                            placeholder=" "
                                            autoComplete="off"
                                        />

                                        <label htmlFor="shippingAddress.address" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">Address Line</label>
                                        <MdLocationCity className='absolute top-4 right-4 text-xl' />
                                        {errors?.shippingAddress?.address && touched?.shippingAddress?.address ? (
                                            <p className='text-red-600'>*{errors?.shippingAddress?.address}</p>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                    {/* City   */}
                                    <div className="relative z-0">
                                        <Field
                                            type="text"
                                            name="shippingAddress.city"
                                            id="shippingAddress.city"
                                            className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                            placeholder=" "
                                            autoComplete="off"
                                        />

                                        <label htmlFor="shippingAddress.city" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">City</label>
                                        <MdLocationCity className='absolute top-4 right-4 text-xl' />
                                        {errors?.shippingAddress?.city && touched?.shippingAddress?.city ? (
                                            <p className='text-red-600'>*{errors?.shippingAddress?.city}</p>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                    {/* state  */}
                                    <div className='w-full relative'>
                                        <Field
                                            as="select"
                                            name="shippingAddress.state"
                                            id="shippingAddress.state"
                                            className='block py-2.5  border-0  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer bg-transparent border-gray-600 text-[#333] w-full text-sm border-b-2  outline-none '>
                                            <option value="select-state">Select State</option>
                                            {states.map((state) => (
                                                <option key={state} value={state} className=''>{state}</option>
                                            ))}
                                        </Field>
                                        <label htmlFor="shippingAddress.state" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">State</label>
                                        {errors?.shippingAddress?.state && touched?.shippingAddress?.state ? (
                                            <p className='text-red-600'>*{errors?.shippingAddress?.state}</p>
                                        ) : (
                                            null
                                        )}
                                    </div>

                                    {/* Zip code   */}
                                    <div className="relative z-0">
                                        <Field
                                            type="text"
                                            name="shippingAddress.zipCode"
                                            id="shippingAddress.zipCode"
                                            className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                            placeholder=" "
                                            autoComplete="off"
                                        />

                                        <label htmlFor="shippingAddress.zipCode" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">Zip Code</label>
                                        <PiFileZipFill className='absolute top-4 right-4 text-xl' />
                                        {errors?.shippingAddress?.zipCode && touched?.shippingAddress?.zipCode ? (
                                            <p className='text-red-600'>*{errors?.shippingAddress?.zipCode}</p>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                    {/* country  */}
                                    <div className='w-full relative  sm:col-span-2'>
                                        <Field
                                            as="select"
                                            name="shippingAddress.country"
                                            id="shippingAddress.country"
                                            className='block py-2.5 border-0  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer bg-transparent border-gray-600 text-[#333] w-full text-sm border-b-2  outline-none '
                                        >
                                            <option value="india">India</option>
                                        </Field>
                                        <label htmlFor="shippingAddress.country" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">Country/Region</label>
                                        {errors?.shippingAddress?.country && touched?.shippingAddress?.country ? (
                                            <p className='text-red-600'>*{errors?.shippingAddress?.country}</p>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                </div>
                            </div>


                            {/* billing address  */}
                            <div>
                                <h3 className="text-lg font-bold text-[#333]  mt-6">Billing Address</h3>
                                <div className='flex items-center gap-2 py-4'>
                                    <Field
                                        type="checkbox"
                                        id="sameAsShipping"
                                        name="sameAsShipping"
                                        onChange={(e) => {
                                            setFieldValue('sameAsShipping', e.target.checked);
                                            if (e.target.checked) {
                                                setFieldValue('billingAddress.country', values.shippingAddress.country);
                                                setFieldValue('billingAddress.address', values.shippingAddress.address);
                                                setFieldValue('billingAddress.city', values.shippingAddress.city);
                                                setFieldValue('billingAddress.state', values.shippingAddress.state);
                                                setFieldValue('billingAddress.zipCode', values.shippingAddress.zipCode);
                                            }
                                        }}
                                    />
                                    <label htmlFor='sameAsShipping'>Same as Shipping address</label>
                                </div>
                                {!values.sameAsShipping && (
                                    <div className="grid sm:grid-cols-2 gap-10">

                                        {/* Address   */}
                                        <div className="relative z-0">
                                            <Field
                                                type="text"
                                                name="billingAddress.address"
                                                id="billingAddress.address"
                                                className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                                placeholder=" "
                                                autoComplete="off"
                                            />

                                            <label htmlFor="billingAddress.address" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">Address Line</label>
                                            <MdLocationCity className='absolute top-4 right-4 text-xl' />
                                            {errors?.billingAddress?.address && touched?.billingAddress?.address ? (
                                                <p className='text-red-600'>*{errors?.billingAddress?.address}</p>
                                            ) : (
                                                null
                                            )}
                                        </div>
                                        {/* City   */}
                                        <div className="relative z-0">
                                            <Field
                                                type="text"
                                                name="billingAddress.city"
                                                id="billingAddress.city"
                                                className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                                placeholder=" "
                                                autoComplete="off"
                                            />

                                            <label htmlFor="billingAddress.city" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">City</label>
                                            <MdLocationCity className='absolute top-4 right-4 text-xl' />
                                            {errors?.billingAddress?.city && touched?.billingAddress?.city ? (
                                                <p className='text-red-600'>*{errors?.billingAddress?.city}</p>
                                            ) : (
                                                null
                                            )}
                                        </div>
                                        {/* state  */}
                                        <div className='w-full relative'>
                                            <Field
                                                as="select"
                                                name="billingAddress.state"
                                                id="billingAddress.state"
                                                className='block py-2.5  border-0  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer bg-transparent border-gray-600 text-[#333] w-full text-sm border-b-2  outline-none '
                                            >
                                                <option value="select-state">Select State</option>
                                                {states.map((state) => (
                                                    <option key={state} value={state} className=''>{state}</option>
                                                ))}
                                            </Field>
                                            <label htmlFor="billingAddress.state" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">State</label>
                                            {errors.billingAddress?.state && touched.billingAddress?.state ? (
                                                <p className='text-red-600'>*{errors.billingAddress?.state}</p>
                                            ) : (
                                                null
                                            )}
                                        </div>

                                        {/* Zip code   */}
                                        <div className="relative z-0">
                                            <Field
                                                type="text"
                                                name="billingAddress.zipCode"
                                                id="billingAddress.zipCode"
                                                className="block py-2.5  w-full text-sm bg-transparent border-0 border-b-2  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer"
                                                placeholder=" "
                                                autoComplete="off"
                                            />

                                            <label htmlFor="billingAddress.zipCode" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0  peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">Zip Code</label>
                                            <PiFileZipFill className='absolute top-4 right-4 text-xl' />
                                            {errors.billingAddress?.zipCode && touched.billingAddress?.zipCode ? (
                                                <p className='text-red-600'>*{errors.billingAddress?.zipCode}</p>
                                            ) : (
                                                null
                                            )}
                                        </div>
                                        {/* country  */}
                                        <div className='w-full relative  sm:col-span-2'>
                                            <Field
                                                as="select"
                                                name="billingAddress.country"
                                                id="billingAddress.country"
                                                className='block py-2.5     border-0  appearance-none  dark:border-gray-600 dark:focus:border-green-700 focus:outline-none focus:ring-0  peer bg-transparent border-gray-600 text-[#333] w-full text-sm border-b-2  outline-none '
                                            >
                                                <option value="india">India</option>
                                            </Field>
                                            <label htmlFor="billingAddress.country" className="absolute text-sm   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 text-green-700 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ">Country/Region</label>
                                            {errors.billingAddress?.country && touched.billingAddress?.country ? (
                                                <p className='text-red-600'>*{errors.billingAddress?.country}</p>
                                            ) : (
                                                null
                                            )}
                                        </div>
                                    </div>
                                )}

                            </div>
                            {/* payment method  */}
                            <div>
                                <h3 className="text-lg font-bold text-[#333]  mt-6">Payment Method</h3>
                                <div className='flex flex-wrap xs:gap-10 gap-4 mt-2'>
                                    {/* <div className='flex items-center gap-1'>
                                        <Field
                                            type="radio"
                                            id='credit-card'
                                            name="paymentMethod"
                                            value="Credit Card"

                                        />
                                        <label htmlFor="credit-card">Credit Card</label>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Field
                                            type="radio"
                                            id='debit-card'
                                            name="paymentMethod"
                                            value="Debit Card"

                                        />
                                        <label htmlFor="debit-card">Debit Card</label>
                                    </div> */}
                                    <div className='flex items-center gap-1'>
                                        <Field
                                            type="radio"
                                            id='online_payment'
                                            name="paymentMethod"
                                            value="online_payment"

                                        />
                                        <label htmlFor="online_payment">Online Payment</label>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Field
                                            type="radio"
                                            id='cash_on_delivery'
                                            name="paymentMethod"
                                            value="cash_on_delivery"

                                        />
                                        <label htmlFor="cash_on_delivery">Cash on Delivery</label>
                                    </div>
                                    {errors?.paymentMethod && touched?.paymentMethod ? (
                                        <p className='text-red-600'>*{errors?.paymentMethod}</p>
                                    ) : (
                                        null
                                    )}
                                </div>
                            </div>
                            {/* cancel and complete btn  */}
                            <div className="flex gap-10 max-sm:flex-col mt-10">
                                {/* <button type="button" className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-transparent hover:bg-gray-100 border-2 text-[#333]">Cancel</button> */}

                                <button type="submit" className="rounded-md px-6 py-3 w-full text-sm font-semibold bg-[var(--bgColorPrimary)] text-white hover:tracking-widest transition-all duration-500">Complete Your Order</button>
                            </div>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default CheckoutForm;
