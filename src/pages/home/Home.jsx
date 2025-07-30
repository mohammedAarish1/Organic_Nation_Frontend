import React, { lazy, memo, Suspense, useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Banner from '../../components/banner/Banner';
import SpotlightSection from '../../components/spotlightSection/SpotlightSection';
import SEO from '../../helper/SEO/SEO';
// import PopupBanner from '../../components/popup-banner/PopupBanner';
import CategoryCarousel from '../../components/productCategories/CategoryCarousel';
import Search from '../../components/search/Search';
import { addReviews } from '../../features/reviews/reviews';
import RakshaBandhanWish from '../../components/popup-banner/RakshaBandhanWish';
// import InstagramShowcase from '../../components/InstagramShowcase';
// import ClientLogosShowcase from '../../components/ClientLogosShowcase';
// Lazy loaded components
const BlogSection = lazy(() => import('../../components/blog-section/BlogSection'));
const RecipeSection = lazy(() => import('../../components/recipe-section/RecipeSection'));
// const TestimonialSection = lazy(() => import('../../components/testimonial-section/TestimonialSection'));
const TestimonialSlider = lazy(() => import('../../components/testimonialSlider/TestimonialSlider'));
const ProductCategories = lazy(() => import('../../components/productCategories/ProductCategories'));
const CertificatesSection = lazy(() => import('../../components/module/homepage/CertificatesSection'));
const BetterImagesSection = lazy(() => import('../../components/module/homepage/BetterImagesSection'));
const InstagramShowcase = lazy(() => import('../../components/InstagramShowcase'));




// Memoized components
// const MemoizedPopupBanner = memo(PopupBanner);

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
        text: "Authentic Indian Recipes",
        description: 'Crafted using traditional spices and time-honored Indian cooking methods.'
    },
    {
        img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/how_we_are_better/homestyle.png',
        text: "Homestyle Prepared",
        description: 'Just like homemade — hearty, wholesome, and cooked with care.'
    },
    {
        img: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/how_we_are_better/minimallyProcessed.png',
        text: "Minimally Processed",
        description: 'Retains natural flavor and nutrients through gentle preparation methods.'
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
                title="Discover Organic Honey, Pickles, Jaggery & More at Organic Nation"
                description="Explore top-quality organic honey, homestyle pickles, jaggery, oats, chutney, dip, and oil at Organic Nation. Enjoy natural, healthy, and tasty products! Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products"
                keywords="homestyle picklesorganic jaggeryorganic oatsorganic chutneyorganic diporganic oilOrganic Nation pickleshealthy organic foodsbest organic products India, authentic organic honeyfarm-fresh organic picklespremium organic jaggeryhealthy organic dipsorganic oilhomestyle organic treatsshop organic food onlineOrganic Nation products"
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


            <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>

                <LazyLoadSection>
                    <BetterImagesSection images={BETTER_IMAGES} />
                </LazyLoadSection>
            </Suspense>


            <RakshaBandhanWish />


            {/* <ClientLogosShowcase/> */}


            <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
                <LazyLoadSection>
                    <TestimonialSlider />
                </LazyLoadSection>
            </Suspense>
            <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
                <LazyLoadSection>
                    <InstagramShowcase />
                </LazyLoadSection>
            </Suspense>

            <Suspense fallback={<div className="h-48 animate-pulse bg-gray-100" />}>
                <LazyLoadSection>
                    <CertificatesSection certificates={CERTIFICATES} />
                </LazyLoadSection>
            </Suspense>


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
        </>
    );
});

export default Home;