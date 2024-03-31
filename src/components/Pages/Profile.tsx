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

interface FormData {
  name: string;
  region: string;
  description: string;
  zip_code: number;
  city: string;
}

export default function Profile() {
  const [UpdateUser, { loading, error }] = useMutation(UPDATE_USER);
  const [selectedTab, setSelectedTab] = useState(0);
  const [settings, setSettings] = useState(false);

  // const nameRedux = useSelector((state) => state.decodedToken.decodedData.name);

  // const dispatch = useDispatch();

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
  });

  console.log('formData :', formData);
  console.log('data :', data);

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
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>

          <div className="flex justify-between my-5">
            <div className="flex flex-col">
              {settings ? (
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <button type="submit">Enregistrer</button>
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
                    <input
                      type="text"
                      value={formData.region}
                      onChange={(e) =>
                        setFormData({ ...formData, region: e.target.value })
                      }
                    />
                    <button type="submit">Enregistrer</button>
                  </form>
                ) : (
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span> {region}, France</span>
                  </div>
                )}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between">
                {settingsId && (
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    onClick={() => setSettings(!settings)}
                  />
                )}
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
                      {settings ? (
                        <form onSubmit={handleFormSubmit}>
                          <textarea
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
                          <button type="submit">Enregistrer</button>
                        </form>
                      ) : (
                        <p>{description}</p>
                      )}
                    </div>

                    {role === 'Artiste' && (
                      <div className="bloc-white mb-[50px]">
                        <h2 className="text-black">Musique & clips</h2>

                        <div className="spotify my-4">
                          {/* {settings ? (
                            <form onSubmit={handleFormSubmit}>
                              <input
                                type="text"
                                value={formData.spotify_link}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    spotify_link: e.target.value,
                                  })
                                }
                                placeholder="URL Spotify"
                              />
                              <button type="submit">Enregistrer</button>
                            </form>
                          ) : (
                            <SpotifyPlayer
                              uri={data.spotify_link}
                              size={{ width: '100%', height: 600 }}
                            />
                          )} */}

                          <SpotifyPlayer
                            uri="https://open.spotify.com/intl-fr/album/2lGH3ryY5dbDxbPzrhO21F?si=CvJZ9x4ZRc6i_yRs56hHXQ"
                            size={{ width: '100%', height: 600 }}
                          />
                        </div>
                        {/* 
                        <div className="youtube">
                          {settings ? (
                            <form onSubmit={handleFormSubmit}>
                              <input
                                type="text"
                                value={formData.youtube_link}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    youtube_link: e.target.value,
                                  })
                                }
                                placeholder="URL YouTube"
                              />
                              <button type="submit">Enregistrer</button>
                            </form>
                          ) : (
                            <div className="youtube">
                              <ReactPlayer
                                url={formData.youtube_link} // Utilisez formData.youtube_link ici
                                width="100%"
                                height={500}
                                controls={true}
                              />
                            </div>
                          )}
                        </div> */}

                        <div className="youtube">
                          <ReactPlayer
                            url="https://www.youtube.com/watch?v=0dmS0He_czs"
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
                          {settings ? (
                            <>
                              <form onSubmit={handleFormSubmit}>
                                <input
                                  type="text"
                                  value={formData.zip_code}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      zip_code: e.target.value,
                                    })
                                  }
                                  placeholder="Code postal"
                                />
                                <button type="submit">Enregistrer</button>
                              </form>
                              <form onSubmit={handleFormSubmit}>
                                <input
                                  type="text"
                                  value={formData.city}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      city: e.target.value,
                                    })
                                  }
                                  placeholder="Ville"
                                />
                                <button type="submit">Enregistrer</button>
                              </form>
                            </>
                          ) : (
                            <span>{`${zip_code}, ${city}`}</span>
                          )}
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
                  <ThirdView events={events} locations={events} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
