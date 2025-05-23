// import React, { lazy, memo, Suspense, useEffect, useRef, useState } from 'react'
// import Banner from '../../components/banner/Banner'
// import Title from '../../components/title/Title'

// import { useDispatch, useSelector } from 'react-redux'
// // import RecipeSection from '../../components/recipe-section/RecipeSection'
// // import TestimonialSection from '../../components/testimonial-section/TestimonialSection'
// import { toast } from 'react-toastify'
// import SpotlightSection from '../../components/spotlightSection/SpotlightSection'
// // import ProductCategories from '../../components/productCategories/ProductCategories'
// import { addReviews } from '../../features/reviews/reviews'
// // import BlogSection from '../../components/blog-section/BlogSection';
// import SEO from '../../helper/SEO/SEO'
// import PopupBanner from '../../components/popup-banner/PopupBanner';
// import CategoryCarousel from '../../components/productCategories/CategoryCarousel'
// import Search from '../../components/search/Search'
// import { Link } from 'react-router-dom'


// // Lazy load below-the-fold components
// const BlogSection = lazy(() => import('../../components/blog-section/BlogSection'));
// const RecipeSection = lazy(() => import('../../components/recipe-section/RecipeSection'));
// const TestimonialSection = lazy(() => import('../../components/testimonial-section/TestimonialSection'));
// const ProductCategories = lazy(() => import('../../components/productCategories/ProductCategories'));



// // Memoized components
// const MemoizedPopupBanner = memo(PopupBanner);


// // images 
// const betterImages = [
//     {
//         img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/how_we_are_better/noArtificialColor.png',
//         text: "No Added Colour"
//     },
//     {
//         img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/how_we_are_better/natural.png',
//         text: "100% Naturally Organic"
//     },
//     {
//         img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/how_we_are_better/authentic.png',
//         text: "Authentic Indian Recipes"
//     },
//     {
//         img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/how_we_are_better/homestyle.png',
//         text: "Homestyle Prepared"
//     },

//     {
//         img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/how_we_are_better/minimallyProcessed.png',
//         text: "Minimally Processed"
//     },

// ]

// // cartificate images
// const certificates = [
//     'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/usoca.png',
//     'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/fssi.webp',
//     // 'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/haccp.webp',
//     'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/jaivik.webp',
//     'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/organic.webp',
//     'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/usda.webp',
// ]



// const Image = memo(({ src, alt, className }) => {
//     const [isLoaded, setIsLoaded] = useState(false);
//     return (
//         <img
//             src={src}
//             alt={alt}
//             className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
//             onLoad={() => setIsLoaded(true)}
//             loading="lazy"
//         />
//     );
// });

// // Use in your certificates and better images sections
// const BetterImagesSection = memo(({ images }) => (
//     <div className='bg-[var(--hoverEffect)] flex flex-wrap justify-center xs:gap-20 gap-5 items-center py-7'>
//         {images.map((item) => (
//             <div key={item.img} className='flex flex-col justify-center items-center'>
//                 <Image
//                     src={item.img}
//                     alt={item.text}
//                     className='xs:w-40 w-16 mb-2'
//                 />
//                 <span className='whitespace text-center w-28'>{item.text}</span>
//             </div>
//         ))}
//     </div>
// ));
// const CertificatesSection = memo(({ certificates }) => (
//     <div className='xs:px-10 px-4 py-12'>
//         <div className='bg-[var(--hoverEffect)] flex flex-wrap justify-center gap-10 items-center py-7'>
//             {certificates.map((imgPath) => (
//                 <div key={imgPath}
//                     className=' flex flex-col  justify-center items-center'
//                     data-aos="fade-up"
//                     data-aos-duration="1000"
//                 >
//                     <Image
//                         src={imgPath}
//                         alt={imgPath}
//                         className='xs:w-40 w-16 mb-2'
//                     />
//                 </div>
//             ))}

//         </div>
//     </div>
// ));


// const Home = () => {
//     const dispatch = useDispatch();
//     // const { isLoading, productData } = useSelector((state) => state.product_data);
//     const reviewsAndRating = JSON.parse(sessionStorage.getItem('reviews&rating'));

//     useEffect(() => {

//         if (reviewsAndRating) {
//             dispatch(addReviews(reviewsAndRating)).then(() => {

//                 toast.success("Review submitted successfully");
//                 sessionStorage.removeItem('reviews&rating')
//             })
//         }

//     }, [])



