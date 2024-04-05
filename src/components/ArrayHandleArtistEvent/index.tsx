import { useState } from 'react';
import { useAppSelector } from '../../store/redux-hook';
import PopupEditDeals from '../PopupEditDeals';
import { HANDLEPOSTULATIONEVENT } from '../../graphQL/actions';
import { useMutation } from '@apollo/client';

interface Artist {
  id: string;
  validation: string;
  image_url: string;
  name: string;
  mail: string;
}

interface Event {
  id: string;
  name: string;
  artists: Artist[];
}

interface ArrayHandleArtistEventProps {
  events: Event[];
  radioStatus: string;
}

export function ArrayHandleArtistEvent({
  events,
  radioStatus,
}: ArrayHandleArtistEventProps) {
  const token = useAppSelector((state) => state.decodedToken.token);

  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [idUserStatus, setIdUserStatus] = useState();
  const [idEventStatus, setIdEventStatus] = useState();

  const [HandlePostulationEvent, { loading, error }] = useMutation(
    HANDLEPOSTULATIONEVENT
  );

  const handleFormSubmitStatus = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
      console.log('Status à jour avec succès:', data);
    } catch (error) {
      console.error('Erreur:', error.message);
    }
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
                        src={`${import.meta.env.VITE_BACK_URL}${artist?.image_url}`}
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
                      <span
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => {
                          document.getElementById('deals').showModal();
                          setIdUserStatus(parseInt(artist.id));
                          setIdEventStatus(parseInt(event.id));
                        }}
                      >
                        Edit
                      </span>
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
