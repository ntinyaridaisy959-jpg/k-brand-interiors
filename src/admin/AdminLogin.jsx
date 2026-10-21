import { useState } from "react";
import "./AdminDashboard.css";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (username === "admin" && password === "KBrand@2026") {
      localStorage.setItem("kbrand_admin_logged_in", "true");
      onLogin();
      return;
    }

    setError("Incorrect username or password.");
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <div className="admin-login-brand">
          <h1>K BRAND</h1>
          <span>& INTERIORS</span>
          <p>ADMIN PANEL</p>
        </div>

        <div className="admin-login-heading">
          <h2>Admin Login</h2>
          <p>Sign in to manage your furniture business.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="login-field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <button
          className="back-to-website"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          ← Back to Website
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;