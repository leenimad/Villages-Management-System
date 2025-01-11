const VillageCard = ({ villageName, region, onView, onUpdate, onDelete, onAddDemographic, userRole }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:justify-between items-start sm:items-center bg-[#374151] text-gray-300 px-6 py-4 rounded-lg shadow mb-1">
      {/* Village Name and Region */}
      <div className="font-semibold text-lg mb-2 sm:mb-0 text-center sm:text-left w-full sm:w-auto">
        {villageName} - {region}
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0 items-center sm:items-start w-full sm:w-auto">
        <button
          className="bg-[#718096] text-white px-3 py-1 rounded hover:bg-[#4a5568] font-medium w-full sm:w-auto"
          onClick={onView}
        >
          View
        </button>
        {userRole === "Admin" && (
          <>
            <button
              className="bg-[#718096] text-white px-3 py-1 rounded hover:bg-[#4a5568] font-medium w-full sm:w-auto"
              onClick={onUpdate}
            >
              Update
            </button>
            <button
              className="bg-[#718096] text-white px-3 py-1 rounded hover:bg-[#4a5568] font-medium w-full sm:w-auto"
              onClick={onDelete}
            >
              Delete
            </button>
            <button
              className="bg-[#718096] text-white px-3 py-1 rounded hover:bg-[#4a5568] font-medium w-full sm:w-auto"
              onClick={onAddDemographic}
            >
              Add Demographic
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VillageCard;
