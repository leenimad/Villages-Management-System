import React from "react";

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <span className="text-[#d6d9df] text-sm font-bold">Page:</span>
        <div className="flex flex-row gap-2">
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
      </div>
    </div>
  );
};

export default Pagination;
