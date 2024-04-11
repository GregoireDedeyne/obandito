export function PopupEditSettings({
  handleFormSubmit,
  formData,
  setFormData,
  role,
  regions,
}) {
  // console.log('formData2', formData);
  return (
    <dialog id="settings" className="modal">
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

          <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
            <span>Nom</span>
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

          <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
            Description
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
            Adresse
            <input
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

          <label className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5">
            code postal
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
            ville
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
                Lien spotify
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
                Lien Youtube
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
          <button className="text-white absolute top-7 right-7">Fermer</button>
        </form>
      </div>
    </dialog>
  );
}
