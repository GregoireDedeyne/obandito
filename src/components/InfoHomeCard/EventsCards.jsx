import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { handleImg } from '../../utils/handleImg';
import { DELETE_EVENT, DELETE_POSTULATION } from '../../graphQL/actions';
import { useMutation } from '@apollo/client';
import { toast, ToastContainer } from 'react-toastify';

/**
 * Component representing an event card.
 * @param {string} image_url - The URL of the event image.
 * @param {string} name - The name of the event.
 * @param {string} description - The description of the event.
 * @param {string} city - The city where the event takes place.
 * @param {string} date - The date of the event.
 * @param {string} region - The region where the event takes place.
 * @param {string} organizerId - The ID of the event organizer.
 * @param {number} price - The price of the event.
 * @param {string} id - The ID of the event.
 * @param {boolean} available - Whether the event is available.
 * @param {boolean} validated - Whether the event is validated.
 * @param {function} setFormData - Function to set form data.
 * @param {object} formData - The form data.
 * @param {boolean} finished - Whether the event is finished.
 * @param {string} eventId - The ID of the event.
 */

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
  setFormData,
  formData,
  finished,
  isArtist,
  eventId,
}) {
  // check if user is logged
  const islogged = useSelector((state) => state.decodedToken.islogged);

  const [deleteMutation] = useMutation(DELETE_POSTULATION, {
    onError: (error) => {
      toast.warn(error.message);
    },
  });

  const [deleteMutationEvent] = useMutation(DELETE_EVENT, {
    onError: (error) => {
      toast.warn(error.message);
    },
  });

  const location = useLocation();

  const token = useSelector((state) => state.decodedToken.token);
  const role = useSelector((state) => state.decodedToken.decodedData.role);
  const idUser = useSelector((state) => state.decodedToken.decodedData.id);

  const idSetting = useParams();
  // function to check if it's userpage
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

  const openReviewModal = (eventId, organizerId) => {
    setFormData({
      ...formData,
      event_id: parseInt(eventId),
      receiver_id: parseInt(organizerId),
    });
    const ReviewModal = document.getElementById('addReview');
    if (ReviewModal) {
      ReviewModal.showModal();
    } else {
      console.error("L'élément avec l'ID \"addReview\" n'a pas été trouvé.");
    }
    console.log(eventId);
  };
  return (
    <div className="w-full relative">
      <ToastContainer />

      <div className="px-4 py-4 my-2 w-full bg-white rounded-xl shadow-lg hover:border-purple-800 border-2 border-solid border-transparent xl:px-6">
        <div className="flex flex-col lg:flex-row">
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
          <div className="flex flex-col w-full">
            <NavLink
              to={islogged === false ? '/login' : `/event/${id}`}
              // className="flex flex-col justify-between ml-0 lg:ml-5 mt-4 mb-5 lg:mt-0 w-full "
              className="flex flex-col justify-between mt-4 w-full lg:mt-0 lg:p-5 "
            >
              {/*Validated */}
              <div className="flex justify-between mb-3 flex-col sm:flex-row lg:flex-col  xl:flex-row ">
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
              </div>
              {/* End validated */}

              <div className="flex gap-1.5 mt-1.5 text-neutral-600 flex-col justify-between width-500:flex-row width-500:items-center lg:flex-col lg:items-start 2xl:flex-row 2xl:items-center">
                {available === true ? (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                    <div>Disponible</div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                      <div>Non disponible</div>
                    </div>
                  </>
                )}

                <div className="hidden width-500:flex lg:hidden 2xl:flex">
                  ·
                </div>
                <div>Cachet : {price} €</div>
                <div className="hidden width-500:flex lg:hidden 2xl:flex">
                  ·
                </div>
                <div>{city}</div>
              </div>
              <p className="my-5 leading-6 text-neutral-600 line-clamp-4">
                {description}
              </p>
              <div className="flex gap-1.5 mt-1.5 text-neutral-600">
                <div>Recherche sur la région de : {region}</div>
              </div>
              <div className="mt-1.5 text-zinc-500">{date}</div>
            </NavLink>
            {/* <div> */}
            <button
              className={
                window.location.pathname === '/' || !isMyProfil() || finished
                  ? 'hidden'
                  : 'w-auto text-center text-red-700 text-sm w-60 h-fit border border-red-700 px-3 rounded-xl hover:bg-red-700 hover:text-white mt-3 lg:ml-5 lg:mt-0'
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
                !isArtist ||
                role.toLowerCase() === 'organisateur'
                  ? 'hidden'
                  : 'w-auto text-center text-yellow-500 text-sm w-60 h-fit border border-yellow-500 px-3 rounded-xl hover:bg-yellow-500 hover:text-white mt-3 lg:ml-5 lg:mt-0'
              }
              onClick={() => {
                openReviewModal(+eventId, +organizerId);
              }}
            >
              Laisser un avis
            </button>
          </div>
          {/* </div> */}
          {/* <PopupAddReview idEvent={+eventId} organizerId={+organizerId} /> */}
        </div>
      </div>
    </div>
  );
}
