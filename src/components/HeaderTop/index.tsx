import { NavLink } from 'react-router-dom';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useScrollDirection } from '../../utils/Scroll';

export function Header() {
  const scrollDirection = useScrollDirection();
  console.log(scrollDirection);

  return (
    <header
      className={`navbar fixed z-40 ${scrollDirection === 'down' ? '-translate-y-full' : 'top-0'} bg-slate-900 transition-all duration-500`}
    >
      <nav className="navbar-start">
        <NavLink
          to="/"
          className="btn btn-ghost text-xl text-white hover:bg-color-secondary hover:text-black	"
        >
          O'Bandito
        </NavLink>
      </nav>
      <div className="navbar-center hidden lg:flex text-white">
        <ul className="menu menu-horizontal px-1 ">
          <li
            className="	hover:bg-color-secondary hover:text-black rounded-lg "
            onClick={() => {
              const events = document.getElementById('events');
              if (events) {
                events.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {' '}
            <a>Evènements</a>
          </li>
          <li
            className="	hover:bg-color-secondary hover:text-black rounded-lg"
            onClick={() => {
              const bands = document.getElementById('bands');
              if (bands) {
                bands.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {' '}
            <a>Groupes</a>{' '}
          </li>
          <li
            className="	hover:bg-color-secondary hover:text-black hover:rounded-lg"
            onClick={() => {
              const propos = document.getElementById('propos');
              if (propos) {
                propos.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {' '}
            <a>à propos</a>{' '}
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <SecondaryButton href="/subscribe" text="S'incrire" />
        <SecondaryButton href="/login" text="Connexion" />
      </div>
    </header>
  );
}
