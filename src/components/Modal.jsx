// import React from "react";

// const Modal = ({ title, children, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-[#2d3748] p-6 rounded-lg w-full max-w-lg shadow-lg h-screen">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold text-white">{title}</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white text-2xl"
//           >
//             &times;
//           </button>
//         </div>
//         <div className="space-y-4">{children}</div>
//       </div>
//     </div>
//   );
// };


// export default Modal;
import React from "react";

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-[#2d3748] p-4 rounded-lg w-full max-w-2xl h-auto shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-white font-size:20px">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl absolute top-4 right-4"
          >
            &times;
          </button>
        </div>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
