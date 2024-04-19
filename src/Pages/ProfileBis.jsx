import { ProfilBanner } from '../components/ProfilBanner';
import { TabsContent } from '../components/TabsContent';
import { useLoaderData, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProfileBis() {
  const data = useLoaderData();

  const token = useSelector((state) => state.decodedToken.token);

  const { id } = useParams();

  const userId = useSelector((state) => state.decodedToken.decodedData.id);
  const myRole = useSelector((state) => state.decodedToken.decodedData.role);
  const myProfile = parseInt(id) === userId;

  const role = data.artist?.role?.name || data.organizer?.role?.name;

  const dataArtistOrOrganize = data?.artist || data?.organizer;
  const regions = data?.regions;
  const reviews = data?.reviews;

  return (
    <div className="w-full flex flex-col">
      <ProfilBanner
        role={role}
        dataArtistOrOrganize={dataArtistOrOrganize}
        token={token}
        regions={regions}
        myProfile={myProfile}
        myRole={myRole}
        reviews={reviews}
        userId={userId}
      />
      <TabsContent
        dataArtistOrOrganize={dataArtistOrOrganize}
        myProfile={myProfile}
        role={role}
        myRole={myRole}
        userId={userId}
        token={token}
        reviews={reviews}
        id={id}
      />
    </div>
  );
}
