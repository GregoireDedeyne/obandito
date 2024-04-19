import { NavLink } from 'react-router-dom';

export function CallToAction() {
  return (
    <div className="flex justify-center items-center px-16 py-14 mt-4 w-full text-base text-center rounded-xl border-2 border-gray-300 border-dashed max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col items-center w-full max-w-[594px] max-md:max-w-full">
        <h2 className="self-stretch text-xl font-bold leading-6 text-neutral-600 max-md:max-w-full">
          Vous cherchez un artiste ? Déposez un évènement gratuitement
        </h2>
        <p className="mt-3 leading-[150%] text-zinc-500 max-md:max-w-full">
          Vous recevrez une quinzaine de demande en quelques minutes
        </p>
        <NavLink to={'login'}>
          <button className="justify-center px-8 py-4 mt-3 font-medium text-white bg-rose-500 leading-[175%] rounded-[800px] max-md:px-5 hover:bg-purple-800">
            Déposer un évènement
          </button>
        </NavLink>
      </div>
    </div>
  );
}
