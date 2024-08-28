import React, { useEffect } from 'react'
import Banner from '../../components/banner/Banner'
import Title from '../../components/title/Title'

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
import SEO from '../../helper/SEO'




// images 
const betterImages = [
    {
        img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/how_we_are_better/noArtificialColor.png',
        text: "No Added Colour"
    },
    {
        img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/how_we_are_better/natural.png',
        text: "100% Naturally Organic"
    },
    {
        img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/how_we_are_better/authentic.png',
        text: "Authentic Indian Recipes"
    },
    {
        img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/how_we_are_better/homestyle.png',
        text: "Homestyle Prepared"
    },

    {
        img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/how_we_are_better/minimallyProcessed.png',
        text: "Minimally Processed"
    },

]

// cartificate images
const certificates = [
    'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/usoca.png',
    'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/fssi.webp',
    'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/haccp.webp',
    'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/jaivik.webp',
    'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/organic.webp',
    'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/usda.webp',
]


const Home = () => {
    const dispatch = useDispatch();
    const { isLoading, productData } = useSelector((state) => state.product_data);
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
                    toast.success("Logged in successfully")
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
            {/* for SEO purpose  */}
            <SEO
                title="Buy Organic and Healthy Products Online| Organic Nation"
                description="Organic Nation - We take pride in offering you a delightful culinary journey, showcasing the finest and most authentic flavors sourced from the heart of nature Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products"
                canonicalUrl="https://organicnation.co.in/"
                ogTitle="Buy Organic and Healthy Products Online| Organic Nation"
                ogDescription="Organic Nation - We take pride in offering you a delightful culinary journey, showcasing the finest and most authentic flavors sourced from the heart of nature Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products"
                ogUrl="https://organicnation.co.in/"
                ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
                ogImageWidth=""
                ogImageHeight=""
                twitterTitle="Buy Organic and Healthy Products Online| Organic Nation"
                twitterDescription="Organic Nation - We take pride in offering you a delightful culinary journey, showcasing the finest and most authentic flavors sourced from the heart of nature Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products"
                twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
                twitterSite="Organic Nation"
                twitterCreator="organicnation_"
            />
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