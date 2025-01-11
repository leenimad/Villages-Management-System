  import React, { useState ,useEffect} from "react";
  //import React,{useEffect} from "react";
  import Sidebar from "../components/Sidebar";
  import VillageCard from "../components/VillageCard";
  import Modal from "../components/Modal";
  import Pagination from "../components/Pagination";
  import SearchBar from "../components/SearchBar";
  import Dropdown from "../components/Dropdown";
  //import { gql, useQuery } from '@apollo/client';
  import { gql, useQuery, useMutation } from '@apollo/client';


  // GraphQL Mutations
  const ADD_VILLAGE = gql`
    mutation AddVillage($input: VillageInput!) {
      addVillage(input: $input) {
        id
        name
        region
        landArea
        latitude
        longitude
        tags
        image
      }
    }
  `;

  const UPDATE_VILLAGE = gql`
    mutation UpdateVillage($id: ID!, $input: VillageInput!) {
      updateVillage(id: $id, input: $input) {
        id
        name
        region
        landArea
        latitude
        longitude
        tags
        image
      }
    }
  `;

  const DELETE_VILLAGE = gql`
    mutation DeleteVillage($id: ID!) {
      deleteVillage(id: $id)
    }
  `;

  const GET_VILLAGES = gql`
    query {
      getVillages {
        id
        name
        region
        landArea
        latitude
        longitude
        tags
        image
      }
    }
  `;


  const VillageManagement = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [addVillage] = useMutation(ADD_VILLAGE, {
      refetchQueries: [{ query: GET_VILLAGES }],
    });
    
  const [updateVillage] = useMutation(UPDATE_VILLAGE);
  const [deleteVillage] = useMutation(DELETE_VILLAGE);

    const { loading, error, data } = useQuery(GET_VILLAGES);
    const [villages, setVillages] = useState([]);

    //const [villages, setVillages] = useState(villagesData);
    const [selectedOption, setSelectedOption] = useState("Default"); // Fixed here
    //   //const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
  const [searchQuery, setSearchQuery] = useState("");
  /////////// for roles 
  const [userRole, setUserRole] = useState(null);  
  const [isUnauthorizedModalOpen, setIsUnauthorizedModalOpen] = useState(false);
    const [unauthorizedMessage, setUnauthorizedMessage] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");

    // Example in the form where you upload the file:
  const [imageBase64, setImageBase64] = useState(null);

  const [populationSize, setPopulationSize] = useState("");
  const [age0to18, setAge0to18] = useState("");
const [age19to35, setAge19to35] = useState("");
const [age36to50, setAge36to50] = useState("");
const [age51to65, setAge51to65] = useState("");
const [age65plus, setAge65plus] = useState("");


  const [maleRatio, setMaleRatio] = useState("");
const [femaleRatio, setFemaleRatio] = useState("");

  const [growthRate, setGrowthRate] = useState("");
  const [initialVillages, setInitialVillages] = useState([]); // Add a separate state for the original data

