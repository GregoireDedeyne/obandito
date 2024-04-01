import { NavLink, useLoaderData, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faStar,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import SpotifyPlayer from 'react-spotify-player';
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { ThirdView } from '../FirstViewsHome/ThirdView';
import { useState } from 'react';
import { useAppSelector } from '../../store/redux-hook';
import { UPDATE_USER } from '../../graphQL/actions';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DECODED_TOKEN, setDecodedToken } from '../../store/actions';
import { EventCard } from '../InfoHomeCard/EventsCards';

interface FormData {
  name: string;
  region: string;
  description: string;
  zip_code: number;
  city: string;
  // spotify_link: string;
  // youtube_link: string;
  image_url: string;
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
  const { name, region, description, zip_code, city } =
    role === 'Artiste' ? data?.artist : data?.organizer;
  const events = data?.organizer?.events || data?.artist?.events;

  const [formData, setFormData] = useState<FormData>({
    name,
    region,
    description,
    zip_code,
    city,
    // spotify_link: '',
    // youtube_link: '',
    image_url: '',
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

          <div className="flex flex-col md:flex-row justify-between my-5">
            <div className="flex flex-col">
              {settings ? (
                <form onSubmit={handleFormSubmit}>
                  <label className="input input-bordered flex items-center gap-2 bg-white w-full">
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
                  <button className="text-right w-full" type="submit">
                    Enregistrer
                  </button>
                </form>
              ) : (
                <h1 className="text-black">{name}</h1>
              )}
              <span>
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
              </span>
              <span>
                {settings ? (
                  <form onSubmit={handleFormSubmit}>
                    <label className="input input-bordered flex items-center gap-2 bg-white w-full">
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
                    <button className="text-right w-full" type="submit">
                      Enregistrer
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                    <span> {region}, France</span>
                  </div>
                )}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                {settingsId && (
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    onClick={() => setSettings(!settings)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
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
                        {settingsId && (
                          <FontAwesomeIcon
                            icon={faPencilAlt}
                            onClick={() => setSettings(!settings)}
                            className="cursor-pointer ml-2"
                          />
                        )}
                      </div>
                      {settings ? (
                        <form onSubmit={handleFormSubmit}>
                          <textarea
                            className="input input-bordered flex items-center gap-2 bg-white w-full"
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
                          <button className="text-right w-full" type="submit">
                            Enregistrer
                          </button>
                        </form>
                      ) : (
                        <p>{description}</p>
                      )}
                    </div>

                    {/* {role === 'Artiste' && (
                      <div className="bloc-white mb-[50px]">
                        <h2 className="text-black">Musique & clips</h2>

                        <div className="spotify my-4">
                          {settings ? (
                            <form onSubmit={handleFormSubmit}>
                              <input
                                className="input input-bordered flex items-center gap-2 bg-white w-full"
                                type="url"
                                value={formData.spotify_link}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    spotify_link: e.target.value,
                                  })
                                }
                                placeholder="mettre le lien de votre album spotify"
                              />
                                 <button className="text-right w-full" type="submit">
                            Enregistrer
                          </button>
                            </form>
                          ) : (
                            <SpotifyPlayer
                              uri={data.artist.spotify_link}
                              size={{ width: '100%', height: 600 }}
                            />
                          )}
                        </div>

                        <div className="youtube">
                          {settings ? (
                            <form onSubmit={handleFormSubmit}>
                              <input
                                className="input input-bordered flex items-center gap-2 bg-white w-full"
                                type="url"
                                value={formData.youtube_link}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    youtube_link: e.target.value,
                                  })
                                }
                                placeholder="mettre le lien de votre vidéo"
                              />
                                  <button className="text-right w-full" type="submit">
                            Enregistrer
                          </button>
                            </form>
                          ) : (
                            <div className="youtube">
                              <ReactPlayer
                                url={data.artist.youtube_link}
                                width="100%"
                                height={500}
                                controls={true}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )} */}

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
                          {settings ? (
                            <>
                              <form onSubmit={handleFormSubmit}>
                                <label className="input input-bordered flex items-center gap-2 bg-white w-full">
                                  code postal :
                                  <input
                                    type="text"
                                    value={formData.zip_code}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        zip_code: parseInt(e.target.value, 10),
                                      })
                                    }
                                    placeholder="69333"
                                  />
                                </label>
                                <button
                                  className="text-right w-full"
                                  type="submit"
                                >
                                  Enregistrer
                                </button>
                              </form>
                              <form onSubmit={handleFormSubmit}>
                                <label className="input input-bordered flex items-center gap-2 bg-white w-full">
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
                                    placeholder="Paris"
                                  />
                                </label>
                                <button
                                  className="text-right w-full"
                                  type="submit"
                                >
                                  Enregistrer
                                </button>
                              </form>
                            </>
                          ) : (
                            <span>{`${zip_code}, ${city}`}</span>
                          )}
                        </span>

                        <span>France</span>
                      </div>
                      {/* <div className="website">
                        <a href="https://www.youtube.com/">
                          https://www.youtube.com/
                        </a>
                      </div> */}

                      <div className="my-5">
                        <NavLink
                          className="btn-primary block text-center"
                          to="/"
                        >
                          Proposer un deal
                        </NavLink>
                      </div>
                    </div>

                    {/* <div className="bloc-white my-10">
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
                    </div> */}
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
