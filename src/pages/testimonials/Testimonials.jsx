import React, { lazy, Suspense } from 'react'
import SEO from '../../helper/SEO/SEO'

const TestimonialSlider = lazy(() => import('../../components/testimonialSlider/TestimonialSlider'));

const Testimonials = () => {

  return (
    <div className='mb-28'>
      <SEO
        title="Testimonials - Our Customers Love Us"
        description="Experience the difference firsthand. Explore our collection of customer testimonials and see why Organic Nation is the best choice."
        canonicalUrl="https://organicnation.co.in/testimonials"
        ogTitle="Testimonials - Our Customers Love Us"
        ogDescription="Experience the difference firsthand. Explore our collection of customer testimonials and see why Organic Nation is the best choice."
        ogUrl="https://organicnation.co.in/testimonials"
        ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
        ogImageWidth="478"
        ogImageHeight="446"
        twitterTitle="Testimonials - Our Customers Love Us"
        twitterDescription="Experience the difference firsthand. Explore our collection of customer testimonials and see why Organic Nation is the best choice."
        twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
        twitterSite="Organic Nation"
        twitterCreator="organicnation_"
      />
      <div className=''>
        <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/testimonialBanner.webp' alt="image" className='w-full' />
      </div>
      
      <Suspense fallback={
          <div className='py-52 flex justify-center items-center'>
            <div className="loader"></div>
          </div>
        }>
          <TestimonialSlider />
        </Suspense>
    </div>

  )
}

export default Testimonials 
