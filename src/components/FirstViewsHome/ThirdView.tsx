import { CallToAction } from '../InfoHomeCard/CallToAction';
import { EventCard } from '../InfoHomeCard/InfoHomeCard';
import { Localisation } from '../InfoHomeCard/Localisation';

const eventData = [
  {
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/d3b05ef4d181d59ff342b040cc21c8a210cd01854c2cc755ffc73e8dead2e6d1?apiKey=877605d91b494696bd5bbaa7fb33442f&',
    overlayImageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/69ddf325c0da4fc51d0f7eec9bede783c01f4224f6ae3cf08ce65791a84c762e?apiKey=877605d91b494696bd5bbaa7fb33442f&',
    title: 'Concert à La Rochelle',
    description:
      'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    searchTags: ['Groupe de Rock'],
    platform: 'WooCommerce',
    timeAgo: 'Il y a 1 heure',
    price: 500,
    offer: 3,
    vues: 64,
  },
  {
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/d3b05ef4d181d59ff342b040cc21c8a210cd01854c2cc755ffc73e8dead2e6d1?apiKey=877605d91b494696bd5bbaa7fb33442f&',
    overlayImageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/52e58c01f2396a9e782f9562f2a0496a2a199f27913c86b67cc800e7a596432b?apiKey=877605d91b494696bd5bbaa7fb33442f&',
    title: 'Concert à La Rochelle',
    description:
      'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    searchTags: ['Groupe de Rock'],
    platform: 'WooCommerce',
    timeAgo: 'Il y a 1 heure',
    price: 500,
    offer: 3,
    vues: 64,
  },
  {
    imageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/d3b05ef4d181d59ff342b040cc21c8a210cd01854c2cc755ffc73e8dead2e6d1?apiKey=877605d91b494696bd5bbaa7fb33442f&',
    overlayImageUrl:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/4d4a3c838811e01275b2b3cf46a0c3899bfe88d5ee0e5d4c2f8ecf81d0d2940f?apiKey=877605d91b494696bd5bbaa7fb33442f&',
    title: 'Concert à La Rochelle',
    description:
      'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    searchTags: ['Groupe de Rock'],
    platform: 'WooCommerce',
    timeAgo: 'Il y a 1 heure',
    price: 500,
    offer: 3,
    vues: 64,
  },
];

export function ThirdView() {
  return (
    <div className="flex ">
      <Localisation />
      <div className="flex flex-col  max-w-[825px] items-center xl:ml-48 lg:mt-0">
        <h2 className="w-full text-xl font-semibold leading-6 text-neutral-700 max-md:max-w-full">
          Les événements à venir
        </h2>
        <div className="flex flex-col mt-7 w-full max-w-[825px] ">
          {eventData.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
        <CallToAction />
        <button className="justify-center items-center	 w-fit px-16 py-4 mt-3 font-medium text-white bg-rose-500 leading-[175%] rounded-[800px] max-md:px-5 hover:bg-purple-800">
          Voir plus{' '}
        </button>
      </div>
    </div>
  );
}
