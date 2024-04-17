import ContactDetails from '../ContactDetails';
import { ArrayHandleArtistEvent } from '../ArrayHandleArtistEvent';
import ProfilContentBlock from '../ProfilContentBlock';
import { useState } from 'react';
import { EventCard } from '../InfoHomeCard/EventsCards';
import SocialMediaGroup from '../SocialMediaGroup';
import { setSelectedTab } from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { Rating } from '../Rating';
import { ADD_REVIEW } from '../../graphQL/actions';
import { PopupAddReview } from '../PopupAddReview';

export function TabsContent({
  data,
  idSettings,
  role,
  rolelogin,
  userId,
  token,
  reviews,
  id,
}) {
  setSelectedTab;
  const [radioStatus, setRadioStatus] = useState('tous');
  const [eventFiltered, setEventFiltered] = useState(data.events);
  const location = useLocation();

  const [
    addReviewMutation,
    { data: addReviewData, loading: addReviewLoading, error: addReviewError },
  ] = useMutation(ADD_REVIEW);

  const dispatch = useDispatch();

  const handleTabClick = (i) => {
    dispatch(setSelectedTab(i));
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
      // Filtrer les propriétés null dans formData
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
      setEventFiltered(data.events);
    } else {
      const filtered = data.events.filter((event) => {
        if (event.validation.toLowerCase() === filter.toLowerCase()) {
          return event;
        }
      });
      setEventFiltered(filtered);
    }
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

            {selectedTab === 1 && (
              <Rating
                reviews={reviews}
                data={data}
                formData={formData}
                setFormData={setFormData}
                userId={userId}
                role={role}
              />
            )}

            {selectedTab === 2 && (
              <>
                {role === 'Artiste' && idSettings && (
                  <div className="flex space-x-4 items-center mb-2">
                    <input
                      type="radio"
                      id="option1"
                      name="options"
                      value="tous"
                      className="cursor-pointer h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                      checked={radioStatus === 'tous'}
                      onChange={(e) => handleFilterEvents(e.target.value)}
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
                      onChange={(e) => handleFilterEvents(e.target.value)}
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
                      onChange={(e) => handleFilterEvents(e.target.value)}
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
                      onChange={(e) => handleFilterEvents(e.target.value)}
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
                  <h2>Evènements</h2>

                  {eventFiltered.map((event, index) => {
                    const isArtist = event.artists.some(
                      (artist) => +artist.id === +userId
                    );

                    return (
                      <div className="flex" key={index}>
                        {(!idSettings && event.validation === 'validated') ||
                        idSettings ? (
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
                            idSettings={idSettings}
                            organizerId={event.organizer_id}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
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
