import { NavLink } from 'react-router-dom';
import { useScrollDirection } from '../../utils/Scroll';

interface GenreItemProps {
  genre: string;
}

const GenreItem: React.FC<GenreItemProps> = ({ genre }) => {
  return (
    <NavLink to={'/'}>
      <div className="justify-center px-2.5 py-2 hover:bg-slate-200">
        {' '}
        {genre}{' '}
      </div>{' '}
    </NavLink>
  );
};

const genres = [
  'Hip-hop',
  'Rock',
  'Électro',
  'Classique',
  'Jazz',
  'Pop',
  'Hip-hop',
  'Techno',
  'Électro',
  'Jazz',
  'Électro',
  'Jazz',
  'Métal',
  'Hip-hop',
  'Jazz',
];

export function Header() {
  const scrollDirection = useScrollDirection();
  console.log(scrollDirection);

  return (
    <div className="flex flex-col justify-center bg-white">
      <header className="flex flex-col md:flex-row gap-5 justify-between self-center pt-3.5 w-full max-w-[1216px]">
        <div className="flex gap-5 justify-between self-start px-5 flex-grow max-w-[50%] md:w-auto">
          <NavLink to={'/'}>
            <div className="text-2xl font-semibold leading-10 text-purple-800">
              <span className="text-rose-500">O'</span>Bandito
            </div>
          </NavLink>
          <nav className="hidden md:flex gap-4 pr-20 my-auto text-sm font-medium leading-5 text-slate-900">
            <ul className="menu menu-horizontal px-1 ">
              <li
                className="hover:bg-rose-500 hover:text-white rounded-lg "
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
                className="hover:bg-rose-500 hover:text-white rounded-lg"
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
                className="hover:bg-rose-500 hover:text-white hover:rounded-lg"
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
          </nav>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-[50%] md:w-auto">
          <NavLink
            to={'/subscribe'}
            className="justify-center px-6 py-2.5 text-center text-white whitespace-nowrap bg-rose-500 rounded-[36px] md:px-5 hover:bg-purple-800"
          >
            M'inscrire
          </NavLink>
          <NavLink
            to={'/login'}
            className="justify-center self-center px-5 py-2 hover:border-b hover:border-rose-500 hover:border-solid text-slate-900"
          >
            Me connecter
          </NavLink>
        </div>
      </header>
      <div className="flex flex-col justify-center pt-3 w-full">
        <div className="w-full bg-purple-800 border border-purple-800 border-solid min-h-[1px]" />
      </div>
      <div className="hidden xl:flex flex-col justify-center items-center w-full text-base leading-6 whitespace-nowrap bg-white border-b border-solid border-zinc-200 text-neutral-500">
        <div className="flex gap-0 justify-end w-full">
          <div className="flex flex-auto gap-5 max-w-[80%]  ">
            {genres.map((genre, index) => (
              <GenreItem key={index} genre={genre} />
            ))}
          </div>
          <div className="shrink-0 h-[39px] w-[7px]" />
        </div>
      </div>
    </div>
  );
}
