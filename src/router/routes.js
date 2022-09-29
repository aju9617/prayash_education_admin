import Login from "@views/Login";
import Navigator from "./../Navigation";

const routes = [
  {
    path: "/auth",
    name: "Login",
    component: Login,
    isProtected: false,
    exact: false,
  },
  {
    path: "/",
    name: "Navigation",
    component: Navigator,
    isProtected: true,
    exact: false,
  },
];

export default routes;
