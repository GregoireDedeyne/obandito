import { useState } from 'react';
import { ProfilBanner } from '../ProfilBanner';
import { TabsContent } from '../TabsContent';
import { useLoaderData, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function ProfileBis() {
  const [data, setData] = useState(useLoaderData());

  const token = useSelector((state) => state.decodedToken.token);

  const { id } = useParams();
  const userId = useSelector((state) => state.decodedToken.decodedData.id);
  const rolelogin = useSelector((state) => state.decodedToken.decodedData.role);
  const idSettings = parseInt(id) === userId;

  const role = data.artist?.role?.name || data.organizer?.role?.name;

  const info = data?.artist || data?.organizer;
  const regions = data?.regions;

  // console.log('regions : ', regions);

  return (
    <div className="w-full flex flex-col">
      <ProfilBanner
        role={role}
        info={info}
        token={token}
        regions={regions}
        idSettings={idSettings}
        rolelogin={rolelogin}
      />
      <TabsContent
        data={info}
        idSettings={idSettings}
        role={role}
        rolelogin={rolelogin}
      />
    </div>
  );
}