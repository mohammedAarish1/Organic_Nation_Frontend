import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaFlag, FaStar } from 'react-icons/fa';
import { GiIndiaGate, GiPeaceDove, GiFlowerPot } from 'react-icons/gi';
import { BiHeart } from 'react-icons/bi';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

const IndependenceDayWish = () => {
    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    useEffect(() => {
        // Check if popup has been shown before
        const hasSeenPopup = sessionStorage.getItem('independenceDayPopupSeen');

        if (!hasSeenPopup) {
            // Show popup after 2 seconds of page load
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setShowContent(true);
                // Trigger confetti with tricolor theme
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#FF6B35', '#FFFFFF', '#138808']
                });
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setShowContent(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        // Mark popup as seen so it won't show again
        sessionStorage.setItem('independenceDayPopupSeen', 'true');
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 500
            }
        }
    };

    const floatingAnimation = {
        y: [-10, 10, -10],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const sparkleAnimation = {
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 180, 360],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const pulseAnimation = {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const flagWaveAnimation = {
        rotateY: [0, 5, 0, -5, 0],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={handleOverlayClick}
                >
                    <motion.div
                        className="relative max-w-md w-full rounded-3xl shadow-2xl overflow-hidden"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'linear-gradient(135deg, #FFF8F0 0%, #F0F8FF 100%)',
                            boxShadow: '0 25px 50px -12px rgba(19, 136, 8, 0.25)'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 group"
                            style={{ color: '#138808' }}
                        >
                            <FaTimes className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                        </button>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <motion.div
                                animate={floatingAnimation}
                                className="absolute top-6 left-6 text-2xl text-orange-500"
                            >
                                <GiPeaceDove />
                            </motion.div>
                            <motion.div
                                animate={sparkleAnimation}
                                className="absolute top-8 right-16 text-lg text-green-600"
                            >
                                <FaStar />
                            </motion.div>
                            <motion.div
                                animate={floatingAnimation}
                                className="absolute bottom-20 left-8 text-xl text-orange-500"
                            >
                                <GiFlowerPot />
                            </motion.div>
                            <motion.div
                                animate={sparkleAnimation}
                                className="absolute bottom-16 right-6 text-lg text-blue-600"
                            >
                                <BiHeart />
                            </motion.div>
                        </div>

                        {/* Tricolor Header */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8 }}
                            className="h-3 w-full"
                            style={{
                                background: 'linear-gradient(90deg, #FF6B35 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%)'
                            }}
                        ></motion.div>

                        {/* Main Content */}
                        <div className="relative px-8 py-12 text-center">
                            {/* Flag/Monument Illustration */}
                            <motion.div
                                animate={pulseAnimation}
                                className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center relative bg-gradient-to-br from-orange-100 to-green-100"
                            >
                                <motion.div
                                    animate={flagWaveAnimation}
                                    className="text-3xl text-green-700"
                                >
                                    <GiIndiaGate />
                                </motion.div>
                                <div className="absolute inset-0 rounded-full border-4 border-dashed opacity-30 border-orange-400"></div>
                            </motion.div>

                            {/* Main Heading */}
                            <AnimatePresence>
                                {showContent && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight text-green-800">
                                            Happy Independence Day
                                        </h1>
                                        <motion.div
                                            animate={{ scaleX: [0, 1] }}
                                            transition={{ delay: 0.4, duration: 0.8 }}
                                            className="w-24 h-1 mx-auto mb-4 rounded-full bg-orange-500"
                                        ></motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Brand Message */}
                            <AnimatePresence>
                                {showContent && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <p className="text-lg sm:text-xl font-semibold mb-2 text-orange-600">
                                            From Organic Nation
                                        </p>
                                        <p className="text-sm sm:text-base mb-6 leading-relaxed text-gray-700">
                                            Celebrating 79 years of freedom with pride and gratitude.
                                            May our nation continue to flourish with organic values and sustainable growth.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* CTA Section */}
                            <AnimatePresence>
                                {showContent && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="space-y-4"
                                    >
                                        <button
                                            onClick={() => navigate('/shop/all')}
                                            className="bg-gradient-to-r from-orange-500 to-green-600 w-full py-3 px-6 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 hover:from-orange-600 hover:to-green-700"
                                        >
                                            <FaFlag className="text-lg" />
                                            Celebrate with Organic Products
                                        </button>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.8 }}
                                            className="text-xs text-orange-600"
                                        >
                                            🇮🇳 Special Independence Day offers available
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bottom Tricolor Border */}
                        <motion.div
                            animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            className="h-3 w-full"
                            style={{
                                background: `linear-gradient(90deg, #FF6B35 0%, #FFFFFF 16.66%, #138808 33.33%, #FF6B35 50%, #FFFFFF 66.66%, #138808 83.33%, #FF6B35 100%)`,
                                backgroundSize: '200% 100%'
                            }}
                        ></motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IndependenceDayWish;