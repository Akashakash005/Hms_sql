import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import HeaderLogin from "./components/HeaderLogin";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Patient_details from "./pages/Patient_details";
import PatientDashboard from "./pages/PatientDashboard";
import Registration from "./pages/Registration";
import SignUp from "./pages/SignUp";
import Appointments from "./pages/Appointments";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating login status

  return (
    <div>
      <Router>
        {isLoggedIn ? <HeaderLogin /> : <Header />} {/* Conditional header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />{" "}
          {/* Example of passing login function */}
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/patientdashboard/:id" element={<PatientDashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/patientdetail/:id" element={<Patient_details />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/dashboard/:id/appointments"
            element={<Appointments />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
