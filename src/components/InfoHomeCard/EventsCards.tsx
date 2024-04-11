import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/redux-hook';
import { handleImg } from '../../utils/handleImg';

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
}: EventCardProps) {
  const islogged = useAppSelector((state) => state.decodedToken.islogged);

  return (
    <NavLink
      to={islogged === false ? '/login' : `/event/${id}`}
      className="w-full"
    >
      <div className="px-6 py-4 my-2 w-full bg-white rounded-xl shadow-lg hover:border-purple-800 border-2 border-solid border-transparent">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="overflow-hidden relative flex-shrink-0 w-full lg:w-72 aspect-w-16 aspect-h-9 lg:w-80">
            <img
              loading="lazy"
              src={handleImg(image_url)}
              alt=""
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <div className="flex flex-col ml-0 lg:ml-5 mt-4 lg:mt-0 w-full">
            <div className="text-xl leading-6 text-slate-900">{name}</div>

            {validated && (
              <div className="mt-1.5 text-sm text-neutral-600 ">
                <span
                  className={`px-2 rounded-full text-black ${validated === 'validated' ? 'bg-green-500' : validated === 'pending' ? 'bg-orange-500' : 'bg-red-500'}`}
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
              <div>{organizer?.name}</div>
            </div>
            <div className="mt-1.5 text-zinc-500">{date}</div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
