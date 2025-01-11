import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error modal
  const navigate = useNavigate();


  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePhoto(reader.result); // Store the Base64 string
    };
    reader.readAsDataURL(file); // Convert file to Base64
  };

  // Add file input to handle profile photo upload
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => setProfilePhoto(reader.result); // Convert file to Base64
  reader.readAsDataURL(file);
};

const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const mutation = `
      mutation Signup($userInput: UserInput!) {
        signup(userInput: $userInput) {
          id
          username
        }
      }
    `;

    const variables = {
      userInput: {
        username,
        password,
        role: "user",
        profilePhoto,
      },
    };

    const response = await axios.post("http://localhost:5000/graphql", {
      query: mutation,
      variables, // Send variables separately
    });
 
    // Check if the backend returned any errors
    if (response.data.errors) {
      const errorMessage = response.data.errors[0]?.message;
      setErrorMessage(errorMessage); // Show error in modal
      return;
    }

    // If no errors, show success modal
    setShowSuccessModal(true);
  } catch (err) {
    console.log("Signup Error (Catch Block):", err.response?.data);

    if (err.response?.data?.errors) {
      const errorMessage = err.response.data.errors[0]?.message;
      setErrorMessage(errorMessage); // Show error in modal
    } else {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  }
};


  // const handleSignup = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("http://localhost:5000/graphql", {
  //       query: `
  //         mutation {
  //           signup(userInput: {
  //             username: "${username}",
  //             password: "${password}",
  //             role: "user"
  //             profilePhoto: "${profilePhoto}" // Include profilePhoto in mutation
  //           }) {
  //             id
  //             username
  //           }
  //         }
  //       `,
  //     });

  //     // Check if the backend returned any errors
  //     if (response.data.errors) {
  //       const errorMessage = response.data.errors[0]?.message;
  //       setErrorMessage(errorMessage); // Show error in modal
  //       return; // Stop execution here
  //     }

  //     // If no errors, show success modal
  //     setShowSuccessModal(true);
  //   } catch (err) {
  //     console.log("Signup Error (Catch Block):", err.response?.data);

  //     if (err.response?.data?.errors) {
  //       const errorMessage = err.response.data.errors[0]?.message;
  //       setErrorMessage(errorMessage); // Show error in modal
  //     } else {
  //       setErrorMessage("An unexpected error occurred. Please try again.");
  //     }
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="fullname">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="profilePhoto">
              Profile Photo
            </label>
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleProfilePhotoChange}
              required
            />
            {profilePhoto && (
              <div className="mt-4">
                <img
                  src={profilePhoto}
                  alt="Profile Preview"
                  className="w-20 h-20 object-cover rounded-full mx-auto"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
        <p className="text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-800 w-96 h-54 p-6 rounded-lg text-center">
            <h2 className="text-white text-xl mb-4">Signup Successful!</h2>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-red-800 w-96 h-54 p-6 rounded-lg text-center">
            <h2 className="text-white text-xl mb-4">Error</h2>
            <p className="text-white mb-4">{errorMessage}</p>
            <button
              onClick={() => setErrorMessage("")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
 