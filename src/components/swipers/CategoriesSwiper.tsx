'use client'

import React from 'react'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css'

import { Navigation, Pagination } from 'swiper/modules';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Category } from '@prisma/client';

interface Props extends SwiperProps {
  categories: Category[],
}

const CategoriesSwiper = ({ categories }: Props) => {
  const perView = window.innerWidth > 1024 ? 6 : window.innerWidth > 768 ? 4 : 2

  return (
    <div className='relative p-4 md:mx-8'>
      <Swiper
        slidesPerView={perView}
        spaceBetween={30}
        navigation={true} 
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper h-36"
      >
        {
          categories.map((category, idx) => (
            <SwiperSlide
              key={idx}
              className='w-full h-full p-2'
            >
              <Link href={`/?c=${category.id}`} className='w-full h-full rounded-2xl flex flex-col gap-2 justify-center items-center'>
                {/* <Image src={category.image} loading="lazy" priority={false}
                  width={50} height={50} alt={`item image ${idx}`}
                  className={`w-16 h-16 rounded-full`}
                /> */}
                <h4 className='font-bold text-sm text-center'>{category.name}</h4>
              </Link>
            </SwiperSlide>
          ))
        } 
      </Swiper>
    </div>
  )
}

export default CategoriesSwiper