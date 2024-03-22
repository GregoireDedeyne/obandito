import { useState } from 'react';
import { InputField } from '../InputField';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import Image from '../../assets/images/bandPict3.jpg';
import { NavLink } from 'react-router-dom';
export function LoginForm({ onSubmit }) {
  // const [formData, setFormData] = useState({});

  // const handleChange = (e, fieldName) => {
  //   setFormData({ ...formData, [fieldName]: e.target.value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData);
  };

  return (
    <div className="flex justify-between">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mr-48 ml-48 mt-64  items-center"
      >
        <InputField inputName="email" />
        <InputField inputName="password" />

        <div className="my-2 text-center">
          <PrimaryButton href="/home:id" text="Se connecter" />
          <nav className="text-gray-500">
            {`Pas encore inscrit ? par `}
            <NavLink to="/subscribe" className="link">
              ici
            </NavLink>
          </nav>
        </div>
      </form>
      <div className="mt-32 ml-48 mr-48 mb-32 ">
        <img className="rounded-2xl w-screen" src={Image} />
      </div>
    </div>
  );
}
