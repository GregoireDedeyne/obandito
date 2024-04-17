import { NavLink } from 'react-router-dom';

export function PreFooter() {
  return (
    <section className="flex overflow-hidden  relative flex-col justify-center items-center px-16 py-20 text-center text-white min-h-[309px] max-md:px-5">
      <div className="flex relative flex-col items-center max-w-full w-[503px]">
        <h2 className="self-stretch text-2xl font-bold leading-8 max-md:max-w-full">
          Plus de 250 000 artistes disponibles <br /> pour mettre de la musique
          dans vos événements
        </h2>
        <NavLink to={'/subscribe'}>
          <button className="justify-center px-7 py-3 mt-7 text-xl font-medium leading-9 text-black bg-white border border-white border-solid rounded-[800px] max-md:px-5 hover:bg-slate-300">
            Recevoir des devis
          </button>
        </NavLink>
        <p className="mt-2.5 text-sm leading-5">
          Rapide, simple et sans obligation
        </p>
      </div>
    </section>
  );
}
