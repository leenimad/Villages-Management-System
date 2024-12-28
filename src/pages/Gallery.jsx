
// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";

// const Gallery = () => {
//   const [galleryImages, setGalleryImages] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [imageDescription, setImageDescription] = useState("");

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setImageFile(null);
//     setImageDescription("");
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//   };

//   const handleAddImage = (e) => {
//     e.preventDefault();

//     if (imageFile) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setGalleryImages((prevImages) => [
//           ...prevImages,
//           { url: event.target.result, description: imageDescription },
//         ]);
//         closeModal();
//       };
//       reader.readAsDataURL(imageFile);
//     }
//   };

//   return (
//     <div className="flex bg-[#1a202c] min-h-screen">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="ml-64 flex-1 p-6">
//         <div className="flex justify-start items-center mb-6">
//           <button
//             onClick={openModal}
//             className="bg-[#4a5568] text-white px-4 py-2 rounded hover:bg-[#394356]"
//           >
//             Add New Image
//           </button>
//         </div>

//         {/* Gallery Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {galleryImages.map((image, index) => (
//             <div
//               key={index}
//               className="bg-[#2d3748] rounded-lg p-4 text-center"
//             >
//               <img
//                 src={image.url}
//                 alt="Gallery"
//                 className="w-full h-40 object-cover rounded-md mb-4"
//               />
//               <p className="text-gray-300">{image.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
//             <div className="bg-[#1a202c] p-6 rounded-lg w-96">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-white">Add New Image</h2>
//                 <button
//                   onClick={closeModal}
//                   className="text-gray-300 hover:text-red-500 text-2xl"
//                 >
//                   &times;
//                 </button>
//               </div>
//               <form onSubmit={handleAddImage}>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="image-description"
//                     className="block text-gray-400 mb-2"
//                   >
//                     Description
//                   </label>
//                   <input
//                     type="text"
//                     id="image-description"
//                     value={imageDescription}
//                     onChange={(e) => setImageDescription(e.target.value)}
//                     className="w-full px-4 py-2 bg-[#2d3748] text-white rounded border border-gray-600 focus:outline-none"
//                     placeholder="Enter a description"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     htmlFor="image-file"
//                     className="block text-gray-400 mb-2"
//                   >
//                     Select Image
//                   </label>
//                   <input
//                     type="file"
//                     id="image-file"
//                     onChange={handleImageUpload}
//                     className="w-full px-4 py-2 bg-[#2d3748] text-white rounded border border-gray-600 focus:outline-none"
//                     required
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="bg-[#4a5568] text-white px-4 py-2 rounded hover:bg-[#394356] w-full"
//                 >
//                   Add Image
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Gallery;
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageDescription, setImageDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For enlarged image modal

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setImageFile(null);
    setImageDescription("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleAddImage = (e) => {
    e.preventDefault();

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setGalleryImages((prevImages) => [
          ...prevImages,
          { url: event.target.result, description: imageDescription },
        ]);
        closeModal();
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex bg-[#1a202c] min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6">
        <div className="flex justify-start items-center mb-6">
          <button
            onClick={openModal}
            className="bg-[#4a5568] text-white px-4 py-2 rounded hover:bg-[#394356]"
          >
            Add New Image
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
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
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-[#1a202c] p-6 rounded-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Add New Image</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-300 hover:text-red-500 text-2xl"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleAddImage}>
                <div className="mb-4">
                  <label
                    htmlFor="image-description"
                    className="block text-gray-400 mb-2"
                  >
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
                  <label
                    htmlFor="image-file"
                    className="block text-gray-400 mb-2"
                  >
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
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-[#1a202c] p-4 rounded-lg max-w-4xl">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
