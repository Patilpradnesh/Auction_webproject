import { Link } from "react-router-dom";

function AuctionCard({ auction }) {
    return (
    <>
        <h3>hiiii</h3>
        <div className="auction-card">
            <Link to={`/auction/${auction.id}`}>
                <img src={auction.image} alt={auction.title} className="auction-card-image" />
                <div className="auction-card-details">
                    <h2 className="auction-card-title">{auction.title}</h2>
                    <p className="auction-card-description">{auction.description}</p>
                    <p className="auction-card-price">Starting bid: ${auction.startingBid}</p>
                </div>
            </Link>
        </div>
    </>
    );
}

export default AuctionCard;
