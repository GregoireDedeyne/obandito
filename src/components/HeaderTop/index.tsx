import { SecondaryButton } from '../Buttons/SecondaryButton';

export function Header() {
  return (
    <header className="navbar bg-color-primary">
      <nav className="navbar-start">
        <a
          href="/"
          className="btn btn-ghost text-xl text-white hover:bg-color-secondary hover:text-black	"
        >
          O'Bandito
        </a>
      </nav>
      <div className="navbar-center hidden lg:flex text-white">
        <ul className="menu menu-horizontal px-1 ">
          <li className="	hover:bg-color-secondary hover:text-black rounded-lg ">
            {' '}
            <a>Evènements</a>
          </li>
          <li className="	hover:bg-color-secondary hover:text-black rounded-lg">
            {' '}
            <a>Groupes</a>{' '}
          </li>
          <li className="	hover:bg-color-secondary hover:text-black hover:rounded-lg">
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
