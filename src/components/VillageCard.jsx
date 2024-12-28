import React from "react";

const VillageCard = ({ villageName, region, onView, onUpdate, onDelete, onAddDemographic }) => {
  return (
    <div className="flex justify-between items-center bg-[#374151] text-gray-300 px-6 py-4 rounded-lg shadow mb-1">
      <div className="font-semibold text-lg">
        {villageName} - {region}
      </div>
      <div className="flex gap-2">
        <button
          className="bg-[#718096] text-white px-3 py-1 rounded hover:bg-[#4a5568] font-medium"
          onClick={onView}
        >
          View
        </button>
        <button
          className="bg-[#718096] text-white px-3 py-1 rounded hover:bg-[#4a5568] font-medium"
          onClick={onUpdate}
        >
          Update Village
        </button>
        <button
  onClick={onDelete} // Use the onDelete prop
  className="bg-[#718096] text-white px-1 py-1 rounded hover:bg-[#4a5568] font-medium"
>
  Delete Village
</button>
        <button
          className="bg-[#718096] text-white px-3 py-1 rounded hover:bg-[#4a5568] font-medium"
          onClick={onAddDemographic}
        >
          Update Demographic Data
        </button>
      </div>
    </div>
  );
};

export default VillageCard;
