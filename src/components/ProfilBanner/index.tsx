import { faMapMarkerAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { Stars } from '../Stars';
import { PopupEditSettings } from '../PopupEditSettings';

interface Props {
  role: string;
}

export function ProfilBanner({ role, info }) {
  return (
    <div className="bg-white">
      <div className="flex flex-col py-px w-full h-[300px] bg-cover">
        <img
          src={`${import.meta.env.VITE_BACK_URL}${info.image_url}`}
          alt="banner"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="container mx-auto">
        <div className="avatar mt-[-50px]">
          <div className="w-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
            <img
              src={`${import.meta.env.VITE_BACK_URL}${info.image_url}`}
              alt="Image"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between my-5">
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="text-black">{info.name}</h1>
              {/* {settingsId && ( */}
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="ml-3"
                onClick={() => {
                  document.getElementById('settings').showModal();
                  // setSettings(!settings);
                }}
              />
              {/* )} */}

              <PopupEditSettings
                handleFormSubmit=""
                formData=""
                setFormData=""
                role={role}
              />
            </div>

            <Stars />

            <span>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                <span> {info.region}, France</span>
              </div>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              {role === 'Artiste' ? (
                <NavLink className="btn-primary ml-0 md:ml-5" to="/">
                  Proposer un deal
                </NavLink>
              ) : (
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
