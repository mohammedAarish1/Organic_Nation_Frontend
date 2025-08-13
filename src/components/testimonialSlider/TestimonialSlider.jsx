import React, { useEffect, useRef, useState } from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import { FaQuoteLeft, FaStar, FaLeaf, FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
const feedbacks = [
    {
        customerName: "Avinash Jain",
        customerPicture: <IoPersonCircle className='text-6xl md:text-7xl text-[var(--accent-color)] drop-shadow-lg' />,
        description: "I've been using Organic Nation's Honey for years and it's the best, pure, delicious, and has so many health benefits. Highly recommended!",
        rating: 5,
        product: "🍯 Organic Honey",
        location: "Mumbai, India"
    },
    {
        customerName: "Akash Kumar",
        customerPicture: <IoPersonCircle className='text-6xl md:text-7xl text-[var(--accent-color)] drop-shadow-lg' />,
        description: "Organic honey from Organic Nation has been a game-changer for me. Rich, flavorful, and pure - the best honey I've ever tasted!",
        rating: 5,
        product: "🍯 Pure Honey",
        location: "Delhi, India"
    },
    {
        customerName: "Aparna Singh",
        customerPicture: <IoPersonCircle className='text-6xl md:text-7xl text-[var(--accent-color)] drop-shadow-lg' />,
        description: "Garlic Pickle is very tasty! The bold flavors have transformed my cooking. Highly recommend for anyone looking to spice up their meals.",
        rating: 5,
        product: "🥒 Garlic Pickle",
        location: "Bangalore, India"
    },
    {
        customerName: "Abhinav Banerjee",
        customerPicture: <IoPersonCircle className='text-6xl md:text-7xl text-[var(--accent-color)] drop-shadow-lg' />,
        description: "Green Chili Pickle is a delightful condiment that adds a flavorful kick to any meal. The perfect balance of spice and tanginess makes it a must-try.",
        rating: 5,
        product: "🌶️ Green Chili Pickle",
        location: "Kolkata, India"
    },
    {
        customerName: "Sumit Tiwary",
        customerPicture: <IoPersonCircle className='text-6xl md:text-7xl text-[var(--accent-color)] drop-shadow-lg' />,
        description: "Brown Sugar's high-quality ingredients and thoughtful formulations have transformed my skin. I'm thoroughly impressed and highly recommend this brand.",
        rating: 5,
        product: "🍯 Brown Sugar",
        location: "Chennai, India"
    },
];

const TestimonialSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const intervalRef = useRef(null);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 400 : -400,
            opacity: 0,
            rotateY: direction > 0 ? 45 : -45,
            scale: 0.8
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 400 : -400,
            opacity: 0,
            rotateY: direction < 0 ? 45 : -45,
            scale: 0.8
        })
    };

    const paginate = (newDirection) => {
        setDirection(newDirection);
        setCurrentIndex(prev => {
            if (newDirection === 1) {
                return (prev + 1) % feedbacks.length;
            } else {
                return (prev - 1 + feedbacks.length) % feedbacks.length;
            }
        });
    };

    // Enhanced auto-sliding
    useEffect(() => {
        const startAutoSlide = () => {
            intervalRef.current = setInterval(() => {
                paginate(1);
            }, 7000); // 5 seconds
        };

        startAutoSlide();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const goToSlide = (index) => {
        const newDirection = index > currentIndex ? 1 : -1;
        setDirection(newDirection);
        setCurrentIndex(index);
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
            >
                <FaStar
                    className={`text-lg ${index < rating ? 'text-[var(--accent-color)]' : 'text-[var(--neutral-color)]'}`}
                />
            </motion.div>
        ));
    };

    return (
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-[#F5EFE6] via-white to-[#F5EFE6] overflow-hidden">
            {/* Animated Background Elements */}
            {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] opacity-10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        rotate: [360, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-l from-[var(--secondary-color)] to-[var(--accent-color)] opacity-10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 right-1/4 w-8 h-8 text-[var(--accent-color)] opacity-20"
                >
                    <FaLeaf className="w-full h-full" />
                </motion.div>
                <motion.div
                    animate={{
                        y: [0, 15, 0],
                        rotate: [0, -10, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/3 left-1/3 w-6 h-6 text-[var(--themeColor)] opacity-20"
                >
                    <FaHeart className="w-full h-full" />
                </motion.div>
            </div> */}

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* <Title heading=' Real Stories from Happy Customers' subHeading='Discover why families across India choose Organic Nation for pure, authentic, and healthy organic products' /> */}
                {/* Stunning Header */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg"
                    >
                        <FaHeart className="text-sm" />
                        <span>Loved by 10,000+ Customers</span>
                        <FaLeaf className="text-sm" />
                    </motion.div>
                    
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-color)] mb-6 leading-tight">
                        Real Stories from 
                        <span className="bg-gradient-color bg-clip-text text-transparent block mt-2">
                            Happy Customers
                        </span>
                    </h2>
                    
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "120px" }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="h-1.5 bg-gradient-to-r from-[var(--themeColor)] via-[var(--accent-color)] to-[var(--secondary-color)] mx-auto rounded-full mb-6"
                    />
                    
                    <p className="text-xl text-[var(--text-color)] opacity-70 max-w-3xl mx-auto leading-relaxed">
                        Discover why families across India choose Organic Nation for pure, authentic, and healthy organic products
                    </p>
                </motion.div>

                {/* Main Testimonial Card */}
                <div className="relative max-w-5xl mx-auto">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.3 },
                                rotateY: { duration: 0.4 },
                                scale: { duration: 0.4 }
                            }}
                            className="perspective-1000"
                        >
                            <div className="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 border border-[var(--neutral-color)] overflow-hidden">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--themeColor)] via-[var(--accent-color)] to-[var(--secondary-color)]" />
                                
                                <motion.div
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute top-8 left-8 text-[var(--themeColor)] opacity-20"
                                >
                                    <FaQuoteLeft className="text-4xl lg:text-6xl" />
                                </motion.div>

                                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                                    {/* Customer Info Section */}
                                    <div className="flex-shrink-0 text-center lg:text-left">
                                        {/* Avatar with Enhanced Effects */}
                                        <motion.div
                                            initial={{ scale: 0, y: 50 }}
                                            animate={{ scale: 1, y: 0 }}
                                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                            className="relative inline-block mb-6"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] rounded-full blur-xl opacity-30 scale-110 animate-pulse" />
                                            <div className="relative bg-gradient-to-br from-white to-[var(--background-color)] p-4 rounded-full shadow-xl border-4 border-white">
                                                {feedbacks[currentIndex].customerPicture}
                                            </div>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.6 }}
                                                className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] text-white p-2 rounded-full shadow-lg"
                                            >
                                                <FaHeart className="text-sm" />
                                            </motion.div>
                                        </motion.div>

                                        {/* Customer Details */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <h3 className="text-2xl lg:text-3xl font-bold text-[var(--text-color)] mb-2">
                                                {feedbacks[currentIndex].customerName}
                                            </h3>
                                            <p className="text-[var(--text-color)] opacity-60 mb-4 text-lg">
                                                📍 {feedbacks[currentIndex].location}
                                            </p>
                                            
                                            {/* Star Rating */}
                                            <div className="flex justify-center lg:justify-start gap-1 mb-4">
                                                {renderStars(feedbacks[currentIndex].rating)}
                                            </div>
                                            
                                            {/* Product Badge */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.7, type: "spring" }}
                                                className="inline-block bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] text-white px-6 py-3 rounded-full font-semibold shadow-lg text-lg"
                                            >
                                                {feedbacks[currentIndex].product}
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    {/* Testimonial Content */}
                                    <div className="flex-1">
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="relative"
                                        >
                                            <div className="text-2xl lg:text-3xl xl:text-4xl text-[var(--text-color)] leading-relaxed font-medium mb-8 relative">
                                                <span className="text-[var(--themeColor)] text-5xl lg:text-6xl absolute -top-6 -left-4 opacity-50">"</span>
                                                <span className="relative z-10 italic">
                                                    {feedbacks[currentIndex].description}
                                                </span>
                                                <span className="text-[var(--themeColor)] text-5xl lg:text-6xl absolute -bottom-8 -right-4 opacity-50">"</span>
                                            </div>
                                            
                                            {/* Verified Badge */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.8 }}
                                                className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200 font-semibold"
                                            >
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                Verified Purchase
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Enhanced Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-6"
                >
                    {/* Pagination Dots */}
                    <div className="flex gap-3">
                        {feedbacks.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`relative transition-all duration-500 ${
                                    currentIndex === index
                                        ? 'w-16 h-4 bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] rounded-full shadow-lg'
                                        : 'w-4 h-4 bg-[var(--neutral-color)] hover:bg-[var(--accent-color)] rounded-full hover:scale-125'
                                }`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {currentIndex === index && (
                                    <motion.div
                                        layoutId="activeDot"
                                        className="absolute inset-0 bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] rounded-full opacity-50 animate-pulse"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Auto-slide Indicator */}
                    <div className="flex items-center gap-3 text-[var(--text-color)] opacity-60">
                        <div className="relative w-12 h-2 bg-[var(--neutral-color)] rounded-full overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--themeColor)] to-[var(--accent-color)] rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                key={currentIndex}
                            />
                        </div>
                        <span className="text-sm font-medium">Auto-sliding</span>
                    </div>

                    {/* Counter */}
                    <div className="text-[var(--text-color)] font-semibold text-lg">
                        <span className="text-[var(--themeColor)] text-2xl font-bold">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="opacity-50 mx-2">/</span>
                        <span className="opacity-70">
                            {String(feedbacks.length).padStart(2, '0')}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialSlider;