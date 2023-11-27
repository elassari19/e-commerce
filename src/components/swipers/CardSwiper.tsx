'use client'

import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules';
import ProductCard from '../Cards/ProductCard';

interface Props extends SwiperProps {
  swipersItems: any[],
}

const CardSwiper = ({ swipersItems, ...rest }: Props) => {

  return <>
    <Swiper
      // slidesPerGroupSkip={1}
      cssMode
      navigation // prev and next clickable arrows
      // pagination={true} clickable dots
      mousewheel
      keyboard
      centeredSlides
      breakpoints={{
        360: {
          slidesPerView: 2,
          spaceBetween: 6
        },
        510: {
          slidesPerView: 3,
          spaceBetween: 6
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 6
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 6
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 6
        },
      }}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      loop
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className={`mySwiper h-[20rem] [&>.swiper-button-prev]:swiper-button [&>.swiper-button-next]:swiper-button`}
      {...rest}
    >
      {
      swipersItems.map((item, idx) => (<SwiperSlide key={idx} className='mx-4'>
        <ProductCard
          image={item.all}
          title={item.title}
          stars={item.stars}
          solds={item.solds}
          price={item.price}
          oldPrice={item.oldPrice}
          deal={item.deal}
          choice={item.choice}
          chipping={item.chipping}
        />
      </SwiperSlide>))
      }
    </Swiper>
  </>

}

export default CardSwiper