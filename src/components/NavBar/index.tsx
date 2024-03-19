import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export function NavBar () {
  return <div className="menu menu-lg w-56 h-4/5 bg-color-primary text-white"> 

  <h1 className="menu-title text-zinc-500"> O'Bandito</h1>

  {/* intégrer la LI de button */}
<li><a><FontAwesomeIcon icon={faHome} /></a></li>
  <li><a><FontAwesomeIcon icon={faSearch} /></a></li>
  <li><a><FontAwesomeIcon icon={faEnvelope} /></a></li>
  </div>
}