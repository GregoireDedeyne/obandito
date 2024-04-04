import { NavLink, useLoaderData, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faStar,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import SpotifyPlayer from 'react-spotify-player';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/redux-hook';
import {
  GET_ORGANIZER,
  HANDLEPOSTULATIONEVENT,
  UPDATE_USER,
} from '../../graphQL/actions';
import { useMutation } from '@apollo/client';

import { EventCard } from '../InfoHomeCard/EventsCards';
import SocialMedia from '../SocialMedia';

import logo_facebook from '../../assets/images/logo_facebook.png';
import logo_indeed from '../../assets/images/logo_indeed.png';
import logo_twitter from '../../assets/images/logo_twitter.png';
import logo_youtube from '../../assets/images/logo_youtube.png';
import logo_instagram from '../../assets/images/logo_instagram.png';
import ContactDetails from '../ContactDetails';
import PopupEditDeals from '../PopupEditDeals';
import { PopupEditSettings } from '../PopupEditSettings';

interface FormData {
  name: string;
  region: string;
  description: string;
  zip_code: number;
  city: string;
  spotify_link: string;
  youtube_link: string;
  // image_url: string;
}

export default function Profile() {
  const [UpdateUser, { loading: updateUserLoading, error: updateUserError }] =
    useMutation(UPDATE_USER);

  const [
    HandlePostulationEvent,
    { loading: handlePostulationLoading, error: handlePostulationError },
  ] = useMutation(HANDLEPOSTULATIONEVENT);

  const [selectedTab, setSelectedTab] = useState(0);
  const [settings, setSettings] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [idUserStatus, setIdUserStatus] = useState();
  const [idEventStatus, setIdEventStatus] = useState();
  const [radioStatus, setRadioStatus] = useState('tous');
  const [data, setData] = useState(useLoaderData());

  const handleStatusChange = (status) => {
    setRadioStatus(status);
  };

  // console.log('selectedStatus :', selectedStatus);
  // console.log('setSelectedStatus :', setSelectedStatus);
  // console.log('idUserStatus :', idUserStatus);
  // console.log('setIdUserStatus :', setIdUserStatus);
  // console.log('idEventStatus :', idEventStatus);

  const token = useAppSelector((state) => state.decodedToken.token);

  const idredux = useAppSelector((state) => state.decodedToken.decodedData.id);
  const { id: urlId } = useParams();
  const settingsId = idredux == urlId;

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  // const dataLoad = useLoaderData();

  console.log(data);

  const role = data.artist?.role?.name || data.organizer?.role?.name;
  const { name, region, description, zip_code, city, image_url } =
    role === 'Artiste' ? data?.artist : data?.organizer;
  const events = data?.organizer?.events || data?.artist?.events;

  // console.log('data.organizer.events', data.organizer.events);

  const [formData, setFormData] = useState<FormData>({
    name,
    region,
    description,
    zip_code,
    city,
    spotify_link: '',
    youtube_link: '',
  });

  // console.log('formData :', formData);
  // console.log('data :', data);

  // console.log('data spotify_link :', data.artist.spotify_link);

  const handleFormSubmitStatus = async (e) => {
    e.preventDefault();

    try {
      const { data } = await HandlePostulationEvent({
        variables: {
          artistId: idUserStatus,
          validation: selectedStatus,
          eventId: idEventStatus,
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      console.log('Status à jour avec succès:', data);
    } catch (error) {
      console.error('Erreur:', error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await UpdateUser({
        variables: {
          input: {
            ...formData,
          },
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      console.log('Données mises à jour avec succès:', data);
      setSettings(false);
    } catch (error) {
      console.error('Erreur:', error.message);
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-col py-px w-full h-[300px] bg-cover">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/001/799/226/original/live-concert-4k-free-video.jpg"
            alt="banner"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="container mx-auto">
          <div className="avatar mt-[-50px]">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={`${import.meta.env.VITE_BACK_URL}${image_url}`}
                alt="Image"
              />
            </div>
          </div>

          <PopupEditSettings
            handleFormSubmit={handleFormSubmit}
            formData={formData}
            setFormData={setFormData}
            role={role}
          />
          {/* ===================================== */}

          {/* <div className="flex flex-col md:flex-row justify-between my-5">
            <div className="flex flex-col">
              <div className="flex items-center">
                <h1 className="text-black">{name}</h1>
                {settingsId && (
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="ml-3"
                    onClick={() => {
                      document.getElementById('settings').showModal();
                      setSettings(!settings);
                    }}
                  />
                )}
              </div>

              <span>
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              </span>
              <span>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                  <span> {region}, France</span>
                </div>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                {role === 'Artiste' && (
                  <NavLink className="btn-primary ml-0 md:ml-5" to="/">
                    Proposer un deal
                  </NavLink>
                )}
                {role === 'Organisateur' && (
                  <div className="flex flex-col text-right">
                    <span className="text-3xl">{events.length}</span>
                    <span>évènements</span>
                  </div>
                )}
              </div>
            </div>
          </div> */}

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
                      <div className="flex items-center">
                        <h2 className="text-black">Présentation</h2>
                      </div>
                      <p>{description}</p>
                    </div>

                    {role === 'Artiste' && (
                      <div className="bloc-white mb-[50px]">
                        <h2 className="text-black">Musique & clips</h2>

                        <div className="spotify my-4">
                          <SpotifyPlayer
                            uri={data.artist.spotify_link}
                            size={{ width: '100%', height: 600 }}
                          />
                        </div>

                        <div className="youtube">
                          <ReactPlayer
                            url={data.artist.youtube_link}
                            width="100%"
                            height={500}
                            controls={true}
                          />
                        </div>
                      </div>
                    )}

                    {/* <div className="bloc-white">
                      <h2 className="text-black mb-4">Galerie photos</h2>

                      <div className="grid grid-cols-3 grid-rows-2 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((photo, index) => (
                          <div key={index}>
                            <img
                              className="object-cover w-full aspect-square"
                              src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                              alt={`Photo ${index}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 my-10">
                  <div>
                    <ContactDetails zip_code={zip_code} city={city} />

                    <div className="bloc-white my-10">
                      <h2 className="text-center text-black mb-5">
                        En savoir plus
                      </h2>
                      <div className="flex justify-center">
                        <SocialMedia
                          logo={logo_facebook}
                          link="/"
                          alt="logo facebook"
                        />
                        <SocialMedia
                          logo={logo_indeed}
                          link="/"
                          alt="logo indeed"
                        />
                        <SocialMedia
                          logo={logo_twitter}
                          link="/"
                          alt="logo twitter"
                        />
                        <SocialMedia
                          logo={logo_youtube}
                          link="/"
                          alt="logo youtube"
                        />
                        <SocialMedia
                          logo={logo_instagram}
                          link="/"
                          alt="logo instagram"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {events && events.length > 0 && (
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
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-8 ">
                      <div className="flex space-x-4 items-center mb-2">
                        <input
                          type="radio"
                          id="option1"
                          name="options"
                          className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                        />
                        <label htmlFor="option1" className="text-gray-700">
                          Tous
                        </label>

                        <input
                          type="radio"
                          id="option1"
                          name="options"
                          className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                        />
                        <label htmlFor="option2" className="text-gray-700">
                          Demandes en attentes
                        </label>

                        <input
                          type="radio"
                          id="option1"
                          name="options"
                          className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                        />
                        <label htmlFor="option3" className="text-gray-700">
                          Demande validées
                        </label>
                      </div>
                      <div className="bloc-white">
                        <h2>Evènements remportés</h2>
                        <div>
                          {events.map((event, index) => (
                            <EventCard key={index} {...event} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 ">
                      <ContactDetails zip_code={zip_code} city={city} />
                    </div>
                  </div>
                </div>
              </>
            )}
            {settingsId && role === 'Organisateur' && (
              <>
                {/* <dialog id="deals" className="modal">
                  <div className="modal-box bg-color-primary">
                    <h3 className="font-bold text-lg mb-8">
                      Modifier le statut
                    </h3>
                    <form onSubmit={handleFormSubmitStatus}>
                      <select
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:border-gray-500 text-black"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="pending">pending</option>
                        <option value="validated">validated</option>
                        <option value="refused">refused</option>
                      </select>
                      <button
                        className="text-right w-full text-white"
                        type="submit"
                      >
                        Enregistrer
                      </button>
                    </form>

                    <form method="dialog" className="modal-backdrop">
                      <button className="text-white">close</button>
                    </form>
                  </div>
                </dialog> */}

                <PopupEditDeals
                  handleFormSubmitStatus={handleFormSubmitStatus}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />

                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab w-[180px]"
                  aria-label="Deals"
                  checked={selectedTab === 1}
                  onChange={() => handleTabClick(1)}
                />
                <div
                  role="tabpanel"
                  className="tab-content p-10 bg-color-gray_light"
                >
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 md:col-span-8">
                      <div className="flex space-x-4 items-center mb-2">
                        <input
                          type="radio"
                          id="option1"
                          name="options"
                          checked={radioStatus === 'tous'}
                          onChange={() => handleStatusChange('tous')}
                          className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                        />
                        <label htmlFor="option1" className="text-gray-700">
                          Tous
                        </label>

                        <input
                          type="radio"
                          id="option2"
                          name="options"
                          checked={radioStatus === 'pending'}
                          onChange={() => handleStatusChange('pending')}
                          className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                        />
                        <label htmlFor="option2" className="text-gray-700">
                          Deals en attentes
                        </label>

                        <input
                          type="radio"
                          id="option3"
                          name="options"
                          checked={radioStatus === 'validated'}
                          onChange={() => handleStatusChange('validated')}
                          className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                        />
                        <label htmlFor="option3" className="text-gray-700">
                          Deals validés
                        </label>

                        <input
                          type="radio"
                          id="option4"
                          name="options"
                          checked={radioStatus === 'refused'}
                          onChange={() => handleStatusChange('refused')}
                          className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                        />
                        <label htmlFor="option4" className="text-gray-700">
                          Deals refusés
                        </label>
                      </div>

                      {/* ===================================== */}

                      {/* <div className="flex flex-wrap -mx-3">
                        <div className="flex-none w-full max-w-full px-3">
                          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="flex-auto px-0 pt-0 pb-2">
                              <div className="p-0 overflow-x-auto">
                                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                                  <thead className="align-bottom">
                                    <tr>
                                      <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                        Artiste
                                      </th>
                                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                        Evènement
                                      </th>
                                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                        Status
                                      </th>
                                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                                      <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data.organizer.events.map((event, i) =>
                                      event.artists.map((artist) => {
                                        // console.log('event :', event);
                                        // console.log('artist :', artist);
                                        // console.log('event.id :', event.id);
                                        // console.log(
                                        //   'event.artists.id :',
                                        //   event.artists.id
                                        // );
                                        console.log(artist.validation);

                                        if (
                                          radioStatus === 'tous' ||
                                          (radioStatus === 'pending' &&
                                            artist.validation === 'pending') ||
                                          (radioStatus === 'validated' &&
                                            artist.validation ===
                                              'validated') ||
                                          (radioStatus === 'refused' &&
                                            artist.validation === 'refused')
                                        ) {
                                          return (
                                            <tr
                                              key={`${event.id}${artist.name}${i}`}
                                            >
                                              <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <div className="flex px-2 py-1">
                                                  <div className="flex flex-col justify-center">
                                                    <div className="flex items-center">
                                                      <div className="h-16 w-16 mr-2">
                                                        <img
                                                          className="rounded-full"
                                                          src={`${import.meta.env.VITE_BACK_URL}${artist.image_url}`}
                                                          alt=""
                                                        />
                                                      </div>
                                                      <div className="flex flex-col">
                                                        <h6 className="mb-0 text-sm leading-normal">
                                                          {artist.name}
                                                        </h6>
                                                        <p className="mb-0 text-xs leading-tight text-slate-400">
                                                          {artist.mail}
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>
                                              <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <p className="mb-0 text-xs font-semibold leading-tight">
                                                  {event.name}
                                                </p>
                                                <p className="mb-0 text-xs font-semibold leading-tight">
                                                  {event.region}
                                                </p>
                                              </td>

                                              <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <p
                                                  className={`p-2.5 text-xs rounded-full inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none ${
                                                    artist.validation ===
                                                    'pending'
                                                      ? 'bg-color-yellow-light text-color-yellow-dark'
                                                      : artist.validation ===
                                                          'validated'
                                                        ? 'bg-color-green-light text-color-green-dark'
                                                        : artist.validation ===
                                                            'refused'
                                                          ? 'bg-color-red-light text-color-red-dark'
                                                          : ''
                                                  }`}
                                                >
                                                  {artist.validation}
                                                </p>
                                              </td>

                                              <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                                <span
                                                  className="cursor-pointer text-xs font-semibold leading-tight text-slate-400"
                                                  onClick={() => {
                                                    document
                                                      .getElementById('deals')
                                                      .showModal();
                                                    setIdUserStatus(
                                                      parseInt(artist.id, 10)
                                                    );
                                                    setIdEventStatus(
                                                      parseInt(event.id, 10)
                                                    );
                                                  }}
                                                >
                                                  Edit
                                                </span>
                                              </td>
                                            </tr>
                                          );
                                        }
                                      })
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <ContactDetails zip_code={zip_code} city={city} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
