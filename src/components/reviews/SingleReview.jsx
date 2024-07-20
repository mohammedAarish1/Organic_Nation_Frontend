import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa6';

const SingleReview = ({ reviews }) => {

    const [customerName, setCustomerName] = useState('');
    console.log(reviews)


    const getCustomerName = async (email) => {

        try {
            const response = await axios.get(`http://localhost:4000/api/auth/user/${email}`,
            );
            console.log('responseeeeeeeeee', response)
            if (response.statusText === 'OK') {
                let fullName = response?.data?.firstName + ' ' + response?.data?.lastName
                setCustomerName(fullName);
            }
        } catch (error) {
            return error
        }
    }


    useEffect(() => {
        if (reviews) {
            getCustomerName(reviews.userEmail)
        }
    }, [])

    return (
        <div className='w-full shadow-lg px-5 py-4 rounded-lg  flex flex-col gap-3' >
            <div className='flex justify-between'>
                <div className='flex justify-start items-center xs:gap-2'>
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    // value={ratingValue}
                                    // onClick={() => setFieldValue('rating', ratingValue)}
                                    className='hidden'
                                />
                                <FaStar
                                    color={ratingValue <= reviews.rating ? "#FB923C" : "#e4e5e9"}
                                    className='cursor-pointer text-[15px]'
                                />
                            </label>
                        );
                    })}
                </div>
                <div><span className='text-[14px] font-mono text-gray-500'>{new Date(reviews?.createdAt).toDateString()}</span></div>
            </div>

            <div className='text-sm text-gray-600 font-sans tracking-widest'>
                <p>{reviews.review}</p>
            </div>

            <div className='flex justify-start items-center gap-2 '>
                <p className='px-2 py-1  bg-[var(--bgColorPrimary)] rounded-full text-white'>{customerName[0]}</p>
                <p className='tracking-wider font-sans xs:text-sm text-xs '>{customerName}</p>
            </div>

        </div>
    )
}

export default SingleReview;
