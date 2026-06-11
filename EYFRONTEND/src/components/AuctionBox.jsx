import React from "react";
import { useNavigate } from "react-router-dom";

export default function AuctionBox({ id, status, title, price, timeLeft, imageUrl, linkToDashboard = false }) {
  const navigate = useNavigate();

  const statusStyles = {
    ongoing: { 
      badgeBg: "bg-success/10 text-success border border-success/20", 
      badgeText: "Live Now",
      btnClass: "bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:-translate-y-0.5",
    },
    upcoming: {
      badgeBg: "bg-warning/10 text-warning border border-warning/20", 
      badgeText: "Coming Soon",
      btnClass: "bg-slate-100 text-slate-700 hover:bg-slate-200 shadow-sm",
    },
    sold: { 
      badgeBg: "bg-neutral/10 text-neutral border border-neutral/20", 
      badgeText: "Sold",
      btnClass: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
    }
  };

  const handleButtonClick = () => {
    if (linkToDashboard) {
      navigate('/Dashboard');
    } else {
      navigate(`/AuctionDetails/${id}`);
    }
  };

  return (
    <>
      <div className="relative h-56 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400">
            <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md ${statusStyles[status].badgeBg}`}>
          {statusStyles[status].badgeText}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow bg-white">
        
        {/* Psychological Priority 1: Financial State & Urgency */}
        <div className="flex justify-between items-end mb-3 flex-grow">
          <div>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              {status === "sold" ? "Sold Price" : status === "ongoing" ? "Current Bid" : "Starting Bid"}
            </span>
            <span className="block text-3xl font-black text-slate-900 tracking-tight">
              {price}
            </span>
          </div>
          
          <div className="text-right">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              {status === "sold" ? "Sold On" : status === "ongoing" ? "Time Left" : "Starts In"}
            </span>
            <span className={`block text-lg font-bold tracking-tight ${status === "ongoing" ? "text-danger animate-pulse" : "text-slate-700"}`}>
              {timeLeft}
            </span>
          </div>
        </div>

        {/* Psychological Priority 2: Product Context */}
        <h3 className="font-display font-medium text-sm text-slate-600 mb-6 line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Psychological Priority 3: Clear Action */}
        <button 
          className={`w-full py-3 px-4 rounded-xl font-bold tracking-wide uppercase text-sm transition-all duration-200 ${statusStyles[status].btnClass} cursor-pointer hover:shadow-lg`}
          onClick={handleButtonClick}
        >
          {status === "sold" ? "View Results" : status === "ongoing" ? "Place Bid Now" : "View Preview"}
        </button>
      </div>
    </>
  );
}