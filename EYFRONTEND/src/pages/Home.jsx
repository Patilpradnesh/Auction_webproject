import React, { useState, useEffect } from "react";
import AuctionCarousel from "../components/AuctionCarousel";
import AuctionBox from "../components/AuctionBox";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get("/api/bids");
        if (response.data && response.data.data) {
          const now = Date.now();
          // Filter ONLY currently ongoing/live auctions
          const liveAuctions = response.data.data.filter(auction => {
             const start = new Date(auction.startTime).getTime();
             const end = new Date(auction.endTime).getTime();
             return now >= start && now < end;
          });
          // Limit to exactly 3 top live auctions
          setAuctions(liveAuctions.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching live auctions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBids();
  }, []);

  // Helper to format time left string intelligently
  const formatTimeLeft = (auction) => {
    const start = new Date(auction.startTime).getTime();
    const end = new Date(auction.endTime).getTime();
    const now = Date.now();
    
    let diff;
    if (now < start) {
      diff = start - now; // Time until it starts
    } else if (now >= start && now < end) {
      diff = end - now; // Time until it ends
    } else {
      return "Expired";
    }
    
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    return `${h}h ${m}m`;
  };

  const getStatus = (auction) => {
    const start = new Date(auction.startTime).getTime();
    const end = new Date(auction.endTime).getTime();
    const now = Date.now();
    if (now < start) return "upcoming";
    if (now >= start && now < end) return "ongoing";
    return "sold";
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="relative pt-24 pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-widest uppercase mb-6 shadow-sm border border-blue-100">
            The Premier Auction Platform
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Extraordinary</span>
            <br /> Unique Auctions
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-600 mx-auto mb-10 leading-relaxed">
            Bid on exclusive items, rare collectibles, and premium assets in our state-of-the-art real-time bidding platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to={isAuthenticated ? "/Dashboard" : "/SignUp"} className="px-8 py-4 text-base font-bold text-white bg-slate-900 rounded-2xl hover:bg-slate-800 shadow-xl hover:shadow-2xl transition-all active:scale-[0.98]">
              {isAuthenticated ? "Go to Dashboard" : "Start Bidding Now"}
            </Link>
            <a href="#showcase" className="px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 shadow-sm transition-all active:scale-[0.98]">
              Explore Live Items
            </a>
          </div>
        </div>
      </div>

      {/* Live Platform Stats Strip (Phase 3: Market Intelligence) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="glass-panel bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-slate-200/60 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
            <span className="text-4xl font-black text-primary mb-1">12,543</span>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active Bidders</span>
          </div>
          <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
            <span className="text-4xl font-black text-success mb-1">245</span>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Live Auctions</span>
          </div>
          <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
            <span className="text-4xl font-black text-slate-900 mb-1">$1.2M+</span>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Volume</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Featured Auctions</h2>
          <p className="text-slate-500">Premium items selected by our experts.</p>
        </div>
        <div className="rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-200/50 bg-slate-900">
          <AuctionCarousel />
        </div>
      </div>
      
      {/* Auction Showcase Section */}
      <div id="showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Live Showcase</h2>
            <p className="text-slate-500">Handpicked items trending right now.</p>
          </div>
          <Link to="/Dashboard" className="hidden sm:inline-flex items-center text-blue-600 font-medium hover:text-blue-700 group">
            View all auctions 
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Responsive Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : auctions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auctions.map((auction) => (
              <div 
                key={auction._id} 
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden hover:-translate-y-2 flex flex-col"
              >
                <AuctionBox
                  status={getStatus(auction)}
                  title={auction.title}
                  price={`$${auction.currentPrice || auction.startingPrice}`}
                  timeLeft={formatTimeLeft(auction)}
                  imageUrl={auction.images && auction.images[0] ? auction.images[0] : null}
                  id={auction._id}
                  linkToDashboard={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <h3 className="text-xl font-medium text-slate-500 mb-2">No active auctions right now.</h3>
            <p className="text-slate-400">Check back later or sign in to start your own auction!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
