import { faMapMarkerAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation } from 'react-router-dom';
import { Stars } from '../Stars';
import { PopupEditSettings } from '../PopupEditSettings';
import { useState } from 'react';
import { UPDATE_USER } from '../../graphQL/actions';
import { useMutation } from '@apollo/client';
import banner from '../../assets/images/banner-profile.svg';
import { useDispatch } from 'react-redux';
import { updateToken } from '../../store/actions';
import { handleImg } from '../../utils/handleImg';

/**
 * Component for the profile banner.
 * @param {string} role - Role of the user.
 * @param {object} info - Information about the user.
 * @param {string} token - User token.
 * @param {string} idSettings - ID settings.
 * @param {array} regions - Regions data.
 * @param {string} rolelogin - Role login.
 * @param {array} reviews - User reviews.
 */

export function ProfilBanner({
  role,
  dataArtistOrOrganize,
  token,
  myProfile,
  regions,
  myRole,
  reviews,
}) {
  const [UpdateUser] = useMutation(UPDATE_USER);

  const [formData, setFormData] = useState({
    name: dataArtistOrOrganize.name,
    region: dataArtistOrOrganize.region,
    description: dataArtistOrOrganize.description,
    address: dataArtistOrOrganize.address,
    zip_code: dataArtistOrOrganize.zip_code,
    city: dataArtistOrOrganize.city,
    spotify_link: dataArtistOrOrganize.spotify_link,
    youtube_link: dataArtistOrOrganize.youtube_link,
    image_url: null,
  });
  const location = useLocation();

  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Filter null entries
      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value !== null)
      );

      const { data } = await UpdateUser({
        variables: { input: { ...filteredData } },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });
      dispatch(updateToken(data.updateUser.image_url));

      const settingsModal = document.getElementById('settings');
      if (settingsModal) {
        settingsModal.close();
      } else {
        console.error("L'élément avec l'ID \"settings\" n'a pas été trouvé.");
      }
      window.location.href = location.pathname;
    } catch (error) {
      console.error("Une erreur inattendue s'est produite");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col py-px w-full h-[300px] bg-cover">
        <img src={banner} alt="banner" className="object-cover w-full h-full" />
      </div>
      <div className="container mx-auto  px-5">
        <div className="avatar mt-[-50px]">
          <div className="w-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
            <img
              src={handleImg(dataArtistOrOrganize.image_url)}
              alt="Image"
              className="object-fit"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between my-5">
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="text-black">{dataArtistOrOrganize.name}</h1>
              {myProfile && (
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="ml-3 cursor-pointer"
                  onClick={() => {
                    const settingsModal = document.getElementById('settings');
                    if (settingsModal) {
                      settingsModal.showModal();
                    } else {
                      console.error(
                        "L'élément avec l'ID \"settings\" n'a pas été trouvé."
                      );
                    }
                  }}
                />
              )}

              <PopupEditSettings
                handleFormSubmit={handleFormSubmit}
                formData={formData}
                setFormData={setFormData}
                role={role}
                regions={regions}
              />
            </div>

            <Stars reviews={reviews} />

            <span>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                <span> {dataArtistOrOrganize.region}, France</span>
              </div>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              {role === 'Artiste' && myRole !== 'Artiste' && !myProfile && (
                <NavLink className="btn-primary ml-0 md:ml-5" to="/">
                  Proposer un deal
                </NavLink>
              )}

              {role === 'Organisateur' && (
                <div className="flex flex-col text-right">
                  <span className="text-3xl">
                    {dataArtistOrOrganize.events.length}
                  </span>
                  <span>évènements</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
