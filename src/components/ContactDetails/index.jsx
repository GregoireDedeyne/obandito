import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ContactDetails({
  zip_code,
  city,
  address,
  myProfile,
  myRole,
}) {
  const userId = useSelector((state) => state.decodedToken.decodedData.id);
  const { id } = useParams();

  const isMyProfil = () => (id === userId ? true : false);

  return (
    <div className="bloc-white">
      <h2 className="text-black">Coordonnées</h2>
      <div className="adress flex flex-col">
        {address ? <span> {address}</span> : ''}

        {zip_code !== null && city !== null && (
          <span>{`${zip_code}, ${city}`}</span>
        )}

        <span>France</span>
      </div>
      <div className="flex flex-col my-5">
        <span>SITE WEB</span>
        <a href="https://www.youtube.com/">https://www.youtube.com/</a>
      </div>

      <>
        {!isMyProfil() && (
          <NavLink
            className="btn-secondary block text-center"
            to={`/chat/room/${userId}/${id}`}
          >
            Envoyer un message privé
          </NavLink>
        )}
        {!myProfile && myRole === 'Organisateur' && (
          <div className="my-1">
            <NavLink className="btn-primary block text-center" to="/">
              Proposer un deal
            </NavLink>
          </div>
        )}
      </>
    </div>
  );
}
