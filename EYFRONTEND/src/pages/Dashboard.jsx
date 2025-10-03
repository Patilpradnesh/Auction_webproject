import React, { useEffect, useState } from "react";
import axios from "axios";
import ActiveBidCard from "../components/ActiveBidCard";
import { Container, Row, Col, Card } from "react-bootstrap";

const Dashboard = () => {
  const [activeBids, setActiveBids] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);

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

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/user/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUserDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchBidHistory = async () => {
      try {
        const response = await axios.get("/user/bids", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBidHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching bid history:", error);
      }
    };

    fetchActiveBids();
    fetchUserDetails();
    fetchBidHistory();
  }, []);

  return (
    <Container fluid className="py-3 py-md-4 px-3 px-md-4">
      <Row className="mb-3 mb-md-4">
        <Col>
          <h1 className="h2 h-md-1 mb-0">Your Dashboard</h1>
        </Col>
      </Row>

      {/* User Details */}
      {userDetails && (
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h5>Name: {userDetails.name}</h5>
                <h5>Email: {userDetails.email}</h5>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Quick Stats */}
      <Row className="g-3 g-md-4 mb-4 mb-md-5">
        <Col xs={12} sm={6} lg={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="text-center">
              <Card.Title className="h5 h-md-4 text-primary">Active Bids</Card.Title>
              <Card.Text className="display-6 display-md-5 fw-bold text-success">{activeBids.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="text-center">
              <Card.Title className="h5 h-md-4 text-primary">Winning</Card.Title>
              <Card.Text className="display-6 display-md-5 fw-bold text-warning">
                {activeBids.filter((bid) => bid.leading).length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="text-center">
              <Card.Title className="h5 h-md-4 text-primary">Total Spent</Card.Title>
              <Card.Text className="display-6 display-md-5 fw-bold text-info">
                ${activeBids.reduce((total, bid) => total + bid.amount, 0).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Active Bids Section */}
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white">
              <h2 className="h4 h-md-3 mb-0">Your Active Bids</h2>
            </Card.Header>
            <Card.Body className="p-3 p-md-4">
              <Row className="g-3 g-md-4">
                {activeBids.length > 0 ? (
                  activeBids.map((bid) => (
                    <Col xs={12} sm={6} lg={4} key={bid._id}>
                      <ActiveBidCard bid={bid} />
                    </Col>
                  ))
                ) : (
                  <Col xs={12}>
                    <div className="text-center py-5">
                      <p className="text-muted h5">No active bids found.</p>
                      <p className="text-muted">Start bidding on auctions to see them here!</p>
                    </div>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Bid History Section */}
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-secondary text-white">
              <h2 className="h4 h-md-3 mb-0">Your Bid History</h2>
            </Card.Header>
            <Card.Body className="p-3 p-md-4">
              <Row className="g-3 g-md-4">
                {bidHistory && bidHistory.length > 0 ? (
                  bidHistory.map((bid) => (
                    <Col xs={12} key={bid._id}>
                      <Card className="shadow-sm border-0">
                        <Card.Body>
                          <h5>{bid.item}</h5>
                          <p>Amount: ${bid.amount}</p>
                          <p>Status: {bid.status}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col xs={12}>
                    <div className="text-center py-5">
                      <p className="text-muted h5">No bid history found.</p>
                    </div>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
