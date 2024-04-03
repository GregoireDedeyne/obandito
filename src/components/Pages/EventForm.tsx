import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CREATE_EVENT } from '../../graphQL/actions';
import { useAppSelector } from '../../store/redux-hook';

export function EventFormPage() {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.decodedToken.token);
  // Add const for graph QL function with the CREATE_ACCOUNT action
  const [CreateEvent, { data, loading, error }] = useMutation(CREATE_EVENT);

  // Add useState to stock data from form
  const [formData, setFormData] = useState({
    address: null,
    catering: false,
    city: null,
    date: '',
    image_url: null,
    description: null,
    name: '',
    price: 0,
    region: '',
    total_slots: 0,
    zip_code: null,
  });

  // function to update state data
  const handleChange = (e, fieldName) => {
    let value;

    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    } else if (e.target.type === 'file') {
      // Récupérez le fichier sélectionné
      const file = e.target.files[0];
      value = file ? file.name : '';
    } else {
      value = e.target.value;
      // Si le champ est zip_code, assurez-vous qu'il est une chaîne de caractères
      if (fieldName === 'date' && !isNaN(value)) {
        value = value.toString();
      }
      if (fieldName === 'zip_code' && !isNaN(value)) {
        value = value.toString();
      }
      // Si la valeur est un nombre, parsez-la en entier
      else if (!isNaN(value)) {
        value = parseInt(value, 10);
      }
    }

    const updatedFormData = {
      ...formData,
      [fieldName]: value,
    };
    setFormData(updatedFormData);
  };

  // function to submit the form and push data with grahQL
  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérifie si des champs obligatoires sont vides
    const requiredFields = [
      'address',
      'catering',
      'city',
      'date',
      // 'image_url',
      'name',
      'price',
      'region',
      'total_slots',
      'zip_code',
    ];
    const isEmptyField = requiredFields.some((field) => formData[field] === '');

    if (isEmptyField) {
      toast.warn('Veuillez remplir tous les champs.');
      return;
    }

    if (loading) return 'Loading';
    if (error) return error.message;

    CreateEvent({
      variables: { input: formData },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    console.log(' Event validé');
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
      <div className="md:flex">
        <div className="w-full p-3">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Création d'Événement
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Nom:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => handleChange(e, 'name')}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image_url"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                URL de l'image:
              </label>
              <input
                type="file"
                id="image_url"
                name="image_url"
                onChange={(e) => handleChange(e, 'image_url')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Adresse:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={(e) => handleChange(e, 'address')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Ville:
              </label>
              <input
                type="text"
                id="city"
                onChange={(e) => handleChange(e, 'city')}
                name="city"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="region"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Région:
              </label>
              <input
                type="text"
                id="region"
                name="region"
                onChange={(e) => handleChange(e, 'region')}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                onChange={(e) => handleChange(e, 'date')}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="zip_code"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Code Postal:
              </label>
              <input
                type="text"
                id="zip_code"
                name="zip_code"
                onChange={(e) => handleChange(e, 'zip_code')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                onChange={(e) => handleChange(e, 'description')}
                rows="3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="catering" className="inline-flex items-center ">
                <input
                  type="checkbox"
                  id="catering"
                  name="catering"
                  onChange={(e) => handleChange(e, 'catering')}
                  className="form-checkbox h-5 w-5 text-blue-600  "
                />
                <span className="ml-2 text-gray-700 text-sm font-semibold ">
                  Restauration
                </span>
              </label>
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Prix:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                onChange={(e) => handleChange(e, 'price')}
                min="0"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="total_slots"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Nombre total de places:
              </label>
              <input
                type="number"
                id="total_slots"
                name="total_slots"
                onChange={(e) => handleChange(e, 'total_slots')}
                required
                min="1"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Créer Événement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
