import { useState } from 'react';
import { InputField } from '../InputField';
import { RoleSelectionCard } from '../RoleSelectionCard';
import Image from '../../assets/images/bandPict.jpg';
import Image2 from '../../assets/images/bandPict2.jpg';
import Image3 from '../../assets/images/orga.jpg';
import { NavLink, useLoaderData } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT } from '../../graphQL/actions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface FormData {
  mail: string;
  name: string;
  password: string;
  confirmPassword: string;
  region: string;
  role: string;
}

interface Region {
  nom: string;
}

export function CreateAccountForm() {
  const datas = useLoaderData();
  const regions: Region[] = datas.regions;

  const navigate = useNavigate();

  // Add const for graph QL function with the CREATE_ACCOUNT action
  const [CreateAccount, { data, loading, error }] = useMutation(CREATE_ACCOUNT);

  // Add useState to stock data from form
  const [formData, setFormData] = useState<FormData>({
    mail: '',
    name: '',
    password: '',
    confirmPassword: '',
    region: '',
    role: '',
  });

  // Suivie d'état dans un state pour savoir si un rôle a été selectionné
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // Met à jour l'état du state avec le rôle
  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setFormData((prevState) => ({
      ...prevState,
      role: role,
    }));
  };

  // function to update state data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    const updatedFormData = { ...formData, [fieldName]: e.target.value };
    setFormData(updatedFormData);
  };

  const { confirmPassword, ...formDataWithoutConfirmPassword } = formData;

  // function to submit the form and push data with grahQL
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Vérifie si des champs obligatoires sont vides
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
    console.log('validé');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {selectedRole === null && (
        <div className="w-full flex flex-row ">
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

      {selectedRole && (
        <div className="flex justify-between">
          <div className="flex flex-col px-28 pt-20 items-center">
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
              className="select select-bordered w-full max-w-xsflex items-center my-2  bg-slate-100"
              value={formData.region}
              onChange={(e) => handleChange(e, 'region')}
            >
              <option value="" disabled selected>
                Choississez votre région
              </option>
              {regions.map((region) => (
                <option key={region.nom} value={region.nom}>
                  {region.nom}
                </option>
              ))}
            </select>

            <p className="text-gray-500">
              En cliquant sur s’inscrire, vous acceptez les conditions générales
              et Politique de Confidentialité
            </p>
            <div className="w-1/2 flex justify-center my-2">
              <button
                type="submit"
                className="btn py-2 px-5 rounded-lg bg-slate-900 text-white border-2 border-color-primary transition duration-150 hover:bg-color-secondary hover:text-color-primary hover:border-color-primary hover:border-2"
              >
                S'inscrire
              </button>
            </div>

            <nav className="text-gray-500">
              Déjà inscrit ? par
              <NavLink to="/login" className="link">
                ici
              </NavLink>
            </nav>
          </div>
          <img className="m-24 mr-64 mb-48 rounded-2xl" src={Image} />
        </div>
      )}
    </form>
  );
}
