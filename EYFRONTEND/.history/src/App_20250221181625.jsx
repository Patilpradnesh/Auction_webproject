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
            
            {/* <AuctionCard/> */}
            
            <AuctionDetails/>
            <Footer/>
        </Router>
        
    );
 
}

export default App;
