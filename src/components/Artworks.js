import React from 'react';
import '../css/Artworks.css';
import Tattoos from './Tattoos';
import slides3 from '../models/tattoo.json';
import {Swiper,SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { useLanguage } from '../language/LanguageContext.js';

function Artworks({slides2}) {
  const { t, language } = useLanguage();
  return (
    <div data-aos="fade-down" data-aos-duration="2000">
        <h1 className='about-title' alt='about-us'>{t('artworksHead')}</h1>
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
      <Tattoos slides3={slides3}/>
      </div>
      </div>
  )
}

export default Artworks
