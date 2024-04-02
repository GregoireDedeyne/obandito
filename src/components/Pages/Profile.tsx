import { NavLink, useLoaderData, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faStar,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import SpotifyPlayer from 'react-spotify-player';
import { useState } from 'react';
import { useAppSelector } from '../../store/redux-hook';
import { UPDATE_USER } from '../../graphQL/actions';
import { useMutation } from '@apollo/client';

import { EventCard } from '../InfoHomeCard/EventsCards';
import SocialMedia from '../SocialMedia';

import logo_facebook from '../../assets/images/logo_facebook.png';
import logo_indeed from '../../assets/images/logo_indeed.png';
import logo_twitter from '../../assets/images/logo_twitter.png';
import logo_youtube from '../../assets/images/logo_youtube.png';
import logo_instagram from '../../assets/images/logo_instagram.png';

interface FormData {
  name: string;
  region: string;
  description: string;
  zip_code: number;
  city: string;
  // spotify_link: string;
  // youtube_link: string;
  // image_url: string;
}

export default function Profile() {
  const [UpdateUser, { loading, error }] = useMutation(UPDATE_USER);
  const [selectedTab, setSelectedTab] = useState(0);
  const [settings, setSettings] = useState(false);

  const token = useAppSelector((state) => state.decodedToken.token);

  const idredux = useAppSelector((state) => state.decodedToken.decodedData.id);
  const { id: urlId } = useParams();
  const settingsId = idredux == urlId;

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const data = useLoaderData();

  const role = data.artist?.role?.name || data.organizer?.role?.name;
  const { name, region, description, zip_code, city, image_url } =
    role === 'Artiste' ? data?.artist : data?.organizer;
  const events = data?.organizer?.events || data?.artist?.events;

  // console.log('image_url', image_url);
  // console.log('image_url', `${image_url}`);

  const [formData, setFormData] = useState<FormData>({
    name,
    region,
    description,
    zip_code,
    city,
    // spotify_link: '',
    // youtube_link: '',
    // image_url: '',
  });

  console.log('formData :', formData);
  console.log('data :', data);

  // console.log('data spotify_link :', data.artist.spotify_link);

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
      console.log('Données mises à jour avec succès:', data.updateUser);
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
            alt=""
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
            {/* {settings ? (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="input input-bordered flex items-center gap-2 bg-white w-full"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                  }}
                />
                <button className="text-right w-full" type="submit">
                  Enregistrer
                </button>
              </form>
            ) : (
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={data.image_url} alt="Image" />
              </div>
            )} */}
          </div>

          {/* ===================================== */}
          <dialog id="settings" className="modal">
            <div className="modal-box bg-color-primary">
              <h3 className="font-bold text-lg mb-8">Modifier mes données</h3>
              <form onSubmit={handleFormSubmit} className="modal-backdrop">
                <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
                  Nom :
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Votre nom"
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
                  Région :
                  <input
                    type="text"
                    value={formData.region}
                    onChange={(e) =>
                      setFormData({ ...formData, region: e.target.value })
                    }
                    placeholder="Votre région"
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
                  Description :
                  <textarea
                    className="input input-bordered flex items-center gap-2 bg-white w-full pr-0"
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Description"
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
                  code postal :
                  <input
                    type="texte"
                    value={formData.zip_code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        zip_code: parseInt(e.target.value, 10),
                      })
                    }
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
                  ville :
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        city: e.target.value,
                      })
                    }
                  />
                </label>

                {role === 'Artiste' && (
                  <>
                    <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
                      Lien spotify :
                      <input
                        type="url"
                        value={formData.spotify_link}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            spotify_link: e.target.value,
                          })
                        }
                      />
                    </label>

                    <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
                      Lien Youtube :
                      <input
                        type="url"
                        value={formData.youtube_link}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            youtube_link: e.target.value,
                          })
                        }
                      />
                    </label>
                  </>
                )}

                <button className="text-right w-full text-white" type="submit">
                  Enregistrer
                </button>
              </form>

              <form method="dialog" className="modal-backdrop">
                <button className="text-white">close</button>
              </form>
            </div>
          </dialog>
          {/* ===================================== */}

          <div className="flex flex-col md:flex-row justify-between my-5">
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

                    <div className="bloc-white">
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
                          <span>{`${zip_code}, ${city}`}</span>
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
                  {events.map((event, index) => (
                    <EventCard key={index} {...event} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
