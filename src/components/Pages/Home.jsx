import { Cards } from '../Cards';
import { FirstViewHome } from '../FirstViewsHome';
import { HeroSection } from '../FirstViewsHome/HeroSection';
import { SecondView } from '../FirstViewsHome/SecondView';
import { PreFooter } from '../FirstViewsHome/PreFooter';
import { Faq } from '../FirstViewsHome/Faq';
import { ThirdView } from '../FirstViewsHome/ThirdView';
import { useLoaderData, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CardsWithout } from '../CardsWithout';
import { useEffect } from 'react';
import { setSelectedTab } from '../../store/actions';

export function HomeNotLogPage() {
  // check if user is logged or not
  const islogged = useSelector((state) => state.decodedToken.islogged);
  // check role of user
  const role = useSelector((state) => state.decodedToken.decodedData.role);
  // load data for loader
  const data = useLoaderData();
  const location = useLocation();
  const dispatch = useDispatch();

  dispatch(setSelectedTab('Présentation'));

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <div className="bg-white w-full" id="bands">
        <div
          className="bg-cover"
          style={{
            backgroundImage:
              "url('https://cdn.builder.io/api/v1/image/assets/TEMP/f78fd4dbe073ea1a52fe2d59039f35efc38106dbb881a1d301e9ddd960269c08?apiKey=877605d91b494696bd5bbaa7fb33442f&')",
          }}
        >
          <FirstViewHome />
        </div>

        {islogged === false ? (
          <div>
            <div className="container mx-auto" id="bands">
              {data?.artists.length > 0 ? (
                <Cards
                  data={data.artists}
                  title={'Les derniers Artistes disponibles'}
                  subtitle={''}
                />
              ) : (
                <div className="text-center p-2 m-5">Pas de groupe trouvé</div>
              )}
            </div>
            <div className="container mx-auto my-20" id="events">
              <ThirdView
                events={data?.events}
                locations={data?.getCountNameEventsByRegion}
              />
            </div>
          </div>
        ) : islogged === true && role === 'Organisateur' ? (
          <div className="container mx-auto" id="bands">
            {data?.artists.length > 0 ? (
              <CardsWithout
                data={data.artists}
                title={'Les derniers Artistes disponibles'}
                subtitle={''}
              />
            ) : (
              <div>Pas de groupe trouvé</div>
            )}
          </div>
        ) : islogged === true && role === 'Artiste' ? (
          <div className="container mx-auto my-20" id="events">
            <ThirdView
              events={data?.events}
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
