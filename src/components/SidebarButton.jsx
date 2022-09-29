import React, { useEffect, useState } from "react";
import { GoDash } from "react-icons/go";
import { FiChevronDown } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

function SidebarButton({
  title,
  icon: Icon,
  path,
  children,
  submenu = [],
  showTitle,
}) {
  const history = useHistory();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const className =
    "p-4 transition-all  bg-slate-50 hover:text-primary  cursor-pointer";

  const activeClassname = "!text-primary";
  function handleNavigation() {
    if (Boolean(submenu.length) && showTitle) {
      setShowSubmenu((e) => !e);
    } else {
      history.push(path);
    }
  }

  useEffect(() => {
    setShowSubmenu(false);
  }, [showTitle]);

  return (
    <div>
      <div
        className={`${className} ${
          history.location.pathname.startsWith(path) ? activeClassname : ""
        }`}
        onClick={handleNavigation}
      >
        <span className="flex  justify-between  items-center">
          <div className="flex items-center">
            <Icon className="mr-2" size={20} />
            <p
              className={`${
                showTitle ? "visible" : "hidden"
              } slow-visible transition-all`}
            >
              {title}
            </p>
          </div>
          {Boolean(submenu.length) && (
            <FiChevronDown
              className={`transform transition-all ${
                showSubmenu ? "-rotate-180" : ""
              }`}
              size={20}
            />
          )}
        </span>
      </div>
      {showSubmenu && (
        <>
          {submenu.map((menu, id) => (
            <Link key={id} to={menu.path}>
              <div
                className={`${className} ${
                  history.location.pathname.startsWith(menu.path)
                    ? activeClassname
                    : ""
                } text-sm !p-0 overflow-hidden !bg-white `}
              >
                <div className="flex items-center p-4 transform translate-x-4 hover:translate-x-6 transition-all">
                  <GoDash size={20} className="mr-2" />
                  {menu.title}
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}

export default SidebarButton;
