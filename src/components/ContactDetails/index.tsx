import { NavLink } from 'react-router-dom';

interface ContactDetailsProps {
  zip_code: string;
  city: string;
  address: string;
  role: string;
  idSettings: boolean;
  rolelogin: string;
}

export default function ContactDetails({
  zip_code,
  city,
  address,
  idSettings,
  rolelogin,
}: ContactDetailsProps) {
  // console.log('zip_code', zip_code);
  // console.log('city', city);

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

      {!idSettings && rolelogin === 'Organisateur' && (
        <>
          <NavLink className="btn-secondary block text-center" to="/chat">
            Envoyer un message privé
          </NavLink>
          <div className="my-1">
            <NavLink className="btn-primary block text-center" to="/">
              Proposer un deal
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
}
