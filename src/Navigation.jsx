import React from "react";
import DashboardWrapper from "@layout/Wrapper";
import SchoolList from "./views/SchoolList";
import { Route, Switch } from "react-router-dom";
import AdmissionList from "./views/AdmissionList";
import JobApplicant from "./views/JobApplicant";
import ScholarshipApplicant from "./views/ScholarshipApplicant";
import Setting from "@views/Setting";
import StudentPremierLeague from "@views/StudentPremierLeague";

function Navigation() {
  return (
    <DashboardWrapper>
      <Switch>
        <Route component={SchoolList} path="/school-list" />
        <Route component={AdmissionList} path="/admission-list" />
        <Route component={JobApplicant} path="/job-applicants" />
        <Route component={ScholarshipApplicant} path="/scholarships" />
        <Route component={StudentPremierLeague} path="/premier-league" />
        <Route component={Setting} path="/setting" />
      </Switch>
    </DashboardWrapper>
  );
}

export default Navigation;
