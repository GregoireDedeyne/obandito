import { NavLink, useLoaderData, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';
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
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const data = useLoaderData();

  // console.log('useload data : ', data);

  const role = data.artist?.role?.name || data.organizer?.role?.name;

  console.log('data.organizer?.events ', data.organizer?.events);
  console.log(
    'data?.organizer?.events.region ',
    data?.organizer?.events.region
  );

  // console.log('role: ', role);

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
                {role === 'Artiste' ? data?.artist.name : data?.organizer.name}
              </h1>
              <span>
                {role === 'Artiste'
                  ? data?.artist.role.name
                  : data?.organizer.role.name}
              </span>
              <span>
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                {/* {` ${id} évaluations`} */}
              </span>
              <span>
                <FontAwesomeIcon icon={faMapMarkerAlt} />{' '}
                {role === 'Artiste'
                  ? data?.artist.region
                  : data?.organizer.region}
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
                          ? data.artist.description
                          : data.organizer.description}
                      </p>
                    </div>

                    {role === 'Artiste' && (
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
                            ? `${data.artist.zip_code}, ${data.artist.city}`
                            : `${data.organizer.zip_code}, ${data.organizer.city}`}
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

            {data?.organizer?.events?.length > 0 ||
            data?.artist?.events?.length > 0 ? (
              <>
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
                  <ThirdView
                    events={data?.organizer?.events || data?.artist?.events}
                    locations={data?.organizer?.events || data?.artist?.events}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
