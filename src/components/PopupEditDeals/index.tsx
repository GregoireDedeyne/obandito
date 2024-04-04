export default function PopupEditDeals({
  handleFormSubmitStatus,
  selectedStatus,
  setSelectedStatus,
}) {
  console.log('selectedStatus', selectedStatus);
  console.log('setSelectedStatus', setSelectedStatus);

  return (
    <dialog id="deals" className="modal">
      <div className="modal-box bg-color-primary">
        <h3 className="font-bold text-lg mb-8">Modifier le statut</h3>
        <form onSubmit={handleFormSubmitStatus}>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:border-gray-500 text-black"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="pending">pending</option>
            <option value="validated">validated</option>
            <option value="refused">refused</option>
          </select>
          <button className="text-right w-full text-white" type="submit">
            Enregistrer
          </button>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button className="text-white">close</button>
        </form>
      </div>
    </dialog>
  );
}
