import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error modal
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/graphql", {
        query: `
          query {
            login(username: "${username}", password: "${password}") {
              token
              role
              profilePhoto
            }
          }
        `,
      });
  
      // Check if login was successful
      if (response.data?.data?.login) {
        const { token, role, profilePhoto } = response.data.data.login;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        localStorage.setItem("profilePhoto", profilePhoto); // Store profile photo
        navigate("/overview"); // Redirect to the overview page
      } else {
        // If login is null, set the error message from GraphQL
        const errorMessage =
          response.data?.errors?.[0]?.message || "An unexpected error occurred.";
        setErrorMessage(errorMessage);
      }
    } catch (err) {
      console.log("Full Error Object:", err);
      if (err.response?.data?.errors) {
        const errorMessage = err.response.data.errors[0]?.message;
        setErrorMessage(errorMessage); // Use the error message from the backend
      } else if (err.request) {
        setErrorMessage("Network error: Unable to connect to the server.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  }; 
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="username">
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
            <label className="block text-gray-400 mb-2" htmlFor="password">
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
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
          >
            Login
          </button>
        </form>
      </div>

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

export default LoginPage;
 