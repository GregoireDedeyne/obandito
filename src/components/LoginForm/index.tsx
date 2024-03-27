import { useEffect, useState } from 'react';
import { InputField } from '../InputField';
import Image from '../../assets/images/bandPict3.jpg';
import { NavLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../graphQL/actions';
import { useNavigate } from 'react-router-dom';
import * as jose from 'jose';
import { TextEncoder } from 'text-encoding';
import { useDispatch } from 'react-redux';
import { setDecodedToken } from '../../store/actions/';

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginMutation, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const [formData, setFormData] = useState({ mail: '', password: '' });

  const handleChange = (e, fieldName) => {
    const updatedFormData = { ...formData, [fieldName]: e.target.value };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { mail, password } = formData;
    const { data } = await loginMutation({ variables: { mail, password } });

    if (data) {
      const token = data.login.token;
      const secret = import.meta.env.VITE_JWT_SECRET;
      const encoder = new TextEncoder();
      const key = encoder.encode(secret);

      try {
        const decodedToken = await jose.jwtVerify(token, key);
        console.log('token: ', token);
        console.log('decodedToken: ', decodedToken);
        dispatch(setDecodedToken(decodedToken));
        navigate(`/home/${decodedToken.payload.user.id}`);
      } catch (error) {
        console.error('Erreur lors du déchiffrement du token :', error);
      }
    }
  };

  return (
    <div className="flex flex-col my-10 lg:my-20 justify-center items-center sm:flex-row container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center sm:items-start m-4 w-[300px] lg:w-[500px]"
      >
        <InputField
          inputName="email"
          value={formData.mail}
          onChange={(e) => handleChange(e, 'mail')}
        />
        <InputField
          inputName="password"
          value={formData.password}
          onChange={(e) => handleChange(e, 'password')}
        />

        <div className="my-2 text-center sm:text-left">
          <button type="submit" className="btn-primary">
            Se connecter
          </button>
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
