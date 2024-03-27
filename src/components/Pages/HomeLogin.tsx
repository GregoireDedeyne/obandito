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

  // const token = useSelector((state) => state.token.token);

  // console.log('role :', role);

  const { loading, error, data } = useQuery(GET_LASTARTISTS, {
    variables: { limit: 10 },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const lastArtists = data.lastArtists;
  const lastArtistsRegion = data.lastArtists.filter(
    (artist) => artist.region === region
  );

  return (
    <>
      <div>
        <div className="mt-4 mb-10">
          <div className="mx-4 mb-10">
            <h2 className="text-4xl">
              {role === 'Organisateur'
                ? 'Groupes de ma région '
                : 'Evènements de ma région'}

              {/* <p>Token: {token}</p> */}
            </h2>
            <span className="text-lg">{region}</span>
          </div>
          <CardsLogIn data={lastArtistsRegion} />
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
          <CardsLogIn data={lastArtists} />
        </div>
      </div>
    </>
  );
}
