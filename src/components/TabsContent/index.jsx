import ContactDetails from '../ContactDetails';
import { ArrayHandleArtistEvent } from '../ArrayHandleArtistEvent';
import ProfilContentBlock from '../ProfilContentBlock';
import { useState } from 'react';
import { EventCard } from '../InfoHomeCard/EventsCards';
import { setSelectedTab } from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { Rating } from '../Rating';
import { ADD_REVIEW } from '../../graphQL/actions';
import { PopupAddReview } from '../PopupAddReview';

/**
 * Component for displaying content within tabs.
 * @param {Array} data - An array of data to be displayed within the tabs.
 * @param {string} idSettings - The ID settings for the tabs.
 * @param {string} role - The role of the user.
 * @param {string} rolelogin - The login role of the user.
 * @param {string} userId - The ID of the user.
 * @param {string} token - The authentication token of the user.
 * @param {Array} reviews - An array of reviews.
 * @param {string} id - The ID of the component.
 */

export function TabsContent({
  dataArtistOrOrganize,
  myProfile,
  role,
  myRole,
  userId,
  token,
  reviews,
}) {
  setSelectedTab;
  const [radioStatus, setRadioStatus] = useState('tous');
  const [eventFiltered, setEventFiltered] = useState(
    dataArtistOrOrganize.events
  );
  const location = useLocation();

  const [
    addReviewMutation,
    { data: addReviewData, loading: addReviewLoading, error: addReviewError },
  ] = useMutation(ADD_REVIEW);

  const dispatch = useDispatch();

  // dispatch selectedTab on click to switch case
  const handleTabClick = (name) => {
    dispatch(setSelectedTab(name));
  };

  const selectedTab = useSelector((state) => state.decodedToken.selectedTab);

  const [formData, setFormData] = useState({
    event_id: 0,
    receiver_id: 0,
    rating: 0,
    review: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // filter null entries from data
      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value !== null)
      );

      setFormData({
        ...formData,
        rating: formData.rating,
        review: formData.review,
      });

      const { data } = await addReviewMutation({
        variables: { input: { ...filteredData } },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });

      window.location.href = location.pathname;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Une erreur inattendue s'est produite");
      }
    }
  };

  const handleFilterEvents = (filter) => {
    setRadioStatus(filter);
    if (filter === 'tous') {
      setEventFiltered(dataArtistOrOrganize.events);
    } else {
      const filtered = dataArtistOrOrganize.events.filter((event) => {
        if (event.validation.toLowerCase() === filter.toLowerCase()) {
          return event;
        }
      });
      setEventFiltered(filtered);
    }
  };

  const inputTabData = {
    tabs: [
      {
        ariaLabel: 'Présentation',
        indexInput: 0,
      },
      {
        ariaLabel: 'Évaluation',
        indexInput: 1,
      },
      {
        ariaLabel: 'Évènements',
        indexInput: 2,
      },
      {
        ariaLabel: 'Deals',
        indexInput: 3,
      },
    ],
    sortDeals: [
      {
        id: 1,
        value: 'tous',
        name: 'Tous',
      },
      {
        id: 2,
        value: 'pending',
        name: 'Deals en attentes',
      },
      {
        id: 3,
        value: 'validated',
        name: 'Deals validés',
      },
      {
        id: 4,
        value: 'refused',
        name: 'Deals refusés',
      },
    ],
    sortDealsOrganizer: [
      {
        id: 1,
        value: 'tous',
        name: 'Tous',
      },
      {
        id: 2,
        value: 'pending',
        name: 'En attente',
      },
      {
        id: 3,
        value: 'validated',
        name: 'Validées',
      },
      {
        id: 4,
        value: 'refused',
        name: 'Refusées',
      },
    ],
  };

  return (
    <>
      <ToastContainer />
      <PopupAddReview
        handleFormSubmit={(e) => {
          handleFormSubmit(e, event);
        }}
        formData={formData}
        setFormData={setFormData}
      />
      <div role="tablist" className="tabs-bordered container mx-auto">
        {inputTabData.tabs.map((inputTab) => {
          if (
            inputTab.ariaLabel === 'Deals' &&
            (!myProfile || role !== 'Organisateur')
          ) {
            return null;
          }
          return (
            <input
              key={inputTab.indexInput}
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label={inputTab.ariaLabel}
              checked={selectedTab === inputTab.indexInput}
              onChange={() => handleTabClick(inputTab.ariaLabel)}
            />
          );
        })}
      </div>

      <div className="bg-color-gray_light flex-1  px-5">
        <div className="grid grid-cols-12 md:gap-8 container mx-auto">
          {/* grid left */}
          <div className="col-span-12 md:col-span-8 mt-10 mb-5 md:my-10">
            {selectedTab === 'Présentation' && (
              <>
                <ProfilContentBlock
                  title="Présentation"
                  spotify=""
                  youtube=""
                  description={dataArtistOrOrganize.description}
                />
                {role === 'Artiste' ? (
                  <ProfilContentBlock
                    title="Musiques & clips"
                    spotify={dataArtistOrOrganize.spotify_link}
                    youtube={dataArtistOrOrganize.youtube_link}
                    description=""
                  />
                ) : (
                  ''
                )}
              </>
            )}

            {selectedTab === 'Évaluation' && (
              <Rating
                reviews={reviews}
                dataArtistOrOrganize={dataArtistOrOrganize}
                formData={formData}
                setFormData={setFormData}
                userId={userId}
                role={role}
              />
            )}

            {selectedTab === 'Évènements' && (
              <>
                {role === 'Artiste' && myProfile && (
                  <div className="flex space-x-4 items-center mb-2 items-baseline">
                    {inputTabData.sortDeals.map((dealsInput) => {
                      return (
                        <div
                          key={dealsInput.id}
                          className="flex flex-col items-center sm:flex-row"
                        >
                          <input
                            type="radio"
                            id={dealsInput.id}
                            name="options"
                            className="cursor-pointer h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                            value={dealsInput.value}
                            checked={radioStatus === dealsInput.value}
                            onChange={(e) => handleFilterEvents(e.target.value)}
                          />
                          <label
                            htmlFor={dealsInput.id}
                            className="text-gray-700 cursor-pointer text-center sm:pl-1"
                          >
                            {dealsInput.name}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="bloc-white">
                  <h2>Évènements</h2>
                  {eventFiltered.length > 0 ? (
                    eventFiltered.map((event) => {
                      const isArtist = event.artists.some(
                        (artist) => +artist.id === +userId
                      );

                      return (
                        <div className="flex" key={event.id}>
                          {(!myProfile && event.validation === 'validated') ||
                          myProfile ? (
                            <EventCard
                              eventId={event.id}
                              available={false}
                              validated={event.validation}
                              {...event}
                              setFormData={setFormData}
                              formData={formData}
                              isArtist={isArtist}
                              event={event}
                              finished={event.finished}
                              organizerId={event.organizer_id}
                            />
                          ) : null}
                        </div>
                      );
                    })
                  ) : (
                    <p>L'artiste n'est rattaché à aucun évènement.</p>
                  )}
                </div>
              </>
            )}

            {selectedTab === 'Deals' && (
              <>
                <div className="flex space-x-4 items-center mb-2 items-baseline">
                  {inputTabData.sortDealsOrganizer.map((dealsInput) => {
                    return (
                      <div
                        key={dealsInput.id}
                        className="flex flex-col items-center sm:flex-row"
                      >
                        <input
                          type="radio"
                          id={dealsInput.id}
                          name="options"
                          className="cursor-pointer h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                          value={dealsInput.value}
                          checked={radioStatus === dealsInput.value}
                          onChange={(e) => setRadioStatus(e.target.value)}
                        />
                        <label
                          htmlFor={dealsInput.id}
                          className="text-gray-700 cursor-pointer text-center sm:pl-1"
                        >
                          {dealsInput.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <ArrayHandleArtistEvent
                  events={dataArtistOrOrganize.events}
                  radioStatus={radioStatus}
                  setSelectedTab={setSelectedTab}
                  selectedTab={3}
                  setFormData={setFormData}
                  formData={formData}
                />
              </>
            )}
          </div>

          {/* grid right */}
          <div className="col-span-12 md:col-span-4 my-10">
            <div>
              <ContactDetails
                zip_code={dataArtistOrOrganize?.zip_code}
                city={dataArtistOrOrganize.city}
                address={dataArtistOrOrganize.address}
                role={dataArtistOrOrganize.role}
                myProfile={myProfile}
                myRole={myRole}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
