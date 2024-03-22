import { useEffect } from 'react';
import { getBands, getEvents } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store/redux-hook';
import { Cards } from '../CardsLogOut';
import ImagesLayout from '../ImagesLayout';
import { InfoHomeCard } from '../InfoHomeCard/InfoHomeCard';

export function HomeNotLogPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatchez l'action getEvents sans données supplémentaires
    dispatch(getEvents());
    dispatch(getBands());
  }, [dispatch]);
  const events = useAppSelector((state) => state.events.events);
  const bands = useAppSelector((state) => state.bands.bands);

  console.log(bands);

  return (
    <>
      <div className="bg-fond-one bg-cover">
        <div className="h-lvh   container mx-auto">
          <h1 className="text-white text-7xl mt-48">
            {' '}
            FIND THE ONE BE THE ONE
          </h1>
        </div>
      </div>
      <div className="bg-fond-two bg-cover">
        <div
          className="h-lvh flex justify-items-center items-center container mx-auto"
          id="events"
        >
          <InfoHomeCard
            title={'Nos derniers évènements'}
            description={
              "Plongez dans un univers où la créativité et le talent s'épanouissent à chaque coin de rue. Pour les organisateurs d'événements, notre plateforme offre une vitrine "
            }
          />
          <Cards data={events} />{' '}
        </div>
      </div>
      <div className="bg-fond-three bg-cover">
        <div
          className="h-lvh  flex justify-items-center items-center container mx-auto	"
          id="bands"
        >
          <Cards data={bands} />{' '}
          <InfoHomeCard
            title={'Nos derniers groupes'}
            description={
              'Explorez notre sélection de groupes talentueux et découvrez un monde de diversité musicale. Que vous soyez amateur de rock, de pop, de jazz, de hip-hop ou '
            }
          />
        </div>
      </div>
      <div className="bg-slate-900">
        <div
          className=" text-white h-48 text-7xl container mx-auto"
          id="propos"
        >
          {' '}
          <p className="text-center">
            {' '}
            Tout à pu être possible grâce à VOUS en 2023
          </p>
        </div>
      </div>
      <ImagesLayout />
    </>
  );
}
