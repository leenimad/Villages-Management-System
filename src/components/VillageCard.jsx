import React from "react";

const VillageCard = ({ villageName, region }) => {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white px-4 py-2 rounded-lg mb-2 shadow">
      <div className="font-bold">
        {villageName} - {region}
      </div>
      <div className="flex gap-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-sm px-3 py-1 rounded">View</button>
        <button className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1 rounded">Update Village</button>
        <button className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded">Delete Village</button>
        <button className="bg-yellow-600 hover:bg-yellow-700 text-sm px-3 py-1 rounded">
          Update Demographic Data
        </button>
      </div>
    </div>
  );
};

export default VillageCard;
