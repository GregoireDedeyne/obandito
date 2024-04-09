import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/redux-hook';
import { logout } from '../../store/actions';

interface GenreItemProps {
  genre: string;
}

const GenreItem: React.FC<GenreItemProps> = ({ genre }) => {
  return (
    <NavLink to={`/genre/${genre}`}>
      <div
        className="justify-center px-2.5 py-2 hover:bg-slate-200"
        onClick={() => {
          const bands = document.getElementById('bands');
          if (bands) {
            bands.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {' '}
        {genre}{' '}
      </div>{' '}
    </NavLink>
  );
};

export function Header({ genres }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const islogged = useAppSelector((state) => state.decodedToken.islogged);
  const img_irl = useAppSelector(
    (state) => state.decodedToken.decodedData.image_url
  );
  const id = useAppSelector((state) => state.decodedToken.decodedData.id);
  const role = useAppSelector((state) => state.decodedToken.decodedData.role);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');

    navigate('/', { replace: true });
  };

  return (
    <div className="flex flex-col justify-center bg-white ">
      <header className="flex flex-col md:flex-row gap-5 justify-between self-center pt-3.5 w-full container ">
        <div className="flex gap-5  justify-between self-start px-5 flex-grow max-w-[100%] xl:max-w-[50%]  md:w-auto w-screen ">
          <NavLink to={'/'}>
            <div className="text-2xl font-semibold leading-10 text-purple-800 pt-1 ">
              <span className="text-rose-500">O'</span>Bandito
            </div>
          </NavLink>
          <div className="dropdown md:hidden flex self-end		">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to={'/subscribe'}>S'inscrire</NavLink>
              </li>
              <li>
                <NavLink to={'/login'}>Se connecter</NavLink>
              </li>
            </ul>
          </div>
          {islogged === false ? (
            <nav className="hidden md:flex gap-4 pr-20 my-auto text-sm font-medium leading-5 text-slate-900 ">
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
                  <a className="text-[10px] lg:text-sm">Evènements</a>
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
                  <a className="text-[10px] lg:text-sm">Groupes</a>{' '}
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
                  <a className="text-[10px] lg:text-sm">à propos</a>{' '}
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
        {islogged === false ? (
          <div className="hidden md:flex flex-col md:flex-row justify-center items-center w-full max-w-[50%] md:w-auto">
            <NavLink
              to={'/subscribe'}
              className={({ isActive }) =>
                isActive
                  ? 'hidden'
                  : 'justify-center px-6 py-2.5 text-center text-white whitespace-nowrap bg-rose-500 rounded-[36px] md:px-5 hover:bg-purple-800'
              }
            >
              M'inscrire
            </NavLink>
            <NavLink
              to={'/login'}
              className={({ isActive }) =>
                isActive
                  ? 'hidden'
                  : 'justify-center self-center px-5 py-2 hover:border-b hover:border-rose-500 hover:border-solid text-slate-900'
              }
            >
              Me connecter
            </NavLink>
          </div>
        ) : (
          <div className="flex justify-center">
            <NavLink
              reloadDocument
              to={
                role === 'Artiste'
                  ? `/profile/band/${id}`
                  : `/profile/organizer/${id}`
              }
              className={({ isActive }) =>
                isActive
                  ? 'hidden'
                  : 'justify-center px-6 py-2.5 self-center text-white whitespace-nowrap bg-rose-500 rounded-[36px] md:px-5 hover:bg-purple-800'
              }
            >
              Mon profil
            </NavLink>
            <button
              onClick={handleLogout}
              className="justify-center self-center px-5 py-2 hover:border-b hover:border-rose-500 hover:border-solid text-slate-900"
            >
              {' '}
              Se déconnecter{' '}
            </button>
            <div className="avatar ml-2">
              <div className="w-14 rounded-full">
                <img src={`${import.meta.env.VITE_BACK_URL}${img_irl}`} />
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="flex flex-col justify-center pt-3 w-full">
        <div className="w-full bg-purple-800 border border-purple-800 border-solid min-h-[1px]" />
      </div>

      {islogged === false ? (
        <div className="hidden xl:flex flex-row justify-center items-center w-full text-base leading-6 whitespace-nowrap bg-white border-b border-solid border-zinc-200 text-neutral-500">
          <div className="flex gap-0 justify-center w-full">
            <div className="flex gap-5 max-w-[80%]  ">
              {genres.map((genre, index) => (
                <GenreItem key={index} genre={genre.name} />
              ))}
            </div>
            <div className="shrink-0 h-[39px] w-[7px]" />
          </div>
        </div>
      ) : islogged === true && role === 'Organisateur' ? (
        ''
      ) : // <div className="hidden xl:flex flex-row justify-center items-center w-full text-base leading-6 whitespace-nowrap bg-white border-b border-solid border-zinc-200 text-neutral-500">
      //   <div className="flex gap-0 justify-center w-full">
      //     <div className="flex gap-5 max-w-[80%]  ">
      //       {genres.map((genre, index) => (
      //         <GenreItem key={index} genre={genre.name} />
      //       ))}
      //     </div>
      //     <div className="shrink-0 h-[39px] w-[7px]" />
      //   </div>
      // </div>
      islogged === true && role === 'Artiste' ? (
        ''
      ) : null}
    </div>
  );
}
