'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css'

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode[]
}

const RootSwiper = ({ children } :Props) => {
  const perView = window.innerWidth > 1024 ? 5 : window.innerWidth > 768 ? 4 : 2.3;
  const space = window.innerWidth > 768 ? 20 : 10;

  return (
    <Swiper
    slidesPerView={perView}
    spaceBetween={space}
    navigation={true} 
    pagination={{ clickable: true }}
    modules={[Navigation, Pagination]}
    className="mySwiper h-56"
  >
    {children?.map((category, idx) => (
      <SwiperSlide
        className='w-full h-full py-2 px-1'
        key={idx}
      >
        {category}
      </SwiperSlide>
    ))}
  </Swiper>
  )
}

export default RootSwiper