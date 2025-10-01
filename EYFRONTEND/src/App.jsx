import { Routes, Route, Navigate } from "react-router-dom";
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

import ErrorPage from "./pages/ErrorPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/responsive.css";
import { Contact } from "./pages/Contact";

// Function to check authentication status
const isAuthenticated = () =>
  localStorage.getItem("isAuthenticated") === "true";
const isAdmin = () => localStorage.getItem("isAdmin") === "true";

// Private Route Component
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/SignIn" />;
};

const AdminRoute = ({ element }) => {
  return isAuthenticated() && isAdmin() ? element : <Navigate to="/SignIn" />;
};

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />{" "}
          {/* Ensure this renders the Home component */}
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
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
            path="/AuctionDetails"
            element={<PrivateRoute element={<AuctionDetails />} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
