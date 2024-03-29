import { NavLink, useLoaderData, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import { GET_ARTISTE, GET_ORGANIZER } from '../../graphQL/actions';
import ReactPlayer from 'react-player';
import SpotifyPlayer from 'react-spotify-player';
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { ThirdView } from '../FirstViewsHome/ThirdView';
import { useState } from 'react';

export default function Profile() {
  const token = useSelector((state) => state.decodedToken.token);
  const role = useSelector((state) => state.decodedToken.decodedData.role);
  const { id } = useParams();
  const Id = parseInt(id);
  // console.log(token);

  // console.log(role);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  let loading, error, data;
  // console.log('id : ', id, 'role :', role);

  if (role === 'Artiste') {
    ({ loading, error, data } = useQuery(GET_ORGANIZER, {
      variables: {
        organizerId: Id,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }));
  } else if (role === 'Organisateur') {
    ({ loading, error, data } = useQuery(GET_ARTISTE, {
      variables: {
        artistId: Id,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const size = {
    width: '100%',
    height: 600,
  };

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-col py-px w-full h-[300px] bg-cover">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/001/799/226/original/live-concert-4k-free-video.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="container mx-auto">
          <div className="avatar mt-[-50px]">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>

          <div className="flex justify-between my-5">
            <div className="flex flex-col">
              <h1 className="text-black">
                {role === 'Artiste' ? data.organizer.name : data.artist.name}
              </h1>
              <span>
                {role === 'Artiste'
                  ? data.organizer.role.name
                  : data.artist.role.name}
              </span>
              <span>
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                {` ${id} évaluations`}
              </span>
              <span>
                <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
                {role === 'Artiste'
                  ? data.organizer.region
                  : data.artist.region}
                , France
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between">
                <NavLink className="btn-primary" to="/">
                  Proposer un deal
                </NavLink>
              </div>
            </div>
          </div>

          <div role="tablist" className="tabs tabs-bordered my-10">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab w-[180px] "
              aria-label="Présentation"
              checked={selectedTab === 0}
              onChange={() => handleTabClick(0)}
            />
            <div
              role="tabpanel"
              className="tab-content px-10 bg-color-gray_light"
            >
              <div className="grid grid-cols-12 md:gap-8">
                <div className="col-span-12 md:col-span-8 my-10">
                  <div>
                    <div className="bloc-white mb-[50px]">
                      <h2 className="text-black">Présentation</h2>
                      <p>
                        {role === 'Artiste'
                          ? data.organizer.description
                          : data.artist.description}
                      </p>
                    </div>

                    {role === 'Organisateur' && (
                      <div className="bloc-white mb-[50px]">
                        <h2 className="text-black">Musique & clips</h2>

                        <div className="spotify my-4">
                          <SpotifyPlayer
                            uri="https://open.spotify.com/intl-fr/album/2lGH3ryY5dbDxbPzrhO21F?si=CvJZ9x4ZRc6i_yRs56hHXQ"
                            size={size}
                          />
                        </div>

                        <div className="youtube">
                          <ReactPlayer
                            // url={
                            //   role === 'Artiste'
                            //     ? data.organizer.youtube_link
                            //     : data.artist.youtube_link
                            // }
                            url={'https://www.youtube.com/watch?v=0dmS0He_czs'}
                            width="100%"
                            height={500}
                            controls={true}
                          />
                        </div>
                      </div>
                    )}

                    <div className="bloc-white">
                      <h2 className="text-black mb-4">Gallerie photos</h2>

                      <div className="grid grid-cols-3 grid-rows-2 gap-4">
                        <div>
                          <img
                            className="object-cover w-full aspect-square"
                            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            alt="Burger"
                          />
                        </div>
                        <div className="col-start-2 row-start-2">
                          <img
                            className="object-cover w-full aspect-square"
                            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            alt="Burger"
                          />
                        </div>
                        <div className="col-start-2 row-start-1">
                          <img
                            className="object-cover w-full aspect-square"
                            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            alt="Burger"
                          />
                        </div>
                        <div className="col-start-1 row-start-2">
                          <img
                            className="object-cover w-full aspect-square"
                            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            alt="Burger"
                          />
                        </div>
                        <div className="col-start-3 row-start-1">
                          <img
                            className="object-cover w-full aspect-square"
                            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            alt="Burger"
                          />
                        </div>
                        <div className="row-start-2">
                          <img
                            className="object-cover w-full aspect-square"
                            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            alt="Burger"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 my-10">
                  <div>
                    <div className="bloc-white">
                      <h2 className="text-black">Coordonnées</h2>
                      <div className="adress flex flex-col">
                        <span className="mb-5">ADRESSE</span>
                        <span>
                          {role === 'Artiste'
                            ? `${data.organizer.zip_code}, ${data.organizer.city}`
                            : `${data.artist.zip_code}, ${data.artist.city}`}
                        </span>

                        <span>France</span>
                      </div>
                      <div className="website">
                        <a href="https://www.youtube.com/">
                          https://www.youtube.com/
                        </a>
                      </div>

                      <div className="my-5">
                        <NavLink
                          className="btn-primary block text-center"
                          to="/"
                        >
                          Proposer un deal
                        </NavLink>
                      </div>
                    </div>

                    <div className="bloc-white my-10">
                      <h2 className="text-center text-black">En savoir plus</h2>
                      <div className="flex justify-center">
                        <span className="mx-2 text-2xl">
                          <a
                            href="https://www.npmjs.com/package/react-player"
                            target="_blank"
                          >
                            <FontAwesomeIcon icon={faYoutube} />
                          </a>
                        </span>
                        <span className="mx-2 text-2xl">
                          <a
                            href="https://www.npmjs.com/package/react-player"
                            target="_blank"
                          >
                            <FontAwesomeIcon icon={faInstagram} />
                          </a>
                        </span>
                        <span className="mx-2 text-2xl">
                          <a
                            href="https://www.npmjs.com/package/react-player"
                            target="_blank"
                          >
                            <FontAwesomeIcon icon={faFacebook} />
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Evaluations"
              checked
            />
            <div
              role="tabpanel"
              className="tab-content p-10 bg-color-gray_light"
            >
              Evaluations
            </div> */}
            {/* ---------------------------------------------------------------------------------------------------------------------- */}

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab w-[180px]"
              aria-label="Evènements"
              checked={selectedTab === 1}
              onChange={() => handleTabClick(1)}
            />
            <div
              role="tabpanel"
              className="tab-content p-10 bg-color-gray_light"
            >
              Mes évènements
              {/* ----- */}
              <div className="px-6 py-4 my-2 w-full bg-white rounded-xl shadow-lg max-md:pr-5 max-md:max-w-full border-2 border-solid border-transparent hover:border-purple-800">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-[26%] max-md:ml-0 max-md:w-full">
                    <div className="flex overflow-hidden relative flex-col grow justify-center items-center rounded-xl aspect-[0.93] w-[195px] max-md:mt-10">
                      <img
                        loading="lazy"
                        alt=""
                        className="object-cover absolute inset-0 size-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-[74%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col justify-center self-stretch my-auto text-base font-medium leading-6 max-md:mt-10 max-md:max-w-full">
                      <div className="flex flex-col max-md:max-w-full">
                        <div className="flex gap-1.5 self-start mt-1.5 text-neutral-600">
                          <div>Recherche sur la région de : </div>

                          <div className="text-neutral-600">·</div>
                        </div>
                        <div className="mt-1.5 text-zinc-500 max-md:max-w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ----- */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
