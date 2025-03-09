import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Login Successful! 🎉");

        // Store authentication status
        localStorage.setItem("isAuthenticated", "true");

        navigate("/Home");
      }
    } catch (error) {
      alert("Login Failed! Please check your credentials.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "22rem" }}>
        <h3 className="text-center mb-4">Sign In to AuctionPro</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-1">
            <a href="/SignUp" className="text-decoration-none">Don't have an account? Sign Up</a>
          </p>
          <p>
            <a href="/forgot-password" className="text-decoration-none">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
