import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#1f2937] text-gray-300 flex flex-col justify-between fixed left-0 top-0">
      {/* Logo/Title */}
      <div>
        <h2 className="text-2xl font-bold text-white p-6">Dashboard</h2>
        {/* Menu Items */}
        <ul className="space-y-1">
          <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer">Overview</li>
          <li className="px-6 py-2 bg-gray-700 text-white rounded">Village Management</li>
          <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer">Chat</li>
          <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer">Gallery</li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center p-6">
        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
        <span className="ml-3">Admin Name</span>
        <a href="/" className="text-red-500 ml-auto hover:underline">
          Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
