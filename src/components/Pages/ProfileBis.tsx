import { useState } from 'react';
import { ProfilBanner } from '../ProfilBanner';
import { TabsContent } from '../TabsContent';
import { useLoaderData } from 'react-router-dom';

export default function ProfileBis() {
  const [data, setData] = useState(useLoaderData());

  //   console.log('data : ', data);

  const role = data.artist?.role?.name || data.organizer?.role?.name;

  return (
    <>
      <ProfilBanner role={role} />
      <TabsContent />
    </>
  );
}
