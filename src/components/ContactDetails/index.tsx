import { NavLink } from 'react-router-dom';

export default function ContactDetails({ zip_code, city, adress }) {
  return (
    <div className="bloc-white">
      <h2 className="text-black">Coordonnées</h2>
      <div className="adress flex flex-col">
        <span className="mb-5"> {adress}</span>
        <span>
          <span>{`${zip_code}, ${city}`}</span>
        </span>

        <span>France</span>
      </div>
      <div className="flex flex-col my-5">
        <span>SITE WEB</span>
        <a href="https://www.youtube.com/">https://www.youtube.com/</a>
      </div>

      <NavLink className="btn-secondary block text-center" to="/">
        Envoyer un message privé
      </NavLink>
      <div className="my-1">
        <NavLink className="btn-primary block text-center" to="/">
          Proposer un deal
        </NavLink>
      </div>
    </div>
  );
}
