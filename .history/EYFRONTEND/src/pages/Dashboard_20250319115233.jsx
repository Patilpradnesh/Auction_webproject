import React, { useEffect, useState } from "react";
import axios from "axios";
import ActiveBidCard from "../components/ActiveBidCard";
import { Container, Row, Col, Card } from "react-bootstrap";

const Dashboard = () => {
  const [activeBids, setActiveBids] = useState([]);

  useEffect(() => {
    const fetchActiveBids = async () => {
      try {
        const response = await axios.get("https://auction-webproject-3.onrender.com/bids");

        if (response.data && Array.isArray(response.data.data)) {
          setActiveBids(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching active bids:", error);
      }
    };

    fetchActiveBids();
  }, []);

  return (
    <Container fluid className="py-4">
      <h1 className="mb-4">Your Dashboard</h1>

      {/* Quick Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow border">
            <Card.Body>
              <Card.Title>Active Bids</Card.Title>
              <Card.Text className="fs-3 fw-bold">{activeBids.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow border">
            <Card.Body>
              <Card.Title>Winning</Card.Title>
              <Card.Text className="fs-3 fw-bold">
                {activeBids.filter((bid) => bid.leading).length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow border">
            <Card.Body>
              <Card.Title>Total Spent</Card.Title>
              <Card.Text className="fs-3 fw-bold">
                ${activeBids.reduce((total, bid) => total + parseFloat(bid.yourBid), 0)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Active Bids Section */}
      <Card className="shadow border mb-4">
        <Card.Header as="h2">Your Active Bids</Card.Header>
        <Card.Body>
          <Row>
            {activeBids.length > 0 ? (
              activeBids.map((bid) => (
                <Col md={4} key={bid._id}>
                  <ActiveBidCard bid={bid} />
                </Col>
              ))
            ) : (
              <p className="text-muted">No active bids found.</p>
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
