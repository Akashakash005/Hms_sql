import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RegularAppointment(props) {
  const { patient } = props;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    doctorname: "",
    city: "",
    date: "",
    status: "pending..",
  });

  // Update form data when patient prop changes
  useEffect(() => {
    if (patient) {
      setFormData((prevState) => ({
        ...prevState,
        firstname: patient.firstname || "",
        lastname: patient.lastname || "",
      }));
    }
  }, [patient]); // Run when patient changes

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8081/regular-appointment/${patient.ID}`,
        formData
      );

      if (response.status === 200) {
        alert("Appointment Booked successfully!");
        setFormData({
          firstname: "",
          lastname: "",
          doctorname: "",
          city: "",
          date: "",
          status: "pending..",
        });
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred while booking an appointment.");
    }
  };

  return (
    <div>
      <div className="registration-form">
        <h1>Patient Registration Form</h1>
        <form className="registrationForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name: </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname} // Use formData to include in submission
              onChange={handleInputChange} // Allow changes
              required // Make it required
              readOnly // Instead of disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name: </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname} // Use formData to include in submission
              onChange={handleInputChange} // Allow changes
              required // Make it required
              readOnly // Instead of disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="doctorname">Doctor name: </label>
            <select
              id="doctorname"
              name="doctorname"
              value={formData.doctorname}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Doctor</option>
              <option value="Dr. John Corner">Dr. John Corner</option>
              <option value="Dr. Kamali">Dr. Kamali</option>
              <option value="Dr. Bhanupriya">Dr. Bhanupriya</option>
              <option value="Dr. Steve Joseph">Dr. Steve Joseph</option>
              <option value="Dr. Arjit Singh">Dr. Arjit Singh</option>
              <option value="Dr. Kumar S">Dr. Kumar S</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="city">City: </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date: </label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
