import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/pagination/pagination";
import { fetchCategoryWiseData, setCategoryBtnValue } from "../../features/filter/filterSlice";
// swiper 
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// import required modules
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';




const images = [
 
  {
    image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/8.png',
    categoryUrl: `all`,
  },
 
  {
    image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/additionalDiscount.png',
    categoryUrl: `all`,
  },
  {
    image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/diwali_pickle.png',
    categoryUrl: `authentic-pickles`,
  },
  {
    image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/1.png',
    categoryUrl: `authentic-pickles`,
  },
  {
    image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/2.png',
    categoryUrl: `organic-honey`,
  },
  // {
  //   image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/3.png',
  //   categoryUrl: `authentic-pickles`,
  // },
  {
    image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/4.png',
    categoryUrl: `about-us`,
  },
  {
    image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/5.png',
    categoryUrl: `organic-oils`,
  },
  {
    image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/6.png',
    categoryUrl: `breakfast-cereals`,
  },
  {
    image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/7.png',
    categoryUrl: `seasonings-&-herbs`,
  },

];

const Banner = () => {

  const dispatch = useDispatch();


  return (
    <section className="w-full">
      <Swiper
        effect={'fade'}
        speed={1000}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Autoplay, Pagination]}
        className="mySwiper bannerCustomCss">

        {images.map((curItem) => (
          <SwiperSlide key={curItem.image} >
            <Link to={curItem.categoryUrl === 'about-us' ? `/about-us` : `/shop/${curItem.categoryUrl.toLowerCase()}`}>
              <img
                src={curItem.image}
                alt={curItem.categoryUrl}
                className="bg-[var(--bgColorSecondary)]"
                onClick={() => {
                  dispatch(setCurrentPage(1))
                  dispatch(setCategoryBtnValue(curItem.categoryUrl))
                  dispatch(fetchCategoryWiseData(curItem.categoryUrl.toLowerCase()))


                }}
              />
            </Link>
          </SwiperSlide>
        ))}

      </Swiper>
    </section>
  );
};

export default Banner;











