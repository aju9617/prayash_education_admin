import React from "react";

function Button({ children, className = "", requesting, ...props }) {
  return (
    <button
      disabled={requesting}
      className={`bg-secondary w-max p-2 px-6 text-sm text-white rounded-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
