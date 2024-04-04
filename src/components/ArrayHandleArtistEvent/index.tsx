export function ArrayHandleArtistEvent() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-gray-200  ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Artiste
            </th>
            <th scope="col" className="px-6 py-3">
              Evenement
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b  hover:bg-gray-50  ">
            <th scope="row" className="flex px-6 py-4 text-gray-900">
              <img
                className="hidden sm:block w-16 h-16 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1711973340406-afb7acf55b1d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Jese image"
              />
              <div className="ps-3">
                <div className="text-base font-semibold break-all">
                  Neil Sims
                </div>
                <div className="font-normal text-gray-500 break-all">
                  neil.sims@flowbite.com
                </div>
              </div>
            </th>
            <td className="px-6 py-4">React Developer</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                Validé
              </div>
            </td>
            <td className="px-6 py-4 text-center">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
          <tr className="bg-white  hover:bg-gray-50 ">
            <th
              scope="row"
              className="flex px-6 py-4 font-medium text-gray-900"
            >
              <img
                className="hidden sm:block w-16 h-16 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1711973340406-afb7acf55b1d?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Jese image"
              />
              <div className="ps-3">
                <div className="text-base font-semibold break-all">
                  Leslie Livingston
                </div>
                <div className="font-normal text-gray-500 break-all">
                  leslie@flowbite.com
                </div>
              </div>
            </th>
            <td className="px-6 py-4">SEO Specialist</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
                Refusé
              </div>
            </td>
            <td className="px-6 py-4 text-center">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
