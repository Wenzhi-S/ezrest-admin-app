import React, { useState } from "react";

function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form from causing a page reload
    // Here you would replace "admin" and "123!@#qwe" with your actual credentials
    if (
      credentials.username === "admin" &&
      credentials.password === "123!@#qwe"
    ) {
      onLogin(); // Trigger the login success action
    } else {
      alert("Invalid credentials"); // Simple feedback for demo purposes
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
