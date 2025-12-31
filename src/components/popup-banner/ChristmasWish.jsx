// import  { useState, useEffect } from 'react';
// import { X, Sparkles, Gift, Star } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const ChristmasWish = () => {
//     const navigate=useNavigate()
//     const [isOpen, setIsOpen] = useState(false);
//     const [showContent, setShowContent] = useState(false);

//     useEffect(() => {
//         const hasSeenPopup = sessionStorage.getItem('christmasPopupSeen');
//         if (!hasSeenPopup) {
//             const timer = setTimeout(() => setIsOpen(true), 2000);
//             return () => clearTimeout(timer);
//         }
//     }, []);

//     useEffect(() => {
//         if (isOpen) {
//             const timer = setTimeout(() => {
//                 setShowContent(true);
//             }, 300);
//             return () => clearTimeout(timer);
//         } else {
//             setShowContent(false);
//         }
//     }, [isOpen]);

//     const handleClose = () => {
//         setIsOpen(false);
//         sessionStorage.setItem('christmasPopupSeen', 'true');
//     };

//     const handleShopNow = () => {
//         navigate('/shop/all')
//         // Add your navigation logic here
//     };

//     if (!isOpen) return null;

//     return (
//         <div
//             className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//             style={{
//                 animation: 'fadeIn 0.3s ease-out'
//             }}
//             onClick={(e) => e.target === e.currentTarget && handleClose()}
//         >
//             <div
//                 className="relative max-w-md w-full rounded-3xl overflow-hidden shadow-2xl"
//                 style={{
//                     background: 'linear-gradient(135deg, #0a1f2e 0%, #1a3a4a 30%, #2d1b1b 70%, #0a1f2e 100%)',
//                     animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {/* Close Button */}
//                 <button
//                     onClick={handleClose}
//                     className="absolute top-4 right-4 z-20 rounded-full p-2 transition-all duration-200 hover:rotate-90"
//                     style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(8px)' }}
//                 >
//                     <X className="w-4 h-4 text-white" />
//                 </button>

//                 {/* Falling Snowflakes */}
//                 <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                     {[...Array(20)].map((_, i) => (
//                         <div
//                             key={`snow-${i}`}
//                             className="absolute w-1 h-1 bg-white rounded-full"
//                             style={{
//                                 left: `${Math.random() * 100}%`,
//                                 top: `-5%`,
//                                 opacity: 0.6 + Math.random() * 0.4,
//                                 animation: `snowfall ${8 + Math.random() * 4}s linear infinite`,
//                                 animationDelay: `${Math.random() * 5}s`
//                             }}
//                         />
//                     ))}
//                 </div>

//                 {/* Twinkling Stars */}
//                 <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                     {[...Array(8)].map((_, i) => (
//                         <div
//                             key={`star-${i}`}
//                             className="absolute"
//                             style={{
//                                 left: `${10 + i * 12}%`,
//                                 top: `${10 + Math.random() * 70}%`,
//                                 animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
//                                 animationDelay: `${Math.random() * 2}s`
//                             }}
//                         >
//                             <Star size={8 + Math.random() * 6} className="text-yellow-200" fill="currentColor" />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Ornament decorations */}
//                 <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                     {[...Array(4)].map((_, i) => (
//                         <div
//                             key={`ornament-${i}`}
//                             className="absolute rounded-full"
//                             style={{
//                                 width: '30px',
//                                 height: '30px',
//                                 background: i % 2 === 0 
//                                     ? 'linear-gradient(135deg, #c41e3a, #8b1a2e)' 
//                                     : 'linear-gradient(135deg, #ffd700, #daa520)',
//                                 left: `${15 + i * 20}%`,
//                                 top: '8%',
//                                 boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
//                                 animation: `swing ${3 + i * 0.5}s ease-in-out infinite`
//                             }}
//                         >
//                             <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-600 rounded" />
//                             <div
//                                 className="absolute inset-1 rounded-full"
//                                 style={{ 
//                                     background: 'rgba(255,255,255,0.3)',
//                                     animation: 'pulse 2s ease-in-out infinite'
//                                 }}
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Glowing Border */}
//                 <div 
//                     className="absolute inset-0 rounded-3xl pointer-events-none" 
//                     style={{ 
//                         border: '2px solid rgba(196, 30, 58, 0.3)',
//                         animation: 'borderGlow 3s ease-in-out infinite'
//                     }}
//                 />

