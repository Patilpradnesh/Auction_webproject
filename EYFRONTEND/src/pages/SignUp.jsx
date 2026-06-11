import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
const URI =`${import.meta.env.VITE_API_URL}/api/auth/register`;
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="glass-panel p-10 rounded-3xl bg-white/60 backdrop-blur-xl shadow-2xl ring-1 ring-white/50 border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Create Account</h2>
            <p className="text-sm text-slate-500 font-medium">Join AuctionPro today</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium text-center shadow-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-medium text-center shadow-sm">
              {success}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="block w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm sm:text-sm"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="block w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm sm:text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength="6"
                className="block w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm sm:text-sm"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                className="block w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm sm:text-sm"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all active:scale-[0.98] mt-2"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col items-center justify-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <a href="/SignIn" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
