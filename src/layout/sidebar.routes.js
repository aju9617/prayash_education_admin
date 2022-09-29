import { MdDashboard, MdSecurity } from "react-icons/md";
import { AiFillDollarCircle, AiFillSetting } from "react-icons/ai";
import { IoFastFoodSharp, IoDocumentText } from "react-icons/io5";
import { IoMdAnalytics, IoMdFootball } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { HiReceiptTax } from "react-icons/hi";
import { BsStarFill } from "react-icons/bs";

let routes = [
  { path: "/dashboard", title: "Dashboard", icon: MdDashboard, submenu: [] },
  {
    path: "/players",
    title: "Players",
    icon: IoMdFootball,
    submenu: [
      { path: "/players/list", title: "List" },
      { path: "/players/club", title: "Club" },
      { path: "/players/category", title: "Category" },
    ],
  },

  {
    path: "/setting",
    title: "Setting",
    icon: AiFillSetting,
  },
];

export default routes;