//                 {/* Main Content */}
//                 <div className="relative px-6 sm:px-8 py-10 sm:py-12 text-center">
//                     {/* Christmas Tree */}
//                     <div
//                         className="mx-auto mb-6 w-24 h-24 sm:w-28 sm:h-28 relative"
//                         style={{
//                             animation: 'breathe 2s ease-in-out infinite'
//                         }}
//                     >
//                         {/* Tree trunk */}
//                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-amber-900 to-amber-950 rounded" />
                        
//                         {/* Tree layers */}
//                         {[...Array(3)].map((_, i) => (
//                             <div
//                                 key={i}
//                                 className="absolute left-1/2 -translate-x-1/2"
//                                 style={{
//                                     bottom: `${20 + i * 18}px`,
//                                     width: `${80 - i * 15}px`,
//                                     height: `${50 - i * 10}px`,
//                                     background: 'linear-gradient(to bottom, #0d5c2f, #0a4824)',
//                                     clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
//                                 }}
//                             />
//                         ))}
                        
//                         {/* Star on top */}
//                         <div
//                             className="absolute -top-2 left-1/2 -translate-x-1/2"
//                             style={{
//                                 animation: 'rotateStar 4s linear infinite, scalePulse 2s ease-in-out infinite',
//                                 filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))'
//                             }}
//                         >
//                             <Star className="w-6 h-6 text-yellow-300" fill="currentColor" />
//                         </div>
                        
//                         {/* Ornaments on tree */}
//                         {[...Array(6)].map((_, i) => (
//                             <div
//                                 key={`tree-ornament-${i}`}
//                                 className="absolute rounded-full"
//                                 style={{
//                                     width: '8px',
//                                     height: '8px',
//                                     background: i % 3 === 0 ? '#c41e3a' : i % 3 === 1 ? '#ffd700' : '#4169e1',
//                                     left: `${25 + (i % 3) * 20}%`,
//                                     bottom: `${25 + Math.floor(i / 3) * 20}px`,
//                                     animation: `blink 1.5s ease-in-out infinite`,
//                                     animationDelay: `${i * 0.2}s`
//                                 }}
//                             />
//                         ))}
//                     </div>

//                     {/* Heading */}
//                     <div
//                         style={{
//                             opacity: showContent ? 1 : 0,
//                             transform: showContent ? 'translateY(0)' : 'translateY(20px)',
//                             transition: 'all 0.5s ease-out 0.2s'
//                         }}
//                     >
//                         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 leading-tight" style={{
//                             background: 'linear-gradient(to right, #c41e3a, #ffd700, #ffffff, #ffd700, #c41e3a)',
//                             WebkitBackgroundClip: 'text',
//                             WebkitTextFillColor: 'transparent',
//                             backgroundClip: 'text',
//                             backgroundSize: '200% auto',
//                             animation: 'shimmer 3s linear infinite',
//                         }}>
//                             Merry Christmas
//                         </h1>
//                         <div
//                             className="flex items-center justify-center gap-2 mb-4"
//                             style={{
//                                 animation: 'scalePulse 2s ease-in-out infinite'
//                             }}
//                         >
//                             <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-yellow-500" />
//                             <Sparkles className="w-4 h-4 text-yellow-300" />
//                             <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-l from-transparent via-red-500 to-yellow-500" />
//                         </div>
//                     </div>

//                     {/* Message */}
//                     <div
//                         style={{
//                             opacity: showContent ? 1 : 0,
//                             transform: showContent ? 'translateY(0)' : 'translateY(20px)',
//                             transition: 'all 0.5s ease-out 0.4s'
//                         }}
//                     >
//                         <p className="text-lg sm:text-xl font-semibold mb-2 text-red-400">
//                             From Organic Nation
//                         </p>
//                         <p className="text-sm sm:text-base mb-6 leading-relaxed text-blue-100">
//                             Wishing you a season filled with warmth, joy, and the magic of Christmas. May your holidays sparkle with moments of love and laughter!
//                         </p>
//                     </div>

