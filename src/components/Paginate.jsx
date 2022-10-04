import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import ReactPaginate from "react-paginate";

function Paginate({ className, ...props }) {
  const pageClass =
    "h-8 w-8 flex-shrink-0 rounded-md flex-grow-0  mx-2  flex-center";
  return (
    <ReactPaginate
      nextClassName={`bg-primary text-white  ${pageClass}`}
      disabledClassName="!bg-slate-200 text-slate-700 shadow-md"
      nextLabel={<FiChevronLeft className="transform rotate-180" size={20} />}
      activeClassName="!bg-primary !text-white"
      previousClassName={`bg-primary text-white  ${pageClass}`}
      previousLabel={<FiChevronLeft size={20} />}
      containerClassName={`my-10 flex justify-center items-center flex-shrink-0 ${className}`}
      pageClassName={`ring-1 hidden !flex  ring-slate-200 text-white rounded-md bg-white text-slate-700 shadow-md mx-2 ${pageClass}`}
      pageLinkClassName={` text-xs ${pageClass}`}
      breakClassName="hidden md:block"
      {...props}
    />
  );
}

export default Paginate;
