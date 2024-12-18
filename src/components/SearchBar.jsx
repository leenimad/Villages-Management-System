import React from "react";

const SearchBar = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Search villages..."
        className="w-full md:w-1/2 px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Add New Village</button>
    </div>
  );
};

export default SearchBar;
