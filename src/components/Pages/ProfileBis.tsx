import { useLoaderData, useParams } from 'react-router-dom';
import { ProfilBanner } from '../ProfilBanner';
import { TabsContent } from '../TabsContent';
import { useQuery } from '@apollo/client';
import { GET_ORGAEVENT } from '../../graphQL/actions';
import { useAppSelector } from '../../store/redux-hook';

export default function ProfileBis() {
  // const data = useLoaderData();

  // console.log(data);

  const token = useAppSelector((state) => state.decodedToken.token);

  const { id } = useParams();
  console.log(id);

  const { loading, error, data } = useQuery(GET_ORGAEVENT, {
    variables: { organizerId: parseInt(id) },
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: 'network-only',
  });

  console.log(data);

  return (
    <div>
      <ProfilBanner />
      <TabsContent />
    </div>
  );
}
