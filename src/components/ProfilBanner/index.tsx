import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { Stars } from '../Stars';

export function ProfilBanner() {
  return (
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
              src="https://static.vecteezy.com/system/resources/thumbnails/001/799/226/original/live-concert-4k-free-video.jpg"
              alt="Image"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between my-5">
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="text-black">"Name"</h1>
              {/* {settingsId && ( */}
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="ml-3"
                // onClick={() => {
                //   document.getElementById('settings').showModal();
                //   setSettings(!settings);
                // }}
              />
              {/* )} */}
            </div>

            <Stars />

            <span>
              <div className="flex items-center">
                {/* <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" /> */}
                <span> "Region", France</span>
              </div>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              {/* {role === 'Artiste' && ( */}
              <NavLink className="btn-primary ml-0 md:ml-5" to="/">
                Proposer un deal
              </NavLink>
              {/* )} */}
              {/* {role === 'Organisateur' && ( */}
              <div className="flex flex-col text-right">
                <span className="text-3xl">
                  {/* {events.length} */}
                  33
                </span>
                <span>évènements</span>
              </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
