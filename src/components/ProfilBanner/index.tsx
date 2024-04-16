import { faMapMarkerAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation } from 'react-router-dom';
import { Stars } from '../Stars';
import { PopupEditSettings } from '../PopupEditSettings';
import { useState } from 'react';
import { UPDATE_USER } from '../../graphQL/actions';
import { useMutation } from '@apollo/client';
import banner from '../../assets/images/banner-profile.svg';
import { useAppDispatch } from '../../store/redux-hook';
import { updateToken } from '../../store/actions';
import { handleImg } from '../../utils/handleImg';

interface ProfilBannerProps {
  role: string;
  info: {
    events: any;
    name: string;
    region: string;
    description: string;
    address: string;
    zip_code: number;
    city: string;
    spotify_link: string;
    youtube_link: string;
    image_url: URL;
  };
  token: string;
  idSettings: boolean;
  regions: [];
  rolelogin: string;
}

export function ProfilBanner({
  role,
  info,
  token,
  idSettings,
  regions,
  rolelogin,
  reviews,
}: ProfilBannerProps) {
  const [UpdateUser] = useMutation(UPDATE_USER);

  const [formData, setFormData] = useState({
    name: info.name,
    region: info.region,
    description: info.description,
    address: info.address,
    zip_code: info.zip_code,
    city: info.city,
    spotify_link: info.spotify_link,
    youtube_link: info.youtube_link,
    image_url: null,
  });
  const location = useLocation();

  const dispatch = useAppDispatch();

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // Filtrer les propriétés null dans formData
      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value !== null)
      );

      const { data } = await UpdateUser({
        variables: { input: { ...filteredData } },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });
      dispatch(updateToken(data.updateUser.image_url));

      // console.log('Données mises à jour avec succès:', data);
      const settingsModal = document.getElementById(
        'settings'
      ) as HTMLDialogElement | null;
      if (settingsModal) {
        settingsModal.close();
      } else {
        console.error("L'élément avec l'ID \"settings\" n'a pas été trouvé.");
      }
      window.location.href = location.pathname;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Une erreur inattendue s'est produite");
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col py-px w-full h-[300px] bg-cover">
        <img src={banner} alt="banner" className="object-cover w-full h-full" />
      </div>
      <div className="container mx-auto">
        <div className="avatar mt-[-50px]">
          <div className="w-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
            <img
              src={handleImg(info.image_url)}
              alt="Image"
              className="object-fit"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between my-5">
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="text-black">{info.name}</h1>
              {idSettings && (
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="ml-3 cursor-pointer"
                  onClick={() => {
                    const settingsModal = document.getElementById(
                      'settings'
                    ) as HTMLDialogElement | null;
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
                <span> {info.region}, France</span>
              </div>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              {role === 'Artiste' && rolelogin !== 'Artiste' && !idSettings && (
                <NavLink className="btn-primary ml-0 md:ml-5" to="/">
                  Proposer un deal
                </NavLink>
              )}

              {role === 'Organisateur' && (
                <div className="flex flex-col text-right">
                  <span className="text-3xl">{info.events.length}</span>
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
