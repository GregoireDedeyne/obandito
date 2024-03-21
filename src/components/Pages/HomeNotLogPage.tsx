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
      <div className="h-lvh bg-fond-one bg-cover">
        <h1 className="text-white text-7xl mt-48"> FIND THE ONE BE THE ONE</h1>
      </div>
      <div
        className="h-lvh bg-fond-two bg-cover flex justify-items-center items-center"
        id="events"
      >
        <InfoHomeCard
          title={'Nos derniers évènements'}
          description={
            "Plongez dans un univers où la créativité et le talent s'épanouissent à chaque coin de rue. Pour les organisateurs d'événements, notre plateforme offre une vitrine exceptionnelle pour promouvoir vos projets et attirer un public passionné et engagé. Créez des expériences inoubliables et connectez-vous avec des artistes talentueux prêts à faire vibrer vos événements. Rejoignez-nous dès aujourd'hui et faites partie d'une communauté dynamique qui célèbre la diversité et l'innovation artistique à chaque instant !"
          }
        />
        <Cards data={events} />{' '}
      </div>
      <div
        className="h-lvh bg-fond-three bg-cover flex justify-items-center items-center		"
        id="bands"
      >
        <Cards data={bands} />{' '}
        <InfoHomeCard
          title={'Nos derniers groupes'}
          description={
            "Explorez notre sélection de groupes talentueux et découvrez un monde de diversité musicale. Que vous soyez amateur de rock, de pop, de jazz, de hip-hop ou de musique électronique, notre plateforme offre une variété d'artistes prêts à vous enchanter avec leur son unique et leur énergie contagieuse. Rencontrez des musiciens passionnés qui repoussent les frontières de la créativité et qui vous invitent à vivre des expériences musicales inoubliables. Assistez à des concerts intimes, découvrez des performances envoûtantes et plongez au cœur d'une scène musicale bouillonnante d'innovation et de talent."
          }
        />
      </div>
      <div className="bg-color-primary text-white h-48 text-7xl" id="propos">
        {' '}
        <p className="text-center">
          {' '}
          Tout à pu être possible grâce à VOUS en 2023
        </p>
      </div>
      <ImagesLayout />
    </>
  );
}
