import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_IMAGES = gql`
  query {
    getImages {
      id
      url
      description
    }
    getVillages {
      id
      name
      image
      region
    }
  }
`;

const ADD_IMAGE = gql`
  mutation ($url: String!, $description: String!) {
    addImage(url: $url, description: $description) {
      id
      url
      description
    }
  }
`;

const DELETE_IMAGE = gql`
  mutation ($id: ID!) {
    deleteImage(id: $id)
  }
`;

const Gallery = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For preview modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Image preview modal state
  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false); // Add image modal state
  const [imageFile, setImageFile] = useState(null); // Image file data
  const [imageDescription, setImageDescription] = useState(""); // Description for the new image
  const role = localStorage.getItem("role"); // Get the user's role

  const { loading, error, data, refetch } = useQuery(GET_IMAGES);
  const [addImage] = useMutation(ADD_IMAGE);
  const [deleteImage] = useMutation(DELETE_IMAGE);

  useEffect(() => {
    if (data) {
      const galleryImages = data.getImages.map((img) => ({
        id: img.id,
        url: img.url,
        description: img.description,
        type: "gallery", // Label as gallery image
      }));

      const villageImages = data.getVillages
        .filter((v) => v.image) // Only include villages with images
        .map((village) => ({
          id: village.id,
          url: village.image,
          description: `${village.name} (${village.region})`,
          type: "village", // Label as village image
        }));

      setGalleryImages([...galleryImages, ...villageImages]);
    }
  }, [data]);

  const openAddImageModal = () => setIsAddImageModalOpen(true);

  const closeAddImageModal = () => {
    setIsAddImageModalOpen(false);
    setImageFile(null);
    setImageDescription("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageFile(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (imageFile && imageDescription) {
      await addImage({ variables: { url: imageFile, description: imageDescription } });
      refetch(); // Refresh data
      closeAddImageModal(); // Close modal
    }
  };

  const handleDeleteImage = async (id) => {
    await deleteImage({ variables: { id } });
    refetch(); // Refresh data
    setSelectedImage(null); // Close the preview modal
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error: {error.message}</p>;

  return (
    <div className="flex bg-[#1a202c] min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div
  className={`transition-all duration-300 ${
    isSidebarOpen ? "ml-64" : "ml-0"
  } p-4 sm:p-6 w-full text-white`}
>
        {/* Add New Image Button for Admin */}
        {role === "Admin" && (
          <button
            onClick={openAddImageModal}
            className="bg-[#4a5568] text-white px-4 py-2 rounded hover:bg-[#394356]"
          >
            Add New Image
          </button>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="bg-[#2d3748] rounded-lg p-4 text-center cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.url}
                alt="Gallery"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <p className="text-gray-300">{image.description}</p>
            </div>
          ))}
        </div>

        {/* Add Image Modal */}
        {isAddImageModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-[#1a202c] p-6 rounded-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Add New Image</h2>
                <button
                  onClick={closeAddImageModal}
                  className="text-gray-300 hover:text-red-500 text-2xl"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleAddImage}>
                <div className="mb-4">
                  <label htmlFor="image-description" className="block text-gray-400 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    id="image-description"
                    value={imageDescription}
                    onChange={(e) => setImageDescription(e.target.value)}
                    className="w-full px-4 py-2 bg-[#2d3748] text-white rounded border border-gray-600 focus:outline-none"
                    placeholder="Enter a description"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="image-file" className="block text-gray-400 mb-2">
                    Select Image
                  </label>
                  <input
                    type="file"
                    id="image-file"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-2 bg-[#2d3748] text-white rounded border border-gray-600 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#4a5568] text-white px-4 py-2 rounded hover:bg-[#394356] w-full"
                >
                  Add Image
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Image Preview Modal */}
        {isModalOpen && selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-[#1a202c] p-4 rounded-lg max-w-4xl overflow-y-auto max-h-[90vh] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                  {selectedImage.description || "Image Preview"}
                </h2>
                <button
                  onClick={closeImageModal}
                  className="text-gray-300 hover:text-red-500 text-2xl"
                >
                  &times;
                </button>
              </div>
              <img
                src={selectedImage.url}
                alt="Full View"
                className="w-full h-auto object-cover rounded-md"
              />
              {role === "Admin" && selectedImage.type === "gallery" && (
                <button
                  onClick={() => handleDeleteImage(selectedImage.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
                >
                  Delete Image
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
