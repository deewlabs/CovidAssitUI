import React from "react";
import "./App.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import UserPatientForm from "./components/forms/UserPatientForm";
import HospitalReistrationForm from "./components/forms/HospitalReistrationForm";
import patientEnrollmentForm from "./components/forms/patientEnrollmentForm";
import Header from "./components/Header";

function App() {
  return (
    <>
      <BrowserRouter basename="">
        <Header />
        <Switch>
          <Route path="/" exact component={UserPatientForm} />
          <Route path="/user-patient" component={UserPatientForm} />
          <Route
            path="/hospital-registration"
            component={HospitalReistrationForm}
          />
          <Route path="/patient-enrollment" component={patientEnrollmentForm} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
