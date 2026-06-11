import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import AuctionDetails from "./pages/AuctionDetails";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import SignIn from "./pages/SignIn";
import AdminRegister from "./pages/AdminRegister";
import Help from "./pages/Help";
import ErrorPage from "./pages/ErrorPage";
import { Contact } from "./pages/Contact";
import "./styles/responsive.css";

// Private Route Component
const PrivateRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? element : <Navigate to="/SignIn" />;
};

const AdminRoute = ({ element }) => {
  const { isAuthenticated, user, loading } = useAuth();
  if (loading) return null;
  const isAdmin = user?.role?.toLowerCase() === "admin";
  return isAuthenticated && isAdmin ? element : <Navigate to="/SignIn" />;
};

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/*" element={<ErrorPage />} />
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={<AdminRoute element={<AdminDashboard />} />}
          />
          {/* Protected Routes */}
          <Route
            path="/Dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/AuctionDetails/:id"
            element={<PrivateRoute element={<AuctionDetails />} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
