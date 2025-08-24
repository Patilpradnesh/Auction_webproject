import React from "react";
import { useNavigate } from "react-router-dom";

export default function AuctionBox({ status, title, price, timeLeft, imageUrl }) {
  const navigate = useNavigate();

  const statusStyles = {
    ongoing: { 
      bg: "bg-primary", 
      text: "text-white", 
      badge: "Live Now",
      button: "btn-primary"
    },
    upcoming: {
      bg: "bg-warning", 
      text: "text-dark", 
      badge: "Coming Soon",
      button: "btn-outline-secondary"
    },
    sold: { 
      bg: "bg-secondary", 
      text: "text-white", 
      badge: "Sold",
      button: "btn-success"
    }
  };

  const handleButtonClick = () => {
    if (status === "ongoing") {
      navigate("/dashboard"); // Navigate to the dashboard for "Place Bid"
    } else if (status === "sold") {
      navigate("/AuctionDetails"); // Navigate to auction details for "View Details"
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0" style={{ transition: "all 0.3s ease" }}>
      <div className="card-img-top position-relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="img-fluid w-100"
            style={{ 
              height: "200px", 
              objectFit: "cover",
              borderTopLeftRadius: "0.375rem",
              borderTopRightRadius: "0.375rem"
            }}
          />
        ) : (
          <div className="d-flex align-items-center justify-content-center bg-light" 
               style={{ 
                 height: "200px",
                 borderTopLeftRadius: "0.375rem",
                 borderTopRightRadius: "0.375rem"
               }}>
            <span className="text-muted">No Image Available</span>
          </div>
        )}
        <span className={`position-absolute top-0 end-0 m-2 badge ${statusStyles[status].bg} ${statusStyles[status].text}`}>
          {statusStyles[status].badge}
        </span>
      </div>

      <div className="card-body p-3 p-md-4 d-flex flex-column">
        <h5 className="card-title text-truncate mb-3">{title}</h5>
        
        <div className="row g-2 mb-3 flex-grow-1">
          <div className="col-6">
            <small className="text-muted d-block">
              {status === "sold" ? "Sold Price" : 
               status === "ongoing" ? "Current Bid" : "Starting Bid"}
            </small>
            <div className="h6 h-md-5 text-success fw-bold">{price}</div>
          </div>
          
          <div className="col-6 text-end">
            <small className="text-muted d-block">
              {status === "sold" ? "Sold On" : 
               status === "ongoing" ? "Time Left" : "Starts In"}
            </small>
            <div className={`fw-bold small ${status === "ongoing" ? "text-danger" : "text-primary"}`}>
              {timeLeft}
            </div>
          </div>
        </div>

        <button 
          className={`btn w-100 ${statusStyles[status].button} mt-auto`}
          disabled={status === "upcoming"}
          onClick={handleButtonClick}
        >
          <span className="d-none d-sm-inline">
            {status === "sold" ? "View Details" : 
             status === "ongoing" ? "Place Bid" : "Notify Me"}
          </span>
          <span className="d-sm-none">
            {status === "sold" ? "View" : 
             status === "ongoing" ? "Bid" : "Notify"}
          </span>
        </button>
      </div>
    </div>
  );
}