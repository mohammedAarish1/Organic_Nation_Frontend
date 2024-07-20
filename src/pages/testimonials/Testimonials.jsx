import React from 'react'

// testimonials images 
import bannerImg from '../../images/testimonialBanner.png'
import TestimonialSlider from '../../components/testimonialSlider/TestimonialSlider';
import TestimonialSection from '../../components/testimonial-section/TestimonialSection';


const Testimonials = () => {


  return (
    <div className=' mb-28'>
      <div className=''>
        <img src={bannerImg} alt="image" className='w-full' />
      </div>
      {/* images or videos */}
      <div>
        <TestimonialSection/>
      </div>

      {/* customer feedback section  */}

      <div className="w-[80%] mx-auto flex flex-wrap items-center mb-20">
        <div className="w-full lg:w-2/3 px-4 mb-12 lg:mb-0">
          <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-[var(--titleTextColor)] bg-orange-50 rounded-full">TESTIMONIALS</span>
          <h1 className="font-heading text-5xl xs:text-5xl font-semibold text-[var(--themeColor)] mb-4">
            <span>What our customers </span>
            <span className="font-serif italic">said</span>
          </h1>
          <p className="text-[var(--paraTextColor)]">Read what our valued customers have to say!</p>
        </div>

      </div>

      <TestimonialSlider />
    </div>

  )
}

export default Testimonials 
