import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  const role = useSelector(
    (state) => state.decodedToken.decodedData.payload.user.role
  );
  const region = useSelector(
    (state) => state.decodedToken.decodedData.payload.user.region
  );
  const zip_code = useSelector(
    (state) => state.decodedToken.decodedData.payload.user.zip_code
  );
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
              <h1 className="h1">Tiphanie S.</h1>
              <span>{role}</span>
              <span>
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" /> nb
                évaluations
              </span>
              <span>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {region}, France
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
              className="tab"
              aria-label="Présentation"
            />
            <div
              role="tabpanel"
              className="tab-content p-10 bg-color-gray_light"
            >
              <div className="bloc-white">
                <h2 className="h2">Présentation</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Eu non diam phasellus vestibulum lorem. Faucibus turpis in eu
                  mi. Mattis rhoncus urna neque viverra justo. Dui vivamus arcu
                  felis bibendum ut tristique. Fringilla urna porttitor rhoncus
                  dolor purus non. Sit amet commodo nulla facilisi nullam. At
                  erat pellentesque adipiscing commodo. Vitae congue mauris
                  rhoncus aenean vel elit scelerisque mauris pellentesque. Proin
                  sed libero enim sed faucibus turpis. Amet consectetur
                  adipiscing elit duis tristique. Purus faucibus ornare
                  suspendisse sed nisi lacus sed viverra tellus. Erat nam at
                  lectus urna duis convallis convallis tellus id. Egestas
                  pretium aenean pharetra magna ac placerat vestibulum. Ac odio
                  tempor orci dapibus. Elit ullamcorper dignissim cras tincidunt
                  lobortis feugiat vivamus at. Nunc scelerisque viverra mauris
                  in aliquam sem. Nunc lobortis mattis aliquam faucibus purus in
                  massa tempor nec. Vitae turpis massa sed elementum. Amet
                  tellus cras adipiscing enim eu turpis egestas. Massa tincidunt
                  dui ut ornare lectus sit amet est placerat.
                </p>
              </div>

              <div className="bloc-white">
                <h2 className="h2">Musique & clips</h2>
                <p>Spotify</p>
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

              <div className="bloc-white">
                <h2 className="h2">Gallerie photos</h2>

                <div className="carousel rounded-box">
                  <div className="carousel-item">
                    <img
                      src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                      alt="Burger"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                      alt="Burger"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
                      alt="Burger"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
                      alt="Burger"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
                      alt="Burger"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
                      alt="Burger"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
                      alt="Burger"
                    />
                  </div>
                </div>
              </div>
            </div>

            <input
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
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Evènements remportés"
            />
            <div
              role="tabpanel"
              className="tab-content p-10 bg-color-gray_light"
            >
              Evènements remportés
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
