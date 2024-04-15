export function PopupEditReview({
  handleFormSubmitReview,
  formData,
  setFormData,
}) {
  return (
    <dialog id="editReview" className="modal">
      <div className="modal-box bg-color-primary relative">
        <h3 className="font-bold text-lg mb-8">Modifier mon avis</h3>
        <form onSubmit={handleFormSubmitReview} className="modal-backdrop">
          <label
            className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5"
            htmlFor="avis"
          >
            <span>Avis</span>
            <input
              name="avis"
              type="text"
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
              placeholder="Votre avis"
            />
          </label>

          <label
            className="input input-bordered flex items-center gap-2 bg-white text-black w-full mb-5"
            htmlFor="rating"
          >
            <span>Rating</span>
            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: parseInt(e.target.value) })
              }
              placeholder="Votre rating (entre 0 et 5)"
            />
          </label>

          <button className="text-right w-full text-white" type="submit">
            Enregistrer
          </button>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button className="text-white absolute top-7 right-7" type="button">
            Fermer
          </button>
        </form>
      </div>
    </dialog>
  );
}
