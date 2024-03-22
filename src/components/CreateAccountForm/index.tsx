import { useState } from 'react';
import { InputField } from '../InputField';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { RoleSelectionCard } from '../RoleSelectionCard';
import Image from '../../assets/images/bandPict.jpg';
import Image2 from '../../assets/images/bandPict2.jpg';
import Image3 from '../../assets/images/orga.jpg';
import { NavLink } from 'react-router-dom';

export function CreateAccountForm({ onSubmit }) {
  const [formData, setFormData] = useState({});

  // Suivie d'état dans un state pour savoir si un rôle a été selectionné
  const [selectedRole, setSelectedRole] = useState(null);

  // Met à jour l'état du state avec le rôle
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    console.log(selectedRole);
  };

  const handleChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col m-5">
      {/* Afficher les cartes de sélection de rôle uniquement si aucun rôle n'est sélectionné */}
      {selectedRole === null && (
        <div className="w-full flex flex-row justify-center		 ">
          <RoleSelectionCard
            citation={
              "Dans chaque accord réside une histoire à partager. Ensemble, sur scène, nous peignons des émotions, des rêves et des souvenirs, unissant les cœurs dans une symphonie d'émotion."
            }
            genre={'Groupes'}
            src={Image2}
            onClick={() => handleRoleSelect('Groupes')} // Passer la fonction de sélection du rôle
          />

          <RoleSelectionCard
            citation={
              "Dans chaque détail logistique, nous tissons les fils de l'expérience musicale. Accueillons chaque artiste comme une étoile dans notre univers, guidant leur lumière vers une nuit d'éclat et de partage."
            }
            src={Image3}
            genre={'Organisateurs'}
            onClick={() => handleRoleSelect('Organisateurs')} // Passer la fonction de sélection du rôle
          />
        </div>
      )}

      {selectedRole && (
        <div className="flex justify-between">
          <div className="flex flex-col p-28 items-center">
            <InputField inputName="name" />
            <InputField inputName="email" />
            <InputField inputName="password" />
            <InputField inputName="password" />
            <InputField inputName="region" />

            <p className="text-gray-500">
              En cliquant sur s’inscrire, vous acceptez les conditions générales
              et Politique de Confidentialité
            </p>
            <div className="w-1/2 flex justify-center my-2">
              <PrimaryButton href="/" text="S'inscrire" />
            </div>
            <nav className="text-gray-500">
              Déjà inscrit ? par
              <NavLink to="/login" className="link">
                ici
              </NavLink>
            </nav>
          </div>
          <img className="m-24 mr-64 mb-60 rounded-2xl" src={Image} />
        </div>
      )}
    </form>
  );
}
