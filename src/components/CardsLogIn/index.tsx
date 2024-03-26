// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { CardLogIn } from '../CardLogIn';

const data = [
  {
    name: 'aaa',
    url: 'https://www.rollingstone.com/wp-content/uploads/2023/05/6-Ways-To-Build-Your-Brand-as-a-Musician-in-2023.jpg',
    alt: 'aaa',
    description: 'description',
    link: '',
  },
  {
    name: 'b',
    url: 'https://media.istockphoto.com/id/1125877063/fr/photo/femme-de-race-mixte-chantant-et-jouant-de-la-guitare.jpg?s=612x612&w=0&k=20&c=u9QiXxCTPMlTUo4jM-1Qo2sagHLDkgTzoMhLKPSXNXM=',
    alt: 'bbb',
    description: 'description',
    link: '',
  },
  {
    name: 'bb',
    url: 'https://www.rollingstone.com/wp-content/uploads/2023/05/6-Ways-To-Build-Your-Brand-as-a-Musician-in-2023.jpg',
    alt: 'bbb',
    description: 'erztytzer eyruyyter ytuyyertuyyrytu yiyrtuyiyrt uyi',
    link: '',
  },
  {
    name: 'bbb',
    url: 'https://media.istockphoto.com/id/1125877063/fr/photo/femme-de-race-mixte-chantant-et-jouant-de-la-guitare.jpg?s=612x612&w=0&k=20&c=u9QiXxCTPMlTUo4jM-1Qo2sagHLDkgTzoMhLKPSXNXM=',
    alt: 'bbb',
    description: 'description',
    link: '',
  },
  {
    name: 'baa',
    url: 'https://www.rollingstone.com/wp-content/uploads/2023/05/6-Ways-To-Build-Your-Brand-as-a-Musician-in-2023.jpg',
    alt: 'bbb',
    description: 'description',
    link: '',
  },
];

export default function CardsLogIn() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {data.map((card) => (
          <SwiperSlide key={data.name}>
            <CardLogIn
              key={card.url}
              image={card.url}
              alt={card.alt}
              name={card.name}
              description={card.description}
              link={card.link}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
