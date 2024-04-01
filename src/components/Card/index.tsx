import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/redux-hook';

export function Card({ image, alt, name, style, id }) {
  const islogged = useAppSelector((state) => state.decodedToken.islogged);
  console.log(image, name, style);

  return (
    <NavLink to={islogged === false ? '/login' : `/profile/band/${id}`}>
      <div className="flex flex-col justify-center bg-white rounded-xl shadow-lg max-w-[302px] border-2 border-solid border-transparent hover:border-purple-800">
        <div className="flex justify-end overflow-hidden relative flex-col px-5 pt-20 pb-5 w-full h-4/5 aspect-[0.74]">
          <img
            loading="lazy"
            src={`${import.meta.env.VITE_BACK_URL}${image}`}
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
