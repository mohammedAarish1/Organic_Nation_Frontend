import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FiX, FiSave, } from 'react-icons/fi';
import { states } from '../../helper/stateList';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddingNewAddress, updateExistingAddress } from '../../features/user-profile/userProfile';
import { checkDeliveryAndCalculateShippingFee } from "../../helper/helperFunctions";
import { toast } from 'react-toastify';
import { getUserData } from '../../features/auth/auth';

const AddressForm = ({ onSubmit, onCancel, address }) => {

    const dispatch = useDispatch();
    const { userCity, userPincode, userState,isAvailable} = useSelector((state) => state.delivery);


    const validationSchema = Yup.object({
        mainAddress: Yup.string().required('Address is required'),
        optionalAddress: Yup.string(),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        pinCode: Yup.string().matches(/^\d{6}$/, 'Invalid PIN code').required('PIN code is required'),
        addressType: Yup.string().required('Address type is required'),
    });

    const initialValues = {
        mainAddress: address ? address.mainAddress : '',
        optionalAddress: address ? address.optionalAddress : '',
        city: address ? address.city : '',
        state: address ? address.state : '',
        pinCode: address ? address.pinCode : '',
        addressType: address ? address.addressType : '',
    };

    const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
        if (!address) {
            dispatch(handleAddingNewAddress(values))
                .then((result) => {
                    if (result?.error?.message === 'Rejected') {
                        toast.error(result?.payload)

                    } else {
                        dispatch(getUserData())
                        toast.info('Address added successfully !')
                        resetForm();
                        onCancel()

                    }
                })

        } else {
            const payload = { addressId: address?._id, data: values }
            dispatch(updateExistingAddress(payload))
                .then((result) => {
                    if (result?.error?.message === 'Rejected') {
                        toast.error(result?.payload)

                    } else {
                        dispatch(getUserData())
                        toast.info(result?.payload?.message)
                        resetForm();
                        onCancel();


                    }
                })

        }
        setSubmitting(false);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
        >
            {({ values, errors, touched, handleChange, isSubmitting, setFieldValue }) => (
                <Form className="bg-whit rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input
                            type="text"
                            name="mainAddress"
                            value={values.mainAddress}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg  focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none"
                        />
                        {errors.mainAddress && touched.mainAddress && (
                            <div className="text-red-500 text-sm mt-1">{errors.mainAddress}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Optional Address</label>
                        <input
                            type="text"
                            name="optionalAddress"
                            value={values.optionalAddress}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                            <input
                                type="text"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                            />
                            {errors.city && touched.city && (
                                <div className="text-red-500 text-sm mt-1">{errors.city}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>

                            <select
                                name="state"
                                id="state"
                                value={values.state}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"

                            >
                                <option value="select-state">Select State</option>
                                {states.map((state) => (
                                    <option key={state} value={state} className="">
                                        {state}
                                    </option>
                                ))}
                            </select>

                            {errors.state && touched.state && (
                                <div className="text-red-500 text-sm mt-1">{errors.state}</div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                            <input
                                type="text"
                                name="pinCode"
                                value={values.pinCode}
                                // onChange={handleChange}
                                onBlur={(e) => {
                                    setFieldValue("state", userState)
                                    setFieldValue("city", userCity)
                                }}
                                onChange={(e) => {
                                    setFieldValue('pinCode', e.target.value)

                                    if (e.target.value.length === 6) {

                                        checkDeliveryAndCalculateShippingFee(
                                            e.target.value,
                                            dispatch
                                        );
                                    }
                                }}
                                className={`w-full px-4 py-3 rounded-lg outline-none ${!isAvailable && isAvailable!==null && 'outline-red-600 border-red-500'} focus:border-green-500 focus:ring-2 focus:ring-green-200`}

                            />
                            {errors.pinCode && touched.pinCode && (
                                <div className="text-red-500 text-sm mt-1">{errors.pinCode}</div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                            <input
                                type="text"
                                name="addressType"
                                value={values.addressType}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                            />
                            {errors.addressType && touched.addressType && (
                                <div className="text-red-500 text-sm mt-1">{errors.addressType}</div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full md:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <FiX size={18} />
                            <span>Cancel</span>
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <FiSave size={18} />
                            <span>{address ? 'Update Address' : 'Save Address'}</span>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};


export default AddressForm;





