import { useState } from 'react';
import PopupEditDeals from '../PopupEditDeals';
import { HANDLEPOSTULATIONEVENT } from '../../graphQL/actions';
import { useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { handleImg } from '../../utils/handleImg';
import { useSelector } from 'react-redux';

/**
 * Function to handle an array of artists and events.
 *
 * @param {Object[]} events - The array of events to process.
 * @param {string} radioStatus - The status of the radio button.
 * @param {function} setFormData - The function to set form data.
 * @param {Object} formData -The form data to set.
 */

export function ArrayHandleArtistEvent({
  events,
  radioStatus,
  setFormData,
  formData,
}) {
  const token = useSelector((state) => state.decodedToken.token);

  // first state for validation status
  const [selectedStatus, setSelectedStatus] = useState('pending');

  // second state for setuserID after opening deals modals
  const [idUserStatus, setIdUserStatus] = useState(undefined);

  // third state for eventID after opening deals modals
  const [idEventStatus, setIdEventStatus] = useState(undefined);

  // call to apollo client
  const [HandlePostulationEvent] = useMutation(HANDLEPOSTULATIONEVENT);

  // check location for redirect
  const location = useLocation();

  // Form submit after validation status change
  const handleFormSubmitStatus = async (e) => {
    e.preventDefault();

    try {
      const { data } = await HandlePostulationEvent({
        variables: {
          artistId: idUserStatus,
          validation: selectedStatus,
          eventId: idEventStatus,
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      // close modal system
      const dealsModal = document.getElementById('deals');
      if (dealsModal) {
        dealsModal.close();
      } else {
        console.error("L'élément avec l'ID \"deals\" n'a pas été trouvé.");
      }
      window.location.href = location.pathname;

      console.log('Status à jour avec succès:', data);
    } catch (error) {
      console.error("Une erreur inattendue s'est produite");
    }
  };

  // function openreviewmodal with event and artist param
  const openReviewModal = (event, artist) => {
    const ReviewModal = document.getElementById('addReview');
    if (ReviewModal) {
      ReviewModal.showModal();
    } else {
      console.error("L'élément avec l'ID \"addReview\" n'a pas été trouvé.");
    }
    setFormData({
      ...formData,
      event_id: parseInt(event.id),
      receiver_id: parseInt(artist.id),
    });
  };

  // function opendealsmodal to validate/refused artist with event and artist param
  const openDealsModal = (artist, event) => {
    const dealsModal = document.getElementById('deals');
    if (dealsModal) {
      dealsModal.showModal();
    } else {
      console.error("L'élément avec l'ID \"deals\" n'a pas été trouvé.");
    }
    // update state value
    setIdUserStatus(parseInt(artist.id));
    setIdEventStatus(parseInt(event.id));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-gray-200  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Artiste
            </th>
            <th scope="col" className="px-6 py-3">
              Evenement
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {events?.map((event) =>
            event?.artists.map((artist) => {
              console.log('event', event);
              console.log('artist', artist);
              if (
                radioStatus === 'tous' ||
                (radioStatus === 'pending' &&
                  artist.validation === 'pending') ||
                (radioStatus === 'validated' &&
                  artist.validation === 'validated') ||
                (radioStatus === 'refused' && artist.validation === 'refused')
              ) {
                return (
                  <tr
                    className="bg-white border-b hover:bg-gray-50"
                    key={artist?.id}
                  >
                    <th scope="row" className="flex px-6 py-4 text-gray-900">
                      <img
                        className="hidden sm:block w-16 h-16 rounded-full object-cover"
                        src={handleImg(artist?.image_url)}
                        alt={artist?.image}
                      />
                      <div className="ps-3">
                        <div className="text-base font-semibold break-all">
                          {artist?.name}
                        </div>
                        <div className="font-normal text-gray-500 break-all">
                          {artist?.mail}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">{event.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {artist.validation === 'validated' ? (
                          <>
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                            <div>Validé</div>
                          </>
                        ) : artist.validation === 'pending' ? (
                          <>
                            <div className="h-2.5 w-2.5 rounded-full bg-orange-500 me-2"></div>
                            <div>En attente</div>
                          </>
                        ) : (
                          <>
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                            <div>Refusé</div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {event.finished && artist.validation === 'validated' ? (
                        <span
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                          onClick={() => openReviewModal(event, artist)}
                        >
                          Laisser un avis
                        </span>
                      ) : (
                        <span
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                          onClick={() => openDealsModal(artist, event)}
                        >
                          Edit
                        </span>
                      )}
                    </td>
                  </tr>
                );
              }
            })
          )}
        </tbody>
      </table>
      <PopupEditDeals
        handleFormSubmitStatus={handleFormSubmitStatus}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </div>
  );
}
