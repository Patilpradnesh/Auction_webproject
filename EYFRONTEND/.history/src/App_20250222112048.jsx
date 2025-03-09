import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuctionDetails from "./pages/AuctionDetails";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/AuctionDetails" element={<AuctionDetails />} />
        <Route path="/SignIn" element={<LogIn/>}/>
        <Route path="/SingUP" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
