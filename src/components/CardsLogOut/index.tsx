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
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 0,
          slideShadows: false,
        }}
        // pagination={{
        //   clickable: false,
        // }}
        navigation={false}
        modules={[Autoplay, Navigation, EffectCoverflow]}
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
