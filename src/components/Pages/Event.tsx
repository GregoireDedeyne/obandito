import { useMutation } from '@apollo/client';
import { useLoaderData } from 'react-router-dom';
import { POSTULATION_EVENT } from '../../graphQL/actions';
import { useAppSelector } from '../../store/redux-hook';

export function EventPage() {
  const token = useAppSelector((state) => state.decodedToken.token);

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

    console.log("j'ai postulé");
  };

  return (
    <div>
      <ul>
        <li> {eventdata?.event?.description}</li>
        <li>{eventdata?.event?.date}</li>
        <li>{eventdata?.event?.city}</li>
        <li>{eventdata?.event?.catering}</li>
        <li>{eventdata?.event?.available}</li>
        <li>{eventdata?.event?.image_url}</li>
        <li>{eventdata?.event?.name}</li>
        <li>{eventdata?.event?.occupied_slots}</li>
        <li>{eventdata?.event?.total_slots}</li>
        <li>{eventdata?.event?.zip_code}</li>
        <li>{eventdata?.event?.address}</li>
        <li>{eventdata?.event?.organizer?.name}</li>

        <li>{eventdata?.event?.region}</li>
        <li>{eventdata?.event?.price}</li>
      </ul>

      <button onClick={handleSubmit}> Postuler à l'évènement </button>
    </div>
  );
}
