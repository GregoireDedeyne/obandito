import { useParams } from 'react-router-dom';
import CardsLogIn from '../CardsLogIn';
import { useQuery } from '@apollo/client';
import { GET_ORGANIZER } from '../../graphQL/actions';

export function HomeLogin() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ORGANIZER, {
    variables: { organizerId: parseInt(id) },
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const organizer = data?.organizer;

  return (
    <>
      <div className="mt-4 mb-10">
        <div className="mx-4 mb-10">
          <h2 className="text-4xl">Évènement de ma région {id}</h2>
          <span className="text-lg">{organizer.name}</span>
        </div>
        <CardsLogIn />
      </div>

      <div className="mt-4 mb-10">
        <div className="mx-4 mb-10">
          <h2>{organizer.mail}</h2>
          <h2 className="text-4xl">Les derniers évènements ajoutés</h2>
          <span className="text-lg">France</span>
        </div>
        <CardsLogIn />
      </div>
    </>
  );
}
