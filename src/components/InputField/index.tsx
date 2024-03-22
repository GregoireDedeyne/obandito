import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faKey,
  faUser,
  faGlobe,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';

export function InputField({ label, type, value, onChange, placeholder }) {
  let icon;
  if (label === 'user') {
    icon = faUser;
  } else if (label === 'email') {
    icon = faEnvelope;
  } else if (label === 'password') {
    icon = faKey;
  } else if (label === 'region') {
    icon = faGlobe;
  } else {
    icon = faArrowAltCircleRight;
  }

  return (
    <label className="input input-bordered flex items-center my-2">
      <FontAwesomeIcon icon={icon} className="w-4 h-4 opacity-70" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="gap-2 w-96 m-2"
      />
    </label>
  );
}
