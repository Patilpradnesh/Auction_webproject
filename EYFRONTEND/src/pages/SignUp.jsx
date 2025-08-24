import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
const URI =`${import.meta.env.VITE_API_URL}/api/users/register`;
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
 const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(URI, {
        username: name,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccess("Registration successful! You can now log in.");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/SignIn");
      }
      
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response) {
        const errorMessage = err.response.data.message || "Registration failed.";
        setError(errorMessage);
        console.log("Server error response:", err.response.data);
      } else {
        setError("Server error. Please try again.");
        console.log("Network error:", err.message);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-body p-4 p-md-5">
                <h3 className="text-center mb-4 h4 h-md-3">Sign Up for AuctionPro</h3>
                {error && <div className="alert alert-danger small">{error}</div>}
                {success && <div className="alert alert-success small">{success}</div>}
                <form onSubmit={handleSubmit}>
                  {/* Name Input */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="name"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium">
                      Email address
                    </label>
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

                  {/* Password Input */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-medium">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Enter a strong password (min 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="6"
                    />
                  </div>

                  {/* Confirm Password Input */}
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label fw-medium">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="confirmPassword"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                    <i className="fas fa-user-plus me-2"></i>
                    Sign Up
                  </button>
                </form>

                {/* Already Have an Account? */}
                <div className="text-center">
                  <p className="mb-0 small">
                    Already have an account?{" "}
                    <a href="/signin" className="text-decoration-none fw-medium">
                      Sign In
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

export default SignUp;
