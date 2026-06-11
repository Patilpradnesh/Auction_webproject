import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";

// Connect to the backend socket server
const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
  withCredentials: true,
});

const ActiveBidCard = ({ bid }) => {
  const { user } = useAuth();
  const [newBid, setNewBid] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Real-time states
  const [currentPrice, setCurrentPrice] = useState(bid.currentPrice || bid.startingPrice || 0);
  const [endTime, setEndTime] = useState(bid.endTime);
  const [currentWinner, setCurrentWinner] = useState(bid.currentWinner?._id || bid.currentWinner || null);
  const [totalBids, setTotalBids] = useState(bid.bids?.length || 0);

  // Derived states for UI
  const isWinning = useMemo(() => user?.id && String(currentWinner) === String(user.id), [user, currentWinner]);
  const hasBidBefore = useMemo(() => {
    return bid.bids?.some(b => String(b.bidder?._id || b.bidder) === String(user?.id)) || false;
  }, [bid.bids, user]);
  const isOutbid = useMemo(() => hasBidBefore && !isWinning, [hasBidBefore, isWinning]);

  const minIncrement = bid.minimumIncrement || 1;
  const nextValidBid = parseFloat(currentPrice) + minIncrement;

  const [startTime, setStartTime] = useState(bid.startTime);

  useEffect(() => {
    if (!bid._id) return;
    socket.emit("joinAuction", bid._id);

    const handleBidUpdate = (data) => {
      if (data.auctionId === bid._id) {
        setCurrentPrice(data.newPrice);
        setEndTime(data.endTime);
        setCurrentWinner(data.currentWinner);
        setTotalBids(data.totalBids);
      }
    };

    socket.on("bidUpdated", handleBidUpdate);
    return () => {
      socket.off("bidUpdated", handleBidUpdate);
      socket.emit("leaveAuction", bid._id);
    };
  }, [bid._id]);

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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const handleBidSubmit = async (amount) => {
    const bidToPlace = amount || parseFloat(newBid);
    if (!user) return alert("Please log in first");
    if (!bidToPlace || isNaN(bidToPlace) || bidToPlace < nextValidBid) {
      return alert(`Minimum bid required: $${nextValidBid}`);
    }

    setIsProcessing(true);
    try {
      await axios.post(
        `/api/bids/${bid._id}/place`,
        { bidAmount: bidToPlace }
      );
      setNewBid("");
    } catch (error) {
      alert(error.response?.data?.message || "Error placing bid");
    } finally {
      setIsProcessing(false);
    }
  };

  const isExpired = timeLeft === "Expired" || timeLeft === "Loading";
  const isUpcoming = timeLeft?.type === "Starts In";
  const isUrgent = !isExpired && !isUpcoming && timeLeft.total < 60000; // Less than 1 minute

  return (
    <div className={`group relative bg-white rounded-3xl border-2 transition-all duration-500 overflow-hidden flex flex-col h-full
      ${isWinning ? 'border-emerald-500 shadow-lg shadow-emerald-500/10' : 
        isOutbid ? 'border-rose-400 shadow-lg shadow-rose-500/10' : 'border-slate-100 shadow-md'}
    `}>
      {/* Header Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={bid.images?.[0] || "https://via.placeholder.com/400x300"} 
          alt={bid.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {isWinning && !isUpcoming && !isExpired && (
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg animate-bounce">
              Winning
            </span>
          )}
          {isOutbid && !isUpcoming && !isExpired && (
            <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
              Outbid
            </span>
          )}
        </div>

        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border
          ${isUrgent ? 'bg-rose-500/90 text-white border-rose-400 animate-pulse' : 
            isUpcoming ? 'bg-amber-500/90 text-white border-amber-400' : 'bg-white/90 text-slate-900 border-white/50'}
        `}>
          {isExpired ? "Ended" : isUpcoming ? "Coming Soon" : isUrgent ? "Closing Soon" : "Active"}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="font-display font-bold text-lg text-slate-900 line-clamp-1 mb-1">{bid.title}</h3>
          <p className="text-xs text-slate-500 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalBids} total bids
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Bid</span>
            <div className="text-2xl font-black text-slate-900 leading-none">
              ${currentPrice.toLocaleString()}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {isExpired ? "Status" : timeLeft.type || "Remaining"}
            </span>
            <div className={`text-lg font-bold leading-none ${isUrgent ? 'text-rose-500' : isUpcoming ? 'text-amber-500' : 'text-slate-700'}`}>
              {isExpired ? "00:00:00" : `${String(timeLeft.h).padStart(2, '0')}:${String(timeLeft.m).padStart(2, '0')}:${String(timeLeft.s).padStart(2, '0')}`}
            </div>
          </div>
        </div>

        {/* Action Section */}
        {isUpcoming ? (
          <div className="mt-auto pt-4 border-t border-slate-100 text-center">
            <div className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-1">Bidding Locked</div>
            <div className="text-slate-500 text-sm font-medium">Starts in {timeLeft.h} hours</div>
          </div>
        ) : !isExpired ? (
          <div className="space-y-3 mt-auto">
            <div className="relative group/input">
              <input
                type="number"
                placeholder={`Min $${nextValidBid}`}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={newBid}
                onChange={(e) => setNewBid(e.target.value)}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">$</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleBidSubmit()}
                disabled={isProcessing}
                className="flex-[2] py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Place Bid'}
              </button>
              <button
                onClick={() => handleBidSubmit(nextValidBid)}
                disabled={isProcessing}
                className="flex-1 py-3 px-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-[11px] font-black rounded-xl border border-blue-100 transition-all active:scale-95 disabled:opacity-50"
              >
                Quick +${minIncrement}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-auto pt-4 border-t border-slate-100 text-center">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Auction Ended</div>
            <div className="text-slate-900 font-bold">
              {isWinning ? '🏆 You won this item!' : `Sold for $${currentPrice.toLocaleString()}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveBidCard;
