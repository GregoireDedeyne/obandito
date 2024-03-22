import { useState } from 'react';
import { InputField } from '../InputField';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import Image from '../../assets/images/bandPict3.jpg';
import { NavLink } from 'react-router-dom';

export function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col justify-center items-center sm:flex-row container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center sm:items-start m-4 w-[300px] lg:w-[500px]"
      >
        <InputField inputName="email" />
        <InputField inputName="password" />

        <div className="my-2 text-center sm:text-left">
          <PrimaryButton text="Se connecter" />
          <nav className="text-gray-500">
            {`Pas encore inscrit ? par `}
            <NavLink to="/subscribe" className="link">
              ici
            </NavLink>
          </nav>
        </div>
      </form>
      <div className="m-4">
        <img
          className="rounded-2xl w-[300px] lg:w-[500px]"
          src={Image}
          alt="band"
        />
      </div>
    </div>
  );
}
