import React, { useEffect } from 'react'
import Banner from '../../components/banner/Banner'
import Title from '../../components/title/Title'
// images - how we are better
import homestyle from '../../images/better/homestyle.png';
import minimallyProcessed from '../../images/better/minimallyProcessed.png';
import natural from '../../images/better/natural.png';
import noArtificialColor from '../../images/better/noArtificialColor.png'
import authentic from '../../images/better/authentic.png';

// images - certificates
import usoca from '../../images/certificates/usoca.png'
import fssi from '../../images/certificates/fssi.webp'
import haccp from '../../images/certificates/haccp.webp'
import jaivik from '../../images/certificates/jaivik.webp'
import organicCertificate from '../../images/certificates/organic.webp'
import usda from '../../images/certificates/usda.webp'

import { useDispatch, useSelector } from 'react-redux'
import RecipeSection from '../../components/recipe-section/RecipeSection'
import TestimonialSection from '../../components/testimonial-section/TestimonialSection'
import { useLocation } from 'react-router-dom'
import { fetchUserData } from '../../features/auth/userSlice'
import { toast } from 'react-toastify'
import SpotlightSection from '../../components/spotlightSection/SpotlightSection'
import ProductCategories from '../../components/productCategories/ProductCategories'
import { addReviews } from '../../features/reviews/reviews'
import BlogSection from '../../components/blog-section/BlogSection';




// images 
const betterImages = [
    {
        img: noArtificialColor,
        text: "No Added Colour"
    },
    {
        img: natural,
        text: "100% Naturally Organic"
    },
    {
        img: authentic,
        text: "Authentic Indian Recipes"
    },
    {
        img: homestyle,
        text: "Homestyle Prepared"
    },

    {
        img: minimallyProcessed,
        text: "Minimally Processed"
    },

]

// cartificate images
const certificates = [
    usoca,
    fssi,
    haccp,
    jaivik,
    organicCertificate,
    usda,
]


const Home = () => {
    const dispatch = useDispatch();
    const { isLoading,  productData } = useSelector((state) => state.product_data);
    const reviewsAndRating = JSON.parse(sessionStorage.getItem('reviews&rating'))

    // below code is for log in the user strightaway if they are already registered with the same email id

    const location = useLocation();
    const params = new URLSearchParams(location?.search);
    const token = params.get('token');

    useEffect(() => {
        if (token) {
            dispatch(fetchUserData(token))
                .then(() => {
                    sessionStorage.setItem("token", JSON.stringify(token));
                    toast.success("You are already registered")
                })
        }

        if (reviewsAndRating) {
            dispatch(addReviews(reviewsAndRating)).then(() => {

                toast.success("Review submitted successfully");
                sessionStorage.removeItem('reviews&rating')
            })
        }

    }, [token, reviewsAndRating])



    if (isLoading && !productData) {
        <h1>loading..</h1>
    }
    return (
        <>
            <Banner />
            {/* spotlight  */}
            <SpotlightSection />
            {/* our categories */}
            <ProductCategories />
            {/* how we are better */}
            <div>
                <div className='text-center pt-32 pb-20 px-10'>
                    <Title text="How We Are Better !" />
                </div>
                {/* horozontal line */}
                <div className='xs:px-10 px-2'>
                    <div className='w-full h-1 bg-gradient-to-r from-[#712522] to-[#bb7d7b]'></div>
                </div>
                {/* content  */}
                <div className='xs:px-10 px-4 py-12'>
                    <div className='bg-[var(--hoverEffect)] flex flex-wrap justify-center xs:gap-20 gap-5 items-center py-7'>
                        {betterImages.map((item) => (
                            <div key={item.img}
                                className=' flex flex-col  justify-center items-center'
                                data-aos="fade-up"
                                data-aos-duration="1000"
                            >
                                <img src={item.img} alt="No Added Colour" className='xs:w-40 w-16 mb-2 animate-' />
                                <span className='whitespace text-center w-28 text-[var(--bgColorPrimary)] font-medium'>{item.text}</span>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            {/* certificates  */}
            <div>
                <div className='text-center pt-32 pb-20 px-10'>
                    <Title text="Organic" />
                    <Title text="Certifications" />
                </div>
                {/* horozontal line */}
                <div className='xs:px-10 px-2'>
                    <div className='w-full h-1 bg-gradient-to-r from-[#712522] to-[#bb7d7b]'></div>
                </div>
                {/* content  */}
                <div className='xs:px-10 px-4 py-12'>
                    <div className='bg-[var(--hoverEffect)] flex flex-wrap justify-center gap-10 items-center py-7'>
                        {certificates.map((certificate) => (
                            <div key={certificate}
                                className=' flex flex-col  justify-center items-center'
                                data-aos="fade-up"
                                data-aos-duration="1000"
                            >
                                <img src={certificate} alt="certificate" className='xs:w-44 w-16 mb-2 ' />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            {/* out blogs  */}
            <BlogSection showBtn={true} />
            {/* our recipes  */}
            <RecipeSection showBtn={true} />

            {/* testimonials  */}
            <TestimonialSection showBtn={true} />



        </>
    )
}

export default Home;