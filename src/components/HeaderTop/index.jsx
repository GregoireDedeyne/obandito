import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../store/actions';
import { handleImg } from '../../utils/handleImg';
import { useSelector, useDispatch } from 'react-redux';

function classNames(...classes) {
  return classes.filter().join(' ');
}

const GenreItem = ({ genre }) => {
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

export function Header({ genres }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const islogged = useSelector((state) => state.decodedToken.islogged);
  const { id, image_url, name, role, mail } = useSelector(
    (state) => state.decodedToken.decodedData
  );

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');

    navigate('/', { replace: true });
  };
  return (
    <>
      <Disclosure as="nav" className="bg-white shadow">
        {({ open, close }) => (
          <>
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
              <div className="flex  items-center h-16 justify-between">
                <div className="flex items-baseline">
                  <div className="flex flex-shrink-0 items-center">
                    <NavLink
                      to={'/'}
                      className="flex flex-shrink-0 items-center text-2xl font-bold leading-10 text-purple-800"
                    >
                      <span className="  text-rose-500">O'</span>
                      Bandito
                    </NavLink>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <NavLink
                      to={'/#events'}
                      className="inline-flex items-center h-fit hover:bg-rose-500 rounded-md p-3 py-2 text-sm font-medium cursor-pointer hover:text-white text-gray-900"
                    >
                      Évenements
                    </NavLink>
                    <NavLink
                      to={'/#bands'}
                      className="inline-flex items-center h-fit hover:bg-rose-500 rounded-md px-3 py-2 text-sm font-medium cursor-pointer hover:text-white text-gray-900"
                    >
                      Groupes
                    </NavLink>
                    <NavLink
                      to={'/#propos'}
                      className="inline-flex items-center h-fit hover:bg-rose-500 rounded-md p-3 py-2 text-sm font-medium cursor-pointer hover:text-white text-gray-900"
                    >
                      À propos
                    </NavLink>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {/* Profile dropdown */}
                  {islogged === true ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-10 w-10 rounded-full"
                            src={handleImg(image_url)}
                            alt="image profil"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
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
                                reloadDocument
                                to={
                                  role === 'Artiste'
                                    ? `/profile/band/${id}`
                                    : `/profile/organizer/${id}`
                                }
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-black'
                                )}
                              >
                                Mon Profil
                              </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={handleLogout}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-black cursor-pointer'
                                )}
                              >
                                Déconnexion
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <>
                      <NavLink
                        to={'/subscribe'}
                        className={
                          'justify-center px-6 py-2.5 text-sm  text-center text-white whitespace-nowrap bg-rose-500 rounded-[36px] md:px-5 hover:bg-purple-800'
                        }
                      >
                        M'inscrire
                      </NavLink>
                      <Disclosure.Button>
                        <NavLink
                          className="justify-center self-center px-5 py-2 text-sm hover:text-rose-500 text-slate-900"
                          to={'/login'}
                        >
                          Connexion
                        </NavLink>
                      </Disclosure.Button>
                    </>
                  )}
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2 text-black">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button
                  onClick={() => {
                    const events = document.getElementById('events');
                    if (events) {
                      events.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className=" border-l-4 w-full flex hover:border-l-rose-500 hover:rose-indigo-500 hover:bg-rose-50 py-2 pl-3 pr-4 text-base font-medium hover:text-rose-700"
                >
                  Évenements
                </Disclosure.Button>
                <Disclosure.Button
                  onClick={() => {
                    const bands = document.getElementById('bands');
                    if (bands) {
                      bands.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className=" border-l-4 w-full flex hover:border-l-rose-500 hover:rose-indigo-500 hover:bg-rose-50 py-2 pl-3 pr-4 text-base font-medium hover:text-rose-700"
                >
                  Groupes
                </Disclosure.Button>
                <Disclosure.Button
                  onClick={() => {
                    const propos = document.getElementById('propos');
                    if (propos) {
                      propos.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className=" border-l-4 w-full flex hover:border-l-rose-500 hover:rose-indigo-500 hover:bg-rose-50 py-2 pl-3 pr-4 text-base font-medium hover:text-rose-700"
                >
                  À propos
                </Disclosure.Button>
                {islogged === false && (
                  <>
                    <NavLink
                      to="/subscribe"
                      className="block border-l-4 hover:border-l-rose-500 hover:bg-rose-50 py-2 pl-3 pr-4 text-base font-medium hover:text-rose-700"
                      onClick={() => close()}
                    >
                      Inscription
                    </NavLink>
                    <NavLink
                      to="/login"
                      className="block border-l-4 hover:border-l-rose-500 hover:bg-rose-50 py-2 pl-3 pr-4 text-base font-medium hover:text-rose-700"
                      onClick={() => close()}
                    >
                      Connexion
                    </NavLink>
                  </>
                )}
              </div>
              {islogged === true && (
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={handleImg(image_url)}
                        alt="image profil"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {mail}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <NavLink
                      reloadDocument
                      to={
                        role === 'Artiste'
                          ? `/profile/band/${id}`
                          : `/profile/organizer/${id}`
                      }
                    >
                      <Disclosure.Button className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                        Mon Profil
                      </Disclosure.Button>
                    </NavLink>
                    <Disclosure.Button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
                    >
                      Déconnexion
                    </Disclosure.Button>
                  </div>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className="w-full h-[1px] bg-purple-500"></div>
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
      ) : islogged === true && role === 'Artiste' ? (
        ''
      ) : null}
    </>
  );
}
