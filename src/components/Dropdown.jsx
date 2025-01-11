// import React, { useState } from "react";

// const Dropdown = ({ options, defaultOption, onChange }) => {
//   const [selectedOption, setSelectedOption] = useState(defaultOption);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//     if (onChange) onChange(option);
//   };

//   return (
//     <div className="relative inline-block text-left">
//       {/* Dropdown Button */}
//       <button
//         className="bg-[#374151] text-white px-4 py-2 rounded-md border border-gray-500 focus:outline-none flex items-center justify-between w-48 shadow-sm"
//         onClick={() => setIsOpen((prev) => !prev)}
//       >
//         <span className="font-medium">{selectedOption}</span>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="white"
//           className={`w-4 h-4 transition-transform  ${
//             isOpen ? "rotate-180" : "rotate-0"
//           }`}
//         >
//           <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" clipRule="evenodd" />
//         </svg>
//       </button>

//       {/* Dropdown Options */}
//       {isOpen && (
//         <ul className="absolute z-10 mt-2 bg-[#b7bdc4] border border-gray-600 rounded-md shadow-lg w-48 text-black">
//           {options.map((option) => (
//             <li
//               key={option}
//               className={`px-4 py-2 cursor-pointer flex items-center bg-[#b7bdc4] ${
//                 option === selectedOption
//                   ? "bg-[#b7bdc4] text-black"
//                   : "text-black"
//               } hover:bg-bg-[#b7bdc4]`}
//               onClick={() => handleOptionClick(option)}
//             >
//               {option === selectedOption && (
//                 <svg
//                   viewBox="0 0 24 24"
//                   fill="black"
//                   xmlns="http://www.w3.org/2000/svg"
//                   stroke="black"
//                   strokeWidth="0.768"
//                   className="w-4 h-4 mr-2"
                  
//                 >
//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M9.9647 14.9617L17.4693 7.44735L18.5307 8.50732L9.96538 17.0837L5.46967 12.588L6.53033 11.5273L9.9647 14.9617Z"
//                     fill="#black"
//                   ></path>
//                 </svg>
//               )}
//            <span className="flex-1 gap-2">{option}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Dropdown;
import React, { useState } from "react";

const Dropdown = ({ options, defaultOption, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        className="bg-[#374151] text-white px-4 py-2 rounded-md border border-gray-500 focus:outline-none flex items-center justify-between w-48 shadow-sm"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-medium">{selectedOption}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="white"
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute z-10 mt-2 bg-[#b7bdc4] border border-gray-600 rounded-md shadow-lg w-48 text-black">
          {options.map((option) => (
            <li
              key={option}
              className={`px-4 py-2 cursor-pointer flex items-center gap-2 bg-[#b7bdc4] rounded-md  ${
                option === selectedOption
                  ? "bg-[#b7bdc4] text-black"
                  : "text-black"
              } hover:bg-bg-[#b7bdc4]`}
              onClick={() => handleOptionClick(option)}
            >
              <div className="w-4 flex-shrink-0">
                {option === selectedOption && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="black"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="black"
                    strokeWidth="0.768"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.9647 14.9617L17.4693 7.44735L18.5307 8.50732L9.96538 17.0837L5.46967 12.588L6.53033 11.5273L9.9647 14.9617Z"
                      fill="#black"
                    ></path>
                  </svg>
                )}
              </div>
              <span className="flex-1">{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
