import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import UserPatientForm from "./components/forms/UserPatientForm";
import HospitalReistrationForm from "./components/forms/HospitalReistrationForm";
import PatientEnrollmentForm from "./components/forms/PatientEnrollmentForm";
import Header from "./components/Header";
import SideDrawer from "./components/SideDrawer";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter basename="">
        <Header />
        <SideDrawer />
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/user-patient" component={UserPatientForm} />
          <Route
            path="/hospital-registration"
            component={HospitalReistrationForm}
          />
          <Route path="/patient-enrollment" component={PatientEnrollmentForm} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
