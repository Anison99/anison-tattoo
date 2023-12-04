import React, { useState, useEffect } from 'react';
import '../css/Tattoos.css';

import {Swiper,SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Tattoos({slides3}) {
  const [slidesPerView, setSlidesPerView] = useState(window.innerWidth > 800 ? 3 : 1);

  useEffect(() => {
    function handleResize() {
      setSlidesPerView(window.innerWidth > 800 ? 3 : 1);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div data-aos="fade-down" data-aos-duration="2000">
      <div className='slider-position'>
      <Swiper
      modules={[Navigation, Pagination,  A11y]}
        spaceBetween={50}
        slidesPerView={slidesPerView}
        navigation
        pagination={{ clickable: true }}
        
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {slides3 && slides3.map((slide) => (
          <SwiperSlide key={slide.image}>
            <img src={slide.image} alt={slide.title} />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      </div>
  )
}

export default Tattoos
