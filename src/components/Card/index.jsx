import { NavLink } from 'react-router-dom';
import { handleImg } from '../../utils/handleImg';
import { useSelector } from 'react-redux';

/**
 * A reusable card component.
 *
 * @param {string} image - The URL of the image for the card.
 * @param {string} alt - The alternate text for the image.
 * @param {string} name - The name to display on the card.
 * @param {Object} style - The band style for the card.
 * @param {string} id - The unique identifier for the card.
 * @returns {JSX.Element} The card JSX element.
 */

export function Card({ image, alt, name, style, id }) {
  // call to redux and check if user islogged or not
  const islogged = useSelector((state) => state.decodedToken.islogged);

  return (
    <NavLink
      className=""
      to={islogged === false ? '/login' : `/profile/band/${id}`}
    >
      <div className="flex-col justify-center bg-white rounded-xl shadow-lg min-w-full md:min-w-[302px] border-2 border-solid border-transparent hover:border-purple-800">
        <div className="flex justify-end overflow-hidden relative flex-col px-5 pt-20 pb-5 w-full h-4/5 aspect-[0.74] ">
          <img
            loading="lazy"
            src={handleImg(image)}
            alt={alt}
            className="object-cover absolute inset-0 w-full h-full rounded-xl"
          />
          <div className="flex relative flex-col px-4 py-4 mt-52 w-full bg-white rounded-xl">
            <h2 className="text-xl font-medium leading-6 text-neutral-700">
              {name}
            </h2>
            <p className="mt-1 text-sm leading-5 text-neutral-600">{style}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
