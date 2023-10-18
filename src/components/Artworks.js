import React from 'react';
import '../css/Artworks.css';

import {Swiper,SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Artworks({slides2}) {
  return (
    <div data-aos="fade-down" data-aos-duration="2000">
        <h1 className='about-title' alt='about-us'>NASZE PRACE</h1>
      <hr></hr>
      <div className='slider-position'>
      <Swiper
      modules={[Navigation, Pagination,  A11y]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slides2 && slides2.map((slide) => (
          <SwiperSlide key={slide.image}>
            <img src={slide.image} alt={slide.title} />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      </div>
  )
}

export default Artworks
