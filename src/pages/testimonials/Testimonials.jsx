import React from 'react'
import Content from '../../components/recipes-testimonials/Content'
// react icons 
import { TiArrowLeft } from "react-icons/ti";
import { TiArrowRight } from "react-icons/ti";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div>
      <div classNameName='py-20'>
        <img src="images/testimonials.webp" alt="image" className='w-full' />
      </div>
      {/* images or videos */}
      <div>
        <Content title="Love From Our Customers" para="What Our Customers Say About Us" imgSrc="images/customers/customer.webp" path="testimonials" />
      </div>
      {/* feedbacks */}
      {/* <div classNameName=' px-10 py-10 flex  flex-wrap justify-center gap-20 items-center'>
        <div classNameName=' bg-[var(--hoverEffect)] rounded-lg p-5'>
            <p> <span classNameName='text-3xl'>“</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos et dolores quam exercitationem veritatis labore maxime voluptatibus ex itaque doloribus.<span classNameName='text-3xl'>”</span></p>
        </div>
        <div classNameName='  bg-[var(--hoverEffect)] rounded-lg p-5'>
            <p> <span classNameName='text-3xl'>“</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos et dolores quam exercitationem veritatis labore maxime voluptatibus ex itaque doloribus.<span classNameName='text-2xl'>”</span></p>
        </div>
        <div classNameName='  bg-[var(--hoverEffect)] rounded-lg p-5'>
            <p> <span classNameName='text-3xl'>“</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos et dolores quam exercitationem veritatis labore maxime voluptatibus ex itaque doloribus.<span classNameName='text-2xl'>”</span></p>
        </div>
       
     </div> */}

      <section className="relative py-20 lg:pt-32 lg:pb-36  overflow-hidden">
        <div className="relative container px-4 mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap -mx-4 items-center mb-20">
              <div className="w-full lg:w-2/3 px-4 mb-12 lg:mb-0">
                <span className="inline-block py-1 px-3 mb-4 text-xs font-semibold text-[var(--titleTextColor)] bg-orange-50 rounded-full">TESTIMONIALS</span>
                <h1 className="font-heading text-5xl xs:text-5xl font-semibold text-[var(--titleTextColor)] mb-4">
                  <span>What our clients </span>
                  <span className="font-serif italic">said</span>
                </h1>
                <p className="text-[var(--paraTextColor)]">Risus viverra justo sagittis vestibulum metus.</p>
              </div>
              <div className="w-full lg:w-1/3 px-4">
                <div className="flex items-center justify-end">
                  <a className="inline-flex mr-3 w-14 h-14 items-center justify-center rounded-full border border-gray-200 hover:border-[var(--bgColorPrimary)]  transition duration-200" href="#">
                    <TiArrowLeft className='text-3xl' />
                  </a>
                  <a className="inline-flex w-14 h-14 items-center justify-center rounded-full bg-orange-50 hover:bg-[var(--bgColorPrimary)] hover:text-white text-[var(--titleTextColor)] transition duration-200" href="#">
                    <TiArrowRight className='text-3xl' />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex -mx-4 mb-12">
              <div className="w-full max-w-lg md:max-w-4xl px-4 sm:flex-shrink-0">
                <div className="px-6 py-12 xs:pl-12 xs:pr-14 bg-[var(--hoverEffect)]  rounded-3xl">
                  <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-2/5 px-4 mb-6 lg:mb-0">
                      <img className="block w-full h-full object-cover rounded-3xl" src="images/profile.jpeg" alt="image" />
                    </div>
                    <div className="w-full md:w-3/5 px-4">
                      <div>
                      <FaQuoteLeft className='mb-2 text-xl text-[var(--titleTextColor)]' />
                        <h4 className="text-2xl font-semibold text-gray-900 mb-6">Organic Nation's products are so genuine and healthy !</h4>
                        <p className="text-[var(--paraTextColor)] mb-5">Sit at facilisis pulvinar enim ut vulputate. Semper odio cras iaculis tristique adipiscing congue sodales. Id sapien imperdiet tortor id aliquam ac et. Amet pulvinar gravida urna tincidunt at erat sapien a sit. Facilisi tellus habitant vestibulum magna vitae quam erat rutrum ipsum.</p>
                        <span className="font-semibold text-orange-900">Beby Nirmala</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block w-full max-w-lg md:max-w-4xl px-4 sm:flex-shrink-0">
                <div className="px-6 py-12 xs:pl-12 xs:pr-14 bg-[var(--hoverEffect)]  rounded-3xl">
                  <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-2/5 px-4 mb-6 lg:mb-0">
                      <img className="block w-full h-full object-cover rounded-3xl" src="images/profile.jpeg" alt="image" />
                    </div>
                    <div className="w-full md:w-3/5 px-4">
                      <div>
                      <FaQuoteLeft className='mb-2 text-xl text-[var(--titleTextColor)]' />
                        <h4 className="text-2xl font-semibold text-gray-900 mb-6">Wonderfull Pproducts!</h4>
                        <p className="text-[var(--paraTextColor)] mb-5">Sit at facilisis pulvinar enim ut vulputate. Semper odio cras iaculis tristique adipiscing congue sodales. Id sapien imperdiet tortor id aliquam ac et. Amet pulvinar gravida urna tincidunt at erat sapien a sit. Facilisi tellus habitant vestibulum magna vitae quam erat rutrum ipsum.</p>
                        <span className="font-semibold text-orange-900">Rakabuming Suhu</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button className="inline-block mr-1 w-7 h-1 bg-[var(--bgColorPrimary)]"></button>
              <button className="inline-block mr-1 w-7 h-1 bg-gray-400 hover:bg-[var(--bgColorPrimary)]"></button>
              <button className="inline-block w-7 h-1 bg-gray-400 hover:bg-[var(--bgColorPrimary)]"></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
