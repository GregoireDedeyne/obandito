import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/redux-hook';
import { handleImg } from '../../utils/handleImg';
import { DELETE_EVENT, DELETE_POSTULATION } from '../../graphQL/actions';
import { useMutation } from '@apollo/client';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { PopupAddReview } from '../PopupAddReview';

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
  organizerId,
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
  eventId,
}: EventCardProps) {
  const islogged: boolean = useAppSelector(
    (state) => state.decodedToken.islogged
  );

  const [deleteMutation] = useMutation(DELETE_POSTULATION, {
    onError: (error) => {
      toast.warn(error.message); // Afficher l'erreur avec react-toastify
    },
  });
  const [deleteMutationEvent] = useMutation(DELETE_EVENT, {
    onError: (error) => {
      toast.warn(error.message); // Afficher l'erreur avec react-toastify
    },
  });

  const location = useLocation();
  const token = useAppSelector((state) => state.decodedToken.token);
  const role = useAppSelector((state) => state.decodedToken.decodedData.role);
  const idUser = useAppSelector((state) => state.decodedToken.decodedData.id);
  const idSetting = useParams();
  const isMyProfil = () => (idSetting.id == idUser ? true : false);

  const HandleDelete = async (id) => {
    const idN = parseInt(id);
    if (role.toLowerCase() === 'artiste') {
      await deleteMutation({
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        variables: { eventId: idN },
      });
      window.location.href = location.pathname;
    } else {
      await deleteMutationEvent({
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        variables: { deleteEventId: idN },
      });

      window.location.href = location.pathname;
    }
  };
  const openReviewModal = () => {
    const ReviewModal = document.getElementById(
      'addReview'
    ) as HTMLDialogElement | null;
    if (ReviewModal) {
      ReviewModal.showModal();
    } else {
      console.error("L'élément avec l'ID \"addReview\" n'a pas été trouvé.");
    }
  };
  return (
    <div className="w-full relative">
      <ToastContainer />

      <div className="px-6 py-4 my-2 w-full bg-white rounded-xl shadow-lg hover:border-purple-800 border-2 border-solid border-transparent">
        <div className="flex flex-col lg:flex-row ">
          <NavLink
            to={islogged === false ? '/login' : `/event/${id}`}
            className="overflow-hidden relative flex-shrink-0 w-full aspect-w-16 aspect-h-9 lg:w-80"
          >
            <img
              loading="lazy"
              src={handleImg(image_url)}
              alt=""
              className="object-cover w-full h-full rounded-xl"
            />
          </NavLink>
          <NavLink
            to={islogged === false ? '/login' : `/event/${id}`}
            className="flex flex-col justify-between ml-0 lg:ml-5 mt-4 lg:mt-0 w-full"
          >
            <div className="text-xl leading-6 text-slate-900">{name}</div>
            {validated && (
              <div className="mt-1.5 text-sm text-neutral-600 ">
                <span
                  className={`px-2 p-1 rounded-full text-black ${validated === 'validated' ? 'bg-green-500' : validated === 'pending' ? 'bg-orange-500' : 'bg-red-500'}`}
                >
                  {validated}
                </span>
              </div>
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
              <div>{name}</div>
            </div>
            <div className="mt-1.5 text-zinc-500">{date}</div>
          </NavLink>
          <button
            className={
              window.location.pathname === '/' || !isMyProfil() || finished
                ? 'hidden'
                : 'text-red-700 text-sm flex w-fit h-fit border border-red-700 px-3 rounded-xl hover:bg-red-700 hover:text-white'
            }
            onClick={() => HandleDelete(id)}
          >
            Supprimer
          </button>
          <button
            className={
              window.location.pathname === '/' ||
              !isMyProfil() ||
              !finished ||
              role.toLowerCase() === 'organisateur'
                ? 'hidden'
                : 'text-yellow-500 text-sm w-60 h-fit border border-yellow-500 px-3 rounded-xl hover:bg-yellow-500 hover:text-white'
            }
            onClick={() => {
              openReviewModal();
              console.log(eventId, id, organizerId);
            }}
          >
            Laisser un avis
          </button>
          <PopupAddReview idEvent={+eventId} organizerId={+organizerId} />
        </div>
      </div>
    </div>
  );
}
