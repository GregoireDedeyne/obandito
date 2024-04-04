import logo_facebook from '../../assets/images/logo_facebook.png';
import logo_indeed from '../../assets/images/logo_indeed.png';
import logo_twitter from '../../assets/images/logo_twitter.png';
import logo_youtube from '../../assets/images/logo_youtube.png';
import logo_instagram from '../../assets/images/logo_instagram.png';
import ContactDetails from '../ContactDetails';
import SocialMedia from '../SocialMedia';
import { ArrayHandleArtistEvent } from '../ArrayHandleArtistEvent';

export function TabsContent() {
  return (
    <div className="bg-gray">
      <div className="grid grid-cols-12 md:gap-8 container mx-auto">
        <div className="col-span-12 md:col-span-8 my-10">
          col-1
          <ArrayHandleArtistEvent />
        </div>

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
                <SocialMedia logo={logo_twitter} link="/" alt="logo twitter" />
                <SocialMedia logo={logo_youtube} link="/" alt="logo youtube" />
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
  );
}
