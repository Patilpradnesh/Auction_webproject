import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuctionDetails from "./pages/AuctionDetails";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import AuctionCard from "./components/AuctionCard";
import Footer from "./components/Footer"
import SignIn from

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auction" element={<AuctionDetails />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/AuctionDetails" element={<AuctionDetails />} />
        <Route path="/SignIn" element={<SignIn/>}/>
      </Routes>
      <AuctionCard />
      <Footer/>
    </Router>
  );
}

export default App;