//     // if (isLoading && !productData) {
//     //     <h1>loading..</h1>
//     // }
//     return (
//         <>
//             {/* for SEO purpose  */}
//             <SEO
//                 title="Buy Organic and Healthy Products Online| Organic Nation"
//                 description="Organic Nation - We take pride in offering you a delightful culinary journey, showcasing the finest and most authentic flavors sourced from the heart of nature Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products"
//                 canonicalUrl="https://organicnation.co.in/"
//                 ogTitle="Buy Organic and Healthy Products Online| Organic Nation"
//                 ogDescription="Organic Nation - We take pride in offering you a delightful culinary journey, showcasing the finest and most authentic flavors sourced from the heart of nature Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products"
//                 ogUrl="https://organicnation.co.in/"
//                 ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
//                 ogImageWidth="478"
//                 ogImageHeight="446"
//                 twitterTitle="Buy Organic and Healthy Products Online| Organic Nation"
//                 twitterDescription="Organic Nation - We take pride in offering you a delightful culinary journey, showcasing the finest and most authentic flavors sourced from the heart of nature Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products"
//                 twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
//                 twitterSite="Organic Nation"
//                 twitterCreator="organicnation_"
//             />
//             <MemoizedPopupBanner />
//             <div className='pb-4 px-1 sm:px-10 md:hidden block'>
//                 <Search />
//             </div>
//             <Banner />
//             {/* referral text  */}
//             <div className='max-w-2xl font-semibold mx-auto font-sans py-4 italic px-2 text-[10px] xs:text-base'>
//                 <p className="text-[var(--themeColor)] text-center">
//                     Refer a friend, and earn a coupon worth ₹100 when they place an order. Share the love! <Link to='/profile/coupons' className='text-green-500 underline'>Share now</Link>
//                 </p>
//             </div>
//             <CategoryCarousel />
//             {/* spotlight  */}
//             <SpotlightSection />
//             {/* video  */}
//             {/* <div className="w-full ">
//                 <video className="w-full h-auto" >
//                     <source src="https://organicnationmages.s3.ap-south-1.amazonaws.com/OrganicNation.mp4" type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//             </div> */}
//             {/* our categories */}
//             {/* Below-the-fold content - Lazy load with intersection observer */}
//             {/* <ProductCategories /> */}
//             <LazyLoadSection>
//                 <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
//                     <ProductCategories />
//                 </Suspense>
//             </LazyLoadSection>
//             {/* how we are better */}
//             <div>
//                 <div className='text-center xs:pt-32 xs:pb-20 px-10'>
//                     <Title text="How We Are Better !" />
//                 </div>
//                 {/* horozontal line */}
//                 <div className='xs:px-10 px-2'>
//                     <div className='w-full h-1 bg-gradient-to-r from-[#712522] to-[#bb7d7b]'></div>
//                 </div>
//                 {/* content  */}
//                 <div className='xs:px-10 px-4 py-12'>
//                     {/* <div className='bg-[var(--hoverEffect)] flex flex-wrap justify-center xs:gap-20 gap-5 items-center py-7'>
//                         {betterImages.map((item) => (
//                             <div key={item.img}
//                                 className=' flex flex-col  justify-center items-center'
//                                 data-aos="fade-up"
//                                 data-aos-duration="1000"
//                             >
//                                 <img src={item.img} alt="No Added Colour" className='xs:w-40 w-16 mb-2 animate-' />
//                                 <span className='whitespace text-center w-28 text-[var(--bgColorPrimary)] font-medium'>{item.text}</span>
//                             </div>
//                         ))}

//                     </div> */}
//                     <LazyLoadSection>
//                         <BetterImagesSection images={betterImages} />
//                     </LazyLoadSection>
//                 </div>
//             </div>
//             {/* certificates  */}
//             <div>
//                 <div className='text-center xs:pt-32 xs:pb-20 px-10'>
//                     <Title text="Organic" />
//                     <Title text="Certifications" />
//                 </div>
//                 {/* horozontal line */}
//                 <div className='xs:px-10 px-2'>
//                     <div className='w-full h-1 bg-gradient-to-r from-[#712522] to-[#bb7d7b]'></div>
//                 </div>
//                 {/* content  */}
//                 {/* <div className='xs:px-10 px-4 py-12'>
//                     <div className='bg-[var(--hoverEffect)] flex flex-wrap justify-center gap-10 items-center py-7'>
//                         {certificates.map((certificate) => (
//                             <div key={certificate}
//                                 className=' flex flex-col  justify-center items-center'
//                                 data-aos="fade-up"
//                                 data-aos-duration="1000"
//                             >
//                                 <img src={certificate} alt="certificate" className='xs:w-44 w-16 mb-2 ' />
//                             </div>
//                         ))}

