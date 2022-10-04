import { MdDashboard, MdSecurity } from "react-icons/md";
import { AiFillDollarCircle, AiFillSetting } from "react-icons/ai";
import { IoFastFoodSharp, IoDocumentText } from "react-icons/io5";
import { IoMdAnalytics, IoMdFootball, IoMdNotifications } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { HiReceiptTax } from "react-icons/hi";
import { BsStarFill } from "react-icons/bs";
import { GiPodiumWinner } from "react-icons/gi";
import { FaGraduationCap, FaUserGraduate, FaUniversity } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
let routes = [
  // { path: "/dashboard", title: "Dashboard", icon: MdDashboard, submenu: [] },
  {
    path: "/scholarships",
    title: "Scholarship",
    icon: FaGraduationCap,
    submenu: [],
  },
  {
    path: "/job-applicants",
    title: "Job Applicant",
    icon: RiComputerFill,
    submenu: [],
  },
  {
    path: "/admission-list",
    title: "Admission Form",
    icon: FaUserGraduate,
    submenu: [],
  },
  {
    path: "/premier-league",
    title: "Student Premier League",
    icon: IoNewspaper,
    submenu: [],
  },
  {
    path: "/school-list",
    title: "Registered School",
    icon: FaUniversity,
    submenu: [],
  },
  {
    path: "/merit-list",
    title: "Merit List",
    icon: GiPodiumWinner,
    submenu: [],
  },
  {
    path: "/result",
    title: "Result",
    icon: FaUniversity,
    submenu: [],
  },
  {
    path: "/notification",
    title: "Notification",
    icon: IoMdNotifications,
    submenu: [],
  },
  // {
  //   path: "/students",
  //   title: "Student",
  //   icon: IoMdFootball,
  //   submenu: [
  //     { path: "/players/list", title: "List" },
  //     { path: "/players/club", title: "Club" },
  //     { path: "/players/category", title: "Category" },
  //   ],
  // },
  {
    path: "/setting",
    title: "Setting",
    icon: AiFillSetting,
  },
];

export default routes;
