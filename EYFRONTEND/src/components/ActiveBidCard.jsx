import React, { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";

const ActiveBidCard = ({ bid }) => {
  const [newBid, setNewBid] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  // Function to calculate the remaining time
  const calculateTimeLeft = () => {
    const endTime = new Date(bid.endTime).getTime();
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return "Expired";
    }
  };

  // Update the countdown timer every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer
  }, [bid.endTime]);

  const handleBidSubmit = async () => {
    if (!newBid || isNaN(newBid) || parseFloat(newBid) <= parseFloat(bid.yourBid)) {
      alert("Enter a valid higher bid!");
      return;
    }

    try {
      const response = await axios.post("https://auction-webproject-3.onrender.com/place-bid", {
        bidId: bid._id,
        newBid: parseFloat(newBid),
      });

      if (response.data.success) {
        alert("Bid placed successfully!");
        window.location.reload(); // Refresh bids
      } else {
        alert("Bid failed! Try again.");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Error placing bid!");
    }
  };

  return (
    <Card className="mb-3 shadow border">
      {/* Add Image */}
      <Card.Img
        variant="top"
        src={bid.imageUrl} // Ensure `imageUrl` is provided in the bid object
        alt={bid.itemName || "Item Image"} // Use `itemName` for the alt text
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title className="fw-bold">{bid.itemName || "Unnamed Item"}</Card.Title>
        <Card.Text style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#007bff" }}>
          {/* Increased font size, bold, and added color */}
          Your Bid: ${bid.yourBid}
        </Card.Text>
        <Card.Text>
          <strong>Time Left:</strong> {timeLeft}
        </Card.Text>
        <Card.Text className={bid.leading ? "text-success fw-bold" : "text-danger fw-bold"}>
          {bid.leading ? "Winning" : "Outbid"}
        </Card.Text>

        {/* Bid Input */}
        <Form.Group className="mb-2">
          <Form.Control
            type="number"
            placeholder="Enter new bid"
            value={newBid}
            onChange={(e) => setNewBid(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleBidSubmit}>
          Place Bid
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ActiveBidCard;
