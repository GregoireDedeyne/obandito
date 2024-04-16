import { useState } from 'react';
import { ADD_REVIEW } from '../../graphQL/actions';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../store/redux-hook';

export function PopupAddReview({
  setOpenModal,
  idEvent,
  organizerId,
  artistId,
}) {
  const [review, setReview] = useState({
    event_id: +idEvent,
    receiver_id: +organizerId || +artistId,
    rating: 0,
    review: '',
  });
  const token = useAppSelector((state) => state.decodedToken.token);

  const [addReview] = useMutation(ADD_REVIEW, {
    onError: (error) => {
      toast.warn(error.message); // Afficher l'erreur avec react-toastify
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addReview({
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      variables: { input: review },
    });

    // window.location.href = location.pathname;
  };

  return (
    <div className=" z-50  absolute -top-1/2 left-1/2 translate-x-1/2 -translate-y-1/2">
      <div className=" bg-white relative">
        <h3 className="font-bold text-lg mb-8">Ajouter un avis</h3>
        <form onSubmit={handleSubmit} className="">
          <label className="form-control flex flex-col mb-5 text-black">
            <span>Laisser un avis</span>
            <input
              name="avis"
              type="text"
              onChange={(e) => setReview({ ...review, review: e.target.value })}
              placeholder="Votre avis"
              className="input input-bordered input-black bg-white text-black"
            />
          </label>

          <label
            className="form-control flex flex-col mb-5 text-black"
            htmlFor="rating"
          >
            <span>Rating</span>
            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              onChange={(e) =>
                setReview({ ...review, rating: +e.target.value })
              }
              placeholder="Votre rating (entre 0 et 5)"
              className="input input-bordered input-black bg-white text-black"
            />
          </label>

          <button className="btn btn-outline" type="submit">
            Envoyé
          </button>
        </form>

        <form onSubmit={handleSubmit} className="modal-backdrop">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="text-white bg-red-500 rounded-full w-7 h-7 flex items-center justify-center absolute top-7 right-7"
          >
            X
          </button>
        </form>
      </div>
    </div>
  );
}
