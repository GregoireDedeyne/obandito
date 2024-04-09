import { useMutation } from '@apollo/client';
import { NavLink, useLoaderData } from 'react-router-dom';
import { POSTULATION_EVENT } from '../../graphQL/actions';
import { useAppSelector } from '../../store/redux-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faMapMarker,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Card } from '../Card';
import { CardsWithout } from '../CardsWithout';
import { CardsEvent } from '../CardsEvent';
import SocialMediaGroup from '../SocialMediaGroup';

export function EventPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const token = useAppSelector((state) => state.decodedToken.token);
  const role = useAppSelector((state) => state.decodedToken.decodedData.role);

  // console.log('role', role);

  const [PostulationEvent, { data, loading, error }] =
    useMutation(POSTULATION_EVENT);

  const eventdata = useLoaderData();

  const handleSubmit = async () => {
    const id = eventdata.event.id;
    const eventId = parseInt(id);
    console.log(id);

    await PostulationEvent({
      variables: { eventId: eventId },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    // console.log("j'ai postulé");
  };

  const img = `${import.meta.env.VITE_BACK_URL}${eventdata.event.image_url}`;
  const artists = eventdata.event.artists;

  return (
    <>
      <div className="bg-white w-full">
        <div
          className="flex flex-col justify-end pl-5 pb-5 w-full h-[600px] bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="container mx-auto">
            <article className="flex flex-col items-start px-5 py-5 bg-white rounded-xl max-w-[476px]">
              <h1 className="text-3xl pb-2 font-medium leading-6 text-neutral-700">
                {eventdata?.event?.name}{' '}
              </h1>
              <div className="flex flex-col mt-4 max-w-full text-base leading-6 text-zinc-500 w-[278px]">
                <div className={`flex gap-1.5`}>
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="shrink-0 my-auto w-4 aspect-square"
                  />

                  <div>{eventdata?.event?.date}</div>
                </div>
                <div className={`flex gap-1.5`}>
                  <FontAwesomeIcon
                    icon={faMapMarker}
                    className="shrink-0 my-auto w-4 aspect-square"
                  />
                  <div>{eventdata?.event?.city}</div>
                </div>
                <div className={`flex gap-1.5 w-96`}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className="shrink-0 my-auto w-4 aspect-square"
                  />
                  <NavLink
                    to={`/profile/organizer/${eventdata?.event?.organizer?.id}`}
                  >
                    <div>
                      Organisé par :{' '}
                      <span className="text-rose-500">
                        {eventdata?.event?.organizer?.name}
                      </span>
                    </div>
                  </NavLink>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div className="container mx-auto">
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
                      <p> {eventdata?.event?.description}</p>
                    </div>

                    {artists.length != 0 && (
                      <div className="bloc-white flex flex-col">
                        <h2 className="text-black mb-4">
                          Les Artistes présents
                        </h2>

                        <CardsEvent data={artists} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 my-10">
                  <div>
                    <div className="bloc-white">
                      <h2 className="text-black mb-5">Coordonnées</h2>
                      <div className="adress flex flex-col">
                        <span className="">
                          Adresse : {eventdata?.event?.address}
                        </span>
                        <span>Code postal : {eventdata?.event?.zip_code}</span>
                        <span className="mb-5">
                          Villes : {eventdata?.event?.city}
                        </span>
                        <span>France</span>

                        <li>
                          Slots occupés : {eventdata?.event?.occupied_slots}
                        </li>
                        <li>
                          slots totals : {eventdata?.event?.total_slots} places
                        </li>
                        <li>Deal : {eventdata?.event?.price} €</li>
                      </div>
                      <div className="website">
                        <a href="https://www.youtube.com/">
                          https://www.youtube.com/
                        </a>
                      </div>

                      {role == 'Artiste' && (
                        <div className="my-5">
                          <button
                            className="btn-primary block text-center w-full"
                            onClick={handleSubmit}
                          >
                            Postuler{' '}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="bloc-white my-10">
                      <h2 className="text-center text-black mb-3">
                        En savoir plus
                      </h2>
                      <SocialMediaGroup />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
