import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSearch,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { SecondaryButton } from '../Buttons/SecondaryButton';

export function HeaderLeftSide() {
  return (
    <div className="menu menu-lg w-56 h-auto bg-slate-900 text-white">
      <h1 className="menu-title text-zinc-500 text-xl"> O'Bandito</h1>
      <nav>
        <ul>
          <li>
            <div>
              <FontAwesomeIcon icon={faHome} />{' '}
              <SecondaryButton href="/home" text="Accueil" />{' '}
            </div>
          </li>
          <li>
            <div>
              <FontAwesomeIcon icon={faSearch} />{' '}
              <SecondaryButton href="/search" text="Recherche" />{' '}
            </div>
          </li>
          <li>
            <div>
              <FontAwesomeIcon icon={faEnvelope} />{' '}
              <SecondaryButton href="" text="Messagerie" />{' '}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
