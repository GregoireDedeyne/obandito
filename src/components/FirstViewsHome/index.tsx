import { NavLink } from 'react-router-dom';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={className} />
);

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export function FirstViewHome() {
  return (
    <div className="flex flex-col py-px max-md:max-w-full bg-cover">
      <header className="flex overflow-hidden relative flex-col justify-end pt-16 pb-5 w-full min-h-[575px] max-md:px-5 max-md:max-w-full">
        <div className="relative pb-8 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex relative flex-col justify-center grow mt-16 text-5xl font-medium max-md:mt-10 max-md:max-w-full max-md:text-4xl">
                <Text className="mr-5 leading-[55px] text-zinc-800 max-md:mr-2.5 max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
                  Artistes et Organisations étaient faits pour se{' '}
                </Text>
                <Text className="justify-center	 h-20 self-start px-8 pt-2.5 pb-2 mt-3.5 whitespace-nowrap bg-rose-500 leading-[100%] rounded-[50px] text-neutral-100 max-md:px-5 max-md:text-4xl">
                  rencontrer
                </Text>
                <Text className="mt-14 text-xl leading-6 text-neutral-600 max-md:mt-10 max-md:max-w-full">
                  Trouvez le talent parfait pour animer votre événement OU
                  trouvez l'événement parfait à animer !
                </Text>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fee00546c6051176f7bbb78ff989eb59d0b6c421c898d211075a02fd32f2eb01?apiKey=877605d91b494696bd5bbaa7fb33442f&"
                alt="Featured image"
                className="w-full aspect-[1.61] max-md:mt-10 max-md:max-w-full"
              />
            </div>
          </div>
        </div>
        <div className="relative px-10 py-8 mt-1.5 bg-white shadow-xl rounded-[66px] max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
              <div className="flex relative grow gap-5 justify-center max-md:flex-wrap max-md:mt-10">
                <label className="flex flex-1 flex-auto gap-3 px-6 py-3.5 bg-white border-2 border-solid border-neutral-200 rounded-[50px] max-md:pr-5">
                  <div className="flex justify-center items-center">
                    <Image
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2d7ea876d6cb2cdb98586f2ac7d9953943e488214007acf3f27fa19c5dec565?apiKey=877605d91b494696bd5bbaa7fb33442f&"
                      alt="Search icon"
                      className="aspect-square w-[21px]"
                    />
                  </div>
                  <input
                    className="justify-center my-auto text-base text-neutral-500 bg-white w-full"
                    placeholder='Essayez "Groupe de rock"...'
                  ></input>
                </label>

                <div className="flex flex-col flex-1 grow shrink-0 justify-center basis-0 w-fit">
                  <div className="flex gap-3 py-3.5 pr-16 pl-4 bg-white border-2 border-solid border-neutral-200 rounded-[50px] max-md:pr-5">
                    <div className="flex justify-center items-center">
                      <Image
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b14a5638afc37f412fa8759f463e759ee33043fd1ccd7a49535b20f423fe44d7?apiKey=877605d91b494696bd5bbaa7fb33442f&"
                        alt="Location icon"
                        className="aspect-square w-[21px]"
                      />
                    </div>
                    <input
                      className="justify-center my-auto text-base text-neutral-500 bg-white w-full"
                      placeholder="Lieu de l'évènement"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
              <div className="flex relative grow gap-5 justify-end text-base text-center max-md:flex-wrap max-md:mt-10">
                <NavLink
                  to={'/'}
                  className={`justify-center px-9 py-5 text-white bg-rose-500 border border-rose-500 border-solid leading-[100%] rounded-[48px] max-md:px-5 hover:bg-purple-800 hover:border-purple-800`}
                >
                  Trouver un artiste
                </NavLink>
                <div className="flex gap-5 justify-end self-start mt-3.5">
                  <Text className="my-auto text-neutral-600">ou</Text>
                  <NavLink
                    to={'/'}
                    className="justify-center px-2.5 py-1.5 font-bold text-purple-800 hover:border-b-2 hover:border-purple-800 border-solid leading-[128%] hover:text-rose-500"
                  >
                    Déposer un événement
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-col justify-center self-center mt-2.5 w-full text-sm leading-4 max-w-[907px] text-neutral-600 max-md:max-w-full">
        <div className="flex gap-5 items-start pr-20 max-md:flex-wrap max-md:pr-5 justify-between">
          <div className="flex gap-2.5">
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a4f37c2a9e085339d02ca046a7f86d54d057df98cc29708f04988183fad247d?apiKey=877605d91b494696bd5bbaa7fb33442f&"
              alt="Checkmark icon"
              className="shrink-0 w-7 aspect-square bg-white"
            />
            <Text className="my-auto">Simple et rapide</Text>
          </div>
          <div className="flex gap-2.5">
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1416f10bfee9a7924460fde0c17a264179eae92a1dea82c5118da423fc18edeb?apiKey=877605d91b494696bd5bbaa7fb33442f&"
              alt="Handshake icon"
              className="shrink-0 w-7 aspect-square bg-white"
            />
            <Text className="my-auto">
              Une relation entre artistes et organisations
            </Text>
          </div>
          <div className="flex gap-2.5">
            <Image
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1416f10bfee9a7924460fde0c17a264179eae92a1dea82c5118da423fc18edeb?apiKey=877605d91b494696bd5bbaa7fb33442f&"
              alt="Handshake icon"
              className="shrink-0 w-7 aspect-square bg-white"
            />
            <Text className="my-auto">
              Déjà pleins d'évènements crées grâce à{' '}
              <span className="text-rose-500">O </span>'bandito
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
