import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

// 1) GraphQL mutation
const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String!, $password: String, $profilePhoto: String) {
    updateUser(id: $id, username: $username, password: $password, profilePhoto: $profilePhoto) {
      id
      username
      profilePhoto
    }
  }
`;

const EditUser = ({ userId, initialUsername, initialProfilePhoto, onClose , onUpdate}) => {
  // 2) State for username/password/profilePhoto
  
  const [username, setUsername] = useState(initialUsername || "");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(initialProfilePhoto || "");

  const [notification, setNotification] = useState(null); // State for notification

  // 3) The useMutation hook
  const [updateUser] = useMutation(UPDATE_USER);

  // 4) The save button handler
  const handleSave = async () => {
    try {
      //const randomId = Math.floor(Math.random() * 1000000);
      const variables = { 
        id: userId, 
        username, 
        password: password, 
        profilePhoto: profilePhoto
      };
  
      console.log("Sending variables to mutation:", variables); // Debug log
      await updateUser({ variables });
  
      setNotification({
        type: "success",
        message: "User updated successfully!",
      });

      // Close the modal after a short delay
      setTimeout(() => {
        setNotification(null);
        onClose();
        if (onUpdate) {
          onUpdate({
            username,
            profilePhoto,
          });
        }
      }, 200000);
      if (onUpdate) {
        onUpdate({
          username,
          profilePhoto,
        });
      }
    } catch (error) {
      console.error("Error updating user:", error.message); // Log full error
      setNotification({
        type: "error",
        message: "Failed to update user. Please try again.",
      });
    }
  };
  

  // 5) Convert uploaded image to base64
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setProfilePhoto(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-[1000]">
  <div className="bg-gray-800 p-6 text-white rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

{/* Notification */}
{notification && (
          <div
            className={`p-4 mb-4 rounded ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notification.message}
          </div>
        )}
    {/* Username Field */}
    <div className="mb-4">
      <label className="block mb-2">Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 bg-gray-700 rounded"
      />
    </div>

    {/* Password Field */}
    <div className="mb-4">
      <label className="block mb-2">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 bg-gray-700 rounded"
      />
    </div>

    {/* Profile Photo Field */}
    <div className="mb-4">
      <label className="block mb-2">Profile Photo:</label>
      <input
        type="file"
        onChange={handleProfilePhotoChange}
        className="w-full p-2 bg-gray-700 rounded"
      />
      {profilePhoto && (
        <img
          src={profilePhoto}
          alt="Preview"
          className="mt-2 w-24 h-24 object-cover rounded-full mx-auto"
        />
      )}
    </div>

    {/* Buttons */}
    <div className="flex justify-end space-x-4">
      <button
        onClick={handleSave}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
      <button
        onClick={onClose}
        className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
      >
        Cancel
      </button>
    </div>
  </div>
</div>

  );
};

export default EditUser;
