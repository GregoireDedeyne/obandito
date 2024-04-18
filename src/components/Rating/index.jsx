import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { Stars } from '../Stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { handleImg } from '../../utils/handleImg';
import { UPDATE_REVIEW } from '../../graphQL/actions';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { PopupEditReview } from '../PopupEditReview';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Component for displaying ratings and reviews.
 * @param {Array} reviews - Array of review objects.
 * @param {Object} data - Data object containing information about events.
 * @param {Object} formData - Form data for submitting new reviews.
 * @param {Function} setFormData - Function to update form data.
 * @param {string} userId - ID of the current user.
 */

export function Rating({
  reviews,
  dataArtistOrOrganize,
  formData,
  setFormData,
  userId,
  role,
}) {
  const [UpdateReview, { loading, error }] = useMutation(UPDATE_REVIEW);
  const token = useSelector((state) => state.decodedToken.token);
  const [ReviewId, setReviewId] = useState();

  const handleFormSubmitReview = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        rating: formData.rating,
        review: formData.review,
      };
      await UpdateReview({
        variables: {
          input: {
            id: ReviewId,
            ...updatedData,
          },
        },
        context: { headers: { Authorization: `Bearer ${token}` } },
      });

      const settingsModal = document.getElementById('editReview');
      if (settingsModal) {
        settingsModal.close();
      } else {
        console.error("L'élément avec l'ID \"editReview\" n'a pas été trouvé.");
      }
      window.location.href = location.pathname;
    } catch (error) {
      console.error("Une erreur inattendue s'est produite");
    }
  };

  return (
    <div className="bg-white p-10">
      <div>
        <div className="flex flex-col sm:flex-row  sm:justify-between">
          <h2 className="">Evaluations Vérifiées</h2>
          <div className="flex flex-col">
            <span>{`${reviews.length} `}évaluations</span>
            <Stars reviews={reviews} />
          </div>
        </div>

        <div className="">
          {reviews.map((review, reviewIdx) => (
            <div
              key={review.id}
              className={classNames(
                reviewIdx === 0 ? '' : 'border-t border-gray-200',
                'flex-1 space-x-4 text-sm text-gray-500 mt-5'
              )}
            >
              <div className="flex-none">
                {dataArtistOrOrganize.events.map((event) => {
                  if (parseInt(event.id) === review.event_id) {
                    return role === 'Organisateur' ? (
                      event.artists.map((artist) => (
                        <div className="flex items-center py-3" key={artist.id}>
                          <img
                            src={handleImg(artist?.image_url)}
                            alt={artist?.image}
                            className="h-10 w-10 rounded-full bg-gray-100 object-cover"
                          />
                          <h3 className="font-medium text-gray-900 px-3">
                            {artist.name}
                          </h3>

                          {artist.id == userId && (
                            <span>
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                className="cursor-pointer"
                                onClick={() => {
                                  setReviewId(review.id);
                                  const settingsModal =
                                    document.getElementById('editReview');
                                  if (settingsModal) {
                                    settingsModal.showModal();
                                  } else {
                                    console.error(
                                      "L'élément avec l'ID \"settings\" n'a pas été trouvé."
                                    );
                                  }
                                }}
                              />
                            </span>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center py-3">
                        <img
                          src={handleImg(event.organizer?.image_url)}
                          alt={event.organizer?.image}
                          className="h-10 w-10 rounded-full bg-gray-100 object-cover"
                        />
                        <h3 className="font-medium text-gray-900 px-3">
                          {event.organizer.name}
                        </h3>
                      </div>
                    );
                  }
                })}
              </div>

              <div>
                <div className="mt-4 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        review.rating > rating
                          ? 'text-yellow-400'
                          : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div
                  className="prose prose-sm mt-4 max-w-none text-gray-500"
                  dangerouslySetInnerHTML={{ __html: review.review }}
                />
              </div>
            </div>
          ))}
          <PopupEditReview
            handleFormSubmitReview={handleFormSubmitReview}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </div>
  );
}
