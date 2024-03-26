import { NavLink } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="flex justify-center items-center px-16 py-20 text-center max-md:px-5 bg-purple-800">
      <div className="flex flex-col justify-center max-w-full w-[808px]">
        <h1 className="justify-center text-4xl font-bold leading-10 text-white max-md:max-w-full">
          Sur O'Bandito, trouvez l'artiste/l'événement idéal <br /> pour mettre
          de la musique dans votre vie !
        </h1>
        <div className="flex flex-col justify-center self-center mt-14 max-w-full text-xl font-medium leading-7 text-white w-[232px] max-md:mt-10">
          <NavLink to={'/login'}>
            <button className="px-9 py-5 bg-rose-500 rounded-[800px] max-md:px-5 hover:bg-slate-300">
              <div className="w-48"> Trouver votre deal </div>
            </button>
          </NavLink>
        </div>
      </div>
    </section>
  );
}
