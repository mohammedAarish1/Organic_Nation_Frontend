import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slider.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Icons
import { RiDoubleQuotesL } from "react-icons/ri";
import { BsDashLg } from "react-icons/bs";
import { IoPersonCircle } from 'react-icons/io5';


const TestimonialSlider = () => {

    const feedbackLists = [
        {
            customerName: "Avinash Jain",
            customerPicture: <IoPersonCircle className='text-[200px] text-[var(--bgColorPrimary)]' />,
            // customerDesignation: "Organic Nation's products are so genuine and healthy !",
            description: "I've been using Organic Nation’s Honey for years and it's the best, pure, delicious, and has so many health benefits. Highly recommended!",

        },
        {
            customerName: "Akash Kumar",
            customerPicture: <IoPersonCircle className='text-[200px] text-[var(--bgColorPrimary)]' />,
            // customerDesignation: "Organic Nation's products are so genuine and healthy !",
            description: "Organic honey from Organic Nation has been a game-changer for me. Rich, flavorful, and pure - the best honey I've ever tasted!",

        },
        {
            customerName: "Aparna Singh",
            customerPicture: <IoPersonCircle className='text-[200px] text-[var(--bgColorPrimary)]' />,
            // customerDesignation: "Organic Nation's products are so genuine and healthy !",
            description: "Garlic Pickle is very testy! The bold flavors have transformed my cooking. Highly recommend for anyone looking to spice up their meals.",

        },
        {
            customerName: "Abhinav Banerjee",
            customerPicture: <IoPersonCircle className='text-[200px] text-[var(--bgColorPrimary)]' />,
            // customerDesignation: "Organic Nation's products are so genuine and healthy !",
            description: "Green Chili Pickle is a delightful condiment that adds a flavorful kick to any meal. The perfect balance of spice and tanginess makes it a must-try.",

        },
        {
            customerName: "Sumit Tiwary",
            customerPicture: <IoPersonCircle className='text-[200px] text-[var(--bgColorPrimary)]' />,
            // customerDesignation: "Organic Nation's products are so genuine and healthy !",
            description: "Brown Sugar's high-quality ingredients and thoughtful formulations have transformed my skin. I'm thoroughly impressed and highly recommend this brand.",

        },

    ]

    return (
        <>
            <section className='xs:w-[70%] w-[90%]  mx-auto'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper customCss"
                >
                    {feedbackLists.map(feedback => (
                        <SwiperSlide key={feedback.description}>
                            <div className='flex md:flex-row flex-col md:gap-10  xs:p-10 p-4 rounded-lg bg-gradient-to-r from-[#e0d4a9] to-[#D3BB71] font-sans'>
                                <div className=' flex justify-center items-center '>
                                    {/* <img src={profile} alt="customer_iamge" className=' rounded-full ' /> */}
                                    {feedback.customerPicture}
                                </div>
                                <div className='flex flex-col gap-2 text-start place-self-center'>
                                    <RiDoubleQuotesL className='text-5xl text-[var(--bgColorPrimary)]' />
                                    <p className='font-semibold text-[var(--themeColor)] text-xl'>{feedback.description}</p>
                                    <p className='flex justify-start items-center gap-1 text-[var(--bgColorPrimary)]'> <BsDashLg />{feedback.customerName}</p>
                                    {/* <p className=' text-sm'> XYZ manager, ABC Tech</p> */}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}



                </Swiper>
            </section>
        </>
    );
}


export default TestimonialSlider;