export default function PopupAddReview({
  handleFormSubmit,
  formData,
  setFormData,
}) {
  return (
    <dialog id="addReview" className="modal">
      <div className="modal-box bg-color-primary relative">
        <h3 className="font-bold text-lg mb-8">Ajouter un avis</h3>
        <form onSubmit={handleFormSubmit} className="modal-backdrop">
          <label
            className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5"
            htmlFor="name"
          >
            <span>review</span>
            <input
              name="name"
              type="text"
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
              placeholder="Votre nom"
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
