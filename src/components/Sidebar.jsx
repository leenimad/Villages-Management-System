// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-[#1f2937] text-gray-300 flex flex-col justify-between fixed left-0 top-0 hidden lg:block ">
//       {/* Logo/Title */}
//       <div>
//         <h2 className="text-2xl font-bold text-white p-6">Dashboard</h2>
//         {/* Menu Items */}
//         <ul className="space-y-1">
//           <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer">
//             <Link to="/overview">Overview</Link>
//           </li>
//           <li className="px-6 py-2 bg-gray-700 text-white rounded">
//             <Link to="/village-management">Village Management</Link>
//           </li>
//           <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer">
//             <Link to="/chat">Chat</Link>
//           </li>
//           <li className="px-6 py-2 hover:bg-gray-700 cursor-pointer">
//             <Link to="/gallery">Gallery</Link>
//           </li>
//         </ul>
//       </div>

//       {/* Bottom Section */}
//       <div className="flex items-center p-6">
//         <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
//         <span className="ml-3">Admin Name</span>
//         <a href="/" className="text-red-500 ml-auto hover:underline">
//           Logout
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
// import React, { useState } from "react";

// const Sidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <>
//       {/* Hamburger Button */}
//       <button
//         className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded lg:hidden"
//         onClick={() => setIsSidebarOpen((prev) => !prev)}
//       >
//         {/* Three-line Icon */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M4 6h16M4 12h16m-7 6h7"
//           />
//         </svg>
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed left-0 top-0 h-full w-64 bg-[#1f2937] text-gray-300 flex flex-col justify-between z-40 transform transition-transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0`}
//       >
//         <h2 className="text-2xl font-bold text-white p-6">Dashboard</h2>
//         <ul className="space-y-1">
//           <li className="px-6 py-2 hover:bg-gray-700">
//             <a href="/overview">Overview</a>
//           </li>
//           <li className="px-6 py-2 bg-gray-700 text-white rounded">
//             <a href="/village-management">Village Management</a>
//           </li>
//           <li className="px-6 py-2 hover:bg-gray-700">
//             <a href="/chat">Chat</a>
//           </li>
//           <li className="px-6 py-2 hover:bg-gray-700">
//             <a href="/gallery">Gallery</a>
//           </li>
//         </ul>
//         <div className="flex items-center p-6">
//           <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
//           <span className="ml-3">Admin Name</span>
//           <a href="/" className="text-red-500 ml-auto hover:underline">
//             Logout
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };
//for responsive testing the above code 
// export default Sidebar;
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Get the current route

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-[#1f2937] text-gray-300 flex flex-col justify-between fixed left-0 top-0">
      {/* Logo/Title */}
      <div>
        <h2 className="text-2xl font-bold text-white p-6">Dashboard</h2>
        {/* Menu Items */}
        <ul className="space-y-1">
          <li
            className={`px-6 py-2 hover:bg-gray-700 cursor-pointer ${isActive("/") ? "bg-gray-700 text-white" : ""}`}
          >
            <Link to="/overview">Overview</Link>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-700 cursor-pointer ${isActive("/village-management") ? "bg-gray-700 text-white" : ""}`}
          >
            <Link to="/village-management">Village Management</Link>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-700 cursor-pointer ${isActive("/chat") ? "bg-gray-700 text-white" : ""}`}
          >
            <Link to="/chat">Chat</Link>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-700 cursor-pointer ${isActive("/gallery") ? "bg-gray-700 text-white" : ""}`}
          >
            <Link to="/gallery">Gallery</Link>
          </li>
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
