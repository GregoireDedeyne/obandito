import { Card } from '../CardLogOut';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Scrollbar } from 'swiper/modules';

export function Cards({ data }) {
  return (
    <div className="flex flex-col bg-white py-20">
      <div className="flex gap-5 justify-start px-5 w-full max-md:max-w-full my-8 lg:ml-20 sm:ml-0">
        <h2 className="text-xl font-semibold leading-6 text-neutral-700">
          Les derniers Artistes disponibles
        </h2>
      </div>

      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        // slidesPerView={'3'}
        scrollbar={{ hide: true }}
        navigation={false}
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          680: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        modules={[Navigation, Scrollbar]}
        className="mySwiper h-4/5 w-4/5 "
      >
        {data.map((card) => (
          <SwiperSlide className="shadow-sm">
            <Card
              key={card.image_url}
              image={card.image_url}
              alt={card.alt}
              name={card.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
