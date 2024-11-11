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
        // Set localStorage to mark the popup as seen
        sessionStorage.setItem('popupShown', 'true');
    };

    useEffect(() => {

        // Check if the popup has already been shown using localStorage
        if (sessionStorage.getItem('popupShown') === 'true') {
            setPopupVisible(false); // If the popup was shown before, don't show it again
        }

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
            className={`fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center transition-opacity duration-300 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* <div
                ref={bannerRef}
                className={` text-[var(--themeColor)] px-6 py-2 rounded-lg shadow-lg max-w-[80%] bg-[var(--bgColorSecondary)] mx-auto transition-transform duration-300 ${isAnimated ? 'transform scale-100' : 'transform scale-75'}`}
            >

                <div className='px-4 text-end'>
                    <button type='button'
                        className='shadow-md rounded-full shadow-green-700 hover:scale-110 text-[var(--bgColorPrimary)]'
                        onClick={() => {
                            handleClosePopup();
                        }}><IoCloseSharp className='text-4xl' /></button>

                </div>
                <h2 className="text-3xl font-bold text-center xs:mb-2 mb-4 lg:mb-0">Welcome to Our Store!</h2>

                <div className='flex md:flex-row flex-col'>
                    <div className= ' flex justify-center items-center md:w-[40%] '>

                        <div className='font-serif text-center'>

                            <p className="mb-4 lg:text-2xl  tracking-widest ">Enjoy <span className='font-semibold'>FREE SHIPPING</span> on orders of Rs. 499 or more, also get additional <span className='font-semibold'>5% discount</span> on Online Payments — Shop now and save!</p>
                        </div>
                    </div>
                    <div>
                        <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/popupBanner.png" alt="" />
                    </div>
                </div>
            </div> */}

            <div
                ref={bannerRef}
                className={` rounded-lg shadow-lg max-w-[80%]  mx-auto transition-transform duration-300 ${isAnimated ? 'transform scale-100' : 'transform scale-75'}`}
            >
                <div className='px-4 mb-4 text-end'>
                    <button type='button'
                        className='shadow-md rounded-full shadow-green-700 hover:scale-110 text-[var(--bgColorPrimary)] bg-[var(--bgColorSecondary)]'
                        onClick={() => {
                            handleClosePopup();
                        }}><IoCloseSharp className='text-4xl' /></button>

                </div>
                {/* for desktop  */}
                <img
                    src="https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/additionalDiscount.png" alt="pop_up_banner"
                    className='hidden md:block'
                />
                {/* for mobile  */}
                <img
                    src="https://organicnationmages.s3.ap-south-1.amazonaws.com/popUp_additional_Dis_mobile.png" alt="pop_up_banner"
                    className='block md:hidden'

                />
            </div>
        </div>
    );
};

export default PopupBanner;
