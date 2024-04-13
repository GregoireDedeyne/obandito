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
      <div className="modal-box bg-white relative">
        <h3 className="font-bold text-lg mb-8">Modifier mes données</h3>
        <form onSubmit={handleFormSubmit} className="modal-backdrop">
          <label className="form-control flex flex-col mb-5">
            <div className="label">
              <span className="label-text">Image</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setFormData({ ...formData, image_url: file });
              }}
              className="input input-bordered input-black bg-white text-black"
            />
          </label>

          <label className="form-control flex flex-col mb-5">
            <div className="label">
              <span className="label-text">Nom</span>
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Votre nom"
              className="input input-bordered input-black bg-white text-black"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Région</span>
            </div>
            <select
              className="select select-bordered select-black bg-white text-black"
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

          <label className="form-control">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 textarea-black bg-white text-black"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            ></textarea>
          </label>

          <label className="form-control flex flex-col mb-5">
            <div className="label">
              <span className="label-text">Adresse</span>
            </div>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Votre address"
              className="input input-bordered input-black bg-white text-black"
            />
          </label>

          <label className="form-control flex flex-col mb-5">
            <div className="label">
              <span className="label-text">code postal</span>
            </div>
            <input
              type="text"
              value={formData.zip_code}
              onChange={(e) =>
                setFormData({ ...formData, zip_code: e.target.value })
              }
              placeholder="Votre code postal"
              className="input input-bordered input-black bg-white text-black"
            />
          </label>

          <label className="form-control flex flex-col mb-5">
            <div className="label">
              <span className="label-text">ville</span>
            </div>
            <input
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              placeholder="Votre ville"
              className="input input-bordered input-black bg-white text-black"
            />
          </label>

          {role === 'Artiste' && (
            <>
              <label className="form-control flex flex-col mb-5">
                <div className="label">
                  <span className="label-text">Lien spotify</span>
                </div>
                <input
                  type="url"
                  value={formData.spotify_link}
                  onChange={(e) =>
                    setFormData({ ...formData, spotify_link: e.target.value })
                  }
                  placeholder="Votre lien spotify"
                  className="input input-bordered input-black bg-white text-black"
                />
              </label>

              <label className="form-control flex flex-col mb-5">
                <div className="label">
                  <span className="label-text">Lien Youtube</span>
                </div>
                <input
                  type="url"
                  value={formData.youtube_link}
                  onChange={(e) =>
                    setFormData({ ...formData, youtube_link: e.target.value })
                  }
                  placeholder="Votre lien Youtube"
                  className="input input-bordered input-black bg-white text-black"
                />
              </label>
            </>
          )}

          <button className="btn btn-outline" type="submit">
            Enregistrer
          </button>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button className="text-white bg-red-500 rounded-full w-7 h-7 flex items-center justify-center absolute top-7 right-7">
            X
          </button>
        </form>
      </div>
    </dialog>
  );
}
