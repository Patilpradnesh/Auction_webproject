import React, { useEffect, useState } from "react";
import axios from "axios";

const AuctionDetails = () => {
    const [bids, setBids] = useState([]); // Ensure bids is always an array

    // Function to fetch bids from API
    const fetchBids = async () => {
        try {
            const response = await axios.get("https://auction-webproject-3.onrender.com/bids");

            
            setBids(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error("Error fetching bids:", error);
            setBids([]); // Fallback to empty array on error
        }
    };


    
    useEffect(() => {
        fetchBids();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Live Auction Details</h2>

            {bids.length > 0 ? (
                <table className="table table-striped text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Bid Amount</th>
                            <th>Leading</th>
                            <th>Bid Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bids.map((bid, index) => (
                            <tr key={bid._id}>
                                <td>{index + 1}</td>
                                <td>{bid.item || "N/A"}</td>
                                <td>{bid.yourBid ? `$${bid.yourBid}` : "N/A"}</td>
                                <td>{bid.leading ? "Yes" : "No"}</td>
                                <td>{new Date(bid.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-danger">No ongoing auctions.</p>
            )}
        </div>
    );
};

export default AuctionDetails;
