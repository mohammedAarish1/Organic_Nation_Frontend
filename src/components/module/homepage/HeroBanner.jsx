// import React, {  useEffect,  useState } from 'react';


// const HeroBanner = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');

//     // Banner slides data
//     const slides = [
//         {
//             id: 1,
//             // image: 'https://organicnationmages.s3.amazonaws.com/live-homepage-banners/pickle.webp',
//             image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2078&q=80',
//             title: 'Premium Organic Pickles',
//             subtitle: 'Handcrafted with Traditional Recipes',
//             cta: 'Shop Pickles'
//         },
//         {
//             id: 2,
//             image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
//             title: 'Pure Natural Honey',
//             subtitle: 'Straight from the Hive to Your Table',
//             cta: 'Explore Honey'
//         },
//         {
//             id: 3,
//             image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
//             title: 'Artisanal Dips & Spreads',
//             subtitle: 'Elevate Your Culinary Experience',
//             cta: 'Taste Now'
//         },
//         {
//             id: 4,
//             image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2081&q=80',
//             title: 'Delicious Chaaps',
//             subtitle: 'Plant-Based Protein Perfection',
//             cta: 'Order Fresh'
//         }
//     ];

//     const menuItems = [
//         { name: 'Home', href: '#' },
//         { name: 'Pickles', href: '#' },
//         { name: 'Honey', href: '#' },
//         { name: 'Dips', href: '#' },
//         { name: 'Chaaps', href: '#' },
//         { name: 'About', href: '#' },
//         { name: 'Contact', href: '#' }
//     ];

//     // Auto-slide functionality
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prev) => (prev + 1) % slides.length);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [slides.length]);

//     const nextSlide = () => {
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//     };

//     const prevSlide = () => {
//         setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//     };

//     return (
//         <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-orange-50 to-green-50">
//             {/* Header Overlay */}
//             <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/70 via-black/30 to-transparent">
//                 <div className="container mx-auto px-4 py-4">
//                     {/* Top Bar */}
//                     <div className="hidden md:flex justify-between items-center text-white/80 text-sm mb-4">
//                         <div className="flex items-center space-x-6">
//                             <div className="flex items-center space-x-2">
//                                 <BiPhone className="w-4 h-4" />
//                                 <span>+91-98765-43210</span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <BiMailSend className="w-4 h-4" />
//                                 <span>info@tastytraditions.com</span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <BiMapPin className="w-4 h-4" />
//                                 <span>Delhi, India</span>
//                             </div>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                             <span>Follow Us:</span>
//                             <div className="flex space-x-2">
//                                 <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
//                                     <span className="text-xs font-bold">f</span>
//                                 </div>
//                                 <div className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center">
//                                     <span className="text-xs font-bold">@</span>
//                                 </div>
//                                 <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
//                                     <span className="text-xs font-bold">▶</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Main Header */}
//                     <div className="flex items-center justify-between">
//                         {/* Logo */}
//                         <div className="flex items-center space-x-3">
//                             {/* <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-500 rounded-full flex items-center justify-center">
//                                 <span className="text-white font-bold text-xl">TT</span>
//                             </div> */}
//                             <div className=''>
//                                 <img src='https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.webp' alt="logo" className='min-w-10 xs:w-16 w-11' />
//                             </div>
//                             <div>
//                                 <h1 className="text-white font-bold text-xl md:text-2xl">Organic Nation</h1>
//                                 <p className="text-orange-200 text-sm hidden md:block">Authentic Flavors Since 1985</p>
//                             </div>
//                         </div>

//                         {/* Desktop Navigation */}
//                         <nav className="hidden lg:flex space-x-8">
//                             {menuItems.map((item) => (
//                                 <a
//                                     key={item.name}
//                                     href={item.href}
//                                     className="text-white hover:text-orange-300 transition-colors duration-300 font-medium"
//                                 >
//                                     {item.name}
//                                 </a>
//                             ))}
//                         </nav>

