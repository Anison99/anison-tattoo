import React from 'react';
import './HeroSection.css';
import {Swiper,SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



function HeroSection({ slides }) {
    return (
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
    );
  }
  

export default HeroSection;
