import React from 'react';
import '../css/HeroSection.css';
import Home from './Home';
import {Swiper,SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



function HeroSection({ slides }) {
    return (
      <div data-aos="fade-down" data-aos-duration="2000">
      <Swiper
      modules={[Navigation, Pagination,  A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slides && slides.map((slide) => (
          <SwiperSlide key={slide.image}>
            <img src={slide.image} alt={slide.title} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Home/>
      </div>
    );
  }
  

export default HeroSection;
