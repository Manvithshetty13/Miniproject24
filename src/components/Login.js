import React, { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", credentials);
    alert("Login successful!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
