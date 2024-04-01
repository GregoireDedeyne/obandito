import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/redux-hook';

interface EventCardProps {
  image_url: string;
  title: string;
  description: string;
  city: string;
  date: string;
  region: string;
  price: number;
  organizer: string;
  id: number;
  available: boolean;
}

export function EventCard({
  image_url,
  title,
  description,
  city,
  date,
  region,
  organizer,
  price,
  id,
  available,
}: EventCardProps) {
  const islogged = useAppSelector((state) => state.decodedToken.islogged);

  return (
    <NavLink to={islogged === false ? '/login ' : `/event/${id}`}>
      <div className="px-6 py-4 my-2 w-full bg-white rounded-xl shadow-lg max-md:pr-5 max-md:max-w-full border-2 border-solid border-transparent hover:border-purple-800">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[26%] max-md:ml-0 max-md:w-full">
            <div className="flex overflow-hidden relative flex-col grow justify-center items-center rounded-xl aspect-[0.93] w-[195px] max-md:mt-10">
              <img
                loading="lazy"
                src={`${import.meta.env.VITE_BACK_URL}${image_url}`}
                alt=""
                className="object-cover absolute inset-0 size-full"
              />
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[74%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-center self-stretch my-auto text-base font-medium leading-6 max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <h3 className="text-xl leading-6 text-slate-900 max-md:max-w-full">
                  {title}
                </h3>
                <div className="flex gap-1.5 self-start mt-1.5 text-neutral-600">
                  {available === true ? (
                    <>
                      {' '}
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bac38671888a46129a537a5a178fc1ef9ecfcd735f21eececc50cccff3b67569?apiKey=877605d91b494696bd5bbaa7fb33442f&"
                        alt=""
                        className="shrink-0 my-auto w-2.5 aspect-square"
                      />
                      <div>Disponible</div>
                    </>
                  ) : (
                    <>
                      {' '}
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bac38671888a46129a537a5a178fc1ef9ecfcd735f21eececc50cccff3b67569?apiKey=877605d91b494696bd5bbaa7fb33442f&"
                        alt=""
                        className="shrink-0 my-auto w-2.5 aspect-square"
                      />
                      <div>Non disponible</div>
                    </>
                  )}

                  <div>·</div>
                  <div>Cachet : {price} €</div>
                  <div>·</div>
                  <div>{city}</div>
                </div>
                <p className="mt-1.5 leading-6 text-neutral-600 max-md:max-w-full">
                  {description}
                </p>
                <div className="flex gap-1.5 self-start mt-1.5 text-neutral-600">
                  <div>Recherche sur la région de : </div>

                  <div>{region}</div>

                  <div className="text-neutral-600">·</div>
                  <div> {organizer?.name}</div>
                </div>
                <div className="mt-1.5 text-zinc-500 max-md:max-w-full">
                  {date}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
