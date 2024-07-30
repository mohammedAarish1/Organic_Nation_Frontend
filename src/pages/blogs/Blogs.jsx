import React from 'react'
// import bannerImg from '../../images/blog.png'
import BlogSection from '../../components/blog-section/BlogSection';


const Blogs = () => {
    return (
        <div>
            <div>
                <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/blog.png' alt="blog-image" className='w-full sm:h-[600px] md:object-fill sm:object-cover' />
            </div>
            <div>
                <BlogSection />
            </div>
        </div>
    )
}

export default Blogs;
