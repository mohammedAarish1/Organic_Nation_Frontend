import React from 'react'
import Title from '../../components/title/Title'

const About = () => {
    return (
        <div>
            {/* banner  */}
            <div className='relative'>
                <div>
                    <img src="images/about-banner.webp" alt="banner-image" className='w-full h-[400px] object-cover' />
                </div>
                <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 sm:p-20  p-5 bg-opacity-30 bg-[#D9D9D9] text-white '>
                    <p className='sm:text-4xl text-2xl text-center'>“TASTE THE DIFFERENCE WITH OUR ORGANIC PRODUCE” </p>
                </div>
            </div>
            {/* content  */}
            <div className='px-10 pt-24'>
                <div className='flex md:flex-row flex-col justify-around items-center'>

                    <div className='md:w-1/3'>
                        <p className='md:w-2/3'>  <Title text="Discover the Taste of Organic Goodness" /></p>
                    </div>
                    <div className='md:w-1/3'>
                        <p className='text-[var(--paraTextColor)]'>Indulge in our top-selling organic products, made with love and care, to
                            nourish your body and delight your taste buds.</p>
                    </div>
                </div>
                <div className='flex md:flex-row flex-col gap-5 justify-around items-center mt-10'>
                    <div className='md:w-1/3'>
                        <Title text="About Us"/>
                        <p className='text-[var(--paraTextColor)]'>Celebrating Nature's Bounty: We are passionate advocates for organic living, dedicated to bringing you the freshest, most wholesome produce straight from the earth to your table. With a commitment to sustainability and wellness, our organic food business aims to nourish both body and planet, one delicious bite at a time.</p>
                    </div>
                    <div className='md:w-1/3'>
                        <img src="images/about-us.webp" alt="about-image" className='w-96' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About
