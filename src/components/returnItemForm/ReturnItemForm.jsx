import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addReturnItems } from '../../features/manageOrders/manageOrders';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_BACKEND_URL;


const productSchema = Yup.object().shape({
    itemName: Yup.string().required('Required'),
    weight: Yup.string().required('Required'),
    price: Yup.number().positive('Must be positive').required('Required'),
    quantity: Yup.number().positive('Must be positive').required('Required'),
    images: Yup.array()
        .min(1, 'At least one image is required and You can only upload a maximum of 3 images'),
    // .max(3, 'You can only upload a maximum of 3 images'),
    reason: Yup.string().required('Please let us know a Valid Reason for your return !'),
});

const FormField = ({ name, label, type = "text", as }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-500 mb-1 tracking-widest">{label}</label>
        <Field
            name={name}
            type={type}
            as={as}
            readOnly
            className="mt-1 block w-full rounded-sm  px-2 py-1 border border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <ErrorMessage name={name} component="div" className="mt-1 text-sm text-red-600" />
    </div>
);

const ReturnItemForm = ({ product, paymentMethod, amountPaid, orderNo, onSubmit, onCancel }) => {

    const dispatch = useDispatch();
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(product.quantity || 0);
    // const [imageError, setImageError] = useState('');


    const actualAmountPaid = (productMRP) => {
        // Find the product details based on the nameUrl
        if (!product) {
            return <p>Product not found</p>;
        }

        let discountedPrice;
        // Calculate the discounted unit price
        if (paymentMethod === 'cash_on_delivery') {
            discountedPrice = amountPaid;

        } else {
            const totalDiscountInPercentage = 100 - (amountPaid * 100 / productMRP)
            discountedPrice = productMRP - ((productMRP * (totalDiscountInPercentage + 5)) / 100);

        }
        return Math.round(discountedPrice);

    }

    const initialValues = product ? {
        itemName: product['name-url'].replace(/-/g, ' '),
        weight: product.weight,
        price: actualAmountPaid(product.unitPrice) * quantity,
        quantity: product.quantity,
        images: [],
        reason: '',
    } : {
        itemName: '',
        weight: '',
        price: '',
        quantity: '',
        images: [],
        reason: '',
    };


    const handleImageChange = (e, setFieldValue, values) => {
        const files = Array.from(e.target.files);
        const currentImages = values.images || [];
        const newTotalImages = currentImages.length + files.length;

        // if (newTotalImages > 3) {
        //     setImageError('You can only upload a maximum of 3 images.');
        //     return;
        // }

        setFieldValue('images', [...currentImages, ...files].slice(0, 3));
        // setImageError('');
    };

    // const removeImage = (index) => {
    //     setImages(images.filter((_, i) => i !== index));
    //     setImageWarning('');
    // };



    // const handleSubmit = async (values, { setSubmitting }) => {


    //     // const data = new FormData();

    //     // Object.keys(values).forEach(key => {
    //     //     data.append(key, values[key]);
    //     // });
    //     // images.forEach(image => {
    //     //     data.append('images', image);
    //     // });

    //     // console.log('Form values:', values);
    //     // console.log('Images:', images);

    //     // console.log('FormData contents:');
    //     // for (let [key, value] of data.entries()) {
    //     //     console.log(key, value);
    //     // }

    //     console.log('data')
    //     try {
    //         // let response;
    //         // if (product) {
    //         //     response = await axios.put(`/api/products/edit/${product._id}`, data);


    //         // } else {
    //         //     // response = await axios.post(`${apiUrl}/api/admin/products/add`, data);
    //         //     dispatch(addNewProductInDatabase(data)).unwrap();
    //         //     // .then((res) => {
    //         //     //     console.log('res', res)
    //         //     // })
    //         // }
    //         // onSubmit();
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //     }
    //     setSubmitting(false);
    // };



    const handleSubmit = (values, { setSubmitting }, action) => {
        const data = new FormData();

        // Append form values to FormData
        Object.keys(values).forEach(key => {
            data.append(key, values[key]);
        });

        // Append images to FormData
        values.images.forEach((image, index) => {
            data.append(`images`, image);
        });

        // Append orderNo
        data.append('orderNo', orderNo);

        // console.log('FormData contents before dispatch:');
        // for (let [key, value] of data.entries()) {
        //     console.log(key, typeof value, value);
        // }

        try {
            dispatch(addReturnItems(data))
                .unwrap()
                .then(() => {
                    toast.success('Request Submitted Succefully')
                })
                .catch(() => { })
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        setSubmitting(false);
        action.resetForm();
    };



    return (
        <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, setFieldValue, errors, values, touched }) => {

                const handleQuantityChange = (e) => {
                    const quantity = Number(e.target.value);

                    // Ensure quantity does not exceed product.quantity
                    if (quantity > product.quantity) {
                        alert(`Quantity cannot exceed ${product.quantity}`);
                        return; // Early exit to prevent further updates
                    }

                    setFieldValue("quantity", quantity);
                    // Update price based on quantity and unit price
                    const newPrice = actualAmountPaid(product.unitPrice) * quantity;
                    setFieldValue("price", newPrice);
                };

                return (
                    <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <FormField name="itemName" label="Product Name" />
                        <FormField name="weight" label="Weight" />
                        <FormField name="price" label="Price" type="number" />
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={values.quantity}
                                onChange={handleQuantityChange}
                                className='mt-1 block w-full rounded-sm  px-2 py-1 border border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            />
                            <ErrorMessage name="quantity" component="div" className="mt-1 text-sm text-red-600" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Valid Reason for Returning</label>
                            <Field
                                as="textarea"
                                name="reason"
                                className='mt-1 block w-full rounded-sm px-2 py-1 border border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            />
                            <ErrorMessage name="reason" component="div" className="mt-1 text-sm text-red-600" />

                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Images (maximum 3 images)</label>
                            <input
                                type="file"
                                multiple
                                // onChange={handleImageChange}
                                onChange={(e) => handleImageChange(e, setFieldValue, values)}
                                className="mt-1 block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-indigo-50 file:text-indigo-700
                                        hover:file:bg-indigo-100"
                            />
                            <ErrorMessage name="images" component="div" className="mt-1 text-sm text-red-600" />
                            {/* <div className="mt-2">
                                {images.map((image, index) => (
                                    <div key={index} className="inline-block mr-2 mb-2">
                                        <img src={URL.createObjectURL(image)} alt={`Upload ${index + 1}`} className="h-20 w-20 object-cover" />
                                        <button type="button" onClick={() => removeImage(index)} className="mt-1 text-red-500">Remove</button>
                                    </div>
                                ))}
                            </div> */}
                            <div className="mt-2">
                                {values.images && values.images.map((image, index) => (
                                    <div key={index} className="inline-block mr-2 mb-2">
                                        <img src={URL.createObjectURL(image)} alt={`Upload ${index + 1}`} className="h-20 w-20 object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newImages = values.images.filter((_, i) => i !== index);
                                                setFieldValue('images', newImages);
                                                // setImageError('');
                                            }}
                                            className="mt-1 text-red-500"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Submit Request
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                )
            }

            }
        </Formik>
    );
};

export default ReturnItemForm;