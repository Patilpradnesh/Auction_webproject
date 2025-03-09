import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import AuctionDetails from "./pages/AuctionDetails"; 
import Dashboard from "./pages/Dashboard"; 


import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AuctionCard from "./components/AuctionCard";

function App() {
    return (
        <Router>
            <Navbar/>
            <AuctionDetails/>
            {/* <AuctionCard/> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auction" element={<AuctionDetails />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/AuctionCard" element={<AuctionCard/>}/>
            </Routes>
            <Footer/>
        </Router>
        
    );
 
}

export default App;
