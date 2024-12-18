import React from "react";

const Pagination = () => {
  return (
    <div className="flex justify-end mt-4">
      <button className="bg-gray-700 text-white px-4 py-2 rounded-l hover:bg-gray-600">Prev</button>
      <button className="bg-gray-700 text-white px-4 py-2 rounded-r hover:bg-gray-600 ml-1">Next</button>
    </div>
  );
};

export default Pagination;
