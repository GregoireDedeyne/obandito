import React, { useState } from 'react';

function SearchableTable() {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    </div>
  );
}

export default SearchableTable;
