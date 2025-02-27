import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addReviews } from '../features/reviews/reviews';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ReviewsAndRatings = ({ productName, insideProductDetails = false }) => {



    const initialValues = {
        rating: 0,
        review: '',
    };

    const validationSchema = Yup.object({
        rating: Yup.number().min(1, 'Please select a rating').required('Rating is required'),
        review: Yup.string().required('Review is required'),
    });


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);




    const handleSubmit = (values, { resetForm }) => {
        if (user) {
            dispatch(addReviews({ productName, ...values }))
            toast.success("Review submitted successfully");

        } else {
            // dispatch(setReviewStatus(true));
            sessionStorage.setItem('reviews&rating', JSON.stringify({ productName, ...values }))
            navigate('/register')
        }
        resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <div className='flex flex-col xs:gap-5 gap-2'>
                        {/* ========ratings ========== */}
                        <div className='flex flex-col gap-2'>
                            <label className='tracking-widest'>Rating:</label>
                            <div className='flex justify-start items-center gap-2'>
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <label key={index}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={ratingValue}
                                                onClick={() => setFieldValue('rating', ratingValue)}
                                                className='hidden'
                                            />
                                            <FaStar
                                                color={ratingValue <= values.rating ? "#ffc107" : "#e4e5e9"}
                                                size={20}
                                                className='cursor-pointer'
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                            <ErrorMessage name="rating" component="div" className='text-red-600 text-[10px]' />
                        </div>
                        {/* ============ reviews =========== */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="review" className='tracking-widest'>Review:</label>
                            <Field
                                as="textarea"
                                id="review"
                                name="review"
                                className={`${insideProductDetails ? ('text-black xs:text-[13px] text-sm w-full  px-3 pt-2 bg-[var(--bgColorSecondary)] border border-black  tracking-widest rounded-lg') : ('text-black xs:text-[16px] text-sm w-full outline-none px-2 py-1')} `}
                                placeholder="Write your review here"
                                cols="50"
                                rows={`${insideProductDetails ? '2' : '10'}`}
                            />
                            <ErrorMessage name="review" component="div" className='text-red-600 text-[10px]' />
                        </div>

                        {/* ========submit button ========== */}
                        <div className='py-2 mt-3 flex justify-center '>
                            <button className="bg-gradient-to-r to-green-700 from-[var(--themeColor)] text-white font-semibold text-lg py-2 px-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl ">
                                <span className="flex items-center gap-2">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12h7m-3 4l3-4-3-4" />
                                    </svg> */}
                                    Submit Review
                                </span>
                            </button>

                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ReviewsAndRatings;