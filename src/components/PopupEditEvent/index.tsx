import { useMutation } from '@apollo/client';
import { useState } from 'react';

interface Region {
  nom: string;
}

interface PopupEditEventProps {
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formData: {
    image_url: File | null;
    name: string;
    region: string;
    description: string;
    address: string;
    city: string;
    zip_code: number;
    date: Date;
    total_slots: number;
    price: number;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      image_url: File | null;
      name: string;
      region: string;
      description: string;
      address: string;
      city: string;
      zip_code: number;
      date: Date;
      total_slots: number;
      price: number;
    }>
  >;
  regions: Region[];
}

export function PopupEditEvent({
  handleFormSubmit,
  formData,
  setFormData,
  regions,
}: PopupEditEventProps) {
  return (
    <dialog id="event" className="modal">
      <div className="modal-box bg-color-primary relative">
        <h3 className="font-bold text-lg mb-8">Modifier mes données</h3>
        <form onSubmit={handleFormSubmit} className="modal-backdrop">
          <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
            Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setFormData({ ...formData, image_url: file });
              }}
            />
          </label>

          <label
            className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5"
            htmlFor="name"
          >
            <span>Nom</span>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Votre nom"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
            <span>Région</span>
            <select
              className="select select-bordered w-full max-w-xsflex items-center my-2  bg-slate-100 w-[80%]"
              name="region"
              value={formData.region}
              onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })
              }
            >
              <option value="" disabled>
                Choississez votre région
              </option>
              {regions.map((region) => (
                <option key={region.nom} value={region.nom}>
                  {region.nom}
                </option>
              ))}
            </select>
          </label>

          <label
            className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5"
            htmlFor="description"
          >
            Description
            <textarea
              className="input input-bordered flex items-center gap-2 bg-white w-full pr-0"
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              placeholder="Description"
            />
          </label>

          <label
            className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5"
            htmlFor="address"
          >
            Adresse
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
            />
          </label>

          <label
            className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5"
            htmlFor="city"
          >
            ville
            <input
              name="city"
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
            />
          </label>

          <label
            className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5"
            htmlFor="zip"
          >
            code postal
            <input
              name="zip"
              type="texte"
              value={formData.zip_code}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  zip_code: e.target.value,
                })
              }
            />
          </label>

          <label
            className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5"
            htmlFor="date"
          >
            date
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
            />
          </label>

          <label
            className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5"
            htmlFor="total_slots"
          >
            total_slots
            <input
              name="total_slots"
              type="number"
              value={formData.total_slots}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  total_slots: parseInt(e.target.value),
                })
              }
            />
          </label>

          <label
            className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5"
            htmlFor="price"
          >
            prix
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: parseInt(e.target.value),
                })
              }
            />
          </label>

          <button className="text-right w-full text-white" type="submit">
            Enregistrer
          </button>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button className="text-white absolute top-7 right-7">Fermer</button>
        </form>
      </div>
    </dialog>
  );
}
