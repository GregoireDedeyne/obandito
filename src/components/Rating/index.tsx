import { StarIcon } from '@heroicons/react/20/solid';
import { Stars } from '../Stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { handleImg } from '../../utils/handleImg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Rating({ reviews, data }) {
  console.log('data', data);
  console.log('data events', data.events);
  console.log('reviews.lenght', reviews.length);
  console.log('reviews', reviews);

  return (
    <div className="bg-white p-10">
      <div>
        <div className="flex justify-between">
          <h2 className="">Evaluations Vérifiées</h2>
          <div>
            <Stars />
            <span> {reviews.length} évaluation</span>
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
                {data.events.map((event) => {
                  if (event.id == review.event_id) {
                    return event.artists.map((artist) => (
                      <div className="flex items-center py-3">
                        <img
                          key={artist.id}
                          src={handleImg(artist?.image_url)}
                          alt={artist?.image}
                          className="h-10 w-10 rounded-full bg-gray-100"
                        />

                        <h3 className="font-medium text-gray-900 px-3">
                          {artist.name}
                        </h3>
                        <span>
                          <FontAwesomeIcon
                            icon={faPencilAlt}
                            className=" cursor-pointer"
                            onClick={() => {
                              const settingsModal = document.getElementById(
                                'settings'
                              ) as HTMLDialogElement | null;
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
                      </div>
                    ));
                  }
                })}
              </div>
              <div>
                <p>
                  {/* <time dateTime={review.datetime}>{review.date}</time> */}
                </p>

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
                {/* <p className="">{review.rating} out of 5 stars</p> */}

                <div
                  className="prose prose-sm mt-4 max-w-none text-gray-500"
                  dangerouslySetInnerHTML={{ __html: review.review }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
