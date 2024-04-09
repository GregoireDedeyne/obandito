import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faKey,
  faUser,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';

export function InputField({ inputName, value, onChange }) {
  return (
    <>
      {inputName === 'name' && (
        <label className="input input-bordered flex items-center my-2 w-full bg-slate-100">
          <FontAwesomeIcon icon={faUser} className="w-4 h-4 opacity-70" />
          <input
            name={inputName}
            type="text"
            value={value}
            onChange={(e) => onChange(e, 'name')}
            placeholder={'Enter your name'}
            className="gap-2 w-96 m-2 text-black"
          />
        </label>
      )}
      {inputName === 'email' && (
        <label className="input input-bordered flex items-center my-2 w-full bg-slate-100">
          <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 opacity-70" />
          <input
            name={inputName}
            type="email"
            value={value}
            onChange={(e) => onChange(e, 'mail')}
            placeholder={'Enter your email'}
            className="gap-2 w-96 m-2 text-black"
          />
        </label>
      )}
      {inputName === 'confirmPassword' && (
        <label className="input input-bordered flex items-center my-2 w-full bg-slate-100">
          <FontAwesomeIcon icon={faKey} className="w-4 h-4 opacity-70" />
          <input
            name={inputName}
            type="password"
            value={value}
            onChange={(e) => onChange(e, 'confirmPassword')}
            placeholder={'Confirm your password'}
            className="gap-2 w-96 m-2 text-black"
          />
        </label>
      )}
      {inputName === 'password' && (
        <label className="input input-bordered flex items-center my-2 w-full bg-slate-100">
          <FontAwesomeIcon icon={faKey} className="w-4 h-4 opacity-70" />
          <input
            name={inputName}
            type="password"
            value={value}
            onChange={(e) => onChange(e, 'password')}
            placeholder={'Enter your password'}
            className="gap-2 w-96 m-2 text-black"
          />
        </label>
      )}
      {inputName === 'region' && (
        <label className="input input-bordered flex items-center my-2 w-full bg-slate-100">
          <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 opacity-70" />
          <input
            name={inputName}
            type="text"
            value={value}
            onChange={(e) => onChange(e, 'region')}
            placeholder={'Enter your region'}
            className="gap-2 w-96 m-2 text-black"
          />
        </label>
      )}
    </>
  );
}
