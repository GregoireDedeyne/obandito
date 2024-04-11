import { useMutation } from '@apollo/client';
import { RESETPASSWORD } from '../../graphQL/actions';
import { useState } from 'react';
import { InputField } from '../InputField';

export function ForgotPasswordPage() {
  const [formData, setFormData] = useState({ email: '' });

  const [forgetPassword] = useMutation(RESETPASSWORD, {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = formData;

    const { data } = await forgetPassword({ variables: { email } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        inputName="email"
        value={formData.email}
        onChange={(e: any) => handleChange(e, 'mail')}
      />
      ; <button type="submit">Envoyer</button>
    </form>
  );
}
