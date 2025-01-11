import React from "react";

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
      {/* Add `mx-4` to add horizontal space and limit the width */}
      <div className="bg-[#2d3748] p-6 rounded-lg w-full max-w-2xl mx-4 sm:mx-auto h-auto shadow-lg relative overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white font-size:20px">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl absolute top-4 right-4"
          >
            &times;
          </button>
        </div>
        {/* Modal content area */}
        <div className="overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
