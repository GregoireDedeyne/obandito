import { useState } from 'react';
import { useSelector } from 'react-redux';
import { InputField } from './components/InputField';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import CardsLogIn from './components/CardsLogIn';

/**
 * Component for user profile settings.
 * @param {function} onSubmit - Function to handle form submission.
 */

export function SettingProfile({ onSubmit }) {
  const [formData, setFormData] = useState({});
  const role = useSelector(
    (state) => state.decodedToken.decodedData.payload.user.role
  );

  const handleChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <div className="h-96 w-full mt-4">
        <img
          src="https://c8.alamy.com/compfr/f36h55/bar-avec-musique-en-direct-de-bangkok-thailande-f36h55.jpg"
          alt="Description de l'image"
          className="h-full w-full object-cover "
        />
      </div>
      <h2 className="text-4xl mt-4">Description</h2>
      <h1>{role}</h1>
      <div className="flex flex-row justify-between items-end my-10 ">
        <form onSubmit={handleSubmit} className="flex flex-row ">
          <div>
            <InputField
              label="style"
              type="text"
              value={formData.style || ''}
              placeholder={'Renseigner votre style'}
              onChange={(e) => handleChange(e, 'style')}
            />
            <InputField
              label="Région"
              type="text"
              value={formData.region || ''}
              placeholder={'Renseigner votre région'}
              onChange={(e) => handleChange(e, 'region')}
            />
            <InputField
              label="Clips"
              type="clips"
              value={formData.clips || ''}
              placeholder={'Renseigner votre clips'}
              onChange={(e) => handleChange(e, 'clips')}
            />
          </div>
        </form>

        <PrimaryButton text="trouver un évènement" />
      </div>
      <h2 className="text-4xl">Mes évènements</h2>
      <div className="my-10">
        <CardsLogIn />
      </div>
    </>
  );
}
