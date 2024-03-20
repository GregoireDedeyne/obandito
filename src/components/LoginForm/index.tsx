import { useState } from 'react';
import { InputField } from '../InputField';
import { PrimaryButton } from '../Buttons/PrimaryButton';

export function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-96">
      <InputField
        label="Email"
        type="email"
        value={formData.email}
        placeholder={'Renseigner votre email'}
        onChange={(e) => handleChange(e, 'email')}
      />
      <InputField
        label="Mot de passe"
        type="password"
        value={formData.password}
        placeholder={'Renseigner votre mot de passe'}
        onChange={(e) => handleChange(e, 'password')}
      />
      <PrimaryButton text="Se connecter" />
      <p className="text-gray-500">
        {' '}
        Pas encore inscrit ? par{' '}
        <a href="/subscribe" className="link">
          {' '}
          ici{' '}
        </a>
      </p>
    </form>
  );
}
