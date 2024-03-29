import { NavLink, useLoaderData, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import {
  GET_ARTISTE,
  GET_EVENTS,
  GET_ORGANIZER,
  GET_USER,
} from '../../graphQL/actions';
import { ThirdView } from '../FirstViewsHome/ThirdView';

export default function Profile() {
  const token = useSelector((state) => state.decodedToken.token);
  const role = useSelector(
    (state) => state.decodedToken.decodedData.payload.user.role
  );
  const { id } = useParams();
  const Id = parseInt(id);

  let loading, error, data;
  // console.log('id : ', id, 'role :', role);

  if (role === 'Organisateur') {
    ({ loading, error, data } = useQuery(GET_ORGANIZER, {
      variables: {
        organizerId: Id,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }));
  } else if (role === 'Artiste') {
    ({ loading, error, data } = useQuery(GET_ARTISTE, {
      variables: {
        artistId: Id,
      },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="bg-white">
        <div className="flex flex-col py-px w-full h-[300px] bg-cover">
          <img
            src="https://img.freepik.com/photos-gratuite/peinture-lac-montagne-montagne-arriere-plan_188544-9126.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="container mx-auto">
          <div className="avatar mt-[-50px]">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>

          <div className="flex justify-between my-5">
            <div className="flex flex-col">
              <h1>
                {role === 'Organisateur'
                  ? data.organizer.name
                  : data.artiste.name}
              </h1>
              <span>
                {role === 'Organisateur'
                  ? data.organizer.role.name
                  : data.artiste.role.name}
              </span>
              <span>
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                {` ${id} évaluations`}
              </span>
              <span>
                {/* <FontAwesomeIcon icon={faMapMarkerAlt} /> {region}, France */}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between">
                <NavLink className="btn-primary" to="/">
                  Proposer un deal
                </NavLink>
              </div>
            </div>
          </div>

          <div role="tablist" className="tabs tabs-bordered my-10">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab w-[180px] "
              aria-label="Présentation"
            />
            <div
              role="tabpanel"
              className="tab-content p-10 bg-color-gray_light"
            >
              <div className="grid grid-cols-12 md:gap-8">
                <div className="col-span-12 md:col-span-8 m-10">
                  <div>
                    <div className="bloc-white">
                      <h2>Présentation</h2>
                      <p>
                        {role === 'Organisateur'
                          ? data.organizer.description
                          : data.artiste.description}
                      </p>
                    </div>

                    <div className="bloc-white my-[50px]">
                      <h2>Musique & clips</h2>

                      <div className="spotify my-10">
                        <iframe
                          // style="border-radius:12px"
                          className="my-10"
                          src="https://open.spotify.com/embed/track/5DttTktPy0RMZPz4UNfFm4?utm_source=generator"
                          width="100%"
                          height="152"
                          frameBorder="0"
                          allowfullscreen=""
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        ></iframe>

                        <iframe
                          // style="border-radius:12px"
                          src="https://open.spotify.com/embed/track/57mq5FOiHSgZxoZWFYC50b?utm_source=generator"
                          width="100%"
                          height="152"
                          frameBorder="0"
                          allowfullscreen=""
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          className="my-10"
                        ></iframe>
                      </div>

                      <div className="youtube">
                        <iframe
                          width="100%"
                          height="500"
                          src="https://www.youtube.com/embed/CV-kYMr2Rf0?si=-gbhfGkVAfjwpE8q"
                          title="YouTube video player"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerpolicy="strict-origin-when-cross-origin"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>

                    <div className="bloc-white">
                      <h2>Gallerie photos</h2>

                      <div className="grid grid-cols-3 grid-rows-2 gap-4">
                        <div>
                          <img
                            className="object-cover w-full aspect-square"
                            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            alt="Burger"
                          />
                        </div>
                        <div className="col-start-2 row-start-2">
                          <img
                            className="object-cover w-full aspect-square"
                            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            alt="Burger"
                          />
                        </div>
                        <div className="col-start-2 row-start-1">
                          <img
                            className="object-cover w-full aspect-square"
                            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            alt="Burger"
                          />
                        </div>
                        <div className="col-start-1 row-start-2">
                          <img
                            className="object-cover w-full aspect-square"
                            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            alt="Burger"
                          />
                        </div>
                        <div className="col-start-3 row-start-1">
                          <img
                            className="object-cover w-full aspect-square"
                            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            alt="Burger"
                          />
                        </div>
                        <div className="row-start-2">
                          <img
                            className="object-cover w-full aspect-square"
                            src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                            alt="Burger"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 m-10">
                  <div>
                    <div className="bloc-white">
                      <h2>Coordonnées</h2>
                      <div className="adress flex flex-col">
                        <span className="mb-5">ADRESSE</span>
                        <span>
                          {role === 'Organisateur'
                            ? `${data.organizer.zip_code}, ${data.organizer.city}`
                            : `${data.artiste.zip_code}, ${data.artiste.city}`}
                        </span>

                        <span>France</span>
                      </div>
                      <div className="website">
                        <a href="https://www.youtube.com/">
                          https://www.youtube.com/
                        </a>
                      </div>

                      <div className="my-5">
                        <NavLink
                          className="btn-primary block text-center"
                          to="/"
                        >
                          Proposer un deal
                        </NavLink>
                      </div>
                    </div>

                    <div className="bloc-white my-10">
                      <h2 className="text-center">En savoir plus</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Evaluations"
              checked
            />
            <div
              role="tabpanel"
              className="tab-content p-10 bg-color-gray_light"
            >
              Evaluations
            </div> */}

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab w-[180px]"
              aria-label="Mes évènements"
            />
            <div
              role="tabpanel"
              className="tab-content p-10 bg-color-gray_light"
            >
              Mes évènements
              {/* <ThirdView
                events={dataaa.lastEvents}
                locations={dataaa.getCountNameEventsByRegion}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
