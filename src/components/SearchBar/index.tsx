import React, { useState } from 'react';

function SearchableTable() {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 30, occupation: 'Developer' },
    { id: 2, name: 'Jane Smith', age: 25, occupation: 'Designer' },
    { id: 3, name: 'Michael Johnson', age: 35, occupation: 'Manager' },
    { id: 4, name: 'Emily Brown', age: 28, occupation: 'Engineer' },
  ]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <div className="relative mb-4">
        <input
          className="p-4 pr-16 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-color-primary"
          label="Rechercher"
          type="text"
          placeholder="Rechercher"
          value={searchText}
          onChange={handleChange}
        />
        <button className="absolute inset-y-0 right-0 px-4 py-2 bg-color-primary text-white rounded-r-lg hover:bg-white hover:text-color-primary focus:outline-none focus:bg-white focus:text-color-primary">
          Rechercher
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-4 border border-gray-300">ID</th>
            <th className="p-4 border border-gray-300">Nom</th>
            <th className="p-4 border border-gray-300">Âge</th>
            <th className="p-4 border border-gray-300">Profession</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="p-4 border border-gray-300">{item.id}</td>
              <td className="p-4 border border-gray-300">{item.name}</td>
              <td className="p-4 border border-gray-300">{item.age}</td>
              <td className="p-4 border border-gray-300">{item.occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchableTable;
