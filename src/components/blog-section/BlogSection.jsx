import React, { useEffect } from 'react'
import Title from '../title/Title'
import { Link } from 'react-router-dom';
// react icons 
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../../imports';



const BlogSection = ({ homePage = false }) => {

    const { blogs, loading } = useSelector(state => state.blog)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBlogs());
    }, [])

    // array for img src is pending
    if (loading) return <div>loading...</div>

    return (
        <div className=''>
            <div className='flex flex-col justify-center items-center gap-2 xs:pt-32 xs:pb-20 pt-16 pb-10 px-10'>
                <Title heading="Our Blogs" subHeading='Passionate about sustainable living, Organic Nation offers expert tips, eco-friendly products, and inspiring stories for a greener, healthier lifestyle.' />
            </div>

            <div className='flex flex-wrap justify-center gap-10 px-10 py-10 '>
                {blogs.slice(0, homePage ? 3 : blogs?.length)?.map(blog => (
                    <Link
                        to={`/blogs/${blog['title-url']}`}
                        key={blog._id}
                        className='flex md:w-1/4  flex-col gap-2 '
                        data-aos="flip-up"
                        data-aos-duration="1000"
                    >
                        <div className='flex flex-col gap-5'>
                            <div className='md:w-full bg-gray-400'>
                                <img src={blog.image} alt="recipes" className='w-full h-full object-contain rounded-2xl ' />
                            </div>
                            <p className='text-sm text-gray-800 font-bold font-serif tracking-widest '>{new Date(blog?.date).toDateString()}</p>

                        </div>

                        <div className=' flex flex-col justify-between gap-2  h-full'>
                            <p className=' text-[var(--bgColorPrimary)] font-semibold'>{blog.title}</p>

                            <div className='place-self-end'>
                                <div className=" flex  text-[var(--themeColor)] hover:text-orange-500 justify-end items-center gap-2 py-1   font-semibold rounded-lg  uppercase "><span className='underline-hover text-sm'>Continue Reading</span> <FaArrowRightLong /></div>
                            </div>

                        </div>

                    </Link>
                ))}
                {/* box 1  */}

                {/* box 1  */}

            </div>

            {homePage && (
                <div className='text-center text-white uppercase '>
                    <Link to="/our-blogs" className='bg-[var(--themeColor)] px-5 py-4 uppercase font-semibold transition-all duration-500 hover:tracking-widest' >View More</Link>
                </div>
            )}


        </div>
    )
}

export default BlogSection;