//                         {/* Search Bar */}
//                         <div className="hidden md:flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 w-80">
//                             <BiSearch className="w-5 h-5 text-white/70 mr-3" />
//                             <input
//                                 type="text"
//                                 placeholder="Search for pickles, honey, dips..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="bg-transparent text-white placeholder-white/70 outline-none flex-1"
//                             />
//                         </div>

//                         {/* Right Icons */}
//                         <div className="flex items-center space-x-4">
//                             <button className="p-2 text-white hover:text-orange-300 transition-colors duration-300">
//                                 <BiHeart className="w-6 h-6" />
//                             </button>
//                             <button className="p-2 text-white hover:text-orange-300 transition-colors duration-300">
//                                 <BiUser className="w-6 h-6" />
//                             </button>
//                             <button className="p-2 text-white hover:text-orange-300 transition-colors duration-300 relative">
//                                 <CgShoppingCart className="w-6 h-6" />
//                                 <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                                     3
//                                 </span>
//                             </button>

//                             {/* Mobile Menu Button */}
//                             <button
//                                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                                 className="lg:hidden p-2 text-white hover:text-orange-300 transition-colors duration-300"
//                             >
//                                 <BiMenu className="w-6 h-6" />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Mobile Search */}
//                     <div className="md:hidden mt-4">
//                         <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
//                             {/* <Search className="w-5 h-5 text-white/70 mr-3" /> */}
//                             <input
//                                 type="text"
//                                 placeholder="Search products..."
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                                 className="bg-transparent text-white placeholder-white/70 outline-none flex-1"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu Overlay */}
//             {isMenuOpen && (
//                 <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/90 z-40 lg:hidden">
//                     <div className="flex flex-col items-center justify-center h-full space-y-8">
//                         {menuItems.map((item) => (
//                             <a
//                                 key={item.name}
//                                 href={item.href}
//                                 onClick={() => setIsMenuOpen(false)}
//                                 className="text-white text-2xl hover:text-orange-300 transition-colors duration-300"
//                             >
//                                 {item.name}
//                             </a>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Banner Slides */}
//             <div className="relative w-full h-full">
//                 {slides.map((slide, index) => (
//                     <div
//                         key={slide.id}
//                         className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
//                             }`}
//                     >
//                         <div
//                             className="w-full h-full bg-cover bg-center bg-no-repeat"
//                             style={{ backgroundImage: `url(${slide.image})` }}
//                         >
//                             <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

//                             {/* Content Overlay */}
//                             <div className="absolute inset-0 flex items-center justify-center text-center px-4">
//                                 <div className="max-w-4xl mx-auto">
//                                     <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
//                                         {slide.title}
//                                     </h2>
//                                     <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
//                                         {slide.subtitle}
//                                     </p>
//                                     <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl">
//                                         {slide.cta}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Navigation Arrows */}
//             <button
//                 onClick={prevSlide}
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
//             >
//                 <BiChevronLeft className="w-6 h-6" />
//             </button>
//             <button
//                 onClick={nextSlide}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
//             >
//                 <BiChevronRight className="w-6 h-6" />
//             </button>

//             {/* Slide Indicators */}
//             <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
//                 {slides.map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => setCurrentSlide(index)}
//                         className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-orange-500 scale-125' : 'bg-white/50 hover:bg-white/70'
//                             }`}
//                     />
//                 ))}
//             </div>

//             {/* Floating Quick Actions */}
//             <div className="absolute bottom-8 right-8 z-20 hidden lg:flex flex-col space-y-3">
//                 <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
//                     <BiPhone className="w-5 h-5" />
//                 </button>
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110">
//                     <BiMailSend className="w-5 h-5" />
//                 </button>
//             </div>

//             {/* Scroll Indicator */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 text-white/70 animate-bounce">
//                 <div className="flex flex-col items-center">
//                     <span className="text-sm mb-2">Scroll Down</span>
//                     <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
//                         <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HeroBanner