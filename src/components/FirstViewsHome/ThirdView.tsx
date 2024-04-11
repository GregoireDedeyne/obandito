import { NavLink } from 'react-router-dom';
import { CallToAction } from '../InfoHomeCard/CallToAction';
import { EventCard } from '../InfoHomeCard/EventsCards';
import { Localisation } from '../InfoHomeCard/Localisation';
import { useAppSelector } from '../../store/redux-hook';
import { useState } from 'react';

interface Organizer {
  name: string;
}

interface Event {
  city: string;
  description: string;
  image_url: string;
  id: string;
  name: string;
  region: string;
  price: number;
  date: string;
  available: boolean;
  organizer: Organizer;
}

interface Location {
  event_count: number;
  region: string;
}

interface ThirdViewProps {
  events: Event[];
  locations: Location[];
}

export function ThirdView({ events, locations }: ThirdViewProps) {
  const islogged: boolean = useAppSelector(
    (state) => state.decodedToken.islogged
  );
  // console.log('events', events);
  // console.log('locations', locations);

  const [limitEvents, setLimitEvents] = useState(10);

  const incrementLimitEvents = () => {
    setLimitEvents((prevLimit) => prevLimit + 5);
    window.scrollBy(0, -window.innerHeight);
  };

  return (
    <div className="flex justify-center lg:justify-between" id="events">
      <Localisation locations={locations} />
      <div className="flex flex-col  max-w-[825px] items-center xl:ml-48 lg:mt-0 lg:mr-[15rem]">
        <h2 className="w-full text-xl font-semibold leading-6 text-neutral-700 max-md:max-w-full">
          Les événements à venir
        </h2>
        <div className="flex flex-col mt-7 w-full max-w-[825px] ">
          {events.length === 0 ? (
            <p className="w-[40rem] pr-10">Aucun événement trouvé.</p>
          ) : (
            events.map((event, index) => <EventCard key={index} {...event} />)
          )}
        </div>
        {islogged === false && events.length === 0 ? <CallToAction /> : null}

        {islogged === false ? (
          <NavLink to={`/home/${limitEvents}`}>
            <button
              onClick={incrementLimitEvents}
              className="justify-center items-center	 w-fit px-16 py-4 mt-3 font-medium text-white bg-rose-500 leading-[175%] rounded-[800px] max-md:px-5 hover:bg-purple-800"
            >
              Voir plus{' '}
            </button>
          </NavLink>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