//                     </div>
//                 </div> */}
//                 <LazyLoadSection>
//                     <CertificatesSection certificates={certificates} />
//                 </LazyLoadSection>
//             </div>
//             {/* out blogs  */}
//             {/* <BlogSection homePage={true} /> */}
//             <LazyLoadSection>
//                 <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
//                     <BlogSection homePage={true} />
//                 </Suspense>
//             </LazyLoadSection>
//             {/* our recipes  */}
//             {/* <RecipeSection showBtn={true} /> */}
//             <LazyLoadSection>
//                 <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
//                     <RecipeSection showBtn={true} />
//                 </Suspense>
//             </LazyLoadSection>

//             {/* testimonials  */}
//             {/* <TestimonialSection showBtn={true} /> */}
//             <LazyLoadSection>
//                 <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
//                     <TestimonialSection showBtn={true} />
//                 </Suspense>
//             </LazyLoadSection>



//         </>
//     )
// }

// export default Home;


// // LazyLoadSection component using Intersection Observer
// const LazyLoadSection = ({ children }) => {
//     const [isVisible, setIsVisible] = useState(false);
//     const sectionRef = useRef();

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setIsVisible(true);
//                     observer.disconnect();
//                 }
//             },
//             { threshold: 0.1 }
//         );

//         if (sectionRef.current) {
//             observer.observe(sectionRef.current);
//         }

//         return () => observer.disconnect();
//     }, []);

//     return (
//         <div ref={sectionRef}>
//             {isVisible && children}
//         </div>
//     );
// };


