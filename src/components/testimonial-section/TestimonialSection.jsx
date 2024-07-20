import React from 'react'
import Title from '../title/Title'
import { Link } from 'react-router-dom';
// react icons 

import customers from '../../images/customers/customer.webp'


const TestimonialSection = ({ showBtn = false }) => {

    // array for img src is pending
    return (
        <div className=' pb-20'>
            <div className='text-center pt-32 pb-20 px-10'>
                <Title text="Love From Our Customers" />
                <p>Testimonials</p>
            </div>
            <div className='flex flex-wrap justify-center items-center gap-10 px-10 py-10'>

                <div className='md:w-1/4 flex flex-col justify-center items-center '
                    data-aos="flip-right"
                    data-aos-duration="1000"
                >
                    <img src={customers} alt="recipes" className='md:w-96 rounded-2xl' />


                </div>
                <div className=' flex md:w-1/4 flex-col justify-center items-center '
                    data-aos="flip-right"
                    data-aos-duration="1000"
                >
                    <img src={customers} alt="recipes" className='md:w-96 rounded-2xl' />


                </div>
                <div className=' flex md:w-1/4 flex-col justify-center items-center '
                    data-aos="flip-right"
                    data-aos-duration="1000"
                >
                    <img src={customers} alt="recipes" className='md:w-96 rounded-2xl' />


                </div>
                <div className=' flex md:w-1/4 flex-col justify-center items-center '
                    data-aos="flip-right"
                    data-aos-duration="1000"
                >
                    <img src={customers} alt="recipes" className='md:w-96 rounded-2xl' />


                </div>
                <div className=' flex md:w-1/4 flex-col justify-center items-center '
                    data-aos="flip-right"
                    data-aos-duration="1000"
                >
                    <img src={customers} alt="recipes" className='md:w-96 rounded-2xl' />
                </div>

            </div>

            {showBtn && (
                <div className='text-center text-white uppercase '>
                    <Link to="/testimonials" className='bg-[var(--themeColor)] px-5 py-4 uppercase font-semibold transition-all duration-500 hover:tracking-widest' >View More</Link>
                </div>
            )}


        </div>
    )
}

export default TestimonialSection;
