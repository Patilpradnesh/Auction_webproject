import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";

const ActiveBidCard = ({ bid }) => {
  const [newBid, setNewBid] = useState("");

  const handleBidSubmit = async () => {
    if (!newBid || isNaN(newBid) || parseFloat(newBid) <= parseFloat(bid.yourBid)) {
      alert("Enter a valid higher bid!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/place-bid", {
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
      <Card.Body>
        <Card.Title className="fw-bold">{bid.item}</Card.Title>
        <Card.Text>
          <strong>Your Bid:</strong> ${bid.yourBid}
        </Card.Text>
        <Card.Text>
          <strong>Time Left:</strong> {new Date(bid.endTime).toLocaleString()}
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
