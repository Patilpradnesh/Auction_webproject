import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
  withCredentials: true,
});

const AuctionDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newBid, setNewBid] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Real-time states
  const [currentPrice, setCurrentPrice] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const [currentWinner, setCurrentWinner] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);

  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/api/bids/${id}`);
        const data = response.data.data;
        setAuction(data);
        setCurrentPrice(data.currentPrice || data.startingPrice);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setCurrentWinner(data.currentWinner?._id || data.currentWinner);
        setBidHistory(data.bids || []);
      } catch (error) {
        console.error("Error fetching auction details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    socket.emit("joinAuction", id);

    const handleBidUpdate = (data) => {
      if (data.auctionId === id) {
        setCurrentPrice(data.newPrice);
        setEndTime(data.endTime);
        setCurrentWinner(data.currentWinner);
        fetchUpdatedHistory();
      }
    };

    socket.on("bidUpdated", handleBidUpdate);
    return () => {
      socket.off("bidUpdated", handleBidUpdate);
      socket.emit("leaveAuction", id);
    };
  }, [id]);

  const fetchUpdatedHistory = async () => {
    try {
      const response = await axios.get(`/api/bids/${id}`);
      setBidHistory(response.data.data.bids || []);
    } catch (e) {
      console.error("Failed to sync history");
    }
  };

  const calculateTimeLeft = () => {
    if (!startTime || !endTime) return "Loading";
    
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const now = Date.now();
    
    let diff;
    let type;
    if (now < start) {
      diff = start - now;
      type = "Starts In";
    } else if (now >= start && now < end) {
      diff = end - now;
      type = "Time Left";
    } else {
      return "Expired";
    }
    
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return { type, h, m, s, total: diff };
  };

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [startTime, endTime]);

  const handleBidSubmit = async (amount) => {
    const bidToPlace = amount || parseFloat(newBid);
    if (!user) return alert("Please log in first");

    setIsProcessing(true);
    try {
      await axios.post(
        `/api/bids/${id}/place`,
        { bidAmount: bidToPlace }
      );
      setNewBid("");
    } catch (error) {
      alert(error.response?.data?.message || "Error placing bid");
    } finally {
      setIsProcessing(false);
    }
  };

  const isWinning = user?.id && String(currentWinner) === String(user.id);
  const isExpired = timeLeft === "Expired" || timeLeft === "Loading";
  const isUpcoming = timeLeft?.type === "Starts In";
  const nextValidBid = currentPrice + (auction?.minimumIncrement || 1);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!auction) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Auction Not Found</h2>
        <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center text-sm font-medium text-slate-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <svg className="mx-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
          </svg>
          <Link to="/Dashboard" className="hover:text-blue-600">Dashboard</Link>
          <svg className="mx-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
          </svg>
          <span className="text-slate-900">{auction.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel rounded-3xl overflow-hidden aspect-video bg-white shadow-2xl ring-1 ring-slate-200">
              <img
                src={auction.images?.[0] || "https://via.placeholder.com/800x600"}
                alt={auction.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {(auction.images || []).map((img, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer">
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Bidding Controls */}
          <div className="lg:col-span-5">
            <div className="glass-panel rounded-3xl p-8 bg-white shadow-xl ring-1 ring-slate-200 sticky top-24">
              <div className="mb-8">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4 inline-block border border-blue-100">
                  {auction.category}
                </span>
                <h1 className="text-3xl font-black text-slate-900 leading-tight mb-2">{auction.title}</h1>
                <p className="text-slate-500 text-sm">{auction.description}</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 mb-8 border border-slate-100">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Current Bid</span>
                    <div className="text-4xl font-black text-slate-900 leading-none">${currentPrice.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                      {isExpired ? "Status" : timeLeft.type || "Time Left"}
                    </span>
                    <div className={`text-2xl font-bold leading-none ${isExpired ? 'text-slate-400' : isUpcoming ? 'text-amber-500' : 'text-rose-500 animate-pulse'}`}>
                      {isExpired ? "00:00:00" : `${String(timeLeft.h).padStart(2, '0')}:${String(timeLeft.m).padStart(2, '0')}:${String(timeLeft.s).padStart(2, '0')}`}
                    </div>
                  </div>
                </div>

                {isWinning && !isUpcoming && !isExpired && (
                  <div className="py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-bold flex items-center justify-center mb-6">
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    You are currently the highest bidder!
                  </div>
                )}

                {isUpcoming ? (
                  <div className="text-center py-4 bg-amber-50 rounded-2xl font-bold text-amber-600 border border-amber-100 shadow-sm uppercase tracking-widest">
                    Bidding Not Started
                  </div>
                ) : !isExpired ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="number"
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-lg font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
                        placeholder={`Minimum $${nextValidBid}`}
                        value={newBid}
                        onChange={(e) => setNewBid(e.target.value)}
                      />
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleBidSubmit()}
                        disabled={isProcessing}
                        className="flex-[2] py-4 px-6 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50"
                      >
                        {isProcessing ? 'Processing...' : 'Place Bid Now'}
                      </button>
                      <button
                        onClick={() => handleBidSubmit(nextValidBid)}
                        disabled={isProcessing}
                        className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50"
                      >
                        Quick Bid
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 bg-slate-200 rounded-2xl font-bold text-slate-500 uppercase tracking-widest">
                    Auction Ended
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bid History Table */}
        <div className="mt-20">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Bid History</h2>
          <div className="glass-panel rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Bidder</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Bid Amount</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bidHistory.length > 0 ? bidHistory.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).map((bid, i) => (
                  <tr key={i} className={i === 0 ? "bg-blue-50/30" : ""}>
                    <td className="px-8 py-5 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-3 text-xs font-bold text-slate-600 uppercase">
                        {(bid.bidder?.name || "U")[0]}
                      </div>
                      <span className="font-bold text-slate-900">{bid.bidder?.name || "Anonymous"}</span>
                      {i === 0 && <span className="ml-3 px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold">Leading</span>}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`font-black ${i === 0 ? "text-blue-600" : "text-slate-900"}`}>${bid.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-8 py-5 text-right text-sm text-slate-400">
                      {new Date(bid.timestamp).toLocaleString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="px-8 py-10 text-center text-slate-500 font-medium italic">No bids yet. Be the first to bid!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails;
