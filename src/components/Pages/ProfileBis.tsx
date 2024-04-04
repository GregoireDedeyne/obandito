import { useState } from 'react';
import { ProfilBanner } from '../ProfilBanner';
import { TabsContent } from '../TabsContent';
import { useLoaderData, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/redux-hook';

export default function ProfileBis() {
  const [data, setData] = useState(useLoaderData());

  const { id } = useParams();
  const userId = useAppSelector((state) => state.decodedToken.decodedData.id);
  console.log('data : ', data.organizer);

  const role = data.artist?.role?.name || data.organizer?.role?.name;
  const info = data?.artist || data?.organizer;

  return (
    <>
      <ProfilBanner role={role} info={info} />
      <TabsContent data={info} id={id} userId={userId} role={role} />
    </>
  );
}
