import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axios.post("http://localhost:8081/login", {
        username,
        password,
      });

      if (res.data.message === "Login successful") {
        setIsLoggedIn(true); // Set the login status to true upon successful login

        // Navigate based on user role
        if (res.data.role === "admin") {
          navigate(`/dashboard/${res.data.user.ID}`);
        } else {
          navigate(`/patientdashboard/${res.data.user.ID}`);
        }
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (err) {
      setErrorMessage("An error occurred during login.");
      console.error(err);
    }
  };

  return (
    <main>
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && (
          <p className="error" style={{ color: "red" }}>
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
    </main>
  );
}
