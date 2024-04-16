import { NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/redux-hook';
import { handleImg } from '../../utils/handleImg';
import { DELETE_POSTULATION } from '../../graphQL/actions';
import { useMutation } from '@apollo/client';
import { toast, ToastContainer } from 'react-toastify';

interface EventCardProps {
  image_url: string;
  name: string;
  description: string;
  city: string;
  date: string;
  region: string;
  price: number;
  organizer: { name: string };
  id: number;
  available: boolean;
  validated: string;
}

export function EventCard({
  image_url,
  name,
  description,
  city,
  date,
  region,
  organizer,
  price,
  id,
  available,
  validated,
  isArtist,
  setFormData,
  formData,
  event,
  isOrganizer,
  onLeaveReviewClick,
  finished,
}: EventCardProps) {
  const islogged: boolean = useAppSelector(
    (state) => state.decodedToken.islogged
  );

  const [deleteMutation] = useMutation(DELETE_POSTULATION, {
    onError: (error) => {
      toast.warn(error.message); // Afficher l'erreur avec react-toastify
    },
  });

  const location = useLocation();
  const token = useAppSelector((state) => state.decodedToken.token);
  const HandleDelete = async (id) => {
    const idN = parseInt(id);

    const { data } = await deleteMutation({
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      variables: { eventId: idN },
    });
    window.location.href = location.pathname;
  };

  return (
    <div className="w-full">
      <ToastContainer />

      <div className="px-6 py-4 my-2 w-full bg-white rounded-xl shadow-lg hover:border-purple-800 border-2 border-solid border-transparent">
        <div className="flex flex-col lg:flex-row items-center">
          <NavLink
            to={islogged === false ? '/login' : `/event/${id}`}
            className="overflow-hidden relative flex-shrink-0 w-full lg:w-72 aspect-w-16 aspect-h-9 lg:w-80"
          >
            <img
              loading="lazy"
              src={handleImg(image_url)}
              alt=""
              className="object-cover w-full h-full rounded-xl"
            />
          </NavLink>
          <div className="flex flex-col ml-0 lg:ml-5 mt-4 lg:mt-0 w-full">
            <div className="text-xl leading-6 text-slate-900">{name}</div>

            {validated && (
              <div className="mt-1.5 text-sm text-neutral-600 ">
                <span
                  className={`px-2 p-1 rounded-full text-black ${validated === 'validated' ? 'bg-green-500' : validated === 'pending' ? 'bg-orange-500' : 'bg-red-500'}`}
                >
                  {validated}
                </span>
                {validated === 'pending' && (
                  <button
                    className="z-40 bg-red-700 text-black rounded-xl ml-5 p-1 relative "
                    onClick={() => HandleDelete(id)}
                  >
                    {' '}
                    Supprimer ma postulation{' '}
                  </button>
                )}
              </div>
            )}

            {isArtist && finished && (
              <span
                onClick={() => {
                  const dealsModal = document.getElementById(
                    'addReview'
                  ) as HTMLDialogElement | null;
                  if (dealsModal) {
                    dealsModal.showModal();
                  } else {
                    console.error(
                      "L'élément avec l'ID \"addReview\" n'a pas été trouvé."
                    );
                  }
                  setFormData({
                    ...formData,
                    event_id: parseInt(event.id),
                    receiver_id: parseInt(event.organizer_id),
                  });
                }}
                className="cursor-pointer text-sm text-blue-500"
              >
                Laisser un avis
              </span>
            )}
            {isOrganizer && finished && (
              <span
                onClick={() => {
                  onLeaveReviewClick();
                }}
                className="cursor-pointer text-sm text-blue-500"
              >
                Laisser un avis
              </span>
            )}

            <div className="flex gap-1.5 mt-1.5 text-neutral-600 items-center">
              {available === true ? (
                <>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                  <div>Disponible</div>
                </>
              ) : (
                <>
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                  <div>Non disponible</div>
                </>
              )}

              <div>·</div>
              <div>Cachet : {price} €</div>
              <div>·</div>
              <div>{city}</div>
            </div>
            <p className="mt-1.5 leading-6 text-neutral-600 line-clamp-4">
              {description}
            </p>
            <div className="flex gap-1.5 mt-1.5 text-neutral-600">
              <div>Recherche sur la région de : {region}</div>
              <div className="text-neutral-600">·</div>
              <div>{organizer?.name}</div>
            </div>
            <div className="mt-1.5 text-zinc-500">{date}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
