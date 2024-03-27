import { useSelector } from 'react-redux';
import CardsLogIn from '../CardsLogIn';
import { useQuery } from '@apollo/client';
import { GET_LASTARTISTS, GET_EVENTS } from '../../graphQL/actions';

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
    <>
      <div>
        <div className="mt-4 mb-10">
          <div className="mx-4 mb-10">
            <h2 className="text-4xl">
              {role === 'Organisateur'
                ? 'Groupes de ma région'
                : 'Evènements de ma région'}
            </h2>
            <span className="text-lg">{region}</span>
          </div>
          <CardsLogIn
            data={
              role === 'Organisateur' ? lastArtistsRegion : lastEventsRegion
            }
          />
        </div>

        <div className="mt-4 mb-10">
          <div className="mx-4 mb-10">
            <h2 className="text-4xl">
              {role === 'Organisateur'
                ? 'Les derniers Artistes ajoutés '
                : 'Les derniers évènements de ma région'}
            </h2>
            <span className="text-lg">France</span>
          </div>
          <CardsLogIn
            data={role === 'Organisateur' ? lastArtists : lastEvents}
          />
        </div>
      </div>
    </>
  );
}
