
import React, { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const username = localStorage.getItem("username");
  const profilePhoto = localStorage.getItem("profilePhoto");

  const isActive = (path) => location.pathname === path;

  // Toggle body scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    // Cleanup function to re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#1f2937] text-gray-300 z-40 shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-[#1f2937] text-white p-2 rounded-md focus:outline-none"
          >
            <div className="space-y-1">
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-1 px-2">
          <li
            className={`px-6 py-2 hover:bg-gray-700 cursor-pointer ${
              isActive("/overview") ? "bg-gray-700 text-white" : ""
            }`}
          >
            <Link to="/overview">Overview</Link>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-700 cursor-pointer ${
              isActive("/village-management") ? "bg-gray-700 text-white" : ""
            }`}
          >
            <Link to="/village-management">Village Management</Link>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-700 cursor-pointer ${
              isActive("/chat") ? "bg-gray-700 text-white" : ""
            }`}
          >
            <Link to="/chat">Chat</Link>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-700 cursor-pointer ${
              isActive("/gallery") ? "bg-gray-700 text-white" : ""
            }`}
          >
            <Link to="/gallery">Gallery</Link>
          </li>
        </ul>

        {/* Bottom Section */}
        <div className="absolute bottom-0 w-full p-6 bg-[#1f2937] flex items-center">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
          )}
          <span className="ml-3">{username || "Admin"}</span>
          <a href="/" className="text-red-500 ml-auto hover:underline">
            Logout
          </a>
        </div>
      </div>

      {/* Menu Button - When Sidebar is Closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 bg-gray-700 text-white p-2 rounded-md focus:outline-none z-50"
        >
          <div className="space-y-1">
            <div className="w-5 h-0.5 bg-white"></div>
            <div className="w-5 h-0.5 bg-white"></div>
            <div className="w-5 h-0.5 bg-white"></div>
          </div>
        </button>
      )}
    </>
  );
};

export default Sidebar;
