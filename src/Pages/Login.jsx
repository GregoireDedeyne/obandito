import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { InputField } from '../components/InputField';
import { NavLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphQL/actions';
import * as jose from 'jose';
import { TextEncoder } from 'text-encoding';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setDecodedToken } from '../store/actions';
import imgSide from '../assets/images/curved6.jpg';

export function LoginPage() {
  const dispatch = useDispatch();

  // mutation for login
  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      toast.warn(error.message); // Afficher l'erreur avec react-toastify
    },
  });
  // state for loginFormData
  const [loginFormData, setLoginFormData] = useState({
    mail: '',
    password: '',
  });

  const handleChange = (e, fieldName) => {
    const updatedFormData = { ...loginFormData, [fieldName]: e.target.value };
    setLoginFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { mail, password } = loginFormData;
    // check if we got mail and password
    if (!mail || !password) {
      toast.warn('Veuillez remplir les informations de connexion.');
      return;
    }
    const { data } = await loginMutation({ variables: { mail, password } });

    if (data) {
      const token = data.login.token;
      const secret = import.meta.env.VITE_JWT_SECRET;
      const encoder = new TextEncoder();
      const key = encoder.encode(secret);

      try {
        // decode token with jose
        const decodedToken = await jose.jwtVerify(token, key);
        // dispatch into redux
        dispatch(setDecodedToken(token, decodedToken.payload.user));
        // put token into local storage
        localStorage.setItem('token', token);

        window.location.href = `/home/${decodedToken.payload.user.id}`;
      } catch (error) {
        console.error('Erreur lors du déchiffrement du token :', error);
      }
    }
  };
  return (
    <div className="flex-1 flex justify-between w-full ">
      <div className=" flex items-center justify-center w-screen	">
        <ToastContainer />
        <main className="transition-all duration-200 ease-soft-in-out">
          <div className="relative flex items-center overflow-hidden bg-center bg-cover min-h-75-screen">
            <div className="">
              <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">
                  Bienvenue chez O'bandito
                </h3>
              </div>
              <div className="flex-auto">
                <form role="form">
                  <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                    Email
                  </label>
                  <InputField
                    inputName="email"
                    value={loginFormData.mail}
                    onChange={(e) => handleChange(e, 'mail')}
                  />
                  <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
                    Password
                  </label>
                  <InputField
                    inputName="password"
                    value={loginFormData.password}
                    onChange={(e) => handleChange(e, 'password')}
                  />

                  <div className="text-center">
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft bg-gradient-to-tl from-blue-600 to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                    >
                      Connexion
                    </button>
                  </div>
                </form>
              </div>
              <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                <p className="mx-auto mb-6 leading-normal text-sm">
                  Pas un compte ?
                  <NavLink
                    to="/subscribe"
                    className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text ml-4"
                  >
                    Inscrit-toi
                  </NavLink>
                </p>
              </div>
              <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                <p className="mx-auto mb-6 leading-normal text-sm">
                  <NavLink
                    to="/reset-password"
                    className="relative z-10 font-semibold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text ml-4"
                  >
                    Mot de passe oublié{' '}
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div
        className="sm:w-1/4 min-h-full shrink-0  md:w-4/12 lg:w-6/12 "
        style={{
          backgroundImage: `url(${imgSide})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
    </div>
  );
}
