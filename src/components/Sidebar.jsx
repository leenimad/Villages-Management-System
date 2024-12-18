import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-gray-200 h-screen">
      <h2 className="text-xl font-bold text-center p-4">Dashboard</h2>
      <ul>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Overview</li>
        <li className="px-4 py-2 bg-gray-700 cursor-pointer">Village Management</li>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Chat</li>
        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Gallery</li>
      </ul>
      <div className="absolute bottom-0 p-4 flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
          40x40
        </div>
        <span>Admin Name</span>
        <a href="/" className="text-red-500 ml-auto">
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
