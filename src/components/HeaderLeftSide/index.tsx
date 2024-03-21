import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSearch,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { SecondaryButton } from '../Buttons/SecondaryButton';

export function HeaderLeftSide() {
  return (
    <div className="menu menu-lg w-56 h-auto bg-color-primary text-white">
      <h1 className="menu-title text-zinc-500 text-xl"> O'Bandito</h1>
      <nav>
        <ul>
          <li>
            <a>
              <FontAwesomeIcon icon={faHome} />{' '}
              <SecondaryButton text="Accueil" />{' '}
            </a>
          </li>
          <li>
            <a>
              <FontAwesomeIcon icon={faSearch} />{' '}
              <SecondaryButton text="Recherche" />{' '}
            </a>
          </li>
          <li>
            <a>
              <FontAwesomeIcon icon={faEnvelope} />{' '}
              <SecondaryButton text="Messagerie" />{' '}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
