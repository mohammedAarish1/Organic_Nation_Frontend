import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
// react icons 
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextSlide, 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex]); // Reset interval whenever currentIndex changes

  return (
    <div className="relative w-full h-[500px]">
      {images.map((image, index) => (
        <Transition
          key={index}
          show={index === currentIndex}
          enter="transition-opacity duration-1000 ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-1000 ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0">
            <img
              src={image.image}
              alt="image"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="flex flex-col  w-[50%]">
                {/* <h1 className="text-4xl font-bold mb-4">{image.title}</h1> */}
                {/* <p className="text-xl">{image.text}</p> */}
                {/* <a href="#" className="bg-[var(--bgColorPrimary)]  px-6 py-4 w-max text-white hover:bg-green-900">Shop Now</a> */}
              </div>
            </div>
          </div>
        </Transition>
      ))}
      <button
        className="absolute top-1/2 left-4 text-white text-3xl bg-opacity-50 px-4 py-2 rounded-full"
        onClick={goToPrevSlide}
      >
     <MdArrowBackIos />
      </button>
      <button
        className="absolute top-1/2 right-4 text-white text-3xl bg-opacity-50 px-4 py-2 rounded-full"
        onClick={goToNextSlide}
      >
    <MdArrowForwardIos />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;





const images = [
    {
        image: "images/banners/healthysweetners.webp",
        title: 'Slide 1',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        image: "images/banners/herbs.webp",
        title: 'Slide 2',
        text: 'Nulla facilisi. Sed non urna. Donec et ante. Etiam sit amet.',
    },
    {
        image: "images/banners/mangopickel.webp",
        title: 'Slide 3',
        text: 'Integer vel nibh sit amet turpis vulputate aliquet.',
    },
    {
        image: "images/banners/organic_oil.webp",
        title: 'Slide 3',
        text: 'Integer vel nibh sit amet turpis vulputate aliquet.',
    },
    {
        image: "images/banners/organic_tea.webp",
        title: 'Slide 3',
        text: 'Integer vel nibh sit amet turpis vulputate aliquet.',
    },
    {
        image: "images/banners/sweetners.webp",
        title: 'Slide 3',
        text: 'Integer vel nibh sit amet turpis vulputate aliquet.',
    },
];

