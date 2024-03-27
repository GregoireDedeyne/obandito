import { NavLink } from 'react-router-dom';
import { CallToAction } from '../InfoHomeCard/CallToAction';
import { EventCard } from '../InfoHomeCard/EventsCards';
import { Localisation } from '../InfoHomeCard/Localisation';

export function ThirdView({ events, locations }) {
  return (
    <div className="flex ">
      <Localisation locations={locations} />
      <div className="flex flex-col  max-w-[825px] items-center xl:ml-48 lg:mt-0">
        <h2 className="w-full text-xl font-semibold leading-6 text-neutral-700 max-md:max-w-full">
          Les événements à venir
        </h2>
        <div className="flex flex-col mt-7 w-full max-w-[825px] ">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
        <CallToAction />
        <NavLink to={'/login'}>
          <button className="justify-center items-center	 w-fit px-16 py-4 mt-3 font-medium text-white bg-rose-500 leading-[175%] rounded-[800px] max-md:px-5 hover:bg-purple-800">
            Voir plus{' '}
          </button>
        </NavLink>
      </div>
    </div>
  );
}
