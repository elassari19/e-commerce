'use client'

import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image, { StaticImageData } from 'next/image';

interface Props extends SwiperProps {
  swipersItems: StaticImageData[],
}

const ImageSwiper = ({ swipersItems, ...rest }: Props) => {
  return <>
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      // autoplay={{
      //   delay: 1500,
      //   disableOnInteraction: false,
      // }}
      // pagination={{
      //   clickable: true,
      // }}
      modules={[Autoplay, Pagination, Navigation]}
      className={`mySwiper h-full`}
      {...rest}
    >
      {
        swipersItems.map((item, idx) => (<SwiperSlide key={idx}>
          {<Image src={item} loading="lazy" alt={`item image ${idx}`} className={`w-full`}/>}
        </SwiperSlide>))
      }
    </Swiper>
  </>

}

export default ImageSwiper