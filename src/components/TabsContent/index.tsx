import ContactDetails from '../ContactDetails';
import { ArrayHandleArtistEvent } from '../ArrayHandleArtistEvent';
import ProfilContentBlock from '../ProfilContentBlock';
import { useState } from 'react';
import { EventCard } from '../InfoHomeCard/EventsCards';
import SocialMediaGroup from '../SocialMediaGroup';
import { setSelectedTab } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store/redux-hook';
import { Rating } from '../Rating';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../graphQL/actions';
import PopupAddReview from '../PopupAddReview';

interface Event {
  validation: string;
  id: number;
  artists: Artist[];
  name: string;
}

interface Artist {
  id: number;
  validation: string;
}

interface TabsContentProps {
  data: {
    address: string;
    description: string;
    spotify_link: string;
    youtube_link: string;
    events: Event[];
    zip_code: string;
    city: string;
    adress: string;
    role: string;
  };
  id: number;
  userId: number;
  role: string;
  idSettings: boolean;
  rolelogin: string;
}

export function TabsContent({
  data,
  idSettings,
  role,
  rolelogin,
  userId,
  token,
  reviews,
}: TabsContentProps) {
  setSelectedTab;
  const [radioStatus, setRadioStatus] = useState<string>('tous');

  const [
    addReviewMutation,
    { data: addReviewData, loading: addReviewLoading, error: addReviewError },
  ] = useMutation(ADD_REVIEW);

  // console.log('data', data);
  const dispatch = useAppDispatch();

  const handleTabClick = (i: number) => {
    dispatch(setSelectedTab(i));
  };

  const selectedTab: number = useAppSelector(
    (state) => state.decodedToken.selectedTab
  );

  const [formData, setFormData] = useState({
    event_id: 21,
    receiver_id: 51,
    rating: 5,
    review: '',
  });

  // console.log('formData', formData);

  const handleFormSubmit = async (e: { preventDefault: () => void }, event) => {
    e.preventDefault();

    try {
      // Filtrer les propriétés null dans formData
      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value !== null)
      );

      setFormData({
        ...formData,
        // event_id: parseInt(event.id),
        rating: formData.rating,
        // receiver_id: event.organizer_id,
        review: formData.review,
      });

      console.log('formData---------------------', formData);

      const { data } = await addReviewMutation({
        variables: { input: { ...filteredData } },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });

      // console.log('Données mises à jour avec succès:', data);
      // const settingsModal = document.getElementById(
      //   'addReview'
      // ) as HTMLDialogElement | null;
      // if (settingsModal) {
      //   settingsModal.close();
      // } else {
      //   console.error("L'élément avec l'ID \"settings\" n'a pas été trouvé.");
      // }
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
    <>
      <div role="tablist" className="tabs-bordered container mx-auto">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Présentation"
          checked={selectedTab === 0}
          onChange={() => handleTabClick(0)}
        />

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Evaluation"
          checked={selectedTab === 1}
          onChange={() => handleTabClick(1)}
        />

        {data.events && data.events.length > 0 && (
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Evènements"
            checked={selectedTab === 2}
            onChange={() => handleTabClick(2)}
          />
        )}

        {idSettings && role === 'Organisateur' && (
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Deals"
            checked={selectedTab === 3}
            onChange={() => handleTabClick(3)}
          />
        )}
      </div>

      <div className="bg-color-gray_light flex-1">
        <div className="grid grid-cols-12 md:gap-8 container mx-auto">
          {/* grid left */}
          <div className="col-span-12 md:col-span-8 my-10">
            {selectedTab === 0 && (
              <>
                <ProfilContentBlock
                  title="Présentation"
                  spotify=""
                  youtube=""
                  description={data.description}
                />
                {role === 'Artiste' ? (
                  <ProfilContentBlock
                    title="Musiques & clips"
                    spotify={data.spotify_link}
                    youtube={data.youtube_link}
                    description=""
                  />
                ) : (
                  ''
                )}
              </>
            )}

            {/* ================================================ */}
            {selectedTab === 1 && <Rating reviews={reviews} data={data} />}

            {/* ================================================ */}

            {selectedTab === 2 && (
              <>
                {role === 'Organisateur' && (
                  <div className="bloc-white">
                    <h2>Mes Evènements</h2>
                    <div>
                      {data.events.map((event, index) => (
                        <EventCard
                          image_url=""
                          description=""
                          city=""
                          date=""
                          region=""
                          price={0}
                          organizer={{
                            name: '',
                          }}
                          available={false}
                          validated=""
                          key={index}
                          {...event}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {role === 'Artiste' && (
                  <>
                    {idSettings && (
                      <div className="flex space-x-4 items-center mb-2">
                        <input
                          type="radio"
                          id="option1"
                          name="options"
                          value="tous"
                          className="cursor-pointer h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                          checked={radioStatus === 'tous'}
                          onChange={(e) => setRadioStatus(e.target.value)}
                        />
                        <label
                          htmlFor="option1"
                          className="text-gray-700 cursor-pointer"
                        >
                          Tous
                        </label>

                        <input
                          type="radio"
                          id="option2"
                          name="options"
                          value="pending"
                          className="cursor-pointer h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                          checked={radioStatus === 'pending'}
                          onChange={(e) => setRadioStatus(e.target.value)}
                        />
                        <label
                          htmlFor="option2"
                          className="text-gray-700 cursor-pointer"
                        >
                          Demandes en attente
                        </label>

                        <input
                          type="radio"
                          id="option3"
                          name="options"
                          value="validated"
                          className="cursor-pointer h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                          checked={radioStatus === 'validated'}
                          onChange={(e) => setRadioStatus(e.target.value)}
                        />
                        <label
                          htmlFor="option3"
                          className="text-gray-700 cursor-pointer"
                        >
                          Demandes validées
                        </label>

                        <input
                          type="radio"
                          id="option4"
                          name="options"
                          value="refused"
                          className="cursor-pointer h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                          checked={radioStatus === 'refused'}
                          onChange={(e) => setRadioStatus(e.target.value)}
                        />
                        <label
                          htmlFor="option4"
                          className="text-gray-700 cursor-pointer"
                        >
                          Demandes refusées
                        </label>
                      </div>
                    )}
                    <div className="bloc-white">
                      <h2>Evènements remportés</h2>
                      <div>
                        {idSettings &&
                          data.events.map((event, index) => (
                            <div key={index} className="flex items-center">
                              {radioStatus === 'tous' ||
                              (radioStatus === 'pending' &&
                                event.validation === 'pending') ||
                              (radioStatus === 'validated' &&
                                event.validation === 'validated') ||
                              (radioStatus === 'refused' &&
                                event.validation === 'refused') ? (
                                <EventCard
                                  image_url=""
                                  description=""
                                  city=""
                                  date=""
                                  region=""
                                  price={0}
                                  organizer={{
                                    name: '',
                                  }}
                                  available={false}
                                  key={index}
                                  {...event}
                                  validated={event.validation}
                                />
                              ) : (
                                ''
                              )}
                            </div>
                          ))}

                        {!idSettings && (
                          <div>
                            {data.events.map((event, index) =>
                              event.validation === 'validated' ? (
                                <div key={index} className="flex items-center">
                                  {event.organizer_id === userId && (
                                    <span
                                      onClick={() => {
                                        const dealsModal =
                                          document.getElementById(
                                            'addReview'
                                          ) as HTMLDialogElement | null;
                                        if (dealsModal) {
                                          dealsModal.showModal();
                                        } else {
                                          console.error(
                                            "L'élément avec l'ID \"addReview\" n'a pas été trouvé."
                                          );
                                        }
                                        console.log('event.id', event.id);
                                        setFormData({
                                          ...formData,
                                          event_id: parseInt(event.id),
                                          // rating: formData.rating,
                                          receiver_id: event.organizer_id,
                                          // review: formData.review,
                                        });
                                      }}
                                    >
                                      Laisser un avis
                                    </span>
                                  )}
                                  {/* {console.log('Données de la data :', data)}
                                  {console.log(
                                    "Données de l'événement :",
                                    event
                                  )} */}

                                  <EventCard
                                    image_url=""
                                    description=""
                                    city=""
                                    date=""
                                    region=""
                                    price={0}
                                    organizer={{
                                      name: '',
                                    }}
                                    available={false}
                                    key={index}
                                    {...event}
                                    validated={event.validation}
                                  />
                                  <PopupAddReview
                                    handleFormSubmit={(e) => {
                                      // console.log('e', e);
                                      // console.log('eventeventevent', event);
                                      handleFormSubmit(e, event);
                                    }}
                                    formData={formData}
                                    setFormData={setFormData}
                                  />
                                </div>
                              ) : (
                                ''
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {selectedTab === 3 && (
              <>
                <div className="flex space-x-4 items-center mb-2">
                  <input
                    type="radio"
                    id="option1"
                    name="options"
                    className="cursor-pointer h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                    value="tous"
                    checked={radioStatus === 'tous'}
                    onChange={(e) => setRadioStatus(e.target.value)}
                  />
                  <label
                    htmlFor="option1"
                    className="text-gray-700 cursor-pointer"
                  >
                    Tous
                  </label>

                  <input
                    type="radio"
                    id="option2"
                    name="options"
                    className="cursor-pointer h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                    value="pending"
                    checked={radioStatus === 'pending'}
                    onChange={(e) => setRadioStatus(e.target.value)}
                  />
                  <label
                    htmlFor="option2"
                    className="text-gray-700 cursor-pointer"
                  >
                    Deals en attentes
                  </label>

                  <input
                    type="radio"
                    id="option3"
                    name="options"
                    className="cursor-pointer h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                    value="validated"
                    checked={radioStatus === 'validated'}
                    onChange={(e) => setRadioStatus(e.target.value)}
                  />
                  <label
                    htmlFor="option3"
                    className="text-gray-700 cursor-pointer"
                  >
                    Deals validés
                  </label>

                  <input
                    type="radio"
                    id="option4"
                    name="options"
                    className="cursor-pointer h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                    value="refused"
                    checked={radioStatus === 'refused'}
                    onChange={(e) => setRadioStatus(e.target.value)}
                  />
                  <label
                    htmlFor="option4"
                    className="text-gray-700 cursor-pointer"
                  >
                    Deals refusés
                  </label>
                </div>
                <ArrayHandleArtistEvent
                  events={data.events}
                  radioStatus={radioStatus}
                  setSelectedTab={setSelectedTab}
                  selectedTab={3}
                />
              </>
            )}
          </div>

          {/* grid right */}
          <div className="col-span-12 md:col-span-4 my-10">
            <div>
              <ContactDetails
                zip_code={data?.zip_code}
                city={data.city}
                address={data.address}
                role={data.role}
                idSettings={idSettings}
                rolelogin={rolelogin}
              />

              <div className="bloc-white my-10">
                <h2 className="text-center text-black mb-3">En savoir plus</h2>
                <SocialMediaGroup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
