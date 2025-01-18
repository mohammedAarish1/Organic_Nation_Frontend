import React, { lazy, Suspense } from 'react'
// import bannerImg from '../../images/blog.png'
// import BlogSection from '../../components/blog-section/BlogSection';
import SEO from '../../helper/SEO/SEO';

const BlogSection = lazy(() => import('../../components/blog-section/BlogSection'))

const Blogs = () => {
    return (
        <div>
            <SEO
                title="The Blog- Organic Nation"
                description="Explore our blog for informative articles, industry news, and company updates."
                canonicalUrl="https://organicnation.co.in/our-blogs"
                ogTitle="The Blog- Organic Nation"
                ogDescription="Explore our blog for informative articles, industry news, and company updates."
                ogUrl="https://organicnation.co.in/our-blogs"
                ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/blog.png"
                ogImageWidth="478"
                ogImageHeight="446"
                twitterTitle="The Blog- Organic Nation"
                twitterDescription="Explore our blog for informative articles, industry news, and company updates."
                twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/blog.png"
                twitterSite="Organic Nation"
                twitterCreator="organicnation_"
            />
            <div>
                <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/blog.webp' alt="blog-image" className='w-full sm:h-[600px] md:object-fill sm:object-cover' />
            </div>
            <div>
                <Suspense fallback={
                    <div className='py-52 flex justify-center items-center'>
                        <div className="loader"></div>
                    </div>
                }>
                    <BlogSection />
                </Suspense>
            </div>
        </div>
    )
}

export default Blogs;
