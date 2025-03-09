import { Link } from "react-router-dom";
import React, { useState } from "react";

function AuctionCard({ auction }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="auction-card">
            <Button color="primary" onClick={toggleSidebar} style={{ marginBottom: '1rem' }}>
                {isOpen ? "Close" : "Open"} Categories
            </Button>
            <Collapse isOpen={isOpen}>
                <ListGroup>
                    <ListGroupItem>
                        <Link to="/auctions/cars">Cars</Link>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Link to="/auctions/accessories">Accessories</Link>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Link to="/auctions/others">Others</Link>
          </li>
        </ul>
      </div>
      <h3></h3>
    </div>
  );
}

export default AuctionCard;
