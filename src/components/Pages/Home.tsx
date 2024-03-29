import { Cards } from '../Cards';
import { FirstViewHome } from '../FirstViewsHome';
import { HeroSection } from '../FirstViewsHome/HeroSection';
import { SecondView } from '../FirstViewsHome/SecondView';
import { PreFooter } from '../FirstViewsHome/PreFooter';
import { Faq } from '../FirstViewsHome/Faq';
import { ThirdView } from '../FirstViewsHome/ThirdView';
import { useLoaderData } from 'react-router-dom';
import { useAppSelector } from '../../store/redux-hook';

export function HomeNotLogPage() {
  const islogged = useAppSelector((state) => state.decodedToken.islogged);
  const role = useAppSelector((state) => state.decodedToken.decodedData.role);

  const data = useLoaderData();

  return (
    <>
      <div className="bg-white">
        <div
          className="bg-cover"
          style={{
            backgroundImage:
              "url('https://cdn.builder.io/api/v1/image/assets/TEMP/f78fd4dbe073ea1a52fe2d59039f35efc38106dbb881a1d301e9ddd960269c08?apiKey=877605d91b494696bd5bbaa7fb33442f&')",
          }}
        >
          <div className="container mx-auto">
            <FirstViewHome />
          </div>
        </div>

        {islogged === false ? (
          <div>
            <div className="container mx-auto" id="bands">
              <Cards
                data={data?.lastArtists}
                title={'Les derniers Artistes disponibles'}
                subtitle={''}
              />
            </div>
            <div className="container mx-auto my-20" id="events">
              <ThirdView
                events={data?.lastEvents}
                locations={data?.getCountNameEventsByRegion}
              />
            </div>
          </div>
        ) : islogged === true && role === 'Organisateur' ? (
          <div className="container mx-auto" id="bands">
            <Cards
              data={data?.randomArtists}
              title={'Les derniers Artistes disponibles'}
              subtitle={''}
            />
          </div>
        ) : islogged === true && role === 'Artiste' ? (
          <div className="container mx-auto my-20" id="events">
            <ThirdView
              events={data?.lastEvents}
              locations={data?.getCountNameEventsByRegion}
            />
          </div>
        ) : null}

        {islogged === false ? (
          <>
            <div className="bg-purple-800">
              <div className="container mx-auto">
                <HeroSection />
              </div>
            </div>
            <div className="container mx-auto" id="propos">
              <SecondView />
            </div>
            <div className="bg-slate-200">
              <div className="container mx-auto">
                <Faq />
              </div>
            </div>
            <div
              className="bg-cover"
              style={{
                backgroundImage:
                  "url('https://cdn.builder.io/api/v1/image/assets/TEMP/326e86dddc21d3a161b890cf2121a7bdaca978e0a4be49fe1163221f17a6d598?apiKey=877605d91b494696bd5bbaa7fb33442f&')",
              }}
            >
              <div className="container mx-auto">
                <PreFooter />
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
