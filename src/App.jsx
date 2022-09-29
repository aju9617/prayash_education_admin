import React from "react";
import Router from "./router";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider as AuthProvider } from "@context/authContext";
import { Provider as SidebarProvider } from "@context/sidebarContext";
import { removeToken } from "@services/helper";

function App() {
  React.useEffect(() => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      if (localStorage.getItem("remember_me") === "false") {
        removeToken();
      }
      return undefined;
    });
  }, []);
  return (
    <>
      <Toaster toastOptions={{ className: "text-sm" }} />
      <BrowserRouter>
        <SidebarProvider>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </SidebarProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
