import { useMutation } from '@apollo/client';
import { useState } from 'react';

export function PopupEditSettings({
  handleFormSubmit,
  formData,
  setFormData,
  role,
}) {
  return (
    <dialog id="settings" className="modal">
      <div className="modal-box bg-color-primary">
        <h3 className="font-bold text-lg mb-8">Modifier mes données</h3>
        <form onSubmit={handleFormSubmit} className="modal-backdrop">
          <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
            Image :
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, image_url: e.target.files[0] })
              }
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
            Nom :
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Votre nom"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
            Région :
            <input
              type="text"
              value={formData.region}
              onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })
              }
              placeholder="Votre région"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
            Description :
            <textarea
              className="input input-bordered flex items-center gap-2 bg-white w-full pr-0"
              type="text"
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

          <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
            code postal :
            <input
              type="texte"
              value={formData.zip_code}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  zip_code: parseInt(e.target.value, 10),
                })
              }
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
            ville :
            <input
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

          {role === 'Artiste' && (
            <>
              <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
                Lien spotify :
                <input
                  type="url"
                  value={formData.spotify_link}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      spotify_link: e.target.value,
                    })
                  }
                />
              </label>

              <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
                Lien Youtube :
                <input
                  type="url"
                  value={formData.youtube_link}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      youtube_link: e.target.value,
                    })
                  }
                />
              </label>
            </>
          )}

          <button className="text-right w-full text-white" type="submit">
            Enregistrer
          </button>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button className="text-white">Fermer</button>
        </form>
      </div>
    </dialog>
  );
}
