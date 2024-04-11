import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CREATE_EVENT } from '../../graphQL/actions';
import { useAppSelector } from '../../store/redux-hook';

export function EventFormPage() {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.decodedToken.token);

  const [createEvent, { loading, error }] = useMutation(CREATE_EVENT, {
    onCompleted: () => {
      toast.success('Événement créé avec succès !');
      navigate('/');
    },
  });

  const [formData, setFormData] = useState({
    name: 'test',
    image_url: null,
    address: '',
    city: '',
    date: '2024-05-05',
    description: '',
    price: 1,
    region: '',
    total_slots: 1,
    zip_code: '17000',
    catering: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
    }));
    console.log('formData', formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('formDat', formData);

    const isEmptyField = Object.values(formData).some((value) => value === '');
    console.log('isEmptyField', isEmptyField);
    if (isEmptyField) {
      toast.warn('Veuillez remplir tous les champs requis.');
      return;
    }

    if (loading) return toast.info('Création en cours...');

    const input = {
      ...formData,
      price: Number(formData.price),
      total_slots: Number(formData.total_slots),
    };
    console.log('input', input);

    createEvent({
      variables: { input },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    navigate('/');
    toast.success('Événement créé avec succès !');
  };

  if (error)
    toast.error(`Erreur lors de la création de l'événement: ${error.message}`);

  const data = useLoaderData();

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
      <ToastContainer />

      <div className="w-full p-3">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Création d'Événement
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Les champs du formulaire ici */}
          <FormInput
            label="Nom"
            name="name"
            value={formData.name}
            handleChange={handleChange}
            required
          />
          <FormInput
            label="URL de l'image"
            name="image_url"
            type="file"
            handleChange={handleChange}
          />
          <FormInput
            label="Adresse"
            name="address"
            handleChange={handleChange}
          />
          <FormInput label="Ville" name="city" handleChange={handleChange} />

          <div className="flex flex-col mb-2">
            <label className="text-black mb-2" htmlFor="region">
              Région:
            </label>
            <select
              className="select select-bordered w-full max-w-xs bg-slate-100"
              name="region"
              value={formData.region}
              onChange={handleChange}
            >
              <option value="" disabled>
                Choisissez votre région
              </option>
              {data.regions.map((region) => (
                <option key={region.nom} value={region.nom}>
                  {region.nom}
                </option>
              ))}
            </select>
          </div>

          <FormInput
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            handleChange={handleChange}
            required
          />
          <FormInput
            label="Code Postal"
            name="zip_code"
            handleChange={handleChange}
          />
          <FormInput
            label="Description"
            name="description"
            type="textarea"
            handleChange={handleChange}
          />

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Restauration</span>
              <input
                onChange={handleChange}
                name="catering"
                type="checkbox"
                defaultChecked
                className="checkbox"
                value={formData.catering}
              />
            </label>
          </div>

          <FormInput
            label="Prix"
            name="price"
            type="number"
            min="0"
            value={formData.price.toString()}
            handleChange={handleChange}
          />
          <FormInput
            label="Nombre total de places"
            name="total_slots"
            type="number"
            min="1"
            value={formData.total_slots.toString()}
            handleChange={handleChange}
            required
          />

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Créer Événement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormInput({
  label,
  type = 'text',
  name,
  value,
  handleChange,
  required,
  checked,
  min,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-gray-700 text-sm font-semibold mb-2"
      >
        {label}:
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          onChange={handleChange}
          rows="3"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
        ></textarea>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          required={required}
          min={min}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
        />
      )}
    </div>
  );
}
