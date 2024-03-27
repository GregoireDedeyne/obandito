import { useSelector } from 'react-redux';
import CardsLogIn from '../CardsLogIn';
import { useQuery } from '@apollo/client';
import { GET_LASTARTISTS, GET_EVENTS } from '../../graphQL/actions';
import { Cards } from '../CardsLogOut';
import { NavLink } from 'react-router-dom';

export function HomeLogin() {
  const role = useSelector(
    (state) => state.decodedToken.decodedData.payload.user.role
  );
  const region = useSelector(
    (state) => state.decodedToken.decodedData.payload.user.region
  );

  const token = useSelector((state) => state.decodedToken.token);

  const {
    loading: artistsLoading,
    error: artistsError,
    data: artistsData,
  } = useQuery(GET_LASTARTISTS, {
    variables: { limit: 10 },
  });

  const {
    loading: eventsLoading,
    error: eventsError,
    data: eventsData,
  } = useQuery(GET_EVENTS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  if (artistsLoading || eventsLoading) return <div>Loading...</div>;
  if (artistsError || eventsError)
    return (
      <div>
        Error: {artistsError ? artistsError.message : eventsError.message}
      </div>
    );

  const lastArtists = artistsData.lastArtists;
  const lastArtistsRegion = artistsData.lastArtists.filter(
    (artist) => artist.region === region
  );

  const lastEvents = eventsData.events;
  const lastEventsRegion = lastEvents.filter(
    (event) => event.region === region
  );

  // console.log('lastEvents:', lastEvents);
  // console.log('lastEventsRegion:', lastEventsRegion);

  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="my-10">
          <div className="mx-4 mb-10">
            <h2 className="text-4xl">
              {role === 'Organisateur'
                ? 'Groupes de ma région'
                : 'Evènements de ma région'}
            </h2>
            <span className="text-lg">{region}</span>
          </div>

          <div className="flex gap-5 justify-start px-5 w-full max-md:max-w-full my-8 lg:ml-20 sm:ml-0">
            <h2 className="text-xl font-semibold leading-6 text-neutral-700">
              {role === 'Organisateur'
                ? 'Groupes de ma région'
                : 'Evènements de ma région'}
            </h2>
          </div>

          <Cards
            data={
              role === 'Organisateur' ? lastArtistsRegion : lastEventsRegion
            }
          />
        </div>

        <div className="my-10">
          <div className="mx-4 mb-10">
            <h2 className="text-4xl">
              {role === 'Organisateur'
                ? 'Les derniers Artistes ajoutés '
                : 'Les derniers évènements de ma région'}
            </h2>
            <span className="text-lg">France</span>
          </div>
          <Cards data={role === 'Organisateur' ? lastArtists : lastEvents} />
        </div>
      </div>

      <NavLink className="btn-primary" to="/profile:id">
        Mon profil
      </NavLink>
    </div>
  );
}
