/**
 * Component for a popup to edit deals.
 * @param {function} handleFormSubmitStatus - Function to handle form submission for status.
 * @param {string} selectedStatus - Currently selected status.
 * @param {function} setSelectedStatus - Function to set the selected status.
 */

export default function PopupEditDeals({
  handleFormSubmitStatus,
  selectedStatus,
  setSelectedStatus,
}) {
  return (
    <dialog id="deals" className="modal">
      <div className="modal-box bg-white relative">
        <h3 className="font-bold text-lg mb-8">Modifier le statut</h3>
        <form
          onSubmit={handleFormSubmitStatus}
          method="dialog"
          className="modal-backdrop"
        >
          <select
            className="select select-bordered select-black bg-white text-black w-full"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="pending">pending</option>
            <option value="validated">validated</option>
            <option value="refused">refused</option>
          </select>
          <button className="btn btn-outline mt-5" type="submit">
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
