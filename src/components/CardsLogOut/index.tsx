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

const data = [
  {
    name: 'aaa',
    url: 'https://www.rollingstone.com/wp-content/uploads/2023/05/6-Ways-To-Build-Your-Brand-as-a-Musician-in-2023.jpg',
    alt: 'aaa',
    description: 'description',
  },
  {
    name: 'bbb',
    url: 'https://media.istockphoto.com/id/1125877063/fr/photo/femme-de-race-mixte-chantant-et-jouant-de-la-guitare.jpg?s=612x612&w=0&k=20&c=u9QiXxCTPMlTUo4jM-1Qo2sagHLDkgTzoMhLKPSXNXM=',
    alt: 'bbb',
    description: 'description',
  },
  {
    name: 'bbb',
    url: 'https://www.rollingstone.com/wp-content/uploads/2023/05/6-Ways-To-Build-Your-Brand-as-a-Musician-in-2023.jpg',
    alt: 'bbb',
    description: 'erztytzer eyruyyter ytuyyertuyyrytu yiyrtuyiyrt uyi',
  },
  {
    name: 'bbb',
    url: 'https://media.istockphoto.com/id/1125877063/fr/photo/femme-de-race-mixte-chantant-et-jouant-de-la-guitare.jpg?s=612x612&w=0&k=20&c=u9QiXxCTPMlTUo4jM-1Qo2sagHLDkgTzoMhLKPSXNXM=',
    alt: 'bbb',
    description: 'description',
  },
  {
    name: 'bbb',
    url: 'https://www.rollingstone.com/wp-content/uploads/2023/05/6-Ways-To-Build-Your-Brand-as-a-Musician-in-2023.jpg',
    alt: 'bbb',
    description: 'description',
  },
];

export function Cards() {
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
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        className="mySwiper"
      >
        {data.map((card) => (
          <SwiperSlide>
            <Card
              key={card.url}
              image={card.url}
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
