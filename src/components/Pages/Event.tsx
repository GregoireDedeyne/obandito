import { useMutation } from '@apollo/client';
import { NavLink, useLoaderData } from 'react-router-dom';
import { POSTULATION_EVENT, UPDATE_EVENT } from '../../graphQL/actions';
import { NavLink, useLoaderData, useLocation } from 'react-router-dom';
import { POSTULATION_EVENT } from '../../graphQL/actions';
import { useAppSelector } from '../../store/redux-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faMapMarker,
  faPencilAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { CardsEvent } from '../CardsEvent';
import SocialMediaGroup from '../SocialMediaGroup';
import { PopupEditEvent } from '../PopupEditEvent';

interface FormData {
  name: string;
  description: string;
  address: string;
  zip_code: string;
  city: string;
  date: string;
  total_slots: number;
  price: number;
  image_url: URL;
}
import { toast, ToastContainer } from 'react-toastify';

export function EventPage(): EventProps {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const location = useLocation();
  const token = useAppSelector((state) => state.decodedToken.token);
  const role = useAppSelector((state) => state.decodedToken.decodedData.role);
  const idToken = useAppSelector((state) => state.decodedToken.decodedData.id);
  const id = useAppSelector((state) => state.decodedToken.decodedData.id);

  const [
    PostulationEvent,
    { data, loading: postulationLoading, error: postulationError },
  ] = useMutation(POSTULATION_EVENT);

  const [UpdateEvent, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_EVENT);
  const [PostulationEvent, { data, loading, error }] = useMutation(
    POSTULATION_EVENT,
    {
      onError: (error) => {
        toast.warn(error.message); // Afficher l'erreur avec react-toastify
      },
    }
  );

  const eventdata = useLoaderData();

  const idOrga = eventdata.event.organizer.id;
  const idSettings = idToken === parseInt(idOrga);

  const regions = eventdata.regions;

  const [formData, setFormData] = useState<FormData>({
    name: eventdata.event.name,
    description: eventdata.event.description,
    region: eventdata.event.region,
    address: eventdata.event.address,
    zip_code: eventdata.event.zip_code,
    city: eventdata.event.city,
    date: eventdata.event.date,
    total_slots: eventdata.event.total_slots,
    price: Number(eventdata.event.price),
    image_url: null,
  });
  const postulation = eventdata.event.artist_postulation;

  const result = postulation.includes(id.toString());

  console.log(id);

  console.log(postulation);

  console.log(result);

  const handleSubmit = async () => {
    const id = eventdata.event.id;
    const eventId = parseInt(id);
    // console.log(id);
    try {
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
  };
      await PostulationEvent({
        variables: { eventId: eventId },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const id = eventdata.event.id;
      const eventId = parseInt(id);

      const formDataWithId = { ...formData, id: eventId };

      const filteredData = Object.fromEntries(
        Object.entries(formDataWithId).filter(([key, value]) => value !== null)
      );

      const { data } = await UpdateEvent({
        variables: { input: { ...filteredData } },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });

      console.log('Données mises à jour avec succès:', data);
      document.getElementById('event').close();
      window.location.href = location.pathname;
    } catch (error) {
      console.error('Erreur:', error.message);
    }
      toast.warn("Vous avez bien postulé à l'évènement");
      window.location.href = location.pathname;
    } catch (error) {
      // Gérer l'erreur ici
      console.error('Erreur lors de la soumission du formulaire:', error);
      toast.error(
        "Une erreur s'est produite lors de la postulation à l'évènement. Veuillez réessayer plus tard."
      );
    }
  };

  const img = `${import.meta.env.VITE_BACK_URL}${eventdata.event.image_url}`;
  const artists = eventdata.event.artists;

  return (
    <>
      <div className="bg-white w-full">
        <ToastContainer />

        <div
          className="flex flex-col justify-end pl-5 pb-5 w-full h-[600px] bg-cover bg-center"
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="container mx-auto">
            <article className="flex flex-col items-start px-5 py-5 bg-white rounded-xl max-w-[476px]">
              <div className="flex items-center">
                <h1 className="text-3xl pb-2 font-medium leading-6 text-neutral-700">
                  {eventdata?.event?.name}{' '}
                </h1>
                {idSettings && (
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="ml-3 cursor-pointer"
                    onClick={() => {
                      document.getElementById('event').showModal();
                    }}
                  />
                )}
              </div>

              <PopupEditEvent
                handleFormSubmit={handleFormSubmit}
                formData={formData}
                setFormData={setFormData}
                regions={regions}
              />

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

                      {role === 'Artiste' && result === false ? (
                        <div className="my-5">
                          <button
                            className="btn-primary block text-center w-full"
                            onClick={handleSubmit}
                          >
                            Postuler
                          </button>
                        </div>
                      ) : role === 'Artiste' && result === true ? (
                        <div className="my-5">
                          <button
                            className="btn-primary block text-center w-full"
                            disabled
                          >
                            Vous avez déjà postulé
                          </button>
                        </div>
                      ) : null}
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
