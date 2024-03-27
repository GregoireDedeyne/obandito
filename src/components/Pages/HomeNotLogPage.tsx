import { useEffect } from 'react';
import { getBands, getEvents } from '../../store/actions';
import { useAppDispatch, useAppSelector } from '../../store/redux-hook';
import { Cards } from '../CardsLogOut';
import { FirstViewHome } from '../FirstViewsHome';
import { HeroSection } from '../FirstViewsHome/HeroSection';
import { SecondView } from '../FirstViewsHome/SecondView';
import { PreFooter } from '../FirstViewsHome/PreFooter';
import { Faq } from '../FirstViewsHome/Faq';
import { ThirdView } from '../FirstViewsHome/ThirdView';

export function HomeNotLogPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatchez l'action getEvents sans données supplémentaires
    dispatch(getEvents());
    dispatch(getBands());
  }, [dispatch]);
  const events = useAppSelector((state) => state.events.events);
  const bands = useAppSelector((state) => state.bands.bands);

  console.log(bands);

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

        <div className="container mx-auto">
          <Cards data={events} />
        </div>
        <div className="container mx-auto my-20">
          <ThirdView />
        </div>
        <div className="bg-purple-800">
          <div className="container mx-auto">
            <HeroSection />
          </div>
        </div>

        <div className="container mx-auto">
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
      </div>
    </>
  );
}
