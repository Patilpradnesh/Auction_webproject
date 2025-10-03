import React, { useEffect, useState } from "react";
import axios from "axios";

const BidHistory = () => {
  const [bids, setBids] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBidHistory = async () => {
      try {
        const response = await axios.get("/user/bids", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBids(response.data);
      } catch (error) {
        setMessage("Failed to fetch bid history.");
      }
    };

    fetchBidHistory();
  }, []);

  return (
    <div>
      <h2>Bid History</h2>
      {message && <p>{message}</p>}
      <ul>
        {Array.isArray(bids) && bids.length > 0 ? (
          bids.map((bid) => (
            <li key={bid._id}>
              {bid.item} - ${bid.amount} - {bid.status}
            </li>
          ))
        ) : (
          <p>No bids found.</p>
        )}
      </ul>
    </div>
  );
};

export default BidHistory;
