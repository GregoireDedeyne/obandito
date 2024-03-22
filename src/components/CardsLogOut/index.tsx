import { Card } from '../CardLogOut';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from 'swiper/modules';

export function Cards({ data }) {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        spaceBetween={30}
        centeredSlides={true}
        slidesPerView={'3'}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        className="mySwiper h-96 w-3/4"
      >
        {data.map((card) => (
          <SwiperSlide className="">
            <Card
              key={card.image_url}
              image={card.image_url}
              alt={card.alt}
              name={card.name}
              description={card.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
