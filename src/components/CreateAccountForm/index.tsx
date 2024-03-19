import { useState } from 'react';
import { InputField } from '../InputField';
import { PrimaryButton } from '../Buttons/PrimaryButton';



export function CreateAccountForm ({ onSubmit }) {

  
    const [formData, setFormData] = useState({});
  
    const handleChange = (e, fieldName) => {
      setFormData({ ...formData, [fieldName]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };


  return   <form onSubmit={handleSubmit} className='flex flex-col w-1/4' >
  <InputField
    label="Email"
    type="email"
    value={formData.email}
    placeholder={"Renseigner votre email"}
    onChange={(e) => handleChange(e, 'email')}
  />
  <InputField
    label="Mot de passe"
    type="password"
    value={formData.password }
    placeholder={"Renseigner votre mot de passe"}

    onChange={(e) => handleChange(e, 'password')}
  />
  <InputField
    label="Mot de passe"
    type="password"
    value={formData.password }
    placeholder={"Renseigner votre mot de passe"}

    onChange={(e) => handleChange(e, 'password')}
  />
  <InputField
    label="Ville"
    type="text"
    value={formData.town }
    placeholder={"Renseigner votre ville"}

    onChange={(e) => handleChange(e, 'town')}
  />
  <InputField
    label="Code postal"
    type="text"
    value={formData.zipcode }
    placeholder={"Renseigner votre code postal"}

    onChange={(e) => handleChange(e, 'zipcode')}
  />
<p className='text-gray-500'> En cliquant sur s’inscrire, vous acceptez les conditions générales  et Politique de Confidentialité</p>

<PrimaryButton text="S'inscrire"/>
</form>
}
