import React from "react";
import { GiBookCover } from "react-icons/gi";
import SidebarButton from "@components/SidebarButton";
import routes from "./sidebar.routes";
import { RiArrowRightSLine } from "react-icons/ri";
import { useSidebarState } from "@context/sidebarContext";
import { useAuth } from "@context/authContext";
import { authService } from "@services";

import hooks from "@hooks";

function Sidebar() {
  const authData = useAuth();
  const sidebarState = useSidebarState();
  const sidebarRef = React.useRef(null);

  hooks.useClickoutside(sidebarRef, () => {
    sidebarState.closeSidebar();
  });

  React.useEffect(() => {
    const fetch = async () => {
      const res = await authService.getProfile();
      if (res.status) {
        authData.updateUser(res.data);
      }
    };
    if (!authData.name) {
      fetch();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`${
        sidebarState.open ? "w-64" : "w-12"
      }  transition-all  absolute md:relative  top-0 bottom-0 left-0 z-10  max-h-full overflow-y-scroll scrollbar-hide border-r overflow-x-visible border-gray-400 bg-white  flex-shrink-0`}
    >
      <span
        onClick={sidebarState.toggleSidebar}
        className={`h-8 w-8 transform transition-all  shadow-md fixed bg-white top-10  z-[100] cursor-pointer  rounded-full ring-1 ring-gray-600 flex-center ${
          sidebarState.open ? "left-60 rotate-180" : "left-8"
        }`}
      >
        <RiArrowRightSLine size={24} />
      </span>

      <h4 className="sticky h-14  top-0 z-10  bg-white text-center font-medium  flex-center border-b border-gray-300">
        {!sidebarState.open && (
          <span className="flex-center">
            <GiBookCover size={28} className="text-primary" />
          </span>
        )}
        {sidebarState.open && (
          <div className="flex items-center justify-center space-x-4 text-primary">
            <GiBookCover size={32} className="" />
            <p className="font-medium ">Prayash Education</p>
          </div>
        )}
      </h4>
      {routes.map((route, id) => {
        return (
          <SidebarButton
            key={id}
            path={route.path}
            title={route.title}
            icon={route.icon}
            submenu={route.submenu}
            showTitle={sidebarState.open}
          />
        );
      })}
    </div>
  );
}

export default Sidebar;