//                     {/* CTA Button */}
//                     <div
//                         style={{
//                             opacity: showContent ? 1 : 0,
//                             transform: showContent ? 'translateY(0)' : 'translateY(20px)',
//                             transition: 'all 0.5s ease-out 0.6s'
//                         }}
//                         className="space-y-3"
//                     >
//                         <button
//                             onClick={handleShopNow}
//                             className="relative w-full py-3 px-6 rounded-full font-semibold shadow-xl overflow-hidden group text-white transition-transform hover:scale-105 active:scale-95"
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-green-600 to-red-600" />
//                             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-green-600 via-red-600 to-green-600" />
//                             <span className="relative flex items-center justify-center gap-2">
//                                 <Gift className="w-5 h-5" />
//                                 Celebrate with Organic Products
//                             </span>
//                         </button>
//                         <div
//                             className="text-xs flex items-center justify-center gap-1 text-yellow-300"
//                             style={{
//                                 opacity: showContent ? 1 : 0,
//                                 transition: 'opacity 0.5s ease-out 0.8s'
//                             }}
//                         >
//                             <Sparkles size={14} />
//                             <span>Special Christmas offers available</span>
//                             <Sparkles size={14} />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Candy Cane Border */}
//                 <div
//                     className="h-2"
//                     style={{
//                         background: 'linear-gradient(90deg, #c41e3a 0%, #ffffff 25%, #c41e3a 50%, #ffffff 75%, #c41e3a 100%)',
//                         animation: 'candyCane 2s linear infinite'
//                     }}
//                 />
//             </div>

//             <style>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; }
//                     to { opacity: 1; }
//                 }
                
//                 @keyframes scaleIn {
//                     from { 
//                         opacity: 0;
//                         transform: scale(0.8) rotateY(-15deg);
//                     }
//                     to { 
//                         opacity: 1;
//                         transform: scale(1) rotateY(0deg);
//                     }
//                 }
                
//                 @keyframes snowfall {
//                     0% { 
//                         transform: translateY(0) translateX(0);
//                         opacity: 0;
//                     }
//                     10% { opacity: 1; }
//                     90% { opacity: 1; }
//                     100% { 
//                         transform: translateY(110vh) translateX(var(--drift, 20px));
//                         opacity: 0;
//                     }
//                 }
                
//                 @keyframes twinkle {
//                     0%, 100% { 
//                         opacity: 0.3;
//                         transform: scale(0.8) rotate(0deg);
//                     }
//                     50% { 
//                         opacity: 1;
//                         transform: scale(1.2) rotate(180deg);
//                     }
//                 }
                
//                 @keyframes swing {
//                     0%, 100% { transform: translateY(0) rotate(0deg); }
//                     25% { transform: translateY(10px) rotate(2deg); }
//                     75% { transform: translateY(10px) rotate(-2deg); }
//                 }
                
//                 @keyframes pulse {
//                     0%, 100% { opacity: 0.3; }
//                     50% { opacity: 0.6; }
//                 }
                
//                 @keyframes borderGlow {
//                     0%, 100% { box-shadow: 0 0 20px rgba(196, 30, 58, 0.4); }
//                     50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.5); }
//                 }
                
//                 @keyframes breathe {
//                     0%, 100% { transform: scale(1); }
//                     50% { transform: scale(1.03); }
//                 }
                
//                 @keyframes rotateStar {
//                     from { transform: rotate(0deg); }
//                     to { transform: rotate(360deg); }
//                 }
                
//                 @keyframes scalePulse {
//                     0%, 100% { transform: scale(1); }
//                     50% { transform: scale(1.05); }
//                 }
                
//                 @keyframes blink {
//                     0%, 100% { opacity: 0.6; }
//                     50% { opacity: 1; }
//                 }
                
//                 @keyframes shimmer {
//                     0% { background-position: 0% center; }
//                     100% { background-position: 200% center; }
//                 }
                
//                 @keyframes candyCane {
//                     0% { 
//                         background: linear-gradient(90deg, #c41e3a 0%, #ffffff 25%, #c41e3a 50%, #ffffff 75%, #c41e3a 100%);
//                     }
//                     100% { 
//                         background: linear-gradient(90deg, #ffffff 0%, #c41e3a 25%, #ffffff 50%, #c41e3a 75%, #ffffff 100%);
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default ChristmasWish;