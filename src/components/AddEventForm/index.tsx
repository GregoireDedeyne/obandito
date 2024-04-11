import { useState } from 'react';
import { InputField } from '../InputField';
import { PrimaryButton } from '../Buttons/PrimaryButton';

interface FormData {
  name: string;
  email: string;
  town: string;
  address: string;
  description: string;
  picture: string;
  price: string;
  food: string;
}

interface Props {
  onSubmit: (data: FormData) => void;
}

export function AddEventForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row w-3/4 flex-wrap h-3/4 justify-between items-center "
    >
      <InputField
        // inputName="email"
        label="Email"
        type="email"
        value={formData.name}
        placeholder="Renseigner votre email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, 'email')
        }
      />
      <InputField
        label="Ville / région"
        type="text"
        value={formData.town}
        placeholder="Renseigner votre ville"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, 'town')
        }
      />
      <InputField
        label="Adresse"
        type="text"
        value={formData.address}
        placeholder="Renseigner votre adresse"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, 'adress')
        }
      />
      <InputField
        label="Description"
        type="text"
        value={formData.description}
        placeholder="Renseigner votre description"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, 'description')
        }
      />
      <InputField
        label="Photo"
        type="text"
        value={formData.picture}
        placeholder="Renseigner votre photo"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, 'picture')
        }
      />
      <InputField
        label="Budget"
        type="text"
        value={formData.price}
        placeholder="Renseigner votre budget"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, 'price')
        }
      />
      <InputField
        label="Restauration"
        type="text"
        value={formData.food}
        placeholder="Renseigner la restauration"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e, 'food')
        }
      />
      <PrimaryButton text="Créer mon évènement" />
    </form>
  );
}
