import React from "react";
import DashboardWrapper from "@layout/Wrapper";
import SchoolList from "./views/SchoolList";
import { Route, Switch } from "react-router-dom";

function Navigation() {
  return (
    <DashboardWrapper>
      <Switch>
        <Route component={SchoolList} path="/school-list" />
      </Switch>
    </DashboardWrapper>
  );
}

export default Navigation;
