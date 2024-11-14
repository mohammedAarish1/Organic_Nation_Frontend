import React, { useEffect, useState } from "react";
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
import axios from "axios";




// const images = [
 
//   {
//     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/8.png',
//     categoryUrl: `all`,
//   },
 
//   {
//     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/additionalDiscount.png',
//     categoryUrl: `all`,
//   },
//   {
//     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/pickle_offer.png',
//     categoryUrl: `authentic-pickles`,
//   },
//   {
//     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/1.png',
//     categoryUrl: `authentic-pickles`,
//   },
//   {
//     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/2.png',
//     categoryUrl: `organic-honey`,
//   },
//   {
//     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/4.png',
//     categoryUrl: `about-us`,
//   },
//   {
//     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/5.png',
//     categoryUrl: `organic-oils`,
//   },
//   {
//     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/6.png',
//     categoryUrl: `breakfast-cereals`,
//   },
//   {
//     image: 'https://organicnationmages.s3.ap-south-1.amazonaws.com/main_banners/7.png',
//     categoryUrl: `seasonings-&-herbs`,
//   },

// ];

const apiUrl = import.meta.env.VITE_BACKEND_URL;


const Banner = () => {

  const dispatch = useDispatch();
  const [mainBanners,setMainBanners]=useState([]);

  const getMainBanners=async()=>{
    try {
      const response=await axios.get(`${apiUrl}/api/main/banners`)
      if(response.data){
        setMainBanners(response.data.mainBanners)
      }
    } catch (error) {
      throw error
    }
  }

  useEffect(()=>{
    getMainBanners();
  },[])

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

        {mainBanners.map((curItem) => (
          <SwiperSlide key={curItem.image} >
            <Link to={curItem.redirectionUrl === 'about-us' ? `/about-us` : `/shop/${curItem.redirectionUrl.toLowerCase()}`}>
              <img
                src={curItem.image}
                alt={curItem.redirectionUrl}
                className="bg-[var(--bgColorSecondary)]"
                onClick={() => {
                  dispatch(setCurrentPage(1))
                  dispatch(setCategoryBtnValue(curItem.redirectionUrl))
                  dispatch(fetchCategoryWiseData(curItem.redirectionUrl.toLowerCase()))


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











