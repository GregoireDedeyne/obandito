import { Card } from '../Card';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Scrollbar } from 'swiper/modules';

/**
 * A component for rendering a list of cards.
 *
 * @param {Array} data - The array of data to render as cards.
 * @param {string} title - The title of the card section.
 * @param {string} subtitle - The subtitle of the card section.
 * @returns {JSX.Element} The cards JSX element.
 */

// =========================================================
//WARNING ID is a STRING !!!!!!!!!!!!!!!!!!!!!!!
// =========================================================

export function Cards({ data, title, subtitle }) {
  return (
    <div className="flex flex-col bg-white py-20">
      <div className="flex gap-5 justify-start px-5 w-full max-md:max-w-full my-8 lg:ml-20 sm:ml-0">
        <h2 className="text-xl font-semibold leading-6 text-neutral-700">
          {title}
        </h2>
        {subtitle && (
          <h2 className="text-l font-semibold leading-6 text-neutral-700">
            {subtitle}
          </h2>
        )}
      </div>

      <Swiper
        spaceBetween={20}
        centeredSlides={false}
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
          <SwiperSlide className="shadow-sm" key={card?.id}>
            <div className="max-w-[302px]">
              <Card
                image={card?.image_url}
                alt={card?.name}
                name={card?.name}
                style={card?.style?.name}
                id={card?.id}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
