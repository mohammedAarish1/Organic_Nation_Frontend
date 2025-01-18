import React  from 'react'
import { FaStar } from 'react-icons/fa6';

const SingleReview = ({ reviews }) => {

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
                {/* <div><span className='text-[14px] font-mono text-gray-500'>{new Date(reviews?.createdAt).toDateString()}</span></div> */}
            </div>

            <div className='text-sm text-gray-600 font-sans tracking-widest'>
                <p>{reviews.review}</p>
            </div>

            <div className='flex justify-start items-center gap-2'>
                <p className='  bg-[var(--bgColorPrimary)] p-[8px] py-[1px] rounded-full text-white'>{reviews?.userName[0]}</p>
                <p className='tracking-wider font-sans xs:text-sm text-xs '>{reviews?.userName}</p>
            </div>

        </div>
    )
}

export default SingleReview;
