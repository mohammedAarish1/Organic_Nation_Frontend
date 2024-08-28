// PopupBanner.js
import React, { useEffect, useRef, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
// import './PopupBanner.css'; // Import custom styles if needed

const PopupBanner = () => {


    const [isPopupVisible, setPopupVisible] = useState(true);
    const [isAnimated, setIsAnimated] = useState(false);
    const bannerRef = useRef(null);


    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    useEffect(() => {
        // Add a delay before showing the popup
        const timer = setTimeout(() => {
            setIsAnimated(true);
        }, 1000); // Adjust delay as needed

        // Clean up timer on component unmount
        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        // Close the banner if user clicks outside of it
        const handleClickOutside = (event) => {
            if (bannerRef.current && !bannerRef.current.contains(event.target)) {
                handleClosePopup();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClosePopup]);

    if (!isPopupVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
        >
            <div
                ref={bannerRef}
                className={` text-[var(--themeColor)] px-6 py-2 rounded-lg shadow-lg max-w-[80%] bg-[var(--bgColorSecondary)] mx-auto transition-transform duration-300 ${isAnimated ? 'transform scale-100' : 'transform scale-75'}`}
            >

                {/* close button  */}
                <div className='px-4 text-end'>
                    <button type='button'
                        className='shadow-md rounded-full shadow-green-700 hover:scale-110 text-[var(--bgColorPrimary)]'
                        onClick={() => {
                            handleClosePopup();
                        }}><IoCloseSharp className='text-4xl' /></button>

                </div>

                <div className='flex md:flex-row flex-col'>
                    <div className= ' flex justify-center items-center md:w-[40%] '>

                        <div className='font-serif text-center'>

                            <h2 className="text-2xl font-bold mb-4">Welcome to Our Store!</h2>
                            <p className="mb-4 lg:text-2xl  tracking-widest ">Enjoy FREE SHIPPING on orders of Rs. 399 or more — Shop now and save!</p>
                        </div>
                    </div>
                    <div>
                        <img src="popupBanner.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupBanner;
