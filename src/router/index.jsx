import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { constant } from "./../config";
import routes from "./routes";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem(constant.TOKEN_KEY) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/auth", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

function Router() {
  return (
    <Switch>
      {routes.map((route, key) => {
        if (route.isProtected) {
          return (
            <PrivateRoute
              key={key}
              component={route.component}
              path={route.path}
              exact={route.exact}
            />
          );
        } else
          return (
            <Route
              key={key}
              component={route.component}
              path={route.path}
              exact={route.exact}
            />
          );
      })}
    </Switch>
  );
}

export default Router;
