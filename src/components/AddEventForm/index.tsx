import { useState } from 'react';
import { InputField } from '../InputField';
import { PrimaryButton } from '../Buttons/PrimaryButton';

export function AddEventForm({ onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row w-3/4 flex-wrap h-3/4 justify-between items-center "
    >
      {' '}
      <InputField
        label="Email"
        type="email"
        value={formData.name}
        placeholder={'Renseigner votre email'}
        onChange={(e) => handleChange(e, 'email')}
      />
      <InputField
        label="Ville / région"
        type="text"
        value={formData.town}
        placeholder={'Renseigner votre ville'}
        onChange={(e) => handleChange(e, 'town')}
      />
      <InputField
        label="Adresse"
        type="text"
        value={formData.adress}
        placeholder={'Renseigner votre adresse'}
        onChange={(e) => handleChange(e, 'adress')}
      />
      <InputField
        label="Description"
        type="text"
        value={formData.description}
        placeholder={'Renseigner votre description'}
        onChange={(e) => handleChange(e, 'description')}
      />
      <InputField
        label="Photo"
        type="text"
        value={formData.picture}
        placeholder={'Renseigner votre photo'}
        onChange={(e) => handleChange(e, 'picture')}
      />
      <InputField
        label="Budget"
        type="text"
        value={formData.price}
        placeholder={'Renseigner votre budget'}
        onChange={(e) => handleChange(e, 'price')}
      />
      <InputField
        label="Restauration"
        type="text"
        value={formData.food}
        placeholder={'Renseigner la restauration'}
        onChange={(e) => handleChange(e, 'food')}
      />
      <PrimaryButton text="Créer mon évènement" />
    </form>
  );
}
