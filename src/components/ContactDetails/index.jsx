import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ContactDetails component displays the contact details including zip code, city, address, etc.
 * @param {string} zip_code - The zip code of the contact.
 * @param {string} city - The city of the contact.
 * @param {string} address - The address of the contact.
 * @param {boolean} idSettings - Check if we are in our page or not.
 * @param {string} rolelogin - The role login of the contact.
 * @returns {JSX.Element} ContactDetails component.
 */

export default function ContactDetails({
  zip_code,
  city,
  address,
  myProfile,
  myRole,
}) {
  // userID from redux token
  const userId = useSelector((state) => state.decodedToken.decodedData.id);
  // id from URL
  const { id } = useParams();
  // id from URL
  const idSetting = useParams();
  // function to check if we are in user page
  const isMyProfil = () => (idSetting.id == userId ? true : false);

  return (
    <div className="bloc-white">
      <h2>Coordonnées</h2>
      <div className="adress flex flex-col mb-5">
        {address ? <span> {address}</span> : ''}

        {zip_code !== null && city !== null ? (
          <span>{`${zip_code}, ${city}`}</span>
        ) : (
          <span>
            L'utilisateur n'a pas fourni plus d'informations sur son adresse.
          </span>
        )}

        <span>France</span>
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
