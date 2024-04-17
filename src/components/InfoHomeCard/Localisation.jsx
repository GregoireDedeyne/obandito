import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LocationItem = ({ region, event_count }) => (
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
  const islogged = useSelector((state) => state.decodedToken.islogged);

  return (
    <div className="hidden xl:flex flex-col justify-between  max-w-[255px]">
      <div className="flex flex-col px-5 w-full text-base">
        <h2 className="w-full text-xl font-semibold leading-6 text-neutral-700">
          Lieux
        </h2>
        <div className="flex gap-3.5 mt-2.5 hover:bg-zinc-300">
          <div className="flex-auto my-auto leading-6 text-zinc-500">
            <NavLink to={'/'}> Enlever les filtres </NavLink>{' '}
          </div>
        </div>
        {locations.map((location) => (
          <LocationItem
            key={`${location.region}-${location.region}`}
            {...location}
          />
        ))}
      </div>

      {islogged === false ? (
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-col w-full mt-5">
            <div className="flex flex-col w-full">
              <section className="flex flex-col justify-center w-full">
                <div className="flex flex-col px-5 w-full">
                  <div className="w-full text-xl font-semibold leading-6 text-neutral-700">
                    Un évènement dans votre région ?{' '}
                  </div>
                  <div className="w-full text-base leading-6 text-neutral-600 mt-3">
                    Bienvenue dans notre plateforme de mise en relation
                    artistique, où la passion et la créativité se rencontrent
                    pour façonner des expériences inoubliables. Nous sommes
                    fiers de faciliter les connexions entre les talents
                    émergents de notre région et les organisateurs d'événements
                    à la recherche d'actes uniques et inspirants
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
