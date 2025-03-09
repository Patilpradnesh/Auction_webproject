import React from "react";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Startpage() {
  const navigate = useNavigate();

  const handleStartBidding = () => {
    const isLoggedIn = false; // Replace with actual login check logic
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/SignIn");
    }
  };
  const renderBidItems = () => {
    return bidData.map((bid) => (
      <div
        key={bid.id}
        style={{
          margin: "20px 0",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        <h2>{bid.item}</h2>
        <p>Current Bid: {bid.currentBid}</p>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleStartBidding}
        >
          Place a Bid
        </button>
      </div>
    ));
  };
  return (
    <>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Welcome to Auction</h1>
        <p>Discover and bid on unique items from around the world.</p>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleStartBidding}
        >
          Start Bidding
        </button>
      </div>
    </>
  );
}
