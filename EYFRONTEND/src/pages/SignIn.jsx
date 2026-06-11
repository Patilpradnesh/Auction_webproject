import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const URI = `${import.meta.env.VITE_API_URL}/api/auth/login`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(URI, { email, password });
      const { user } = response.data || {};
      
      if (user && user.role) {
        login({
          name: user.name || "",
          email: user.email || "",
          role: user.role,
        });
        
        setTimeout(() => {
          navigate(user.role.toLowerCase() === "admin" ? "/admin" : "/Dashboard");
        }, 100);
      } else {
        setError("Unauthorized access or missing data in response.");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="glass-panel p-10 rounded-3xl bg-white/60 backdrop-blur-xl shadow-2xl ring-1 ring-white/50 border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-500 font-medium">Please sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium text-center shadow-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>


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
                className="block w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col items-center justify-center space-y-2">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <a href="/SignUp" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                Sign up
              </a>
            </p>
            <a href="/forgot-password" className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;