import React from 'react'
import Title from '../title/Title'
import { Link } from 'react-router-dom';



const TestimonialSection = ({ showBtn = false }) => {

    // array for img src is pending
    return (
        <div className=' xs:pb-20 pb-10'>
            <div className='text-center xs:pt-32 pt-10 xs:pb-20 px-10'>
                <Title heading="Love From Our Customers" />
                <p>Testimonials</p>
            </div>
            <div className='flex flex-wrap justify-center items-center gap-10 px-10 py-10'>

                <div className='md:w-1/4 flex flex-col justify-center items-center '
                    data-aos="flip-right"
                    data-aos-duration="1000"
                >
                    <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/customer.jpeg' alt="recipes" className='md:w-96 rounded-2xl' />


                </div>
                <div className=' flex md:w-1/4 flex-col justify-center items-center '
                    data-aos="flip-right"
                    data-aos-duration="1000"
                >
                    <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/customer.jpeg' alt="recipes" className='md:w-96 rounded-2xl' />


                </div>
                <div className=' flex md:w-1/4 flex-col justify-center items-center '
                    data-aos="flip-right"
                    data-aos-duration="1000"
                >
                    <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/customer.jpeg' alt="recipes" className='md:w-96 rounded-2xl' />


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
