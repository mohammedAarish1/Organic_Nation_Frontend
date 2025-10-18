import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DiwaliWish = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('diwaliPopupSeen');
        if (!hasSeenPopup) {
            const timer = setTimeout(() => setIsOpen(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setShowContent(true);
                triggerFireworks();
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setShowContent(false);
        }
    }, [isOpen]);

    const triggerFireworks = () => {
        const colors = ['#7A2E1D', '#9B7A2F', '#D87C45', '#FFD700', '#FF6B00'];
        const duration = 4000;
        const animationEnd = Date.now() + duration;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const confetti = window.confetti;
            if (confetti) {
                confetti({
                    particleCount: 5,
                    angle: 60 + Math.random() * 60,
                    spread: 55 + Math.random() * 35,
                    origin: { x: Math.random(), y: Math.random() * 0.6 },
                    colors: [colors[Math.floor(Math.random() * colors.length)]],
                    shapes: ['circle'],
                    scalar: 1 + Math.random() * 0.5,
                    gravity: 0.6,
                    drift: Math.random() * 2 - 1,
                    ticks: 200,
                    startVelocity: 35 + Math.random() * 15
                });
            }
        }, 80);
    };

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('diwaliPopupSeen', 'true');
    };

    const handleShopNow = () => {
        navigate('/shop/all')
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.target === e.currentTarget && handleClose()}
                >
                    <motion.div
                        className="relative max-w-md w-full rounded-3xl overflow-hidden shadow-2xl"
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 500 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'linear-gradient(135deg, #1a0f0a 0%, #2d1810 50%, #1a0f0a 100%)',
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-20 rounded-full p-2 transition-all duration-200 group"
                            style={{ backgroundColor: 'rgba(245, 239, 230, 0.1)', backdropFilter: 'blur(8px)' }}
                        >
                            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" style={{ color: '#9B7A2F' }} />
                        </button>

                        {/* Firework Particles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 rounded-full"
                                    style={{
                                        backgroundColor: i % 3 === 0 ? '#9B7A2F' : i % 3 === 1 ? '#D87C45' : '#FFD700',
                                        left: `${20 + Math.random() * 60}%`,
                                        top: `${10 + Math.random() * 80}%`,
                                    }}
                                    animate={{
                                        scale: [0, 2, 0],
                                        opacity: [0, 1, 0],
                                        y: [0, -30 - Math.random() * 40, -60 - Math.random() * 40],
                                        x: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 80],
                                    }}
                                    transition={{
                                        duration: 2 + Math.random(),
                                        repeat: Infinity,
                                        delay: Math.random() * 2,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}
                        </div>

                        {/* Floating Sparkles */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={`spark-${i}`}
                                    className="absolute"
                                    style={{
                                        color: i % 2 === 0 ? '#9B7A2F' : '#D87C45',
                                        left: `${15 + i * 15}%`,
                                        top: `${20 + Math.random() * 60}%`,
                                    }}
                                    animate={{
                                        y: [-15, 15, -15],
                                        opacity: [0.4, 1, 0.4],
                                        rotate: [0, 180, 360],
                                        scale: [0.8, 1.2, 0.8],
                                    }}
                                    transition={{
                                        duration: 3 + Math.random(),
                                        repeat: Infinity,
                                        delay: Math.random() * 2,
                                    }}
                                >
                                    <Sparkles size={10 + Math.random() * 8} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Crackers bursting animation */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={`cracker-${i}`}
                                    className="absolute"
                                    style={{
                                        left: `${25 + i * 25}%`,
                                        top: '30%',
                                    }}
                                    animate={{
                                        opacity: [0, 1, 1, 0],
                                        scale: [0, 1.5, 2, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.5,
                                        ease: "easeOut"
                                    }}
                                >
                                    <div className="relative w-16 h-16">
                                        {[...Array(8)].map((_, j) => (
                                            <motion.div
                                                key={j}
                                                className="absolute w-1 h-3 rounded-full top-1/2 left-1/2"
                                                style={{
                                                    backgroundColor: j % 2 === 0 ? '#9B7A2F' : '#D87C45',
                                                    transformOrigin: 'center',
                                                    rotate: `${j * 45}deg`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Golden Border Glow */}
                        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ border: '2px solid rgba(155, 122, 47, 0.3)' }}>
                            <motion.div
                                className="absolute inset-0 rounded-3xl"
                                animate={{
                                    boxShadow: [
                                        '0 0 20px rgba(155, 122, 47, 0.3)',
                                        '0 0 40px rgba(216, 124, 69, 0.5)',
                                        '0 0 20px rgba(155, 122, 47, 0.3)',
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>

                        {/* Main Content */}
                        <div className="relative px-6 sm:px-8 py-10 sm:py-12 text-center">
                            {/* Diya Animation */}
                            <motion.div
                                className="mx-auto mb-6 w-24 h-24 sm:w-28 sm:h-28 relative"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="absolute inset-0 rounded-t-full" style={{ background: 'linear-gradient(to bottom, #9B7A2F, #7A2E1D)' }}></div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-3 rounded-full" style={{ background: 'linear-gradient(to right, #5a1f11, #7A2E1D)' }}></div>
                                <motion.div
                                    className="absolute -top-8 left-1/2 -translate-x-1/2"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.8, 1, 0.8],
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <Flame className="w-10 h-10" style={{ color: '#D87C45' }} fill="#FF6B00" />
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 0, 0.5],
                                        }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <Flame className="w-10 h-10" style={{ color: '#FFD700' }} />
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            {/* Heading */}
                            <AnimatePresence>
                                {showContent && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 leading-tight" style={{
                                            background: 'linear-gradient(to right, #9B7A2F, #D87C45, #FFD700)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}>
                                            Happy Deepawali
                                        </h1>
                                        <motion.div
                                            className="flex items-center justify-center gap-2 mb-4"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            <div className="w-16 sm:w-20 h-0.5" style={{ background: 'linear-gradient(to right, transparent, #9B7A2F, #D87C45)' }}></div>
                                            <Sparkles className="w-4 h-4" style={{ color: '#9B7A2F' }} />
                                            <div className="w-16 sm:w-20 h-0.5" style={{ background: 'linear-gradient(to left, transparent, #9B7A2F, #D87C45)' }}></div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Message */}
                            <AnimatePresence>
                                {showContent && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <p className="text-lg sm:text-xl font-semibold mb-2" style={{ color: '#D87C45' }}>
                                            From Organic Nation
                                        </p>
                                        <p className="text-sm sm:text-base mb-6 leading-relaxed" style={{ color: '#DCD2C0' }}>
                                            May this festival of lights illuminate your life with joy, prosperity, and organic goodness. Wishing you a sparkling Diwali!
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* CTA Button */}
                            <AnimatePresence>
                                {showContent && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="space-y-3"
                                    >
                                        <motion.button
                                            onClick={handleShopNow}
                                            className="relative w-full py-3 px-6 rounded-full font-semibold shadow-xl overflow-hidden group"
                                            style={{ color: '#FFFFFF' }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #7A2E1D, #9B7A2F, #D87C45)' }}></div>
                                            <motion.div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{ background: 'linear-gradient(to right, #D87C45, #9B7A2F, #7A2E1D)' }}
                                            ></motion.div>
                                            <span className="relative flex items-center justify-center gap-2">
                                                <Sparkles className="w-5 h-5" />
                                                Celebrate with Organic Products
                                            </span>
                                        </motion.button>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.8 }}
                                            className="text-xs flex items-center justify-center gap-1"
                                            style={{ color: '#9B7A2F' }}
                                        >
                                            <Flame size={14} />
                                            <span>Special Diwali offers available</span>
                                            <Flame size={14} />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bottom Decorative Border */}
                        <motion.div
                            className="h-2"
                            animate={{
                                background: [
                                    'linear-gradient(90deg, #7A2E1D 0%, #9B7A2F 50%, #D87C45 100%)',
                                    'linear-gradient(90deg, #9B7A2F 0%, #D87C45 50%, #7A2E1D 100%)',
                                    'linear-gradient(90deg, #D87C45 0%, #7A2E1D 50%, #9B7A2F 100%)',
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DiwaliWish;