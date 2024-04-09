import logo_facebook from '../../assets/images/logo_facebook.png';
import logo_indeed from '../../assets/images/logo_indeed.png';
import logo_twitter from '../../assets/images/logo_twitter.png';
import logo_youtube from '../../assets/images/logo_youtube.png';
import logo_instagram from '../../assets/images/logo_instagram.png';
import SocialMedia from '../SocialMedia';

export default function SocialMediaGroup() {
  return (
    <div className="flex justify-center">
      <SocialMedia logo={logo_facebook} link="/" alt="logo facebook" />
      <SocialMedia logo={logo_indeed} link="/" alt="logo indeed" />
      <SocialMedia logo={logo_twitter} link="/" alt="logo twitter" />
      <SocialMedia logo={logo_youtube} link="/" alt="logo youtube" />
      <SocialMedia logo={logo_instagram} link="/" alt="logo instagram" />
    </div>
  );
}