useEffect(() => {
  if (data) {
    setVillages(data.getVillages); // Populate `villages`
    setInitialVillages(data.getVillages); // Populate `initialVillages`
  }
}, [data]);


  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      // reader.result will be something like: "data:image/png;base64,iVBORw0KGgoAAA..."
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file); // converts file to Base64
  };




  const handleAddVillageButton = () => {
    // Clear all form fields
    setVillageName("");
    setRegion("");
    setLandArea("");
    setLatitude("");
    setLongitude("");
    setTags("");
    setImage(null);
    setImageBase64(null);

    // Then open the modal
    setModalType("addVillage");
    setIsModalOpen(true);
  };


    const handleUpdateVillage = async (updatedVillage) => {
      try {
        await updateVillage({
          variables: {
            id: updatedVillage.id,
            input: {
              name: updatedVillage.name,
              region: updatedVillage.region,
              landArea: updatedVillage.landArea,
              latitude: updatedVillage.latitude,
              longitude: updatedVillage.longitude,
              tags: updatedVillage.tags,
              image: updatedVillage.image,  // old or new
            },
          },
        });
        // Optionally refetch GET_VILLAGES or merge into state 
        closeModal();
      } catch (error) {
        console.error("Error updating village:", error);
      }
    };
    

    useEffect(() => {
      if (data) {
        setVillages(data.getVillages);
      }
    }, [data]);

    useEffect(() => { 
      // Simulating fetching user data from localStorage or an API
      const storedRole = localStorage.getItem("role"); // Default to "user" if no role is found
      setUserRole(storedRole);
    }, []);

    useEffect(() => {
      console.log("Updated Villages:", villages);
    }, [villages]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading villages.</p>;

    
    
  // Filter villages based on search query 
  const filteredVillages = villages.filter((village) =>
    village.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


    // Debugging: Log whenever the villages state updates
    
  
    
  /////////////////////////////////sort by functionality

  const handleSortChange = (option) => {
    // setSelectedOption(option);
    setSelectedOption(option); // Fixed here

    if (option === "Alphabetical") {
      const sortedVillages = [...villages].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setVillages(sortedVillages);
    } else if (option === "Default") {
      setVillages(initialVillages);
    }
  };
  ////////////////////////////////////////////////////////////////
  /// for roles
  const handleUnauthorized = (message) => {
    setUnauthorizedMessage(message);
    setIsUnauthorizedModalOpen(true);
  };

  const closeUnauthorizedModal = () => {
    setIsUnauthorizedModalOpen(false);
    setUnauthorizedMessage("");
  };
  //////////////////////////////////////////////////
    const handleView = (village) => {
      setSelectedVillage(village);
      setModalType("view");
      setIsModalOpen(true);
    };

    // const handleUpdate = (village) => {
    //   ////////////// for roles
    //   // if (userRole !== "Admin") {
    //   //   handleUnauthorized("You are not authorized to update village details.");
    //   //   return;
    //   // }
    //   ////////////////
    //   setSelectedVillage(village);
    //   setVillageName(village.name);
    //   setRegion(village.region);
    //   setLandArea(village.landArea || "");
    //   setLatitude(village.latitude || "");
    //   setLongitude(village.longitude || "");
    //   setTags(village.tags || "");
    //   setImage(village.image || null);
    //   setModalType("update");
    //   setIsModalOpen(true);
    // };
    const handleUpdate = async (village) => {
      try {
        const updatedVillage = {
          name: villageName,
          region: region,
          landArea: parseFloat(landArea),
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          tags: tags.split(",").map((tag) => tag.trim()),
        };
    
        const { data } = await updateVillage({ variables: { id: village.id, input: updatedVillage } });
        setVillages((prev) =>
          prev.map((v) => (v.id === data.updateVillage.id ? data.updateVillage : v))
        );
        closeModal();
      } catch (err) {
        console.error("Error updating village:", err);
      }
    };

    const handleOpenUpdateModal = (village) => {
      // Set the states from the existing village data
      setVillageName(village.name || "");
      setRegion(village.region || "");
      setLandArea(village.landArea?.toString() || "");
      setLatitude(village.latitude?.toString() || "");
      setLongitude(village.longitude?.toString() || "");
      setTags(village.tags ? village.tags.join(", ") : "");
      setImage(village.image || null);
    
      // Keep track of which village we’re updating
      setSelectedVillage(village);
    
      // Switch the modal to "update" mode
      setModalType("update");
      setIsModalOpen(true);
    };
    
    
    

    const handleAddDemographic = (village) => {
      ///////////// for roles
      // if (userRole !== "Admin") {
      //   handleUnauthorized("You are not authorized to update village details.");
      //   return;
      // }
        //////////////////////
      setSelectedVillage(village);
      setModalType("addDemographic");
      setIsModalOpen(true);
    };

    const handleDeleteClick = (village) => {
      ///////////// for roles

      // if (userRole !== "Admin") {
      //   handleUnauthorized("You are not authorized to delete villages.");
      //   return;
      // }
      //////////////////////////
      setVillageToDelete(village); // Set the village to delete
      setIsDeleteModalOpen(true); // Open the delete modal
    };

    const handleDemographicSubmit = async (e) => {
          e.preventDefault();
          // 1) Validate age distribution
          const ageSum =
  parseInt(age0to18 || "0", 10) +
  parseInt(age19to35 || "0", 10) +
  parseInt(age36to50 || "0", 10) +
  parseInt(age51to65 || "0", 10) +
  parseInt(age65plus || "0", 10);

if (ageSum !== 100) {
  setErrorMessage("Please ensure 0–18, 19–35, 36–50, 51–65, and 65+ total 100%!");
  return;
}

        // 2) Validate gender ratios
  const genderSum =
  parseInt(maleRatio || "0", 10) +
  parseInt(femaleRatio || "0", 10);
if (genderSum !== 100) {
  setErrorMessage("Please ensure Male + Female = 100%!");
  return;
}

// 3) Build final strings
const ageDistributionString = 
  `0-18: ${age0to18}%, ` +
  `19-35: ${age19to35}%, ` +
  `36-50: ${age36to50}%, ` +
  `51-65: ${age51to65}%, ` +
  `65+: ${age65plus}%`;

//const ageDistributionString = `0-14: ${age0to14}%, 15-65: ${age15to65}%, 65+: ${age65plus}%`;
const genderRatiosString = `Male: ${maleRatio}%, Female: ${femaleRatio}%`;

  setErrorMessage("");

  //const ageDistributionString = `0-14: ${age0to14}%, 15-65: ${age15to65}%, 65+: ${age65plus}%`;

      const updatedFields = {
        populationSize: parseInt(populationSize, 10),
        ageDistribution: ageDistributionString,   
        genderRatios: genderRatiosString,
        growthRate,
      };
    
      // Update the existing village with new fields
      try {
        await updateVillage({
          variables: {
            id: selectedVillage.id,
            input: {
              // keep old fields, or user can re-enter them
              name: selectedVillage.name,
              region: selectedVillage.region,
              // ...
              ...updatedFields,
            },
          },
        });
        
        // Optionally update local state
        setVillages((prev) =>
          prev.map((v) =>
            v.id === selectedVillage.id
              ? { ...v, ...updatedFields }
              : v
          )
        );
    
        closeModal();
      } catch (error) {
        console.error("Error adding demographic data:", error);
      }
    };
    
    
    const confirmDelete = async () => {
      try {
        await deleteVillage({ variables: { id: villageToDelete.id } });
        setVillages((prev) => prev.filter((v) => v.id !== villageToDelete.id));
        setIsDeleteModalOpen(false);
      } catch (err) {
        console.error("Error deleting village:", err);
      }
    };
    
    
    const cancelDelete = () => {
      setIsDeleteModalOpen(false); // Close the modal
      setVillageToDelete(null); // Reset selected village
    };

    const handleAddVillage = async (newVillage) => {
      try {
        // e.g., parse your numeric fields explicitly, if needed
        newVillage.landArea = parseFloat(newVillage.landArea || 0);
        newVillage.latitude = parseFloat(newVillage.latitude || 0);
        newVillage.longitude = parseFloat(newVillage.longitude || 0);
    
        const { data } = await addVillage({ variables: { input: newVillage } });
        setVillages((prev) => [...prev, data.addVillage]);
        closeModal();
      } catch (err) {
        console.error("Error adding village:", err);
      }
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
    
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //const currentVillages = villages.slice(indexOfFirstItem, indexOfLastItem);

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
      <div className="flex flex-col lg:flex-row min-h-screen bg-[#1a202c] overflow-hidden lg:overflow-visible"> 
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div
  className={`flex-1   overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-fullmax-h-screen transition-all duration-300 ${
    isSidebarOpen ? "ml-64" : "mt-6 ml-0"
  } p-4 sm:p-6 w-full text-white`}
>


          {/* Header */}
          <div className="flex justify-between items-center mb-6 p-4 sm:p-0">
  {userRole === "Admin" && (
    <button
      onClick={handleAddVillageButton}
      className="bg-[#4a5568] hover:bg-[#3b4453] text-white px-4 py-2 rounded shadow-md w-full sm:w-auto"
    >
      Add New Village
    </button>
  )}
</div>


            {/* Search, Sort, and Pagination Section */}
          <div className="bg-[#2d3748] p-4 rounded-lg mb-6 shadow-md relative">
            <h1 className="text-xl font-semibold text-[#c4ced9] mb-4">View Village List</h1>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {/* Sort by and Pagination Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2 ">
                <label className="text-gray-400">Sort by:</label>
                      <Dropdown
                  options={["Default", "Alphabetical"]}
                  defaultOption="Default"
                  onChange={handleSortChange}
                />
                  {/* Page Number */}
              
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
                          {filteredVillages.slice(indexOfFirstItem, indexOfLastItem).map((village) => (
                      <VillageCard
                        key={village.id}
                        villageName={village.name}
                        region={village.region}
                        onView={() => handleView(village)}
                        //////////////////////////////////////
                        onUpdate={userRole === "Admin" ? () => handleOpenUpdateModal(village) : null}
                        //onUpdate={userRole === "Admin" ? () => handleUpdate(village) : null}
                        onDelete={userRole === "Admin" ? () => handleDeleteClick(village) : null}
                        onAddDemographic={userRole === "Admin" ? () => handleAddDemographic(village) : null}
                        userRole={userRole} // Pass user role to hide buttons in VillageCard

                      />
                    ))}
                  </div>
                  <div className="absolute bottom-[-40px] right-4 text-sm text-[#d6d9df] font-bold bg-[#1a202c]">
                Page: {currentPage} 
                
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
            src={selectedVillage.image}
            alt="Village"
            className="mt-2 w-full max-h-100 object-cover rounded-md"
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
          id: selectedVillage.id,  // keep the same ID
          name: villageName,
          region,
          landArea: parseFloat(landArea) || 0,
          latitude: parseFloat(latitude) || 0,
          longitude: parseFloat(longitude) || 0,
          tags: tags.split(",").map((t) => t.trim()),
          image, // either old or newly uploaded
        };

        handleUpdateVillage(updatedVillage);

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
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result); // Base64 string
            reader.readAsDataURL(file);
          }}
          //onChange={(e) => setImage(e.target.files[0])} // Handle file input
          className="w-full bg-gray-700 p-2 rounded text-white mt-2"
        />
        {image && (
          <div className="mt-2">
            <img
              src={image}
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
      onSubmit={handleDemographicSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block text-white mb-2">Population Size:</label>
        <input
          type="number"
          value={populationSize}
          onChange={(e) => setPopulationSize(e.target.value)}
          className="w-full bg-gray-700 p-2 rounded text-white"
          required
        />
      </div>

  {/* Age Distribution Fields on One Row */}
  <div className="flex space-x-4">
  <div className="flex flex-col flex-1">
    <label className="block text-white mb-1">Age 0-18 (%):</label>
    <input
      type="number"
      value={age0to18}
      onChange={(e) => setAge0to18(e.target.value)}
      className="bg-gray-700 p-2 rounded text-white w-full"
      required
    />
  </div>
  <div className="flex flex-col flex-1">
    <label className="block text-white mb-1">Age 19-35 (%):</label>
    <input
      type="number"
      value={age19to35}
      onChange={(e) => setAge19to35(e.target.value)}
      className="bg-gray-700 p-2 rounded text-white w-full"
      required
    />
  </div>
  <div className="flex flex-col flex-1">
    <label className="block text-white mb-1">Age 36-50 (%):</label>
    <input
      type="number"
      value={age36to50}
      onChange={(e) => setAge36to50(e.target.value)}
      className="bg-gray-700 p-2 rounded text-white w-full"
      required
    />
  </div>
  <div className="flex flex-col flex-1">
    <label className="block text-white mb-1">Age 51-65 (%):</label>
    <input
      type="number"
      value={age51to65}
      onChange={(e) => setAge51to65(e.target.value)}
      className="bg-gray-700 p-2 rounded text-white w-full"
      required
    />
  </div>
  <div className="flex flex-col flex-1">
    <label className="block text-white mb-1">Age 65+ (%):</label>
    <input
      type="number"
      value={age65plus}
      onChange={(e) => setAge65plus(e.target.value)}
      className="bg-gray-700 p-2 rounded text-white w-full"
      required
    />
  </div>
  
  </div>


      {/* Gender Ratios Fields on One Row */}
<div className="flex space-x-4">
  {/* Male (%) */}
  <div className="flex flex-col flex-1">
    <label className="block text-white mb-1">Male (%):</label>
    <input
      type="number"
      value={maleRatio}
      onChange={(e) => setMaleRatio(e.target.value)}
      className="bg-gray-700 p-2 rounded text-white w-full"
      required
    />
  </div>

  {/* Female (%) */}
  <div className="flex flex-col flex-1">
    <label className="block text-white mb-1">Female (%):</label>
    <input
      type="number"
      value={femaleRatio}
      onChange={(e) => setFemaleRatio(e.target.value)}
      className="bg-gray-700 p-2 rounded text-white w-full"
      required
    />
  </div>
</div>

      <div>
        <label className="block text-white mb-2">Population Growth Rate:</label>
        <input
          type="text"
          value={growthRate}
          onChange={(e) => setGrowthRate(e.target.value)}
        
          className="w-full bg-gray-700 p-2 rounded text-white"
          required
        />
      </div>

      {/* If there's an error, display it here */}
    {errorMessage && (
      <div className="p-2 bg-red-600 text-white rounded">
        {errorMessage}
      </div>
    )}

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
    <div className="space-y-4 p-4 sm:p-6">
    
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent page reload
        handleAddVillage({
          name: villageName,
          region: region,
          landArea: landArea,
          latitude: latitude,
          longitude: longitude,
          tags: tags.split(",").map((t) => t.trim()),
          image: imageBase64,  // Include the uploaded image
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
          onChange={onImageChange} // Handle file input
          className="w-full bg-gray-700 p-2 rounded text-white mt-2"
        />
        {image instanceof File && (
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
