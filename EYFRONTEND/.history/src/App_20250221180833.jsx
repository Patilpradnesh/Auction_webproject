import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import AuctionDetails from "./pages/AuctionDetails"; 
import Dashboard from "./pages/Dashboard"; 


import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
    return (
        <Router>
            <Navbar/>
            <AuctionCard/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auction" element={<AuctionDetails />} />
                <Route path="/Dashboard" element={<Dashboard />} />
            </Routes>
            <Footer></Footer>
        </Router>
        
    );
 
}

export default App;
