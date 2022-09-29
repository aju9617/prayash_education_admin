import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

function Wrapper({ children }) {
  return (
    <div className="flex relative h-screen min-h-screen max-h-screen">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
}

export default Wrapper;
