import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
const URI =`${import.meta.env.VITE_API_URL}/api/users/login`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default to "user"
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(URI, { email, password });
      if (response.data.role === role) {
        localStorage.setItem("token", response.data.token || ""); // Store token if provided
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("isAdmin", role === "admin" ? "true" : "false");
        localStorage.setItem("userName", response.data.name || ""); // Store user's name

        navigate(role === "admin" ? "/admin" : "/"); // Redirect to appropriate dashboard
      } else {
        setError(`Unauthorized access for ${role}s.`);
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-body p-4 p-md-5">
                <h3 className="text-center mb-4 h4 h-md-3">
                  {role === "admin" ? "Admin Login" : "User Login"}
                </h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label fw-medium">Login as:</label>
                    <select
                      id="role"
                      className="form-select form-select-lg"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium">Email address</label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-medium">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                    Sign In
                  </button>
                </form>

                {error && (
                  <div className="alert alert-danger text-center small" role="alert">
                    {error}
                  </div>
                )}

                <div className="text-center">
                  <p className="mb-2 small">
                    <a href="/SignUp" className="text-decoration-none">
                      Don't have an account? Sign Up
                    </a>
                  </p>
                  <p className="mb-0 small">
                    <a href="/forgot-password" className="text-decoration-none">
                      Forgot Password?
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
