import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgRegister from '../../assets/images/curved14.jpg';
import { useState } from 'react';
import { InputField } from '../InputField';
import { RoleSelectionCard } from '../RoleSelectionCard';
import Image2 from '../../assets/images/bandPict2.jpg';
import Image3 from '../../assets/images/orga.jpg';
import { NavLink, useLoaderData } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT } from '../../graphQL/actions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function SubscribePage() {
  const datas = useLoaderData();
  const regions = datas.regions;

  const navigate = useNavigate();

  // Add const for graph QL function with the CREATE_ACCOUNT action
  const [CreateAccount, { data, loading, error }] = useMutation(
    CREATE_ACCOUNT,
    {
      onError: (error) => {
        toast.warn(error.message); // show error with toastify
      },
    }
  );

  // Add useState to stock data from form
  const [formData, setFormData] = useState({
    mail: '',
    name: '',
    password: '',
    confirmPassword: '',
    region: '',
    role: '',
  });

  // Checking role
  const [selectedRole, setSelectedRole] = useState(null);

  // update state
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setFormData((prevState) => ({
      ...prevState,
      role: role,
    }));
  };

  // function to update state data
  const handleChange = (e, fieldName) => {
    const updatedFormData = { ...formData, [fieldName]: e.target.value };
    setFormData(updatedFormData);
  };

  const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;

  // function to submit the form and push data with grahQL
  const handleSubmit = (e) => {
    e.preventDefault();

    // check requiredField
    const requiredFields = [
      'mail',
      'name',
      'password',
      'confirmPassword',
      'region',
      'role',
    ];
    const isEmptyField = requiredFields.some((field) => formData[field] === '');

    if (isEmptyField) {
      toast.warn('Veuillez remplir tous les champs.');
      return;
    }

    if (loading) return 'Loading';
    if (error) return error.message;
    if (formData.password !== formData.confirmPassword) {
      toast.warn('Les mots de passe ne correspondent pas.');
      return;
    }

    CreateAccount({ variables: { input: formDataWithoutConfirmPassword } });
    navigate('/');
  };
  return (
    <div className="bg-white w-full">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div
          className="relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-center bg-cover min-h-50-screen rounded-xl"
          style={{
            backgroundImage: `url(${imgRegister})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-60"></span>
          <div className="container mx-auto z-10 ">
            <div className="flex flex-wrap justify-center ">
              <div className="w-full max-w-full mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                <h1 className="mt-12 mb-2 text-white">Bienvenue !</h1>
                <p className="text-white">
                  {selectedRole === null
                    ? 'Indiquez-nous qui vous êtes : un artiste désireux de montrer son art au monde, ou un organisateur à la recherche de talents uniques pour ses événements ?'
                    : 'Utilisez ce superbe formulaire pour vous inscrire gratuitement.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="w-full -mt-48 md:-mt-56 lg:-mt-48">
            {selectedRole !== null && (
              <div className="w-full flex justify-center">
                <div className="relative z-0  max-w-[410px] sm:w-[410px] min-w-0 break-words bg-white border-0 shadow-md rounded-2xl bg-clip-border">
                  <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                    <h5>Remplissez le formulaire ci-dessous</h5>
                  </div>
                  <div className="flex-auto p-6">
                    <>
                      <InputField
                        inputName="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <InputField
                        inputName="email"
                        value={formData.mail}
                        onChange={handleChange}
                      />
                      <InputField
                        inputName="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <InputField
                        inputName="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <select
                        className={`select select-bordered w-full flex items-center bg-slate-100 ${formData.region && 'text-black'}`}
                        name="region"
                        value={formData.region}
                        onChange={(e) =>
                          setFormData({ ...formData, region: e.target.value })
                        }
                      >
                        <option value="">Choississez votre région</option>
                        {regions.map((region) => (
                          <option key={region.nom} value={region.nom}>
                            {region.nom}
                          </option>
                        ))}
                      </select>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                        >
                          Inscription
                        </button>
                      </div>
                      <p className="mt-4 mb-0 leading-normal text-sm">
                        Déjà un compte ?{' '}
                        <NavLink
                          to="/login" // Assurez-vous que le chemin est correct selon votre structure de route.
                          className="font-bold text-slate-700"
                        >
                          Cliquer ici
                        </NavLink>
                      </p>
                    </>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {selectedRole === null && (
          <div className="sm:flex ">
            <RoleSelectionCard
              genre={'Groupes'}
              src={Image2}
              onClick={() => handleRoleSelect('Artiste')} // Passer la fonction de sélection du rôle
            />

            <RoleSelectionCard
              src={Image3}
              genre={'Organisateurs'}
              onClick={() => handleRoleSelect('Organisateur')} // Passer la fonction de sélection du rôle
            />
          </div>
        )}
      </form>
    </div>
  );
}
