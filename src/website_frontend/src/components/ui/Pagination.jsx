import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const maxVisible = 5;
    let pages = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = currentPage - Math.floor(maxVisible / 2);
      let end = currentPage + Math.floor(maxVisible / 2);

      if (start < 1) {
        start = 1;
        end = maxVisible;
      } else if (end > totalPages) {
        end = totalPages;
        start = totalPages - (maxVisible - 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div aria-label="Pagination"
      className="w-full flex justify-between md:justify-center items-center md:space-x-6">
      {/* Previous */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex h-10 w-28 py-1 px-2 justify-start items-center rounded-full scale-100 space-x-1 transition-all duration-200 ${currentPage === 1
          ? "bg-fontPrimaryColor/10 text-fontPrimaryColor/30 cursor-not-allowed"
          : "bg-fontPrimaryColor text-primaryColor hover:scale-[102.5%]"
          }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 fill-none stroke-current stroke-[1.5px]">
          <g strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.25 15.5L9.75 12l3.5-3.5" />
            <path d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0" />
          </g>
        </svg>
        <span className="mr-1 text-xs">Previous</span>
      </button>

      {/* Pages */}
      <div className="w-fit flex space-x-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`hidden md:flex w-10 h-10 justify-center items-center rounded-full border-[2px] scale-100 ${page === currentPage
              ? "border-accentColor bg-accentColor/30 text-fontPrimaryColor/90 pointer-events-none"
              : "border-fontPrimaryColor/20 bg-fontPrimaryColor/15 text-fontPrimaryColor/60 hover:scale-[102.5%] hover:border-fontPrimaryColor/50"
              }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`flex h-10 w-28 py-1 px-2 justify-end items-center rounded-full scale-100 space-x-1 transition-all duration-200 ${currentPage === totalPages
          ? "bg-fontPrimaryColor/10 text-fontPrimaryColor/30 cursor-not-allowed"
          : "bg-fontPrimaryColor text-primaryColor hover:scale-[102.5%]"
          }`}
      >
        <span className="ml-1 text-xs">Next</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 fill-none stroke-current stroke-[1.5px]">
          <g strokeLinecap="round" strokeLinejoin="round">
            <path d="m10.75 8.5l3.5 3.5l-3.5 3.5" />
            <path d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0" />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
