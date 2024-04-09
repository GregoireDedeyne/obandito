import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/redux-hook';
import { logout } from '../../store/actions';
const navigation = [
  {
    name: 'Évenements',
    onclick: () => {
      const events = document.getElementById('events');
      if (events) {
        events.scrollIntoView({ behavior: 'smooth' });
      }
    },
    current: false,
  },
  {
    name: 'Groupes',
    onclick: () => {
      const bands = document.getElementById('bands');
      if (bands) {
        bands.scrollIntoView({ behavior: 'smooth' });
      }
    },
    current: false,
  },
  {
    name: 'À propos',
    onclick: () => {
      const propos = document.getElementById('propos');
      if (propos) {
        propos.scrollIntoView({ behavior: 'smooth' });
      }
    },
    current: false,
  },
];
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
        {genre}
      </div>
    </NavLink>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example({ genres }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const islogged = useAppSelector((state) => state.decodedToken.islogged);
  const id = useAppSelector((state) => state.decodedToken.decodedData.id);
  const role = useAppSelector((state) => state.decodedToken.decodedData.role);
  const img_irl = useAppSelector(
    (state) => state.decodedToken.decodedData.image_url
  );

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');

    navigate('/', { replace: true });
  };
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className=" mx-auto  px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-rose-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-centersm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <NavLink
                    to={'/'}
                    className="flex flex-shrink-0 items-center text-2xl font-bold leading-10 text-purple-800"
                  >
                    <span className="  text-rose-500">O'</span>
                    Bandito
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        onClick={item.onclick}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-black hover:bg-rose-500 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* icon notification */}
                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
                {islogged === false ? (
                  <div className="hidden md:flex flex-col md:flex-row justify-center items-center w-full max-w-[50%] md:w-auto">
                    <NavLink
                      to={'/subscribe'}
                      className={({ isActive }) =>
                        isActive
                          ? 'hidden'
                          : 'justify-center px-6 py-2.5 text-sm  text-center text-white whitespace-nowrap bg-rose-500 rounded-[36px] md:px-5 hover:bg-purple-800'
                      }
                    >
                      M'inscrire
                    </NavLink>
                    <NavLink
                      to={'/login'}
                      className={({ isActive }) =>
                        isActive
                          ? 'hidden'
                          : 'justify-center self-center px-5 py-2 text-sm  hover:border-b hover:border-rose-500 hover:border-solid text-slate-900'
                      }
                    >
                      Me connecter
                    </NavLink>
                  </div>
                ) : (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">
                          ouvrir le menu utilisateur
                        </span>

                        <img
                          className="h-10 w-10 rounded-full"
                          src={`${import.meta.env.VITE_BACK_URL}${img_irl}`}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to={
                                role === 'Artiste'
                                  ? `/profile/band/${id}`
                                  : `/profile/organizer/${id}`
                              }
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm  text-gray-700 '
                              )}
                            >
                              Mon Profil
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 '
                              )}
                            >
                              Se déconnecter
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  onClick={item.onclick}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-black hover:bg-rose-500 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
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
        </>
      )}
    </Disclosure>
  );
}
