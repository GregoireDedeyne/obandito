import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/redux-hook';

interface LocationItemProps {
  region: string;
  event_count: number;
}

const LocationItem: React.FC<LocationItemProps> = ({ region, event_count }) => (
  <NavLink to={`/region/${region}`}>
    <div className="flex gap-3.5 mt-2.5 hover:bg-zinc-300">
      <div className="flex-auto my-auto leading-6 text-zinc-500">
        {region}
        <span className="text-zinc-500"> ({event_count})</span>
      </div>
    </div>
  </NavLink>
);

export function Localisation({ locations }) {
  const islogged = useAppSelector((state) => state.decodedToken.islogged);

  return (
    <div className="hidden xl:flex flex-col justify-between  max-w-[255px]">
      <div className="flex flex-col px-5 w-full text-base">
        <h2 className="w-full text-xl font-semibold leading-6 text-neutral-700">
          Lieux
        </h2>
        {locations.map((location) => (
          <LocationItem
            key={`${location.region}-${location.region}`}
            {...location}
          />
        ))}
      </div>

      {islogged === false ? (
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              <section className="flex flex-col justify-center w-full">
                <div className="flex flex-col px-5 w-full">
                  <div className="w-full text-xl font-semibold leading-6 text-neutral-700">
                    Lorem ipsum dolor sit{' '}
                  </div>
                  <div className="mt-1 w-full text-base leading-6 text-neutral-600">
                    Corem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis.
                  </div>
                </div>{' '}
              </section>
            </div>
            <div className="justify-center self-center items-center">
              <NavLink to={'/subscribe'}>
                <button className="justify-center self-center items-center w-fit px-16 py-4 mt-3 text-base font-medium leading-7 text-center text-white whitespace-nowrap bg-rose-500  rounded-[800px] hover:bg-purple-800">
                  M'inscrire
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
