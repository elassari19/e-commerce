'use client'

import React from 'react'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css'

import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { Category, ImageUrl } from '@prisma/client';
import { cn } from '@/lib/utils';

interface Props extends SwiperProps {
  categories: (Category&{images: ImageUrl[]})[],
  path: string
}

const CategoriesSwiper = ({ categories, path, className }: Props) => {
  const perView = window.innerWidth > 1024 ? 5 : window.innerWidth > 768 ? 4 : 2.3;
  const space = window.innerWidth > 768 ? 20 : 10;

  return (
    <div className={cn('relative p-0 md:mx-8 mb-4', className)}>
      <Swiper
        slidesPerView={perView}
        spaceBetween={space}
        navigation={true} 
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper h-44 md:h-56"
      >
        {
          categories.map((category, idx) => (
            <SwiperSlide
              key={idx}
              className='w-full h-full py-2 px-1'
            >
              <Link
                href={`/${path}/${category.parentId||category.id}?t=${category.name}`} 
                className='w-full h-full rounded-2xl flex flex-col gap-2 justify-center
                items-center shadow p-2 hover:shadow-primary/60'
              >
                <Image src={category?.images?.[0]?.secure_url} loading="lazy" priority={false}
                  width={50} height={50} alt={`item image ${idx}`}
                  className={`w-36 h-36 rounded-full`}
                />
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