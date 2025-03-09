import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Add authentication logic here
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "22rem" }}>
        <h3 className="text-center mb-4">Sign In to AuctionPro</h3>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
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

        
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>

       
        <div className="text-center mt-3">
          <p className="mb-1">
            <a href="/register" className="text-decoration-none">
              Don't have an account? Sign Up
            </a>
          </p>
          <p>
            <a href="/forgot-password" className="text-decoration-none">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
