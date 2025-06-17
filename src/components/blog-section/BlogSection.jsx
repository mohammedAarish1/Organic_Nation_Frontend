// import React, { useEffect } from 'react'
// import Title from '../title/Title'
// import { Link } from 'react-router-dom';
// // react icons 
// import { FaArrowRightLong } from "react-icons/fa6";
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllBlogs } from '../../imports';



// const BlogSection = ({ homePage = false }) => {

//     const { blogs, loading } = useSelector(state => state.blog)

//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getAllBlogs());
//     }, [])

//     // array for img src is pending
//     if (loading) return <div>loading...</div>

//     return (
//         <div className=''>
//             <div className='flex flex-col justify-center items-center gap-2 xs:pt-32 xs:pb-20 pt-16 pb-10 px-10'>
//                 <Title heading="Our Blogs" subHeading='Passionate about sustainable living, Organic Nation offers expert tips, eco-friendly products, and inspiring stories for a greener, healthier lifestyle.' />
//             </div>

//             <div className='flex flex-wrap justify-center gap-10 px-10 py-10 '>
//                 {blogs.slice(0, homePage ? 3 : blogs?.length)?.map(blog => (
//                     <Link
//                         to={`/blogs/${blog['title-url']}`}
//                         key={blog._id}
//                         className='flex md:w-1/4  flex-col gap-2 '
//                         data-aos="flip-up"
//                         data-aos-duration="1000"
//                     >
//                         <div className='flex flex-col gap-5'>
//                             <div className='md:w-full bg-gray-400'>
//                                 <img src={blog.image} alt="recipes" className='w-full h-full object-contain rounded-2xl ' />
//                             </div>
//                             <p className='text-sm text-gray-800 font-bold font-serif tracking-widest '>{new Date(blog?.date).toDateString()}</p>

//                         </div>

//                         <div className=' flex flex-col justify-between gap-2  h-full'>
//                             <p className=' text-[var(--bgColorPrimary)] font-semibold'>{blog.title}</p>

//                             <div className='place-self-end'>
//                                 <div className=" flex  text-[var(--themeColor)] hover:text-orange-500 justify-end items-center gap-2 py-1   font-semibold rounded-lg  uppercase "><span className='underline-hover text-sm'>Continue Reading</span> <FaArrowRightLong /></div>
//                             </div>

//                         </div>

//                     </Link>
//                 ))}
//                 {/* box 1  */}

//                 {/* box 1  */}

//             </div>

//             {homePage && (
//                 <div className='text-center text-white uppercase '>
//                     <Link to="/our-blogs" className='bg-[var(--themeColor)] px-5 py-4 uppercase font-semibold transition-all duration-500 hover:tracking-widest' >View More</Link>
//                 </div>
//             )}


//         </div>
//     )
// }

// export default BlogSection;




import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Title from '../title/Title'
import { Link } from 'react-router-dom'
import {
    FaCalendarAlt, FaClock
} from "react-icons/fa"
import {
    FaArrowRightLong,
} from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from '../../imports'
import SubmitButton from '../button/SubmitButton'

const BlogSection = ({ homePage = false }) => {
    const { blogs, loading } = useSelector(state => state.blog)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBlogs())
    }, [])

    // Enhanced loading component
    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <motion.div
                    className="flex space-x-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: 'var(--themeColor)' }}
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </motion.div>
            </div>
        )
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    }

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    }

    const imageVariants = {
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    }

    const buttonVariants = {
        hover: {
            x: 5,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        tap: {
            scale: 0.95
        }
    }

    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-white to-[#F5EFE6]">
            {/* Background decorative elements */}

            {/* Header Section */}
            <motion.div
                className="flex flex-col justify-center items-center gap-6 pt-16 px-4 sm:px-6 lg:px-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Title
                    heading="Our Blogs"
                    subHeading='Passionate about sustainable living, Organic Nation offers expert tips, eco-friendly products, and inspiring stories for a greener, healthier lifestyle.'
                />

            </motion.div>



            {/* Blog Cards Grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-10 py-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {blogs.slice(0, homePage ? 3 : blogs?.length)?.map((blog, index) => (
                    <motion.div
                        key={blog._id}
                        variants={cardVariants}
                        whileHover={{ y: -8 }}
                        className="group relative"
                    >
                        <Link
                            to={`/blogs/${blog['title-url']}`}
                            className="block h-full"
                        >
                            {/* Card Container */}
                            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col relative border border-[var(--neutral-color)]/20">

                                {/* Card Number Badge */}
                                <div
                                    className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                                    style={{ backgroundColor: 'var(--themeColor)' }}
                                >
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Image Container */}
                                <div className="relative overflow-hidden rounded-t-3xl aspect-[16/10] bg-[var(--neutral-color)]/10">
                                    <motion.img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                        variants={imageVariants}
                                        whileHover="hover"
                                    />

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Reading time badge */}
                                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-xs font-medium text-[var(--text-color)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <FaClock />
                                        <span>5 min read</span>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="p-6 flex flex-col flex-grow">

                                    {/* Date */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaCalendarAlt
                                            className="text-sm"
                                            style={{ color: 'var(--accent-color)' }}
                                        />
                                        <span
                                            className="text-sm font-medium tracking-wide uppercase"
                                            style={{ color: 'var(--text-color)' }}
                                        >
                                            {new Date(blog?.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-[var(--themeColor)] transition-colors duration-300"
                                        style={{ color: 'var(--text-color)' }}
                                    >
                                        {blog.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p
                                        className="text-sm leading-relaxed mb-6 line-clamp-3 flex-grow"
                                        style={{ color: 'var(--text-color)' }}
                                    >
                                        {blog.excerpt || "Discover insights and tips for sustainable living and organic lifestyle choices that make a difference."}
                                    </p>

                                    {/* Read More Button */}
                                    <motion.div
                                        className="flex items-center justify-between pt-4 border-t border-[var(--neutral-color)]/20"
                                        variants={buttonVariants}
                                        whileHover="hover"
                                        whileTap="tap"
                                    >
                                        <div className="flex items-center gap-3 group/btn">
                                            <span
                                                className="text-sm font-semibold uppercase tracking-wider relative overflow-hidden"
                                                style={{ color: 'var(--themeColor)' }}
                                            >
                                                Continue Reading
                                                <motion.div
                                                    className="absolute bottom-0 left-0 h-0.5 bg-[var(--themeColor)] w-0 group-hover/btn:w-full transition-all duration-300"
                                                />
                                            </span>
                                            <motion.div
                                                className="p-2 rounded-full transition-colors duration-300"
                                                style={{
                                                    backgroundColor: 'var(--background-color)',
                                                    color: 'var(--themeColor)'
                                                }}
                                                whileHover={{
                                                    backgroundColor: 'var(--themeColor)',
                                                    color: 'var(--text-light-color)'
                                                }}
                                            >
                                                <FaArrowRightLong className="text-sm" />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* View More Button */}
            {homePage && (
                <motion.div
                    className="text-center py-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <Link to="/our-blogs" className='flex justify-center items-center'>
                        <SubmitButton text='View All Blogs' />
                    </Link>
                </motion.div>
            )}
        </div>
    )
}

export default BlogSection