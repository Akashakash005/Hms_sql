import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AppointmentHistory({ patient }) {
  const [patients, setAppointment] = useState([]); // State to hold appointment data

  // Fetching the data of the patient
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/appointment-history/${patient.ID}`
        );
        if (res.data) {
          setAppointment(res.data); // Set the fetched data to the state
        } else {
          console.error("No patient data returned");
        }
      } catch (error) {
        console.error("Failed to fetch patient data", error);
      }
    };

    fetchPatients(); // Call the function to fetch patient data
  }, [patient.ID]); // Dependency array to re-run effect if patient.ID changes

  return (
    <div className="table-container">
      <table className="bp4-html-table modifier">
        <thead>
          <tr>
            <th>Appointment No</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Doctor Name</th>
            <th>Date</th>
            <th>City</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((data) => (
              <tr key={data.appointment_no}>
                <td>{data.appointment_no}</td>
                <td>{data.ID}</td>
                <td>{data.firstname}</td>
                <td>{data.lastname}</td>
                <td>{data.doctorname}</td>
                <td>{data.date}</td>
                <td>{data.city}</td>
                <td style={{ color: "red" }}>{data.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No appointment data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
