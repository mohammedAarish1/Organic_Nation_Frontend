import React from 'react'
import bannerImg from '../../images/blog.png'
import BlogSection from '../../components/blog-section/BlogSection';


const Blogs = () => {
    return (
        <div>
            <div>
                <img src={bannerImg} alt="blog-image" className='w-full h-[600px] md:object-fill sm:object-cover' />
            </div>
            <div>
                <BlogSection />
            </div>
        </div>
    )
}

export default Blogs;
