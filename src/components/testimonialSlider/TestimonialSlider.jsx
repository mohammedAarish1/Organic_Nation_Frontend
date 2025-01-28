import React, { useEffect, useRef, useState } from 'react';
// // Icons
import { IoPersonCircle } from 'react-icons/io5';


const feedbacks = [
    {
        customerName: "Avinash Jain",
        customerPicture: <IoPersonCircle className='text-[200px] text-[var(--bgColorPrimary)]' />,
        // customerDesignation: "Organic Nation's products are so genuine and healthy !",
        description: "I've been using Organic Nation’s Honey for years and it's the best, pure, delicious, and has so many health benefits. Highly recommended!",

    },
    {
        customerName: "Akash Kumar",
        customerPicture: <IoPersonCircle className='text-[200px] text-[var(--bgColorPrimary)]' />,
        // customerDesignation: "Organic Nation's products are so genuine and healthy !",
        description: "Organic honey from Organic Nation has been a game-changer for me. Rich, flavorful, and pure - the best honey I've ever tasted!",

    },
    {
        customerName: "Aparna Singh",
        customerPicture: <IoPersonCircle className='text-[200px] text-[var(--bgColorPrimary)]' />,
        // customerDesignation: "Organic Nation's products are so genuine and healthy !",
        description: "Garlic Pickle is very testy! The bold flavors have transformed my cooking. Highly recommend for anyone looking to spice up their meals.",

    },
    {
        customerName: "Abhinav Banerjee",
        customerPicture: <IoPersonCircle className='text-[200px] text-[var(--bgColorPrimary)]' />,
        // customerDesignation: "Organic Nation's products are so genuine and healthy !",
        description: "Green Chili Pickle is a delightful condiment that adds a flavorful kick to any meal. The perfect balance of spice and tanginess makes it a must-try.",

    },
    {
        customerName: "Sumit Tiwary",
        customerPicture: <IoPersonCircle className='text-[200px] text-[var(--bgColorPrimary)]' />,
        // customerDesignation: "Organic Nation's products are so genuine and healthy !",
        description: "Brown Sugar's high-quality ingredients and thoughtful formulations have transformed my skin. I'm thoroughly impressed and highly recommend this brand.",

    },

]


const TestimonialSlider = ({  }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

    const intervalRef = useRef(null);

    // Autoplay logic
    useEffect(() => {
        if (feedbacks.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % feedbacks.length);
            }, 3000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [feedbacks.length]);

  return (
    <div className="relative w-full sm:max-w-4xl mx-auto text-white px-5">
      <div className="bg-custom-gradient rounded-lg shadow-lg p-8 text-center">
        {/* Slide Content */}
        <div className="flex items-center justify-center mb-4">
          {feedbacks[currentIndex].customerPicture}
        </div>

        <div className="mb-4">
          <p className=" italic">"{feedbacks[currentIndex].description}"</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-600 ">
          {feedbacks[currentIndex].customerName}
        </h3>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {feedbacks.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={` w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-blue-600 w-6'  : 'bg-gray-300 hover:bg-gray-400'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
