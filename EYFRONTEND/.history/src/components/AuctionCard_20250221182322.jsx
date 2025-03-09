import { Link } from "react-router-dom";
import React, { useState } from 'react';


function AuctionCard({ auction }) {
    return (
        function AuctionCard({ auction }) {
            const [isOpen, setIsOpen] = useState(false);

            const toggleSidebar = () => {
                setIsOpen(!isOpen);
            };

            return (
                <div className="auction-card">
                    <button onClick={toggleSidebar}>
                        {isOpen ? 'Close' : 'Open'} Categories
                    </button>
                    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                        <ul>
                            <li><Link to="/auctions/cars">Cars</Link></li>
                            <li><Link to="/auctions/accessories">Accessories</Link></li>
                            <li><Link to="/auctions/others">Others</Link></li>
                        </ul>
                    </div>
                    <h3>hiiii this is card apart</h3>
                </div>
            );
        }

        export default AuctionCard;
        <h3>hiiii this is card apart</h3>
    );
}

export default AuctionCard;
