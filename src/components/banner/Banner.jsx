import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/pagination/pagination";
import { fetchCategoryWiseData, setCategoryBtnValue } from "../../features/filter/filterSlice";
// images 
import banner1 from '../../images/banners/1.png';
import banner2 from '../../images/banners/2.png';
import banner3 from '../../images/banners/3.png';
import banner4 from '../../images/banners/4.png';
import banner5 from '../../images/banners/5.png';
import banner6 from '../../images/banners/6.png';
import banner7 from '../../images/banners/7.png';

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
    image: banner1,
    categoryUrl: `authentic-pickles`,
  },
  {
    image: banner2,
    categoryUrl: `organic-honey`,
  },
  {
    image: banner3,
    categoryUrl: `authentic-pickles`,
  },
  {
    image: banner4,
    categoryUrl: `about-us`,
  },
  {
    image: banner5,
    categoryUrl: `organic-oils`,
  },
  {
    image: banner6,
    categoryUrl: `breakfast-cereals`,
  },
  {
    image: banner7,
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











