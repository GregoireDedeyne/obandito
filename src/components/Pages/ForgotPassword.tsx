import { useMutation } from '@apollo/client';
import { REQUESTNEWPASSWORD, RESETPASSWORD } from '../../graphQL/actions';
import { useState } from 'react';
import { InputField } from '../InputField';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export function ForgotPasswordPage() {
  // take token from URL
  const { token } = useParams();
  // state for first form
  const [formData, setFormData] = useState({ email: '' });
  // state for second form
  const [resetPassword, setResetPassword] = useState({
    password: '',
    token: token,
  });
  //   first mutation
  const [forgetPassword] = useMutation(RESETPASSWORD, {
    onError: (error) => {
      toast.warn(error.message); // Afficher l'erreur avec react-toastify
    },
  });

  // second mutation
  const [newPassword] = useMutation(REQUESTNEWPASSWORD, {
    onError: (error) => {
      toast.warn(error.message); // Afficher l'erreur avec react-toastify
    },
  });

  //   Change for email and update formData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //   Change for password and update resetpassword

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //   Submit for mail and send mutation
  const handleSubmitEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { email } = formData;

    const { data } = await forgetPassword({ variables: { email } });
    toast.success('Un email vous a été envoyé');
  };

  //   Submit for password and send mutation

  const handleSubmitPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { password, token } = resetPassword;

    const { data } = await newPassword({ variables: { password, token } });
    toast.success('Votre mot de passe est bien modifié');
  };

  return (
    <div className="container mx-auto flex justify-center items-center	">
      {' '}
      <ToastContainer />
      {!token ? (
        <div className="flex-col text-center">
          <p> Mot de passe oublié ? </p>
          <form className="text-center" onSubmit={handleSubmitEmail}>
            <InputField
              inputName="email"
              value={formData.email}
              onChange={handleChange}
            />
            <button className="btn btn-outline" type="submit">
              Envoyer
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-col text-center">
          <p> Réinitialiser votre mot de passe</p>
          <form onSubmit={handleSubmitPassword}>
            <InputField
              inputName="password"
              value={resetPassword.password}
              onChange={handleChangePassword}
            />
            <button className="btn btn-outline" type="submit">
              Envoyer
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
