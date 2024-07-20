import React from 'react'
import Title from '../title/Title'
import { Link } from 'react-router-dom';
// react icons 
import { FaArrowRightLong } from "react-icons/fa6";


const BlogSection = ({ showBtn = false }) => {

    // array for img src is pending
    return (
        <div className=''>
            <div className='flex flex-col justify-center items-center gap-2 xs:pt-32 xs:pb-20 pt-16 pb-10 px-10'>
                <Title text="Our Blogs" />
                <p className='w-1/2 text-center text-[var(--themeColor)]'>Passionate about sustainable living, Organic Nation offers expert tips, eco-friendly products, and inspiring stories for a greener, healthier lifestyle.</p>
            </div>

            <div className='flex flex-wrap justify-center items-center gap-10 px-10 py-10'>
                {/* box 1  */}
                <div className='flex md:w-1/4  flex-col justify-center items-start '
                    data-aos="flip-up"
                    data-aos-duration="1000"
                >

                    <img src='https://img.freepik.com/premium-photo/person-takes-picture-their-food-their-phone_950347-4411.jpg?w=1060' alt="recipes" className='md:w-96 rounded-2xl' />

                    <div className=' flex flex-col gap-1'>
                        <p className='text-sm text-gray-400 font-serif tracking-widest'>May 21, 2024</p>
                        <p className='font-medium text-[var(--themeColor)] '>Lorem ipsum dolor sit amet iskos</p>
                    </div>

                    <div className='place-self-end '>
                        <Link to="/blog-details" className=" flex  text-[var(--themeColor)] hover:text-orange-500 justify-end items-center gap-2 py-1   font-semibold rounded-lg  uppercase "><span className='underline-hover text-sm'>Continue Reading</span> <FaArrowRightLong /></Link>
                    </div>

                </div>
                {/* box 1  */}
                {/* box 1  */}
                <div className='flex md:w-1/4  flex-col justify-center items-start '
                    data-aos="flip-up"
                    data-aos-duration="1000"
                >

                    <img src='https://img.freepik.com/premium-photo/person-takes-picture-their-food-their-phone_950347-4411.jpg?w=1060' alt="recipes" className='md:w-96 rounded-2xl' />

                    <div className=' flex flex-col gap-1'>
                        <p className='text-sm text-gray-400 font-serif tracking-widest'>May 21, 2024</p>
                        <p className='font-medium text-[var(--themeColor)] '>Lorem ipsum dolor sit amet iskos</p>
                    </div>

                    <div className='place-self-end '>
                        <Link to="/recipe-details" className=" flex  text-[var(--themeColor)] hover:text-orange-500 justify-end items-center gap-2 py-1   font-semibold rounded-lg  uppercase "><span className='underline-hover text-sm'>Continue Reading</span> <FaArrowRightLong /></Link>
                    </div>

                </div>
                {/* box 1  */}
                {/* box 1  */}
                <div className='flex md:w-1/4  flex-col justify-center items-start '
                    data-aos="flip-up"
                    data-aos-duration="1000"
                >

                    <img src='https://img.freepik.com/premium-photo/person-takes-picture-their-food-their-phone_950347-4411.jpg?w=1060' alt="recipes" className='md:w-96 rounded-2xl' />

                    <div className=' flex flex-col gap-1'>
                        <p className='text-sm text-gray-400 font-serif tracking-widest'>May 21, 2024</p>
                        <p className='font-medium  text-[var(--themeColor)]'>Lorem ipsum dolor sit amet iskos</p>
                    </div>

                    <div className='place-self-end '>
                        <Link to="/recipe-details" className=" flex  text-[var(--themeColor)] hover:text-orange-500 justify-end items-center gap-2 py-1   font-semibold rounded-lg  uppercase "><span className='underline-hover text-sm'>Continue Reading</span> <FaArrowRightLong /></Link>
                    </div>

                </div>
                {/* box 1  */}




            </div>

            {showBtn && (
                <div className='text-center text-white uppercase '>
                    <Link to="/our-blogs" className='bg-[var(--themeColor)] px-5 py-4 uppercase font-semibold transition-all duration-500 hover:tracking-widest' >View More</Link>
                </div>
            )}


        </div>
    )
}

export default BlogSection;


