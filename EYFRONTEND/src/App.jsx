import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AuctionDetails from "./pages/AuctionDetails";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";  // Ensure SignIn is imported
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Startpage from "./pages/Startpage";
import "bootstrap/dist/css/bootstrap.min.css";

// Function to check authentication status
const isAuthenticated = () => localStorage.getItem("isAuthenticated") === "true";

// Private Route Component
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/SignIn" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Startpage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes (Require Sign-In) */}
        <Route path="/Home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/Dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/AuctionDetails" element={<PrivateRoute element={<AuctionDetails />} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
