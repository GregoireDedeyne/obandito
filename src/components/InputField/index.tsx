import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faKey,
  faUser,
  faGlobe,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export function InputField({ inputName, value, onChange }) {
  // const [formData, setFormData] = useState({});

  // const handleChange = (e, fieldName) => {
  //   const updatedFormData = { ...formData, [fieldName]: e.target.value };
  //   console.log(updatedFormData);
  //   setFormData({ ...formData, [fieldName]: e.target.value });
  // };



  return (
    <>
      {inputName === 'name' && (
        <label className="input input-bordered flex items-center my-2 w-full">
          <FontAwesomeIcon icon={faUser} className="w-4 h-4 opacity-70" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e, 'name')}
            placeholder={'Enter your name'}
            className="gap-2 w-96 m-2"
          />
        </label>
      )}
      {inputName === 'email' && (
        <label className="input input-bordered flex items-center my-2 w-full">
          <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 opacity-70" />
          <input
            type="email"
            value={value}
            onChange={(e) => onChange(e, 'mail')}
            placeholder={'Enter your email'}
            className="gap-2 w-96 m-2"
          />
        </label>
      )}
      {inputName === 'confirmPassword' && (
        <label className="input input-bordered flex items-center my-2 w-full">
          <FontAwesomeIcon icon={faKey} className="w-4 h-4 opacity-70" />
          <input
            type="password"
            value={value}
            onChange={(e) => onChange(e, 'confirmPassword')}
            placeholder={'Confirm your password'}
            className="gap-2 w-96 m-2"
          />
        </label>
      )}
       {inputName === 'password' && (
        <label className="input input-bordered flex items-center my-2 w-full">
          <FontAwesomeIcon icon={faKey} className="w-4 h-4 opacity-70" />
          <input
            type="password"
            value={value}
            onChange={(e) => onChange(e, 'password')}
            placeholder={'Enter your password'}
            className="gap-2 w-96 m-2"
          />
        </label>
      )}
      {inputName === 'region' && (
        <label className="input input-bordered flex items-center my-2 w-full">
          <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 opacity-70" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e, 'region')}
            placeholder={'Enter your region'}
            className="gap-2 w-96 m-2"
          />
        </label>
      )}
    </>
  );
}
