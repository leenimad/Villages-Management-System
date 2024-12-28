import React, { useState ,useEffect} from "react";
//import React,{useEffect} from "react";
import Sidebar from "../components/Sidebar";
import VillageCard from "../components/VillageCard";
import Modal from "../components/Modal";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
const villagesData = [
  { id: 1, name: "Jabalia", region: "Gaza Strip" },
  { id: 2, name: "Beit Lahia", region: "Gaza Strip" },
  { id: 3, name: "Quds", region: "West Bank" },
  { id: 4, name: "Shejaiya", region: "Gaza Strip" },
  { id: 5, name: "Hebron", region: "West Bank" },
];

const VillageManagement = () => {
  const [villages, setVillages] = useState(villagesData);
  const [selectedOption, setSelectedOption] = useState("Default");
  //const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'view', 'update', 'addDemographic', or 'addVillage'
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [villageName, setVillageName] = useState("");
  const [region, setRegion] = useState("");
  const [landArea, setLandArea] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null); // For image upload
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [villageToDelete, setVillageToDelete] = useState(null);

  // Debugging: Log whenever the villages state updates
  useEffect(() => {
    console.log("Updated Villages:", villages);
  }, [villages]);
 
  
 /////////////////////////////////sort by functionality

const handleSortChange = (option) => {
  setSelectedOption(option);

  if (option === "Alphabetical") {
    const sortedVillages = [...villages].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setVillages(sortedVillages);
  } else if (option === "Default") {
    setVillages(villagesData);
  }
};
////////////////////////////////////////////////////////////////
  const handleView = (village) => {
    setSelectedVillage(village);
    setModalType("view");
    setIsModalOpen(true);
  };

  const handleUpdate = (village) => {
    setSelectedVillage(village);
    setVillageName(village.name);
    setRegion(village.region);
    setLandArea(village.landArea || "");
    setLatitude(village.latitude || "");
    setLongitude(village.longitude || "");
    setTags(village.tags || "");
    setImage(village.image || null);
    setModalType("update");
    setIsModalOpen(true);
  };
  

  const handleAddDemographic = (village) => {
    setSelectedVillage(village);
    setModalType("addDemographic");
    setIsModalOpen(true);
  };

  const handleDeleteClick = (village) => {
    setVillageToDelete(village); // Set the village to delete
    setIsDeleteModalOpen(true); // Open the delete modal
  };
  
  const confirmDelete = () => {
    setVillages(villages.filter((v) => v.id !== villageToDelete.id)); // Remove the village
    setIsDeleteModalOpen(false); // Close the modal
    setVillageToDelete(null); // Reset selected village
  };
  
  const cancelDelete = () => {
    setIsDeleteModalOpen(false); // Close the modal
    setVillageToDelete(null); // Reset selected village
  };
  

  const handleAddVillage = () => {
    setModalType("addVillage");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVillage(null);
    setModalType("");
  };

  const saveNewVillage = (newVillage) => {
    setVillages([...villages, { id: villages.length + 1, ...newVillage }]);
    closeModal();
  };
  ///////////////////////////for pagination
 // const [villages, setVillages] = useState(villagesData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVillages = villages.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(villages.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  ///////////////////////////////////////////

  return (
    <div className="flex bg-[#1a202c] min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 p-6 flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleAddVillage}
            className="bg-[#4a5568] hover:bg-[#3b4453] text-white px-4 py-2 rounded shadow-md"
          >
            Add New Village
          </button>
        </div>

        {/* Search, Sort, and Pagination Section */}
         <div className="bg-[#2d3748] p-4 rounded-lg mb-6 shadow-md">
          <h1 className="text-xl font-semibold text-[#c4ced9] mb-4">View Village List</h1>
          
            <SearchBar/>
          {/* Sort by and Pagination Buttons */}
          <div className="mt-4 flex justify-between items-center">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 ">
              <label className="text-gray-400">Sort by:</label>
                    <Dropdown
                options={["Default", "Alphabetical"]}
                defaultOption="Default"
                onChange={handleSortChange}
              />
                 {/* Page Number */}
            <div className="absolute bottom-[-40px] right-4 text-sm text-[#d6d9df] font-bold">
              Page: {currentPage}
            </div>
            </div>

            {/* Pagination Buttons */}
          
              <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(villages.length / itemsPerPage)}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
          />
          
          </div>

          {/* Village List */}
          <div className="space-y-4 bg mt-4">
        
            {currentVillages.map((village) => (
                  <VillageCard
                    key={village.id}
                    villageName={village.name}
                    region={village.region}
                    onView={() => handleView(village)}
                    onUpdate={() => handleUpdate(village)}
                    onDelete={() => handleDeleteClick(village)} // Updated
                    onAddDemographic={() => handleAddDemographic(village)}
                  />
                ))}
    
          </div>
        </div>

        
      </div>
      {/* Modals */}
      {isModalOpen && (
          <Modal
            title={
              modalType === "view"
                ? "Village Details"
                : modalType === "update"
                ? "Update Village"
                : modalType === "addDemographic"
                ?`Add Demographic Data for ${selectedVillage?.name}`
                : "Add New Village"
            }
            onClose={closeModal}
          >
           {modalType === "view" && selectedVillage && (
  <div className="space-y-2">
    <p className="text-white">
      <strong>Village Name:</strong> {selectedVillage.name}
    </p>
    <p className="text-white">
      <strong>Region/District:</strong> {selectedVillage.region}
    </p>
    <p className="text-white">
      <strong>Land Area (sq km):</strong> {selectedVillage.landArea || "N/A"}
    </p>
    <p className="text-white">
      <strong>Latitude:</strong> {selectedVillage.latitude || "N/A"}
    </p>
    <p className="text-white">
      <strong>Longitude:</strong> {selectedVillage.longitude || "N/A"}
    </p>
    <p className="text-white">
      <strong>Tags:</strong> {selectedVillage.tags || "N/A"}
    </p>
    {selectedVillage.image && (
      <div>
        <strong className="text-white">Village Image:</strong>
        <img
          src={URL.createObjectURL(selectedVillage.image)}
          alt="Village"
          className="mt-2 w-full max-h-40 object-cover rounded-md"
        />
      </div>
    )}
  </div>
)}
{/* Update Village Modal */}
{modalType === "update" && (
  <form
    onSubmit={(e) => {
      e.preventDefault();

      // Update the village in the state
      const updatedVillage = {
        ...selectedVillage,
        name: villageName,
        region: region,
        landArea: landArea,
        latitude: latitude,
        longitude: longitude,
        tags: tags,
        image: image, // Retain uploaded image
      };

      setVillages((prevVillages) =>
        prevVillages.map((v) =>
          v.id === selectedVillage.id ? updatedVillage : v
        )
      );

      closeModal(); // Close modal after updating
    }}
    className="space-y-4"
  >
    <div>
      <label className="block text-white mb-0 mt-4">Village Name:</label>
      <input
        type="text"
        value={villageName}
        onChange={(e) => setVillageName(e.target.value)}
        className="w-full bg-gray-700 p-2 rounded text-white mt-2"
        required
      />
    </div>
    <div>
      <label className="block text-white mb-0 mt-4">Region/District:</label>
      <input
        type="text"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="w-full bg-gray-700 p-2 rounded text-white mt-2"
        required
      />
    </div>
    <div>
      <label className="block text-white mb-0 mt-4">Land Area (sq km):</label>
      <input
        type="number"
        value={landArea}
        onChange={(e) => setLandArea(e.target.value)}
        className="w-full bg-gray-700 p-2 rounded text-white mt-2"
        required
      />
    </div>
    <div>
      <label className="block text-white mb-0 mt-4">Latitude:</label>
      <input
        type="text"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        className="w-full bg-gray-700 p-2 rounded text-white mt-2"
        required
      />
    </div>
    <div>
      <label className="block text-white mb-0 mt-4">Longitude:</label>
      <input
        type="text"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        className="w-full bg-gray-700 p-2 rounded text-white mt-2"
        required
      />
    </div>
    <div>
      <label className="block text-white mb-0 mt-4">Upload Image:</label>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])} // Handle file input
        className="w-full bg-gray-700 p-2 rounded text-white mt-2"
      />
      {image && (
        <div className="mt-2">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full max-h-40 object-cover rounded-md"
          />
        </div>
      )}
    </div>
    <div className="mt-4 flex justify-end">
      <button
        type="submit"
        className="bg-[#4a5568] px-4 py-2 rounded text-white hover:bg-[#3b4453] w-full font-bold"
      >
        Update Village
      </button>
    </div>
  </form>
)}
{/* addDemographic Modal */}
{modalType === "addDemographic" && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      // Add your logic for saving demographic data
      console.log("Demographic data submitted");
      closeModal();
    }}
    className="space-y-4"
  >
    <div>
      <label className="block text-white mb-2">Population Size:</label>
      <input
        type="number"
        className="w-full bg-gray-700 p-2 rounded text-white"
        required
      />
    </div>
    <div>
      <label className="block text-white mb-2">Age Distribution:</label>
      <input
        type="text"
        placeholder="e.g., 0-14: 30%, 15-64: 60%, 65+: 10%"
        className="w-full bg-gray-700 p-2 rounded text-white"
        required
      />
    </div>
    <div>
      <label className="block text-white mb-2">Gender Ratios:</label>
      <input
        type="text"
        placeholder="e.g., Male: 51%, Female: 49%"
        className="w-full bg-gray-700 p-2 rounded text-white"
        required
      />
    </div>
    <div>
      <label className="block text-white mb-2">Population Growth Rate:</label>
      <input
        type="text"
       
        className="w-full bg-gray-700 p-2 rounded text-white"
        required
      />
    </div>
    <div className="mt-4 flex justify-end">
      <button
        type="submit"
        className="bg-[#4a5568] px-4 py-2 rounded text-white hover:bg-[#3b4453] w-full font-bold"
      >
        Add Demographic Data
      </button>
    </div>
  </form>
)}

