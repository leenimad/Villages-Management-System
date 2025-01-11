// src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center text-white p-6 bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to Villages Management</h1>
        <p className="mb-4 text-gray-300">To get started, please sign up or log in:</p>

        <div className="space-y-12 space-x-5">
          <Link
            to="/signup"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
