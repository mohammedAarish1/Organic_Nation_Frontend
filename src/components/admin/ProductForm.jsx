import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addNewProductInDatabase } from '../../features/admin/adminData'

const apiUrl = import.meta.env.VITE_BACKEND_URL;


const productSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    weight: Yup.string().required('Required'),
    price: Yup.number().positive('Must be positive').required('Required'),
    discount: Yup.number().min(0, 'Must be at least 0').max(100, 'Must be at most 100').required('Required'),
    tax: Yup.number().min(0, 'Must be at least 0').required('Required'),
    hsnCode: Yup.number().positive('Must be positive').required('Required'),
    category: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    availability: Yup.number().min(0, 'Must be at least 0').required('Required'),
    buy: Yup.number().min(0, 'Must be at least 0'),
    get: Yup.number().min(0, 'Must be at least 0'),
});

const FormField = ({ name, label, type = "text", as }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-500 mb-1 tracking-widest">{label}</label>
        <Field
            name={name}
            type={type}
            as={as}
            className="mt-1 block w-full rounded-sm  px-2 py-1 border border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <ErrorMessage name={name} component="div" className="mt-1 text-sm text-red-600" />
    </div>
);

const CheckboxField = ({ name, label }) => (
    <div className="flex items-center mb-4">
        <Field
            type="checkbox"
            name={name}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor={name} className="ml-2 block text-sm text-gray-900">{label}</label>
    </div>
);

const ProductForm = ({ product, onSubmit, onCancel }) => {

    const dispatch = useDispatch();
    const [images, setImages] = useState([]);


    const initialValues = product ? {
        name: product.name,
        weight: product.weight,
        price: product.price,
        discount: product.discount,
        tax: product.tax,
        hsnCode: product['hsn-code'],
        category: product.category,
        description: product.description,
        availability: product.availability,
        buy: product.meta.buy,
        get: product.meta.get,
        season_special: product.meta.season_special,
        new_arrivals: product.meta.new_arrivals,
        best_seller: product.meta.best_seller,
        deal_of_the_day: product.meta.deal_of_the_day,
    } : {
        name: '',
        weight: '',
        price: '',
        discount: '',
        tax: '',
        hsnCode: '',
        category: '',
        description: '',
        availability: '',
        buy: '',
        get: '',
        season_special: false,
        new_arrivals: false,
        best_seller: false,
        deal_of_the_day: false,
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const data = new FormData();

        Object.keys(values).forEach(key => {
            data.append(key, values[key]);
        });
        images.forEach(image => {
            data.append('images', image);
        });

        // console.log('Form values:', values);
        // console.log('Images:', images);

        // console.log('FormData contents:');
        // for (let [key, value] of data.entries()) {
        //     console.log(key, value);
        // }
        try {
            let response;
            if (product) {
                response = await axios.put(`/api/products/edit/${product._id}`, data);


            } else {
                // response = await axios.post(`${apiUrl}/api/admin/products/add`, data);
                dispatch(addNewProductInDatabase(data)).unwrap();
                    // .then((res) => {
                    //     console.log('res', res)
                    // })
            }
            onSubmit();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <FormField name="name" label="Product Name" />
                    <FormField name="weight" label="Weight" />
                    <FormField name="price" label="Price" type="number" />
                    <FormField name="discount" label="Discount (%)" type="number" />
                    <FormField name="tax" label="Tax (%)" type="number" />
                    <FormField name="hsnCode" label="HSN Code" type="number" />
                    <FormField name="category" label="Category" />
                    <FormField name="description" label="Description" as="textarea" />
                    <FormField name="availability" label="Availability" type="number" />
                    <FormField name="buy" label="Buy" type="number" />
                    <FormField name="get" label="Get" type="number" />

                    <div className="mb-4">
                        <CheckboxField name="season_special" label="Season Special" />
                        <CheckboxField name="new_arrivals" label="New Arrivals" />
                        <CheckboxField name="best_seller" label="Best Seller" />
                        <CheckboxField name="deal_of_the_day" label="Deal of the Day" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            {product ? 'Update Product' : 'Add Product'}
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
            )}
        </Formik>
    );
};

export default ProductForm;