{/* Add Village Modal */}
{modalType === "addVillage" && (
  <div className="space-y-4 " >
   
  <form
    onSubmit={(e) => {
      e.preventDefault(); // Prevent page reload
      saveNewVillage({
        name: villageName,
        region: region,
        landArea: landArea,
        latitude: latitude,
        longitude: longitude,
        tags: tags,
        image: image, // Include the uploaded image
      });
    }}
   className="space-y-4 "
  >
    <div>
      <label className="block text-white mb-0 mt-4">Village Name:</label>
      <input
        type="text"
        value={villageName}
        onChange={(e) => setVillageName(e.target.value)}
        
        className="w-full bg-gray-700 p-2 rounded text-white mt-2"
        required
      />
    </div>
    <div>
      <label className="block text-white mb-0 mt-4">Region/District:</label>
      <input
        type="text"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
       
        className="w-full bg-gray-700 p-2 rounded text-white mt-2"
        required
      />
    </div>
    <div>
      <label className="block text-white mb-0 mt-4">Land Area (sq km):</label>
      <input
        type="number"
        value={landArea}
        onChange={(e) => setLandArea(e.target.value)}
       
        className="w-full bg-[#374151] p-2 rounded text-white mt-2"
        required
      />
    </div>
    <div >
      <label className="block text-white mb-0 mt-4">Latitude:</label>
      <input
        type="text"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        
        className="w-full bg-gray-700 p-2 rounded text-white  mt-2"
        required
      />
    </div>
    <div>
      <label className="block text-white mb-0 mt-4">Longitude:</label>
      <input
        type="text"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      
        className="w-full bg-gray-700 p-2 rounded text-white mt-2"
        required
      />
    </div>
    <div>
      <label className="block text-white mb-0 mt-4">Upload Image:</label>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])} // Handle file input
        className="w-full bg-gray-700 p-2 rounded text-white mt-2"
      />
      {image && (
        <div className="mt-2">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full max-h-40 object-cover rounded-md"
          />
        </div>
      )}
    </div>
    <div>
      <label className="block text-white mb-0 mt-4">Categories/Tags:</label>
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="e.g., rural, urban"
        className="w-full bg-gray-700 p-2 rounded text-white mt-2"
      />
    </div>
    <div className="mt-4 flex  p-2">
      <button
        type="submit"
        className="bg-[#4a5568] px-4 py-2 rounded text-white hover:bg-[#3b4453] w-full h-full font-bold  flex items-center justify-center"
      >
        Add Village
      </button>
    </div>
  </form>
  </div>
)}

          </Modal>
        )}
                    {/* Delete Confirmation Modal */}
{isDeleteModalOpen && (
  <Modal title="Confirm Delete" onClose={cancelDelete}>
    <div className="text-white text-center">
      <p>Are you sure you want to delete <strong>{villageToDelete?.name}</strong>?</p>
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={confirmDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Yes, Delete
        </button>
        <button
          onClick={cancelDelete}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </Modal>
)}
    </div>
  );
};

export default VillageManagement;
// لحد هون كل الكبسات شغالات بس المودال تبع اد نيو فلج بده تزبيط 
// لاوم اتاكد انه ريسبونسف
// اسوي كبسات النكست والبريفيوس
//السورت باي بدها تعديلات
// ابدا فالسات والجاليري