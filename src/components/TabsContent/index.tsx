import logo_facebook from '../../assets/images/logo_facebook.png';
import logo_indeed from '../../assets/images/logo_indeed.png';
import logo_twitter from '../../assets/images/logo_twitter.png';
import logo_youtube from '../../assets/images/logo_youtube.png';
import logo_instagram from '../../assets/images/logo_instagram.png';
import ContactDetails from '../ContactDetails';
import SocialMedia from '../SocialMedia';
import { ArrayHandleArtistEvent } from '../ArrayHandleArtistEvent';
import ProfilContentBlock from '../ProfilContentBlock';
import { useState } from 'react';
import { EventCard } from '../InfoHomeCard/EventsCards';

export function TabsContent() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (i: number) => {
    setSelectedTab(i);
  };

  return (
    <>
      <div role="tablist" className="tabs-bordered container mx-auto">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Présentation"
          checked={selectedTab === 0}
          onChange={() => handleTabClick(0)}
        />

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Evènements"
          checked={selectedTab === 1}
          onChange={() => handleTabClick(1)}
        />

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Deals"
          checked={selectedTab === 2}
          onChange={() => handleTabClick(2)}
        />
      </div>

      <div className="bg-color-gray_light">
        <div className="grid grid-cols-12 md:gap-8 container mx-auto">
          {/* grid left */}
          <div className="col-span-12 md:col-span-8 my-10">
            {selectedTab === 0 && (
              <>
                <ProfilContentBlock
                  title="Présentation"
                  spotify=""
                  youtube=""
                />
                <ProfilContentBlock
                  title="Musiques & clips"
                  spotify="https://open.spotify.com/playlist/37i9dQZF1DZ06evO26xkaI?si=2f470c74f0d04b0a"
                  youtube="https://www.youtube.com/watch?v=jGhnP-k4nR0"
                />
              </>
            )}

            {selectedTab === 1 && (
              <>
                <div className="flex space-x-4 items-center mb-2">
                  <input
                    type="radio"
                    id="option1"
                    name="options"
                    className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                  />
                  <label htmlFor="option1" className="text-gray-700">
                    Tous
                  </label>

                  <input
                    type="radio"
                    id="option2"
                    name="options"
                    className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                  />
                  <label htmlFor="option2" className="text-gray-700">
                    Demandes en attente
                  </label>

                  <input
                    type="radio"
                    id="option3"
                    name="options"
                    className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                  />
                  <label htmlFor="option3" className="text-gray-700">
                    Demandes validées
                  </label>
                </div>

                <div className="bloc-white">
                  <h2>Evènements remportés</h2>
                  <div>
                    {/* {events.map((event, index) => (
                    <EventCard key={index} {...event} />
                  ))} */}
                  </div>
                </div>
              </>
            )}

            {selectedTab === 2 && (
              <>
                <div className="flex space-x-4 items-center mb-2">
                  <input
                    type="radio"
                    id="option1"
                    name="options"
                    className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                  />
                  <label htmlFor="option1" className="text-gray-700">
                    Tous
                  </label>

                  <input
                    type="radio"
                    id="option2"
                    name="options"
                    className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                  />
                  <label htmlFor="option2" className="text-gray-700">
                    Deals en attentes
                  </label>

                  <input
                    type="radio"
                    id="option3"
                    name="options"
                    className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                  />
                  <label htmlFor="option3" className="text-gray-700">
                    Deals validés
                  </label>

                  <input
                    type="radio"
                    id="option4"
                    name="options"
                    className="h-4 w-4 rounded-full border border-gray-300 appearance-none checked:border-color-primary focus:ring-2 focus:ring-color-primary"
                  />
                  <label htmlFor="option4" className="text-gray-700">
                    Deals refusés
                  </label>
                </div>
                <ArrayHandleArtistEvent />
              </>
            )}
          </div>

          {/* grid right */}
          <div className="col-span-12 md:col-span-4 my-10">
            <div>
              <ContactDetails zip_code="code" city="city" />

              <div className="bloc-white my-10">
                <h2 className="text-center text-black mb-5">En savoir plus</h2>
                <div className="flex justify-center">
                  <SocialMedia
                    logo={logo_facebook}
                    link="/"
                    alt="logo facebook"
                  />
                  <SocialMedia logo={logo_indeed} link="/" alt="logo indeed" />
                  <SocialMedia
                    logo={logo_twitter}
                    link="/"
                    alt="logo twitter"
                  />
                  <SocialMedia
                    logo={logo_youtube}
                    link="/"
                    alt="logo youtube"
                  />
                  <SocialMedia
                    logo={logo_instagram}
                    link="/"
                    alt="logo instagram"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
