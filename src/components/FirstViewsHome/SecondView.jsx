import { NavLink } from 'react-router-dom';

/**
 * Component representing a step in a process.
 * @param {string} imageSrc - The source URL of the image for the step.
 * @param {number} stepNumber - The number of the step.
 * @param {string} description - The description of the step.
 * @param {boolean} [isHighlighted=false] - Whether the step is highlighted or not. Defaults to false.
 */

const Step = ({ imageSrc, stepNumber, description, isHighlighted = false }) => (
  <div className="flex gap-4 mt-5 max-md:flex-wrap mb-10">
    <img
      src={imageSrc}
      alt=""
      className="shrink-0 self-start w-12 aspect-square"
    />
    <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
      <div className="text-xl font-bold leading-7 text-neutral-600 max-md:max-w-full">
        Étape {stepNumber}
      </div>
      <div
        className={`mt-4 text-base leading-6 ${isHighlighted ? 'text-rose-500' : 'text-neutral-600'} max-md:max-w-full`}
      >
        {description}
      </div>
    </div>
  </div>
);

const steps = [
  {
    imageSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/4a9754bb8e047f34f9941bcc0e50f620721457b5c78d0b59f524684358ef9969?apiKey=877605d91b494696bd5bbaa7fb33442f&',
    stepNumber: 1,
    description: 'Créez votre compte.',
  },
  {
    imageSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/4a9754bb8e047f34f9941bcc0e50f620721457b5c78d0b59f524684358ef9969?apiKey=877605d91b494696bd5bbaa7fb33442f&',
    stepNumber: 2,
    description: 'Mettez à jour votre profil.',
    isHighlighted: true,
  },
  {
    imageSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/4a9754bb8e047f34f9941bcc0e50f620721457b5c78d0b59f524684358ef9969?apiKey=877605d91b494696bd5bbaa7fb33442f&',
    stepNumber: 3,
    description: 'Recherchez vos évènements ou le groupe pour votre évènement.',
  },
];

export function SecondView() {
  return (
    <section className=" py-20 bg-white max-md:px-5 ml-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 justify-around">
        <div className="flex flex-col w-5/12 max-md:ml-0 max-md:w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a403fc18a26f4c56595ad6e6a6be388350d66edb79dfa1e68ea1b14ed8dbeae?apiKey=877605d91b494696bd5bbaa7fb33442f&"
            alt="Descriptive alt text for the image"
            className=" w-full aspect-[0.8] max-md:mt-10 max-md:max-w-full max-sm:hidden"
          />
        </div>
        <div className="flex flex-col ml-5 w-3/12 h-full max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-10 max-md:mt-10 max-md:max-w-full">
            <h1 className="text-3xl font-bold leading-10 text-neutral-600 max-md:max-w-full mb-10">
              <span className="text-rose-500">O'</span>{' '}
              <span className="text-purple-800">Bandito</span> c'est tellement
              simple !
            </h1>
            <p className="mt-5 text-xl leading-6 text-neutral-600 max-md:max-w-full mb-10">
              En quelques clics seulement !
            </p>
            {steps.map((step, index) => (
              <Step key={index} {...step} />
            ))}
            <NavLink to={'/login'}>
              <button className="justify-center px-7 py-5 mt-14 w-fit text-base font-medium leading-7 text-center text-white bg-rose-500 border border-rose-500 border-solid rounded-[800px] max-md:px-5 max-md:mt-10 hover:bg-purple-800 hover:border-purple-800">
                Voir tous les évènements/groupes
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
