import { NavLink } from 'react-router-dom';
import bandPict from '../../assets/images/bandPict.jpg';
import { useSelector } from 'react-redux';
import { useState } from 'react';

/**
 * Image component displays an image with the specified source and alternative text.
 * @param {string} src - The URL of the image.
 * @param {string} alt - The alternative text for the image.
 * @param {string} className - Additional CSS classes to apply to the image.
 * @returns {JSX.Element} Image component.
 */

const Image = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={className} />
);

/**
 * Text component renders text content with optional additional CSS classes.
 * @param {React.ReactNode} children - The text content to render.
 * @param {string} className - Additional CSS classes to apply to the text.
 * @returns {JSX.Element} Text component.
 */

const Text = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export function FirstViewHome() {
  // check if user islogged or not
  const islogged = useSelector((state) => state.decodedToken.islogged);
  // check role of user
  const role = useSelector((state) => state.decodedToken.decodedData.role);
  // state to stock searchTerm
  const [searchTerm, setSearchTerm] = useState('');
  // submit of research
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  // handlechange of search value and setSearchTerm
  const handleSearch = () => {
    setSearchTerm('');
  };
  return (
    <div className="flex flex-col py-px max-md:max-w-full bg-cover container mx-auto">
      <header className="flex overflow-hidden relative flex-col justify-end pt-16 pb-5 w-full min-h-[575px] max-md:px-5 max-md:max-w-full">
        <div className="relative pb-8 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex relative flex-col justify-center grow mt-16 text-5xl font-medium max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                <Text className="mr-5 leading-[55px] text-zinc-800 max-md:mr-2.5 max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
                  Artistes et Organisations étaient faits pour se
                </Text>
                <Text className="justify-center self-start px-8 pb-2 mt-4  bg-rose-500 leading-[100%] rounded-[50px] text-neutral-100 max-md:px-5 max-md:text-4xl">
                  rencontrer
                </Text>
                <Text className="mt-14 text-xl leading-6 text-neutral-600 max-md:mt-10 max-md:max-w-full">
                  Trouvez le talent parfait pour animer votre événement OU
                  trouvez l'événement parfait à animer !
                </Text>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <Image
                src={bandPict}
                alt="Featured image"
                className="w-full aspect-[1.61] max-md:mt-10 max-md:max-w-full rounded-xl"
              />
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="relative px-10 py-8 mt-1.5 bg-white shadow-lg rounded-[66px] max-md:px-5 max-md:max-w-full"
        >
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex w-[55%] flex-col lg:flex-row max-md:ml-0 max-md:w-full">
              <div className="flex relative grow gap-5 justify-center max-md:flex-wrap max-md:mt-10 items-center	">
                <label className="input input-bordered flex items-center gap-2 w-3/5 bg-white ">
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    type="text"
                    className="grow w-full"
                    placeholder="Search"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
              {islogged === true ? (
                <p className="flex self-center">
                  {' '}
                  <NavLink to="/">Enlever tous les filtres </NavLink>
                </p>
              ) : null}
            </div>

            <div className="flex relative grow gap-5  text-base text-center max-md:flex-wrap max-md:mt-10 justify-center md:justify-end 	">
              {islogged === false ? (
                <NavLink
                  to={'/login'}
                  className={`justify-center px-9 py-5 text-white bg-rose-500 border border-rose-500 border-solid leading-[100%] rounded-[48px] max-md:px-5 hover:bg-purple-800 hover:border-purple-800`}
                >
                  {' '}
                  Trouver un artiste{' '}
                </NavLink>
              ) : islogged === true && role === 'Organisateur' ? (
                <NavLink to={`/artists/search/${searchTerm}`}>
                  <button
                    onClick={handleSearch}
                    className={`justify-center px-9 py-5 text-white bg-rose-500 border border-rose-500 border-solid leading-[100%] rounded-[48px] max-md:px-5 hover:bg-purple-800 hover:border-purple-800`}
                  >
                    {' '}
                    Trouver un artiste{' '}
                  </button>
                </NavLink>
              ) : islogged === true && role === 'Artiste' ? (
                <NavLink to={`/events/search/${searchTerm}`}>
                  <button
                    onClick={handleSearch}
                    className={`justify-center px-9 py-5 text-white bg-rose-500 border border-rose-500 border-solid leading-[100%] rounded-[48px] max-md:px-5 hover:bg-purple-800 hover:border-purple-800`}
                  >
                    {' '}
                    Trouver un évènement{' '}
                  </button>
                </NavLink>
              ) : null}

              <div className="flex gap-5 justify-end self-start mt-2">
                {islogged === false ? (
                  <Text className="my-auto text-neutral-600">ou</Text>
                ) : islogged === true && role === 'Organisateur' ? (
                  <Text className="my-auto text-neutral-600">ou</Text>
                ) : null}
                {islogged === false ? (
                  <NavLink
                    to={'/login'}
                    className="justify-center px-2.5 py-1.5 mt-1 font-bold text-purple-800 border-b-2 border-transparent hover:border-b-2 hover:border-purple-800 border-solid leading-[128%] hover:text-rose-500"
                  >
                    Déposer un événement
                  </NavLink>
                ) : islogged === true && role === 'Organisateur' ? (
                  <NavLink
                    to={'/eventcreation'}
                    className="justify-center px-2.5 py-1.5 mt-1 font-bold text-purple-800 border-b-2 border-transparent hover:border-b-2 hover:border-purple-800 border-solid leading-[128%] hover:text-rose-500"
                  >
                    Déposer un événement
                  </NavLink>
                ) : null}
              </div>
            </div>
          </div>
        </form>
      </header>
      {islogged === false ? (
        <div className="flex flex-col justify-center self-center mt-2.5 w-full text-sm leading-4 max-w-[907px] text-neutral-600 max-md:max-w-full">
          <div className="flex gap-5 items-start lg:flex-wrap max-md:pr-5 justify-between flex-col lg:flex-row">
            <div className="flex gap-2.5">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a4f37c2a9e085339d02ca046a7f86d54d057df98cc29708f04988183fad247d?apiKey=877605d91b494696bd5bbaa7fb33442f&"
                alt="Checkmark icon"
                className="shrink-0 w-7 aspect-square bg-white"
              />
              <Text className="my-auto">Simple et rapide</Text>
            </div>
            <div className="flex gap-2.5">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1416f10bfee9a7924460fde0c17a264179eae92a1dea82c5118da423fc18edeb?apiKey=877605d91b494696bd5bbaa7fb33442f&"
                alt="Handshake icon"
                className="shrink-0 w-7 aspect-square bg-white"
              />
              <Text className="my-auto">
                Une relation entre artistes et organisations
              </Text>
            </div>
            <div className="flex gap-2.5">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1416f10bfee9a7924460fde0c17a264179eae92a1dea82c5118da423fc18edeb?apiKey=877605d91b494696bd5bbaa7fb33442f&"
                alt="Handshake icon"
                className="shrink-0 w-7 aspect-square bg-white"
              />
              <Text className="my-auto">
                Déjà pleins d'évènements crées grâce à{' '}
                <span className="text-rose-500">O </span>'bandito
              </Text>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
