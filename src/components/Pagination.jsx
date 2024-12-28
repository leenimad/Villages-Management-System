// import React from "react";

// const Pagination = () => {
//   return (
//      <div className="flex items-center gap-1">
//                  <span className="text-[#d6d9df] text-sm font-bold">Page:</span>
//                  <button className="bg-[#718096] text-[#d6d9df] text-sm px-3 py-1 rounded-md hover:bg-gray-600 shadow font-bold">
//                    Prev
//                  </button>
//                  <button className="bg-[#718096] text-[#d6d9df] text-sm px-3 py-1 rounded-md hover:bg-gray-600 shadow font-bold">
//                    Next
//                  </button>
              
                 
//                </div>
//   );
// };

// export default Pagination;
import React from "react";

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <div>
      <div className="flex items-center gap-2  flex-col sm:flex-row justify-between">
        <span className="text-[#d6d9df] text-sm font-bold">Page:</span>
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className={`bg-[#718096] text-[#d6d9df] text-sm px-3 py-1 rounded-md shadow font-bold ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
          }`}
        >
          Prev
        </button>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={`bg-[#718096] text-[#d6d9df] text-sm px-3 py-1 rounded-md shadow font-bold ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
          }`}
        >
          Next
        </button>
      </div>
      {/* Page number at the bottom-right corner
      <div className="flex justify-end mt-4">
        <span className="text-[#d6d9df] text-sm font-bold">
          Page: {currentPage} / {totalPages}
        </span>
      </div> */}
    </div>
  );
};

export default Pagination;
