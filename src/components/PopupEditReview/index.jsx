/**
 * Component for a popup to edit a review.
 * @param {function} handleFormSubmitReview - Function to handle form submission for the review.
 * @param {object} formData - Form data for the review.
 * @param {function} setFormData - Function to set the form data.
 */

export function PopupEditReview({
  handleFormSubmitReview,
  formData,
  setFormData,
}) {
  return (
    <dialog id="editReview" className="modal">
      <div className="modal-box bg-white relative">
        <h3 className="font-bold text-lg mb-8">Modifier mon avis</h3>
        <form onSubmit={handleFormSubmitReview} className="modal-backdrop">
          <label
            className="form-control flex flex-col mb-5 text-black"
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
              className="input input-bordered input-black bg-white text-black"
            />
          </label>

          <label
            className="form-control flex flex-col mb-5 text-black"
            htmlFor="rating"
          >
            <span>Rating</span>
            <input
              name="rating"
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: parseInt(e.target.value) })
              }
              placeholder="Votre rating (entre 1 et 5)"
              className="input input-bordered input-black bg-white text-black"
            />
          </label>

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
