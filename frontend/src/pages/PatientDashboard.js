import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RegularAppointment from "../components/RegularAppointment";
import AppointmentHistory from "../components/AppointmentHistory";
// import "./Dashboard.css"; // Assuming you have a separate CSS file for styles

const Dashboard = () => {
  const { id } = useParams(); // Get patient ID from URL
  const [userName, setUserName] = useState(""); // State for username
  const [patient, setPatient] = useState([]); // State to hold a single patient

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/patient/${id}`);
        if (response.data) {
          setPatient(response.data); // Set the single patient object
          setUserName(`${response.data.firstname} ${response.data.lastname}`); // Set the username
        } else {
          console.error("No user data returned");
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, [id]);

  return (
    <main>
      <div className="programs-section">
        <div className="left-content">
          <div className="dashboard-container">
            {patient ? ( // Check if patient data is available
              <div className="patient-details" key={patient.ID}>
                <h2>
                  Welcome, {patient.firstname} {patient.lastname}!
                </h2>
                <p>Email: {patient.email}</p>
                <p>Room Number: {patient.roomnumber}</p>
                <p>Weight: {patient.weight} kg</p>
                <p>Height: {patient.height} cm</p>
                <p>Age: {patient.age} years</p>
                <p>Blood Group: {patient.bloodgroup}</p>
                <p>DOB: {patient.DOB}</p>
                <p>Gender: {patient.gender}</p>
                <p>City: {patient.city}</p>
                <p>Contact: {patient.contact}</p>
              </div>
            ) : (
              <p>No patient data available</p>
            )}
          </div>
        </div>
        <div className="right-content">
          <RegularAppointment patient={patient} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <h2>Appointment history</h2>
          <AppointmentHistory patient={patient} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
