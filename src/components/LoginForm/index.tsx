import { useState } from 'react';
import { InputField } from '../InputField';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import Image from '../../assets/images/bandPict3.jpg';
import { NavLink } from 'react-router-dom';
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
    <div className="flex justify-between">
      <form onSubmit={handleSubmit} className="flex flex-col mr-48 ml-48 mt-64">
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
        <nav className="text-gray-500">
          {' '}
          Pas encore inscrit ? par{' '}
          <NavLink to="/subscribe" className="link">
            {' '}
            ici{' '}
          </NavLink>
        </nav>
      </form>
      <div className="mt-32 ml-48 mr-48 mb-32 ">
        <img className="rounded-2xl w-screen" src={Image} />
      </div>
    </div>
  );
}