import React, { lazy, memo, Suspense, useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Banner from '../../components/banner/Banner';
import Title from '../../components/title/Title';
import SpotlightSection from '../../components/spotlightSection/SpotlightSection';
import SEO from '../../helper/SEO/SEO';
import PopupBanner from '../../components/popup-banner/PopupBanner';
import CategoryCarousel from '../../components/productCategories/CategoryCarousel';
import Search from '../../components/search/Search';
import { addReviews } from '../../features/reviews/reviews';
import BetterImagesSection from '../../components/module/homepage/BetterImagesSection';
import CertificatesSection from '../../components/module/homepage/CertificatesSection';
// Lazy loaded components
const BlogSection = lazy(() => import('../../components/blog-section/BlogSection'));
const RecipeSection = lazy(() => import('../../components/recipe-section/RecipeSection'));
const TestimonialSection = lazy(() => import('../../components/testimonial-section/TestimonialSection'));
const ProductCategories = lazy(() => import('../../components/productCategories/ProductCategories'));


// Memoized components
const MemoizedPopupBanner = memo(PopupBanner);

// Constants moved outside component
const BETTER_IMAGES = [
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
];

const CERTIFICATES = [
    'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/usoca.png',
    'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/fssi.webp',
    // 'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/haccp.webp',
    'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/jaivik.webp',
    'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/organic.webp',
    'https://organicnationmages.s3.ap-south-1.amazonaws.com/certificates/usda.webp',
]


// Optimized Image component
const Image = memo(({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const handleLoad = useCallback(() => setIsLoaded(true), []);

    return (
        <img
            src={src}
            alt={alt}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleLoad}
            loading="lazy"
        />
    );
});

// Optimized section components
// const BetterImagesSection = memo(({ images }) => (
//     <div className='xs:pt-20 pt-10 pb-20 px-10'>
//         <div className='bg-[var(--hoverEffect)] flex flex-wrap justify-center xs:gap-20 gap-5 py-7'>
//             {images.map((item) => (
//                 <div key={item.img} className='flex flex-col justify- items-center '>
//                     <Image
//                         src={item.img}
//                         alt={item.text}
//                         className='xs:w-40 w-16 mb-2'
//                     />
//                     <span className='whitespace text-center w-28'>{item.text}</span>
//                 </div>
//             ))}
//         </div>
//     </div>
// ));

// const CertificatesSection = memo(({ certificates }) => (
//     <div className='xs:pt-20 pt-10 pb-20 px-10'>
//         <div className='bg-[var(--hoverEffect)] flex flex-wrap justify-center gap-10 items-center py-7'>
//             {certificates.map((imgPath) => (
//                 <div key={imgPath} className='flex flex-col justify-center items-center'>
//                     <Image
//                         src={imgPath}
//                         alt="Certificate"
//                         className='xs:w-40 w-16 mb-2'
//                     />
//                 </div>
//             ))}
//         </div>
//     </div>
// ));

// Optimized LazyLoadSection using useCallback
const LazyLoadSection = memo(({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef();

    const observerCallback = useCallback(([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [observerCallback]);

    return (
        <div ref={sectionRef}>
            {isVisible && children}
        </div>
    );
});

// Main Home component
const Home = memo(() => {
    const dispatch = useDispatch();

    useEffect(() => {
        const reviewsAndRating = sessionStorage.getItem('reviews&rating');

        if (reviewsAndRating) {
            try {
                const parsedReviews = JSON.parse(reviewsAndRating);
                dispatch(addReviews(parsedReviews))
                    .then(() => {
                        toast.success("Review submitted successfully");
                        sessionStorage.removeItem('reviews&rating');
                    })
                    .catch(error => {
                        toast.error("Failed to submit review");
                    });
            } catch (error) {
                throw error
            }
        }
    }, [dispatch]);

    return (
        <>
            <SEO
                title="Buy Organic and Healthy Products Online| Organic Nation"
                description="Organic Nation - We take pride in offering you a delightful culinary journey, showcasing the finest and most authentic flavors sourced from the heart of nature Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products"
                canonicalUrl="https://organicnation.co.in/"
                ogTitle="Buy Organic and Healthy Products Online| Organic Nation"
                ogDescription="Organic Nation - We take pride in offering you a delightful culinary journey, showcasing the finest and most authentic flavors sourced from the heart of nature Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products"
                ogUrl="https://organicnation.co.in/"
                ogImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
                ogImageWidth="478"
                ogImageHeight="446"
                twitterTitle="Buy Organic and Healthy Products Online| Organic Nation"
                twitterDescription="Organic Nation - We take pride in offering you a delightful culinary journey, showcasing the finest and most authentic flavors sourced from the heart of nature Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products"
                twitterImage="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
                twitterSite="Organic Nation"
                twitterCreator="organicnation_"
            />




            {/* <MemoizedPopupBanner /> */}

            <div className='pb-4 px-1 sm:px-10 md:hidden block'>
                <Search />
            </div>

            <Banner />

            {/* <div className='max-w-2xl font-semibold mx-auto font-sans py-4 italic px-2 text-[10px] xs:text-base'>
                <p className="text-[var(--themeColor)] text-center">
                    Refer a friend, and earn a coupon worth ₹100 when they place an order. Share the love!
                    <Link to='/profile/coupons' className='text-green-800 underline'> Share now</Link>
                </p>
            </div> */}

            <CategoryCarousel />
            <SpotlightSection />

            <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
                <LazyLoadSection>
                    <ProductCategories />
                </LazyLoadSection>
            </Suspense>

            <section>
                {/* <div className='text-center xs:pt-32 pt-16 xs:pb-20 pb-3 px-10'>
                    <Title text="How We Are Better !" />
                </div>
                <div className='xs:px-10 px-2'>
                    <div className='w-full h-1 bg-gradient-to-r from-[#712522] to-[#bb7d7b]' />
                </div> */}
                <LazyLoadSection>
                    <BetterImagesSection images={BETTER_IMAGES} />
                </LazyLoadSection>
            </section>

            <section>
                {/* <div className='text-center xs:pt-32 xs:pb-20 px-10'>
                    <Title text="Organic" />
                    <Title text="Certifications" />
                </div>
                <div className='xs:px-10 px-2'>
                    <div className='w-full h-1 bg-gradient-to-r from-[#712522] to-[#bb7d7b]' />
                </div> */}
                <LazyLoadSection>
                    <CertificatesSection certificates={CERTIFICATES} />
                </LazyLoadSection>
            </section>

            <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
                <LazyLoadSection>
                    <BlogSection homePage={true} />
                </LazyLoadSection>
            </Suspense>

            <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
                <LazyLoadSection>
                    <RecipeSection showBtn={true} />
                </LazyLoadSection>
            </Suspense>

            <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
                <LazyLoadSection>
                    <TestimonialSection showBtn={true} />
                </LazyLoadSection>
            </Suspense>
        </>
    );
});

export default Home;