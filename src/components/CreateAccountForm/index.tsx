import { useState } from 'react';
import { InputField } from '../InputField';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { RoleSelectionCard } from '../RoleSelectionCard';

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
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      {/* Afficher les cartes de sélection de rôle uniquement si aucun rôle n'est sélectionné */}
      {selectedRole === null && (
        <div className="w-full flex flex-row justify-center		 ">
          <RoleSelectionCard
            citation={
              "Dans chaque accord réside une histoire à partager. Ensemble, sur scène, nous peignons des émotions, des rêves et des souvenirs, unissant les cœurs dans une symphonie d'émotion."
            }
            genre={'Groupes'}
            onClick={() => handleRoleSelect('Groupes')} // Passer la fonction de sélection du rôle
          />

          <RoleSelectionCard
            citation={
              "Dans chaque détail logistique, nous tissons les fils de l'expérience musicale. Accueillons chaque artiste comme une étoile dans notre univers, guidant leur lumière vers une nuit d'éclat et de partage."
            }
            genre={'Organisateurs'}
            onClick={() => handleRoleSelect('Organisateurs')} // Passer la fonction de sélection du rôle
          />
        </div>
      )}

      {selectedRole && (
        <div className="w-1/4 flex flex-col">
          {' '}
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            placeholder={'Renseigner votre email'}
            onChange={(e) => handleChange(e, 'email')}
          />
          <InputField
            label="Mot de passe"
            type="password"
            value={formData.password}
            placeholder={'Renseigner votre mot de passe'}
            onChange={(e) => handleChange(e, 'password')}
          />
          <InputField
            label="Mot de passe"
            type="password"
            value={formData.password}
            placeholder={'Renseigner votre mot de passe'}
            onChange={(e) => handleChange(e, 'password')}
          />
          <InputField
            label="Ville"
            type="text"
            value={formData.town}
            placeholder={'Renseigner votre ville'}
            onChange={(e) => handleChange(e, 'town')}
          />
          <InputField
            label="Code postal"
            type="text"
            value={formData.zipcode}
            placeholder={'Renseigner votre code postal'}
            onChange={(e) => handleChange(e, 'zipcode')}
          />
          <p className="text-gray-500">
            {' '}
            En cliquant sur s’inscrire, vous acceptez les conditions générales
            et Politique de Confidentialité
          </p>
          <PrimaryButton text="S'inscrire" />
        </div>
      )}
    </form>
  );
}
