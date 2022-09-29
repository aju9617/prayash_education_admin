import React from "react";

function Content({ children }) {
  return (
    <div className="ml-12 md:ml-auto h-full flex-grow transition-all  overflow-y-scroll  p-6">
      {children}
    </div>
  );
}

export default Content;
